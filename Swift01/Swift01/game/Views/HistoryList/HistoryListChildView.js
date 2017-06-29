function HistoryListChildView(historyObject) {
	var self = this;
	base(self, LListChildView, []);
	self.historyObject = historyObject;
	//self.lock = !LPlugin.eventIsOpen(historyObject.id);
	self.set();
}
HistoryListChildView.prototype.layerInit=function(){
	var self = this;
	self.layer = new LSprite();
	self.addChild(self.layer);
};
HistoryListChildView.prototype.loadOver=function(event){
	var self = event.currentTarget.getParentByConstructor(HistoryListChildView);
	self.cacheAsBitmap(false);
	self.updateView();
};
HistoryListChildView.prototype.getWidth=function(){
	return 440;
};
HistoryListChildView.prototype.getHeight=function(){
	return 100;
};
HistoryListChildView.prototype.set=function(){
	var self = this;
	self.layerInit();
	
	var width = self.getWidth(), height = self.getHeight();
	
	var winPanel = getPanel("win05",width,height);
	self.layer.addChild(winPanel);
	var name = getStrokeLabel(Language.get("history_" + self.historyObject.id),16,"#FFFFFF","#000000",4);
	name.x = 10;
	name.y = 10;
	self.layer.addChild(name);
};
HistoryListChildView.prototype.onClick = function(event) {
	var self = event.target;
	
	var listView = event.currentTarget;
	var parentView = listView.getParentByConstructor(HistoryListView);;
	parentView.showDetailed(self.historyObject);
};