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
	self.toSelectCharacter();
};
ArmListView.prototype.onClickCloseButton=function(event){
	var doEnlist = this.doEnlist;
	this.controller.closeArmList();
	if(doEnlist){
		LMvc.CityController.dispatchEvent(LController.NOTIFY_ALL);
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
	event.currentTarget.parent.remove();
	self.toSelectCharacter();
};
ArmListView.prototype.enlist=function(event){console.log("ArmListView.prototype.enlist");
	var self = event.currentTarget.parent.parent.parent;
	event.currentTarget.parent.remove();
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
		charaModel.enlist(singleEnlistCount);
	}
	self.armDetailedLayer.removeAllChild();
	self.doEnlist = true;
	self.onClickCloseButton();
};
ArmListView.prototype.toSelectCharacter=function(){
	var self = this;
	var cityModel = self.controller.getValue("cityData");
	self.controller.loadCharacterList(CharacterListType.ENLIST, cityModel.generals(Job.IDLE), {buttonLabel:"execute"});
	//self.controller.loadCharacterList(CharacterListType.ENLIST,self);
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
	self.showArmDetailed();
};