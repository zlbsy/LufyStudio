function CreateCharacterView(controller){
	base(this,LView,[controller]);
	this.name = "CreateCharacterView";
}
CreateCharacterView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
CreateCharacterView.prototype.layerInit=function(){
	var self = this;
	//self.addChild(getTranslucentMask());
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
	var panel = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win05"]),LMvc.screenWidth, LMvc.screenHeight));
	//panel.y = 20;
	self.baseLayer.addChild(panel);
	
	self.titleLayer = new LSprite();
	self.baseLayer.addChild(self.titleLayer);
};
CreateCharacterView.prototype.titleInit=function(){
	var self = this, label;
	label = getStrokeLabel(Language.get("create_character_list"),24,"#CDD4AF","#000000",4);
	label.x = 15;
	label.y = 15;
	self.titleLayer.addChild(label);
	var list = ["name", 20, "force", 110, "intelligence", 160, "command", 210, "agility", 260, "luck", 310, "stunt", 360];
	for(var i=0,l=list.length;i<l;i+=2){
		label = getStrokeLabel(Language.get(list[i]),20,"#CDD4AF","#000000",4);
		label.x = list[i + 1];
		label.y = 60;
		self.titleLayer.addChild(label);
		if(i+2 >= l){
			break;
		}
		var bitmapLine = new LBitmap(new LBitmapData(LMvc.datalist["icon-line"]));
		bitmapLine.scaleX = 2;
		bitmapLine.scaleY = 20;
		bitmapLine.x = list[i + 3] - 5;
		bitmapLine.y = 60;
		self.titleLayer.addChild(bitmapLine);
	}
	/*
	label = getStrokeLabel(Language.get("name"),20,"#FFFFFF","#000000",4);
	label.x = 100;
	label.y = 60;
	self.titleLayer.addChild(label);*/
	self.titleLayer.cacheAsBitmap(true);
};
CreateCharacterView.prototype.init=function(){
	var self = this;
	self.layerInit();
	self.titleInit();
	var characters = LPlugin.characters();
	self.listView = new LListView();
	self.listView.x = 10;
	self.listView.y = 90;
	self.listView.cellWidth = LMvc.screenWidth - 40;
	self.listView.cellHeight = 50;
	self.baseLayer.addChild(self.listView);

	var items = [], child;
	for(var i=0,l=characters.list.length;i<l;i++){
		var character = characters.list[i];
		child = new CreateCharacterListChildView(character);
		items.push(child);
	}
	
	self.listView.resize(self.listView.cellWidth, LMvc.screenHeight - self.y - self.listView.y - 15);
	self.listView.updateList(items);
	
	var updateButton = getSizeButton(Language.get("create"),100,40);
	updateButton.x = 300;
	updateButton.y = 10;
	self.baseLayer.addChild(updateButton);
	updateButton.addEventListener(LMouseEvent.MOUSE_UP, self.showDetailed);
	
	var closeButton = new LButton(new LBitmap(new LBitmapData(LMvc.datalist["close"])));
	closeButton.x = LMvc.screenWidth - closeButton.getWidth();
	self.baseLayer.addChild(closeButton);
	closeButton.addEventListener(LMouseEvent.MOUSE_UP, self.returnToTop);
};
CreateCharacterView.prototype.returnToTop=function(event){
	var self = event.currentTarget.parent.parent;
	self.controller.close();
};
CreateCharacterView.prototype.showDetailed=function(event){
	var self = event.currentTarget.parent.parent;
	self.toShowDetailed(null);
};
CreateCharacterView.prototype.toShowDetailed=function(data){
	var self = this;
	var detailedView = new CreateCharacterDetailedView(self.controller, data);
	self.parent.addChild(detailedView);
	self.visible = false;
};
CreateCharacterView.prototype.saveCharacter=function(detailedView){
	var self = this;
	var charaData = detailedView.getData();
	if(charaData == null){
		return;
	}
	
	var length = LPlugin.characters().list.length;
	console.log("saveCharacter",charaData);
	LPlugin.setCharacter(charaData);
	var characters = LPlugin.characters();
	if(characters.list.length == length){
		var view = self.listView.getItems().find(function(child){
			return child.data.id == charaData.id;
		});
		view.set(charaData);
		view.cacheAsBitmap(false);
		view.updateView();
	}else{
		var view = new CreateCharacterListChildView(charaData);
		self.listView.insertChildView(view);
		view.updateView();
	}
	self.visible = true;
	detailedView.remove();
};
CreateCharacterView.prototype.cancelEvent=function(detailedView){
	var self = this;
	self.visible = true;
	detailedView.remove();
};