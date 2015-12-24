function RecordChildView(index){
	var self = this;
	base(self,LListChildView,[]);
	self.recordIndex = index;
	self.record = GameManager.read(index);
	self.init();
	self.set(self.record);
}
RecordChildView.prototype.init=function(){
	var self = this;console.log("recordChild init ",LMvc.datalist["win03"]);
	self.backLayer = new LPanel(new LBitmapData(LMvc.datalist["win03"]), LGlobal.width - 40, 100);
	self.addChild(self.backLayer);
	self.labelsLayer = new LSprite();
	self.addChild(self.labelsLayer);
};
RecordChildView.prototype.set=function(record){
	var self = this;
	self.labelsLayer.removeAllChild();
	if(!record || !record.labels){
		return;
	}
	var labels = record.labels;
	var name = getStrokeLabel(labels.name,25,"#FFFFFF","#000000",4);
	name.x = 20;
	name.y = 20;
	self.labelsLayer.addChild(name);
};
RecordChildView.prototype.onClick=function(event){
	var self = event.target;
	self.record = GameManager.save(self.recordIndex);
	self.set(self.record);
	self.updateView();
};