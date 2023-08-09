const express = require('express');
const cors = require('cors');

const scrapper = require('./scrapper');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    message: 'We cooking!!!'
  });
});

// Basic route for search 
app.get('/search/:name', async (req, res) => {
    await scrapper.searchMovies(req.params.name);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});