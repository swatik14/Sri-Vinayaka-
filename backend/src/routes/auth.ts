import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../config/database';
import { AdminUser } from '../models/types';
import { authenticateAdmin, AuthRequest } from '../middleware/auth';

const router = Router();

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password required' });
    }

    const [rows] = await pool.query(
      'SELECT * FROM admin_users WHERE (username = ? OR email = ?) AND is_active = TRUE',
      [username, username]
    );
    const users = rows as AdminUser[];
    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const user = users[0];
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    await pool.query('UPDATE admin_users SET last_login = NOW() WHERE id = ?', [user.id]);

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '8h' }
    );

    return res.json({
      success: true,
      token,
      admin: { id: user.id, username: user.username, email: user.email, full_name: user.full_name, role: user.role },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/auth/me
router.get('/me', authenticateAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, username, email, full_name, role, last_login FROM admin_users WHERE id = ?',
      [req.admin!.id]
    );
    const users = rows as Partial<AdminUser>[];
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }
    return res.json({ success: true, admin: users[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/auth/change-password
router.post('/change-password', authenticateAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { current_password, new_password } = req.body;
    if (!current_password || !new_password) {
      return res.status(400).json({ success: false, message: 'Both passwords required' });
    }
    if (new_password.length < 8) {
      return res.status(400).json({ success: false, message: 'New password must be at least 8 characters' });
    }

    const [rows] = await pool.query('SELECT password_hash FROM admin_users WHERE id = ?', [req.admin!.id]);
    const users = rows as { password_hash: string }[];
    const isValid = await bcrypt.compare(current_password, users[0].password_hash);
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Current password incorrect' });
    }

    const newHash = await bcrypt.hash(new_password, 12);
    await pool.query('UPDATE admin_users SET password_hash = ? WHERE id = ?', [newHash, req.admin!.id]);
    return res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
