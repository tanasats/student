const ticketModel = require("../model/ticket.model");

exports.getall = async (req,res) => {
  ticketModel.getall()
  .then(([row]) => {
    res.status(200).json(row);
  })
  .catch((error) => {
    console.log(error);
    res.status(400).send(error);
  }); 
}

exports.filter = async(req,res) => {
  console.log("ticket fillter req:",req.body)
  console.log("random :",generateRandomString(8));
  try{
    let page = parseInt( req.query.page )||1;
    let pagesize=parseInt( req.query.pagesize )||10;
    let keyword= req.query.keyword||'';
    const [[_results], [[_count]]] = await Promise.all([
      ticketModel.filter({page:page,pagesize:pagesize,keyword:keyword}),
      ticketModel.countfilter({keyword:keyword})
    ]);
    return res.status(200).json(
      {
        currentpage:page,
        totalpage:Math.ceil(_count.value/pagesize), 
        pagesize:pagesize,
        itemscount:_count.value,
        items:_results
      }
    )
  }catch(error){
    console.log(error);
    res.status(400).json(error);
  }
}

exports.getById = (req, res) => {
  const id = parseInt(req.params.id);
  ticketModel
    .getById({id:id})
    .then(([row]) => {
      res.status(200).json(row);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
};

exports.delete = (req, res) => {
  if (req.params.id) {
    ticketModel
      .delete({ id: req.params.id })
      .then(([row]) => {
        res.status(200).json(row);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  } else {
    res.status(400).send("Invalid request parameter");
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const datas = req.body;
  if (Object.keys(datas).length === 0) {
    // empty datas
    return res.status(400).send({ message: "Invalid request parameter" });
  }
  if (req.params.id) {
    // if (datas.password) {
    //   const saltRound = 10;
    //   const salt = await bcrypt.genSalt(saltRound);
    //   datas.password = await bcrypt.hash(datas.password, salt);
    // }
    delete datas.cdate;
    datas.mdate = new Date();
    ticketModel
      .update({ id: id, datas: datas })
      .then(([row]) => {
        res.status(200).json(row);
      })
      .catch((error) => {
        console.log(error);
        // if (error.message) {
        //   return res.status(400).send({ message: error.message });
        // }
        res.status(400).send(error);
      });
  } else {
    res.status(400).send({ message: "Invalid request parameter" });
  }
};

exports.genticket = async (req, res) => {
  const number = req.body.number;
  const activity_id = req.body.activity_id;
  const cowner = req.body.cowner;
  var counter=0;

  if (activity_id&&number>0) {
    
    for(let i=0;i<number;i++){
      const datas={
        "activity_id":activity_id,
        "activity_name":req.body.activity_name,
        "ticket_key":generateRandomString(8)
      }
      ticketModel.create({ datas: datas })
      .then(([row]) => {
        if(row.affectedRows){
          counter++;
          console.log(counter);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
    //res.status(200).json({"affectedRows":counter});
    res.status(200).json({"affectedRows":1});
  } else {
    res.status(400).send({ message: "Invalid request parameter" });
  }

}


exports.create = async (req, res) => {
  console.log(req.body);
  const datas = req.body;
  // datas.cdate = new Date();
  // datas.mdate = new Date();
  if (req.body.activity_id) {
    datas.ticket_key=generateRandomString(8)
    console.log("data:", datas);
    ticketModel
      .create({ datas: datas })
      .then(([row]) => {
        console.log("create()->result:", row);
        res.status(200).json(row);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  } else {
    res.status(400).send({ message: "Invalid request parameter" });
  }
};





function generateRandomString(length) {
  const characters = '0123456789ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnpqrtuy';
  let randomString = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
  }
  return randomString;
};