const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const { response } = require('express');
const { request } = require('http');
const fetch = require("node-fetch");
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


app.get('/', (req, res) => {
    res.render('index.ejs');
})
app.post('/joke', async (req, res) => {
    const s = req.body;
    var num;
    if(s.value == '')
    num = 1;
    else 
    num = s.value;
    console.log(s);
    const baseURL = 'http://api.icndb.com/jokes/random/';
    const url = baseURL+num;
    var jokes;
    await fetch(url).then(response => response.json())
    .then((data) => {
        jokes = data;
        // console.log(data.value)
    });
    res.render('joke.ejs', {jokes: jokes.value})
    
    
})

app.listen(3000, (req, res) => {
    console.log('Listening in port 3000');
})