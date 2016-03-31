function CharacterDetailedTabPropertiesView(controller, w, h){
	var self = this;
	base(self,LView,[controller]);
	self.tabWidth = w;
	self.tabHeight = h;
	self.setProperties();
}
CharacterDetailedTabPropertiesView.prototype.updateView=function(){
	var self = this;
	self.showProperties();
};
CharacterDetailedTabPropertiesView.prototype.showProperties=function(){
	var self = this;
	var characterModel = self.controller.getValue("selectedCharacter");
	var battleStatus = self.controller.getValue("battleStatus");
	if(!battleStatus){
 		characterModel.calculation(true); 
 	}
	self.leftLayer.parent.cacheAsBitmap(false);
	self.showLeft(characterModel);
	self.showRight(characterModel);
	self.leftLayer.parent.cacheAsBitmap(true);
};
CharacterDetailedTabPropertiesView.prototype.showLeft=function(characterModel){
	var self = this;
	var datas = [
	characterModel.seigniorLevel(),
	characterModel.level(),
	characterModel.currentSoldiers().name(),
	characterModel.force(),
	characterModel.command(),
	characterModel.intelligence(),
	characterModel.agility(),
	characterModel.luck(),
	characterModel.currentSoldiers().movePower()
	];
	for(var i = 0;i<self.leftLayer.numChildren;i++){
		var label = self.leftLayer.childList[i];
		label.text = String.format("{0} : {1}",Language.get(self.leftLabels[i]), datas[i]);
	}
};
CharacterDetailedTabPropertiesView.prototype.showRight=function(characterModel){
	var self = this;
	var datasRight = [
	[String.format("{0}({1})",characterModel.troops() == 0 ? characterModel.maxTroops() : characterModel.troops(),characterModel.wounded()),characterModel.maxTroops(),characterModel.maxTroops()],
	[characterModel.MP(),characterModel.maxMP(),characterModel.maxMP()],
	LMvc.BattleController ? [characterModel.exp(),characterModel.maxExp(),characterModel.maxExp()] : [characterModel.feat(),characterModel.maxFeat(),characterModel.maxFeat()],
	[characterModel.currentSoldiers().proficiency(),characterModel.currentSoldiers().proficiency(),1000],
	[characterModel.attack(),characterModel.attack(),1000],
	[characterModel.spirit(),characterModel.spirit(),1000],
	[characterModel.defense(),characterModel.defense(),1000],
	[characterModel.breakout(),characterModel.breakout(),1000],
	[characterModel.morale(),characterModel.morale(),1000],
	[characterModel.currentSoldiers().movePower(),characterModel.currentSoldiers().movePower(),10]
	];
	for(var i=0;i<self.rightLayer.numChildren;i++){
		var bar = self.rightLayer.childList[i];
		var obj = datasRight[i];
		bar.setData({maxValue:obj[2],currentValue:obj[0],normalValue:obj[1]});
		bar.setStatus();
	}
};
CharacterDetailedTabPropertiesView.prototype.setProperties=function(){
	var self = this;
	var statusLayer = new LSprite();
	self.leftLabels = ["seignior_lv","generals_lv","tab_arms",
	"force","command","intelligence","agility","luck"];
	self.leftLayer = new LSprite();
	statusLayer.addChild(self.leftLayer);
	var startY = self.setLeft();
	self.rightLabels = ["troops","MP",
	LMvc.BattleController ? "exp" : "feat", "proficiency",
	"attack","spirit","defense","breakout","morale","movePower"];
	self.rightLayer = new LSprite();
	statusLayer.addChild(self.rightLayer);
	var startRightY = self.setRight();
	var txtHeight = 25;
	startY += txtHeight;
	startRightY += txtHeight;
	var height = startY > startRightY ? startY : startRightY;
	statusLayer.graphics.drawRect(0, "#000000", [0, 0, self.tabWidth, height]);
	
	var backLayer = new LSprite();
	backLayer.addChild(statusLayer);
	var sc = new LScrollbar(backLayer, self.tabWidth, self.tabHeight, 10);
	self.addChild(sc);
};
CharacterDetailedTabPropertiesView.prototype.setLeft=function(){
	var self = this;
	var txtHeight = 25, startY = -txtHeight + 10, startX = 5;
	var labels = self.leftLabels;
	self.leftLayer.x = startX;
	for(var i=0;i<labels.length;i++){
		startY += txtHeight;
		var lblLeft = getStrokeLabel("",20,"#FFFFFF","#000000",4);
		lblLeft.y = startY;
		self.leftLayer.addChild(lblLeft);
	}
	return startY;
};
CharacterDetailedTabPropertiesView.prototype.setRight=function(){
	var self = this;
	var txtHeight = 25, startRightY = -txtHeight + 10, startX = 180;
	var labels = self.rightLabels;
	var datasRight = [
	["2(1)",100,1000,"red_bar", "icon_hert"],
	[0,100,1000,"yellow_bar","yellow_ball"],
	[0,100,1000,"orange_bar","orange_ball"],
	[0,100,1000,"red_bar",null],
	[0,100,1000,"red_bar",null],
	[0,100,1000,"red_bar",null],
	[0,100,1000,"red_bar",null],
	[0,100,1000,"red_bar",null],
	[0,100,1000,"red_bar",null],
	[0,0,10,"red_bar",null],
	];
	self.rightLayer.x = startX;
	for(var i=0;i<labels.length;i++){
		startRightY += txtHeight;
		var obj = datasRight[i];
		var bar = new StatusBarView(self.controller);
		bar.set({maxValue:obj[2], currentValue:obj[0], normalValue:obj[1], name:Language.get(labels[i]), icon:obj[4], frontBar:obj[3], barSize:200});
		bar.y = startRightY;
		self.rightLayer.addChild(bar);
	}
	return startRightY;
};