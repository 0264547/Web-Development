const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fs = require("fs");
const csv = require("csv-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

const mongoUrl = "mongodb://127.0.0.1:27017/f1";
mongoose.connect(mongoUrl);

const teamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  nationality: String,
  url: String,
});
teamSchema.set("strictQuery", true);

const driverSchema = new mongoose.Schema({
  num: Number,
  code: String,
  forename: String,
  surname: String,
  dob: Date,
  nationality: String,
  url: String,
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
});
driverSchema.set("strictQuery", true);

const Team = mongoose.model("Team", teamSchema);
const Driver = mongoose.model("Driver", driverSchema);
var drivers;
var activeDriver;
var sortedDrivers;

let countries = [
  { code: "ENG", label: "England" },
  { code: "SPA", label: "Spain" },
  { code: "GER", label: "Germany" },
  { code: "FRA", label: "France" },
  { code: "MEX", label: "Mexico" },
  { code: "AUS", label: "Australia" },
  { code: "FIN", label: "Finland" },
  { code: "NET", label: "Netherlands" },
  { code: "CAN", label: "Canada" },
  { code: "MON", label: "Monaco" },
  { code: "THA", label: "Thailand" },
  { code: "JAP", label: "Japan" },
  { code: "CHI", label: "China" },
  { code: "USA", label: "USA" },
  { code: "DEN", label: "Denmark" },
];

let teams = [
  { code: "mercedes", label: "Mercedes" },
  { code: "aston_martin", label: "Aston Martin" },
  { code: "alpine", label: "Alpine" },
  { code: "hass_f1", label: "Hass F1 Team" },
  { code: "red_bull", label: "Red Bull Racing" },
  { code: "alpha_tauri", label: "Alpha Tauri" },
  { code: "alpha_romeo", label: "Alpha Romeo" },
  { code: "ferrari", label: "Ferrari" },
  { code: "williams", label: "Williams" },
  { code: "mc_laren", label: "McLaren" }
];

async function readData(){
  var data = fs.readFileSync("public/data/f1_2023.csv","utf-8");
  var rows = data.split("\n");

  for (let i=1;i<rows.length;i++){
    values = rows[i].split(',');

    const dob = new Date(values[4]);

    if (isNaN(dob.getTime())) {
      continue;  
    }

    var team = new Team({
      id:i,
      name:values[7],
      nationality:values[5],
      url:values[6],
    });

    await team.save();

    var driver = new Driver({
      num: parseInt(values[0]),
      code: values[1],
      forename: values[2],
      surname: values[3],
      dob: new Date(values[4]),
      nationality: values[5],
      url: values[6],
      team: team._id,
    });
    await driver.save();
  }
}

async function middleware(req,res,next) {
  drivers = await Driver.find().populate("team").exec();
  res.locals.drivers = drivers;
  next();
}

readData();

app.get("/edit/:index", (req, res) => {
  var index = req.params.index;
  driver = drivers[index];
  activeDriver = index;

  res.render("edit",{driver,countries,teams});
});

app.post("/driver/:id", async (req, res) => {
  const driverId = req.params.id;
  const { num, code, name, lname, dob, url, nation, team: teamLabel } = req.body;
  const team = await Team.findOne({ label: teamLabel });

  const updTeam = await Team.findByIdAndUpdate(
    team._id,
    {
      name: teamLabel,
      nationality: nation,
      url,
    },
    { new: true }
  );

  const updateDriver = await Driver.findByIdAndUpdate(
    driverId,
    {
      num,
      code,
      forename: name,
      surname: lname,
      dob: new Date(dob),
      url,
      nationality: nation,
      team: team._id, 
    },
    { new: true }
  ).populate("team");

  res.redirect('/');
});

app.get("/sorted", async (req, res) => {
  drivers = await Driver.find().populate("team").exec();

  drivers.sort((a, b) => {
    if (a.team && b.team) {
      return a.team.name.localeCompare(b.team.name);
    }
    return 0; 
  });

  res.render("sorted", { drivers, countries, teams });
});

app.get("/", middleware, (req, res) => {
  res.render("index", { drivers:res.locals.drivers, countries, teams });
});

app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});
