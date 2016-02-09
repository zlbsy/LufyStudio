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
};
CreateCharacterView.prototype.init=function(){
	var self = this;
	self.layerInit();
	var characters = LPlugin.characters();
	self.listView = new LListView();
	self.listView.x = 10;
	self.listView.y = 55;
	self.listView.cellWidth = LGlobal.width - 40;
	self.listView.cellHeight = 50;
	self.baseLayer.addChild(self.listView);

	var items = [], child;
	for(var i=0,l=characters.length;i<l;i++){
		var character = characters[i];
		child = new CreateCharacterListChildView(character);
		items.push(child);
	}
	
	self.listView.resize(260, 50 * 6);
	self.listView.updateList(items);
	
	var updateButton = getSizeButton("做成",80,40);
	updateButton.x = 90;
	updateButton.y = 90;
	self.baseLayer.addChild(updateButton);
	updateButton.addEventListener(LMouseEvent.MOUSE_UP, self.showDetailed);
};
CreateCharacterView.prototype.showDetailed=function(event){
	var self = event.currentTarget.parent.parent;
	
	data = null;
	var detailedView = new CreateCharacterDetailedView(self.controller, data);
	var obj = {title:Language.get("武将做成"),subWindow:detailedView,contentStartY:60,width:LGlobal.width,height:LGlobal.height - 20,okEvent:self.saveCharacter,cancelEvent:null};
	var windowLayer = ConfirmWindow(obj);
	self.addChild(windowLayer);
};
CreateCharacterView.prototype.saveCharacter=function(event){
	var windowLayer = event.currentTarget.parent;
	var detailedView = windowLayer.childList.find(function(child){
		return child.constructor.name == "CreateCharacterDetailedView";
	});
	var self = windowLayer.parent;
	var charaData = detailedView.getData();
	windowLayer.remove();
	
};