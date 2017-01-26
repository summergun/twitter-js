const express = require("express");
const nunjucks = require("nunjucks");
const routes = require('./routes');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const socketio = require('socket.io')
const server = app.listen(3001);
const io=socketio.listen(server);

//connecting express with nunjuncks
app.set("view engine", "html"); //the default view engine to html, so we don't have to specify on every render
app.engine('html', nunjucks.render); //to use nunjucks.reder as the function to actually render html
nunjucks.render('index.html', function (err, output) {
    console.log(output);
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// use this routes to io
app.use('/', routes(io));
//app.use('/',routes);


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

// app.listen(3001, function(){
//   console.log("I'm listening")
// })