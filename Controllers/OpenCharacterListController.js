function OpenCharacterListController(){
	var self = this;
	base(self,MyController,[]);
}
OpenCharacterListController.prototype.construct=function(){};
OpenCharacterListController.prototype.loadCharacterList = function(type){
	var self = this;
	LMvc.keepLoading(true);
	LMvc.changeLoading(TranslucentLoading);
	self.characterListType = type;
	self.loadMvc("CharacterList",self.showCharacterList);
};
OpenCharacterListController.prototype.showCharacterList=function(){
	var self = this;
	var characterList = new CharacterListController(self.characterListType,self);
	self.view.addCharacterListView(characterList.view);
	self.dispatchEvent(CharacterListEvent.SHOW);
};
OpenCharacterListController.prototype.closeCharacterList=function(obj){
	console.log("closeCharacterList",obj);
	var e = new LEvent(CharacterListEvent.CLOSE);
	if(!obj){
		obj = {};
	}
	for(var k in obj){
		if(obj.hasOwnProperty(k)){console.log("closeCharacterList k= ",k);
			e[k] = obj[k];
		}
	}
	//e.characterList = obj.characterList;
	//e.usedMoney = obj.usedMoney;
	//e.characterListType = obj.characterListType;
	e.characterListType = this.characterListType;
	this.dispatchEvent(e);
};


