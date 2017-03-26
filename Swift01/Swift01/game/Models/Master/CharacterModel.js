function CharacterModel(controller, data) {
	var self = this;
	base(self, MyModel, [controller]);
	if(!data.initSoldiers){
		data.initSoldiers = data.soldiers;
	}
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
CharacterModel.newcountUpValue = function(value, standard, newcount) {
	if(value < standard){
		return 0;
	}
	var newcountValue = 0.02;
	return newcount ? (value - standard)*newcountValue : 0;
};
CharacterModel.upValue = function(type, value, newcount) {
	if (type == "S") {
		if (value < 50) {
			return 2;
		} else if (value < 70) {
			return 3;
		} else if (value < 90) {
			return 3;
		}else{
			return 4 + CharacterModel.newcountUpValue(value, 90, newcount);
		}
	} else if (type == "A") {
		if (value < 50) {
			return 2;
		} else if (value < 70) {
			return 2;
		} else {
			return 3 + CharacterModel.newcountUpValue(value, 70, newcount);
		}
	} else if (type == "B") {
		if (value < 50) {
			return 1;
		} else {
			return value >= 90 ? 3 + CharacterModel.newcountUpValue(value, 90, newcount) : 2 + CharacterModel.newcountUpValue(value, 50, newcount);
		}
	} else if (type == "C") {
		return value >= 70 ? 2 + CharacterModel.newcountUpValue(value, 70, newcount) : 1 + CharacterModel.newcountUpValue(value, 30, newcount);
	}
	return 0;
};
CharacterModel.createEmployCharacter = function(id, soldierId, cityId){
	var chara = CharacterModel.getChara(id);
	chara.cityId(cityId);
	eval( "var wordRandom1=" +  '"\\u' + (Math.round(Math.random() * 20901) + 19968).toString(16)+'"');
	eval( "var wordRandom2=" +  '"\\u' + (Math.round(Math.random() * 20901) + 19968).toString(16)+'"');
	chara.data.name = wordRandom1 + wordRandom2;
	chara.data.soldiers = [{id:soldierId,proficiency:700}];
	chara.data.currentSoldierId = soldierId;
	var values = [-60,-40,-20,0,40,80,120];
	chara.data.employLevel = (Math.fakeRandom()*values.length>>>0);
	var soldierMaster = SoldierMasterModel.getMaster(soldierId);
	var property = soldierMaster.property();
	var status = {"S":90,"A":70,"B":50,"C":30};
	chara.data.force = status[property.attack];
	chara.data.intelligence = status[property.spirit];
	chara.data.command = status[property.defense];
	chara.data.agility = status[property.breakout];
	chara.data.luck = status[property.morale];
	chara._soldiers = null;
	var sumPoint = values[chara.data.employLevel];
	status = ["force", "intelligence", "command", "agility", "luck"];
	while(sumPoint != 0){
		if(status.length == 0){
			break;
		}
		var index = Math.fakeRandom()*status.length >>> 0;
		var key = status[index];
		if(sumPoint > 0){
			if(chara.data[key] >= 90){
				status.splice(index, 1);
				continue;
			}
			sumPoint -= 10;
			chara.data[key] += 10;
		}else{
			if(chara.data[key] <= 30){
				status.splice(index, 1);
				continue;
			}
			sumPoint += 10;
			chara.data[key] -= 10;
		}
	}
	return chara;
};
CharacterModel.getSoldierType = function(type, value){
	var types = [];
	types[1] = "C";
	types[2] = "B";
	types[3] = "A";
	types[4] = "S";
	var endType = types[CharacterModel.upValue(type, value)];
	if(type == endType){
		return type;
	}
	return String.format("{0}({1})",type,endType);
};
CharacterModel.setChara=function(list){
	var fathers = [];
	for(var i=0,l=list.length;i<l;i++){
		var chara = new CharacterModel(null,list[i]);
		chara.job(Job.IDLE);
		chara.feat(0);
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
		feat:self.feat(),//功绩
		troops:self.troops(),
		wounded:self.wounded(),
		exp:self.exp(),
		mp:self.MP(),
		hp:self.HP(),
		hardships:self.hardships(),
		isDefCharacter:self.isDefCharacter(),
		job:self.getJobData(),//根据任务内容变化
		loyalty:self.loyalty(),//忠诚度
		soldiers:self.soldiersData(),//所有兵种熟练度
		saveSoldiers:self.data.saveSoldiers,
		isPrized:self.isPrized(),
		stopIn:self.stopIn(),
		reputation:self.data.reputation,
		equipments:self.equipmentsData()
	};
	var keys = ["command","force","intelligence","agility","luck"];
	for(var i=0,l=keys.length;i<l;i++){
		var key = keys[i];
		saveData[key+"_exp"] = self.data[key+"_exp"];
	}
	if(self.data.currentSoldierId){
		//当前兵种
		saveData.currentSoldierId = self.data.currentSoldierId;
	}
	return saveData;
};
CharacterModel.prototype.employDatas=function(){
	var self = this;
	var childData = {};
	var status = ["force", "intelligence", "command", "agility", "luck", "employLevel", "soldiers", "name", "cityId"];
	for(var i=0;i<status.length;i++){
		childData[status[i]] = self.data[status[i]];
	}
	childData.troops=self.troops();
	childData.wounded=self.wounded();
	childData.exp=self.exp();
	childData.mp=self.MP();
	childData.hp=self.HP();
	return childData;
};
CharacterModel.prototype.setEmployDatas=function(charaData){
	var self = this;
	var status = ["force", "intelligence", "command", "agility", "luck", "employLevel", "soldiers", "name", "cityId"];
	for(var i=0;i<status.length;i++){
		self.data[status[i]] = charaData[status[i]];
	}
	self.troops(charaData.troops);
	self.wounded(charaData.wounded);
	self.exp(charaData.exp);
	self.MP(charaData.mp);
	self.HP(charaData.hp);
};
CharacterModel.prototype.setDatas=function(charaData){
	var self = this;
	self.cityId(charaData.cityId);
	self.seigniorId(charaData.seignior_id);
	if(charaData.soldiers){
		self.data.soldiers = charaData.soldiers;
	}else{
		self.data.soldiers = self.data.initSoldiers;
	}
	if(typeof SoldiersView != UNDEFINED){
		SoldiersView.updateAll = true;
	}
	self._soldiers = null;
	self.feat(charaData.feat);
	self.exp(charaData.exp);
	self.MP(charaData.mp ? charaData.mp : 0);
	self.HP(charaData.hp ? charaData.hp : 100);
	self.troops(charaData.troops);
	self.wounded(charaData.wounded);
	self.hardships(charaData.hardships);
	self.isDefCharacter(charaData.isDefCharacter);
	self.loyalty(charaData.loyalty);
	self.data.isPrized = charaData.isPrized;
	self.data.stopIn = charaData.stopIn;
	self.data.saveSoldiers = charaData.saveSoldiers;
	var keys = ["command","force","intelligence","agility","luck"];
	for(var i=0,l=keys.length;i<l;i++){
		var key = keys[i];
		self.data[key+"_exp"] = charaData[key+"_exp"];
		self.data["_"+key] = null;
	}
	if(charaData.job){
		self.setJobData(charaData.job);
	}
	if(charaData.reputation){
		var n = [];
		for(var i = 0; i < charaData.reputation.length; i++){
			if (n.indexOf(charaData.reputation[i]) < 0){
				n.push(charaData.reputation[i]);
			}
		}
		self.data.reputation = n;
	}
	if(charaData.currentSoldierId){
		self.data.currentSoldierId = charaData.currentSoldierId;
	}
	if(!self.data.saveSoldiers  && self.data.soldiers.length == 1){
		self.initSoldiers();
		self.data.currentSoldierId = 0;
	}
	self.data.equipments = [];
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
CharacterModel.prototype.getReputationPlus = function(key) {
	var reputation = this.reputation();
	var value = 0;
	for(var i=0,l=reputation.length;i<l;i++){
		value += reputation[i][key]();
	}
	return value;
};
CharacterModel.prototype.plusPropertiesExp = function(key) {
	var self = this;
	var expKey = key +"_exp";
	var exp = (typeof self.data[expKey] == UNDEFINED ? 0 : self.data[expKey]);
	var plusExp = 1;
	if(exp < 200){
		plusExp = 20 - (Math.fakeRandom() * 4) >>> 0;
	}else if(exp < 500){
		plusExp = 15 - (Math.fakeRandom() * 4) >>> 0;
	}else if(exp < 800){
		plusExp = 10 - (Math.fakeRandom() * 4) >>> 0;
	}else{
		plusExp = 8 - (Math.fakeRandom() * 4) >>> 0;
	}
	self.propertiesExp(key, plusExp);
};
CharacterModel.prototype.propertiesExp = function(key, plusValue) {
	var self = this;
	var expKey = key +"_exp";
	var exp = (typeof self.data[expKey] == UNDEFINED ? 0 : self.data[expKey]);
	if(typeof plusValue == UNDEFINED){
		return exp;
	}
	exp += plusValue;
	self.data[expKey] = exp;
	var plus = (exp / 100 >>> 0);
	if(self.data[key] + plus >= 100){
		self.data[expKey] = (100 - self.data[key]) * 100;
	}
};
CharacterModel.prototype.getFullPropertiesValue = function(key) {
	var self = this;
	var value = self.data[key];
	if(self.id() == NewYearPresent_Boss){
		return value;
	}
	var expKey = key +"_exp";
	var exp = (typeof self.data[expKey] == UNDEFINED ? 0 : self.data[expKey]);
	var expValue = exp / 100 >>> 0;
	return (value + expValue > 100 ? 100 : value + expValue);
};
CharacterModel.prototype.basicPropertiesCalculation = function() {
	var self = this;
	var keys = ["command","force","intelligence","agility","luck"];
	for(var i=0,l=keys.length;i<l;i++){
		var key = keys[i];
		self.data["_"+key] = self.getFullPropertiesValue(key);
		self.data["_"+key] += self.getEquipmentPlus(key);
		self.data["_"+key] += self.getReputationPlus(key);
	}
};
CharacterModel.prototype.maxPropertie = function(){
	var self = this;
	return Math.max(self.force(), self.intelligence(), self.command(), self.agility(), self.luck());
};
CharacterModel.prototype.basicPropertiesSum = function(){
	var self = this;
	return self.force() + self.intelligence() + self.command() + self.agility() + self.luck();
};
CharacterModel.prototype.propertiesSum = function(){
	var self = this;
	return self.attack() + self.spirit() + self.defense() + self.breakout() + self.morale();
};
CharacterModel.prototype.calculation = function(init) {
	var self = this;
	var currentSoldiers = self.currentSoldiers();
	var property = currentSoldiers.property();
	/*************
	兵力,MP,策略,使用武将等级,功绩100一级
	五围,使用君主等级
	简单:敌军君主等级低于我军
	普通:敌军君主等级等于我军
	困难:敌军君主等级高于我军
	*************/
	var lv = self.seigniorLevel();
	self.basicPropertiesCalculation();
	self.data.attack = self.force() * 0.5 + CharacterModel.upValue(property.attack, self.force(), currentSoldiers.newcount()) * lv;
	self.data.spirit = self.intelligence() * 0.5 + CharacterModel.upValue(property.spirit, self.intelligence(), currentSoldiers.newcount()) * lv;
	self.data.defense = self.command() * 0.5 + CharacterModel.upValue(property.defense, self.command(), currentSoldiers.newcount()) * lv;
	self.data.breakout = self.agility() * 0.5 + CharacterModel.upValue(property.breakout, self.agility(), currentSoldiers.newcount()) * lv;
	self.data.morale = self.luck() * 0.5 + CharacterModel.upValue(property.morale, self.luck(), currentSoldiers.newcount()) * lv;
	
	//self.data.maxTroops = self.initTroops() + property.troops * self.lv();
	//self.data.maxStrategy = self.initStrategy() + property.strategy * self.lv();
	self.data.movePower = currentSoldiers.movePower();
	self.data.rangeAttack = null;
	if(init){
		self.maxTroops(init);
		self.maxHP(init);
		self.maxMP(init);
		//self.data.hp = self.maxHP();
		//self.data.mp = self.maxMP();
	}
	var keys = ["attack","spirit","defense","breakout","morale","movePower"];
	for(var i=0,l=keys.length;i<l;i++){
		var key = keys[i];
		self.data["_equipment_"+key] = self.getEquipmentPlus(key);
		self.data["_skill_add_status_prop_"+key] = 1;
		self.data["_skill_add_status_num_"+key] = 0;
	}
	self.data["_skill_add_status_prop_maxTroops"] = 1;
	self.data["_skill_add_status_num_maxTroops"] = 0;
	
	var skill = self.skill(SkillType.CREATE);
	self.data.moveAssault = (skill && skill.isSubType(SkillSubType.MOVE_ASSAULT));
	self.data.moveKnow = (skill && skill.isSubType(SkillSubType.MOVE_KNOW));
	if(skill && skill.isSubType(SkillSubType.STATUS_ADD_NUM)){
		//self.data[skill.statusName()] += skill.statusValue();
		self.data["_skill_add_status_num_" + skill.statusName()] = skill.statusValue();
	}else if(skill && skill.isSubType(SkillSubType.STATUS_ADD_PROP)){
		//self.data[skill.statusName()] = self.data[skill.statusName()] * (1 + skill.statusValue()) >>> 0;
		self.data["_skill_add_status_prop_" + skill.statusName()] = 1 + skill.statusValue();
	}else if (skill && skill.isSubType(SkillSubType.HERT_VS_STATUS)) {
		self.data.hertVsStatus = skill.hertVsStatus();
	}else if (skill && skill.isSubType(SkillSubType.SOLDIERS_ATTACK_RECT)) {
		var condition = skill.condition();
		if(condition){
			if((condition.type == "AttackType" && condition.value == currentSoldiers.attackType()) || 
			(condition.type == "SoldierId" && condition.value.indexOf(currentSoldiers.id()) >= 0)){
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
	}
};
CharacterModel.prototype.statusChange = function(name) {
	var self = this;
	if(!self.data.hertVsStatus || self.data.hertVsStatus.name != name){
		return 1;
	}
	return 1 + self.data.hertVsStatus.value * (self.maxTroops() - self.troops()) / self.maxTroops();
};
CharacterModel.prototype.isMale = function() {
	var self = this;
	if(self.id() < 1000){
		return femaleCharacters.indexOf(self.id()) < 0;
	}
	return self.data.gender == 1;
};
CharacterModel.prototype.isTribeCharacter = function() {
	return this.id() >= TribeCharacter[0] && this.id() <= TribeCharacter[1];
};
CharacterModel.prototype.reputation = function() {
	var self = this;
	var reputation = self.data.reputation || [];
	if(!self._reputation || self._reputation.length != reputation.length){
		self._reputation = [];
		for(var i=0;i<reputation.length;i++){
			var reputationModel = ReputationModel.getReputation(reputation[i]);
			self._reputation.push(reputationModel);
		}
	}
	return self._reputation;
};
CharacterModel.prototype.reputationLabel = function() {
	var self = this;
	var reputation = self.reputation();
	var label = "", add = "";
	for(var i=0;i<reputation.length;i++){
		label += (add + Language.get(reputation[i].name()));
		add = "、";
	}
	return label;
};
CharacterModel.prototype.rangeAttack = function() {
	var self = this;
	if(self.data.rangeAttack){
		return self.data.rangeAttack;
	}
	return self.currentSoldiers().rangeAttack();
};
/**
 * 卧薪尝胆参数
 */
CharacterModel.prototype.hardships = function(value) {
	return this._dataValue("hardships", value, 0);
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
CharacterModel.prototype.employPrice = function() {
	var self = this;
	return ((100 + 5 * self.level()) * ((10 + self.data.employLevel) / 10)) >>> 0;
};
CharacterModel.prototype.isEmploy = function() {
	var self = this;
	return (self.id() >= EmployCharacter[0] && self.id()<=EmployCharacter[1]) || 
	(self.id() >= HardEmployCharacter[0] && self.id()<=HardEmployCharacter[1]);
};
CharacterModel.prototype.isHardEmploy = function() {
	var self = this;
	return self.id() >= HardEmployCharacter[0] && self.id()<=HardEmployCharacter[1];
};
CharacterModel.prototype.isDefCharacter = function(value) {
	return this._dataValue("isDefCharacter", value, 0);
};
CharacterModel.prototype.id = function() {
	return this.data.id;
};
CharacterModel.prototype.ambition = function() {
	return this.data.ambition;
};
CharacterModel.prototype.life = function() {
	var self = this;
	var value = self.data.life;
	var equipments = self.equipments();
	for(var i=0;i<equipments.length;i++){
		var item = equipments[i];
		value += item.life();
	}
	return value;
};
CharacterModel.prototype.stopIn = function(value) {
	return this._dataValue("stopIn", value, 0);
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
	return 0.7 + this.currentSoldiers().proficiency() * 0.0003;
};
CharacterModel.prototype.skillAmend = function(value, key){
	var self = this;
	var prop = self.data["_skill_add_status_prop_" + key];
	if(prop){
		value *= prop;
	}
	var num = self.data["_skill_add_status_num_" + key];
	if(num){
		value += num;
	}
	return value >>> 0;
};
CharacterModel.prototype.attack = function(){
	var self = this;
	var value = self.data.attack * self.proficiency() * self.statusChange("attack") + self.data._equipment_attack;
	return self.skillAmend(value, "attack");
};
CharacterModel.prototype.spirit = function(){
	var self = this;
	var value = self.data.spirit * self.proficiency() + self.data._equipment_spirit;
	return self.skillAmend(value, "spirit");
};
CharacterModel.prototype.defense = function(){
	var self = this;
	var value = self.data.defense * self.proficiency() * self.statusChange("defense") + self.data._equipment_defense;
	return self.skillAmend(value, "defense");
};
CharacterModel.prototype.breakout = function(){
	var self = this;
	var value = self.data.breakout * self.proficiency() + self.data._equipment_breakout;
	return self.skillAmend(value, "breakout");
};
CharacterModel.prototype.morale = function(){
	var self = this;
	var value = self.data.morale * self.proficiency() + self.data._equipment_morale;
	return self.skillAmend(value, "morale");
};
CharacterModel.prototype.movePower = function() {
	var self = this;
	if(self.isDefCharacter()){
		return 1;
	}
	var value = self.data.movePower + (self.data._equipment_movePower ? self.data._equipment_movePower : 0);
	return self.skillAmend(value, "movePower");
};
CharacterModel.prototype.dispositionLabel = function(){
	return Language.get("disposition_"+this.data.disposition);
};
CharacterModel.prototype.name = function() {
	if(this.data.id >= 1000){
		return this.data.name;
	}
	if(this.isEmploy()){
		return this.data.name + "(佣)";
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
	if(self.isEmploy()){
		return self.city().seignior().level();
	}
	if(self.seigniorId() == 0){
		if(!LMvc.selectSeignorId){
			return 1;
		}
		return SeigniorModel.getSeignior(LMvc.selectSeignorId).level();
	}
	var seigniorModel = self.seignior();
	if(seigniorModel){
		return seigniorModel.level();
	}
	return SeigniorModel.getSeignior(LMvc.selectSeignorId).level();
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
CharacterModel.prototype.fatherCharacter = function(){
	return CharacterModel.getChara(this.data.father);
};
CharacterModel.prototype.featPlus = function(value){
	var self = this, feat = self.feat();
	if(self.seigniorId() != LMvc.selectSeignorId){
		switch(LMvc.chapterData.trouble){
			case TroubleConfig.HARD:
				value = (value * 1.4 >>> 0);
				break;
			case TroubleConfig.NORMAL:
				value = (value * 1.2 >>> 0);
				break;
			default:
		}
	}
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
	var self = this;
	if(typeof value != UNDEFINED && value < 0){
		value = 0;
	}
	return self._dataValue("wounded", value, 0);
};
CharacterModel.prototype.troops = function(value, proportionWounded) {
	var self = this;
	if(typeof value != UNDEFINED){
		if(value > self.maxTroops()){
			value = self.maxTroops();
		}else if(value < 0){
			value = 0;
		}
		if(proportionWounded){
			var addWounded = (self.data.troops - value) * proportionWounded >>> 0;
			var wounded = self.wounded();
			self.wounded(wounded + addWounded);
		}
		if(self.data._maxTroops && value + self.wounded() > self.maxTroops()){
			self.wounded(self.maxTroops() - value);
		}
		if(value == 0 || value == self.maxTroops()){
			self.wounded(0);
		}
	}
	return self._dataValue("troops", value,0);
};
CharacterModel.prototype.military = function(){
	var self = this;
	var military = self.data.military;
	if(!military){
		if(self.intelligence() < 60){
			return null;
		}else if(self.intelligence() < 80 && self.intelligence() <= self.force()){
			return null;
		}
		var objs = [[65,12],[70,7],[75,13],[80,8],[85,14],[90,9],[95,15],[100,10],[105,16],[1000,11]];
		for(var i=0;i<objs.length;i++){
			var obj = objs[i];
			if(self.intelligence() <= obj[0]){
				military = obj[1];
				break;
			}
		}
	}
	return MilitaryModel.getMaster(military);
};
CharacterModel.prototype.militaryId = function(){
	var self = this;
	var militaryModel = self.military();
	if(!militaryModel){
		return 0;
	}
	return militaryModel.id();
};
CharacterModel.prototype.HP = function(value) {
	return this._dataValue("hp", value);
};
CharacterModel.prototype.MP = function(value) {
	var self = this;
	return self._dataValue("mp", value, 0, 0, self.maxMP());
};
CharacterModel.prototype.isPantTroops = function() {
	return this.troops() < this.maxTroops() * CharacterModel.PANT_PROBABILITY;
};
CharacterModel.prototype.maxTroops = function(init) {
	var self = this;
	if(init || !self.data._maxTroops){
		self.data._maxTroops = self.initTroops() + self.currentSoldiers().property().troops * 2 * self.level();
	}
	return self.skillAmend(self.data._maxTroops, "maxTroops");
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
	var self = this;
	if(self.isDefCharacter() || self.isTribeCharacter() || self.isEmploy()){
		return self.seigniorLevel();
	}
	var lv = (self.data.feat / CharacterLevelConfig.exp >>> 0) + CharacterLevelConfig.initLevel;
	if(lv > CharacterLevelConfig.maxLevel){
		return CharacterLevelConfig.maxLevel;
	}
	return lv;
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
	if(self.isEmploy()){
		return Language.get("employ");
	}
	var seigniorId = self.seigniorId();
	if(seigniorId <= 0){
		return Language.get("out_of_office");
	}
	var identity = "general";
	if(self.isDefCharacter()){
		identity = "building";
	} else if(self.id() == seigniorId && self.seignior()){
		identity = "monarch";
	}else if(self.id() == self.city().prefecture()){
		identity = "prefecture";
	}else if(self.seigniorId() != self.city().seigniorCharaId()){
		identity = "captive";
	}
	return Language.get(identity);
};
CharacterModel.prototype.identityIndex = function() {
	var self = this;
	var seigniorId = self.seigniorId();
	if(seigniorId <= 0){
		return 10000;
	}
	var identity = 2;
	if(self.isDefCharacter()){
		identity = 10000;
	} else if(self.id() == seigniorId){
		identity = 0;
	}else if(self.id() == self.city().prefecture()){
		identity = 1;
	}else if(self.seigniorId() != self.city().seigniorCharaId()){
		identity = 3;
	}
	return identity;
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
	if(self.seigniorId() != self.city().seigniorCharaId()){
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
		var result = persuadeRun(self,self.data.targetPersuadeId);
		self.data.targetPersuadeId = null;
		return result;
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
		var hireResult = hireRun(self,self.data.targetHireId);
		self.data.targetHireId = null;
		return hireResult;
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
		var area = AreaModel.getArea(self.data.targetCity);
		var seigniorId = self.seigniorId();
		if(seigniorId > 0){
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
		if(areaFrom && areaFrom.prefecture() == self.id()){
			appointPrefecture(areaFrom);
		}
		
		if(self.seigniorId() != area.seigniorCharaId() || self.id() == area.seigniorCharaId() || area.prefecture() == area.seigniorCharaId()){
			return;
		}
		var generals = area.generals();
		if(generals.length == 1){
			return;
		}
		var prefectureCharacter = generals.find(function(child){
			return child.id() == area.prefecture();
		});
		if(!prefectureCharacter || self.feat() - 200 > prefectureCharacter.feat()){
			area.prefecture(self.id());
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
CharacterModel.prototype.toDie = function(ageOver) {
	var self = this;
	
	var equipments = self.equipments();
	var city = self.city();
	for(var i=0;i<equipments.length;i++){
		var item = equipments[i];
		city.addItem(item);
		/*
		if(self.seigniorId() == LMvc.selectSeignorId || !ageOver){
			city.addItem(item);
		}else{
			if(!toEquipmentCityItem(item, city)){
				city.addItem(item);
			}
		}*/
	}
	self.data.equipments = [];
	city.removeCharacter(self.id());
	self.seigniorId(0);
};
CharacterModel.prototype.toOutOfOffice = function() {
	var self = this;
	self.city().removeCharacter(self.id());
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
	if(self.isDefCharacter() || self.isEmploy()){
		var icon = self.currentSoldiers().icon();
		var soldierIcon = new LSprite();
		soldierIcon.addChild(icon);
		icon.x = (CharacterFaceSize.width - icon.getWidth()) * 0.5;
		icon.y = (CharacterFaceSize.height - icon.getHeight()) * 0.5;
		return soldierIcon;
	}
	var face = new Face(self.data.faceImg);
	face.x = face.y = 0;
	face.alpha = 1;
	return face;
};
CharacterModel.prototype.getBasicProperties = function(key) {
	var self = this;
	if(!self.data["_"+key]){
		self.calculation(false);
	}
	return self.data["_"+key];
};
CharacterModel.prototype.forceFull = function() {
	return String.format("{0} ({1}/100)", this.force(), this.propertiesExp("force") % 100);
};
CharacterModel.prototype.commandFull = function() {
	return String.format("{0} ({1}/100)", this.command(), this.propertiesExp("command") % 100);
};
CharacterModel.prototype.intelligenceFull = function() {
	return String.format("{0} ({1}/100)", this.intelligence(), this.propertiesExp("intelligence") % 100);
};
CharacterModel.prototype.agilityFull = function() {
	return String.format("{0} ({1}/100)", this.agility(), this.propertiesExp("agility") % 100);
};
CharacterModel.prototype.luckFull = function() {
	return String.format("{0} ({1}/100)", this.luck(), this.propertiesExp("luck") % 100);
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
CharacterModel.prototype.initSoldiers = function() {
	var self = this;
	if(self.isEmploy()){
		return self.soldiers();
	}
	var charaData;
	if(self.id() >= 1000){
		var characters = LPlugin.characters();
		charaData = characters.list.find(function(c){
			return c.id == self.id();
		});
	}else{
		charaData = characterListConfig.find(function(c){
			return c.id == self.id();
		});
	}
	if(!charaData || !charaData.initSoldiers){
		return self.soldiers();
	}
	self.data.soldiers = [];
	for(var i=0;i<charaData.initSoldiers.length;i++){
		self.data.soldiers.push(charaData.initSoldiers[i]);
	}
	self._soldiers = null;
	return self.soldiers();
};
CharacterModel.prototype.maxProficiencySoldier = function() {
	var self = this;
	var soldiers = self.soldiers();
	if(soldiers.length == 1 && !soldiers[0].id()){
		soldiers = self.initSoldiers();
	}
	var proficiency = 0, soldier;
	for(var i=0,l=soldiers.length;i<l;i++){
		var child = soldiers[i];
		if(specialSoldiersConfig.indexOf(child.id()) >= 0 
			&& self.seigniorId() == LMvc.selectSeignorId
			&& !purchaseHasBuy(productIdConfig.soldier_special)){
			continue;
		}
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
	if(self.data.currentSoldierId){
		if(specialSoldiersConfig.indexOf(self.data.currentSoldierId) >= 0 
			&& self.seigniorId() == LMvc.selectSeignorId
			&& !purchaseHasBuy(productIdConfig.soldier_special)){
			self.data.currentSoldierId = null;
		}
	}
	if(!self.data.currentSoldierId){
		var soldier = self.maxProficiencySoldier();
		if(!soldier){
			return 0;
		}
		self.data.currentSoldierId = soldier.id();
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
	if(!self.data._currentSoldiers || !(self.data._currentSoldiers instanceof SoldierModel) || self.data._currentSoldiers.id() != currentSoldierId){
		var soldiers = self.soldiers();
		self.data._currentSoldiers = soldiers.find(function(child){
			return child.id() == currentSoldierId;
		});
	}
	if(!self.data._currentSoldiers){
		self.data.currentSoldierId = null;
		return self.currentSoldiers();
	}
	return self.data._currentSoldiers;
};
CharacterModel.prototype.battleSoldierSelect = function(id, proficiency, img) {
	var self = this;
	if(!id || self.currentSoldierId() == id || self.data.saveSoldiers){
		return;
	}
	self.data.saveSoldiers = self.data.soldiers;
	var soldier = {id:id,proficiency:proficiency};
	if(img && img.indexOf("common") < 0){
		soldier.img = img;
	}
	self.data.soldiers = [soldier];
	self.data._currentSoldiers = null;
	self._soldiers = null;
	self.currentSoldierId(id);
};
CharacterModel.prototype.battleSoldierReset = function() {
	var self = this;
	if(!self.data.saveSoldiers){
		return;
	}
	self.data.soldiers = self.data.saveSoldiers;
	self.data.saveSoldiers = null;
	self.data._currentSoldiers = null;
	self._soldiers = null;
	self.data.currentSoldierId = null;
	if(self.data.soldiers.length == 1){
		self.initSoldiers();
	}
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
CharacterModel.prototype.soldiersData = function() {
	var self = this;
	var models = self.soldiers();
	var datas = [];
	for(var i=0,l=models.length;i<l;i++){
		var model = models[i];
		datas.push(model.getData());
	}
	return datas;
};
CharacterModel.prototype.soldiers = function() {
	var self = this;
	if(!self._soldiers){
		self._soldiers = [];
		self.data._currentSoldiers = null;
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
		list.push(equipment.datas());
		//list.push({item_id:equipment.id(), count:1});
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
			if(self.seigniorId() == LMvc.selectSeignorId){
				LMvc.chapterData["treasure_" + itemModel.id()] = 1;
			}
		}
	}else if(itemModel.constructor.name == "ItemModel"){
		for(var i=0;i<equipments.length;i++){
			var item = equipments[i];
			if(item.position() == itemModel.position()){
				self.equipOff(item.id());
				break;
			}
		}
		var item = new ItemModel(null,itemModel.datas());
		if(self.seigniorId() == LMvc.selectSeignorId){
			LMvc.chapterData["treasure_" + item.id()] = 1;
		}
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
			if(self.id() != self.seigniorId()){
				var loyalty = self.loyalty();
				var changeLoyalty = itemExchangeLoyalty(item);
				self.loyalty(loyalty + (self.seigniorId() == self.city().seigniorCharaId() ? -changeLoyalty : changeLoyalty));
			}
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
	if(Math.fakeRandom() > groupSkill.probability()/100){
		return null;
	}
	return groupSkill;
};
CharacterModel.prototype.skillCoefficient = function() {
	return (this.data.skill ? 1 : 0) + (this.data.groupSkill ? 1 : 0);
};
CharacterModel.prototype.soldiersSkill = function(type) {
	var currentSoldiers = this.currentSoldiers();
	return currentSoldiers.skill(type);
};
CharacterModel.prototype.skill = function(type) {
	var self = this;
	if(LMvc.BattleController && self.troops() == 0){
		return null;
	}
	if(!self.data.skill){
		return self.soldiersSkill(type);
	}
	var skill = SkillMasterModel.getMaster(self.data.skill);
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
CharacterModel.prototype.hasSoldiersSkill = function(subType) {
	var currentSoldiers = this.currentSoldiers();
	return currentSoldiers.hasSkill(subType);
};
CharacterModel.prototype.hasSkill = function(subType) {
	var self = this;
	if(!self.data.skill){
		return self.hasSoldiersSkill(subType);
	}
	var skill = SkillMasterModel.getMaster(self.data.skill);
	if(subType && skill.isSubType(subType)){
		return true;
	}
	return self.hasSoldiersSkill(subType);
};
CharacterModel.prototype.skillId = function() {
	return this.data.skill;
};
