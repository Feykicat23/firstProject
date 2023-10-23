import fs from 'fs';
import express from 'express';
import pkg from 'pg';
import bodyParser from 'body-parser';

const { Pool } = pkg;

const app = express();
const port = 3000;

const html = fs.readFileSync('public/main.html', 'utf8');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.type('html').send(html);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const pool = new Pool({
  user: 'twitterdolphin_production_user',
  host: 'dpg-ckillgke1qns738a8k90-a.oregon-postgres.render.com',
  // -a.oregon-postgres.render.com
  database: 'twitterdolphin_production',
  password: '5u0A5X86UdUQiy7kQw9bfXzaM8XrsNkO',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

// psql -h dpg-ckillgke1qns738a8k90-a.oregon-postgres.render.com -U twitterdolphin_production_user -d twitterdolphin_production

app.get('/posts', async (req, res) => {
  try {
    const information = await pool.query('SELECT * from posts');
    res.type('json').send(information.rows);
  } catch (error) {
    console.error('Ошибка при запросе к базе данных:', error);
    res.status(500).json({ error: 'Произошла ошибка при получении данных из базы данных' });
  }
});
