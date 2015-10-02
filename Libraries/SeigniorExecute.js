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
	return true;
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
	LMvc.MapController.view.parent.addChild(self.backLayer);
};
SeigniorExecute.prototype.maskHide=function(){
	var self = this;
	self.backLayer.remove();
	self.backLayer = null;
};