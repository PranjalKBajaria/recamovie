const express = require("express");
const cors = require("cors");

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/public', express.static('public'));
app.use(cors(corsOptions));

const script = express();
script.use('/public', express.static(path.join('../public')));

app.get("/", (req, res) => {
    res.render('index', {});
})

app.listen(3001, () => {
    console.log('Running on port 3001');;
})