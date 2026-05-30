import { Router, Request, Response } from 'express';
import { pool } from '../config/database';
import { generateBookingId } from '../utils/generators';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

// GET /api/sevas - list all available sevas
router.get('/', async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM sevas WHERE is_available = TRUE ORDER BY display_order, category'
    );
    return res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/sevas/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM sevas WHERE id = ?', [req.params.id]);
    const sevas = rows as unknown[];
    if (sevas.length === 0) return res.status(404).json({ success: false, message: 'Seva not found' });
    return res.json({ success: true, data: sevas[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/sevas/book
router.post('/book', async (req: Request, res: Response) => {
  try {
    const {
      seva_id, devotee_name, devotee_email, devotee_phone,
      nakshatra, gotra, rashi, seva_date, num_devotees, special_requests,
    } = req.body;

    if (!seva_id || !devotee_name || !devotee_email || !devotee_phone || !seva_date) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }

    const [sevaRows] = await pool.query('SELECT * FROM sevas WHERE id = ? AND is_available = TRUE', [seva_id]);
    const sevas = sevaRows as { price: number; max_devotees: number; name_en: string; name_kn: string }[];
    if (sevas.length === 0) {
      return res.status(400).json({ success: false, message: 'Seva not available' });
    }

    const seva = sevas[0];
    const devoteeCount = parseInt(num_devotees) || 1;
    const totalAmount = seva.price * devoteeCount;
    const bookingId = generateBookingId();

    await pool.query(
      `INSERT INTO seva_bookings
       (booking_id, seva_id, devotee_name, devotee_email, devotee_phone, nakshatra, gotra, rashi,
        booking_date, seva_date, num_devotees, total_amount, status, special_requests)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURDATE(), ?, ?, ?, 'confirmed', ?)`,
      [bookingId, seva_id, devotee_name, devotee_email, devotee_phone,
       nakshatra || null, gotra || null, rashi || null,
       seva_date, devoteeCount, totalAmount, special_requests || null]
    );

    return res.status(201).json({
      success: true,
      message: 'Seva booked successfully',
      data: {
        booking_id: bookingId,
        seva_name_en: seva.name_en,
        seva_name_kn: seva.name_kn,
        devotee_name,
        devotee_email,
        seva_date,
        num_devotees: devoteeCount,
        total_amount: totalAmount,
        status: 'confirmed',
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/sevas/booking/:bookingId - check booking status
router.get('/booking/:bookingId', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(
      `SELECT sb.*, s.name_en as seva_name_en, s.name_kn as seva_name_kn
       FROM seva_bookings sb JOIN sevas s ON sb.seva_id = s.id
       WHERE sb.booking_id = ?`,
      [req.params.bookingId]
    );
    const bookings = rows as unknown[];
    if (bookings.length === 0) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    return res.json({ success: true, data: bookings[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ---- Admin routes ----

// GET /api/sevas/admin/bookings
router.get('/admin/bookings', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;
    const status = req.query.status as string;
    const search = req.query.search as string;

    let where = '1=1';
    const params: unknown[] = [];
    if (status) { where += ' AND sb.status = ?'; params.push(status); }
    if (search) {
      where += ' AND (sb.devotee_name LIKE ? OR sb.booking_id LIKE ? OR sb.devotee_email LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    const [rows] = await pool.query(
      `SELECT sb.*, s.name_en as seva_name_en, s.name_kn as seva_name_kn
       FROM seva_bookings sb JOIN sevas s ON sb.seva_id = s.id
       WHERE ${where} ORDER BY sb.created_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );
    const [countRows] = await pool.query(
      `SELECT COUNT(*) as total FROM seva_bookings sb WHERE ${where}`, params
    );
    const total = (countRows as { total: number }[])[0].total;

    return res.json({ success: true, data: rows, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PATCH /api/sevas/admin/bookings/:id
router.patch('/admin/bookings/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { status, payment_status, payment_method, transaction_id } = req.body;
    await pool.query(
      `UPDATE seva_bookings SET
        status = COALESCE(?, status),
        payment_status = COALESCE(?, payment_status),
        payment_method = COALESCE(?, payment_method),
        transaction_id = COALESCE(?, transaction_id)
       WHERE id = ?`,
      [status || null, payment_status || null, payment_method || null, transaction_id || null, req.params.id]
    );
    return res.json({ success: true, message: 'Booking updated' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin CRUD for sevas
router.post('/admin', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { name_en, name_kn, description_en, description_kn, price, duration_minutes, max_devotees, category, image_url, display_order } = req.body;
    const [result] = await pool.query(
      'INSERT INTO sevas (name_en, name_kn, description_en, description_kn, price, duration_minutes, max_devotees, category, image_url, display_order) VALUES (?,?,?,?,?,?,?,?,?,?)',
      [name_en, name_kn, description_en, description_kn, price, duration_minutes || 30, max_devotees || 10, category || 'daily', image_url || null, display_order || 0]
    );
    return res.status(201).json({ success: true, data: { id: (result as { insertId: number }).insertId } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.put('/admin/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { name_en, name_kn, description_en, description_kn, price, duration_minutes, max_devotees, category, image_url, is_available, display_order } = req.body;
    await pool.query(
      'UPDATE sevas SET name_en=?, name_kn=?, description_en=?, description_kn=?, price=?, duration_minutes=?, max_devotees=?, category=?, image_url=?, is_available=?, display_order=? WHERE id=?',
      [name_en, name_kn, description_en, description_kn, price, duration_minutes, max_devotees, category, image_url, is_available, display_order, req.params.id]
    );
    return res.json({ success: true, message: 'Seva updated' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.delete('/admin/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    await pool.query('UPDATE sevas SET is_available = FALSE WHERE id = ?', [req.params.id]);
    return res.json({ success: true, message: 'Seva deactivated' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
