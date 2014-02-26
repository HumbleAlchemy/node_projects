var redis = require("redis"), client = redis.createClient();
var crypto = require('crypto');

client.on("error",function(err) {
	console.log("error: " + err);

});

function test() {
	// return getHash(email);
	var id = getHash(email);
	var key = "test:" + id;

	client.hmset(key,userSchema.name,name,userSchema.password,password,redis.print);
	client.sadd("test:users",key,redis.print);
}

function getHash(field) {
	var hash = crypto.createHash('md5').update(field).digest('hex');
	return hash;
}
function random (howMany, chars) {
    chars = chars 
        || "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
    var rnd = crypto.randomBytes(howMany)
        , value = new Array(howMany)
        , len = chars.length;
 
    for (var i = 0; i < howMany; i++) {
        value[i] = chars[rnd[i] % len]
    };
 
    return value.join('');
}

//console.log(random(10));