const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/',(req,res) => {
    var weight = req.body.weight;
    var height = req.body.height;
    res.send("Your BMI is " + (weight*10000/(height*height)));
});

app.listen(3000, ()=>{
    console.log("Listening on port 3000");
});
