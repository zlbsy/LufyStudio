function BattleModel(){
	base(this,MyModel,[]);
}
BattleModel.prototype.construct=function(){
	this.ourCharacterList = [];
	this.enemyCharacterList = [];
	this.heroIndex = 0;
	this.armsIndex = 0;
	this.stepIndex = 0;
};
BattleModel.armsRestraint = {
	"0-1":0.8,"0-2":1.2,"1-0":1.2,"1-2":0.8,"2-0":0.8,"2-1":1.2
};
BattleModel.armsKindRestraint = {
	"0-1":0.9,"1-0":1.1
};
BattleModel.fiveRestraint = {
	"strong":1.1,"weak":0.9
};
BattleModel.prototype.getImages=function(){
	var self = this;
	var i,list = [
		{name:"map-1",path:LMvc.IMG_PATH+"map/1.png"},
		{name:"curtain",path:LMvc.IMG_PATH+"effect/curtain.png"},
		{name:"ourCastle",path:LMvc.IMG_PATH+"battle/castle.png"},
		{name:"enemyCastle",path:LMvc.IMG_PATH+"battle/castle.png"},
		{name:"battle-vs",path:LMvc.IMG_PATH+"battle/vs.png"},
		{name:"face-5",path:LMvc.IMG_PATH+"face/5.png"},
		{name:"secBar",path:LMvc.IMG_PATH+"effect/sec_bar.jpg"},
		{name:"attackArrow",path:LMvc.IMG_PATH+"battle/attack_arrow.png"},
		{name:"redShockwave",path:LMvc.IMG_PATH+"battle/red_shockwave.png"},
		{name:"battleCommand",path:LMvc.IMG_PATH+"battle/battle_command.png"},
		{name:"hpBar",path:LMvc.IMG_PATH+"battle/hp.png"},
		{name:"arrow",path:LMvc.IMG_PATH+"icon/arrow.png"},
		{name:"lock",path:LMvc.IMG_PATH+"icon/lock.png"},
		{name:"underscore",path:LMvc.IMG_PATH+"icon/underscore.png"},
		{name:"win01",path:LMvc.IMG_PATH+"win/win01.png"},
		{name:"win06",path:LMvc.IMG_PATH+"win/win06.png"},
		{name:"battle-textResult",path:LMvc.IMG_PATH+"battle/text_result.png"},
		{name:"expBar",path:LMvc.IMG_PATH+"common/exp_bar.png"},
		{name:"battle-singleCombatBackground",path:LMvc.IMG_PATH+"battle/singleCombatBackground.png"},
		{name:"faceBackground",path:LMvc.IMG_PATH+"icon/faceBackground.png"}
	];
	for(var i=0;i<10;i++){
		list.push({name:"num-1-"+i,path:LMvc.IMG_PATH+"num/1/num_"+i+".png"});
	}
	console.log("BattleModel.prototype.getImages num");
	var characterModel;
	var characterList = self.controller.fromController.selectCharacterList;
	for(var i=0,l=characterList.length;i<l;i++){
		characterModel = characterList[i];
		characterModel.controller = self.controller;
		list.push({name:"face-"+characterModel.master().faceImg(),path:LMvc.IMG_PATH+"face/"+characterModel.master().faceImg()+".png"});
		var imgIndex = characterModel.master().characterSetting().index;
		for(var j=0;j<characterImageSetting.length;j++){
			list.push({name:imgIndex + "_" + characterImageSetting[j], path:LMvc.IMG_PATH + "character/" + imgIndex + "/" + characterImageSetting[j] + ".png"});
		}
	}
	console.log("BattleModel.prototype.getImages characterList");
	var armsList = UserModel.own().armsList;
	for(var i=0,l=armsList.length;i<l;i++){
		characterModel = armsList[i];
		console.log("BattleModel.prototype.getImages characterModel:"+characterModel);
		list.push({name:"face-"+characterModel.master().faceImg(),path:LMvc.IMG_PATH+"face/"+characterModel.master().faceImg()+".png"});
		var imgIndex = characterModel.master().characterSetting().index;
		for(var j=0;j<characterImageSetting.length;j++){
			list.push({name:imgIndex + "_" + characterImageSetting[j], path:LMvc.IMG_PATH + "character/" + imgIndex + "/" + characterImageSetting[j] + ".png"});
		}
	}
	console.log("BattleModel.prototype.getImages armsList");
	for(var i=0;i<self.enemyStepList.length;i++){
		var stepData = self.enemyStepList[i];
		var characters = stepData.characters;
		for(var m=0;m<characters.length;m++){
			characterModel = characters[m];
			var imgIndex = characterModel.master().characterSetting().index;
			for(var j=0;j<characterImageSetting.length;j++){
				list.push({name:imgIndex + "_" + characterImageSetting[j], path:LMvc.IMG_PATH + "character/" + imgIndex + "/" + characterImageSetting[j] + ".png"});
			}
		}
		var readyArmy = stepData.readyArmy;
		for(var m=0;m<readyArmy.length;m++){
			characterModel = readyArmy[m];
			var imgIndex = characterModel.master().characterSetting().index;
			for(var j=0;j<characterImageSetting.length;j++){
				list.push({name:imgIndex + "_" + characterImageSetting[j], path:LMvc.IMG_PATH + "character/" + imgIndex + "/" + characterImageSetting[j] + ".png"});
			}
		}
	}
	return list;
};
BattleModel.prototype.addOurCharacter = function(chara){
	this.addCharacter(this.ourCharacterList,chara);
};
BattleModel.prototype.removeOurCharacter = function(chara){
	this.characterCostPlus(this.controller.fromController.selectCharacterList, chara.characterModel, this.controller.view.characterMenu.winPanel.childList);
	this.removeCharacter(this.ourCharacterList,chara);
};
BattleModel.prototype.addEnemyCharacter = function(chara){
	this.addCharacter(this.enemyCharacterList,chara);
};
BattleModel.prototype.removeEnemyCharacter = function(chara){
	this.characterCostPlus(this.enemyHeroList, chara.characterModel);
	this.removeCharacter(this.enemyCharacterList,chara);
};
BattleModel.prototype.characterCostPlus = function(charaList,chara,charaMenuList){
	if(chara.id() >= ArmsConfig.MAX_ID){
		var searchChara = charaList.find(function(child){
			return chara.id() == child.id();
		});
		searchChara.costPlus();
		if(charaMenuList){
			var charaMenu = charaMenuList.find(function(child){
				return child.characterModel && chara.id() == child.characterModel.id();
			});
			charaMenu.setBattling(false);
		}
	}
};
BattleModel.prototype.addCharacter = function(list,chara){
	list.push(chara);
	this.controller.quadTree.add(chara,chara.x,chara.y);
};
BattleModel.prototype.removeCharacter = function(list,chara){
	var self = this;
	for(var i=0,l=list.length;i<l;i++){
		if(list[i].objectIndex == chara.objectIndex){
			list.splice(i, 1);
			self.controller.quadTree.remove(chara);
			break;
		}
	}
};
BattleModel.prototype.getEnemyArms=function(callback){
	var self = this;
	var stepList = [
		{
			"Castle":{//兵营
				id:1,level:1
			},
			"characters":[//可使用英雄，英雄每死一次cost翻倍
				{character_id:51,level:1,star:1}
			],
			"readyArmy":[//已出现的英雄和兵种
				{character_id:1,level:1,star:1},
				{character_id:2,level:1,star:1}
			]
		},
		{
			"Castle":{
				id:1,level:1
			},
			"characters":[//可使用英雄，英雄每死一次cost翻倍
				{character_id:52,level:1,star:1}
			],
			"readyArmy":[//已出现的英雄和兵种
				{character_id:1,level:1,star:1},
				{character_id:2,level:1,star:1},
				{character_id:5,level:1,star:1},
				{character_id:51,level:1,star:1}
			]
		},
		{
			"Castle":{
				id:1,level:1
			},
			"characters":[//可使用英雄，英雄每死一次cost翻倍
				{character_id:51,level:1,star:1},
				{character_id:52,level:1,star:1}
			],
			"readyArmy":[//已出现的英雄和兵种
				{character_id:1,level:1,star:1},
				{character_id:2,level:1,star:1},
				{character_id:5,level:1,star:1},
				{character_id:52,level:1,star:1}
			]
		}
	];
	for(var i=0;i<stepList.length;i++){
		var stepData = stepList[i];
		console.log("stepData=",stepData);
		var characters = stepData.characters;
		for(var j=0;j<characters.length;j++){
			stepData.characters[j] = new CharacterModel(self.controller,characters[j]);
		}
		var readyArmy = stepData.readyArmy;
		for(var j=0;j<readyArmy.length;j++){
			stepData.readyArmy[j] = new CharacterModel(self.controller,readyArmy[j]);
		}
	}
	self.enemyStepList = stepList;
	callback.apply(self.controller,[]);
};
BattleModel.prototype.heroIndexPlus=function(belong){
	var self = this;
	if(belong == Character.BELONG_OUR){
		self.heroIndex++;
		if(self.heroIndex >= self.characterList.length){
			self.heroIndex = 0;
		}
	}else{
		self.enemyHeroIndex++;
		if(self.enemyHeroIndex >= self.enemyHeroList.length){
			self.enemyHeroIndex = 0;
		}
	}
};
BattleModel.prototype.armIndexPlus=function(belong){
	var self = this;
	if(belong == Character.BELONG_OUR){
		self.armsIndex++;
		if(self.armsIndex >= self.armsList.length){
			self.armsIndex = 0;
		}
	}else{
		self.enemyArmsIndex++;
		if(self.enemyArmsIndex >= self.enemyArmsList.length){
			self.enemyArmsIndex = 0;
		}
	}
};
BattleModel.prototype.getNextHero=function(belong){
	var self = this, charaList;
	if(belong == Character.BELONG_OUR){
		charaList = self.controller.fromController.selectCharacterList;
		return charaList[self.heroIndex];
	}else{
		charaList = self.enemyHeroList;
		return charaList[self.enemyHeroIndex];
	}
	
};
BattleModel.prototype.getNextArm=function(belong){
	var self = this, charaList;
	if(belong == Character.BELONG_OUR){
		charaList = self.controller.userModel.armsList;
		return charaList[self.armsIndex];
	}else{
		charaList = self.enemyArmsList;
		return charaList[self.enemyArmsIndex];
	}
};
BattleModel.prototype.stepInit=function(){
	var self = this;
	self.enemyHeroList = self.enemyStepList[self.stepIndex].characters;
	self.enemyArmsList = getArmsFromCharacters(self.enemyHeroList,self.controller);
	self.enemyHeroIndex = 0;
	self.enemyArmsIndex = 0;
	self.heroIndex = 0;
	self.armsIndex = 0;
};
BattleModel.prototype.stepData=function(){
	return this.enemyStepList[this.stepIndex];
};
BattleModel.prototype.nextStep=function(){
	var self = this;
	self.stepIndex++;
	if(self.stepIndex >= self.enemyStepList.length){
		return false;
	}
	return true;
};
