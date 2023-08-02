const express = require("express");
const cors = require("cors");
const app = express();



const bodyParser = require('body-parser');
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();

var corsOptions = {
  origin: ["http://localhost:4200", "http://0.0.0.0:4200"],
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

global.__basedir = 'c:/temp';
//global.__basedir = 'd:/ActivityTranscriptSystem/studentactivity/api'

// trimmer MIDDLEWARE
// const {trimmer,debugShowURL} = require('./middleware/utils')
// app.use(debugShowURL);
// app.use(trimmer);

app.get("/", (req, res) => {
  res.send("test API OK!");
});

const authRoute = require("./route/auth.route");
app.use("/api", authRoute);
const userRoute = require("./route/user.route");
app.use("/api", userRoute);
const facultyRoute = require("./route/faculty.route");
app.use("/api", facultyRoute);
const activityRoute = require("./route/activity.route");
app.use("/api", activityRoute);
const agencyRoute = require("./route/agency.route");
app.use("/api", agencyRoute);
const activitytypeRoute = require("./route/activitytype.route");
app.use("/api", activitytypeRoute);
const enrollRoute = require("./route/enroll.route");
app.use("/api", enrollRoute);
const fileRouter = require("./route/file.route");
app.use("/api",fileRouter);

const uploadImageRouter = require("./route/uploadimage.route");
app.use("/api",uploadImageRouter);


// const docfileRouter = require("./route/docfile.route");
// app.use("/api",docfileRouter);

const docfileRouter = require("./route/docfile.route");
app.use("/api",docfileRouter);

const picfileRouter = require("./route/picfile.route");
app.use("/api",picfileRouter);

const studentRoute = require("./route/student.route");
app.use("/api", studentRoute);


// app.post('/api/v1/upload',(req,res)=>{
// 	console.log(req.body);
// 	res.status(200).send({"status":"ok"});
// })


const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
