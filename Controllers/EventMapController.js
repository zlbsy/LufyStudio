function EventMapController(){
	base(this,MyController,[]);
}
EventMapController.prototype.construct=function(){
	var self = this;
	self.initOver = false;
	LMvc.keepLoading(true);
	self.configLoad();
};
EventMapController.prototype.configLoad=function(){
	var self = this;
	self.load.config(["Character"],self.helperLoad);
};
EventMapController.prototype.helperLoad=function(){
	var self = this;
	self.load.helper(["Talk"],self.init);
};
EventMapController.prototype.init=function(){
	var self = this;
	LMvc.EventMapController = self;
	LMvc.keepLoading(false);
	
	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY);
	
	if(!LMvc.EventListController){
		LMvc.MapController.view.visible = false;
	}else{
		LMvc.EventListController.view.visible = false;
	}
	LGlobal.script.analysis();
};
EventMapController.prototype.close=function(){
	var self = this;
	self.view.remove();
	if(SeigniorExecute.running){
		LMvc.MapController.view.visible = true;
		SeigniorExecute.run();
	}else if(LMvc.EventListController){
		LMvc.EventListController.view.visible = true;
	}else{
		LMvc.MapController.view.visible = true;
	}
};
EventMapController.prototype.mapShow=function(mapIndex){
	this.view.mapShow(mapIndex);
};
EventMapController.prototype.messageShow=function(msg, speed){
	this.view.messageShow(msg, speed);
};
EventMapController.prototype.addCharacter=function(id,x,y,animation){
	this.view.addCharacter(id,x,y,animation);
};
EventMapController.prototype.talk=function(id,message){
	this.view.talk(id,message);
};
EventMapController.prototype.removeCharacter=function(id,animation){
	this.view.removeCharacter(id,animation);
};