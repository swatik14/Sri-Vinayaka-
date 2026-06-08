const mysql = require('mysql2/promise');

async function seedGallery() {
  const pool = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'sl::))',
    database: 'vinayaka_temple',
  });

  console.log('Connected to database...');

  // Remove broken entries
  await pool.execute(`DELETE FROM gallery WHERE file_url LIKE '%drive.google%'`);
  console.log('Cleaned broken entries.');

  const images = [
    ['Lord Ganesha',       'ಲಾರ್ಡ್ ಗಣೇಶ',         '/images/ganesha.jpg',            'temple',  1, 1],
    ['Ganesha Idol',       'ಗಣೇಶ ಮೂರ್ತಿ',          '/images/ganesha-idol.jpg',       'temple',  1, 2],
    ['Ganesha Decoration', 'ಗಣೇಶ ಅಲಂಕಾರ',          '/images/ganesha-decoration.jpg', 'darshan', 1, 3],
    ['Ganesha Blessings',  'ಗಣೇಶ ಆಶೀರ್ವಾದ',        '/images/ganesha-2.jpg',          'temple',  1, 4],
    ['Temple Entrance',    'ದೇವಾಲಯದ ಪ್ರವೇಶದ್ವಾರ',  '/images/temple-entrance.jpg',    'temple',  1, 5],
    ['Temple Exterior',    'ದೇವಾಲಯದ ಹೊರಭಾಗ',       '/images/temple-exterior.jpg',    'temple',  0, 6],
    ['Temple Events',      'ದೇವಾಲಯ ಕಾರ್ಯಕ್ರಮಗಳು',  '/images/temple-events.jpg',      'events',  1, 7],
  ];

  for (const [title_en, title_kn, file_url, category, is_featured, display_order] of images) {
    await pool.execute(
      `INSERT IGNORE INTO gallery (title_en, title_kn, file_url, thumbnail_url, file_type, category, is_featured, is_active, display_order)
       VALUES (?, ?, ?, ?, 'image', ?, ?, 1, ?)`,
      [title_en, title_kn, file_url, file_url, category, is_featured, display_order]
    );
    console.log(`Added: ${title_en}`);
  }

  console.log('\nDone! All 7 images added to gallery.');
  await pool.end();
}

seedGallery().catch(console.error);
