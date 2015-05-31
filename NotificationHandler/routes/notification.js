/**
 * find notification for clients and push them back
 */

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://purval:purval@ds035702.mongolab.com:35702/itboons';

exports.notifications = function(data, callback){
	MongoClient.connect(url, function (err, db) {
	  if (err) {
	    console.log('Unable to connect to the mongoDB server. Error:', err);
	    db.close();
	    callback(err,"");
	  } else {
	    console.log('Connection established to', url);
	    var collection = db.collection("dbnotifications");
	    collection.find({name:data.userid, readflag:false}).toArray(function(err, docs) {
          console.log("Returned #" + docs.length + " documents");
          if(docs.length>0){
        	  modifynotifications(docs);  
          }
          db.close();
          callback(err,docs);
        });
	  }
	});
};

function modifynotifications(docs){
	MongoClient.connect(url, function (err, db) {
	  if (err) {
	    console.log('Unable to connect to the mongoDB server. Error:', err);
	    callback(err,"");
	  } else {
	    console.log('Connection established to', url);
	    var collection = db.collection("dbnotifications");
	    var iterator = 0;
	    while(iterator<docs.length){
	    	//console.log(docs[iterator]._id,docs[iterator].readflag);
	    	collection.update({_id:docs[iterator]._id}, {$set:{readflag:true}});
	    	iterator++;
	    }
	    db.close();
	  }
	});
};