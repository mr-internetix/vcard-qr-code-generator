// imports 
const express = require("express");
const bodyParser = require('body-parser');
const path = require('path')

// intializing app
require('dotenv').config()
const app = express();

const PORT = process.env.PORT || 5000

app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, "./views"))
app.get('/', (req, res) => {

    // console.log("req hit");

    res.render('index')
})


app.use('/v1/generate', require('./routes/generate'));





app.listen(PORT, () => {
    console.log(`The Server is running on http://localhost:${PORT}`)
})