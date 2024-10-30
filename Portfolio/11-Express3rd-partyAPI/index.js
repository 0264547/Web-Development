const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

var lat;
var lon;
var temp;
var description;
var index;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html")); 
});

app.post("/", (req, res) => {
    const cityName = req.body.cityName;
    var url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=384bfbe001b309c26dfcb17d83e9be7c`;
    
    https.get(url, (response) => {
        var resContent='';
        response.on("data", (data) => {
            resContent += data;
        }).on("end",()=>{
            var jsonObj = JSON.parse(resContent);

            lat = jsonObj[0].lat;
            lon = jsonObj[0].lon;

            var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=384bfbe001b309c26dfcb17d83e9be7c`;
            https.get(url, (response) => {
                var resContent='';
                response.on("data", (data) => {
                    resContent += data;
                }).on("end",()=>{
                    var jsonObj = JSON.parse(resContent);
                    temp = jsonObj.main.temp;
                    description = jsonObj.weather[0].description;
                    index = jsonObj.weather[0].icon;
                    icon = `http://openweathermap.org/img/wn/${index}@2x.png`;
                    res.send(`The temperature at ${cityName} is ${temp}°C. <br> Description: ${description}. <br> <img src="${icon}" alt="WeatherIcon"> <br> <a href="/">Go Back</a>`);
                }).on("error",(e)=>{
                    console.log("Got an error {e meesage}");
                });
            });
        }).on("error",(e)=>{
            console.log("Got an error {e meesage}");
        });
    });
});

app.listen(3000, () => {
    console.log("Listening to port 3000");
  });
