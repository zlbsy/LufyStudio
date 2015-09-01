function ArmListView(){
	base(this,LView,[]);
}
ArmListView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
	this.controller.addEventListener(CharacterListEvent.SHOW, this.characterListShow);
	this.controller.addEventListener(CharacterListEvent.CLOSE, this.characterListClose);
};
ArmListView.prototype.init=function(){
	var self = this;
	self.listLayer = new LSprite();
	self.addChild(self.listLayer);
	self.armDetailedLayer = new LSprite();
	self.addChild(self.armDetailedLayer);
	self.characterListLayer = new LSprite();
	self.addChild(self.characterListLayer);
	self.listInit();
};
ArmListView.prototype.listInit=function(){
	var self = this;
	self.toSelectCharacter();
	return;
	var cityModel = self.controller.getValue("cityData");
	
	var title = getStrokeLabel("",30,"#FFFFFF","#000000",4);
	title.x = 15;
	title.y = 10;
	self.listLayer.addChild(title);
	if(self.controller.armListType != ArmListType.EXPEDITION){
		var bitmapClose = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
		var buttonClose = new LButton(bitmapClose);
		buttonClose.x = LGlobal.width - bitmapClose.getWidth() - 5;
		self.listLayer.addChild(buttonClose);
		buttonClose.addEventListener(LMouseEvent.MOUSE_UP, self.onClickCloseButton.bind(self));
	}
	self.tabMenuLayer = new LSprite();
	self.tabMenuLayer.y = 60;
	self.listLayer.addChild(self.tabMenuLayer);
	self.showTabMenu();
	
	self.contentLayer = new LSprite();
	self.contentLayer.y = 110;
	self.listLayer.addChild(self.contentLayer);
	
	title.text = Language.get(self.controller.armListType);
	self.dataList = cityModel.troops();
	
	self.showList();
};
ArmListView.prototype.showList=function(){
	var self = this;
	var listHeight = LGlobal.height - self.contentLayer.y;
	if(self.controller.armListType == ArmListType.ARM_LIST){
		listHeight = LGlobal.height - self.contentLayer.y - 70;
	}
	var winWidth,winHeight;
	if(self.controller.armListType == ArmListType.EXPEDITION){
		var coordinate = self.contentLayer.getRootCoordinate();
		winWidth = 420;
		winHeight = 210;
		self.tabMenuLayer.y = 50;
		self.contentLayer.y = 100;
	}else{
		winWidth = LGlobal.width;
		winHeight = LGlobal.height - self.contentLayer.y;
	}
	var panel = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win05"]),winWidth, winHeight));
	self.contentLayer.addChild(panel);
	
	var cityModel = self.controller.getValue("cityData");
	self.listChildLayer = new LSprite();
	var scHeight = 0;
	for(var i=0,l=self.dataList.length;i<l;i++){
		var troop = self.dataList[i];
		var childLayer = new ArmListChildView(self.controller,troop,cityModel,self);
		childLayer.y = 50 * i;
		self.listChildLayer.addChild(childLayer);
		if(i < l - 1){
			continue;
		}
		scHeight = childLayer.y + childLayer.getHeight();
	}
	self.listChildLayer.graphics.drawRect(0, "#000000", [0, 0, winWidth - 30, scHeight]);
	var sc = new LScrollbar(self.listChildLayer, winWidth - 20, winHeight - 30, 10,false);
	sc._showLayer.graphics.clear();
	sc.y = 15;
	self.contentLayer.addChild(sc);
	sc.excluding = true;
	if(self.controller.armListType == ArmListType.ARM_LIST){
		return;
	}
	self.listChildLayer.addEventListener(LMouseEvent.MOUSE_DOWN, self.armClickDown);
	self.listChildLayer.addEventListener(LMouseEvent.MOUSE_UP, self.armClickUp.bind(self));
};
ArmListView.prototype.onClickCloseButton=function(event){
	var doEnlist = this.doEnlist;
	this.controller.closeArmList();
	if(doEnlist){
		LMvc.CityController.dispatchEvent(LController.NOTIFY_ALL);
	}
};
ArmListView.prototype.showTabMenu=function(){
	var self = this;
	if(self.controller.armListType == ArmListType.EXPEDITION){
		var buttonExpedition = getButton(Language.get("arm_name"),100);
		//buttonExpedition.x = 60;
		self.tabMenuLayer.addChild(buttonExpedition);
		
		var buttonExpedition = getButton(Language.get("troops"),300);
		buttonExpedition.x = 100;
		self.tabMenuLayer.addChild(buttonExpedition);
	}else{
		var buttonExpedition = getButton("↓",50);
		buttonExpedition.x = 10;
		self.tabMenuLayer.addChild(buttonExpedition);
		
		var buttonExpedition = getButton(Language.get("arm_name"),110);
		buttonExpedition.x = 60;
		self.tabMenuLayer.addChild(buttonExpedition);
		
		var buttonExpedition = getButton(Language.get("troops"),300);
		buttonExpedition.x = 170;
		self.tabMenuLayer.addChild(buttonExpedition);
	}
};
ArmListView.prototype.armClickDown = function(event) {
	var arm = event.target;
	arm.offsetX = event.offsetX;
	arm.offsetY = event.offsetY;
};
ArmListView.prototype.armClickUp = function(event) {
	if(event.target.constructor.name != "ArmListChildView"){
		return;
	}
	var self = this;
	var arm = event.target;
	if (arm.offsetX && arm.offsetY && 
		Math.abs(arm.offsetX - event.offsetX) < 5 && 
		Math.abs(arm.offsetY - event.offsetY) < 5 &&
		arm.hitTestPoint(event.offsetX, event.offsetY)) {
		//self.showArmDetailed(arm.soldierData);
		self.enlistArmId = arm.soldierModel.id();
		if(self.controller.armListType == ArmListType.EXPEDITION){
			self.showArmDetailed(arm.soldierModel);
		}else{
			self.toSelectCharacter();
		}
	}
};
ArmListView.prototype.troopsSelect=function(event){
	var self = this;
	var windowLayer = event.currentTarget.parent;
	var armDetailed = windowLayer.childList.find(function(child){
		return child.constructor.name == "ArmDetailedView";
	});
	var soldierModel = armDetailed.soldierModel;
	windowLayer.remove();
	var listChildView = self.listChildLayer.childList.find(function(child){
		return child.soldierModel.id() == soldierModel.id();
	});
	
	var value = armDetailed.getSelectQuantity();
	soldierModel.readyQuantity(value);
	var selectQuantity = soldierModel.readyQuantity();
	listChildView.update();
};
ArmListView.prototype.showArmDetailed=function(soldierModel){
	var self = this;
	console.log("self.controller.armListType="+self.controller.armListType);
	//console.error("ArmListView.prototype.showArmDetailed"+self.controller.armListType,ArmListType.EXPEDITION,soldierData);
	//var armDetailed = new ArmDetailedView(self.controller, soldierModel);
	var armDetailed = new ArmDetailedView(self.controller);
	if(self.controller.armListType == ArmListType.EXPEDITION){
		var title = soldierModel.name();
		var obj = {title:title,subWindow:armDetailed,width:400,height:250,okEvent:self.troopsSelect.bind(this),cancelEvent:self.cancelDetailed};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
	}else{
		var obj = {title:Language.get("enlist"),subWindow:armDetailed,width:400,height:480,okEvent:self.enlist,cancelEvent:self.cancelDetailed};
		var windowLayer = ConfirmWindow(obj);
		//LMvc.layer.addChild(windowLayer);
		self.armDetailedLayer.addChild(windowLayer);
	}
};
ArmListView.prototype.cancelDetailed=function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.toSelectCharacter();
};
ArmListView.prototype.enlist=function(event){console.log("ArmListView.prototype.enlist");
	var self = event.currentTarget.parent.parent.parent;
	var selectCharacters = self.controller.getValue("selectCharacters");
	var armDetailed = self.armDetailedLayer.getChildAt(0).childList.find(function(child){
		return child.constructor.name == "ArmDetailedView";
	});
	var enlistCount = armDetailed.getEnlistCount();
	var price = armDetailed.getEnlistPrice(enlistCount);
	var cityModel = self.controller.fromController.getValue("cityData");
	var money = cityModel.money();
	if(money < price){
		var obj = {title:Language.get("confirm"),message:Language.get("dialog_no_money"),height:200,okEvent:null};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
		return;
	}
	cityModel.money(-price);
	var singleEnlistCount = (enlistCount / selectCharacters.length) >> 0;
	for(var i=0;i<selectCharacters.length;i++){
		var charaModel = selectCharacters[i];
		charaModel.enlist(self.enlistArmId,singleEnlistCount);
	}
	self.armDetailedLayer.removeAllChild();
	self.doEnlist = true;
	self.onClickCloseButton();
};
ArmListView.prototype.toSelectCharacter=function(){
	var self = this;
	self.controller.loadCharacterList(CharacterListType.ENLIST,self);
};
ArmListView.prototype.addCharacterListView=function(characterListView){
	this.characterListLayer.addChild(characterListView);
};
ArmListView.prototype.characterListShow=function(event){
	var self = event.currentTarget.view;
	self.listLayer.visible = false;
};
ArmListView.prototype.characterListClose=function(event){
	
	console.log("ArmListView.prototype.characterListClose",event,event.subEventType);
	var self = event.currentTarget.view;
	var subEventType = event.subEventType;
	if(subEventType == "return"){
		self.onClickCloseButton();
		return;
	}
	self.controller.setValue("selectCharacters",event.characterList);
	self.characterListLayer.removeChildAt(self.characterListLayer.numChildren - 1);
	//self.listLayer.visible = true;
	/*var soldierData = self.dataList.find(function(child){
		return child.id = self.enlistArmId;
	});
	self.showArmDetailed(new SoldierModel(null, soldierData));*/
	self.showArmDetailed();
	//self.onClickCloseButton();
};