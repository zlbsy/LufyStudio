function EquipmentDetailedView(controller,itemModel,fromView){
	var self = this;
	base(self,LView,[controller]);
	self.itemModel = itemModel;
	self.fromView = fromView;
	self.set();
}
EquipmentDetailedView.prototype.layerInit=function(){
	var self = this;
	self.translucentLayer = new LSprite();
	self.addChild(self.translucentLayer);
	self.translucentLayer.addChild(getTranslucentBitmap());
	self.translucentLayer.addEventListener(LMouseEvent.MOUSE_DOWN, self.click);
	self.translucentLayer.addEventListener(LMouseEvent.MOUSE_UP, self.closeClick);
	var width = 320, height = 340;
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);
	var backgroundData = new LBitmapData(LMvc.datalist["win05"]);
	var panel = getBitmap(new LPanel(backgroundData,width,height));
	panel.name = "windowBackground";
	panel.x = (LGlobal.width - panel.getWidth()) * 0.5;
	panel.y = (LGlobal.height - panel.getHeight()) * 0.5;
	self.backLayer.addChild(panel);
	self.backLayer.addEventListener(LMouseEvent.MOUSE_UP, self.click);
	
	self.layer = new LSprite();
	self.layer.x = panel.x;
	self.layer.y = panel.y;
	self.addChild(self.layer);
	
	var closeButton = new LButton(new LBitmap(new LBitmapData(LMvc.datalist["close"])));
	closeButton.x = panel.x + width - closeButton.getWidth() * 0.7;
	closeButton.y = panel.y - closeButton.getHeight() * 0.2;
	self.addChild(closeButton);
	closeButton.addEventListener(LMouseEvent.MOUSE_UP, self.closeClick);
};
EquipmentDetailedView.prototype.click=function(event){};
EquipmentDetailedView.prototype.closeClick=function(event){
	var self = event.currentTarget.parent;
	self.close();
};
EquipmentDetailedView.prototype.close=function(){
	var self = this;
	self.remove();
	for (var k in self)delete self[k];
};
EquipmentDetailedView.prototype.set=function(){
	var self = this;
	self.layerInit();
	
	var titleData = new LBitmapData(LMvc.datalist["win02"]);
	var titlePanel = getBitmap(new LPanel(titleData,160,60));
	titlePanel.x = (LGlobal.width - titlePanel.getWidth()) * 0.5;
	titlePanel.y = self.backLayer.getChildByName("windowBackground").y - 20;
	self.backLayer.addChild(titlePanel);
	
	var title = getStrokeLabel(self.itemModel.name(),20,"#FFFFFF","#000000",4);
	title.x = (LGlobal.width - title.getWidth())*0.5;
	title.y = self.backLayer.getChildByName("windowBackground").y;
	self.backLayer.addChild(title);
	
	
	var layer = new LSprite();
	
	var width = 100, height = 100;
	var equipment = self.itemModel.icon(new LPoint(width,height));
	equipment.x = 20;
	equipment.y = 50;
	layer.addChild(equipment);
	/*
	var explanation = self.itemModel.explanation() + "test";
	var lblExplanation = getStrokeLabel(explanation,20,"#FFFFFF","#000000",4);
	lblExplanation.width = 280;
	lblExplanation.setWordWrap(true, 25);
	lblExplanation.x = equipment.x;
	lblExplanation.y = equipment.y + height + 10;
	layer.addChild(lblExplanation);
*/
	var conditionLayer = self.showCondition();
	conditionLayer.x = equipment.x + width + 10;
	conditionLayer.y = equipment.y;
	layer.addChild(conditionLayer);
	var additionLayer = self.showAddition();
	additionLayer.x = equipment.x + 10;
	additionLayer.y = equipment.y + height + 10;
	layer.addChild(additionLayer);
	
	var btnEquip = getButton(Language.get("label_equip"), 120);
	btnEquip.x = (320 - btnEquip.getWidth())*0.5;
	btnEquip.y = 280;
	layer.addChild(btnEquip);
	btnEquip.addEventListener(LMouseEvent.MOUSE_UP, self.equip.bind(self));
	
	/*
	if(self.controller.fromController.constructor.name != "CharacterListController"){
		btnEquip.x = (320 - btnEquip.getWidth())*0.5 - btnEquip.getWidth()*0.5 - 5;
		
		var btnSale = getButton(Language.get("label_sale"), 120);
		//btnUse.x = (320 - btnUse.getWidth())*0.5;
		btnSale.x = (320 - btnSale.getWidth())*0.5 + btnSale.getWidth()*0.5 + 5;
		btnSale.y = btnEquip.y;
		layer.addChild(btnSale);
		btnSale.addEventListener(LMouseEvent.MOUSE_UP, self.sale.bind(self));
	}
	*/
	self.layer.addChild(layer);
};
EquipmentDetailedView.prototype.equip=function(event){
	var self = this;
	self.dispatchEvent(EquipmentEvent.Dress);
	return;
	if(self.controller.fromController.constructor.name == "CharacterListController"){
		self.controller.equip(self.itemModel, self.equipComplete.bind(self));
	}else{
		self.gotoCharacterList();
	}
};
EquipmentDetailedView.prototype.gotoCharacterList=function(characterData){
	var self = this;
	self.controller.view.remove();
	LMvc.mainController.characterListShow();
};
EquipmentDetailedView.prototype.sale=function(event){
	var self = this;
	self.controller.view.itemSaleDialog(self.itemModel);
	self.remove();
};
EquipmentDetailedView.prototype.showCondition=function(){
	var self = this;
	var layer = new LSprite();
	var lblLevel = getStrokeLabel("等级：" /*+ self.itemModel.lv()*/,20,"#FFFFFF","#000000",4);
	layer.addChild(lblLevel);
	return layer;
};
EquipmentDetailedView.prototype.showAddition=function(){
	var self = this;
	var layer = new LSprite();
	var lblLevel = getStrokeLabel("攻击：" /*+ self.itemModel.attack()*/,20,"#FFFFFF","#000000",4);
	layer.addChild(lblLevel);
	return layer;
};
EquipmentDetailedView.prototype.equipComplete=function(data){
	var self = this;
	var controller = self.controller;
	var fromController = controller.fromController;
	controller.view.remove();
};
EquipmentDetailedView.prototype.addClickEvent=function(event){
	var self = event.target.parent;
	self.addEventListener(LMouseEvent.MOUSE_UP, self.onClick);
};
EquipmentDetailedView.prototype.onClick=function(event){
	var self = event.currentTarget;
	self.remove();
};
