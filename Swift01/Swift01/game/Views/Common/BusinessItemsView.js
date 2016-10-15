function BusinessItemsView(controller, characterModel, item){
	var self = this;
	LExtends(self,LView,[controller]);
	self.set(characterModel, item);
}
BusinessItemsView.prototype.set = function(characterModel, item){
	var self = this, width = 340, height = 340;
	self.characterModel = characterModel;
	self.item = item;
	SeigniorExecute.Instance().backLayer.visible = false;
	SeigniorExecute.Instance().msgView.hideSeignior();
	var windowLayer = getTranslucentMask();
	self.addChild(windowLayer);
	var panel = getPanel("win05", width, height);
	panel.x = (LMvc.screenWidth - width) * 0.5;
	panel.y = (LMvc.screenHeight - height) * 0.5;
	self.addChild(panel);
	var titlePanel = getPanel("win02",160,60);
	titlePanel.x = (LMvc.screenWidth - titlePanel.getWidth()) * 0.5;
	titlePanel.y = panel.y - 10;
	self.addChild(titlePanel);
	var title = getStrokeLabel(Language.get("confirm"),20,"#FFFFFF","#000000",4);
	title.x = (LMvc.screenWidth - title.getWidth())*0.5;
	title.y = panel.y + 8;
	self.addChild(title);
	
	var messageHtml = String.format(Language.get("businessSaleMessage"), characterModel.name(), item.name());
	var msg = getStrokeLabel(messageHtml,16,"#FFFFFF","#000000",2,"htmlText");
	msg.width = width - 60;
	msg.x = panel.x + 30;
	msg.y = panel.y + 70;
	msg.setWordWrap(true,27);
	self.addChild(msg);
	var icon = item.icon();
	icon.x = msg.x;
	icon.y = msg.y + 100;
	self.addChild(icon);
	var price = getStrokeLabel(String.format(Language.get("item_price"), item.businessPrice()),18,"#FFFFFF","#000000",2); 
	price.x = icon.x + icon.getWidth() + 20;
	price.y = icon.y + 10;
	self.addChild(price);
	
	var okButton = getButton(Language.get("yes"), 100);
	okButton.x = panel.x + panel.getWidth()*0.5 - okButton.getWidth() - 20;
	okButton.y = panel.y + panel.getHeight() - okButton.getHeight() - 20;
	self.addChild(okButton);
	okButton.addEventListener(LMouseEvent.MOUSE_UP, self.buy);
	
	var cancelButton = getButton(Language.get("no"), 100);
	cancelButton.x = panel.x + panel.getWidth()*0.5 + 20;
	cancelButton.y = panel.y + panel.getHeight() - cancelButton.getHeight() - 20;
	self.addChild(cancelButton);
	cancelButton.addEventListener(LMouseEvent.MOUSE_UP, self.cancel);
};
BusinessItemsView.prototype.buy = function(event){
	var self = event.currentTarget.getParentByConstructor(BusinessItemsView);
	self.characterModel.city().money(-self.item.businessPrice());
	self.characterModel.city().addItem(new ItemModel(null,{item_id:self.item.id(),count:1}));
	self.removeSelf();
};
BusinessItemsView.prototype.cancel = function(event){
	var self = event.currentTarget.getParentByConstructor(BusinessItemsView);
	self.removeSelf();
};
BusinessItemsView.prototype.removeSelf = function(){
	var self = this;
	self.characterModel = null;
	self.item = null;
	self.remove();
	SeigniorExecute.Instance().msgView.showSeignior();
	SeigniorExecute.run();
};