function RecordChildView(record){
	var self = this;
	base(self,LListChildView,[]);
	self.record = record;
	self.init();
}
RecordChildView.prototype.init=function(){
	var self = this;
	var backLayer = new LPanel(new LBitmapData(LMvc.datalist["win03"]), LGlobal.width - 40, 100);
	self.addChild(backLayer);
	
};
RecordChildView.prototype.onClick=function(){
	var self = this;
	
};