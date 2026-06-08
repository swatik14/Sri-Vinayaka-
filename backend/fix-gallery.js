const mysql = require('mysql2/promise');

async function fix() {
  const c = await mysql.createConnection({
    host: 'localhost', port: 3306,
    user: 'root', password: 'sl::))',
    database: 'vinayaka_temple',
  });

  const [r] = await c.execute(
    "DELETE FROM gallery WHERE file_url IN ('/images/ganesha.jpg', '/images/ganesha-2.jpg')"
  );
  console.log(`Removed ${r.affectedRows} stock photo entries from gallery.`);
  await c.end();
}

fix().catch(console.error);
