var fs = require("fs-extra");
var crypto = require("crypto");
var key = crypto.createHash("sha256").update("W4IG2lgO").digest();
var ivString = 'XAhORCRatM1mfwDE';
var iv = new Buffer(ivString, 'utf-8');

function encrypt(data) {
	var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
	var encrypted = cipher.update(data, 'utf-8');
	encrypted = Buffer.concat([iv, encrypted, cipher.final()]);
	return encrypted.toString('base64');
}

function decrypt(data) {
	var buf = new Buffer(data, 'base64');
	var iv = buf.slice(0, 16);
	var encryptedData = buf.slice(16);
	var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
	var decrypted = decipher.update(encryptedData, 'base64', 'utf-8');
	decrypted += decipher.final('utf8');
	return decrypted;
}

var IOS_PATH = '../Swift01/Swift01/game';
var ANDROID_PATH = '../Android/app/src/main/assets/game';

function readGameFiles(path, toPath) {
	if (!isDir(path)) {
		return;
	}
	if (!isDir(toPath)) {
		fs.mkdirsSync(toPath);
		if (toPath == ANDROID_PATH) {
			copyCommon();
			readGameFiles(path, toPath);
			return;
		}
	}
	fs.readdir(path, function(err, files) {
		if (err) {
			throw err;
		}
		for (var i = 0; i < files.length; i++) {
			if ( typeof files[i] == "undefined" || files[i] == ".DS_Store" || /*files[i] == "images" ||*/ files[i] == "index.html" || files[i] == "Sound" || files[i] == "js") {
				continue;
			}
			if (isDir(path + "/" + files[i])) {
				readGameFiles(path + "/" + files[i], toPath + "/" + files[i]);
			} else {
				// 同步读取
				var data = fs.readFileSync(path + "/" + files[i]);
				var toFullPath = toPath + "/" + files[i];
				if(path.indexOf("/images") > 0){
					data = data.toString('base64');
				}else{
					data = encrypt(data);
				}
				fs.writeFile(toFullPath, data, function(err) {
					if (err) {
						console.log("error:" + err);
					}
				});
			}
		}
	});
}

function isDir(filepath) {
	return fs.existsSync(filepath) && fs.statSync(filepath).isDirectory();
};
function command(cmd, callback) {
	require('child_process').exec(cmd, {
		timeout : 1000
	}, callback);
}

function copyCommon(callback) {
	fs.createReadStream(IOS_PATH + '/index.html').pipe(fs.createWriteStream(ANDROID_PATH + '/index.html'));
	fs.copySync(IOS_PATH + "/js", ANDROID_PATH + "/js");
	//fs.copySync(IOS_PATH + "/images", ANDROID_PATH + "/images");
}
if (isDir(ANDROID_PATH)) {
	fs.removeSync(ANDROID_PATH);
}
readGameFiles(IOS_PATH, ANDROID_PATH);
