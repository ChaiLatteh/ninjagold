var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
const route = require('./routes/route');
var session = require('express-session');

var sessionConfig = {
  secret:"thisissecret",
  resave:false,
  saveUninitialized: true,
  name:'myCookie',
  cookie:{
    secure:false,
    httpOnly:false,
    maxAge:3600000
  }
}

// app.all('/*', (req, res, next)=>{
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Method', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//   next();
// })

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/mixmaster');

//onconnection
mongoose.connection.on('connected', ()=>{
  console.log('Connected to database');
})
mongoose.connection.on('error',(err)=>{
  if(err){
    console.log('Error in Database connection: ' + err);
  }
});

app.use(session(sessionConfig));

const port = 3000;

app.use(cors({origin:[
  "http://localhost:4200"
], credentials:true}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'mixmaster', 'src')));

app.use('/api', route);

app.get('/', (req, res)=>{
  res.send('foobar');
})

app.listen(port,()=>{
  console.log('Server started at port: ' + port);
})
