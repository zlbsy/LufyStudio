function EventListChildView(eventObject) {
	var self = this;
	base(self, LListChildView, []);
	self.eventObject = eventObject;
	self.lock = !LPlugin.eventIsOpen(eventObject.id);
	self.preparing = (self.eventObject.condition.from && self.eventObject.condition.from.year >= 2000);
	self.set();

}
EventListChildView.prototype.layerInit=function(){
	var self = this;
	self.layer = new LSprite();
	self.addChild(self.layer);
};
EventListChildView.prototype.loadOver=function(event){
	var self = event.currentTarget.parent.parent;
	self.cacheAsBitmap(false);
	self.updateView();
};
EventListChildView.prototype.getWidth=function(){
	return 220;
};
EventListChildView.prototype.getHeight=function(){
	return 100;
};
EventListChildView.prototype.set=function(){
	var self = this;
	self.layerInit();
	self.loadCompleteCount = 0;
	
	var width = self.getWidth(), height = self.getHeight();
	
	var winPanel = new LPanel(new LBitmapData(LMvc.datalist["win05"]),width,height);
	self.layer.addChild(winPanel);
	
	if(!self.preparing){
		var icon = new BitmapSprite(LMvc.IMG_PATH + "event_list/"+self.eventObject.id+".png", null,new LPoint(width - 10,height - 10));
		icon.x = 5;
		icon.y = 5;
		icon.addEventListener(LEvent.COMPLETE,self.loadOver);
		self.layer.addChild(icon);
	}
	var name = getStrokeLabel(Language.get("event_" + self.eventObject.id),16,"#FFFFFF","#000000",4);
	name.x = 10;
	name.y = 10;
	self.layer.addChild(name);
	if(self.preparing){
		self.layer.addChild(getTranslucentBitmap(width,height));
		var preparingLabel = getStrokeLabel(Language.get("preparing"),16,"#FFFFFF","#000000",4);
		preparingLabel.x = (width - preparingLabel.getWidth())*0.5;
		preparingLabel.y = (height - preparingLabel.getHeight())*0.5;
		self.layer.addChild(preparingLabel);
	}else if(self.lock){
		self.layer.addChild(getTranslucentBitmap(width,height));
		var lockIcon = new LBitmap(new LBitmapData(LMvc.datalist["lock"]));
		lockIcon.x = (width - lockIcon.getWidth())*0.5;
		lockIcon.y = (height - lockIcon.getHeight())*0.5;
		self.layer.addChild(lockIcon);
	}
};
EventListChildView.prototype.onClick = function(event) {
	var self = event.target;
	if(self.preparing){
		var obj = {title:Language.get("preparing"),message:Language.get("event_preparing_error"),height:200,okEvent:null};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
		return;
	}else if(self.lock){
		var obj = {title:Language.get("confirm"),message:Language.get("event_lock_error"),height:200,okEvent:null};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
		return;
	}
	var listView = event.currentTarget;
	var parentView = listView.getParentByConstructor(EventListView);;
	parentView.showDetailed(self.eventObject);
};