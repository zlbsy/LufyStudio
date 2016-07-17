function OpenCharacterListController(){
	var self = this;
	base(self,MyController,[]);
}
OpenCharacterListController.prototype.construct=function(){};
OpenCharacterListController.prototype.loadCharacterList = function(type, characterList, params){
	var self = this;
	LMvc.keepLoading(true);
	LMvc.changeLoading(TranslucentLoading);
	if(!params){
		params = {};
	}
	self.params = params;
	self.characterListType = type;
	self.characterList = characterList;
	self.loadMvc("CharacterList",self.showCharacterList);
};
OpenCharacterListController.prototype.showCharacterList=function(){
	var self = this;
	var characterList = CharacterListController.instance(self.characterListType,self,self.characterList, self.params);
	//var characterList = new CharacterListController(self.characterListType,self,self.characterList, self.params);
	self.view.addCharacterListView(characterList.view);
	self.dispatchEvent(CharacterListEvent.SHOW);
};
OpenCharacterListController.prototype.closeCharacterList=function(obj){
	var e = new LEvent(CharacterListEvent.CLOSE);
	if(!obj){
		obj = {};
	}
	for(var k in obj){
		if(obj.hasOwnProperty(k)){
			e[k] = obj[k];
		}
	}
	//e.characterList = obj.characterList;
	//e.usedMoney = obj.usedMoney;
	//e.characterListType = obj.characterListType;
	e.characterListType = this.characterListType;
	this.dispatchEvent(e);
};

OpenCharacterListController.prototype.loadArmList = function(type){
	var self = this;
	LMvc.keepLoading(true);
	LMvc.changeLoading(TranslucentLoading);
	self.armListType = type;
	self.loadMvc("ArmList",self.showArmList);
};
OpenCharacterListController.prototype.showArmList=function(){
	var self = this;
	var armList = new ArmListController(self.armListType,self);
	var armListLayer = self.getValue("armListLayer");
	armListLayer.addChild(armList.view);
	self.dispatchEvent(ArmListEvent.SHOW);
};
OpenCharacterListController.prototype.closeArmList=function(obj){
	var self = this;
	var armListLayer = self.getValue("armListLayer");
	armListLayer.removeChildAt(armListLayer.numChildren - 1);
	var e = new LEvent(ArmListEvent.CLOSE);
	if(!obj){
		obj = {};
	}
	for(var k in obj){
		if(obj.hasOwnProperty(k)){
			e[k] = obj[k];
		}
	}
	e.armListType = self.armListType;
	self.dispatchEvent(e);
};
