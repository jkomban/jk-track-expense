var express = require('express');
const app = express();
//const port = 3014;
const port = process.env.PORT;
const dbuser = process.env.dbuser;
const dbpass = process.env.dbpass;
console.log("PORT is: ",port,"user",dbuser);

var mongoose = require('mongoose');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var dbConfig = require('./config/db');

var url = dbConfig.atlastlab_prefix + dbuser+":"+dbpass+dbConfig.atlastlab_postfix;

//console.log(url);
// DB CONNECT
// Mlab 
// Atlas Cloud DB
mongoose.connect(url);




app.use(express.static( __dirname + '/public' ) );
app.use(express.static( __dirname + '/public/mainCtrl.js' ) );

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('X-HTTP-Method-Override'));



// DB MODEL
var expenseSchema = mongoose.model('expense', {

		dateOfPurchase: { type: Date , default: Date.now },
		item: { type: String , default: "NA" },
		store: { type: String , default: "NA" },
		amount: { type: Number , default: 0 }
	});


// CRUD Routes
app.get('/jexpense/expenses', function(req,res) {

	console.log("Request Received here");

	expenseSchema.find( function(err, dbData) {

	console.log("GET",dbData);
			if(err) res.send(err);
			else res.json(dbData);
		});
	});

app.post('/jexpense/expenses', function(req,res) {

	console.log("POST| ", req.body);
	expenseSchema.create(
		{ 
		dateOfPurchase: req.body.dateofpurchase,
		item: req.body.item,
		store: req.body.store,
		amount: req.body.amount,
		done: false
		}
		, function(err, dbData){
	
			if(err) res.send(err);
			
			expenseSchema.find( function(err, dbData) {
				if(err) 
					res.send(err);
				res.json(dbData);
				});

			});
			
	});

app.delete('/jexpense/expenses', function(req,res) {

	expenseSchema.remove( {
			_id: req.body.expenses_id
		}, function(err, dbData) {

			if(err)
				res.send(err);

			expenseSchema.find( function(err, dbData) {
				if(err)
					res.send(err);
				res.json(dbData);
				});

		});

	});

app.get('*', function(req,res) {

		res.sendFile( path.resolve('./public/index.html')) ;
	
	});

app.listen(port);

console.log('Application server running at [ http://localhost:',port ,' ]');
