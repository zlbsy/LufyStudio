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
ItemModel.prototype.datas = function(){
	var self = this;
	return {item_id:self.id(), 
	count:self.count(), 
	stone:self.stone(),
	stonePlus:self.stonePlus()};
};
ItemModel.prototype.id = function(){
	return this.data.item_id;
};
ItemModel.prototype.equal = function(item){
	var self = this;
	if(self.id() != item.id()){
		return false;
	}
	if(!self.stone() && !item.stone()){
		return true;
	}
	return JSON.stringify(self.datas()) == JSON.stringify(item.datas());
};
ItemModel.prototype.stonePlus = function(value){
	var self = this;
	if(value){
		self.data.stonePlus = value;
		self._stonePlusItem = null;
		return;
	}
	if(!self.stone()){
		return {};
	}
	return self.data.stonePlus;
};
ItemModel.prototype.stonePlusItem = function(value){
	var self = this;
	if(!self._stonePlusItem){
		var itemObj = {};
		if(self.stone()){
			itemObj = self.stonePlus();
		}
		self._stonePlusItem = new ItemMasterModel(null,itemObj);
	}
	return self._stonePlusItem;
};
ItemModel.prototype.stoneValue = function(){
	return this.master().stoneValue();
};
ItemModel.prototype.count = function(value){
	return this._dataValue("count", value, 0);
};
ItemModel.prototype.life = function(){
	return this.master().life();
};
ItemModel.prototype.rarity = function(){
	return this.master().rarity();
};
ItemModel.prototype.loyalty = function(){
	return this.master().loyalty();
};
ItemModel.prototype.feat = function(){
	return this.master().feat();
};
ItemModel.prototype.proficiency = function(){
	return this.master().proficiency();
};
ItemModel.prototype.upperLimit = function(){
	return this.master().upperLimit();
};
ItemModel.prototype.name = function(){
	return this.master().name();
};
ItemModel.prototype.itemType = function(){
	return this.master().itemType();
};
ItemModel.prototype.params = function(){
	var self = this, keys,masterData,stoneData;
	masterData = self.master().data;
	stoneData= self.stonePlus();
	keys = ["force","intelligence","command","agility","luck","attack","defense","breakout","morale","spirit","movePower",
	"life","feat","proficiency","upper_limit","loyalty"];
	var result = [];
	for(var i=0,l=keys.length;i<l;i++){
		if(masterData[keys[i]] || stoneData[keys[i]]){
			result.push(keys[i]);
		}
	}
	return result;
	return this.master().params();
};
ItemModel.prototype.price = function(){
	return this.master().price();
};
ItemModel.prototype.getParam = function(key){
	return this.master().getParam(key) + this.stonePlusItem().getParam(key);
};
ItemModel.prototype.attack = function(){
	return this.master().attack() + this.stonePlusItem().attack();
};
ItemModel.prototype.spirit = function(){
	return this.master().spirit() + this.stonePlusItem().spirit();
};
ItemModel.prototype.defense = function(){
	return this.master().defense() + this.stonePlusItem().defense();
};
ItemModel.prototype.breakout = function(){
	return this.master().breakout() + this.stonePlusItem().breakout();
};
ItemModel.prototype.morale = function(){
	return this.master().morale() + this.stonePlusItem().morale();
};
ItemModel.prototype.troops = function(){
	return this.master().troops() + this.stonePlusItem().troops();
};
ItemModel.prototype.force = function(){
	return this.master().force() + this.stonePlusItem().force();
};
ItemModel.prototype.intelligence = function(){
	return this.master().intelligence() + this.stonePlusItem().intelligence();
};
ItemModel.prototype.command = function(){
	return this.master().command() + this.stonePlusItem().command();
};
ItemModel.prototype.agility = function(){
	return this.master().agility() + this.stonePlusItem().agility();
};
ItemModel.prototype.luck = function(){
	return this.master().luck() + this.stonePlusItem().luck();
};
ItemModel.prototype.movePower = function(){
	return this.master().movePower() + this.stonePlusItem().movePower();
};
ItemModel.prototype.position = function(){
	return this.master().position();
};
ItemModel.prototype.stone = function(value){
	return this._dataValue("stone", value, 0);
};
ItemModel.prototype.explanation = function(){
	return this.master().explanation();
};
ItemModel.prototype.stoneType = function(){
	return this.master().stoneType();
};
ItemModel.prototype.icon=function(size,callback){
	var self = this;
	var iconLayer = this.master().icon(size,callback);
	if (self.stone()) {
		var stone = self.stoneIcon();
		stone.x = 5;
		stone.y = iconLayer.getHeight() - 19;
		iconLayer.addChild(stone);
	}
	return iconLayer;
};
ItemModel.prototype.stoneIcon = function(){
	var self = this;
	var key = self.stoneType() + "_ball";
	key = "red_ball";
	var icon = new LBitmap(new LBitmapData(LMvc.datalist[key]));
	icon.scaleX = icon.scaleY = 14/icon.getHeight();
	return icon;
};
ItemModel.prototype.skill=function(type){
	var self = this;
	if (!self.stone() || !self.stonePlus().skill) {
		return null;
	}
	var skill = SkillMasterModel.getMaster(self.stonePlus().skill);
	var skillType = skill.mainType();
	if(type && (
		(typeof skillType == "string" && skillType != type) || 
		(Array.isArray(skillType) && skillType.indexOf(type) < 0))){
		return self.soldiersSkill(type);
	}
	if(type && skill.probability() < 100){
		var rand = Math.fakeRandom();
		if(rand > skill.probability()*0.01){
			return self.soldiersSkill(type);
		}
	}
	return skill;
};