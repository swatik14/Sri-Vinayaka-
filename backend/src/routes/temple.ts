import { Router, Request, Response } from 'express';
import { pool } from '../config/database';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

// GET /api/temple/info
router.get('/info', async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT key_name, value_en, value_kn FROM temple_info');
    const info: Record<string, { en: string; kn: string }> = {};
    (rows as { key_name: string; value_en: string; value_kn: string }[]).forEach((row) => {
      info[row.key_name] = { en: row.value_en, kn: row.value_kn };
    });
    return res.json({ success: true, data: info });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/temple/timings
router.get('/timings', async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM temple_timings ORDER BY day_type, display_order');
    return res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/temple/darshan
router.get('/darshan', async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM darshan_schedule WHERE is_active = TRUE ORDER BY display_order'
    );
    return res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/temple/announcements
router.get('/announcements', async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM announcements WHERE is_active = TRUE
       AND (end_date IS NULL OR end_date >= CURDATE())
       AND (start_date IS NULL OR start_date <= CURDATE())
       ORDER BY display_order, created_at DESC`
    );
    return res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/temple/live-darshan
router.get('/live-darshan', async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM live_darshan_config LIMIT 1');
    return res.json({ success: true, data: (rows as unknown[])[0] || null });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/temple/info (admin)
router.put('/info', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const updates = req.body as { key_name: string; value_en: string; value_kn: string }[];
    if (!Array.isArray(updates)) {
      return res.status(400).json({ success: false, message: 'Expected array of updates' });
    }
    for (const u of updates) {
      await pool.query(
        'INSERT INTO temple_info (key_name, value_en, value_kn) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE value_en = ?, value_kn = ?',
        [u.key_name, u.value_en, u.value_kn, u.value_en, u.value_kn]
      );
    }
    return res.json({ success: true, message: 'Temple info updated' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/temple/live-darshan (admin)
router.put('/live-darshan', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { youtube_channel_id, youtube_video_id, is_live, schedule_en, schedule_kn } = req.body;
    await pool.query(
      `INSERT INTO live_darshan_config (id, youtube_channel_id, youtube_video_id, is_live, schedule_en, schedule_kn)
       VALUES (1, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         youtube_channel_id = VALUES(youtube_channel_id),
         youtube_video_id = VALUES(youtube_video_id),
         is_live = VALUES(is_live),
         schedule_en = VALUES(schedule_en),
         schedule_kn = VALUES(schedule_kn)`,
      [youtube_channel_id, youtube_video_id, is_live, schedule_en, schedule_kn]
    );
    return res.json({ success: true, message: 'Live darshan config updated' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
