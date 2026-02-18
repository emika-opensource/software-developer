const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Content publishing — AI-generated reports, dashboards, analyses
const CONTENT_DIR = path.join(__dirname, 'content');
try { require('fs').mkdirSync(CONTENT_DIR, { recursive: true }); } catch(e) {}
app.use('/content', express.static(CONTENT_DIR));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Dev Workshop running on port ${PORT}`);
});
