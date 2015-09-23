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
	}
	console.log("self.seigniorIndex="+self.seigniorIndex);
	if(self.seigniorIndex < SeigniorModel.list.length){
		var seigniorModel = SeigniorModel.list[self.seigniorIndex];
		self.areasRun(seigniorModel);
		return;
	}
	self.maskHide();
	self.seigniorIndex = 0;
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
SeigniorExecute.prototype.areaJobRun=function(area){
	var self = this, chara, job;
	var generals = area.generals();
	console.log("SeigniorExecute.prototype.areaJobRun",generals);
	var list = [];
	for(var i=0;i<generals.length;i++){
		chara = generals[i];
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
			case Job.ENLIST:
				chara.enlist();
				break;
			case Job.HIRE:
				chara.hire();
				break;
			case Job.SPY:
				chara.spy();
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
	if(self.areaIndex == 0){
		seigniorModel.checkSpyCitys();
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
SeigniorExecute.prototype.maskShow=function(){
	var self = this;
	if(self.backLayer){
		return;
	}
	self.backLayer = getTranslucentMask();
	LMvc.MapController.view.parent.addChild(self.backLayer);
};
SeigniorExecute.prototype.maskHide=function(){
	var self = this;
	self.backLayer.remove();
	self.backLayer = null;
};