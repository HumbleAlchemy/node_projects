var redis = require("redis"), client = redis.createClient();
var crypto = require('crypto');

client.on("error",function(err) {
	console.log("error: " + err);
});

var userSchema = {
	name : "name",
	password : "password"
};

module.exports.setUserDetails = function (email,name,password) {
	// return getHash(email);
	var id = getHash(email);
	var key = "users:" + id;

	client.hmset(key,userSchema.name,name,userSchema.password,password,redis.print);
	client.sadd("myapp:users",key,redis.print);
}

module.exports.getUserDetails = function (email) {
	//check if user exists
	var id = getHash(email);
	var key = "users:" + id;
	client.sismember("myapp:users",key,function(err,reply){
		if(!err) {
			console.log(reply);
			if(reply == 1) {
				client.hget(key,userSchema.name,redis.print);
			}
		} else {
			console.log("not a member");
		}
	})
}

function getHash(field) {
	var hash = crypto.createHash('md5').update(field).digest('hex');
	return hash;
}


email = "abhi@gmail.com"
name = "abhishek"
password = "pass"

//setUserDetails(email,name,password);
//getUserDetails(email);

//console.log("md5: " + setUserDetails("abhishek@gmail.com","ABhishek","pass"));