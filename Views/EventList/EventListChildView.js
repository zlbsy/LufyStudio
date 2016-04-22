function EventListChildView(eventObject) {
	var self = this;
	base(self, LListChildView, []);
	self.eventObject = eventObject;
	self.lock = !LPlugin.eventIsOpen(eventObject.id);
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
	var icon;
	if(self.lock){
		self.layer.addChild(getTranslucentBitmap(width,height));
		icon = new LBitmap(new LBitmapData(LMvc.datalist["lock"]));
		icon.x = (width - icon.getWidth())*0.5;
		icon.y = (height - icon.getHeight())*0.5;
		self.layer.addChild(icon);
		return;
	}else{
		icon = new BitmapSprite(LMvc.IMG_PATH + "event_list/"+self.eventObject.id+".png", null,new LPoint(width - 10,height - 10));
		icon.x = 5;
		icon.y = 5;
		icon.addEventListener(LEvent.COMPLETE,self.loadOver);
		self.layer.addChild(icon);
	}
	
	var name = getStrokeLabel(self.eventObject.name,16,"#FFFFFF","#000000",4);
	name.x = 10;
	name.y = 10;
	self.layer.addChild(name);
};
EventListChildView.prototype.onClick = function(event) {
	var self = event.target;
	if(self.lock){
		return;
	}
	var listView = event.currentTarget;
	var parentView = listView.getParentByConstructor(EventListView);;
	parentView.showDetailed(self.eventObject);
};