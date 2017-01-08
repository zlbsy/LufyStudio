function SeigniorExecute(){
	var self = this;
	base(self,LMvcObject,[]);
	self.seigniorIndex = 0;
	self.messageCitys = [];
	self.areaIndex = 0;
	self.areaAIIndex = 0;
	self.tournamentsOver = false;
	self.eventCitys = [];
	self.captivesChecked = [];
	self.childsCheckedCitys = [];
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
	if(event && event.currentTarget.alpha < 1){
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
		citys:self.citys,
		areaDisasterOver:self.areaDisasterOver,
		areaGainOver:self.areaGainOver,
		areaJobOver:self.areaJobOver,
		areaPrizedOver:self.areaPrizedOver,
		areaChangeLoyaltyOver:self.areaChangeLoyaltyOver,
		areaPrefectureFeatOver:self.areaPrefectureFeatOver,
		areaDieOver:self.areaDieOver,
		appointExploreOver:self.appointExploreOver,
		isCheckedSpy:self.isCheckedSpy,
		childsCheckedCitys:self.childsCheckedCitys,
		captivesChecked:self.captivesChecked
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
	self.childsCheckedCitys = data.childsCheckedCitys;
	self.captivesChecked = data.captivesChecked;
	
	self.areaDisasterOver = data.areaDisasterOver;
	self.areaGainOver = data.areaGainOver;
	self.areaJobOver = data.areaJobOver;
	self.areaPrizedOver = data.areaPrizedOver;
	self.areaChangeLoyaltyOver = data.areaChangeLoyaltyOver;
	self.areaPrefectureFeatOver = data.areaPrefectureFeatOver;
	self.areaDieOver = data.areaDieOver;
	self.appointExploreOver = data.appointExploreOver;
	self.isCheckedSpy = data.isCheckedSpy;
};
SeigniorExecute.removeSeignior=function(seigniorId){
	var self = SeigniorExecute.Instance();
	var index = SeigniorModel.list.findIndex(function(seigniorModel){
		return seigniorModel.chara_id() == seigniorId;
	});
	if(index >= 0 && index < self.seigniorIndex){
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
	if(!self.tournamentsOver){
		self.tournamentsOver = true;
		if(LMvc.chapterData.year % 2 == 0 && LMvc.chapterData.month == 12){
			self.backLayer.visible = false;
			self.msgView.hideSeignior();
			var script = String.format("SGJTalk.show({0},{1},{2});", LMvc.selectSeignorId, 1, Language.get("tournaments_introduction"));
			script += "SGJEvent.tournamentsCheck();";
			LGlobal.script.addScript(script);
			return;
		}
	}
	if(self.stop){
		return;
	}
	if(!self.backLayer.visible){
		self.backLayer.visible = true;
	}
	if(SeigniorExecute.messageCache){
		var message = SeigniorExecute.messageCache;
		SeigniorExecute.messageCache = null;
		SeigniorExecute.addMessage(message);
	}
	if(self.seigniorIndex < SeigniorModel.list.length){
		var seigniorModel = SeigniorModel.list[self.seigniorIndex];
		if(seigniorModel.chara_id() == 0){
			self.seigniorIndex++;
			SeigniorExecute.run();
			return;
		}else if(seigniorModel.character().seigniorId() == 0){
			monarchChange(seigniorModel.chara_id());
		}
		if(self.seigniors.indexOf(self.seigniorIndex) < 0){
			self.msgView.setSeignior(seigniorModel.chara_id());
			self.seigniors.push(self.seigniorIndex);
			seigniorModel.character().featPlus(3);
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
	self.seigniorIndex = 0;
	self.areaIndex = 0;
	self.timeAdded = false;
	self.eventCitys = [];
	self.childsCheckedCitys = [];
	self.captivesChecked = [];
	self.tournamentsOver = false;
	SeigniorExecute.running = false;
	SeigniorExecute.clearCheck = false;
	var buttonClose = self.backLayer.getChildByName("closeButton");
	buttonClose.visible = true;
	self.msgView.clearSeignior();
	LMvc.MapController.view.positionChangeToCity(CharacterModel.getChara(LMvc.selectSeignorId).city());
	if(!LMvc.TutorialController){
		SeigniorLevelUpdate();
		Math.fakeReset();
		RecordController.instance().autoSaveRecord();
	}
	//TODO::测试用
	if(LGlobal.traceDebug){
		setTimeout(function(){
			if(self.backLayer && buttonClose.visible){
				SeigniorExecute.close();
				SeigniorExecute.run();
			}
		},3000);
	}
};
SeigniorExecute.prototype.tournamentsCheck=function(){
	var obj = {title:Language.get("confirm"),
	message:Language.get("tournaments_join_confirm"),
	height:200,okEvent:function(event){
		event.currentTarget.parent.remove();
		LMvc.MapController.showTournaments();
	},cancelEvent:function(event){
		event.currentTarget.parent.remove();
		SeigniorExecute.Instance().msgView.showSeignior();
		SeigniorExecute.run();
	}};
	var windowLayer = ConfirmWindow(obj);
	LMvc.layer.addChild(windowLayer);
};
SeigniorExecute.prototype.disasterRun=function(area){
	var self = this;
	if(self.areaDisasterOver){
		return false;
	}
	self.areaDisasterOver = true;
	if(disasterMonthsExecute(area)){
		return true;
	}
	return false;
};
SeigniorExecute.prototype.areaRun=function(area){
	var self = this;
	if(area.isTribe()){
		var minTroops = area.seignior().character().maxTroops() * 20;
		if(area.troops() < minTroops){
			area.troops(minTroops - area.troops());
		}
	}else{
		if(self.disasterRun(area)){//灾难
			return;
		}
		if(!self.areaPrizedOver){//褒奖
			self.generalsPrizedRun(area);
		}
		if(!self.areaGainOver){//城池收获
			self.areaGainRun(area);
		}
		if(!self.areaChangeLoyaltyOver){//每年3月份，武将忠诚度变化一次
			if(LMvc.chapterData.month == 3){
				generalsChangeLoyalty(area.generals());
			}
			self.areaChangeLoyaltyOver = true;
		}
		if(!self.areaPrefectureFeatOver){//太守功绩
			if(area.prefecture() > 0){
				var prefectureCharacter = CharacterModel.getChara(area.prefecture());
				prefectureCharacter.featPlus(5);
			}
			self.areaPrefectureFeatOver = true;
		}
		if(!self.areaJobOver){//任务
			var areaJobReturn= self.areaJobRun(area);
			if(areaJobReturn){
				return;
			}
		}
	}
	self.areaIndex++;
	self.areaDisasterOver = false;
	self.areaGainOver = false;
	self.areaJobOver = false;
	self.areaPrizedOver = false;
	self.areaChangeLoyaltyOver = false;
	self.areaPrefectureFeatOver = false;
	self.areaDieOver = false;
	self.appointExploreOver = false;
	self.isCheckedSpy = false;
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
	if(typeof MessageView == UNDEFINED){
		SeigniorExecute.messageCache = value;
	}else{
		MessageView.Instance().add(value);
	}
};
SeigniorExecute.prototype.areaJobRun=function(area){
	var self = this, chara, job;
	var generals = area.generals().concat();
	var list = [];
	for(var i=0;i<generals.length;i++){
		chara = generals[i];
		chara.HP(chara.maxHP());
		chara.MP(chara.maxMP());
		chara.isPrized(false);
		job = chara.job();
		switch(job){
			case Job.MOVE:
				list.push(chara);
				break;
			case Job.FLOOD:
				floodRun(chara);
				break;
			case Job.PLAGUE_OF_LOCUSTS:
				plagueOfLocustsRun(chara);
				break;
			case Job.AGRICULTURE:
				agricultureRun(chara);
				break;
			case Job.BUSINESS:
				var stop = businessRun(chara);
				if(stop){
					return true;
				}
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
				var stop = accessRun(chara);
				if(stop){
					return true;
				}
				break;
			case Job.HIRE:
				var stop = chara.hire();
				if(stop){
					return true;
				}
				break;
			case Job.PERSUADE:
				var stop = chara.persuade();
				if(stop){
					return true;
				}
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
			case Job.SPY:
				chara.spy();
				break;
			case Job.TRANSPORT:
				chara.transport();
				break;
			case Job.END:
			case Job.IDLE:
				chara.job(Job.IDLE);
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
	//俘虏移动
	var captives = area.captives();
	for(var i=0;i<captives.length;i++){
		chara = captives[i];
		if(chara.job() == Job.MOVE){
			var toCity = AreaModel.getArea(chara.data.targetCity);
			chara.data.targetCity = null;
			chara.job(Job.IDLE);
			toCity.addCaptives(chara);
		}
	}
	captivesChangeLoyalty(area);
	self.areaJobOver = true;
	return false;
};
SeigniorExecute.prototype.areasRun=function(seigniorModel){
	var self = this;
	if(self.areaIndex == 0 && !self.isCheckedSpy){
		seigniorModel.checkSpyCitys();
		seigniorModel.checkStopBattleSeigniors();
		self.isCheckedSpy = true;
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
	if(LMvc.chapterData.month == 2){
		if(self.childsCheckedCitys.indexOf(areaModel.id()) < 0){
			var growup = childsHasGrowup(areaModel);
			if(growup){
				self.stop = true;
				return;
			}else{
				self.childsCheckedCitys.push(areaModel.id());
			}
		}
	}
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
		if(HarvestMonths.Food.indexOf(LMvc.chapterData.month) >= 0 && Math.fakeRandom() < TribeAIProbability && self.characters.length == areaModel.generalsSum()){
			var neighbors = areaModel.neighbor();
			var cityId = neighbors[neighbors.length * Math.fakeRandom() >>> 0];
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
		self.characters = getIdleCharacters(areaModel);
	}
	
	//俘虏处理
	jobAiCaptives(areaModel);
	
	//TODO::ver1.1是否进行停战：下个版本对应
	
	//是否需要征兵
	var needEnlistFlag = jobAiNeedToEnlist(areaModel);
	//治安
	var police = areaModel.police();
	var toPolice = police < 70 || (police < 80 && Math.fakeRandom() < 0.5) || (police < 90 && Math.fakeRandom() < 0.3) || (police < 100 && Math.fakeRandom() < 0.1);
	if(toPolice){
		self.jobAiFunction(areaModel,self.characters,jobAiPolice,["force","agility"]);//治安
	}
	if(areaModel.seigniorCharaId() == LMvc.selectSeignorId && areaModel.isAppoint() && areaModel.appointType() == AppointType.AppointExplore && !self.appointExploreOver){
		//重视探索
		self.appointExploreOver = true;
		var length = areaModel.generalsSum() * 0.5 >>> 0;
		while(self.characters.length > length){
			if(Math.fakeRandom() > 0.5){
				//农地探索
				self.jobAiFunction(areaModel,self.characters,jobAiFarmlandExplore,["intelligence","force","luck"]);
			}else{
				//市场探索
				self.jobAiFunction(areaModel,self.characters,jobAiMarketExplore,["intelligence","agility","luck"]);
			}
		}
	}
	var canEnlish = jobAiCanToEnlish(areaModel);
	if(needEnlistFlag == AiEnlistFlag.Must || needEnlistFlag == AiEnlistFlag.Need 
		|| needEnlistFlag == AiEnlistFlag.Battle || Math.fakeRandom() < 0.1){
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
		) && Math.fakeRandom() > 0.5){
		self.jobAiFunction(areaModel,self.characters,jobAiRepair,["force","command"]);//修补
	}
	if(areaModel.seigniorCharaId() != LMvc.selectSeignorId || (areaModel.isAppoint() && areaModel.appointType() != AppointType.AppointInternal && areaModel.appointType() != AppointType.AppointExplore)){
		//判断是否有可攻击的城池
		var city = getCanBattleCity(areaModel, self.characters, needEnlistFlag);
		if(city){
			jobAiToBattle(areaModel, self.characters, city);
			return;
		}
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
		needEnlistFlag == AiEnlistFlag.MustResource
	) || 
	(
		(needEnlistFlag == AiEnlistFlag.NeedResource || needEnlistFlag == AiEnlistFlag.Battle || needEnlistFlag == AiEnlistFlag.BattleResource) && Math.fakeRandom() > 0.2
	) || 
	(
		(needEnlistFlag == AiEnlistFlag.Free || needEnlistFlag == AiEnlistFlag.None) && Math.fakeRandom() > 0.5
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
		(needEnlistFlag == AiEnlistFlag.Battle || needEnlistFlag == AiEnlistFlag.BattleResource) && Math.fakeRandom() > 0.2
	) || 
	(
		needEnlistFlag == AiEnlistFlag.Free && Math.fakeRandom() > 0.5
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
		}else if(areaModel.level() < areaModel.maxLevel()){
			//升级城池
			jobAiLevelUpCity(areaModel,self.characters);
		}
	}
	if(self.characters.length > 1 && areaModel.money() > 500 && Math.fakeRandom() > 0.7){
		SeigniorExecute.run();
		return;
	}
	//如果有剩余无分配工作的人员,则执行探索
	while(self.characters.length > 0){
		if(Math.fakeRandom() > 0.5){
			//农地探索
			self.jobAiFunction(areaModel,self.characters,jobAiFarmlandExplore,["intelligence","force","luck"]);
		}else{
			//市场探索
			self.jobAiFunction(areaModel,self.characters,jobAiMarketExplore,["intelligence","agility","luck"]);
		}
	}
	self.areaAIIndex++;
	self.timer.reset();
	self.timer.start();
};
SeigniorExecute.prototype.maskShow=function(){
	var self = this;
	if(self.backLayer){
		return;
	}
	var buttonClose;
	if(self._backLayer){
		self.backLayer = self._backLayer;
		buttonClose = self.backLayer.getChildByName("closeButton");
		buttonClose.visible = false;
		self.backLayer.visible = true;
		LMvc.MapController.view.ctrlLayer.visible = false;
		self.msgView.showSeignior();
		self.msgView.listView.clipping.y = 0;
		return;
	}
	var maskLayer = getTranslucentMask();
	maskLayer.alpha = 0.01;
	self.backLayer = new LSprite();
	self.backLayer.addChild(maskLayer);
	self.msgView = MessageView.Instance();
	self.msgView.showSeignior();
	self.msgView.listView.clipping.y = 0;
	self.backLayer.addChild(self.msgView);
	LMvc.layer.addChild(self.backLayer);
	
	var bitmapClose = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
	buttonClose = new LButton(bitmapClose);
	buttonClose.x = LMvc.screenWidth - bitmapClose.getWidth() - 5;
	buttonClose.y = self.msgView.panelY - bitmapClose.getHeight();
	self.backLayer.addChild(buttonClose);
	buttonClose.addEventListener(LMouseEvent.MOUSE_UP, SeigniorExecute.close);
	buttonClose.visible = false;
	LMvc.MapController.view.ctrlLayer.visible = false;
	buttonClose.name = "closeButton";
};
SeigniorExecute.prototype.maskHide=function(){
	var self = this;
	if(self.msgView.timer != null){
		self.msgView.timer.stop();
	}
	self.messageCitys = [];
	self._backLayer = self.backLayer;
	self._backLayer.visible = false;
	self.backLayer = null;
	self.msgView.listView.clear();
};

SeigniorExecute.prototype.loadSeigniorExecute=function(){
	var self = this;
	self.loadMvc("EventMap",self.loadSeigniorExecuteModel);
};
SeigniorExecute.prototype.loadSeigniorExecuteModel=function(){
	var self = this;
	self.load.model(["Master/SkillMaster","Master/SoldierMaster","Master/Soldier","Master/GroupSkill","Master/StrategyMaster","Master/Strategy"],self.loadSeigniorExecuteConfig);
};
SeigniorExecute.prototype.loadSeigniorExecuteConfig=function(){
	var self = this;
	self.load.config(["CharacterListType","Skills","GroupSkills","EventList","BattleMap","Soldiers","Strategy"],self.loadSeigniorExecuteHelper);
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
	GroupSkillModel.setMaster(GroupSkillsData);
	SeigniorExecute.run();
};
