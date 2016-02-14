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
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
	var panel = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win05"]),LGlobal.width, LGlobal.height));
	self.baseLayer.addChild(panel);
	
	self.titleLayer = new LSprite();
	self.baseLayer.addChild(self.titleLayer);
	self.seigniorLayer = new LSprite();
	self.baseLayer.addChild(self.seigniorLayer);
};
CreateSettingView.prototype.titleInit=function(){
	var self = this, label;
	label = getStrokeLabel(Language.get("create_seignior_list"),26,"#CDD4AF","#000000",4);
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
	self.listView = new LListView();
	self.listView.x = 10;
	self.listView.y = 90;
	self.listView.cellWidth = LGlobal.width - 40;
	self.listView.cellHeight = 50;
	self.baseLayer.addChild(self.listView);
	/*{id:1000,color:"0,0,255",citys:[{id:39,prefecture:1,generals:[1,2]}]}*/
	var items = [], child;
	for(var i=0,l=seigniorList.list.length;i<l;i++){
		var seignior = seigniorList.list[i];
		child = new CreateSeigniorListChildView(seignior);
		items.push(child);
	}
		
	self.listView.resize(self.listView.cellWidth, LGlobal.height - self.y - self.listView.y - 15);
	self.listView.updateList(items);
	
	var updateButton = getSizeButton(Language.get("create"),100,40);
	updateButton.x = 300;
	updateButton.y = 10;
	self.baseLayer.addChild(updateButton);
	updateButton.addEventListener(LMouseEvent.MOUSE_UP, self.showDetailed);
	
	var closeButton = new LButton(new LBitmap(new LBitmapData(LMvc.datalist["close"])));
	closeButton.x = LGlobal.width - closeButton.getWidth();
	self.baseLayer.addChild(closeButton);
	closeButton.addEventListener(LMouseEvent.MOUSE_UP, self.closeSelf);
};
CreateSettingView.prototype.closeSelf=function(event){
	var self = event.currentTarget.getParentByConstructor(CreateSettingView);
	self.controller.close();
};
CreateSettingView.prototype.closeSeigniorDetailed=function(isSave){
	var self = this;
	self.baseLayer.visible = true;
	if(isSave){
		var data = self.detailedView.getData();
		//{id:1000,color:"0,0,255",citys:[{id:39,generals:[1,2]}]}
		var seigniorItems = self.listView.getItems();
		var seigniorIndex = seigniorItems.findIndex(function(item){
			return item.data.id == data.id;
		});
		var child;
		if(seigniorIndex >= 0){
			child = seigniorItems[seigniorIndex];
			child.set(data);
			child.cacheAsBitmap(false);
			child.updateView();
		}else{
			child = new CreateSeigniorListChildView(data);
			self.listView.insertChildView(child);
		}
		self.saveSeignior();
	}
	self.detailedView.remove();
	self.detailedView = null;
};
CreateSettingView.prototype.showDetailed=function(event){
	var self = event.currentTarget.parent.parent;
	self.toShowDetailed(null);
};
CreateSettingView.prototype.toShowDetailed=function(data){
	var self = this;
	self.detailedView = new CreateSeigniorDetailedView(self.controller, data);
	self.addChild(self.detailedView);
	self.baseLayer.visible = false;
};
CreateSettingView.prototype.toDeleteDetailed=function(child){
	var self = this;
	self.listView.deleteChildView(child);
	self.saveSeignior();
};
CreateSettingView.prototype.saveSeignior=function(){
	var self = this;
	var data = {list:[]};
	var seigniorItems = self.listView.getItems();
	for(var i=0,l=seigniorItems.length;i<l;i++){
		data.list.push(seigniorItems[i].data);
	}console.log(data);
	GameManager.setCreateSeigniorList(LMvc.chapterId, data);
};
