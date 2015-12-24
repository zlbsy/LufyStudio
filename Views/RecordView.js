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
	self.listView = new LListView();
	self.listView.resize(LGlobal.width - 40,LGlobal.height - 100);
	self.listView.x = 20;
	self.listView.y = 80;
	self.listView.cellWidth = LGlobal.width - 40;
	self.listView.cellHeight = 100;
	self.backLayer = new LPanel(new LBitmapData(LMvc.datalist["win05"]),LGlobal.width, LGlobal.height);
	self.backLayer.addChild(self.listView);
	
	var title = getStrokeLabel(self.controller.mode == RecordController.SAVE_MODE ? "保存进度":"读取进度",25,"#FFFFFF","#000000",4);
	title.x = (LGlobal.width - title.getWidth()) * 0.5;
	title.y = 10;
	self.backLayer.addChild(title);
	
	self.addChild(self.backLayer);
};