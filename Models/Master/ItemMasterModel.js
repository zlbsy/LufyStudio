function ItemMasterModel(controller,data){
	var self = this;
	base(self,MyModel,[controller]);
	self.data = data;
	self.setData();
}
ItemMasterModel.master = [];
ItemMasterModel.setMaster=function(list){
	var self = this;
	for(var i=0,l=list.length;i<l;i++){
		var item = new ItemMasterModel(null,list[i]);
		ItemMasterModel.master.push(item);
	}
};
ItemMasterModel.getMaster=function(item_id){
	var self = this;
	for(var i=0,l=ItemMasterModel.master.length;i<l;i++){
		var item = ItemMasterModel.master[i];
		if(item.id() != item_id){
			continue;
		}
		return item;
	}
	return null;
};
ItemMasterModel.getStamps=function(){
	var self = this;
	var stamps = [];
	for(var i=0,l=ItemMasterModel.master.length;i<l;i++){
		var item = ItemMasterModel.master[i];
		if(!item.stamp()){
			continue;
		}
		stamps.push(item);
	}
	return stamps;
};
ItemMasterModel.prototype.setData = function(){
	var self = this;
	if(self.data.type == ItemType.EQUIPMENT){
		self.initEquipmentData();
	}
};
ItemMasterModel.prototype.initEquipmentData = function(){
	var self = this;
	var params = ["force","intelligence","command","agility","luck","attack","spirit","defense","breakout","morale","troops","MP"];
	for(var i=0;i<params.length;i++){
		if(typeof self.data[params[i]] == UNDEFINED){
			self.data[params[i]] = 0;
		}
	}
};
ItemMasterModel.prototype.id = function(){
	return this.data.id;
};
ItemMasterModel.prototype.name = function(){return this.data.name;
	return Language.getItem("item_name_"+this.data.id);
};
ItemMasterModel.prototype.stamp = function(){
	return this.data.stamp ? true : false;
};
ItemMasterModel.prototype.itemType = function(){
	return this.data.type;
};
ItemMasterModel.prototype.position = function(){
	return this.data.position;
};
ItemMasterModel.prototype.params = function(){
	var self = this, keys = ["force","intelligence","command","agility","luck","attack","defense","breakout","morale","spirit"];
	var result = [];
	for(var i=0,l=keys.length;i<l;i++){
		if(this.data[keys[i]]){
			result.push(keys[i]);
		}
	}
	return result;
};
ItemMasterModel.prototype.getParam = function(key){
	return this.data[key];
};
ItemMasterModel.prototype.attack = function(){
	return this.data.attack?this.data.attack:0;
};
ItemMasterModel.prototype.defense = function(){
	return this.data.defense?this.data.defense:0;
};
ItemMasterModel.prototype.breakout = function(){
	return this.data.breakout?this.data.breakout:0;
};
ItemMasterModel.prototype.morale = function(){
	return this.data.morale?this.data.morale:0;
};
ItemMasterModel.prototype.spirit = function(){
	return this.data.spirit?this.data.spirit:0;
};
ItemMasterModel.prototype.force = function(){
	return this.data.force?this.data.force:0;
};
ItemMasterModel.prototype.intelligence = function(){
	return this.data.intelligence?this.data.intelligence:0;
};
ItemMasterModel.prototype.command = function(){
	return this.data.command?this.data.command:0;
};
ItemMasterModel.prototype.agility = function(){
	return this.data.agility?this.data.agility:0;
};
ItemMasterModel.prototype.luck = function(){
	return this.data.luck?this.data.luck:0;
};
ItemMasterModel.prototype.explanation = function(){
	return Language.getItem("item_explanation_" + this.data.id);
};
ItemMasterModel.prototype.icon=function(size){
	var self = this;
	if(!size){
		size = new LPoint(100,100);
	}
	//var icon = new BitmapSprite(LMvc.IMG_PATH + "item/" + this.id() + ".png", null,size);
	var icon = new BitmapSprite(LMvc.IMG_PATH + "item/1.png", null,size);
	var winPanel = new LPanel(new LBitmapData(LMvc.datalist["win06"]),size.x,size.y);
	icon.addChild(getBitmap(winPanel));
	return icon;
};