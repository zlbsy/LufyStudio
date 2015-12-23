function RecordView(){
	base(this,LView,[]);
}
RecordView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
RecordView.prototype.init=function(){
	var self = this;console.log("RecordView.prototype.init");
	self.layerInit();
	var records = [];
	for(var i=0;i<RecordController.RECORD_MAX;i++){
		var record = LPlugin.GetData("gameRecord_" + i);
		var child = new RecordChildView(record);
		records.push(child);
	}
	self.listView.updateList(records);
};
RecordView.prototype.layerInit=function(){
	var self = this;console.log("RecordView.prototype.layerInit");
	self.listView = new LListView();
	self.listView.resize(LGlobal.width - 40,LGlobal.height - 60);
	self.listView.x = 20;
	self.listView.y = 40;
	self.listView.cellWidth = LGlobal.width - 40;
	self.listView.cellHeight = 100;
	self.backLayer = new LPanel(new LBitmapData(LMvc.datalist["win05"]),LGlobal.width, LGlobal.height);
	self.backLayer.addChild(self.listView);
	self.addChild(self.backLayer);
};