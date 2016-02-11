function CreateSettingView(controller){
	base(this,LView,[controller]);
}
CreateSettingView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
CreateSettingView.prototype.init=function(){
	var self = this;
	self.layerInit();
	self.titleInit();
	self.seigniorInit();
	self.setSeigniorList();
};
CreateSettingView.prototype.layerInit=function(){
	var self = this;
	//self.addChild(getTranslucentMask());
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
	var panel = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win05"]),LGlobal.width, LGlobal.height));
	//panel.y = 20;
	self.baseLayer.addChild(panel);
	
	self.titleLayer = new LSprite();
	self.baseLayer.addChild(self.titleLayer);
	self.seigniorLayer = new LSprite();
	self.baseLayer.addChild(self.seigniorLayer);
};
CreateSettingView.prototype.titleInit=function(){
	var self = this, label;
	label = getStrokeLabel(Language.get("create_seignior_list"),24,"#CDD4AF","#000000",4);
	label.x = 15;
	label.y = 15;
	self.titleLayer.addChild(label);
	self.titleLayer.cacheAsBitmap(true);
};
CreateSettingView.prototype.seigniorInit=function(){
	var self = this, label;
	var list = ["name", 20, "city", 130, "generals", 200, "seignior_color", 270];
	for(var i=0,l=list.length;i<l;i+=2){
		label = getStrokeLabel(Language.get(list[i]),20,"#CDD4AF","#000000",4);
		label.x = list[i + 1];
		label.y = 60;
		self.seigniorLayer.addChild(label);
		if(i+2 >= l){
			break;
		}
		var bitmapLine = new LBitmap(new LBitmapData(LMvc.datalist["icon-line"]));
		bitmapLine.scaleX = 2;
		bitmapLine.scaleY = 20;
		bitmapLine.x = list[i + 3] - 15;
		bitmapLine.y = 60;
		self.seigniorLayer.addChild(bitmapLine);
	}
	self.seigniorLayer.cacheAsBitmap(true);
};
CreateSettingView.prototype.setSeigniorList=function(){
	var self = this;
	var seigniorList = GameManager.getCreateSeigniorList(LMvc.chapterId);
	console.log("seigniorList.length="+seigniorList.length);
	self.listView = new LListView();
	self.listView.x = 10;
	self.listView.y = 90;
	self.listView.cellWidth = LGlobal.width - 40;
	self.listView.cellHeight = 50;
	self.baseLayer.addChild(self.listView);
	/*
	 {chara_id:1,color:"0,0,255",citys:[{id:39,generals:[1,2]}]}
	 * */
	var items = [], child;
	for(var i=0,l=seigniorList.list.length;i<l;i++){
		var seignior = seigniorList.list[i];
		child = new CreateSeigniorListChildView(seignior);
		items.push(child);
	}
	
	self.listView.resize(self.listView.cellWidth, LGlobal.height - self.y - self.listView.y - 15);
	self.listView.updateList(items);
	return;
	var updateButton = getSizeButton(Language.get("create"),100,40);
	updateButton.x = 300;
	updateButton.y = 10;
	self.baseLayer.addChild(updateButton);
	updateButton.addEventListener(LMouseEvent.MOUSE_UP, self.showDetailed);
	
	var closeButton = new LButton(new LBitmap(new LBitmapData(LMvc.datalist["close"])));
	closeButton.x = LGlobal.width - closeButton.getWidth();
	self.baseLayer.addChild(closeButton);
	closeButton.addEventListener(LMouseEvent.MOUSE_UP, self.returnToTop);
};
CreateSettingView.prototype.returnToTop=function(event){
	var self = event.currentTarget.parent.parent;
	self.controller.close();
};
CreateSettingView.prototype.showDetailed=function(event){
	var self = event.currentTarget.parent.parent;
	self.toShowDetailed(null);
};
CreateSettingView.prototype.toShowDetailed=function(data){
	var self = this;
	var detailedView = new CreateCharacterDetailedView(self.controller, data);
	var obj = {title:Language.get("create_character"),subWindow:detailedView,contentStartY:60,width:LGlobal.width,height:560,okEvent:self.saveCharacter,cancelEvent:self.cancelEvent};
	var windowLayer = ConfirmWindow(obj);
	self.addChild(windowLayer);
	self.baseLayer.visible = false;
};
CreateSettingView.prototype.saveCharacter=function(event){
	var windowLayer = event.currentTarget.parent;
	var detailedView = windowLayer.childList.find(function(child){
		return child.constructor.name == "CreateCharacterDetailedView";
	});
	var self = windowLayer.parent;
	var charaData = detailedView.getData();
	if(charaData == null){
		return;
	}
	var length = LPlugin.characters().list.length;
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
	self.baseLayer.visible = true;
	windowLayer.remove();
};
CreateSettingView.prototype.cancelEvent=function(event){
	var windowLayer = event.currentTarget.parent;
	var detailedView = windowLayer.childList.find(function(child){
		return child.constructor.name == "CreateCharacterDetailedView";
	});
	var self = windowLayer.parent;
	self.baseLayer.visible = true;
	windowLayer.remove();
};