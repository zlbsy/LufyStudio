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
	var cityModel = self.controller.getValue("cityData");
	
	var title = getStrokeLabel("",30,"#FFFFFF","#000000",4);
	title.x = 15;
	title.y = 10;
	self.listLayer.addChild(title);
	
	var bitmapClose = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
	var buttonClose = new LButton(bitmapClose);
	buttonClose.x = LGlobal.width - bitmapClose.getWidth() - 5;
	self.listLayer.addChild(buttonClose);
	buttonClose.addEventListener(LMouseEvent.MOUSE_UP, self.onClickCloseButton.bind(self));

	self.tabMenuLayer = new LSprite();
	self.tabMenuLayer.y = 60;
	self.listLayer.addChild(self.tabMenuLayer);
	self.showTabMenu();
	
	self.contentLayer = new LSprite();
	self.contentLayer.y = 110;
	self.listLayer.addChild(self.contentLayer);
	
	title.text = Language.get(ArmListType.ARM_LIST);
	self.dataList = cityModel.troops();
	
	self.showList();
};
ArmListView.prototype.showList=function(){
	var self = this;
	var listHeight = LGlobal.height - self.contentLayer.y;
	if(self.controller.armListType == ArmListType.ARM_LIST){
		listHeight = LGlobal.height - self.contentLayer.y - 70;
	}
	var panel = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win05"]),LGlobal.width, LGlobal.height - self.contentLayer.y));
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
	self.listChildLayer.graphics.drawRect(0, "#000000", [0, 0, LGlobal.width - 30, scHeight]);
	var sc = new LScrollbar(self.listChildLayer, LGlobal.width - 20, listHeight - 30, 10);
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
ArmListView.prototype.onClickMoveButton=function(event){
	var self = this, moveCount = 0;
	var checkSelectArm = self.listLayer.childList.find(function(child){
		return child.constructor.name == "ArmListChildView" && child.checkbox.checked;
	});
	if(checkSelectArm){
		self.controller.fromController.addEventListener(LCityEvent.SELECT_CITY, self.moveToCity);
		self.controller.toSelectMap(checkSelectCharacter.charaModel.name());
	}else{
		var obj = {title:Language.get("confirm"),message:Language.get("dialog_select_generals"),height:200,okEvent:null};
		var windowLayer = ConfirmWindow(obj);
		self.addChild(windowLayer);
	}
};
ArmListView.prototype.moveToCity=function(event){
	console.log("moveToCity",event);
	var contentLayer = event.currentTarget.view.contentLayer;
	var self = contentLayer.getChildAt(contentLayer.numChildren - 1);
	//console.log("characterListView",characterListView);
	//var contentLayer = contentLayer.getChildAt(contentLayer.numChildren - 1).contentLayer;
	//var self = contentLayer.getChildAt(contentLayer.numChildren - 1);
	var controller = self.controller;
	self.listLayer.childList.forEach(function(child){
		if(child.constructor.name !== "ArmListChildView" || !child.checkbox.checked){
			return;
		}
		child.charaModel.moveTo(event.cityId);
		//child.charaModel.job(Job.MOVE);
	});
	var fromController = controller.fromController;
	controller.removeEventListener(LCityEvent.SELECT_CITY, self.moveToCity);
	controller.closeCharacterList();
	fromController.showCharacterList();
	return;
};
ArmListView.prototype.onClickCloseButton=function(event){
	this.controller.closeArmList();
};
ArmListView.prototype.showTabMenu=function(){
	var self = this;
	var buttonExpedition = getButton("↓",50);
	buttonExpedition.x = 10;
	self.tabMenuLayer.addChild(buttonExpedition);
	
	var buttonExpedition = getButton(Language.get("arm_name"),110);
	buttonExpedition.x = 60;
	self.tabMenuLayer.addChild(buttonExpedition);
	
	var buttonExpedition = getButton(Language.get("troops"),300);
	buttonExpedition.x = 170;
	self.tabMenuLayer.addChild(buttonExpedition);
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
		self.enlistArmId = arm.soldierData.id;
		self.toSelectCharacter();
	}
};
ArmListView.prototype.showArmDetailed=function(soldierData){
	var self = this;
	var armDetailed = new ArmDetailedView(self.controller, soldierData);
	var obj = {title:Language.get("enlist"),subWindow:armDetailed,width:400,height:480,okEvent:self.enlist,cancelEvent:null};
	var windowLayer = ConfirmWindow(obj);
	//LMvc.layer.addChild(windowLayer);
	self.armDetailedLayer.addChild(windowLayer);
	//self.armDetailedLayer.addChild(armDetailed);
	//self.listChildLayer.visible = false;
};
ArmListView.prototype.enlist=function(event){
	var self = event.currentTarget.parent.parent.parent;
	var selectCharacters = self.controller.selectCharacters;
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
	//self.listChildLayer.visible = true;
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
	var self = event.currentTarget.view;
	self.characterListLayer.removeChildAt(self.characterListLayer.numChildren - 1);
	self.listLayer.visible = true;
	var soldierData = self.dataList.find(function(child){
		return child.id = self.enlistArmId;
	});
	self.showArmDetailed(soldierData);
};