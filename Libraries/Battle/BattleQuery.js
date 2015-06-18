function BattleQuery(map){
	var self = this;
	base(self,LObject,[]);
	base(self,LStarQuery,[]);
	self.queryType = 1;
	self._map = [];
	self._w = map[0].length;
	self._h = map.length;
        for (var y=0; y<self._h; y++) {
		self._map.push([]);
	        for (var x=0; x<self._w; x++) {
			self._map[y].push(new MapNode(x,y,map[y][x]));
	        }
	}
}
BattleQuery.prototype.setPathAll = function(px,py,value){
	var self = this;
	if(self._enemyCost[px+"-"+py] != null && self._enemyCost[px+"-"+py] >= 200)return;
	if(value == -1){
		self._enemyCost[px+"-"+py] = "all";
		return;
	}
	self._enemyCost[px+"-"+py] = value;
};
BattleQuery.prototype.makePath = function(chara){
	var self = this;
	self._chara = chara;
	self._path = [];
	var isOver = false;
	self.setStart();
	self._enemyCost = {};
	var thisChara;
	if(chara.belong == CharacterConfig.BELONG_SELF || chara.belong == CharacterConfig.BELONG_FRIEND){
		for(var i=0;i<LMvc.BattleController.model.enemyList.length;i++){
			thisChara = LMvc.BattleController.model.enemyList[i];
			if(thisChara.visible){
				self._enemyCost[thisChara.locationX() + "-" + thisChara.locationY()] = 255;
				self.setPathAll((thisChara.locationX() - 1) , thisChara.locationY() , -1);
				self.setPathAll((thisChara.locationX() + 1) , thisChara.locationY() , -1);
				self.setPathAll(thisChara.locationX() , (thisChara.locationY() - 1) , -1);
				self.setPathAll(thisChara.locationX() , (thisChara.locationY() + 1) , -1);
			}
		}
	}else if(chara.belong == CharacterConfig.BELONG_ENEMY){
		for(var i=0;i<LMvc.BattleController.model.ourList.length;i++){
			thisChara = LMvc.BattleController.model.ourList[i];
			if(thisChara.visible){
				self._enemyCost[thisChara.locationX() + "-" + thisChara.locationY()] = 255;
				self.setPathAll((thisChara.locationX() - 1) , thisChara.locationY() , -1);
				self.setPathAll((thisChara.locationX() + 1) , thisChara.locationY() , -1);
				self.setPathAll(thisChara.locationX() , (thisChara.locationY() - 1) , -1);
				self.setPathAll(thisChara.locationX() , (thisChara.locationY() + 1) , -1);
			}
		}
		for(var i=0;i<LMvc.BattleController.model.friendList.length;i++){
			thisChara = LMvc.BattleController.model.friendList[i];
			if(thisChara.visible){
				self._enemyCost[thisChara.locationX() + "-" + thisChara.locationY()] = 255;
				self.setPathAll((thisChara.locationX() - 1) , thisChara.locationY() , -1);
				self.setPathAll((thisChara.locationX() + 1) , thisChara.locationY() , -1);
				self.setPathAll(thisChara.locationX() , (thisChara.locationY() - 1) , -1);
				self.setPathAll(thisChara.locationX() , (thisChara.locationY() + 1) , -1);
			}
		}
	}
	self._starPoint = self._map[chara.locationY()][chara.locationX()];
	var soldier = self._chara.data.currentSoldiers();
	self._starPoint.moveLong = soldier.movePower();
	console.log("self._starPoint.moveLong = " + self._starPoint.moveLong);
	self.loopPath(self._starPoint);
	return self._path;
};
BattleQuery.prototype.loopPath = function(thisPoint){
	var self = this;
	if (thisPoint.moveLong <= 0)return;
	if (!thisPoint.isChecked) {
		self._path.push(thisPoint);
		thisPoint.isChecked = true;
	}
	var checkList = [];
	//获取周围四个点
	if (thisPoint.y > 0)checkList.push(self._map[(thisPoint.y-1)][thisPoint.x]);
	if (thisPoint.x > 0)checkList.push(self._map[thisPoint.y][(thisPoint.x-1)]);
	if (thisPoint.x < self._w - 1)checkList.push(self._map[thisPoint.y][(thisPoint.x+1)]);
	if (thisPoint.y < self._h - 1)checkList.push(self._map[(thisPoint.y+1)][thisPoint.x]);
	var i;
	for (i=0; i<checkList.length; i++) {
		var checkPoint = checkList[i];
		if(!checkPoint.moveLong)checkPoint.moveLong = 0;
		if(checkPoint.isChecked && checkPoint.moveLong >= thisPoint.moveLong)continue;
		var soldier = self._chara.data.currentSoldiers();
		var cost = soldier.terrain(self._map[checkPoint.y][checkPoint.x].value).moveCost;
		console.log("cost = " + cost,soldier.terrain(self._map[checkPoint.y][checkPoint.x].value));
		cost += self._enemyCost[checkPoint.x + "-" + checkPoint.y] != null && self._enemyCost[checkPoint.x + "-" + checkPoint.y] != "all" ? self._enemyCost[checkPoint.x + "-" + checkPoint.y]:0;
		checkPoint.moveLong = thisPoint.moveLong - cost;
		if (self._enemyCost[checkPoint.x + "-" + checkPoint.y] == "all" && checkPoint.moveLong > 1)checkPoint.moveLong = 1;
		self.loopPath(checkPoint);
	}
};
BattleQuery.prototype.setStart = function(){
	var self=this,node;
	self.callParent("setStart",arguments);
	var roadList = LMvc.BattleController.view.roadLayer.roadList;
	if(!roadList)return;
	for(var i=0;i<roadList.length;i++){
		node = roadList[i];
        self._map[node.y][node.x].isRoad = true;
	}
};
/*判断是否可通过*/
BattleQuery.prototype.isWay = function(checkPoint,thisPoint){
	if (this._map[checkPoint.y][checkPoint.x].isRoad) return true;
	return false;
};
function MapNode(_x,_y,_v){
	var self = this;
	base(self,LObject,[]);
	base(self,LNode,[_x,_y,_v]);
	self.isRoad = false;
}
MapNode.prototype.init = function(){
	var self = this;
	self.callParent("init",arguments);
	self.isRoad = false;
};
MapNode.prototype.toString = function(){
	return "["+this.x+","+this.y+","+this.isRoad+"]";
};
