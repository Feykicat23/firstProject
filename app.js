import fs from 'fs';
import express from 'express';

const app = express();
const port = 3000;

const html = fs.readFileSync('public/main.html', 'utf8');

app.use(express.static('public'));

app.get('/', (req, res) => res.type('html').send(html));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
