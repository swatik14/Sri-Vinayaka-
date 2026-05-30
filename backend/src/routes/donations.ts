import { Router, Request, Response } from 'express';
import { pool } from '../config/database';
import { generateReceiptNumber } from '../utils/generators';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

// GET /api/donations/purposes
router.get('/purposes', async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM donation_purposes WHERE is_active = TRUE ORDER BY display_order'
    );
    return res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/donations
router.post('/', async (req: Request, res: Response) => {
  try {
    const { donor_name, donor_email, donor_phone, donor_address, pan_number, amount, purpose_en, purpose_kn, payment_method, is_anonymous, notes } = req.body;

    if (!donor_name || !donor_email || !donor_phone || !amount) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }
    if (parseFloat(amount) < 1) {
      return res.status(400).json({ success: false, message: 'Amount must be at least ₹1' });
    }

    const receiptNumber = generateReceiptNumber();
    await pool.query(
      `INSERT INTO donations
       (receipt_number, donor_name, donor_email, donor_phone, donor_address, pan_number, amount,
        purpose_en, purpose_kn, payment_method, payment_status, is_anonymous, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)`,
      [receiptNumber, donor_name, donor_email, donor_phone,
       donor_address || null, pan_number || null, parseFloat(amount),
       purpose_en || 'General Donation', purpose_kn || 'ಸಾಮಾನ್ಯ ದೇಣಿಗೆ',
       payment_method || null, is_anonymous ? 1 : 0, notes || null]
    );

    return res.status(201).json({
      success: true,
      message: 'Donation recorded successfully',
      data: {
        receipt_number: receiptNumber,
        donor_name: is_anonymous ? 'Anonymous' : donor_name,
        amount: parseFloat(amount),
        purpose_en: purpose_en || 'General Donation',
        payment_status: 'pending',
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/donations/receipt/:receiptNumber
router.get('/receipt/:receiptNumber', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM donations WHERE receipt_number = ?',
      [req.params.receiptNumber]
    );
    const donations = rows as unknown[];
    if (donations.length === 0) {
      return res.status(404).json({ success: false, message: 'Receipt not found' });
    }
    return res.json({ success: true, data: donations[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ---- Admin routes ----

router.get('/admin', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;
    const status = req.query.status as string;
    const search = req.query.search as string;

    let where = '1=1';
    const params: unknown[] = [];
    if (status) { where += ' AND payment_status = ?'; params.push(status); }
    if (search) {
      where += ' AND (donor_name LIKE ? OR receipt_number LIKE ? OR donor_email LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    const [rows] = await pool.query(
      `SELECT * FROM donations WHERE ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );
    const [countRows] = await pool.query(`SELECT COUNT(*) as total FROM donations WHERE ${where}`, params);
    const total = (countRows as { total: number }[])[0].total;
    const [sumRows] = await pool.query(
      `SELECT SUM(amount) as total_amount FROM donations WHERE ${where} AND payment_status = 'completed'`,
      params
    );
    const totalAmount = (sumRows as { total_amount: number | null }[])[0].total_amount || 0;

    return res.json({
      success: true, data: rows,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      summary: { totalAmount },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.patch('/admin/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { payment_status, transaction_id, payment_method } = req.body;
    await pool.query(
      `UPDATE donations SET
        payment_status = COALESCE(?, payment_status),
        transaction_id = COALESCE(?, transaction_id),
        payment_method = COALESCE(?, payment_method)
       WHERE id = ?`,
      [payment_status || null, transaction_id || null, payment_method || null, req.params.id]
    );
    return res.json({ success: true, message: 'Donation updated' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
