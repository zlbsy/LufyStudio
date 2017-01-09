function ItemDetailedView(controller,itemModel,fromView){
	var self = this;
	base(self,LView,[controller]);
	self.itemModel = itemModel;
	self.fromView = fromView;
	self.set();
}
ItemDetailedView.prototype.layerInit=function(){
	var self = this;
	self.translucentLayer = new LSprite();
	self.addChild(self.translucentLayer);
	self.translucentLayer.addChild(getTranslucentBitmap());
	self.translucentLayer.addEventListener(LMouseEvent.MOUSE_DOWN, self.click);
	self.translucentLayer.addEventListener(LMouseEvent.MOUSE_UP, self.closeClick);
	var width = 320, height = 270;
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
ItemDetailedView.prototype.click=function(event){};
ItemDetailedView.prototype.closeClick=function(event){
	var self = event.currentTarget.parent;
	self.close();
};
ItemDetailedView.prototype.close=function(){
	var self = this;
	self.remove();
	for (var k in self)delete self[k];
};
ItemDetailedView.prototype.set=function(){
	var self = this;
	self.layerInit();
	
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
	additionLayer.x = equipment.x + width + 10;
	additionLayer.y = equipment.y;
	layer.addChild(additionLayer);
	
	var explanation = self.itemModel.explanation();
	var lblExplanation = getStrokeLabel(explanation,18,"#FFFFFF","#000000",4);
	lblExplanation.width = 280;
	lblExplanation.setWordWrap(true, 25);
	lblExplanation.x = equipment.x;
	lblExplanation.y = equipment.y + height + 10;
	layer.addChild(lblExplanation);
	
	if(self.fromView.constructor.name != "ItemListView"){
		var btnEquip = getButton(Language.get("label_use"), 120);
		btnEquip.x = (320 - btnEquip.getWidth())*0.5;
		btnEquip.y = 200;
		layer.addChild(btnEquip);
		btnEquip.addEventListener(LMouseEvent.MOUSE_UP, self.use);
	}
	self.layer.addChild(layer);
};
ItemDetailedView.prototype.use=function(event){
	var button = event.currentTarget;
	var self = button.getParentByConstructor(ItemDetailedView);
	var e = new LEvent(ItemEvent.USE_ITEM);
	e.item = self.itemModel;
	self.dispatchEvent(e);
};
ItemDetailedView.prototype.showAddition=function(){
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
ItemDetailedView.prototype.equipComplete=function(data){
	var self = this;
	var controller = self.controller;
	var fromController = controller.fromController;
	controller.view.remove();
};
