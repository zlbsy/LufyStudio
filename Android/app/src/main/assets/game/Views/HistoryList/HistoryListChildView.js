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
	var name = getStrokeLabel(Language.get("history_" + self.historyObject.id),20,"#FFFFFF","#000000",4);
	name.x = 20;
	name.y = 20;
	self.layer.addChild(name);
	for(var i=0;i<TroubleListConfig.length;i++){
		var color = LPlugin.historyIsClear("history_"+self.historyObject.id+"_"+LMvc.chapterData.trouble) ? "#FFFFFF":"#999999";
		var label = getStrokeLabel(Language.get(TroubleListConfig[i]),16,color,"#000000",3);
		label.x = 20 + i * 60;
		label.y = 60;
		self.layer.addChild(label);
	}
	if(LMvc.chapterData["history_"+self.historyObject.id]){
		var clearIcon = new LBitmap(new LBitmapData(LMvc.datalist["clear"]));
		clearIcon.x = 350;
		clearIcon.y = (100 - clearIcon.getHeight()) * 0.5;
		self.layer.addChild(clearIcon);
	}
};
HistoryListChildView.prototype.onClick = function(event) {
	var self = event.target;
	if(LMvc.chapterData["history_"+self.historyObject.id]){
		var obj = {title:Language.get("confirm"),message:Language.get("history_clear_error_message"),height:200};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
		return;
	}
	var listView = event.currentTarget;
	var parentView = listView.getParentByConstructor(HistoryListView);;
	parentView.showDetailed(self.historyObject);
};