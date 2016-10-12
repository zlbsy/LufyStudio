/*
 * 战况
 */
function BattleFieldView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
	self.windowWidth = LMvc.screenWidth - 60;
	self.x = 30;
	self.layerInit();
	self.outlineData();
	self.setData();
};
BattleFieldView.prototype.outlineData = function(){
	var self = this;
	var label = getStrokeLabel(Language.get("attacker")+":"+self.controller.battleData.fromCity.seignior().character().name(),20,"#FFFFFF","#000000",4);
	label.x = 0;
	self.outlineLayer.addChild(label);
	var weather = String.format("{0}:{1}", Language.get("weather"),self.controller.view.weatherLayer.getLavel());
	label = getStrokeLabel(weather,20,"#FFFFFF","#000000",4);
	label.x = 150;
	self.outlineLayer.addChild(label);
	label = getStrokeLabel(Language.get("bout")+":"+self.controller.getValue("bout"),20,"#FFFFFF","#000000",4);
	label.x = 300;
	self.outlineLayer.addChild(label);
};
BattleFieldView.prototype.layerInit = function(){
	var self = this;
	self.outlineLayer = new LSprite();
	self.addChild(self.outlineLayer);
	
	self.dataLayer = new LSprite();
	self.dataLayer.y = 50;
	self.addChild(self.dataLayer);
	
	self.labelLayer = new LSprite();
	self.dataLayer.addChild(self.labelLayer);
	self.selfLayer = new LSprite();
	self.selfLayer.x = 120;
	self.dataLayer.addChild(self.selfLayer);
	self.enemyLayer = new LSprite();
	self.enemyLayer.x = 280;
	self.dataLayer.addChild(self.enemyLayer);
};
BattleFieldView.prototype.showLine = function(menuLabel, selfLabel, enemyLabel, y){
	var self = this, label;
	label = getStrokeLabel(menuLabel,20,"#FFFFFF","#000000",4);
	label.y = y;
	self.labelLayer.addChild(label);
	label = getStrokeLabel(selfLabel,20,"#FF0000","#000000",4);
	label.y = y;
	self.selfLayer.addChild(label);
	label = getStrokeLabel(enemyLabel,20,"#00FF00","#000000",4);
	label.y = y;
	self.enemyLayer.addChild(label);
};
BattleFieldView.prototype.setData = function(){
	var self = this;
	var layer,y = 10, h = 30;
	var title = getStrokeLabel(Language.get(Belong.SELF),25,"#FFFFFF","#000000",4);
	self.selfLayer.addChild(title);
	title = getStrokeLabel(Language.get(Belong.ENEMY),25,"#FFFFFF","#000000",4);
	self.enemyLayer.addChild(title);
	
	var selfCharas = self.controller.view.charaLayer.getCharactersFromBelong(Belong.SELF);
	var selfLeader = selfCharas.find(function(child){
		return child.isLeader;
	});
	var enemyCharas = self.controller.view.charaLayer.getCharactersFromBelong(Belong.ENEMY);
	var enemyLeader = enemyCharas.find(function(child){
		return child.isLeader;
	});
	y+=h;
	self.showLine(Language.get("leader"), selfLeader.data.name(), enemyLeader.data.name(),y);
	y+=h;
	self.showLine(Language.get("number_of_generals"), selfCharas.length, enemyCharas.length,y);
	y+=h;
	var troopsSelf = 0, troopsEnemy = 0;
	selfCharas.forEach(function(c){troopsSelf += c.data.troops();});
	enemyCharas.forEach(function(c){troopsEnemy += c.data.troops();});
	self.showLine(Language.get("troops"), troopsSelf, troopsEnemy,y);
	var moneySelf, moneyEnemy;
	var foodSelf, foodEnemy;
	var troopsSelf, troopsEnemy;
	var battleData = self.controller.battleData;
	if(battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId){
		moneySelf = battleData.money;
		moneyEnemy = battleData.toCity.money();
		foodSelf = battleData.food;
		foodEnemy = battleData.toCity.food();
		troopsSelf = battleData.troops;
		troopsEnemy = battleData.toCity.troops();
	}else{
		moneySelf = battleData.toCity.money();
		moneyEnemy = battleData.money;
		foodSelf = battleData.toCity.food();
		foodEnemy = battleData.food;
		troopsSelf = battleData.toCity.troops();
		troopsEnemy = battleData.troops;
	}
	y+=h;
	self.showLine(Language.get("money"), moneySelf, moneyEnemy,y);
	y+=h;
	self.showLine(Language.get("food"), foodSelf, foodEnemy,y);
	y+=h;
	self.showLine(Language.get("arm_expedition"), troopsSelf, troopsEnemy,y);
	y+=h;
	self.showLine(Language.get("captive"), self.model.selfCaptive.length, self.model.enemyCaptive.length,y);
};
