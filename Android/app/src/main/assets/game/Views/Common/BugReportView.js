function BugReportView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
	LGlobal.preventDefault = false;
	self.name = "BugReportView";
	self.set();
}
BugReportView.prototype.set = function(){
	var self = this;
	var textLabel = getStrokeLabel(Language.get("error_bug_description"),18,"#FFFFFF","#000000",3);
	textLabel.x = 5;
	self.addChild(textLabel);
	var inputLayer = new LSprite();
	inputLayer.graphics.drawRect(1,"#000000",[0, 0, 380, 100]);
	self.message = LTextField.getLabel();
	self.message.y = 20;
	self.message.color = "#FFFFFF";
	self.message.setType(LTextFieldType.INPUT,inputLayer);
	self.message.setMultiline(true);
	self.addChild(self.message);
	
	var mailLabel = getStrokeLabel(Language.get("error_bug_email"),18,"#FFFFFF","#000000",3);
	mailLabel.x = 5;
	mailLabel.y = 135;
	self.addChild(mailLabel);
	inputLayer = new LSprite();
	inputLayer.graphics.drawRect(1,"#000000",[0, 0, 380, 30]);
	self.mail = LTextField.getLabel();
	self.mail.y = 155;
	self.mail.color = "#FFFFFF";
	self.mail.setType(LTextFieldType.INPUT,inputLayer);
	self.addChild(self.mail);
	
	var buttonBug = getSizeButton(Language.get("error_bug_report"),200, 45);
	buttonBug.y = 210;
	self.addChild(buttonBug);
	buttonBug.addEventListener(LMouseEvent.MOUSE_UP, self.selectReport);
	var win = new LPanel(new LBitmapData(LMvc.datalist["win03"]), LMvc.screenWidth - 100, 80);
	win.y = 260;
	self.addChild(win);
	self.labelsLayer = new LSprite();
	self.labelsLayer.y = 260;
	self.addChild(self.labelsLayer);
};
BugReportView.prototype.selectReport = function(event){
	var button = event.currentTarget;
	var self = button.getParentByConstructor(BugReportView);
	LGlobal.preventDefault = true;
	RecordController.instance().show(RecordController.REPORT_MODE);
};
BugReportView.prototype.setReport = function(record){
	var self = this;
	LGlobal.preventDefault = false;
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
BugReportView.prototype.toUpdate = function(event){
	var button = event.currentTarget;
	var recordWindow = button.parent;
	var self = recordWindow.getChildByName("BugReportView");
	var obj;
	if(!self.message.text){
		obj = {width:300, height:200, message:Language.get("dialog_error_description"), title:Language.get("confirm")};
		var dialog = ConfirmWindow(obj);
		LMvc.logoStage.addChild(dialog);
		return;
	}
	if(!self.mail.text || self.mail.text.indexOf("@")<1){
		obj = {width:300, height:200, message:Language.get("dialog_error_email"), title:Language.get("confirm")};
		var dialog = ConfirmWindow(obj);
		LMvc.logoStage.addChild(dialog);
		return;
	}
	if(!self.record || !self.record.labels){
		obj = {width:300, height:200, message:Language.get("dialog_error_report"), title:Language.get("confirm")};
		var dialog = ConfirmWindow(obj);
		LMvc.logoStage.addChild(dialog);
		return;
	}
	var identificationId = (typeof LPlugin.identificationId == UNDEFINED) ? "ios" : LPlugin.identificationId();
	LMvc.keepLoading(true);
	LAjax.post(LMvc.uploadURL, {email:self.mail.text, 
		message:self.message.text, 
		ver:LMvc.ver, 
		identificationId:identificationId, 
		report:JSON.stringify(self.record), 
		charas:JSON.stringify(LPlugin.characters())
		}, function(data){
		var obj;
		if(parseInt(data)>0){
			obj = {width:300, height:240, message:Language.get("dialog_success_report"), title:Language.get("dialog_success_report_title"), okEvent:function(e){
				LGlobal.preventDefault = true;
				recordWindow.remove();
				e.currentTarget.parent.remove();
			}};
		}else{
			obj = {width:300, height:200, message:Language.get("dialog_fail_net"), title:Language.get("dialog_fail_report")};
		}
		var dialog = ConfirmWindow(obj);
		LMvc.logoStage.addChild(dialog);
		LMvc.keepLoading(false);
	},function(){
		obj = {width:300, height:200, message:Language.get("dialog_fail_net"), title:Language.get("dialog_fail_net")};
		var dialog = ConfirmWindow(obj);
		LMvc.logoStage.addChild(dialog);
		LMvc.keepLoading(false);
	});
};