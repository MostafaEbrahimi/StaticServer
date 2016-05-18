var express = require('express');
var path = require('path');
var fs = require('fs');
var router=express.Router();
var app=express();


//Staring server on port 3030
app.listen(3036,function() {
  console.log("server was started on port 3036");
})

//make this folders static: can access without route
app.use("/css",express.static(__dirname+"/css"));
app.use("/view",express.static(__dirname+"/view"));
app.use("/js",express.static(__dirname+"/css"));

//set express.Router() for app
app.use("/router",router);


//you can use this method and ignore {{{{app.use("/view",express.static(path.join(__dirname),"/view"));}}}} to using 404.page (Not Found Page )
//if file not exist in the view folder it send file 404.html
app.get(/(.+)$/,function(req,res) {
  //test if file exist
  try {
    if(fs.statSync(path.join(__dirname,"./view",req.params[0]+".html")).isFile()){
      res.sendFile(req.params[0]+".html",{root:path.join(__dirname,"./view")});
    }
  } catch (e) {
    console.log(e);
    res.sendFile("404.html",{root:path.join(__dirname,"./view")});
  }
});


//path / for router e.g : http://localhost:3030/router/
router.get("/",function(req,res){
  res.end("This is root path of the routee /router");
});


//path / for app e.g : http://localhost:3030/
app.get("/",function (req,res) {
  res.sendFile("index.html",{root:__dirname+"/view"});
})




//for starting server.js and have realtime change on server.js code please use `nodemon`  >> syntax : nodemon server.js
