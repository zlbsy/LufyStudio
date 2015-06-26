function BattleRoadView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
	var map = self.model.map;
	self.blueData = new LBitmapData(LMvc.datalist["rect"],0,0,self.model.stepWidth,self.model.stepHeight);
	self.redData = new LBitmapData(LMvc.datalist["rect"],self.model.stepWidth,0,self.model.stepWidth,self.model.stepHeight);
	self.greenData = new LBitmapData(LMvc.datalist["rect"],self.model.stepWidth*4,0,self.model.stepWidth,self.model.stepHeight);
	self.redRange = new LBitmapData(LMvc.datalist["rect"],self.model.stepWidth*2,0,self.model.stepWidth,self.model.stepHeight);
	self.blueRange = new LBitmapData(LMvc.datalist["rect"],self.model.stepWidth*3,0,self.model.stepWidth,self.model.stepHeight);
	var bitmapData = new LBitmapData(null,0,0,map.width,map.height,LBitmapData.DATA_CANVAS);
	self.bitmap = new LBitmap(bitmapData);
	self.addChild(self.bitmap);
	self.addEventListener(LEvent.ENTER_FRAME, self.onframe);
	self.clear();
}
BattleRoadView.prototype.setMoveRoads = function(nodes,belong){
	var self = this;
	self.clear();
	self.roadList = nodes;
	self.setRoads(nodes, belong == Belong.SELF ? self.blueData : self.greenData);
};
BattleRoadView.prototype.setRangeAttack = function(chara){
	var self = this,solider,ranges,range,x,y,nodes = [];
	x = chara.locationX();
	y = chara.locationY();
	solider = chara.data.currentSoldiers();
	ranges = solider.rangeAttack();
	for(var i=0;i<ranges.length;i++){
		range = ranges[i];
		nodes.push(new LPoint(x + range.x,y + range.y));
	}
	self.setRoads(nodes, self.redData);
};
BattleRoadView.prototype.addRangeAttack = function(chara){
	var self = this,solider,ranges,range,x,y,nodes = [];
	x = chara.locationX();
	y = chara.locationY();
	solider = chara.data.currentSoldiers();
	ranges = solider.rangeAttack();
	for(var i=0;i<ranges.length;i++){
		range = ranges[i];
		nodes.push(new LPoint(x + range.x,y + range.y));
	}
	self.setRoads(nodes, self.redRange);
};
BattleRoadView.prototype.setRoads = function(nodes,data){
	var self = this;
	self.visible = true;
	for(var i=0;i<nodes.length;i++){
		var node = nodes[i];
		var x = node.x*self.model.stepWidth;
		var y = node.y*self.model.stepHeight;
		self.addShape(LShape.RECT,[x,y, self.model.stepWidth, self.model.stepHeight]);
		self.bitmap.bitmapData.copyPixels(data, new LRectangle(0, 0, self.model.stepWidth, self.model.stepHeight), new LPoint(x,y));
	}
};
BattleRoadView.prototype.setStrategyRoads = function(nodes,chara){
	var self = this,x,y;
	self.clear();
	self.strategyList = [];
	x = chara.locationX();
	y = chara.locationY();
	for(var i=0,l=nodes.length;i<l;i++){
		var node = nodes[i];
		self.strategyList.push(new LPoint(x + node.x,y + node.y));
	}
	self.setRoads(self.strategyList, self.blueData);
};
BattleRoadView.prototype.clear = function(){
	var self = this;
	self.visible = false;
	self.bitmap.bitmapData.clear();
	self.clearShape();
};
BattleRoadView.prototype.onframe = function(event){
	var self = event.currentTarget;
	self.bitmap.x = -self.parent.x;
	self.bitmap.y = -self.parent.y;
	self.bitmap.bitmapData.setProperties(self.bitmap.x,self.bitmap.y,LGlobal.width,LGlobal.height);
};