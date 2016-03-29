function LPlugin(){
}
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
LPlugin.eventIsOpen = function(key){console.log("LPlugin.events()",LPlugin.events());
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
	window.localStorage.setItem(key, JSON.stringify(data));
};
LPlugin.GetData = function(key){
	var data = window.localStorage.getItem(key);
	if(!data){
		return {};
	}
	return JSON.parse(data);
};
