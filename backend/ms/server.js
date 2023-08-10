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
    const id = await scrapper.getIMDBId(req.params.name);
    const movie = await scrapper.getMovie(id);
    console.log(movie);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});