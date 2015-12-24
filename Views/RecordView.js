function RecordView(){
	base(this,LView,[]);
}
RecordView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
RecordView.prototype.init=function(){
	var self = this;console.log("RecordView.prototype.init");
	if(self.listView){
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
	var maskBackground = getTranslucentMask();
	self.addChild(maskBackground);
	self.listView = new LListView();
	self.listView.resize(LGlobal.width - 140,LGlobal.height - 100);
	self.listView.x = 16;
	self.listView.y = 80;
	self.listView.cellWidth = LGlobal.width - 140;
	self.listView.cellHeight = 80;
	self.backLayer = new LPanel(new LBitmapData(LMvc.datalist["win05"]),LGlobal.width - 100, LGlobal.height);
	self.backLayer.x = 50;
	self.backLayer.addChild(self.listView);
	
	var titleData = new LBitmapData(LMvc.datalist["win02"]);
	var titlePanel = new LPanel(titleData,200,60);
	titlePanel.x = (LGlobal.width - titlePanel.getWidth() - 100) * 0.5;
	self.backLayer.addChild(titlePanel);
	var title = getStrokeLabel(self.controller.mode == RecordController.SAVE_MODE ? "保存进度":"读取进度",25,"#FFFFFF","#000000",4);
	title.x = (titlePanel.getWidth() - title.getWidth()) * 0.5;
	title.y = 15;
	titlePanel.addChild(title);
	
	self.addChild(self.backLayer);
	
	var bitmapClose = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
	var buttonClose = new LButton(bitmapClose);
	buttonClose.x = LGlobal.width - bitmapClose.getWidth() - 5;
	buttonClose.y = 5;
	
	self.addChild(buttonClose);
	buttonClose.addEventListener(LMouseEvent.MOUSE_UP,self.closeSelf);
};
RecordView.prototype.closeSelf=function(event){
	RecordController.instance().hide();
};