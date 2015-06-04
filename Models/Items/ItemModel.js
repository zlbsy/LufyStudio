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
ItemModel.prototype.lv = function(){
	return this.data.lv;
};
ItemModel.prototype.count = function(){
	return this.data.cnt;
};
ItemModel.prototype.name = function(){
	return this.master().name();
};
ItemModel.prototype.itemType = function(){
	return this.master().itemType();
};
ItemModel.prototype.attack = function(){
	return this.master().init().attack + this.lv() * this.master().add().attack;
};
ItemModel.prototype.spirit = function(){
	return this.master().init().spirit + this.lv() * this.master().add().spirit;
};
ItemModel.prototype.defense = function(){
	return this.master().init().defense + this.lv() * this.master().add().defense;
};
ItemModel.prototype.breakout = function(){
	return this.master().init().breakout + this.lv() * this.master().add().breakout;
};
ItemModel.prototype.morale = function(){
	return this.master().init().morale + this.lv() * this.master().add().morale;
};
ItemModel.prototype.troops = function(){
	return this.master().init().troops + this.lv() * this.master().add().troops;
};
ItemModel.prototype.price = function(){
	return this.master().price();
};
ItemModel.prototype.position = function(){
	return this.master().position();
};
ItemModel.prototype.explanation = function(){
	return this.master().explanation();
};
/*效果*/
ItemModel.prototype.effect = function(){
	var self = this;
	var out = "";
	if(self.troops() != 0){
		out += String.format("{0} : {1}\n",Language.get("troops"), self.troops());
	}
	if(self.attack() != 0){
		out += String.format("{0} : {1}\n",Language.get("attack"), self.attack());
	}
	if(self.spirit() != 0){
		out += String.format("{0} : {1}\n",Language.get("spirit"), self.spirit());
	}
	if(self.defense() != 0){
		out += String.format("{0} : {1}\n",Language.get("defense"), self.defense());
	}
	if(self.breakout() != 0){
		out += String.format("{0} : {1}\n",Language.get("breakout"), self.breakout());
	}
	if(self.morale() != 0){
		out += String.format("{0} : {1}\n",Language.get("morale"), self.morale());
	}
	return out;
};
ItemModel.prototype.icon=function(size){
	return this.master().icon(size);
	if(!size){
		size = new LPoint(100,100);
	}
	var icon = this.master().icon(size);
	var lblCount = getStrokeLabel(this.count(),25,"#FFFFFF","#000000",3);
	lblCount.x = size.x - 5 - lblCount.getWidth();
	lblCount.y = 5;
	icon.addChild(lblCount);
	return icon;
};