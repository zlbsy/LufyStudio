function CharacterStatusView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
	self.status = [];
	self.statusPositions = {};
	self.statusPositions[StrategyType.Chaos] = 0;
	self.statusPositions[StrategyType.Poison] = 1;
	self.statusPositions[StrategyType.Fixed] = 2;
	self.statusPositions[StrategyType.BanIncantation] = 3;
	var bitmaoData = new LBitmapData(LMvc.datalist["battle_status"],0,0,16,16);
	self.bitmap = new LBitmap(bitmaoData);
	self.bitmap.visible = false;
	self.addChild(self.bitmap);
	self.speed = 15;
	self.speedIndex = 0;
	self.index = 0;
	self.addEventListener(LEvent.ENTER_FRAME,self.onframe);
}
CharacterStatusView.prototype.onframe = function(event){
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
CharacterStatusView.prototype.addStatus = function(mode){
	var self = this;
	//{mode:??,p:0.1}
	for(var i = 0;i<self.status.length;i++){
		var child = self.status[i];
		if(child.mode == mode){
			child.p = 0.1;
			self.index = i;
			self.speedIndex = self.speed;
			return;
		}
	}
	self.status.push({mode:mode,p:0.1});
	self.bitmap.bitmapData.setCoordinate(self.statusPositions[mode] * 16, 0);
	self.bitmap.visible = true;
};
CharacterStatusView.prototype.removeStatus = function(){
	var self = this;
	if(self.status.length == 0){
		return;
	}
	for(var i = self.status.length-1;i>=0;i--){
		var child = self.status[i];
		if(Math.random() < child.p){
			self.status.splice(i, 1);
		}else{
			child.p += (child.p < 0.5 ? 0.1 : 0);
		}
	}
	if(self.status.length == 0){
		self.bitmap.visible = false;
	}
};
CharacterStatusView.prototype.hasStatus = function(mode){
	var status = this.status.find(function(child){
		return child.mode == mode;
	});
	return status != null;
};