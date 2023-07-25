const express = require("express");
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, ''));

app.listen(3000, () => {
    console.log('Running on port 3000');;
})