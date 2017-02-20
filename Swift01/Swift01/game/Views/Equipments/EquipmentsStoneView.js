function EquipmentsStoneView(controller, equipmentModel) {
	var self = this;
	base(self, LView, [controller]);
	self.equipmentModel = equipmentModel;
	self.iconWidth = 50;
	self.iconHeight = 50;
	self.equipmentLayerHeight = 100;
	self.size = new LPoint(LMvc.screenWidth - 20, LMvc.screenHeight - self.equipmentLayerHeight);
	self.init();
}
EquipmentsStoneView.prototype.init = function() {
	var self = this;
	self.equipmentLayer = new LSprite();
	self.addChild(self.equipmentLayer);
	self.equipmentLayer.addChild(getPanel("win02",LMvc.screenWidth,self.equipmentLayerHeight));
	self.listLayer = new LSprite();
	self.listLayer.y = self.equipmentLayerHeight;
	self.addChild(self.listLayer);
	self.listLayer.addChild(getPanel("win04",LMvc.screenWidth,self.size.y));
	self.setEquipment();
	self.setStoneList();
	self.setCtrl();
};
EquipmentsStoneView.prototype.setCtrl = function() {
	var self = this;
	if(!self.buttonClose){
		var bitmapClose = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
		var buttonClose = new LButton(bitmapClose);
		buttonClose.x = LMvc.screenWidth - bitmapClose.getWidth() - 5;
		self.addChild(buttonClose);
		buttonClose.addEventListener(LMouseEvent.MOUSE_UP, self.onClickCloseButton);
		self.buttonClose = buttonClose;
	}
};
EquipmentsStoneView.prototype.onClickCloseButton = function(event) {
	var self = event.currentTarget.getParentByConstructor(EquipmentsStoneView);
	self.remove();
	CharacterDetailedView.instance.visible = true;
};
EquipmentsStoneView.prototype.setEquipment = function() {
	var self = this;
	var lblName = self.getName();
	lblName.text = self.equipmentModel.name();
	var lblParams = self.getParams();
	var txtParams = "", add = "";
	var params = self.equipmentModel.params();
	for(var i = 0;i < params.length;i++){
		var key = params[i];
		txtParams += add + Language.get(key) + " + " + self.equipmentModel.getParam(key);
		add = "\n";
	}
	lblParams.text = txtParams;
	var lblSkill = self.getSkill();
	if(lblSkill){
		lblSkill.text = String.format("{0} : {1}",Language.get("stunt"), self.equipmentModel.skill().name());
	}
	if(!self.equipmentId || self.equipmentId != self.equipmentModel.id() 
	 || self.stone != self.equipmentModel.stone()){
		if(self.icon){
			self.icon.remove();
		}
		self.equipmentId =self.equipmentModel.id();
		self.stone =self.equipmentModel.stone();
		self.icon = self.equipmentModel.icon(new LPoint(self.iconWidth, self.iconHeight),self.iconComplete);
		self.icon.x = self.icon.y = 10;
		self.equipmentLayer.addChild(self.icon);
	}
};
EquipmentsStoneView.prototype.iconComplete=function(event){
	var self = event.currentTarget.parent.parent;
	self.cacheAsBitmap(false);
	self.updateView();
};
EquipmentsStoneView.prototype.setStoneList = function() {
	var self = this;
	var stoneList = self.getStoneList();
	if(self.listView){
		self.updateItems(stoneList);
		return;
	}
	self.listView = new LListView();
	self.listView.x = self.listView.y = 10;
	self.listView.resize(self.size.x, self.size.y);
	self.listView.cellWidth = self.size.x;
	self.listView.cellHeight = 70;
	self.listLayer.addChild(self.listView);
	var items = [];
	for (var i = 0, l = stoneList.length; i < l; i++) {
		var child = new StoneChildView(stoneList[i], self.size.x);
		items.push(child);
	}
	self.listView.updateList(items);
};
EquipmentsStoneView.prototype.updateView = function() {
	var self = this;
	self.setEquipment();
	self.setStoneList();
};
EquipmentsStoneView.prototype.getName=function(){
	var self = this;
	if(!self.lblName){
		var lblName = getStrokeLabel("",23,"#FFFFFF","#000000",3);
		lblName.x = self.iconWidth + 15;
		lblName.y = 15;
		self.equipmentLayer.addChild(lblName);
		self.lblName = lblName;
	}
	return self.lblName;
};
EquipmentsStoneView.prototype.getSkill=function(){
	var self = this;
	if(!self.lblSkill){
		if(!self.equipmentModel.skill()){
			return null;
		}
		var lblSkill = getStrokeLabel("",16,"#FFFFFF","#000000",3);
		lblSkill.x = 200;
		lblSkill.y = self.lblParams.y + self.lblParams.getHeight() + 5;
		self.equipmentLayer.addChild(lblSkill);
		self.lblSkill = lblSkill;
	}
	return self.lblSkill;
};
EquipmentsStoneView.prototype.getParams=function(){
	var self = this;
	if(!self.lblParams){
		var lblParams = getStrokeLabel("",16,"#FFFFFF","#000000",3);
		lblParams.setWordWrap(true, 23);
		lblParams.x = 200;
		lblParams.y = 15;
		self.equipmentLayer.addChild(lblParams);
		self.lblParams = lblParams;
	}
	return self.lblParams;
};
EquipmentsStoneView.prototype.getStoneList = function() {
	var self = this;
	var seignior = SeigniorModel.getSeignior(LMvc.selectSeignorId);
	var stoneList = seignior.stones();
	stoneList = stoneList.sort(function(a, b){
		var v = b.rarity() - a.rarity();
		if(v != 0){
			return v;
		}
		return b.id() - a.id();
	});
	return stoneList;
};
EquipmentsStoneView.prototype.updateItems = function(stoneList) {
	var self = this;
	var items = self.listView.getItems();
	while(items.length > stoneList.length){
		self.listView.deleteChildView(items[items.length - 1]);
	}
	for(var i=0,l=stoneList.length;i<l;i++){
		var item;
		if(i < items.length){
			item = items[i];
		}else{
			item = new StoneChildView(stoneList[i], self.size.x);
			self.listView.insertChildView(item);
		}
		item.itemModel = stoneList[i];
		item.cacheAsBitmap(false);
		if(!self.listView.isInClipping(i)){
			continue;
		}
		item.set();
		item.updateView();
	}
};
EquipmentsStoneView.prototype.equipStone = function(itemModel) {
	var self = this;
	self.equipmentModel.stone(itemModel.id());
	self.equipmentModel.stonePlus({skill:10,type:ItemType.EQUIPMENT});
	var seignior = SeigniorModel.getSeignior(LMvc.selectSeignorId);
	seignior.removeItem(itemModel);
	self.updateView();
};