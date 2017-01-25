const express = require("express");
const nunjucks = require("nunjucks");
const routes = require('./routes/');
const app = express();

//connecting express with nunjuncks
app.set("view engine", "html");
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true }); //cache off during development

app.use('/', routes);

app.use("/special/",function(req,res,next){
  console.log("This is a special place.");
  next();
})

app.use(function(req,res,next){
  console.log("Request: ",req.method,req.path);
  next();
})

app.listen(3000, function(){
  console.log("I'm listening")
})