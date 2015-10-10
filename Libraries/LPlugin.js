function LPlugin(){
}
LPlugin.KEY_STAMP_LIST = "stampList";
LPlugin.KEY_EVENT_LIST = "eventList";
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
