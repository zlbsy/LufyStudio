function CreateCharacterView(controller){
	base(this,LView,[controller]);
}
CreateCharacterView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
CreateCharacterView.prototype.layerInit=function(){
	var self = this;
	//self.addChild(getTranslucentMask());
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
	var panel = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win05"]),LGlobal.width, LGlobal.height));
	//panel.y = 20;
	self.baseLayer.addChild(panel);
	
	self.titleLayer = new LSprite();
	self.baseLayer.addChild(self.titleLayer);
};
CreateCharacterView.prototype.titleInit=function(){
	var self = this, label;
	label = getStrokeLabel("自设武将一览",24,"#FFFFFF","#000000",4);
	label.x = 15;
	label.y = 15;
	self.titleLayer.addChild(label);
	label = getStrokeLabel(Language.get("name"),20,"#FFFFFF","#000000",4);
	label.x = 20;
	label.y = 60;
	self.titleLayer.addChild(label);
	var bitmapLine = new LBitmap(new LBitmapData(LMvc.datalist["icon-line"]));
	bitmapLine.scaleY = 20;
	bitmapLine.x = 70;
	bitmapLine.y = 60;
	self.titleLayer.addChild(bitmapLine);
	
	label = getStrokeLabel(Language.get("name"),20,"#FFFFFF","#000000",4);
	label.x = 100;
	label.y = 60;
	self.titleLayer.addChild(label);
	self.titleLayer.cacheAsBitmap(true);
};
CreateCharacterView.prototype.init=function(){
	var self = this;
	self.layerInit();
	self.titleInit();
	var characters = LPlugin.characters();
	console.log("characters.list.length="+characters.list.length);
	self.listView = new LListView();
	self.listView.x = 10;
	self.listView.y = 100;
	self.listView.cellWidth = LGlobal.width - 40;
	self.listView.cellHeight = 50;
	self.baseLayer.addChild(self.listView);

	var items = [], child;
	for(var i=0,l=characters.list.length;i<l;i++){
		var character = characters.list[i];
		child = new CreateCharacterListChildView(character);
		items.push(child);
	}
	
	self.listView.resize(self.listView.cellWidth, 50 * 6);
	self.listView.updateList(items);
	
	var updateButton = getSizeButton(Language.get("create"),100,40);
	updateButton.x = 300;
	updateButton.y = 10;
	self.baseLayer.addChild(updateButton);
	updateButton.addEventListener(LMouseEvent.MOUSE_UP, self.showDetailed);
};
CreateCharacterView.prototype.showDetailed=function(event){
	var self = event.currentTarget.parent.parent;
	
	data = null;
	var detailedView = new CreateCharacterDetailedView(self.controller, data);
	var obj = {title:Language.get("create_character"),subWindow:detailedView,contentStartY:60,width:LGlobal.width,height:560,okEvent:self.saveCharacter,cancelEvent:self.cancelEvent};
	var windowLayer = ConfirmWindow(obj);
	self.addChild(windowLayer);
	self.baseLayer.visible = false;
};
CreateCharacterView.prototype.saveCharacter=function(event){
	var windowLayer = event.currentTarget.parent;
	var detailedView = windowLayer.childList.find(function(child){
		return child.constructor.name == "CreateCharacterDetailedView";
	});
	var self = windowLayer.parent;
	var charaData = detailedView.getData();
	if(charaData == null){
		return;
	}
	LPlugin.setCharacter(charaData);
	self.baseLayer.visible = true;
	windowLayer.remove();
};
CreateCharacterView.prototype.cancelEvent=function(event){
	var windowLayer = event.currentTarget.parent;
	var detailedView = windowLayer.childList.find(function(child){
		return child.constructor.name == "CreateCharacterDetailedView";
	});
	var self = windowLayer.parent;
	self.baseLayer.visible = true;
	windowLayer.remove();
};