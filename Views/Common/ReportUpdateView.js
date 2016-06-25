function ReportUpdateView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
	LGlobal.preventDefault = false;
	self.name = "ReportUpdateView";
	self.set();
}
ReportUpdateView.prototype.set = function(){
	var self = this;
	var textLabel = getStrokeLabel(Language.get("update_report_id"),20,"#FFFFFF","#000000",3);
	textLabel.x = 5;
	self.addChild(textLabel);
	
	var subLabel = getStrokeLabel(Language.get("update_report_id_description"),16,"#FFFFFF","#000000",3);
	subLabel.width = 380;
	subLabel.setWordWrap(true,20);
	subLabel.x = 5;
	subLabel.y = 35;
	self.addChild(subLabel);
	var inputLayer = new LSprite();
	inputLayer.graphics.drawRect(1,"#000000",[0, 0, 380, 30]);
	self.idText = new LTextField();
	self.idText.y = 100;
	self.idText.setType(LTextFieldType.INPUT,inputLayer);
	self.addChild(self.idText);
};
ReportUpdateView.prototype.selectReport = function(event){
	var button = event.currentTarget;
	var self = button.getParentByConstructor(ReportUpdateView);
	RecordController.instance().show(RecordController.REPORT_MODE);
};
ReportUpdateView.prototype.setReport = function(record){
	var self = this;
	self.record = record;
	var labels = record.labels;
	self.labelsLayer.removeAllChild();
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
ReportUpdateView.prototype.toUpdate = function(event){
	var button = event.currentTarget;
	var recordWindow = button.parent;
	var self = recordWindow.getChildByName("ReportUpdateView");
	if(!self.idText.text){
		var obj = {width:300, height:200, message:Language.get("update_report_id"), title:Language.get("confirm")};
		var dialog = ConfirmWindow(obj);
		LMvc.logoStage.addChild(dialog);
		return;
	}
	LAjax.post(LMvc.downloadURL, {reportId:self.idText.text}, function(data){
		var errorFun = function(){
			var obj = {width:300, height:200, message:Language.get("error_update_report"), title:Language.get("confirm")};
			var dialog = ConfirmWindow(obj);
			LMvc.logoStage.addChild(dialog);
		};
		try{
			data = JSON.parse(data);
		}catch(e){
			errorFun();
			return;
		}
		if(data.success && data.record){
			self.parent.remove();
			RecordController.instance().hide();
			LMvc.isRead = true;
			Math.fakeSeed = data.record.fakeSeed;
			LMvc.mapX = data.record.mapX;
			LMvc.mapY = data.record.mapY;
			SeigniorExecute.setSaveData(data.record.seigniorExecute);
			LMvc.areaData = data.record;
			LMvc.selectSeignorId = LMvc.areaData.selectSeignorId;
			LMvc.chapterData = LMvc.areaData.chapterData;
			LMvc.logoStage.controller.read();
		}else{
			errorFun();
		}
	},function(){
		var obj = {width:300, height:200, message:Language.get("dialog_fail_net"), title:Language.get("dialog_fail_net")};
		var dialog = ConfirmWindow(obj);
		LMvc.logoStage.addChild(dialog);
	});
};