

function SeigniorExecute(){
	var self = this;
	base(self,LMvcObject,[]);
	self.seigniorIndex = 0;
	self.messageCitys = [];
	self.areaIndex = 0;
	self.areaAIIndex = 0;
	if(!self.timer){
		self.timer = new LTimer(LGlobal.speed, 1);
	}
	self.timer.addEventListener(LTimerEvent.TIMER, SeigniorExecute.run);

};
SeigniorExecute.running = false;
SeigniorExecute.Instance = function(){
	if(!SeigniorExecute._Instance){
		SeigniorExecute._Instance = new SeigniorExecute();
	}
	return SeigniorExecute._Instance;
};
SeigniorExecute.close = function(event){
	if(event.currentTarget.alpha < 1){
		return;
	}
	SeigniorExecute.Instance().maskHide();
	LMvc.MapController.view.ctrlLayer.visible = true;
};
SeigniorExecute.getSaveData = function(){
	if(!SeigniorExecute.running){
		return {running:false};
	}
	var self = SeigniorExecute.Instance();
	var data = {
		running : SeigniorExecute.running,
		seigniorIndex:self.seigniorIndex,
		areaIndex:self.areaIndex,
		stop:self.stop,
		seigniors:self.seigniors,
		citys:self.citys
	};
	return data;
};
SeigniorExecute.setSaveData = function(data){
	var self = SeigniorExecute.Instance();
	SeigniorExecute.running = data.running;
	if(!SeigniorExecute.running){
		return;
	}
	self.seigniorIndex = data.seigniorIndex;
	self.areaIndex = data.areaIndex;
	self.stop = data.stop;
	self.seigniors = data.seigniors;
	self.citys = data.citys;
};
SeigniorExecute.removeSeignior=function(seigniorId){
	var self = SeigniorExecute.Instance();
	var index = SeigniorModel.list.findIndex(function(seigniorModel){
		return seigniorModel.chara_id() == seigniorId;
	});
	if(index < self.seigniorIndex){
		self.seigniorIndex -= 1;
		self.seigniors.shift();
	}
};
SeigniorExecute.run=function(){
	var self = SeigniorExecute.Instance();
	if(!self.load){
		self.load = new LMvcLoader(self);
		self.loadSeigniorExecute();
		return;
	}
	SeigniorExecute.running = true;
	if(self.seigniorIndex == 0 && jobAiEvent()){
		return;
	}
	if(!self.backLayer){
		self.maskShow();
		if(SeigniorModel.list[0].chara_id() != LMvc.selectSeignorId){
			var selectIndex = SeigniorModel.list.findIndex(function(child){
				return child.chara_id() == LMvc.selectSeignorId;
			});
			var deleteModels = SeigniorModel.list.splice(selectIndex, 1);
			SeigniorModel.list.unshift(deleteModels[0]);
		}
		if(!self.timeAdded){
			self.timeAdded = true;
			self.seigniors = [];
			self.citys = [];
			LMvc.chapterData.month += 1;
			if(LMvc.chapterData.month > 12){
				LMvc.chapterData.year += 1;
				LMvc.chapterData.month = 1;
			}
		}
	}
	if(self.stop){
		return;
	}
	if(self.seigniorIndex < SeigniorModel.list.length){
		var seigniorModel = SeigniorModel.list[self.seigniorIndex];
		if(seigniorModel.chara_id() == 0){
			self.seigniorIndex++;
			SeigniorExecute.run();
			return;
		}
		if(self.seigniors.indexOf(self.seigniorIndex) < 0){
			self.msgView.setSeignior(seigniorModel.chara_id());
			self.seigniors.push(self.seigniorIndex);
			//势力行动消息取消
			//self.msgView.add(seigniorModel.character().name() + "势力行动!");
			/*if(seigniorModel.chara_id() != LMvc.selectSeignorId){
				jobAiSetCityBattleDistance(seigniorModel);
				return;
			}*/
			return;
		}
		var aiOver = self.areasAIRun(seigniorModel);
		if(!aiOver){
			return;
		}
		self.areasRun(seigniorModel);
		return;
	}
	if(checkSeigniorIsDie(LMvc.selectSeignorId)){
		return;
	}
	//self.maskHide();
	self.seigniorIndex = 0;
	self.areaIndex = 0;
	self.timeAdded = false;
	SeigniorExecute.running = false;
	var buttonClose = self.backLayer.childList.find(function(child){
		return child.constructor.name == "LButton";
	});
	buttonClose.visible = true;
	self.msgView.clearSeignior();
	LMvc.MapController.view.positionChangeToCity(CharacterModel.getChara(LMvc.selectSeignorId).city());
	RecordController.instance().autoSaveRecord();
};
SeigniorExecute.prototype.areaRun=function(area){
	var self = this;
	if(!self.areaPrizedOver){//褒奖
		self.generalsPrizedRun(area);
	}
	if(!self.areaGainOver){//城池收获
		self.areaGainRun(area);
	}
	if(!self.areaJobOver){//任务
		self.areaJobRun(area);
	}
	self.areaIndex++;
	self.areaGainOver = false;
	self.areaJobOver = false;
	self.areaPrizedOver = false;
	self.areaDieOver = false;
	self.timer.reset();
	self.timer.start();
};
SeigniorExecute.prototype.areaGainRun=function(area){
	var self = this;
	SeigniorExecuteChangeCityResources(area);
	self.areaGainOver = true;
};
SeigniorExecute.prototype.generalsPrizedRun=function(area){
	var self = this;
	self.areaPrizedOver = true;
	var generals = area.generals();
	if(area.seigniorCharaId() == LMvc.selectSeignorId){
		return;
	}
	//褒奖
	var generals = area.generals();
	for(var i=0;i<generals.length;i++){
		var chara = generals[i];
		if(area.money() < JobPrice.PRIZE){
			return;
		}
		if(chara.loyalty() >= 100 || chara.isPrized()){
			continue;
		}
		toPrizedByMoney(chara);
	}
};
SeigniorExecute.addMessage = function(value){
	console.error("addMessage :", value);
	MessageView.Instance().add(value);
};
SeigniorExecute.prototype.areaJobRun=function(area){
	var self = this, chara, job;
	var generals = area.generals();
	var list = [];
	for(var i=0;i<generals.length;i++){
		chara = generals[i];
		chara.isPrized(false);
		job = chara.job();
		switch(job){
			case Job.MOVE:
				list.push(chara);
				break;
			case Job.AGRICULTURE:
				agricultureRun(chara);
				break;
			case Job.BUSINESS:
				businessRun(chara);
				break;
			case Job.POLICE:
				policeRun(chara);
				break;
			case Job.TECHNOLOGY:
				technologyRun(chara);
				break;
			case Job.REPAIR:
				repairRun(chara);
				break;
			case Job.ACCESS:
				accessRun(chara);
				break;
			case Job.EXPLORE_BUSINESS:
				exploreBusinessRun(chara);
				break;
			case Job.EXPLORE_AGRICULTURE:
				exploreAgricultureRun(chara);
				break;
			case Job.LEVEL_UP:
				levelUpCityRun(chara);
				break;
			case Job.DIPLOMACY_REDEEM:
				chara.redeem();
				break;
			case Job.DIPLOMACY_STOP_BATTLE:
				chara.stopBattle();
				break;
			case Job.TRAINING:
				chara.training();
				break;
			case Job.ENLIST:
				chara.enlist();
				break;
			case Job.HIRE:
				chara.hire();
				break;
			case Job.SPY:
				chara.spy();
				break;
			case Job.TRANSPORT:
				chara.transport();
				break;
			case Job.PERSUADE:
				chara.persuade();
				break;
			default:
				chara.featPlus(JobFeatCoefficient.NORMAL * 0.25);
				chara.job(Job.IDLE);
		}
	}
	if(list.length > 0){
		for(var i=0;i<list.length;i++){
			chara = list[i];
			job = chara.job();
			switch(job){
				case Job.MOVE:
					chara.moveTo();
					break;
			}
		}
	}
	var captives = area.captives();
	for(var i=0;i<captives.length;i++){
		chara = captives[i];
		chara.job(Job.IDLE);
	}
	self.areaJobOver = true;
};
SeigniorExecute.prototype.areasRun=function(seigniorModel){
	var self = this;
	if(self.areaIndex == 0){
		seigniorModel.checkSpyCitys();
		seigniorModel.checkStopBattleSeigniors();
	}
	var areas = seigniorModel.areas();
	if(self.areaIndex < areas.length){
		var areaModel = areas[self.areaIndex];
		self.msgView.setSeigniorProcess(self.areaIndex);
		self.areaRun(areaModel);
		return;
	}
	self.areaIndex = 0;
	self.areaAIIndex = 0;
	self.seigniorIndex++;
	SeigniorExecute.run();
};
SeigniorExecute.prototype.areasAIRun=function(seigniorModel){
	var self = this;
	var areas = seigniorModel.areas();
	if(self.areaAIIndex < areas.length){
		var areaModel = areas[self.areaAIIndex];
		//console.error("*****" + areaModel.name() + "*****");
		self.areaAIRun(areaModel);
		return false;
	}
	
	return true;
};
SeigniorExecute.prototype.jobNumberOfCharacter=function(characters){
	var length = (2+characters.length) / 3 >>> 0;
	length = length < 2 ? 2 : length;
	length = length > 5 ? 5 : length;
	length = length > characters.length ? characters.length : length;
	return length;
};
SeigniorExecute.prototype.jobAiFunction=function(areaModel, characters, func,params,maxNum){
	var self = this;
	//console.log("jobAiFunction "+func.name);
	var length = self.jobNumberOfCharacter(characters);
	if(maxNum && maxNum < length){
		length = maxNum;
	}
	if(length == 0){
		return;
	}
	if(params && params.length > 0){
		self.characters = self.characters.sort(function(a,b){
			var avalue = 0;
			var bvalue = 0;
			for(var i = 0;i<params.length;i++){
				var k = params[i];
				avalue += a[k]();
				bvalue += b[k]();
			}
			return avalue - bvalue;
		});
	}
	if(maxNum == 1){
		return func(areaModel,self.characters);
	}
	while(length-- > 0){
		func(areaModel,self.characters);
	}
};
SeigniorExecute.prototype.areaMessage=function(areaModel,key){
	var self = this;
	if(self.citys.indexOf(areaModel.id()) >= 0){
		return;
	}
	self.citys.push(areaModel.id());
	var seigniorName = areaModel.seigniorCharaId() == LMvc.selectSeignorId ? Language.get("belong_self") : areaModel.seignior().character().name();
	SeigniorExecute.addMessage(String.format(Language.get(key),seigniorName,areaModel.name()));
};
SeigniorExecute.prototype.areaCharacterDieRun=function(area){
	var self = this;
	self.areaDieOver = true;
	return charactersNaturalDeath(area);
};
SeigniorExecute.prototype.areaAIRun=function(areaModel){
	var self = this;
	if(areaModel.seigniorCharaId() == LMvc.selectSeignorId && !areaModel.isAppoint()){
		self.characters = [];
	}else{
		self.characters = getIdleCharacters(areaModel);
	}
	//判断是否有未执行任务人员
	if(self.characters.length == 0){
		self.areaAIIndex++;
		self.timer.reset();
		self.timer.start();
		return;
	}
	if(areaModel.seignior().isTribe()){
		//外族只在每年收获粮食时随机进行侵略行动一次，其他时间不行动
		if(HarvestMonths.Food.indexOf(LMvc.chapterData.month) >= 0 && Math.random() < TribeAIProbability && self.characters.length == areaModel.generalsSum()){
			var neighbors = areaModel.neighbor();
			var cityId = neighbors[neighbors.length * Math.random() >>> 0];
			var city = AreaModel.getArea(cityId);
			if(city.seigniorCharaId()){
				jobAiToBattle(areaModel, self.characters, city);
				return;
			}
		}
		self.areaAIIndex++;
		self.timer.reset();
		self.timer.start();
		return;
	}
	
	if(!self.areaDieOver){//武将死亡
		if(self.areaCharacterDieRun(areaModel)){
			return;
		}
	}
	
	//俘虏处理
	jobAiCaptives(areaModel);
	
	//TODO::ver1.1是否进行停战：下个版本对应
	
	//是否需要征兵
	var needEnlistFlag = jobAiNeedToEnlist(areaModel);
	//治安
	var police = areaModel.police();
	var toPolice = police < 70 || (police < 80 && Math.random() < 0.5) || (police < 90 && Math.random() < 0.3) || (police < 100 && Math.random() < 0.1);
	if(toPolice){
		self.jobAiFunction(areaModel,self.characters,jobAiPolice,["force","agility"]);//治安
	}
	var canEnlish = jobAiCanToEnlish(areaModel);
	if(needEnlistFlag == AiEnlistFlag.Must || needEnlistFlag == AiEnlistFlag.Need){
		if(canEnlish){
			for(var i=0;i<2;i++){
				self.jobAiFunction(areaModel,self.characters,jobAiToEnlish,["luck","command"]);
			}
		}
	}
	//修补
	if(areaModel.cityDefense() < areaModel.maxCityDefense() && !(
		needEnlistFlag == AiEnlistFlag.Must || 
		needEnlistFlag == AiEnlistFlag.Need || 
		needEnlistFlag == AiEnlistFlag.MustResource || 
		needEnlistFlag == AiEnlistFlag.NeedResource
		) && Math.random() > 0.5){
		self.jobAiFunction(areaModel,self.characters,jobAiRepair,["force","command"]);//修补
	}
	//判断是否有可攻击的城池
	var city = getCanBattleCity(areaModel, self.characters, needEnlistFlag);
	if(city){
		jobAiToBattle(areaModel, self.characters, city);
		return;
	}
	//武将移动
	jobAiGeneralMove(areaModel,self.characters);
	//输送物资
	jobAiTransport(areaModel,self.characters);
	//解救俘虏
	if(self.jobAiFunction(areaModel,self.characters,jobAiCaptivesRescue,["intelligence","luck"],1)){
		return;
	}
	//劝降其他势力武将
	jobAiPersuade(areaModel,self.characters);
	//酒馆
	var toTavern = !(
	(
		needEnlistFlag == AiEnlistFlag.Must || 
		needEnlistFlag == AiEnlistFlag.Need || 
		needEnlistFlag == AiEnlistFlag.MustResource || 
		needEnlistFlag == AiEnlistFlag.NeedResource
	) || 
	(
		(needEnlistFlag == AiEnlistFlag.Battle || needEnlistFlag == AiEnlistFlag.BattleResource) && Math.random() > 0.2
	) || 
	(
		(needEnlistFlag == AiEnlistFlag.Free || needEnlistFlag == AiEnlistFlag.None) && Math.random() > 0.5
	));
	if(toTavern){
		if(areaModel.outOfOffice().length > 0){
			self.jobAiFunction(areaModel,self.characters,jobAiTavern,["luck"]);//录用
		}else{
			self.jobAiFunction(areaModel,self.characters,jobAiAccess,["intelligence","command","luck"]);//访问
		}
	}
	
	var toInterior = 
	needEnlistFlag == AiEnlistFlag.Must || 
	needEnlistFlag == AiEnlistFlag.Need || 
	needEnlistFlag == AiEnlistFlag.MustResource || 
	needEnlistFlag == AiEnlistFlag.NeedResource || 
	(
		(needEnlistFlag == AiEnlistFlag.Battle || needEnlistFlag == AiEnlistFlag.BattleResource) && Math.random() > 0.2
	) || 
	(
		needEnlistFlag == AiEnlistFlag.Free && Math.random() > 0.5
	);
	if(toInterior){//内政
		var interiorList = [];
		if(!areaModel.isMaxTechnology()){
			interiorList.push({fun:jobAiInstitute,params:["intelligence","command"],v:(areaModel.technology() / areaModel.maxTechnology())});//太学院
		}
		if(!areaModel.isMaxAgriculture()){
			interiorList.push({fun:jobAiFarmland,params:["intelligence","force"],v:(areaModel.agriculture() / areaModel.maxAgriculture())});//农地
		}
		if(!areaModel.isMaxBusiness()){
			interiorList.push({fun:jobAiMarket,params:["intelligence","agility"],v:(areaModel.business() / areaModel.maxBusiness())});//市场
		}
		if(interiorList.length > 0){
			interiorList = interiorList.sort(function(a,b){return a.v - b.v;});
			for(var i=0;i<2;i++){
				var child = interiorList[0];
				self.jobAiFunction(areaModel,self.characters,child.fun,child.params);
			}
			/*for(var i = 0;i<interiorList.length;i++){
				child = interiorList[i];
				self.jobAiFunction(areaModel,self.characters,child.fun,child.params);
			}*/
		}else{
			//升级城池
			jobAiLevelUpCity(areaModel,self.characters);
		}
	}
	if(self.characters.length > 1 && areaModel.money() > 500 && Math.random() > 0.7){
		SeigniorExecute.run();
		return;
	}
	//如果有剩余无分配工作的人员,则执行探索
	while(self.characters > 0){
		if(Math.random() > 0.5){
			//农地探索
			self.jobAiFunction(areaModel,self.characters,jobAiFarmlandExplore,["intelligence","force","luck"]);
		}else{
			//市场探索
			self.jobAiFunction(areaModel,self.characters,jobAiMarketExplore,["intelligence","agility","luck"]);
		}
	}
	self.areaAIIndex++;
	//console.log("self.areaAIIndex:"+self.areaAIIndex);
	self.timer.reset();
	self.timer.start();
};
SeigniorExecute.prototype.maskShow=function(){
	var self = this;
	if(self.backLayer){
		return;
	}
	var maskLayer = getTranslucentMask();
	maskLayer.alpha = 0.01;
	self.backLayer = new LSprite();
	self.backLayer.addChild(maskLayer);
	self.msgView = MessageView.Instance();
	self.backLayer.addChild(self.msgView);
	LMvc.MapController.view.parent.addChild(self.backLayer);
	
	var bitmapClose = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
	var buttonClose = new LButton(bitmapClose);
	buttonClose.x = LGlobal.width - bitmapClose.getWidth() - 5;
	buttonClose.y = self.msgView.panelY - bitmapClose.getHeight();
	self.backLayer.addChild(buttonClose);
	buttonClose.addEventListener(LMouseEvent.MOUSE_UP, SeigniorExecute.close);
	buttonClose.visible = false;
	LMvc.MapController.view.ctrlLayer.visible = false;
};
SeigniorExecute.prototype.maskHide=function(){
	var self = this;
	if(self.msgView.timer != null){
		self.msgView.timer.destroy();
	}
	self.messageCitys = [];
	self.backLayer.remove();
	self.backLayer = null;
	MessageView._Instance = null;
};

SeigniorExecute.prototype.loadSeigniorExecute=function(){
	var self = this;
	self.loadMvc("EventMap",self.loadSeigniorExecuteLoadSkill);
};
SeigniorExecute.prototype.loadSeigniorExecuteLoadSkill=function(){
	var self = this;
	self.load.model(["Master/SkillMaster","Master/SoldierMaster","Master/Soldier","Master/StrategyMaster","Master/Strategy"],self.loadSeigniorExecuteConfig);
};
SeigniorExecute.prototype.loadSeigniorExecuteConfig=function(){
	var self = this;
	self.load.config(["CharacterListType","Skills","EventList","BattleMap","Soldiers","Strategy"],self.loadSeigniorExecuteHelper);
};
SeigniorExecute.prototype.loadSeigniorExecuteHelper=function(){
	var self = this;
	self.load.helper(["JobHelper","JobAIHelper","EventListHelper","BattleHelper","BattleCalculateHelper","CommonHelper"],self.loadSeigniorExecuteLibrary);
};
SeigniorExecute.prototype.loadSeigniorExecuteLibrary=function(){
	var self = this;
	self.load.library(["BattleAIExecute","Battle/HertParams","Battle/BattleIntelligentAI"],self.loadSeigniorExecuteView);
};
SeigniorExecute.prototype.loadSeigniorExecuteView=function(){
	var self = this;
	self.load.view(["Common/Character","Common/Message","Common/MessageChild", "Battle/CharacterStatusIcon", "Battle/BattleCharacter"],self.seigniorExecute);
};
SeigniorExecute.prototype.seigniorExecute=function(){
	var self = this;
	StrategyMasterModel.setMaster(StrategyDatas);
	SoldierMasterModel.setMaster(SoldierDatas);
	SkillMasterModel.setMaster(SkillsData);
	SeigniorExecute.run();
};
