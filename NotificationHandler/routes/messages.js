/**
 * insert messages in mongodb
 */
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://purval:purval@ds035702.mongolab.com:35702/itboons';

exports.insertmessage = function(req, res){
	MongoClient.connect(url, function (err, db) {
	  if (err) {
	    console.log('Unable to connect to the mongoDB server. Error:', err);
	  } else {
	    console.log('Connection established to', url);
	    var collection = db.collection("dbnotifications");
	    var message = {name: req.body.name, message: req.body.message, timestamp:new Date(), readflag: false};
	    
	    collection.insert(message, function (err, result) {
	      if (err) {
	        console.log(err);
	        res.send(err);
	      } else {
	        //console.log('Inserted %d documents into the "dbnotifications" collection. The documents inserted with "_id" are:', result.length, result);
	    	console.log("message saved");
	        res.send('success');
	      }
	      db.close();
	    }); 
	  }
	});
};
