function CharacterDetailedTabPropertiesView(controller, w, h){
	var self = this;
	base(self,LView,[controller]);
	self.tabWidth = w;
	self.tabHeight = h;
}
CharacterDetailedTabPropertiesView.prototype.updateView=function(){
	var self = this;
	self.showProperties();
};
CharacterDetailedTabPropertiesView.prototype.showProperties=function(){
	var self = this;
	self.removeAllChild();
	var characterModel = self.controller.getValue("selectedCharacter");
	var battleStatus = self.controller.getValue("battleStatus");
	if(!battleStatus){
 		characterModel.calculation(true);
 	}
	var statusLayer = new LSprite();
	var startY = self.showLeft(characterModel, battleStatus, statusLayer);
	var startRightY = self.showRight(characterModel, battleStatus, statusLayer);
	var txtHeight = 25;
	startY += txtHeight;
	startRightY += txtHeight;
	var height = startY > startRightY ? startY : startRightY;
	statusLayer.graphics.drawRect(0, "#000000", [0, 0, self.tabWidth, height]);
	statusLayer.cacheAsBitmap(true);
	var backLayer = new LSprite();
	backLayer.addChild(statusLayer);
	var sc = new LScrollbar(backLayer, self.tabWidth, self.tabHeight, 10);
	self.addChild(sc);
};
CharacterDetailedTabPropertiesView.prototype.showLeft=function(characterModel, battleStatus, statusLayer){
	var self = this;
	var txtHeight = 25, startY = -txtHeight + 10, startX = 5;
	var labels = ["seignior_lv","generals_lv","age","tab_arms",
	"force","command","intelligence","agility","luck"];
	var datas = [
	characterModel.seigniorLevel(),
	characterModel.level(),
	characterModel.age(),
	characterModel.currentSoldiers().name(),
	characterModel.force(),
	characterModel.command(),
	characterModel.intelligence(),
	characterModel.agility(),
	characterModel.luck(),
	characterModel.currentSoldiers().movePower()
	];
	for(var i=0;i<labels.length;i++){
		startY += txtHeight;
		var lblLeft = getStrokeLabel(String.format("{0} : {1}",Language.get(labels[i]), datas[i]),20,"#FFFFFF","#000000",4);
		lblLeft.x = startX;
		lblLeft.y = startY;
		statusLayer.addChild(lblLeft);
	}
	return startY;
};
CharacterDetailedTabPropertiesView.prototype.showRight=function(characterModel, battleStatus, statusLayer){
	var self = this;
	var txtHeight = 25, startRightY = -txtHeight + 10, startX = 180;
	var labelsRight = ["troops","MP",
	battleStatus ? "exp" : "feat", "proficiency",
	"attack","spirit","defense","breakout","morale","movePower"];
	var datasRight = [
	[String.format("{0}({1})",characterModel.troops() == 0 ? characterModel.maxTroops() : characterModel.troops(),characterModel.wounded()),characterModel.maxTroops(),characterModel.maxTroops(),"red_bar", "icon_hert"],
	[characterModel.MP(),characterModel.maxMP(),characterModel.maxMP(),"yellow_bar","yellow_ball"],
	LMvc.BattleController ? [characterModel.exp(),characterModel.maxExp(),characterModel.maxExp(),"orange_bar","orange_ball"] : [characterModel.feat(),characterModel.maxFeat(),characterModel.maxFeat(),"orange_bar","orange_ball"],
	[characterModel.currentSoldiers().proficiency(),characterModel.currentSoldiers().proficiency(),1000,"red_bar",null],
	[characterModel.attack(),characterModel.attack(),1000,"red_bar",null],
	[characterModel.spirit(),characterModel.spirit(),1000,"red_bar",null],
	[characterModel.defense(),characterModel.defense(),1000,"red_bar",null],
	[characterModel.breakout(),characterModel.breakout(),1000,"red_bar",null],
	[characterModel.morale(),characterModel.morale(),1000,"red_bar",null],
	[characterModel.currentSoldiers().movePower(),characterModel.currentSoldiers().movePower(),10,"red_bar",null],
	];
	for(var i=0;i<labelsRight.length;i++){
		startRightY += txtHeight;
		var obj = datasRight[i];
		var bar = new StatusBarView(self.controller);
		bar.set({maxValue:obj[2],currentValue:obj[0],normalValue:obj[1],name:Language.get(labelsRight[i]),
		icon:obj[4],
		frontBar:obj[3],
		barSize:200});
		bar.x = startX;
		bar.y = startRightY;
		statusLayer.addChild(bar);
	}
	return startRightY;
};