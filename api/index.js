const express = require("express");
const cors = require("cors");
const app = express();

//----developer-----
global.__upload_dir = 'c:/temp/uploads';
global.__api_prefix = '/api';

//----production----
//global.__upload_dir = '/var/www/activity.msu.ac.th/uploads';
//global.__api_prefix= '/api/sas';




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






// trimmer MIDDLEWARE
 const {trimmer,debugShowURL} = require('./middleware/utils')
 app.use(debugShowURL);
// app.use(trimmer);

app.get("/", (req, res) => {
  res.send("test API OK!");
});

const authRoute = require("./route/auth.route");
app.use(__api_prefix, authRoute);
const userRoute = require("./route/user.route");
app.use(__api_prefix, userRoute);
const facultyRoute = require("./route/faculty.route");
app.use(__api_prefix, facultyRoute);
const activityRoute = require("./route/activity.route");
app.use(__api_prefix, activityRoute);
const agencyRoute = require("./route/agency.route");
app.use(__api_prefix, agencyRoute);
const activitytypeRoute = require("./route/activitytype.route");
app.use(__api_prefix, activitytypeRoute);
const enrollRoute = require("./route/enroll.route");
app.use(__api_prefix, enrollRoute);
const fileRouter = require("./route/file.route");
app.use(__api_prefix,fileRouter);

const uploadImageRouter = require("./route/uploadimage.route");
app.use(__api_prefix,uploadImageRouter);


// const docfileRouter = require("./route/docfile.route");
// app.use(__api_prefix,docfileRouter);

const docfileRouter = require("./route/docfile.route");
app.use(__api_prefix,docfileRouter);

const picfileRouter = require("./route/picfile.route");
app.use(__api_prefix,picfileRouter);

const studentRoute = require("./route/student.route");
app.use(__api_prefix, studentRoute);

const ticketRoute = require("./route/ticket.route");
app.use(__api_prefix, ticketRoute);

const checkinRoute = require("./route/checkin.route");
app.use(__api_prefix, checkinRoute);

const guestRoute = require("./route/guest.route");
app.use(__api_prefix, guestRoute);

// app.post('/api/v1/upload',(req,res)=>{
// 	console.log(req.body);
// 	res.status(200).send({"status":"ok"});
// })


const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
