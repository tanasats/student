const authModel = require("../model/auth.model");
const bcrypt = require("bcrypt");
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");

exports.tokenizer = (req, res) => {
  //var _token = req.body.token; 
  const token = req.headers["x-access-token"];
  console.log(token);
  const secret = config.appSecret;

  jwt.verify(token, secret, function (err, decoded) {
    if (err) {
      console.log(err.name);
      return res.status(401).send(err.name);
    }
    let _decode = jwt.decode(token);
    console.log("tokenizer decode:", _decode);
    //---Authorized----
    let app_token = jwt.sign({ username: _decode.username }, config.secret, {
      expiresIn: config.jwtExpiration,
    });
    res.status(200).json({
      //id: user.userid,
      username: _decode.username,
      //email: user.email,
      //roles: authorities,
      access_token: app_token, //<-- this is app token
      //refreshToken: refreshToken,
    });
  });
};

// app_signin
// return 401:{message:"0"} when username not found in app database.
// return 401:{message:"1"} when username already in app database but invalid password.
// return 401:{message:"2"} when username already but no password in app database.
// return 200:{username,access_token}
// return 500:{}
exports.signin = async (req, res) => {
  console.log("auth signin()")
  let username = req.body.username;
  let password = req.body.password;
  authModel
    .findUsername(username)
    .then(([row]) => {
      
      if (row.length === 0) {
        return res.status(401).send({ message: "0" });//return "Not found User!"
      }

      let [user] = row;
      console.log("found user data :", user);
      if (user.password == null) {
        return res.status(401).send({ message: "2" });
      }

      let passwordIsValid = bcrypt.compareSync(password || "", user.password);
      if (!passwordIsValid) {
        return res.status(401).send({ message: "1" }); //has username but invalid password
      }

      //---Authorized----
      let payload={
        username: user.username,
        user_id: user.user_id,
        user_type: user.user_type,
        faculty_id: user.faculty_id,
        faculty_name: user.faculty_name,
      }
      let token = jwt.sign(payload, config.secret, {
        expiresIn: config.jwtExpiration,
      });
      res.status(200).json({
        //id: user.userid,
        username: user.username,
        //email: user.email,
        //roles: authorities,
        access_token: token,
        //refreshToken: refreshToken,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: error });
    });
}; //signin

exports.me = (req, res) => {
  var token = req.headers["x-access-token"];
  try {
    const _decode = jwt.verify(token, config.secret);
    console.log("access_token_decode:", _decode);
    authModel
      .findUsername(_decode.username)
      .then(([row]) => {
        //console.log("numrow:", row.length);
        //console.log("app_user_info:",row);
        if (!row.length) {
          return res
            .status(401)
            .json({ message: _decode.username + " not found !!" });
        }
        return res.status(200).send(row);
      })
      .catch((error) => {
        return res.status(401).send(error);
      });
  } catch (err) {
    return res.status(401).send(err);
  }
};

// ทำการลงทะเบียน โดยรับข้อมูล user จาก AD พร้อมทั้งกำหนด role
// exports.register = async (req, res) => {
//   //console.log(req.body);
//   var datas = {
//     username: req.body.username,
//     password: req.body.password,
//     usertype: req.body.usertype,
//     studentcode: req.body.studentcode,
//     displayname: req.body.fullname,
//     faculty_name: req.body.faculty,
//     prefixname: req.body.prefixname,
//     fname: req.body.name,
//     sname: req.body.surname,
//     fname_en: req.body.nameeng,
//     sname_en: req.body.surnameeng,
//     email: req.body.email,
//   };
//   if (datas.password) {
//     const saltRound = 10;
//     const salt = await bcrypt.genSalt(saltRound);
//     datas.password = await bcrypt.hash(datas.password, salt);
//   }
//   await authModel.get_faculty_id(req.body.faculty).then(([[row]]) => {
//     console.log("faculty:", row || "no faculty_id in database");
//     if (row == undefined) {
//       console.log("Unknow faculty_id");
//       //return res.status(500).json({message:"Unknow faculty_id"});
//     }
//     datas.faculty_id = row.faculty_id;
//   });
//   //console.log('userinfo:',datas);
//   authModel
//     .register({ datas })
//     .then(([row]) => {
//       //console.log("register:", row);
//       //console.log("insertId:", row.insertId);

//       if (datas.usertype == "student") {
//         console.log("try to add stuent role");
//         authModel
//           .addRole(row.insertId, 1)
//           .then(([row]) => {
//             console.log("addrole response:", row);
//             return res.status(200).send({ message: "User registered" });
//           })
//           .catch((err) => {
//             console.log(err);
//             return res
//               .status(401)
//               .send({ message: "add student role error :" + err });
//           });
//       }
//     })
//     .catch((err) => {
//       console.log("err register:", err);
//       return res.status(401).send(err);
//     });
//   //res.status(200).send("test");
// };


exports.register = (req, res) => {
  let datas = {
    username: req.body.username,
    fullname: req.body.fullname,
    usertype: req.body.usertype,
  };
  console.log(datas);
  authModel
    .register(datas)
    .then(([res]) => {
      res.status(200).json(row);
    })
    .catch((err) => {
      console.log("err:",err);
      res.status(500).json(err);
    }); 
};

exports.changerole = (req,res)=>{
  const userId = req.body.userId;
  const role_id = req.params.role_id;
  console.log("userId:",userId," role_id:",role_id);
}


exports.setpassword = async (req, res) => {
  let datas = req.body;
  if (datas.password) {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    datas.password = await bcrypt.hash(datas.password, salt);
  }
  console.log(datas);
  await authModel
    .setpassword(datas.password, datas.username)
    .then(([row]) => {
      console.log(row);
      res.status(200).json(row);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
};
