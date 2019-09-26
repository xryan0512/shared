var express =  require('express');
// var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Product = require('../src/models/Product')

const app = express();
const router = express.Router();

// app.use(cors());
app.use(bodyParser.json());
var db = mongoose.connect('mongodb://localhost:27017/ebanisteria', (err, res)=>{
    if(err){
        console.log(err)
    }else{
        // console.log( 'Connected to' + db , ' ', res )
    }
})
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials',true);
    next();
})
const connection = mongoose.connection;

connection.once('open', _ => {
  console.log('MongoDB database connection established');
})


var model = mongoose.model('product', Product, 'product')

app.get('/data', (req, res) => {
    model.find({}, (err, data) => {
        res.json(data);
    })
})  
//aqui el update no me fucniona
app.put('/update', (req, res) => {
    console.log(req.body._id)
    model.findByIdAndUpdate(req.body._id, req.body, (err, data) => {
        if (err) return res.send(500, { error: err });
        return res.send("succesfully saved");
        
    });
    // model.updateOne({_id:req.body._id}, req.body, (err, result) => {
    //   if (err) return res.send(err)
    //   res.send(result)
    // })
})

app.get('/', function (req, res) {
    res.send('Welcome to APIs.')
  })

app.listen(3000, function () {
    console.log('Web app service listening on port 3000!')
})




