import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Получаем __dirname в ES модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Отдаем статику из папки dist
app.use(express.static(path.join(__dirname, 'dist')));

// Обрабатываем все маршруты и отдаём index.html (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});