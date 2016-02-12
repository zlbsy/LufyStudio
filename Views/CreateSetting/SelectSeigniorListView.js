function SelectSeigniorListView(controller, title){
	var self = this;
	base(self,LView,[controller]);
	self.title = title;
	self.init();
}
SelectSeigniorListView.prototype.init=function(){
	var self = this;
	self.layerInit();
	self.titleInit();
	return;
	self.seigniorInit();
	self.setSeigniorList();
};
SelectSeigniorListView.prototype.layerInit=function(){
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
	
	var closeButton = new LButton(new LBitmap(new LBitmapData(LMvc.datalist["close"])));
	closeButton.x = LGlobal.width - closeButton.getWidth();
	self.baseLayer.addChild(closeButton);
	closeButton.addEventListener(LMouseEvent.MOUSE_UP, self.closeSelf);
};
SelectSeigniorListView.prototype.closeSelf=function(event){
	var self = event.currentTarget.getParentByConstructor(SelectSeigniorListView);
	var detailedView = self.getParentByConstructor(CreateSeigniorDetailedView);
	detailedView.baseLayer.visible = true;
	self.remove();
};
SelectSeigniorListView.prototype.titleInit=function(){
	var self = this, label;
	label = getStrokeLabel(Language.get(self.title),24,"#CDD4AF","#000000",4);
	label.x = 15;
	label.y = 15;
	self.titleLayer.addChild(label);
	self.titleLayer.cacheAsBitmap(true);
};
SelectSeigniorListView.prototype.seigniorInit=function(){
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
SelectSeigniorListView.prototype.setSeigniorList=function(){
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
	 {id:1000,color:"0,0,255",citys:[{id:39,generals:[1,2]}]}
	 * */
	var items = [], child;
	for(var i=0,l=seigniorList.list.length;i<l;i++){
		var seignior = seigniorList.list[i];
		child = new CreateSeigniorListChildView(seignior);
		items.push(child);
	}
		child = new CreateSeigniorListChildView({id:1000,color:"0,0,255",citys:[{id:39,generals:[1,2]}]});
		items.push(child);
		child = new CreateSeigniorListChildView({id:1001,color:"100,0,255",citys:[{id:39,generals:[1,2]}]});
		items.push(child);
		
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