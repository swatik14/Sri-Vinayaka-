import { Router, Request, Response } from 'express';
import { pool } from '../config/database';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

// GET /api/gallery
router.get('/', async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string;
    const featured = req.query.featured === 'true';
    const limit = parseInt(req.query.limit as string) || 50;

    let where = 'is_active = TRUE';
    const params: unknown[] = [];
    if (category) { where += ' AND category = ?'; params.push(category); }
    if (featured) { where += ' AND is_featured = TRUE'; }

    const [rows] = await pool.query(
      `SELECT * FROM gallery WHERE ${where} ORDER BY display_order, created_at DESC LIMIT ?`,
      [...params, limit]
    );
    return res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ---- Admin CRUD ----
router.get('/admin/all', authenticateAdmin, async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM gallery ORDER BY display_order, created_at DESC');
    return res.json({ success: true, data: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/admin', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { title_en, title_kn, description_en, description_kn, file_url, file_type, thumbnail_url, category, is_featured, display_order } = req.body;
    const [result] = await pool.query(
      'INSERT INTO gallery (title_en, title_kn, description_en, description_kn, file_url, file_type, thumbnail_url, category, is_featured, display_order) VALUES (?,?,?,?,?,?,?,?,?,?)',
      [title_en || null, title_kn || null, description_en || null, description_kn || null, file_url, file_type || 'image', thumbnail_url || null, category || 'temple', is_featured ? 1 : 0, display_order || 0]
    );
    return res.status(201).json({ success: true, data: { id: (result as { insertId: number }).insertId } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.put('/admin/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { title_en, title_kn, description_en, description_kn, file_url, file_type, thumbnail_url, category, is_featured, display_order, is_active } = req.body;
    await pool.query(
      'UPDATE gallery SET title_en=?, title_kn=?, description_en=?, description_kn=?, file_url=?, file_type=?, thumbnail_url=?, category=?, is_featured=?, display_order=?, is_active=? WHERE id=?',
      [title_en, title_kn, description_en, description_kn, file_url, file_type, thumbnail_url, category, is_featured ? 1 : 0, display_order, is_active ? 1 : 0, req.params.id]
    );
    return res.json({ success: true, message: 'Gallery item updated' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.delete('/admin/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    await pool.query('DELETE FROM gallery WHERE id = ?', [req.params.id]);
    return res.json({ success: true, message: 'Gallery item deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
