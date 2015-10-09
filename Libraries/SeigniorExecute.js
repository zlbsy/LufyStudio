function SeigniorExecute(){
	var self = this;
	self.seigniorIndex = 0;
	self.areaIndex = 0;
	if(!self.timer){
		self.timer = new LTimer(LGlobal.speed, 1);
	}
	self.timer.addEventListener(LTimerEvent.TIMER, SeigniorExecute.run);

};
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
		self.msgView.add(seigniorModel.character().name() + "势力行动!");
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
	self.areaAIIndex = 0;
	return true;
};
SeigniorExecute.prototype.areaAIRun=function(areaModel){
	var self = this;
	//判断是否有未执行任务人员
	var characters = getIdleCharacters(areaModel);
	if(characters.length == 0){
		self.areaAIIndex++;
		return;
	}
	//是否需要征兵
	var needEnlistFlag = jobAiNeedToEnlist(areaModel);
	var canEnlish = jobAiCanToEnlish(areaModel);
	if(needEnlistFlag == AiEnlistFlag.Must || needEnlistFlag == AiEnlistFlag.Need){
		if(canEnlish){
			jobAiToEnlish(areaModel,characters);
			return;
		}
	}
	//判断是否有可攻击的城池
	var city = getCanBattleCity(areaModel, characters, needEnlistFlag);
	if(city){
		
		return;
	}
	//外交
	jobAiDiplomacy(areaModel,characters);
	//武将移动
	jobAiGeneralMove(areaModel,characters);
	//输送物资
	jobAiTransport(areaModel,characters);
	//谍报
	jobAiSpy(areaModel,characters);
	//酒馆
	jobAiTavern(areaModel,characters);
	//太学院
	jobAiInstitute(areaModel,characters);
	//农地
	jobAiFarmland(areaModel,characters);
	//市场
	jobAiAgriculture(areaModel,characters);
	//如果有剩余无法分配工作的人员(金钱不够等),则直接跳过
	self.areaAIIndex++;
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