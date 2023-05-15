const express = require("express");
const cors = require("cors");
const app = express();

//const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("dotenv").config();

var corsOptions = {
  origin: ["http://localhost:4200", "http://0.0.0.0:4200"],
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

//global.__basedir = 'c:/temp';
//global.__basedir = 'd:/ActivityTranscriptSystem/studentactivity/api'

// trimmer MIDDLEWARE
// const {trimmer,debugShowURL} = require('./middleware/utils')
// app.use(debugShowURL);
// app.use(trimmer);

app.get("/", (req, res) => {
  res.send("test API OK!");
});

//AUTH ROUTE
const authRoute = require("./route/auth.route");
app.use("/api", authRoute);
//User ROUTE
const userRoute = require("./route/user.route");
app.use("/api", userRoute);
//Faculty ROUTE
const facultyRoute = require("./route/faculty.route");
app.use("/api", facultyRoute);
//Activity ROUTE
const activityRoute = require("./route/activity.route");
app.use("/api", activityRoute);
//Agency ROUTE
const agencyRoute = require("./route/agency.route");
app.use("/api", agencyRoute);
//ActivityType ROUTE
const activitytypeRoute = require("./route/activitytype.route");
app.use("/api", activitytypeRoute);
//Enroll ROUTE
const enrollRoute = require("./route/enroll.route");
app.use("/api", enrollRoute);


// app.post('/api/v1/upload',(req,res)=>{
// 	console.log(req.body);
// 	res.status(200).send({"status":"ok"});
// })

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
