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
	self.alpha = 1;
	self.clear();
	self.roadList = nodes;
	self.setRoads(nodes, belong == Belong.SELF ? self.blueData : self.greenData);
};
BattleRoadView.prototype.setRangeSingleCombat = function(chara){
	var self = this,solider,ranges,range,x,y,nodes = [];
	x = chara.locationX();
	y = chara.locationY();
	ranges = [{x:0,y:1},{x:0,y:-1},{x:1,y:0},{x:-1,y:0}];	
	for(var i=0;i<ranges.length;i++){
		range = ranges[i];
		nodes.push(new LPoint(x + range.x,y + range.y));
	}
	self.setRoads(nodes, self.redData);
};
BattleRoadView.prototype.setRangeAttack = function(chara){
	var self = this,solider,ranges,range,x,y,nodes = [];
	self.alpha = 1;
	x = chara.locationX();
	y = chara.locationY();
	ranges = chara.data.rangeAttack();
	for(var i=0;i<ranges.length;i++){
		range = ranges[i];
		nodes.push(new LPoint(x + range.x,y + range.y));
	}
	self.setRoads(nodes, self.redData);
	if(chara.belong != Belong.SELF){
		return;
	}
	for(var i=0;i<nodes.length;i++){
		var node = nodes[i];
		var target = chara.controller.view.charaLayer.getCharacterFromLocation(node.x, node.y);
		if(!target || target.hideByCloud || isSameBelong(chara.belong, target.belong)){
			continue;
		}
		var layer = new LSprite();
		var m = new LTextField();
		m.setWordWrap(true, 14);
		m.size = 12;
		m.text = String.format(Language.get("hurt_preview"), calculateHertValue(chara,target,1,true), calculateHitrate(chara,target,true));
		m.color = "#ffffff";
		m.lineColor = "#000000";
		m.lineWidth = 2;
		m.stroke = true;
		m.x = 1;
		m.y = self.model.stepHeight - m.getHeight() - 2;
		layer.addChild(m);
		var bitmapData = getBitmapData(layer);
		var x = node.x*self.model.stepWidth;
		var y = node.y*self.model.stepHeight;
		self.bitmap.bitmapData.copyPixels(bitmapData, new LRectangle(0, 0, self.model.stepWidth, self.model.stepHeight), new LPoint(x,y));
	}
};
BattleRoadView.prototype.setAttackStatus = function(chara){
	var self = this,solider,ranges,range,x,y,nodes = [];
	x = chara.locationX();
	y = chara.locationY();
	ranges = chara.data.rangeAttack();
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
	ranges = chara.data.rangeAttack();
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
BattleRoadView.prototype.setStrategyRoads = function(nodes,chara,addSelf){
	var self = this,x,y;
	self.clear();
	self.strategyList = [];
	x = chara.locationX();
	y = chara.locationY();
	if(addSelf){
		self.strategyList.push(new LPoint(x,y));
	}
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
BattleRoadView.prototype.charaToMove = function(lx,ly){
	var self = this;
	self.controller.charaToMove(lx,ly);
};