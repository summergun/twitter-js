const express = require("express");
const nunjucks = require("nunjucks");
const app = express();

//connecting express with nunjuncks
app.set("view engine", "html");
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });
app.get('/', (req, res, next)=> {
  res.render('index', { hello: 'summer'});
});

app.use("/special/",function(req,res,next){
  console.log("Reserve a place here");
  next();
})

app.use(function(req,res,next){
  console.log("Request: ",req.method,req.path);
  next();
})

app.listen(3000, function(){
  console.log("I'm listening")
})