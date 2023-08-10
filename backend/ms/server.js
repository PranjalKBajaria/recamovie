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

// Basic route for searching movie details, we don't need anymore
app.get('/search/:name', async (req, res) => {
    const id = await scrapper.getIMDBId(req.params.name);
    const movie = await scrapper.getMovie(id);
    res.json(movie);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});