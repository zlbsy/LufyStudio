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
	var width = 340, height = 350;
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);
	//var backgroundData = new LBitmapData(LMvc.datalist["win05"]);
	var panel = getPanel("win05",width,height);
	panel.name = "windowBackground";
	panel.x = (LMvc.screenWidth - panel.getWidth()) * 0.5;
	panel.y = (LMvc.screenHeight - panel.getHeight()) * 0.5;
	self.backLayer.addChild(panel);
	self.backLayer.addEventListener(LMouseEvent.MOUSE_UP, self.click);
	
	self.layer = new LSprite();
	self.layer.x = panel.x;
	self.layer.y = panel.y;
	self.addChild(self.layer);
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
	
	//var titleData = new LBitmapData(LMvc.datalist["win02"]);
	var titlePanel = getPanel("win02",160,60);
	titlePanel.x = (LMvc.screenWidth - titlePanel.getWidth()) * 0.5;
	titlePanel.y = self.backLayer.getChildByName("windowBackground").y - 20;
	self.backLayer.addChild(titlePanel);
	
	var title = getStrokeLabel(self.itemModel.name(),20,"#FFFFFF","#000000",4);
	title.x = (LMvc.screenWidth - title.getWidth())*0.5;
	title.y = self.backLayer.getChildByName("windowBackground").y;
	self.backLayer.addChild(title);
	
	
	var layer = new LSprite();
	
	var width = 100, height = 100;
	var equipment = self.itemModel.icon(new LPoint(width,height));
	equipment.x = 20;
	equipment.y = 50;
	layer.addChild(equipment);
	
	var additionLayer = self.showAddition();
	self.additionLayer = additionLayer;
	additionLayer.x = equipment.x + width + 10;
	additionLayer.y = equipment.y;
	layer.addChild(additionLayer);
	
	//TODO::ver1.1增加物品介绍
	/*var explanation = self.itemModel.explanation();
	var lblExplanation = getStrokeLabel(explanation,18,"#FFFFFF","#000000",4);
	lblExplanation.width = 280;
	lblExplanation.setWordWrap(true, 25);
	lblExplanation.x = equipment.x;
	lblExplanation.y = equipment.y + height + 10;
	layer.addChild(lblExplanation);
	*/
	if(self.fromView.constructor.name != "ItemListView"){
		var btnEquip = getButton(Language.get("label_equip"), 100);
		self.btnEquip = btnEquip;
		btnEquip.x = (340 - btnEquip.getWidth())*0.5 - 65;
		btnEquip.y = 280;
		layer.addChild(btnEquip);
		btnEquip.addEventListener(LMouseEvent.MOUSE_UP, self.equip);
		if(self.itemModel.rarity() <= 4){
			var btnSale = getButton(Language.get("label_sale"), 100);
			self.btnSale = btnSale;
			btnSale.x = (340 - btnSale.getWidth())*0.5 + 65;
			btnSale.y = 280;
			layer.addChild(btnSale);
			btnSale.addEventListener(LMouseEvent.MOUSE_UP, self.sale);
		}else{
			btnEquip.x = (340 - btnEquip.getWidth())*0.5;
		}
	}
	self.layer.addChild(layer);
};
EquipmentDetailedView.prototype.minus=function(event){
	var self = event.currentTarget.getParentByConstructor(EquipmentDetailedView);
	self.changeNumber(self.number - 1);
};
EquipmentDetailedView.prototype.plus=function(event){
	var self = event.currentTarget.getParentByConstructor(EquipmentDetailedView);
	self.changeNumber(self.number + 1);
};
EquipmentDetailedView.prototype.plusMax=function(event){
	var self = event.currentTarget.getParentByConstructor(EquipmentDetailedView);
	self.changeNumber(self.itemModel.count());
};
EquipmentDetailedView.prototype.changeNumber=function(num){
	var self = this;
	self.number = num;
	if(self.number < 1){
		self.number = 1;
	}else if(self.number > self.itemModel.count()){
		self.number = self.itemModel.count();
	}
	self.lblNumber.text = String.format("{0}/{1}", self.number, self.itemModel.count());
	self.lblGet.text = String.format(Language.get("sale_get_money"), self.number*self.itemModel.price());
};
EquipmentDetailedView.prototype.equip=function(event){
	var self = event.currentTarget.getParentByConstructor(EquipmentDetailedView);
	self.dispatchEvent(EquipmentEvent.Dress);
};
EquipmentDetailedView.prototype.saleRun=function(event){
	var self = event.currentTarget.getParentByConstructor(EquipmentDetailedView);
	var cityData = self.controller.getValue("cityData");
	var saleMoney = self.number*self.itemModel.price();
	while(self.number-- > 0){
		cityData.removeItem(self.itemModel);
	}
	cityData.money(saleMoney);
	self.controller.dispatchEvent(LController.NOTIFY_ALL);
	self.remove();
};
EquipmentDetailedView.prototype.sale=function(event){
	var btnSale = event.currentTarget;
	var self = btnSale.getParentByConstructor(EquipmentDetailedView);
	self.btnEquip.remove();
	self.additionLayer.remove();
	btnSale.x = (340 - btnSale.getWidth())*0.5;
	btnSale.removeEventListener(LMouseEvent.MOUSE_UP, self.sale);
	self.saleContentInit();
	btnSale.addEventListener(LMouseEvent.MOUSE_UP, self.saleRun);
};
EquipmentDetailedView.prototype.saleContentInit=function(isResolve){
	var self = this;
	
	var layer = new LSprite();
	var detailedLayer = new LSprite();
	var width = 100, height = 100;
	var detailedLayer = new LSprite();
	var lblCount = getStrokeLabel(String.format(Language.get("hav_quantity"), self.itemModel.count()),20,"#FFFFFF","#000000",4);
	detailedLayer.addChild(lblCount);
	if(!isResolve){
		var lblPrice = getStrokeLabel(String.format(Language.get("sale_unit_price"), self.itemModel.price()),20,"#FFFFFF","#000000",4);
		lblPrice.y = 30;
		detailedLayer.addChild(lblPrice);
	}
	detailedLayer.x = width + 30;
	detailedLayer.y = 50;
	layer.addChild(detailedLayer);
		
	var lblExplanation = getStrokeLabel(Language.get(isResolve?"resolve_quantity_select":"sale_quantity_select"),20,"#FFFFFF","#000000",4);
	lblExplanation.x = 20;
	lblExplanation.y = 50 + height + 10;
	layer.addChild(lblExplanation);
	
	self.number = 1;
	var lblNumber = getStrokeLabel(String.format("{0}/{1}", self.number, self.itemModel.count()),24,"#FFFFFF","#000000",4);
	lblNumber.textAlign = "center";
	lblNumber.x = 120;
	lblNumber.y = 200;
	layer.addChild(lblNumber);
	self.lblNumber = lblNumber;
	
	var btnMinus = getButton("-", 60);
	btnMinus.x = 15;
	btnMinus.y = 190;
	layer.addChild(btnMinus);
	btnMinus.addEventListener(LMouseEvent.MOUSE_UP, self.minus);
	var btnPlus = getButton("+", 60);
	btnPlus.x = 165;
	btnPlus.y = 190;
	layer.addChild(btnPlus);
	btnPlus.addEventListener(LMouseEvent.MOUSE_UP, self.plus);
	var btnMax = getButton(Language.get("max"), 80);
	btnMax.x = 225;
	btnMax.y = 190;
	layer.addChild(btnMax);
	btnMax.addEventListener(LMouseEvent.MOUSE_UP, self.plusMax);
	
	var lblGet = getStrokeLabel(String.format(Language.get("sale_get_money"),0),20,"#FFFFFF","#000000",4);
	lblGet.x = 20;
	lblGet.y = 250;
	layer.addChild(lblGet);
	self.lblGet = lblGet;
	self.changeNumber(self.number);
	
	self.layer.addChild(layer);
};
EquipmentDetailedView.prototype.showAddition=function(){
	var self = this;
	var layer = new LSprite();
	var params = self.itemModel.params();
	for(var i = 0;i < params.length;i++){
		var key = params[i];
		var label = getStrokeLabel(Language.get(key) + " + " + self.itemModel.getParam(key),20,"#FFFFFF","#000000",4);
		label.y = i * 25;
		layer.addChild(label);
	}
	return layer;
};
EquipmentDetailedView.prototype.equipComplete=function(data){
	var self = this;
	var controller = self.controller;
	var fromController = controller.fromController;
	controller.view.remove();
};
