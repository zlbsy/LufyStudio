var fs = require("fs");
/*
var crypto = require("crypto");
var key = crypto.createHash("sha256").update("RwcmlVpg").digest();
var iv = '4e5Wa71fYoT7MFEX';
function cipher(mode, data){
	var encipher = crypto[mode]("aes-256-cbc", key, iv);
	var encoded = encipher.update(data);
	encoded += encipher.final();
	return encoded;
}
function b64enc(data){
	var b = new Buffer(data, "binary");
	return b.toString("base64");
}
function encrypt(data){
	var cipherData = cipher("createCipheriv", data);
	return b64enc(cipherData);
}
var src = 'Hello,CryptWorld';
console.log(encrypt(src));*/
var crypto = require('crypto');

var SimpleEncrypt = (function () {
  function cipher(mode, key, iv, data) {console.log(key, iv);
    var encipher = crypto[mode]('aes-256-cbc', key, iv);
    var encoded  = encipher.update(data);
    encoded += encipher.final();
    return encoded;
  }  

  function encrypt(key, iv, data) {
    return cipher('createCipheriv', key, iv, data);
  }

  function decrypt(key, iv, data) {
    return cipher('createDecipheriv', key, iv, data);
  }

  function b64enc(data) {
      var b   = new Buffer(data, 'binary');
      return b.toString('base64');
  }

  return {
    encrypt: encrypt,
    decrypt: decrypt,
    b64enc: b64enc
  };
}());
var cryptkey   = crypto.createHash('sha256').update('RwcmlVpg').digest();
var iv         = '4e5Wa71fYoT7MFEX';
var buf        = "my test"; // 32 chars
var enc        = SimpleEncrypt.encrypt(cryptkey, iv, buf);
//var dec        = SimpleEncrypt.decrypt(cryptkey, iv, enc);


console.warn("Encoded : ", enc);
console.warn("Encoded length: ", enc.length);
console.warn("Encoded in Base64:", "<" + SimpleEncrypt.b64enc(enc) + ">");
//console.warn("Decoded:", dec);
/*
 // 异步读取
 fs.readFile('input.txt', function (err, data) {
 if (err) {
 return console.error(err);
 }
 console.log("异步读取: " + data.toString());
 });

 // 同步读取
 var data = fs.readFileSync('input.txt');
 console.log("同步读取: " + data.toString());

 console.log("程序执行完毕。" + process.argv.length);
 */
var IOS_PATH = '../Swift01/Swift01/game';
var ANDROID_PATH = '../Android/app/src/main/assets/game1';

//fs.rmdirSync(ANDROID_PATH);
function readGameFiles(path, toPath){
	fs.readdir(path, function(err, files) {
		if (err){
			throw err;
		}return;
		for (var i = 0; i < files.length; i++) {
			if (files[i] == ".DS_Store" || files[i] == "Sound" || files[i] == "images" || files[i] == "js"){
				continue;
			}
			if(isDir(path + "/" + files[i])){
				readGameFiles(path + "/" + files[i], toPath + "/" + files[i]);
			}else{
				
			}
		}
	});
}
var isDir = function(filepath) {  
  return fs.existsSync(filepath) && fs.statSync(filepath).isDirectory();
};
if(isDir( ANDROID_PATH )){
	var cmd = 'rm -r ' + ANDROID_PATH;
	require('child_process').exec(cmd, {
		timeout : 1000
	}, function(error, stdout, stderr) {
		console.log('stdout: ' + (stdout || 'none'));
		console.log('stderr: ' + (stderr || 'none'));
		if (error !== null) {
			console.log('exec error: ' + error);
		} else {
			readGameFiles(IOS_PATH, ANDROID_PATH);
		}
	});
}else{
	readGameFiles(IOS_PATH, ANDROID_PATH);
}
