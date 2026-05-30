import { Router, Request, Response } from 'express';
import { pool } from '../config/database';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

// GET /api/festivals
router.get('/', async (req: Request, res: Response) => {
  try {
    const upcoming = req.query.upcoming === 'true';
    const featured = req.query.featured === 'true';
    const limit = parseInt(req.query.limit as string) || 50;

    let where = 'is_active = TRUE';
    if (upcoming) where += ' AND start_date >= CURDATE()';
    if (featured) where += ' AND is_featured = TRUE';

    const [rows] = await pool.query(
      `SELECT * FROM festivals WHERE ${where} ORDER BY start_date ASC LIMIT ?`,
      [limit]
    );
    return res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/festivals/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM festivals WHERE id = ?', [req.params.id]);
    const festivals = rows as unknown[];
    if (festivals.length === 0) return res.status(404).json({ success: false, message: 'Festival not found' });
    return res.json({ success: true, data: festivals[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ---- Admin CRUD ----
router.get('/admin/all', authenticateAdmin, async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM festivals ORDER BY start_date DESC');
    return res.json({ success: true, data: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/admin', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { name_en, name_kn, description_en, description_kn, start_date, end_date, start_time, end_time, image_url, is_featured } = req.body;
    const [result] = await pool.query(
      'INSERT INTO festivals (name_en, name_kn, description_en, description_kn, start_date, end_date, start_time, end_time, image_url, is_featured) VALUES (?,?,?,?,?,?,?,?,?,?)',
      [name_en, name_kn, description_en || null, description_kn || null, start_date, end_date || null, start_time || null, end_time || null, image_url || null, is_featured ? 1 : 0]
    );
    return res.status(201).json({ success: true, data: { id: (result as { insertId: number }).insertId } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.put('/admin/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { name_en, name_kn, description_en, description_kn, start_date, end_date, start_time, end_time, image_url, is_featured, is_active } = req.body;
    await pool.query(
      'UPDATE festivals SET name_en=?, name_kn=?, description_en=?, description_kn=?, start_date=?, end_date=?, start_time=?, end_time=?, image_url=?, is_featured=?, is_active=? WHERE id=?',
      [name_en, name_kn, description_en, description_kn, start_date, end_date || null, start_time || null, end_time || null, image_url || null, is_featured ? 1 : 0, is_active ? 1 : 0, req.params.id]
    );
    return res.json({ success: true, message: 'Festival updated' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.delete('/admin/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    await pool.query('UPDATE festivals SET is_active = FALSE WHERE id = ?', [req.params.id]);
    return res.json({ success: true, message: 'Festival deactivated' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
