const express = require("express");
const app = express();
const https = require("https");

// TODO: configure the express server
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,"public")));

const longContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

let posts = [];
let name;
let security;

app.get("/", (req, res) => {
  res.render("index",{posts,name});
});

app.get('/login',(req,res)=>{
  name = req.query.name;
  security = "Unsecure"
  res.render("home",{name,posts,security})
});

app.post('/login',(req,res)=>{
  name = req.body.name;
  security = "Secure"
  res.render("home",{name,posts,security})
});

app.get('/home',(req,res)=>{
  res.render("home",{name,posts,security})
});

app.post('/add',(req,res)=>{
  var Title = req.body.Title;
  var content = req.body.content;
  posts.push({"Title":Title,"content":content});
  res.render("home",{name,posts,content,Title,security});
});

app.get('/post/:idx',(req,res)=>{
  const idx = req.params.idx;
  const post = posts[idx];
  res.render("post",{name,post,index:idx,})
});

app.post('/edit/:idx',(req,res)=>{
  const idx = req.params.idx;
  posts[idx].Title = req.body.Title;
  posts[idx].content = req.body.content;
  res.redirect("/home");
});

app.post('/delete/:idx',(req,res)=>{
  const idx = req.params.idx;
  posts.splice(idx,1);
  res.redirect("/home");
});

app.get('/test',(req,res)=>{
  res.render("test",{name,posts})
});

app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});
