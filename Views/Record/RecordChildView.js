function RecordChildView(index){
	var self = this;
	base(self,LListChildView,[]);
	self.recordIndex = index;
	self.record = GameManager.read(index);
	self.init();
	self.set(self.record);
}
RecordChildView.prototype.init=function(){
	var self = this;
	self.backLayer = new LPanel(new LBitmapData(LMvc.datalist["win03"]), LGlobal.width - 140, 80);
	self.addChild(self.backLayer);
		var lblIndex = getStrokeLabel((self.recordIndex + 1)+".",25,"#FFFFFF","#000000",4);
	lblIndex.x = 10;
	lblIndex.y = 7;
	self.backLayer.addChild(lblIndex);
	
	self.labelsLayer = new LSprite();
	self.addChild(self.labelsLayer);
};
RecordChildView.prototype.set=function(record){
	var self = this;
	self.labelsLayer.removeAllChild();
	console.log("RecordChildView.prototype.set="+self.record);
	if(!record || !record.labels){
		return;
	}
	var labels = record.labels;
	
	var name = getStrokeLabel(labels.name+labels.name,22,"#FFFFFF","#000000",4);
	name.x = 50;
	name.y = 10;
	self.labelsLayer.addChild(name);
	
	var cityCount = getStrokeLabel("城池 : "+labels.cityCount,20,"#FFFFFF","#000000",3);
	cityCount.x = 50;
	cityCount.y = 45;
	self.labelsLayer.addChild(cityCount);
	
	var generalsCount = getStrokeLabel("武将 : "+labels.generalsCount,20,"#FFFFFF","#000000",3);
	generalsCount.x = 200;
	generalsCount.y = 45;
	self.labelsLayer.addChild(generalsCount);
	
	var saveTime = getStrokeLabel(labels.saveTime,18,"#FFFFFF","#000000",2);
	saveTime.x = 150;
	saveTime.y = 10;
	self.labelsLayer.addChild(saveTime);
};
RecordChildView.prototype.onClick=function(event){
	var self = event.target;
	console.log("mode="+RecordController.instance().mode);
	if(RecordController.instance().mode == RecordController.SAVE_MODE){
		self.record = GameManager.save(self.recordIndex);
		self.set(self.record);
		self.cacheAsBitmap(false);
		self.updateView();
	}else{
	
	}
};