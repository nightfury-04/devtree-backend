const express = require('express');

const app = express();

// Routing
app.get('/', (req, res) => {
  res.send('Hello, World in Express!');
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

app.listen(4000, () => {
  console.log('Server is running...');
});