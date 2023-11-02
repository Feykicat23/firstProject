import fs from 'fs';
import express from 'express';
import pkg from 'pg';

import bcrypt from 'bcrypt';

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

app.use(express.json()); /// Распаковка джсон обьекта

/// / create; delete; post

app.post('/posts', async (req, res) => {
  const { name, nickname, message } = req.body;
  const createPost = 'INSERT INTO posts (name, nickname, message) VALUES ($1, $2, $3)';

  await pool.query(createPost, [name, nickname, message]);

  return res.status(201).json({ message: 'Post has been created' });
});

app.delete('/posts/:id', async (req, res) => {
  const { postId } = req.params;
  const checkPostExists = 'SELECT * FROM posts WHERE id = $1';
  const { rows } = await pool.query(checkPostExists, [postId]);

  if (rows.length > 0) {
    await pool.query('DELETE FROM posts WHERE id = $1', [postId]);
    return res.status(204).json({ message: 'Post successfully deleted' });
  }
  return res.status(404).json({ message: 'Post not found' });
});

app.post('/posts/:id', async (req, res) => {
  const { postId } = req.params;
  const { message } = req.body; // Предполагается, что вы ожидаете сообщение в теле запроса

  const checkPostExists = 'SELECT * FROM posts WHERE id = $1';
  const { rows } = await pool.query(checkPostExists, [postId]);

  if (rows.length > 0) {
    const editPost = 'UPDATE posts SET message = $1 WHERE id = $2';
    await pool.query(editPost, [message, postId]);
    return res.status(204).json({ message: 'Post successfully updated' });
  }
  return res.status(404).json({ error: 'Post not found' });
});
