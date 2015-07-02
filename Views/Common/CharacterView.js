function CharacterView(controller,id,w,h){
	var self = this;
	base(self,LView,[controller]);
	self.id = id;
	self.data = CharacterModel.getChara(self.id);
	self.list = {};
	self.to = new LPoint(self.x,self.y);
	self.roads = [];
	self.layer = new LSprite();
	self.addChild(self.layer);
	self.layer.x = 0;
	self.layer.y = 0;
	self.w = w;
	self.h = h;
	self.step = self.moveStep = 2;
	self.moveBevelStep = self.moveStep*Math.sin(45*Math.PI/180);
	self.moveBevelStep = (self.moveBevelStep*100 >>> 0)/100;

	
	self.directionList = {
		"-1,-1":CharacterDirection.LEFT_UP,
		"-1,0":CharacterDirection.LEFT,
		"-1,1":CharacterDirection.LEFT_DOWN,
		"0,-1":CharacterDirection.UP,
		"0,1":CharacterDirection.DOWN,
		"1,-1":CharacterDirection.RIGHT_UP,
		"1,0":CharacterDirection.RIGHT,
		"1,1":CharacterDirection.RIGHT_DOWN
	};
	self.coordinateRects = {};
	self.layer.addEventListener(LEvent.ENTER_FRAME,self.onframe);
	self.setActionDirection(CharacterAction.STAND,CharacterDirection.DOWN);
}
CharacterView.prototype.histTestOn = function(x,y){
	var s = this.rect;
	return x>=s[0] && x <= s[2] && y>= s[1] && y <= s[3];
};
CharacterView.prototype.setActionDirection = function(action,direction){
	var self = this;
	if(self.action == action && self.direction == direction)return;
	var key = action+"-"+direction;
	if(!self.list[key]){
		self.list[key] = new Action(self.data[self.RS],action,direction,self.data[self.RS+"Width"],self.data[self.RS+"Height"],self.RS);
		self.layer.addChild(self.list[key]);
	}
	if(self.actionObject){
		self.actionObject.visible = false;
	}
	self.actionObject = self.list[key];
	self.actionObject.visible = true;
	self.action = action;
	self.direction = direction;
};
CharacterView.prototype.changeAction = function(action){
	var self = this;
	self.setActionDirection(action,self.direction);
};
CharacterView.prototype.changeDirection = function(direction){
	var self = this;
	self.setActionDirection(self.action,direction);
};
CharacterView.prototype.setMoveDirection = function(x,y){
	var self = this;
	var direction = self.directionList[x+","+y];
	self.setActionDirection(CharacterAction.MOVE,direction);
};
CharacterView.prototype.setCoordinate = function(x,y){
	var self = this;
	self.x = self.to.x = x;
	self.y = self.to.y = y;
};
CharacterView.prototype.locationX = function(){
	return this.x/this.w >>> 0;
};
CharacterView.prototype.locationY = function(){
	return this.y/this.h >>> 0;
};
CharacterView.prototype.getTo = function(){
	var self = this;
	return [self.to.x/self.w >>> 0,self.to.y/self.h >>> 0];
};
CharacterView.prototype.setTo = function(){
	var self = this;
	var road = self.roads.shift();
	self.to.x = road.x*self.w;
	self.to.y = road.y*self.h;	
};
CharacterView.prototype.getValue = function(v1,v2){
	if(v1 == v2)return 0;
	return v1 < v2 ? 1 : -1;
};
CharacterView.prototype.checkCoordinate = function(controller,initFlag){
	var self = this;
	var model=controller.model,i,obj,rect,rects = model.atRect,coor;
	for(i=0;i<rects.length;i++){
		obj = rects[i];
		rect = obj.rect;
		if(obj.index != self.index){
			continue;
		}
		coor = self.getTo();
		if(coor[0] >= rect.x && coor[0] <= rect.right && 
			coor[1] >= rect.y && coor[1] <= rect.bottom){
			if(self.coordinateRects[obj.fun]){
				continue;
			}
			self.coordinateRects[obj.fun] = true;
			if(initFlag){
				continue;
			}
			if(ScriptFunction){
				ScriptFunction.analysis("Call."+obj.fun + "();");
			}
		}else if(self.coordinateRects[obj.fun]){
			self.coordinateRects[obj.fun]= null;
		}
	}
};
CharacterView.prototype.move = function(){
	var self = this,controller=self.parent.parent.parent.controller;
	if(self.x == self.to.x && self.y == self.to.y)return;
	
	if(self.x != self.to.x && self.y != self.to.y){
		self.step = self.moveBevelStep;
	}else{
		self.step = self.moveStep;
	}
	var mx = self.getValue(self.x , self.to.x),my = self.getValue(self.y , self.to.y);
	self.x += self.step*mx;
	self.y += self.step*my;
	var cx = self.getValue(self.x , self.to.x),cy = self.getValue(self.y , self.to.y);
	if(mx != cx || my != cy){
		if(self.roads.length == 0){
			self.x = self.to.x;
			self.y = self.to.y;
			self.changeAction(CharacterAction.STAND);
			if(controller){
				if(controller.mapMove)controller.mapMove();
				self.checkCoordinate(controller);
			}
			self.dispatchEvent(CharacterActionEvent.MOVE_COMPLETE);
			return;
		}
		var next = self.roads[0];
		var nx = self.getValue(self.to.x , next.x),ny = self.getValue(self.to.y , next.y);
		if(mx != nx || my != ny){
			self.x = self.to.x;
			self.y = self.to.y;
		}
		if(self.roads.length > 0){
			self.setTo();
			self.checkCoordinate(controller);
		}
		
	}
	self.setMoveDirection(mx,my);
	if(controller && controller.mapMove)controller.mapMove();
};
CharacterView.prototype.onframe = function(event){
	var self = event.currentTarget.parent;
};
CharacterView.prototype.setRoad = function(list){
	var self = this;
	self.roads = list;
	if(self.to.x == self.x && self.to.y == self.y)self.setTo();
};

