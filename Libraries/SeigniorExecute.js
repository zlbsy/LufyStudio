function SeigniorExecute(){
	var self = this;
	self.seigniorIndex = 0;
	self.areaIndex = 0;
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
SeigniorExecute.close = function(){
	SeigniorExecute.Instance().maskHide();
};
SeigniorExecute.run=function(){
	var self = SeigniorExecute.Instance();
	if(!self.backLayer){
		SeigniorExecute.running = true;
		self.seigniors = [];
		self.citys = [];
		self.maskShow();
		var month = LMvc.chapterController.getValue("month");
		var year = LMvc.chapterController.getValue("year");
		if(++month > 12){
			year++;
			month = 1;
		}
		LMvc.chapterController.setValue("month",month);
		LMvc.chapterController.setValue("year",year);
		if(SeigniorModel.list[0].chara_id() != LMvc.selectSeignorId){
			var selectIndex = SeigniorModel.list.findIndex(function(child){
				return child.chara_id() == LMvc.selectSeignorId;
			});
			var deleteModels = SeigniorModel.list.splice(selectIndex, 1);
			SeigniorModel.list.unshift(deleteModels[0]);
		}
	}
	if(self.stop || jobAiEvent()){
		return;
	}
	console.log("self.seigniorIndex="+self.seigniorIndex+"<"+SeigniorModel.list.length);
	if(self.seigniorIndex < SeigniorModel.list.length){
		var seigniorModel = SeigniorModel.list[self.seigniorIndex];
		if(self.seigniors.indexOf(self.seigniorIndex) < 0){
			self.seigniors.push(self.seigniorIndex);
			self.msgView.add(seigniorModel.character().name() + "势力行动!");
		}
		if(seigniorModel.chara_id() != LMvc.selectSeignorId){
			var aiOver = self.areasAIRun(seigniorModel);
			if(!aiOver){
				return;
			}
		}
		self.areasRun(seigniorModel);
		return;
	}
	//self.maskHide();
	self.seigniorIndex = 0;
	self.areaIndex = 0;
	SeigniorExecute.running = false;
};
SeigniorExecute.prototype.areaRun=function(area){
	var self = this;
	self.areaIndex++;
	self.areaGainRun(area);
	var stop = self.areaJobRun(area);
	if(stop){
		return;
	}
	self.timer.reset();
	self.timer.start();
};
SeigniorExecute.prototype.areaGainRun=function(area){
	var self = this;
	//TODO::自然灾害
	//金钱
	area.money(area.business());
	//粮食
	area.food(area.agriculture());
	//人口
	area.population(area.business() + area.agriculture());
	console.log("areaGainRun over");
};
SeigniorExecute.addMessage = function(value){
	SeigniorExecute.Instance().msgView.add(value);
};
SeigniorExecute.prototype.areaJobRun=function(area){
	var self = this, chara, job;
	var generals = area.generals();
	console.log("SeigniorExecute.prototype.areaJobRun",generals);
	
	var list = [];
	for(var i=0;i<generals.length;i++){
		chara = generals[i];
		job = chara.job();
		//self.msgView.add(chara.name()+":"+job);
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
			default:
				chara.job(Job.IDLE);
		}
	}
	if(list.length == 0){
		return false;
	}
	for(var i=0;i<list.length;i++){
		chara = list[i];
		job = chara.job();
		switch(job){
			case Job.MOVE:
				chara.moveTo();
				break;
		}
	}
	return false;
};
SeigniorExecute.prototype.areasRun=function(seigniorModel){
	var self = this;
	console.log("self.areaIndex="+self.areaIndex);
	if(self.areaIndex == 0){
		seigniorModel.checkSpyCitys();
		seigniorModel.checkStopBattleSeigniors();
	}
	var areas = seigniorModel.areas();
	if(self.areaIndex < areas.length){
		var areaModel = areas[self.areaIndex];
		
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
	console.log("self.areaAIIndex="+self.areaAIIndex);
	if(self.areaAIIndex == 0){
		
	}
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
SeigniorExecute.prototype.jobAiFunction=function(areaModel, characters, func,params){
	var self = this;
	var length = self.jobNumberOfCharacter(characters);
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
	self.msgView.add(String.format(key,areaModel.name()));
};
SeigniorExecute.prototype.areaAIRun=function(areaModel){
	var self = this;
	//判断是否有未执行任务人员
	self.characters = getIdleCharacters(areaModel);
	self.msgView.add("characters.length:"+self.characters.length);
	if(self.characters.length == 0){
		self.areaAIIndex++;
		self.timer.reset();
		self.timer.start();
		return;
	}
	//是否需要征兵
	var needEnlistFlag = jobAiNeedToEnlist(areaModel);
	//治安
	
	var canEnlish = jobAiCanToEnlish(areaModel);
	if(needEnlistFlag == AiEnlistFlag.Must || needEnlistFlag == AiEnlistFlag.Need){
		if(canEnlish){
			self.areaMessage(areaModel,"{0}在招兵买马!");
			self.jobAiFunction(areaModel,self.characters,jobAiToEnlish,["luck","command"]);
			return;
		}
	}
	//判断是否有可攻击的城池
	var city = getCanBattleCity(areaModel, self.characters, needEnlistFlag);
	if(city){
		jobAiToBattle(areaModel, self.characters, city);
		return;
	}
	//外交
	self.jobAiFunction(areaModel,self.characters,jobAiDiplomacy);
	//武将移动
	jobAiGeneralMove(areaModel,self.characters);
	//输送物资
	jobAiTransport(areaModel,self.characters);
	//谍报
	jobAiSpy(areaModel,self.characters);
	//酒馆
	var toTavern = !(
	(
		needEnlistFlag == AiEnlistFlag.Must || 
		needEnlistFlag == AiEnlistFlag.Need || 
		needEnlistFlag == AiEnlistFlag.MustResource || 
		needEnlistFlag == AiEnlistFlag.NeedResource
	) || 
	(
		(needEnlistFlag == AiEnlistFlag.Battle || needEnlistFlag == AiEnlistFlag.BattleResource) && Math.random() > 0.2) 
	) || 
	(
		(needEnlistFlag == AiEnlistFlag.Free || needEnlistFlag == AiEnlistFlag.None) && Math.random() > 0.5)
	));
	if(toTavern){
		if(areaModel.outOfOffice().length > 0){
			self.jobAiFunction(areaModel,self.characters,jobAiTavern,["luck"]);//录用
		}else{
			self.jobAiFunction(areaModel,self.characters,jobAiAccess,["intelligence","command","luck"]);//访问
		}
	}
	
	self.areaMessage(areaModel,"{0}在发展内政!");
	var toInterior = 
	needEnlistFlag == AiEnlistFlag.Must || 
	needEnlistFlag == AiEnlistFlag.Need || 
	needEnlistFlag == AiEnlistFlag.MustResource || 
	needEnlistFlag == AiEnlistFlag.NeedResource || 
	(
		(needEnlistFlag == AiEnlistFlag.Battle || needEnlistFlag == AiEnlistFlag.BattleResource) && Math.random() > 0.2) 
	) || 
	(
		needEnlistFlag == AiEnlistFlag.Free && Math.random() > 0.5
	);
	if(toInterior){
		//太学院
		self.jobAiFunction(areaModel,self.characters,jobAiInstitute,["intelligence","command"]);
		//农地
		self.jobAiFunction(areaModel,self.characters,jobAiFarmland,["intelligence","force"]);
		//市场
		self.jobAiFunction(areaModel,self.characters,jobAiMarket,["intelligence","agility"]);
	}else{
		if(Math.random() > 0.5){
			//农地探索
			self.jobAiFunction(areaModel,self.characters,jobAiFarmlandExplore,["intelligence","force","luck"]);
		}else{
			//市场探索
			self.jobAiFunction(areaModel,self.characters,jobAiMarketExplore,["intelligence","agility","luck"]);
		}
	}
	//如果有剩余无法分配工作的人员(金钱不够等),则直接跳过
	self.areaAIIndex++;
	self.timer.reset();
	self.timer.start();
};
SeigniorExecute.prototype.maskShow=function(){
	var self = this;
	if(self.backLayer){
		return;
	}
	console.log("SeigniorExecute.prototype.maskShow");
	var maskLayer = getTranslucentMask();
	self.backLayer = new LSprite();
	self.backLayer.addChild(maskLayer);
	self.msgView = new MessageView();
	self.backLayer.addChild(self.msgView);
	var buttonOK = getButton(Language.get("OK"),200);
	buttonOK.x = (self.msgView.getWidth() - 200) * 0.5;
	buttonOK.y = self.msgView.getHeight();
	self.backLayer.addChild(buttonOK);
	buttonOK.addEventListener(LMouseEvent.MOUSE_UP, SeigniorExecute.close);
	LMvc.MapController.view.parent.addChild(self.backLayer);
};
SeigniorExecute.prototype.maskHide=function(){
	var self = this;
	self.backLayer.remove();
	self.backLayer = null;
};