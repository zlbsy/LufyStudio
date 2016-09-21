function PurchaseStartView(controller, productId, callback){
	var self = this;
	LExtends(self,LView,[controller]);
	LGlobal.preventDefault = false;
	self.name = "PurchaseStartView";
	self.productId = productId;
	self.callback = callback;
	self.set();
}
PurchaseStartView.prototype.set = function(){
	var self = this;
	var productInformation = GameCacher.getData("productInformation");
	var product = productInformation.find(function(child) {
		return child.productId == self.productId;
	});
	var text = String.format(Language.get("purchase_explanation"),product.price);
	var textLabel = getStrokeLabel(text,18,"#FFFFFF","#000000",3,"htmlText");
	textLabel.width = 380;
	textLabel.setWordWrap(true,22);
	textLabel.x = 5;
	self.addChild(textLabel);
	self.inputWindow = new LSprite();
	self.inputWindow.y = 220;
	self.addChild(self.inputWindow);
	
	var textLabel = getStrokeLabel(Language.get("您的支付宝名称"),18,"#FFFFFF","#000000",3);
	textLabel.x = 5;
	textLabel.y = 0;
	self.inputWindow.addChild(textLabel);
	var inputLayer = new LSprite();
	inputLayer.graphics.drawRect(1,"#000000",[0, 0, 380, 30]);
	self.account = LTextField.getLabel();
	self.account.y = 20;
	self.account.color = "#FFFFFF";
	self.account.setType(LTextFieldType.INPUT,inputLayer);
	self.account.setMultiline(true);
	self.inputWindow.addChild(self.account);
	
	textLabel = getStrokeLabel(Language.get("订单号/流水号"),18,"#FFFFFF","#000000",3);
	textLabel.x = 5;
	textLabel.y = 55;
	self.inputWindow.addChild(textLabel);
	inputLayer = new LSprite();
	inputLayer.graphics.drawRect(1,"#000000",[0, 0, 380, 30]);
	self.num = LTextField.getLabel();
	self.num.y = 75;
	self.num.color = "#FFFFFF";
	self.num.setType(LTextFieldType.INPUT,inputLayer);
	self.inputWindow.addChild(self.num);
	
	textLabel = getStrokeLabel(Language.get("转账时间："),18,"#FFFFFF","#000000",3);
	textLabel.x = 5;
	textLabel.y = 115;
	self.inputWindow.addChild(textLabel);
	inputLayer = new LSprite();
	inputLayer.graphics.drawRect(1,"#000000",[0, 0, 45, 30]);
	self.payment_time_year = LTextField.getLabel();
	self.payment_time_year.size = 18;
	self.payment_time_year.x = 100;
	self.payment_time_year.y = 110;
	self.payment_time_year.color = "#FFFFFF";
	self.payment_time_year.setType(LTextFieldType.INPUT,inputLayer);
	self.inputWindow.addChild(self.payment_time_year);
	textLabel = getStrokeLabel(Language.get("年"),18,"#FFFFFF","#000000",3);
	textLabel.x = 145;
	textLabel.y = 115;
	self.inputWindow.addChild(textLabel);
	inputLayer = new LSprite();
	inputLayer.graphics.drawRect(1,"#000000",[0, 0, 25, 30]);
	self.payment_time_month = LTextField.getLabel();
	self.payment_time_month.size = 18;
	self.payment_time_month.x = 165;
	self.payment_time_month.y = 110;
	self.payment_time_month.color = "#FFFFFF";
	self.payment_time_month.setType(LTextFieldType.INPUT,inputLayer);
	self.inputWindow.addChild(self.payment_time_month);
	textLabel = getStrokeLabel(Language.get("月"),18,"#FFFFFF","#000000",3);
	textLabel.x = 190;
	textLabel.y = 115;
	self.inputWindow.addChild(textLabel);
	inputLayer = new LSprite();
	inputLayer.graphics.drawRect(1,"#000000",[0, 0, 25, 30]);
	self.payment_time_day = LTextField.getLabel();
	self.payment_time_day.size = 18;
	self.payment_time_day.x = 210;
	self.payment_time_day.y = 110;
	self.payment_time_day.color = "#FFFFFF";
	self.payment_time_day.setType(LTextFieldType.INPUT,inputLayer);
	self.inputWindow.addChild(self.payment_time_day);
	textLabel = getStrokeLabel(Language.get("日"),18,"#FFFFFF","#000000",3);
	textLabel.x = 235;
	textLabel.y = 115;
	self.inputWindow.addChild(textLabel);
	inputLayer = new LSprite();
	inputLayer.graphics.drawRect(1,"#000000",[0, 0, 25, 30]);
	self.payment_time_hour = LTextField.getLabel();
	self.payment_time_hour.size = 18;
	self.payment_time_hour.x = 260;
	self.payment_time_hour.y = 110;
	self.payment_time_hour.color = "#FFFFFF";
	self.payment_time_hour.setType(LTextFieldType.INPUT,inputLayer);
	self.inputWindow.addChild(self.payment_time_hour);
	textLabel = getStrokeLabel(Language.get("时"),18,"#FFFFFF","#000000",3);
	textLabel.x = 285;
	textLabel.y = 115;
	self.inputWindow.addChild(textLabel);
	inputLayer = new LSprite();
	inputLayer.graphics.drawRect(1,"#000000",[0, 0, 25, 30]);
	self.payment_time_minute = LTextField.getLabel();
	self.payment_time_minute.size = 18;
	self.payment_time_minute.x = 305;
	self.payment_time_minute.y = 110;
	self.payment_time_minute.color = "#FFFFFF";
	self.payment_time_minute.setType(LTextFieldType.INPUT,inputLayer);
	self.inputWindow.addChild(self.payment_time_minute);
	textLabel = getStrokeLabel(Language.get("分"),18,"#FFFFFF","#000000",3);
	textLabel.x = 330;
	textLabel.y = 115;
	self.inputWindow.addChild(textLabel);
	
	textLabel = getStrokeLabel(Language.get("联系邮箱："),18,"#FFFFFF","#000000",3);
	textLabel.x = 5;
	textLabel.y = 150;
	self.inputWindow.addChild(textLabel);
	inputLayer = new LSprite();
	inputLayer.graphics.drawRect(1,"#000000",[0, 0, 280, 30]);
	self.mail = LTextField.getLabel();
	self.mail.size = 18;
	self.mail.x = 100;
	self.mail.y = 145;
	self.mail.color = "#FFFFFF";
	self.mail.setType(LTextFieldType.INPUT,inputLayer);
	self.inputWindow.addChild(self.mail);
	
	textLabel = getStrokeLabel(Language.get("QQ号："),18,"#FFFFFF","#000000",3);
	textLabel.x = 5;
	textLabel.y = 185;
	self.inputWindow.addChild(textLabel);
	inputLayer = new LSprite();
	inputLayer.graphics.drawRect(1,"#000000",[0, 0, 280, 30]);
	self.qq = LTextField.getLabel();
	self.qq.x = 100;
	self.qq.y = 180;
	self.qq.color = "#FFFFFF";
	self.qq.setType(LTextFieldType.INPUT,inputLayer);
	self.inputWindow.addChild(self.qq);
	/*
	self.account.text = "测试支付宝";
	self.num.text = "222222";
	self.payment_time_year.text = "2016";
	self.payment_time_month.text = "8";
	self.payment_time_day.text = "2";
	self.payment_time_hour.text = "2";
	self.payment_time_minute.text = "2";
	self.mail.text = "zhang@yahoo.co.jp";
	self.qq.text = "27227";*/
};
PurchaseStartView.prototype.clickOK = function(event){
	var button = event.currentTarget;
	var self = button.parent.getChildByName("PurchaseStartView");
	var obj;
	if(!self.account.text){
		obj = {width:300, height:200, message:Language.get("dialog_error_account"), title:Language.get("confirm")};
		var dialog = ConfirmWindow(obj);
		LMvc.layer.addChild(dialog);
		return;
	}
	if(!self.num.text){
		obj = {width:300, height:200, message:Language.get("dialog_error_num"), title:Language.get("confirm")};
		var dialog = ConfirmWindow(obj);
		LMvc.layer.addChild(dialog);
		return;
	}
	if(!self.payment_time_year.text || !self.payment_time_month.text || !self.payment_time_day.text || !self.payment_time_hour.text || !self.payment_time_minute.text){
		obj = {width:300, height:200, message:Language.get("dialog_error_payment_time"), title:Language.get("confirm")};
		var dialog = ConfirmWindow(obj);
		LMvc.layer.addChild(dialog);
		return;
	}
	if((!self.mail.text || self.mail.text.indexOf("@")<1) && !self.qq.text){
		obj = {width:300, height:200, message:Language.get("dialog_error_email_or_qq"), title:Language.get("confirm")};
		var dialog = ConfirmWindow(obj);
		LMvc.layer.addChild(dialog);
		return;
	}
	var paymentTime = String.format("{0}-{1}-{2} {3}:{4}",self.payment_time_year.text,self.payment_time_month.text,self.payment_time_day.text,self.payment_time_hour.text,self.payment_time_minute.text);
	self.mouseEnabled = false;
	purchaseStartAndroidCheck(self.productId, 
		self.account.text,
		self.num.text,
		paymentTime,
		self.mail.text,
		self.qq.text,
		self.callback);
};