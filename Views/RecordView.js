function RecordView(){
	base(this,LView,[]);
}
RecordView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
RecordView.prototype.getTitle=function(){
	var self = this;
	return  self.controller.mode == RecordController.SAVE_MODE ? "保存进度":"读取进度";
};
RecordView.prototype.init=function(){
	var self = this;
	if(self.listView){
		self.title.text = self.getTitle();
		return;
	}
	self.layerInit();
	var records = [];
	for(var i=0;i<RecordController.RECORD_MAX;i++){
		//var record = LPlugin.GetData("gameRecord_" + i);
		var child = new RecordChildView(i);
		records.push(child);
	}
	self.listView.updateList(records);
};
RecordView.prototype.layerInit=function(){
	var self = this;
	var width = LGlobal.width - 100;
	var height = LGlobal.height - 100;
	self.width = width;
	self.height = height;
	var maskBackground = getTranslucentMask();
	self.addChild(maskBackground);
	self.listView = new LListView();
	self.listView.resize(width - 40, height - 70);
	self.listView.x = 16;
	self.listView.y = 50;
	self.listView.cellWidth = width - 40;
	self.listView.cellHeight = 80;
	self.backLayer = new LSprite();
	self.backLayer.x = (LGlobal.width - width) * 0.5;
	self.backLayer.y = 60;
	
	var backLayer = new LPanel(new LBitmapData(LMvc.datalist["win05"]),width, height);
	backLayer.cacheAsBitmap(true);
	self.backLayer.addChild(backLayer);
	self.backLayer.addChild(self.listView);
	
	var titleData = new LBitmapData(LMvc.datalist["win02"]);
	var titlePanel = new LPanel(titleData,200,60);
	titlePanel.x = (width - titlePanel.getWidth()) * 0.5;
	titlePanel.y = -titlePanel.getHeight() * 0.3;
	self.backLayer.addChild(titlePanel);
	titlePanel.cacheAsBitmap(true);
	
	var bitmapClose = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
	var buttonClose = new LButton(bitmapClose);
	buttonClose.x = width - bitmapClose.getWidth()*0.7;
	buttonClose.y = -bitmapClose.getHeight()*0.3;
	
	self.backLayer.addChild(buttonClose);
	buttonClose.addEventListener(LMouseEvent.MOUSE_UP,self.closeSelf);
	
	self.addChild(self.backLayer);
	
	var title = getStrokeLabel(self.getTitle(),25,"#FFFFFF","#000000",4);
	title.x = (LGlobal.width - title.getWidth()) * 0.5;
	title.y = (LGlobal.height - self.height) * 0.5 + 7;
	self.title = title;
	self.addChild(title);
};
RecordView.prototype.closeSelf=function(event){
	RecordController.instance().hide();
};