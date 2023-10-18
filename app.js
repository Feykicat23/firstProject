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

app.use(bodyParser.json()); // Парсим JSON-данные из запросов

// Метод для создания поста
app.post('/posts.json', (req, res) => {
  const newPost = req.body;
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Метод для удаления поста по ID
app.delete('/posts/:id.json', (req, res) => {
  const postId = req.params.id;
  if (posts[postId]) {
    posts.splice(postId, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Пост с указанным ID не найден' });
  }
});

// Метод для редактирования поста по ID
app.post('/posts/:id.json', (req, res) => {
  const postId = req.params.id;

  if (posts[postId]) {
    const updatedPost = req.body;
    posts[postId] = updatedPost;
    res.status(200).json(updatedPost);
  } else {
    res.status(404).json({ error: 'Пост с указанным ID не найден' });
  }
});

// Эндпоинт для создания пользователя
app.post('/createUser', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Проверка на существование пользователя с таким email или username в базе данных
    const checkUserQuery = 'SELECT * FROM createUser WHERE email = $1';
    const { rows } = await pool.query(checkUserQuery, [email]);

    if (rows.length > 0) {
      return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
    }

    // Создание нового пользователя
    const createUserQuery = 'INSERT INTO createUser (username, email, password) VALUES ($1, $2, $3)';
    await pool.query(createUserQuery, [username, email, password]);

    return res.status(200).json({ message: 'Пользователь успешно создан' });
  } catch (error) {
    console.error('Ошибка при создании пользователя:', error);
    return res.status(500).json({ error: 'Произошла ошибка при создании пользователя' });
  }
});
