const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'views')));
app.engine("ejs",require("ejs").renderFile);
app.set("view engine","ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

var greet;
var names = [];
var tasks = [];

app.get('/', (req, res) => {
    res.render("index",{greet,names,tasks});
});

app.get('/greet', (req, res) => {
    greet = req.query.name;
    names.push(greet);
    console.log(greet);
    res.redirect('/');
});

app.get('/greet/:idx', (req, res, next) => {
    const idx = req.params.idx;
    
    if(idx<0 || idx >=names.length){
        return next(new Error(`Out of bounds index: ${idx}`))
    }

    const name = names[idx];
    res.render("wazzup",{name});
});

app.put('/greet/:name', (req, res) => {
    const newName = req.params.name;
    names.push(newName);
    res.status(200).json({nameList: names});
});

app.get('/wazzup.html', (req, res) => {
    const name = req.query.name;
    res.render("wazzup",{name});
});

app.post('/task', (req, res) => {
    var task = req.body.item;
    tasks.push(task);
    res.redirect('/');
});

app.get('/task', (req, res) => {
    console.log(req.query);
    if(req.query.access === "postman\n"){
        res.json(tasks);    
    }
    else{
        res.status(403).json({error: "Use Postman"});
    }
});

app.post('/task/delete/:idx', (req, res) => {
    var index=req.params.idx;
    tasks.splice(index,1);
    res.redirect('/');
});

app.get("/remove/:idx",(req,res) => {
    var index=req.params.idx;
    tasks.splice(index,1);
    res.redirect('/');
});

app.get("/moveUp/:idx",(req,res) => {
    var index=parseInt(req.params.idx);
    var temp = tasks[index-1];
    tasks[index-1] = tasks[index];
    tasks[index] = temp;
    res.redirect('/');
});

app.get("/moveDown/:idx",(req,res) => {
    var index=parseInt(req.params.idx);
    var temp = tasks[index+1];
    tasks[index+1] = tasks[index];
    tasks[index] = temp;
    res.redirect('/');
});

app.listen(3000, ()=>{
    console.log(`Server is running on http://localhost:3000`);
});