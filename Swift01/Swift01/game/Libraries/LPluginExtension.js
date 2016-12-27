LPlugin.KEY_STAMP_LIST = "stampList";
LPlugin.KEY_EVENT_LIST = "eventList";
LPlugin.KEY_CHARACTER_LIST = "characterList";
if(!LPlugin.bundleVersion){
	LPlugin.bundleVersion = function(){
		return LMvc.ver;
	};
}
LPlugin.DictionaryIsRead = function(key){
	if(key){
		return LPlugin.GetData("Dictionary_" + key + "_" + LMvc.ver, 0);
	}
	for(var i=0,l=dictionaryConfig.length;i<l;i++){
		var word = dictionaryConfig[i];
		if(LPlugin.dataVer(word.ver) >= LPlugin.dataVer(LMvc.ver) && !LPlugin.GetData("Dictionary_" + word.key + "_" + LMvc.ver, 0)){
			return 0;
		}
	}
	return 1;
};
LPlugin.ReadDictionary = function(key){
	return LPlugin.SetData("Dictionary_" + key + "_" + LMvc.ver, 1);
};
LPlugin.stamps = function(){
	if(!LPlugin._stamps){
		LPlugin._stamps = LPlugin.GetData(LPlugin.KEY_STAMP_LIST);
	}
	return LPlugin._stamps;
};
LPlugin.events = function(){
	if(!LPlugin._events){
		LPlugin._events = LPlugin.GetData(LPlugin.KEY_EVENT_LIST);
	}
	return LPlugin._events;
};
LPlugin.characters = function(){
	if(!LPlugin._characters){
		LPlugin._characters = LPlugin.GetData(LPlugin.KEY_CHARACTER_LIST, null) || LPlugin.GetData(LPlugin.KEY_EVENT_LIST);
		if(!LPlugin._characters.list){
		LPlugin._characters.list = [];
	}
	}
	return LPlugin._characters;
};
LPlugin.stampIsOpen = function(key){
	return LPlugin.stamps()[key] ? true : false;
};
LPlugin.openStamp = function(key){
	LPlugin.stamps()[key] = 1;
	LPlugin.SetData(LPlugin.KEY_STAMP_LIST, LPlugin.stamps());
};
LPlugin.eventIsOpen = function(key){
	return LPlugin.events()[key] ? true : false;
};
LPlugin.openEvent = function(key){
	LPlugin.events()[key] = 1;
	LPlugin.SetData(LPlugin.KEY_EVENT_LIST, LPlugin.events());
};
LPlugin.setCharacter = function(charaData){
	var data = LPlugin.characters();
	var index = charaData.id ? data.list.findIndex(function(child){
		return child.id == charaData.id;
	}) : -1;
	if(index >= 0){
		data.list.splice(index, 1, charaData);
	}else{
		data.list.push(charaData);
	}
	LPlugin.SetData(LPlugin.KEY_CHARACTER_LIST, data);
};
LPlugin.dataVer = function(ver){
	if(typeof ver == UNDEFINED){
		ver = LMvc.ver;
		var GameData = LPlugin.GetData("GameData", null);
		if(GameData && GameData.ver >= ver){
			ver = GameData.ver;
		}
	}
	var arr = ver.split(".");
	return parseInt(arr[0]) * 100000 + parseInt(arr[1]) * 1000 + parseInt(arr[2]);
};
LPlugin.SetData = function(key,data){
	if(LPlugin.writeToFileInDomain){
		LPlugin.writeToFileInDomain(key, JSON.stringify(data));
	}else{
		try{
			window.localStorage.setItem(key, JSON.stringify(data));
		}catch(e){
			console.error("not supported window.localStorage", data);
		}
	}
};
LPlugin.GetData = function(key, defaultData){
	var data;
	if(LPlugin.readFileInDomain){
		data = LPlugin.readFileInDomain(key);
	}else{
		try{
			data = window.localStorage.getItem(key);
		}catch(e){
			console.error("not supported window.localStorage");
		}
	}
	if(!data){
		return (typeof defaultData != UNDEFINED) ? defaultData : {};
	}
	var result;
	try{
		result = JSON.parse(data);
	}catch(e){
		result = {};
		console.error("not json error", data);
	}
	return result;
};
LPlugin.DeleteData = function(key){
	if(LPlugin.deleteFileInDomain){
		LPlugin.deleteFileInDomain(key);
	}else{
		window.localStorage.setItem(key, null);
	}
};
LPlugin.languageDefault = "chinese";
LPlugin.language = function(value){
	if(typeof value !== UNDEFINED){
		LPlugin.SetData("language", value);
		LPlugin._language = value;
		return;
	}
	if(LPlugin._language){
		return LPlugin._language;
	}
	LPlugin._language = LPlugin.GetData("language", null);
	if(!LPlugin._language){
		var languages = {
			"japanese":"japanese",
			"ja-JP":"japanese"
		};
		LPlugin._language = languages[LPlugin.preferredLanguage()];
		if(!LPlugin._language){
			return LPlugin.languageDefault;
		}
	}
	return LPlugin._language;
};
if(!LPlugin.preferredLanguage){
	LPlugin.preferredLanguage = function(){
		return LPlugin.languageDefault;
	};
}
if(!LPlugin.print){
	LPlugin.print = trace;
}
if(!LPlugin.openURL){
	LPlugin.openURL = function(url){
		window.open(url);
	};
}
LPlugin.sounds = {};
LPlugin.volumeSE = 1;
LPlugin.volumeBGM = 1;
LPlugin.playingBGM = null;
if(!LPlugin.playSE){
	LPlugin.playSE = function(name){
		if(LPlugin.gameSetting.SE){
			LPlugin.playSound(name, 1, 1);
		}
	};
}
LPlugin.closeBGM = function(){
	if(!LPlugin.native && LPlugin.playingBGM){
		LPlugin.playingBGM.close();
		LPlugin.playingBGM = null;
	}
};
if(!LPlugin.playBGM){
	LPlugin.playBGM = function(name){
		if(LPlugin.gameSetting.BGM){
			LPlugin.closeBGM();
			LPlugin.playingBGM = LPlugin.playSound(name, 1000, 1);
		}
	};
}
LPlugin.readyBGM = function(name){
	if(LPlugin.native || LPlugin.sounds[name]){
		return;
	}
	LPlugin.playBGM(name, 1, LPlugin.playingBGM);
	LPlugin.closeBGM();
};
LPlugin.playSound = function(name, count, volume){
	if(!LPlugin.soundData || !LPlugin.soundData[name]){
		return null;
	}
	if(!count){
		count = 1;
	}
	var sound;
	if(LPlugin.sounds[name]){
		sound = LPlugin.sounds[name];
	}else{
		sound = new LSound();
		sound.load(LPlugin.soundData[name]);
		LPlugin.sounds[name] = sound;
	}
	sound.setVolume(volume);
	sound.play(0, count);
	return sound;
};
