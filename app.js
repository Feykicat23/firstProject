/* eslint-disable consistent-return */
import fs from 'fs';
import crypto from 'crypto';
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
  const { message } = req.body;

  const checkPostExists = 'SELECT * FROM posts WHERE id = $1';
  const { rows } = await pool.query(checkPostExists, [postId]);

  if (rows.length > 0) {
    const editPost = 'UPDATE posts SET message = $1 WHERE id = $2';
    await pool.query(editPost, [message, postId]);
    return res.status(204).json({ message: 'Post successfully updated' });
  }
  return res.status(404).json({ error: 'Post not found' });
});

/// / Создание нового пользователя

app.post('/createUser', async (req, res) => {
  const { login, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const passwordToSave = bcrypt.hashSync(password, salt);

  const checkUserQuery = 'SELECT * FROM createUser WHERE email = $1';
  const { rows } = await pool.query(checkUserQuery, [email]);

  if (rows.length > 0) {
    return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
  }

  const createUserQuery = 'INSERT INTO createUser (username, email, password) VALUES ($1, $2, $3)';
  await pool.query(createUserQuery, [login, email, passwordToSave]);

  return res.status(200).json({ message: 'Пользователь успешно создан' });
});

/// /// База пользователей

app.get('/createUser', async (req, res) => {
  const information = await pool.query('SELECT * from createUser');
  res.type('json').send(information.rows);
});

/// /// Авторизация

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const checkUserQuery = 'SELECT * FROM createUser WHERE email = $1';
  const { rows } = await pool.query(checkUserQuery, [email]);

  if (rows.length === 0) {
    return res.status(400).json({ message: 'Пользователь не найден' });
  }

  const hashPassword = rows[0].password;

  // Сравнение введенного пароля с хешированным паролем из базы данных
  bcrypt.compare(password, hashPassword, async (err, passwordsMatch) => {
    // if (err) {
    //   return res.status(500).json({ error: 'Ошибка при сравнении паролей' });
    // }
    if (passwordsMatch) {
      return res.status(200).json({ message: 'Успешная авторизация' });
    }
    return res.status(401).json({ message: 'Invalid password' });
  });
});
