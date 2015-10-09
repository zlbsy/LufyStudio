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
	console.log("this.data.name = ",this.data.name);
	return Language.get(this.data.name);
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
ItemMasterModel.prototype.attack = function(){
	return this.data.attack;
};
ItemMasterModel.prototype.add = function(){
	return this.data.add;
};

ItemMasterModel.prototype.price = function(){
	return this.data.price;
};
ItemMasterModel.prototype.explanation = function(){
	return Language.get(this.data.explanation);
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