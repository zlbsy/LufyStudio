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
	
	var name = getStrokeLabel(labels.name,22,"#FFFFFF","#000000",4);
	name.x = 50;
	name.y = 7;
	self.labelsLayer.addChild(name);
	var title = getStrokeLabel(labels.date,22,"#FFFFFF","#000000",4);
	title.x = 150;
	title.y = 7;
	self.labelsLayer.addChild(title);
	
	var cityCount = getStrokeLabel(labels.cityCount,20,"#FFFFFF","#000000",2);
	cityCount.x = 50;
	cityCount.y = 34;
	self.labelsLayer.addChild(cityCount);
	
	var generalsCount = getStrokeLabel(labels.generalsCount,20,"#FFFFFF","#000000",2);
	generalsCount.x = 150;
	generalsCount.y = 34;
	self.labelsLayer.addChild(generalsCount);
	
	var saveTime = getStrokeLabel(labels.saveTime,18,"#FFFFFF","#000000",2);
	saveTime.x = 150;
	saveTime.y = 58;
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
		if(!self.record){
			return;
		}
		RecordController.instance().hide();
		LMvc.isRead = true;
		if(LMvc.BattleController){
			//TODO::
		}else if(LMvc.MapController){
			LMvc.areaData = self.record;
			LMvc.selectSeignorId = LMvc.areaData.selectSeignorId;
			LMvc.chapterData = LMvc.areaData.chapterData;
			gameDataInit();
			if(!LMvc.areaData.battleData){
				LMvc.isRead = false;
			}
			LMvc.MapController.dispatchEvent(LController.NOTIFY);
		}else{
			LMvc.areaData = self.record;
			LMvc.selectSeignorId = LMvc.areaData.selectSeignorId;
			LMvc.chapterData = LMvc.areaData.chapterData;
			LMvc.logoStage.controller.read();
		}
	}
};