LPlugin.KEY_STAMP_LIST = "stampList";
LPlugin.KEY_EVENT_LIST = "eventList";
LPlugin.KEY_CHARACTER_LIST = "eventList";
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
		LPlugin._characters = LPlugin.GetData(LPlugin.KEY_CHARACTER_LIST);
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
LPlugin.SetData = function(key,data){
	if(LPlugin.writeToFile){
		LPlugin.writeToFile(key, JSON.stringify(data));
	}else{
		window.localStorage.setItem(key, JSON.stringify(data));
	}
};
LPlugin.GetData = function(key, defaultData){
	var data;
	if(LPlugin.readFile){
		data = LPlugin.readFile(key);
	}else{
		data = window.localStorage.getItem(key);
	}
	if(!data){
		return defaultData ? defaultData : {};
	}
	return JSON.parse(data);
};
LPlugin.volumeSE = 0;
LPlugin.volumeBGM = 0;
LPlugin.sounds = {};
LPlugin.playingBGM = null;
if(!LPlugin.playSE){
	LPlugin.playSE = function(name){
		LPlugin.playSound(name, 1, LPlugin.volumeSE);
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
		LPlugin.closeBGM();
		LPlugin.playingBGM = LPlugin.playSound(name, 1000, LPlugin.volumeBGM);
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
