function RecordChildView(index){
	var self = this;
	base(self,LListChildView,[]);
	self.recordIndex = index;
	self.record = GameManager.read(self.recordIndex);
	self.init();
	self.set(self.record);
}
RecordChildView.prototype.init=function(){
	var self = this;
	self.backLayer = new LPanel(new LBitmapData(LMvc.datalist["win03"]), LGlobal.width - 100, 80);
	self.addChild(self.backLayer);
	if(self.recordIndex > 0){
		var lblIndex = getStrokeLabel(self.recordIndex+".",18,"#999999","#000000",4);
		lblIndex.x = 10;
		lblIndex.y = 6;
		self.backLayer.addChild(lblIndex);
	}else{
		var lblIndex = getStrokeLabel(Language.get("auto_save"),18,"#FF0000","#000000",4);
		lblIndex.x = self.backLayer.getWidth() - lblIndex.getWidth() - 10;
		lblIndex.y = 7;
		self.backLayer.addChild(lblIndex);
	}
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
	
	var name = getStrokeLabel(labels.name,18,"#FFFFFF","#000000",4);
	name.x = 40;
	name.y = 6;
	self.labelsLayer.addChild(name);
	var title = getStrokeLabel(labels.date,18,"#FFFFFF","#000000",4);
	title.x = 150;
	title.y = 6;
	self.labelsLayer.addChild(title);
	
	var cityCount = getStrokeLabel(labels.cityCount,18,"#FFFFFF","#000000",3);
	cityCount.x = 40;
	cityCount.y = 31;
	self.labelsLayer.addChild(cityCount);
	
	var generalsCount = getStrokeLabel(labels.generalsCount,18,"#FFFFFF","#000000",3);
	generalsCount.x = 150;
	generalsCount.y = 31;
	self.labelsLayer.addChild(generalsCount);
	
	if(labels.battleTitle){
		var battleTitle = getStrokeLabel(labels.battleTitle,18,"#FFFFFF","#000000",3);
		battleTitle.x = 40;
		battleTitle.y = 55;
		self.labelsLayer.addChild(battleTitle);
	}
	
	var saveTime = getStrokeLabel(labels.saveTime,16,"#FFFFFF","#000000",3);
	saveTime.x = 222;
	saveTime.y = 58;
	self.labelsLayer.addChild(saveTime);
};
RecordChildView.prototype.onClick=function(event){
	var self = event.target;
	var listView = event.currentTarget;
	var recordView = listView.getParentByConstructor(RecordView);
	if(recordView.controller.mode == RecordController.REPORT_MODE){
		if(!self.record || !self.record.labels){
			return;
		}
		var recordWindow = LMvc.logoStage.getChildByName("ConfirmWindow");
		var bugReportView = recordWindow.getChildByName("BugReportView");
		bugReportView.setReport(self.record);
		RecordController.instance().hide();
		return;
	}
	if(!self.load){
		self.load = new LMvcLoader(self);
	}
	self.load.library(["SeigniorExecute"],self.readRecordData);
};
RecordChildView.prototype.toSaveData=function(){
	var self = this;
	GameManager.save(self.recordIndex);
	self.record = GameManager.read(self.recordIndex);
	self.set(self.record);
	self.cacheAsBitmap(false);
	self.updateView();
};
RecordChildView.prototype.readRecordData=function(){
	var self = this;
	if(RecordController.instance().mode == RecordController.SAVE_MODE){
		if(self.recordIndex == 0){
			var obj = {title:Language.get("confirm"),message:Language.get("save_record_error"),height:200,okEvent:null};
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
			return;
		}
		self.toSaveData();
	}else{
		if(!self.record || !self.record.labels){
			return;
		}
		self.record = GameManager.read(self.recordIndex);
		RecordController.instance().hide();
		LMvc.isRead = true;
		Math.fakeSeed = self.record.fakeSeed;
		LMvc.mapX = self.record.mapX;
		LMvc.mapY = self.record.mapY;
		SeigniorExecute.setSaveData(self.record.seigniorExecute);
		if(LMvc.BattleController){
			GameCacher.resetAreaMap("area-map-1");
			BattleController.ctrlChara = null;
			var battleController = LMvc.BattleController;
			var battleModel = battleController.model;
			var battleView = battleController.view;
			LMvc.BattleController = null;
			battleController.view.remove();
			for(var k in battleController){
				delete battleController[k];
			}
			for(var k in battleModel){
				delete battleModel[k];
			}
			for(var k in battleView){
				delete battleView[k];
			}
			LMvc.MapController.view.visible = true;
			LMvc.areaData = self.record;
			LMvc.selectSeignorId = LMvc.areaData.selectSeignorId;
			LMvc.chapterData = LMvc.areaData.chapterData;
			gameDataInit();
			if(!LMvc.areaData.battleData){
				LMvc.isRead = false;
				LMvc.MapController.view.changeMode(MapController.MODE_MAP);
			}
			LMvc.MapController.dispatchEvent(LController.NOTIFY);
		}else if(LMvc.MapController){
			GameCacher.resetAreaMap("area-map-1");
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
		self.record = GameManager.read(self.recordIndex);
	}
};