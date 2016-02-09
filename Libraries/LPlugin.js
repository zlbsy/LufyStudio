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
LPlugin.setCharacter = function(id, charaData){
	var data = LPlugin.characters();
	var index = id ? data.findIndex(function(child){
		return child.id == id;
	}) : -1;
	if(index >= 0){
		data.splice(index, 1, charaData)
	}else{
		data.push(charaData);
	}
	LPlugin.SetData(LPlugin.KEY_CHARACTER_LIST, data);
/*{id:1,faceImg:1000,gender:1,force:72,intelligence:92,command:99,agility:82,luck:96,born:155,life:5,personalLoyalty:6,ambition:15,disposition:0,skill:2,compatibility:25,initTroops:100,initStrategy:20,soldiers:[{id:1,proficiency:900},{id:2,proficiency:500},{id:3,proficiency:600},{id:4,proficiency:0},{id:5,proficiency:0},{id:6,proficiency:0},{id:7,proficiency:0},{id:8,proficiency:0},{id:9,proficiency:0},{id:10,proficiency:0},{id:11,proficiency:700},{id:12,proficiency:600},{id:13,proficiency:0},{id:14,proficiency:0},{id:15,proficiency:0},{id:16,proficiency:0},{id:17,proficiency:0},{id:18,proficiency:0},{id:19,proficiency:0}],groupSkill:0}*/
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
