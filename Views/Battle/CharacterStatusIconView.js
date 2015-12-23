function CharacterStatusIconView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
	self.status = [];
	self.aidStatus = [];
	self.statusPositions = {};
	self.statusPositions[StrategyType.Chaos] = 0;
	self.statusPositions[StrategyType.Poison] = 1;
	self.statusPositions[StrategyType.Fixed] = 2;
	self.statusPositions[StrategyType.BanIncantation] = 3;
	self.statusPositions[StrategyType.Burn] = 4;
	var bitmaoData = new LBitmapData(LMvc.datalist["battle_status"],0,0,16,16);
	self.bitmap = new LBitmap(bitmaoData);
	self.bitmap.visible = false;
	self.addChild(self.bitmap);
	self.speed = 15;
	self.speedIndex = 0;
	self.index = 0;
	self.addEventListener(LEvent.ENTER_FRAME,self.onframe);
}
CharacterStatusIconView.prototype.onframe = function(event){
	var self = event.currentTarget;
	if(self.status.length == 0 || self.speedIndex++ < self.speed){
		return;
	}
	self.speedIndex = 0;
	if(self.index > self.status.length - 1){
		self.index = 0;
	}
	var status = self.status[self.index++];
	self.bitmap.bitmapData.setCoordinate(self.statusPositions[status.mode] * 16, 0);
};
CharacterStatusIconView.prototype.downloadAidStatusRandom = function(){
	var self = this;
	var aids =[StrategyType.AttackAid,StrategyType.DefenseAid,StrategyType.ApiritAid,StrategyType.BreakoutAid,StrategyType.MoraleAid];
	var mode = aids[aids.length * Math.random() >>> 0];
	self.addStatus(mode,-0.2);
}
CharacterStatusIconView.prototype.addStatus = function(mode,value){
	var self = this, status, isAid = false;
	if(typeof self.statusPositions[mode] == UNDEFINED){
		status = self.aidStatus;
		isAid = true;
	}else{
		status = self.status;
	}
	//{mode:??,p:0.1}
	for(var i = 0;i<status.length;i++){
		var child = status[i];
		if(child.mode == mode){
			self.updateStatus(child, isAid, value, i);
			return;
		}
	}
	status.push({mode:mode, p:0.1, value:value});
	if(isAid){
		return;
	}
	self.bitmap.bitmapData.setCoordinate(self.statusPositions[mode] * 16, 0);
	self.bitmap.visible = true;
	self.index = status.length - 1;
	self.speedIndex = self.speed;
};
CharacterStatusIconView.prototype.updateStatus = function(child, isAid, value, index){
	var self = this;
	child.p = 0.1;
	if(!isAid){
		self.index = index;
		self.speedIndex = self.speed;
		return;
	}
	if(child.value != value){
		self.aidStatus.splice(index, 1);
	}
};
CharacterStatusIconView.prototype.wake = function(){
	this.status.length = 0;
	this.bitmap.visible = false;
};
CharacterStatusIconView.prototype.needWake = function(){
	return this.status.length > 0;
};
CharacterStatusIconView.prototype.removeStatus = function(status){
	var self = this;
	if(!status){
		self.removeStatus(self.status);
		self.removeStatus(self.aidStatus);
		if(self.status.length == 0){
			self.bitmap.visible = false;
		}
		return;
	}
	if(status.length == 0){
		return;
	}
	for(var i = status.length-1;i>=0;i--){
		var child = self.status[i];
		if(Math.random() < child.p){
			status.splice(i, 1);
		}else{
			child.p += (child.p < 0.5 ? 0.1 : 0);
		}
	}
};
CharacterStatusIconView.prototype.hasStatus = function(mode){
	return this.getStatus(mode) != null;
};
CharacterStatusIconView.prototype.getStatus = function(mode){
	var self = this;
	if(typeof self.statusPositions[mode] == UNDEFINED){
		status = self.aidStatus;
	}else{
		status = self.status;
	}
	var status = status.find(function(child){
		return child.mode == mode;
	});
	return status;
};
CharacterStatusIconView.prototype.statusLabel = function(){
	var self = this, label = [], child;
	for(var i = 0;i<self.status.length;i++){
		label.push(Language.get(StrategyTypeToString[self.status[i].mode])); 
	}
	for(var i = 0;i<self.aidStatus.length;i++){
		child = self.aidStatus[i];
		label.push(Language.get(StrategyTypeToString[child.mode] + "_" + (child.value > 0 ? "up" : "down"))); 
	}
	if(label.length == 0){
		return Language.get("null");
	}
	return label.join(",");
};
CharacterStatusIconView.prototype.getData = function(){
	var self = this;
	return {status:self.status,aidStatus:self.aidStatus};
};
CharacterStatusIconView.prototype.setData = function(data){
	var self = this;
	self.status = data.status;
	self.aidStatus = data.aidStatus;
};