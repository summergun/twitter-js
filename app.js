const express = require("express");
const nunjucks = require("nunjucks");
const app = express();

//connecting express with nunjuncks
app.set("view engine", "html"); //the default view engine to html, so we don't have to specify on every render
app.engine('html', nunjucks.render); //to use nunjucks.reder as the function to actually render html
nunjucks.render('index.html', locals, function (err, output) {
    console.log(output);
});


nunjucks.configure('views', { noCache: true });//point nunjucks to the proper directory for templates,cache off
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