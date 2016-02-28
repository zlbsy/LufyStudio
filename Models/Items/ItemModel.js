function ItemModel(controller,data){
	var self = this;
	base(self,MyModel,[controller]);
	self.data = data;
}
ItemModel.prototype.master=function(){
	var self = this;
	if(!self._master){
		self._master = ItemMasterModel.getMaster(self.id());
	}
	return self._master;
};
ItemModel.prototype.id = function(){
	return this.data.item_id;
};
ItemModel.prototype.count = function(value){
	return this._dataValue("count", value, 0);
};
ItemModel.prototype.name = function(){
	return this.master().name();
};
ItemModel.prototype.itemType = function(){
	return this.master().itemType();
};
ItemModel.prototype.params = function(){
	return this.master().params();
};
ItemModel.prototype.getParam = function(key){
	return this.master().getParam(key);
};
ItemModel.prototype.attack = function(){
	return this.master().attack();
};
ItemModel.prototype.spirit = function(){
	return this.master().spirit();
};
ItemModel.prototype.defense = function(){
	return this.master().defense();
};
ItemModel.prototype.breakout = function(){
	return this.master().breakout();
};
ItemModel.prototype.morale = function(){
	return this.master().morale();
};
ItemModel.prototype.troops = function(){
	return this.master().troops();
};
ItemModel.prototype.force = function(){
	return this.master().force();
};
ItemModel.prototype.intelligence = function(){
	return this.master().intelligence();
};
ItemModel.prototype.command = function(){
	return this.master().command();
};
ItemModel.prototype.agility = function(){
	return this.master().agility();
};
ItemModel.prototype.luck = function(){
	return this.master().luck();
};
ItemModel.prototype.position = function(){
	return this.master().position();
};
ItemModel.prototype.explanation = function(){
	return this.master().explanation();
};
ItemModel.prototype.icon=function(size,callback){
	if(!size){
		size = new LPoint(100,100);
	}
	//var icon = new BitmapSprite(LMvc.IMG_PATH + "item/" + this.id() + ".png", null,size);
	var icon = new BitmapSprite(LMvc.IMG_PATH + "item/1.png", null,size);
	if(typeof callback == "function")icon.addEventListener(LEvent.COMPLETE, callback);
	var winPanel = new LPanel(new LBitmapData(LMvc.datalist["win06"]),size.x,size.y);
	winPanel.cacheAsBitmap(true);
	icon.addChild(winPanel);
	return icon;
};