function CharacterModel(controller, data) {
	var self = this;
	base(self, MyModel, [controller]);
	self.data = data;
	if(!self.data.feat){
		self.data.feat = 0;
	}
	if(!self.data.maxPhysicalFitness){
		self.data.physicalFitness = self.data.maxPhysicalFitness = 100;
	}
}
CharacterModel.FEAT_VALUE = 200;
CharacterModel.faceCacher = [];
//虚弱兵力比例
CharacterModel.PANT_PROBABILITY = 0.2;
CharacterModel.list = [];
CharacterModel.commonAngryTalks = ["angry_talk_0_0","angry_talk_0_1","angry_talk_0_2"];
CharacterModel.commonDieTalks = ["die_talk_0_0","die_talk_0_1","die_talk_0_2"];
CharacterModel.commonUnderArrestTalks = ["under_arrest_talk_0_0", "under_arrest_talk_0_1", "under_arrest_talk_0_2"];
CharacterModel.upValue = function(type, value) {
	if (type == "S") {
		if (value < 50) {
			return 1;
		} else if (value < 70) {
			return 2;
		} else if (value < 90) {
			return 3;
		}else{
			return 4;
		}
	} else if (type == "A") {
		if (value < 50) {
			return 1;
		} else if (value < 70) {
			return 2;
		} else {
			return 3;
		}
	} else if (type == "B") {
		if (value < 50) {
			return 1;
		} else {
			return value >= 90 ? 3 : 2;
		}
	} else if (type == "C") {
		return value >= 70 ? 2 : 1;
	}
	return 0;
};
CharacterModel.setChara=function(list){
	var fathers = [];
	for(var i=0,l=list.length;i<l;i++){
		var chara = new CharacterModel(null,list[i]);
		if(chara.childs().length > 0){
			fathers.push(chara);
		}
		CharacterModel.list.push(chara);
	}
	for(var i=0,l=fathers.length;i<l;i++){
		var chara = fathers[i];
		var childs = chara.childs();
		for(var j=0,jl=childs.length;j<jl;j++){
			var child = CharacterModel.getChara(childs[j]);
			child.data.father = chara.id();
		}
	}
};
CharacterModel.getChara=function(chara_id){
	for(var i=0,l=CharacterModel.list.length;i<l;i++){
		var chara = CharacterModel.list[i];
		if(chara.id() != chara_id){
			continue;
		}
		return chara;
	}
	return null;
};
CharacterModel.prototype.datas=function(){
	var self = this;
	var saveData = {
		chara_id:self.id(),
		seignior_id:self.seigniorId(),
		troops:self.troops(),
		wounded:self.wounded(),
		exp:self.exp(),
		mp:self.MP(),
		hp:self.HP(),
		isDefCharacter:self.isDefCharacter(),
		job:self.getJobData(),//根据任务内容变化
		feat:self.feat(),//功绩
		loyalty:self.loyalty(),//忠诚度
		soldiers:self.data.soldiers,//所有兵种熟练度
		isPrized:self.isPrized(),
		reputation:self.data.reputation,
		equipments:self.equipmentsData()
	};
	if(self.data.currentSoldierId){
		//当前兵种
		saveData.currentSoldierId = self.data.currentSoldierId;
	}
	return saveData;
};
CharacterModel.prototype.setDatas=function(charaData){
	var self = this;
	self.cityId(charaData.cityId);
	if(charaData.seignior_id){
		self.seigniorId(charaData.seignior_id);
	}
	if(charaData.troops){
		self.troops(charaData.troops);
	}
	if(charaData.wounded){
		self.wounded(charaData.wounded);
	}
	if(charaData.exp){
		self.exp(charaData.exp);
	}
	if(charaData.mp){
		self.MP(charaData.mp);
	}
	if(charaData.hp){
		self.HP(charaData.hp);
	}
	if(charaData.isDefCharacter){
		self.isDefCharacter(charaData.isDefCharacter);
	}
	if(charaData.loyalty){
		self.loyalty(charaData.loyalty);
	}
	if(charaData.job){
		self.setJobData(charaData.job);
	}
	if(charaData.feat){
		self.feat(charaData.feat);
	}
	if(charaData.soldiers){
		self.data.soldiers = charaData.soldiers;
	}
	if(charaData.reputation){
		self.data.reputation = charaData.reputation;
	}
	if(charaData.currentSoldierId){
		self.data.currentSoldierId = charaData.currentSoldierId;
	}
	if(charaData.isPrized){
		self.data.isPrized = charaData.isPrized;
	}
	if(charaData.equipments){
		self.equip(charaData.equipments);
	}
};
CharacterModel.prototype.getJobData = function() {
	var self = this;
	var obj = {};
	obj.job = self.job();
	switch(obj.job){
		case Job.HIRE:
			obj.targetHireId = self.data.targetHireId;
			break;
		case Job.DIPLOMACY_STOP_BATTLE:
			obj.targetStopBattle = self.data.targetStopBattle;
			break;
		case Job.TRANSPORT:
			obj.transportData = self.data.transportData;
			break;
		case Job.MOVE:
			obj.targetCity = self.data.targetCity;
			break;
		case Job.SPY:
			obj.targetSpyId = self.data.targetSpyId;
			break;
		case Job.DIPLOMACY_REDEEM:
			obj.targetRedeem = self.data.targetRedeem;
			break;
		case Job.TRAINING:
			obj.trainingSoldierId = self.data.trainingSoldierId;
			break;
		case Job.ENLIST:
			obj.targetEnlist = self.data.targetEnlist;
			break;
		case Job.PERSUADE:
			obj.targetPersuadeId = self.data.targetPersuadeId;
			break;
	}
	return obj;
};
CharacterModel.prototype.setJobData = function(obj) {
	var self = this;
	self.job(obj.job);
	switch(obj.job){
		case Job.HIRE:
			self.data.targetHireId = obj.targetHireId;
			break;
		case Job.DIPLOMACY_STOP_BATTLE:
			self.data.targetStopBattle = obj.targetStopBattle;
			break;
		case Job.TRANSPORT:
			self.data.transportData = obj.transportData;
			break;
		case Job.MOVE:
			self.data.targetCity = obj.targetCity;
			break;
		case Job.SPY:
			self.data.targetSpyId = obj.targetSpyId;
			break;
		case Job.DIPLOMACY_REDEEM:
			self.data.targetRedeem = obj.targetRedeem;
			break;
		case Job.TRAINING:
			self.data.trainingSoldierId = obj.trainingSoldierId;
			break;
		case Job.ENLIST:
			self.data.targetEnlist = obj.targetEnlist;
			break;
		case Job.PERSUADE:
			self.data.targetPersuadeId = obj.targetPersuadeId;
			break;
	}
};
CharacterModel.prototype.getEquipmentPlus = function(key) {
	var equipments = this.equipments();
	var value = 0;
	for(var i=0,l=equipments.length;i<l;i++){
		value += equipments[i][key]();
	}
	return value;
};
CharacterModel.prototype.basicPropertiesCalculation = function() {
	var self = this;
	var keys = ["command","force","intelligence","agility","luck"];
	for(var i=0,l=keys.length;i<l;i++){
		var key = keys[i];
		self.data["_"+key] = self.data[key];
		self.data["_"+key] += self.getEquipmentPlus(key);
	}
};
CharacterModel.prototype.basicPropertiesSum = function(){
	var self = this;
	return self.force() + self.intelligence() + self.command() + self.agility() + self.luck();
};
/*
 ./Controllers/BattleController.js:211:		chara.calculation(true);
./Views/Battle/BattleCharacterLayerView.js:140:		CharacterModel.getChara(id).calculation(true);
./Views/CharacterList/CharacterDetailedTabEquipmentView.js:64:	characterModel.calculation();
./Views/CharacterList/CharacterDetailedTabEquipmentView.js:103:	characterModel.calculation();
./Views/CharacterList/CharacterDetailedTabPropertiesView.js:17: 		characterModel.calculation(true); 
./Views/Common/CharacterView.js:6:	self.data.calculation(true);
./Models/Master/CharacterModel.js:237:CharacterModel.prototype.calculation = function(init) {
./Models/Master/CharacterModel.js:717:		self.calculation(false);
./Models/Master/AreaModel.js:51:		data.calculation(true);
./Libraries/BattleAIExecute.js:158:		child.calculation(true);
./Libraries/BattleAIExecute.js:167:		child.calculation(true);
*/
CharacterModel.prototype.calculation = function(init) {
	var self = this;
	var currentSoldiers = self.currentSoldiers();
	var property = currentSoldiers.property();
	/*************
	兵力,MP,策略,使用武将等级,功绩100一级
	五围,使用君主等级,总功绩2000一级
	简单:敌军君主等级低于我军
	普通:敌军君主等级等于我军
	困难:敌军君主等级高于我军
	*************/
	var lv = self.seigniorLevel();
	self.basicPropertiesCalculation();
	self.data.attack = self.force() * 0.5 + CharacterModel.upValue(property.attack, self.force()) * lv;
	self.data.spirit = self.intelligence() * 0.5 + CharacterModel.upValue(property.spirit, self.intelligence()) * lv;
	self.data.defense = self.command() * 0.5 + CharacterModel.upValue(property.defense, self.command()) * lv;
	self.data.breakout = self.agility() * 0.5 + CharacterModel.upValue(property.breakout, self.agility()) * lv;
	self.data.morale = self.luck() * 0.5 + CharacterModel.upValue(property.morale, self.luck()) * lv;
	
	//self.data.maxTroops = self.initTroops() + property.troops * self.lv();
	//self.data.maxStrategy = self.initStrategy() + property.strategy * self.lv();
	self.data.movePower = currentSoldiers.movePower();
	self.data.rangeAttack = null;
	if(init){
		self.maxTroops(init);
		self.maxHP(init);
		self.maxMP(init);
		self.data.hp = self.maxHP();
		self.data.mp = self.maxMP();
	}
	var keys = ["attack","spirit","defense","breakout","morale"];
	for(var i=0,l=keys.length;i<l;i++){
		var key = keys[i];
		self.data["_equipment_"+key] = self.getEquipmentPlus(key);
	}
	var skill = self.skill(SkillType.CREATE);
	self.data.moveAssault = (skill && skill.isSubType(SkillSubType.MOVE_ASSAULT));
	self.data.moveKnow = (skill && skill.isSubType(SkillSubType.MOVE_KNOW));
	if(skill && skill.isSubType(SkillSubType.STATUS_ADD_NUM)){
		self.data[skill.statusName()] += skill.statusValue();
	}else if(skill && skill.isSubType(SkillSubType.STATUS_ADD_PROP)){
		self.data[skill.statusName()] = self.data[skill.statusName()] * (1 + skill.statusValue()) >>> 0;
	}else if (skill && skill.isSubType(SkillSubType.HERT_VS_STATUS)) {
		self.data.hertVsStatus = skill.hertVsStatus();
	}else if (skill && skill.isSubType(SkillSubType.SOLDIERS_ATTACK_RECT)) {
		var condition = skill.condition();
		if(condition && condition.type == "AttackType" && condition.value == currentSoldiers.attackType()){
			self.data.rangeAttack = skill.rangeAttack().concat();
			var ranges = currentSoldiers.rangeAttack();
			for(var i=0,l=ranges.length;i<l;i++){
				var range = ranges[i];
				if(self.data.rangeAttack.findIndex(function(child){return range.x == child.x && range.y == child.y;}) >= 0){
					return;
				}
				self.data.rangeAttack.push(range);
			}
		}
	}
};
CharacterModel.prototype.statusChange = function(name) {
	var self = this;
	if(!self.data.hertVsStatus || self.data.hertVsStatus.name != name){
		return 1;
	}
	return 1 + self.data.hertVsStatus.value * (self.maxTroops() - self.troops()) / self.maxTroops();
};
CharacterModel.prototype.isTribeCharacter = function() {
	return this.id() >= TribeCharacter[0] && this.id() <= TribeCharacter[1];
};
CharacterModel.prototype.rangeAttack = function() {
	var self = this;
	if(self.data.rangeAttack){
		return self.data.rangeAttack;
	}
	return self.currentSoldiers().rangeAttack();
};
CharacterModel.prototype.moveKnow = function() {
	return this.data.moveKnow;
};
CharacterModel.prototype.moveAssault = function() {
	return this.data.moveAssault;
};
CharacterModel.prototype.initStrategy = function() {
	return this.data.initStrategy ? this.data.initStrategy : 20;
};
CharacterModel.prototype.initTroops = function() {
	return this.data.initTroops ? this.data.initTroops : 200;
};
CharacterModel.prototype.isDefCharacter = function(value) {
	return this._dataValue("isDefCharacter", value, 0);
};
CharacterModel.prototype.id = function() {
	return this.data.id;
};
CharacterModel.prototype.life = function() {
	return this.data.life;
};
CharacterModel.prototype.age = function() {
	if(this.data.born == 0 || !LMvc.chapterData){
		return "--";
	}
	return LMvc.chapterData.year - this.data.born;
};
CharacterModel.prototype.personalLoyalty = function() {
	return this.data.personalLoyalty;
};
CharacterModel.prototype.physicalFitness = function(){//体力
	return this.data.physicalFitness;
};
CharacterModel.prototype.maxPhysicalFitness = function(){
	return this.data.maxPhysicalFitness;
};
CharacterModel.prototype.disposition = function(){//0胆小，1冷静，2勇敢，3鲁莽
	return this.data.disposition;
};
CharacterModel.prototype.proficiency = function(){
	return 0.5 + this.currentSoldiers().proficiency() * 0.0005;
};
CharacterModel.prototype.attack = function(){
	var self = this;
	return (self.data.attack * self.proficiency() * self.statusChange("attack") + self.data._equipment_attack) >>> 0;
};
CharacterModel.prototype.spirit = function(){
	var self = this;
	return (self.data.spirit * self.proficiency() + self.data._equipment_spirit) >>> 0;
};
CharacterModel.prototype.defense = function(){
	var self = this;
	return (self.data.defense * self.proficiency() * self.statusChange("defense") + self.data._equipment_defense) >>> 0;
};
CharacterModel.prototype.breakout = function(){
	var self = this;
	return (self.data.breakout * self.proficiency() + self.data._equipment_breakout) >>> 0;
};
CharacterModel.prototype.morale = function(){
	var self = this;
	return (self.data.morale * self.proficiency() + self.data._equipment_morale) >>> 0;
};
CharacterModel.prototype.movePower = function() {
	return this.data.movePower;
};
CharacterModel.prototype.dispositionLabel = function(){
	return Language.get("disposition_"+this.data.disposition);
};
CharacterModel.prototype.name = function() {
	if(this.data.id >= 1000){
		return this.data.name;
	}
	return Language.getCharacter("character_"+this.data.id);
};
CharacterModel.prototype.compatibility = function() {
	return this.data.compatibility;
};
CharacterModel.prototype.seigniorId = function(value){
	return this._dataValue("seignior_id", value, 0);
};
CharacterModel.prototype.seignior = function(chara_id) {
	var self = this;
	if(!self.data.seignior_id){
		return null;
	}
	if(!self.data._seignior || self.data._seignior.chara_id() != self.data.seignior_id){
		self.data._seignior = SeigniorModel.getSeignior(self.data.seignior_id);
	}
	return self.data._seignior;
};
CharacterModel.prototype.seigniorName = function(){
	var self = this;
	if(self.seignior() && self.seignior().character().seigniorId() > 0){
		return self.seignior().character().name();
	}
	return Language.get("nothing");
};
CharacterModel.prototype.seigniorLevel = function(){
	var self = this;
	if(self.seigniorId() == 0){
		if(!LMvc.selectSeignorId){
			return 1;
		}
		return SeigniorModel.getSeignior(LMvc.selectSeignorId).level();
	}
	return self.seignior().level();
};
CharacterModel.prototype.isPrized = function(value) {
	return this._dataValue("isPrized", value, 0);
};
CharacterModel.prototype.exp = function(value){
	return this._dataValue("exp", value, 0);
};
CharacterModel.prototype.childs = function(){
	return this.data.childs ? this.data.childs : [];
};
CharacterModel.prototype.father = function(){
	return this.data.father;
};
CharacterModel.prototype.featPlus = function(value){
	var self = this, feat = self.feat();
	self.feat((feat + value) >>> 0);
};
CharacterModel.prototype.feat = function(value){
	return this._dataValue("feat", value, 0);
};
CharacterModel.prototype.maxFeat = function(){
	return 9999;
};
CharacterModel.prototype.maxExp = function(value){
	return this._dataValue("maxExp", value, 500);
};
CharacterModel.prototype.wounded = function(value){//伤兵
	return this._dataValue("wounded", value, 0);
};
CharacterModel.prototype.troops = function(value, proportionWounded) {
	var self = this;
	if(value && proportionWounded){
		var addWounded = (self.data.troops - value) * proportionWounded >>> 0;
		var wounded = self.wounded();
		self.wounded(wounded + addWounded);
	}
	if(value && self.data._maxTroops && value + self.wounded() > self.maxTroops()){
		self.wounded(self.maxTroops() - value);
	}
	return self._dataValue("troops", value,0);
};
CharacterModel.prototype.HP = function(value) {
	return this._dataValue("hp", value);
};
CharacterModel.prototype.MP = function(value) {
	return this._dataValue("mp", value);
};
CharacterModel.prototype.isPantTroops = function() {
	return this.troops() < this.maxTroops() * CharacterModel.PANT_PROBABILITY;
};
CharacterModel.prototype.maxTroops = function(init) {
	var self = this;
	if(init || !self.data._maxTroops){
		self.data._maxTroops = self.initTroops() + self.currentSoldiers().property().troops * 2 * self.level();
	}
	return self.data._maxTroops;
};
CharacterModel.prototype.maxHP = function(init) {
	return 100;
};
CharacterModel.prototype.maxMP = function(init) {
	var self = this;
	if(init || !self.data._maxStrategy){
		self.data._maxStrategy = self.initStrategy() + self.currentSoldiers().property().strategy * self.level();
	}
	return self.data._maxStrategy;
};
CharacterModel.prototype.lv = function() {
	return this.level();
};
CharacterModel.prototype.level = function() {
	return (this.data.feat / CharacterExpConfig.general >>> 0) + 1;
};
CharacterModel.prototype.strategies = function(isAll) {
	var self = this;
	var strategies = self.currentSoldiers().strategy();
	var datas = [];
	for(var i=0,l=strategies.length;i<l;i++){
		var child = strategies[i];
		if(isAll || child.level() < self.level()){
			datas.push(child);
		}
	}
	return datas;
};
CharacterModel.prototype.identity = function(value) {
	var self = this;
	var seigniorId = self.seigniorId();
	if(seigniorId <= 0){
		return Language.get("out_of_office");
	}
	var identity = "general";
	if(self.id() == seigniorId){
		identity = "monarch";
	}else if(self.id() == self.city().prefecture()){
		identity = "prefecture";
	}else if(self.seigniorId() != self.city().seigniorCharaId()){
		identity = "captive";
	}
	return Language.get(identity);
};
CharacterModel.prototype.loyalty = function(value) {
	var self = this;
	var loyaltyValue = self._dataValue("loyalty", value, 0, 0, 100);
	if(typeof value == UNDEFINED){
		return loyaltyValue;
	}
	if(LMvc.isRead || self.seigniorId() == 0 || self.validLoyalty() >= 90){
		return;
	}
	var v = self.validLoyalty();
	if(v < 90 || v - value < 90){
		updateCanPersuadeCharacters(self);
	}
};
CharacterModel.prototype.validLoyalty = function(){//获取武将最终有效忠诚度
	var loyalty = this.loyalty();
	var personalLoyalty = this.personalLoyalty();
	//义气影响忠诚范围:义气*1.5
	loyalty += personalLoyalty * 1.5;
	return loyalty;
};
CharacterModel.prototype.jobLabel = function() {
	var self = this;
	if(!self.data.job){
		self.data.job = Job.IDLE;
	}
	return Language.get(self.data.job);
};
CharacterModel.prototype.persuade = function(targetId) {
	var self = this;
	if(typeof targetId == UNDEFINED){
		persuadeRun(self,self.data.targetPersuadeId);
		self.data.targetPersuadeId = null;
	}else{
		self.data.targetPersuadeId = targetId;
		self.job(Job.PERSUADE);
	}
};
CharacterModel.prototype.enlist = function(enlistCount) {
	var self = this;
	if(typeof enlistCount == UNDEFINED){
		enlistRun(self,self.data.targetEnlist);
		self.data.targetEnlist = null;
	}else{
		self.data.targetEnlist = {quantity:enlistCount};
		self.job(Job.ENLIST);
	}
};
CharacterModel.prototype.redeem = function(id, money) {
	var self = this;
	if(typeof id == UNDEFINED){
		redeemRun(self,self.data.targetRedeem);
		self.data.targetRedeem = null;
	}else{
		self.data.targetRedeem = {chara_id:id, money:money};
		self.city().money(-money);
		self.job(Job.DIPLOMACY_REDEEM);
	}
};
CharacterModel.prototype.training = function(id) {
	var self = this;
	if(typeof id == UNDEFINED){
		trainingRun(self,self.data.trainingSoldierId);
		self.data.trainingSoldierId = null;
	}else{
		self.data.trainingSoldierId = id;
		self.job(Job.TRAINING);
	}
};
CharacterModel.prototype.stopBattle = function(id, money) {
	var self = this;
	if(typeof id == UNDEFINED){
		stopBattleRun(self,self.data.targetStopBattle);
		self.data.targetStopBattle = null;
	}else{
		self.data.targetStopBattle = {chara_id:id, money:money};
		self.city().money(-money);
		self.job(Job.DIPLOMACY_STOP_BATTLE);
	}
};
CharacterModel.prototype.hire = function(id) {
	var self = this;
	if(typeof id == UNDEFINED){
		hireRun(self,self.data.targetHireId);
		self.data.targetHireId = null;
	}else{
		self.data.targetHireId = id;
		self.job(Job.HIRE);
	}
};
CharacterModel.prototype.job = function(value) {
	return this._dataValue("job", value, Job.IDLE);
};
//运输物资
CharacterModel.prototype.transport = function(data) {
	var self = this;
	if(typeof data == UNDEFINED){
		transportRun(self,self.data.transportData);
		self.data.transportData = null;
		self.job(Job.IDLE);
	}else{
		self.data.transportData = data;
		self.job(Job.TRANSPORT);
	}
};
CharacterModel.prototype.moveTo = function(cityId) {
	var self = this;
	if(typeof cityId == UNDEFINED){
		var areaFrom = self.city();
		areaFrom.removeCharacter(self);
		var area = AreaModel.getArea(self.data.targetCity);
		if(self.seigniorId() > 0){
			area.addGenerals(self);
		}else{
			area.addOutOfOfficeCharacter(self);
		}
		self.data.cityId = self.data.targetCity;
		self.data.targetCity = null;
		self.job(Job.IDLE);
		if(self.id() == area.seigniorCharaId()){
			area.prefecture(self.id());
		}
		if(areaFrom.prefecture() == self.id()){
			appointPrefecture(areaFrom);
		}
	}else{
		self.data.targetCity = cityId;
		self.job(Job.MOVE);
	}
};
CharacterModel.prototype.spy = function(id) {
	var self = this;
	if(typeof id == UNDEFINED){
		spyRun(self,self.data.targetSpyId);
		self.data.targetSpyId = null;
	}else{
		self.data.targetSpyId = id;
		self.job(Job.SPY);
	}
};
CharacterModel.prototype.targetCity = function() {
	return this.data.targetCity;
};
CharacterModel.prototype.toDie = function() {
	var self = this;
	self.city().removeCharacter(self.id());
	self.seigniorId(0);
};
CharacterModel.prototype.toOutOfOffice = function() {
	var self = this;
	self.city().removeGenerals(self.id());
	self.city().addOutOfOfficeCharacter(self);
	self.seigniorId(0);
};
CharacterModel.prototype.cityId = function(value) {
	return this._dataValue("cityId", value);
};
CharacterModel.prototype.city = function() {
	var self = this;
	if(!self._city || self._city.id() != self.data.cityId){
		self._city = AreaModel.getArea(self.data.cityId);
	}
	return self._city;
};
CharacterModel.prototype.content = function(value) {
	return this._dataValue("content", value);
};
CharacterModel.prototype.faceImg = function() {
	return this.data.faceImg;
};
CharacterModel.prototype.hasFaceCacher = function() {
	return CharacterModel.faceCacher[this.data.faceImg];
};
CharacterModel.prototype.face = function() {
	var self = this;
	if(self.isDefCharacter()){
		var icon = self.currentSoldiers().icon();
		var soldierIcon = new LSprite();
		soldierIcon.addChild(icon);
		icon.x = (CharacterFaceSize.width - BattleCharacterSize.width) * 0.5;
		icon.y = (CharacterFaceSize.height - BattleCharacterSize.height) * 0.5;
		return soldierIcon;
	}
	var characterFace;
	if(CharacterModel.faceCacher[self.data.faceImg]){
		characterFace = CharacterModel.faceCacher[self.data.faceImg];
	}else{
		characterFace = new CharacterFace(self.data.faceImg);
		CharacterModel.faceCacher[self.data.faceImg] = characterFace;
	}
	characterFace.x = characterFace.y = 0;
	characterFace.alpha = 1;
	return characterFace;
};
CharacterModel.prototype.getBasicProperties = function(key) {
	var self = this;
	if(!self.data["_"+key]){
		self.calculation(false);
	}
	return self.data["_"+key];
};
CharacterModel.prototype.command = function() {
	return this.getBasicProperties("command");
};
CharacterModel.prototype.force = function() {
	return this.getBasicProperties("force");
};
CharacterModel.prototype.intelligence = function() {
	return this.getBasicProperties("intelligence");
};
CharacterModel.prototype.agility = function() {
	return this.getBasicProperties("agility");
};
CharacterModel.prototype.luck = function() {
	return this.getBasicProperties("luck");
};
CharacterModel.prototype.maxProficiencySoldier = function() {
	var soldiers = this.soldiers();
	var proficiency = 0, soldier;
	for(var i=0,l=soldiers.length;i<l;i++){
		var child = soldiers[i];
		if(i == 0 || proficiency < child.proficiency()){
			proficiency = child.proficiency();
			soldier = child;
		}
	}
	return soldier;
};
CharacterModel.prototype.currentSoldierId = function(value) {
	var self = this;
	if(value){
		self.data.currentSoldierId = value;
		return;
	}
	if(!self.data.currentSoldierId){
		self.data.currentSoldierId = self.maxProficiencySoldier().id();
	}
	return self.data.currentSoldierId;
};
CharacterModel.prototype.currentSoldiers = function(id) {
	var self = this;
	if(id){
		self.currentSoldierId(id);
		return;
	}
	var currentSoldierId = self.currentSoldierId();
	if(!self.data._currentSoldiers || self.data._currentSoldiers.id() != currentSoldierId){
		var soldiers = self.soldiers();
		self.data._currentSoldiers = soldiers.find(function(child){
			return child.id() == currentSoldierId;
		});
	}
	return self.data._currentSoldiers;
};
CharacterModel.prototype.underArrestTalk = function() {
	var self = this, index, list;
	list = (self.data.underArrestTalks && self.data.underArrestTalks.length) ? self.data.underArrestTalks : CharacterModel.commonUnderArrestTalks;
	index = Math.random()*list.length >>> 0;
	return Language.getUnderArrestTalk(list[index]);
};
CharacterModel.prototype.dieTalk = function() {
	var self = this, index, list;
	list = (self.data.dieTalks && self.data.dieTalks.length) ? self.data.dieTalks : CharacterModel.commonDieTalks;
	index = Math.random()*list.length >>> 0;
	return Language.getDieTalk(list[index]);
};
CharacterModel.prototype.angryTalk = function() {
	var self = this, index, list;
	list = (self.data.angryTalks && self.data.angryTalks.length) ? self.data.angryTalks : CharacterModel.commonAngryTalks;
	index = Math.random()*list.length >>> 0;
	return Language.getAngryTalk(list[index]);
};
CharacterModel.prototype.soldiers = function() {
	var self = this;
	if(!self._soldiers){
		self._soldiers = [];
		for(var i=0;i<self.data.soldiers.length;i++){
			var soldier = new SoldierModel(null, self.data.soldiers[i]);
			self._soldiers.push(soldier);
		}
	}
	return self._soldiers;
};
CharacterModel.prototype.equipmentsData = function() {
	var self = this;
	var equipments = self.equipments();
	var list = [];
	for(var i=0,l=equipments.length;i<l;i++){
		var equipment = equipments[i];
		list.push({item_id:equipment.id(), count:1});
	}
	return list;
};
CharacterModel.prototype.getEquipment = function(position) {
	var equipments = this.equipments();
	for(var i=0;i<equipments.length;i++){
		var item = equipments[i];
		if(item.position() == position){
			return item;
		}
	}
	return null;
};
CharacterModel.prototype.equipments = function() {
	if(!this.data.equipments){
		this.data.equipments = [];
	}
	
	return this.data.equipments;
};
CharacterModel.prototype.equip = function(itemModel) {
	var self = this;
	var equipments = self.equipments();
	
	if(Array.isArray(itemModel)){
		for(var i=equipments.length-1;i>=0;i--){
			var item = equipments[i];
			equipments.splice(i,1);
			self.city().addItem(item);
		}
		var datas = itemModel;
		for(var i=0;i<datas.length;i++){
			itemModel = new ItemModel(null, datas[i]);
			equipments.push(itemModel);
		}
	}else if(itemModel.constructor.name == "ItemModel"){
		for(var i=0;i<equipments.length;i++){
			var item = equipments[i];
			if(item.position() == itemModel.position()){
				self.equipOff(item.id());
				break;
			}
		}
		var item = new ItemModel(null, {item_id:itemModel.id(), count:1});
		var loyalty = self.loyalty();
		self.loyalty(loyalty + itemExchangeLoyalty(item));
		equipments.push(item);
	}
};
CharacterModel.prototype.equipOff = function(itemId) {
	var self = this;
	var equipments = self.equipments();
	for(var i=0;i<equipments.length;i++){
		var item = equipments[i];
		if(item.id() == itemId){
			var loyalty = self.loyalty();
			self.loyalty(loyalty - itemExchangeLoyalty(item));
			equipments.splice(i,1);
			self.city().addItem(item);
			break;
		}
	}
};
CharacterModel.prototype.groupSkill = function() {
	var self = this;
	if(!self.data.groupSkill){
		return null;
	}
	var groupSkill = GroupSkillModel.getMaster(self.data.groupSkill);
	console.log("groupSkill.probability()/100 = " + (groupSkill.probability()*0.01));
	if(Math.random() > groupSkill.probability()/100){
		return null;
	}
	return groupSkill;
};
CharacterModel.prototype.skillCoefficient = function() {
	return (this.data.skill ? 1 : 0) + (this.data.groupSkill ? 1 : 0);
};
CharacterModel.prototype.skill = function(type) {
	var self = this;
	if(!self.data.skill){
		return null;
	}
	var skill = SkillMasterModel.getMaster(self.data.skill);
	if(type && skill.mainType() != type){
		return null;
	}
	if(type && Math.random() > skill.probability()*0.01){
		return null;
	}
	return skill;
};
CharacterModel.prototype.hasSkill = function(subType) {
	var self = this;
	if(!self.data.skill){
		return false;
	}
	var skill = SkillMasterModel.getMaster(self.data.skill);
	if(subType && skill.isSubType(subType)){
		return true;
	}
	return false;
};