import { Router, Response } from 'express';
import { pool } from '../config/database';
import { authenticateAdmin, AuthRequest } from '../middleware/auth';

const router = Router();

// GET /api/admin/dashboard - stats
router.get('/dashboard', authenticateAdmin, async (_req: AuthRequest, res: Response) => {
  try {
    const [[bookingStats]] = await pool.query(
      `SELECT
        COUNT(*) as total,
        SUM(status = 'confirmed') as confirmed,
        SUM(status = 'completed') as completed,
        SUM(status = 'cancelled') as cancelled,
        SUM(payment_status = 'pending') as payment_pending
       FROM seva_bookings`
    ) as [{ total: number; confirmed: number; completed: number; cancelled: number; payment_pending: number }[], unknown];

    const [[donationStats]] = await pool.query(
      `SELECT
        COUNT(*) as total,
        SUM(payment_status = 'completed') as completed,
        COALESCE(SUM(CASE WHEN payment_status = 'completed' THEN amount END), 0) as total_amount,
        COALESCE(SUM(CASE WHEN payment_status = 'completed' AND DATE(created_at) = CURDATE() THEN amount END), 0) as today_amount
       FROM donations`
    ) as [{ total: number; completed: number; total_amount: number; today_amount: number }[], unknown];

    const [[festivalStats]] = await pool.query(
      `SELECT
        COUNT(*) as total,
        SUM(start_date >= CURDATE()) as upcoming,
        SUM(is_featured = TRUE AND start_date >= CURDATE()) as featured_upcoming
       FROM festivals WHERE is_active = TRUE`
    ) as [{ total: number; upcoming: number; featured_upcoming: number }[], unknown];

    const [recentBookings] = await pool.query(
      `SELECT sb.booking_id, sb.devotee_name, sb.seva_date, sb.total_amount, sb.status, s.name_en as seva_name
       FROM seva_bookings sb JOIN sevas s ON sb.seva_id = s.id
       ORDER BY sb.created_at DESC LIMIT 5`
    );

    const [recentDonations] = await pool.query(
      `SELECT receipt_number, donor_name, amount, purpose_en, payment_status, created_at
       FROM donations ORDER BY created_at DESC LIMIT 5`
    );

    // Monthly stats (last 6 months)
    const [monthlyBookings] = await pool.query(
      `SELECT DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as count, SUM(total_amount) as revenue
       FROM seva_bookings
       WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
       GROUP BY month ORDER BY month ASC`
    );

    const [monthlyDonations] = await pool.query(
      `SELECT DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as count, SUM(amount) as amount
       FROM donations WHERE payment_status = 'completed'
       AND created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
       GROUP BY month ORDER BY month ASC`
    );

    return res.json({
      success: true,
      data: {
        bookings: bookingStats,
        donations: donationStats,
        festivals: festivalStats,
        recentBookings,
        recentDonations,
        charts: { monthlyBookings, monthlyDonations },
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/admin/announcements
router.get('/announcements', authenticateAdmin, async (_req: AuthRequest, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM announcements ORDER BY display_order, created_at DESC');
    return res.json({ success: true, data: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/announcements', authenticateAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { title_en, title_kn, content_en, content_kn, type, start_date, end_date, display_order } = req.body;
    const [result] = await pool.query(
      'INSERT INTO announcements (title_en, title_kn, content_en, content_kn, type, start_date, end_date, display_order) VALUES (?,?,?,?,?,?,?,?)',
      [title_en, title_kn, content_en || null, content_kn || null, type || 'general', start_date || null, end_date || null, display_order || 0]
    );
    return res.status(201).json({ success: true, data: { id: (result as { insertId: number }).insertId } });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.put('/announcements/:id', authenticateAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { title_en, title_kn, content_en, content_kn, type, start_date, end_date, is_active, display_order } = req.body;
    await pool.query(
      'UPDATE announcements SET title_en=?, title_kn=?, content_en=?, content_kn=?, type=?, start_date=?, end_date=?, is_active=?, display_order=? WHERE id=?',
      [title_en, title_kn, content_en, content_kn, type, start_date || null, end_date || null, is_active ? 1 : 0, display_order, req.params.id]
    );
    return res.json({ success: true, message: 'Announcement updated' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.delete('/announcements/:id', authenticateAdmin, async (req: AuthRequest, res: Response) => {
  try {
    await pool.query('DELETE FROM announcements WHERE id = ?', [req.params.id]);
    return res.json({ success: true, message: 'Announcement deleted' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Temple timings management
router.get('/timings', authenticateAdmin, async (_req: AuthRequest, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM temple_timings ORDER BY day_type, display_order');
    return res.json({ success: true, data: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.put('/timings/:id', authenticateAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { day_type, session_name_en, session_name_kn, open_time, close_time, display_order } = req.body;
    await pool.query(
      'UPDATE temple_timings SET day_type=?, session_name_en=?, session_name_kn=?, open_time=?, close_time=?, display_order=? WHERE id=?',
      [day_type, session_name_en, session_name_kn, open_time, close_time, display_order, req.params.id]
    );
    return res.json({ success: true, message: 'Timing updated' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
