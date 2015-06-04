function BattleView(){
	base(this,LView,[]);
}
BattleView.prototype.construct=function(){
};
BattleView.prototype.layerInit=function(){
	var self = this;
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
	self.characterMenu = new CharacterMenuView(self.controller);
	self.addChild(self.characterMenu);
	self.commandMenu = new CommandMenuView(self.controller);
	self.addChild(self.commandMenu);
	self.powerLayer = new PowerView(self.controller);
	self.addChild(self.powerLayer);
	
	self.backLayer = new BattleBackgroundView();
	self.baseLayer.addChild(self.backLayer);
	self.castleLayer = new LSprite();
	self.baseLayer.addChild(self.castleLayer);
	self.charaLayer = new LSprite();
	self.baseLayer.addChild(self.charaLayer);
	self.numLayer = new LSprite();
	self.baseLayer.addChild(self.numLayer);
	self.effectLayer = new LSprite();
	self.addChild(self.effectLayer);
};
BattleView.prototype.backLayerInit=function(){
	var self = this;
	self.backLayer.set();
	self.width = self.backLayer.getWidth();
	self.height = self.backLayer.getHeight();
};
BattleView.prototype.castleLayerInit=function(){
	var self = this;
	//enemy castle
	var data = new CastleModel(self.controller,{maxHp:100});
	var castle = new CastleView(self.controller,data);
	castle.set(Character.BELONG_ENEMY);
	castle.x = LGlobal.width*0.5;
	castle.y = castle.getHeight()*0.5;
	self.castleLayer.addChild(castle);
	self.enemyCastle = castle;
	
	//our castle
	var data = new CastleModel(self.controller,{maxHp:100});
	castle = new CastleView(self.controller,data);
	castle.set(Character.BELONG_OUR);
	castle.x = LGlobal.width*0.5;
	castle.y = self.height - castle.getHeight()*0.5;
	self.castleLayer.addChild(castle);
	self.ourCastle = castle;
	console.log("BattleView.prototype.castleLayerInit over");
};
BattleView.prototype.init=function(){
	var self = this;
	self.layerInit();
	console.log("BattleView.prototype.init layerInit");
	self.backLayerInit();
	console.log("BattleView.prototype.init backLayerInit");
	self.characterMenu.set();
	console.log("BattleView.prototype.init characterMenu");
	self.commandMenu.set();
	console.log("BattleView.prototype.init commandMenu");
	self.powerLayer.set();
	console.log("BattleView.prototype.init powerLayer");
	self.baseLayer.addEventListener(LMouseEvent.MOUSE_DOWN, self.controller.mapMouseDown);
	self.baseLayer.addEventListener(LMouseEvent.MOUSE_UP, self.controller.mapMouseUp);
	self.addEventListener(LEvent.ENTER_FRAME, self.onframe);
	
	self.controller.quadTree = new LQuadTree(new LRectangle(0,0,self.width,self.height));
	self.controller.quadTree.createChildren(4);
	console.log("BattleView.prototype.init quadTree");
	self.battleInit();
	console.log("BattleView.prototype.init battleInit");
	//var a = new BattleNextView();
	//self.addChild(a);
	/*
	var layer = new LSprite();
	layer.alpha = 0.2;
	self.backLayer.addChild(layer);
	layer.graphics.drawRect(1, "#000000", [0, 0, LGlobal.width, LGlobal.height]);
	for(var i=1;i<10;i++){
		layer.graphics.drawLine(1, "#000000", [i*BattleMapConfig.STEP_WIDTH, 0, i*BattleMapConfig.STEP_WIDTH, LGlobal.height*2]);
	}
	for(var i=1;i<30;i++){
		layer.graphics.drawLine(1, "#000000", [0, i*BattleMapConfig.STEP_HEIGHT, LGlobal.width, i*BattleMapConfig.STEP_HEIGHT]);
	}
	*/
};
BattleView.prototype.battleInit=function(){
	var self = this;
	self.model.stepInit();
	self.baseLayer.y = LGlobal.height - self.height;
	//self.charaLayer.removeAllChild();
	for(var i=self.model.enemyCharacterList.length-1;i>=0;i--){
		var chara = self.model.enemyCharacterList[i];
		chara.remove();
	}
	console.log("BattleView.prototype.battleInit empty init");
	for(var i=self.model.ourCharacterList.length-1;i>=0;i--){
		var chara = self.model.ourCharacterList[i];
		var x = (LGlobal.width*0.2 + LGlobal.width*0.6*Math.random()) >>> 0;
		var y = self.height - BattleMapConfig.STEP_HEIGHT + (Math.random()*BattleMapConfig.STEP_HEIGHT >>> 0);
		chara.setActionDirection(CharacterAction.STAND,CharacterDirection.UP);
		chara.setCoordinate(x,y);
	}
	console.log("BattleView.prototype.battleInit ourCharacterList init");
	self.castleLayer.removeAllChild();
	self.castleLayerInit();
	console.log("BattleView.prototype.battleInit castleLayerInit");
	self.powerLayer.power.setValue(0);
	self.controller.mode = BattleMapConfig.GameBattle;
};
BattleView.prototype.addFireGod = function(){
	var self = this;
	var bitmapDataChara = new LBitmapData(LMvc.datalist["face-5"]);
	var bitmapCharaLeft = new LBitmap(bitmapDataChara);
	bitmapCharaLeft.alpha = 0.5;
	bitmapCharaLeft.x = -bitmapCharaLeft.getWidth();
	bitmapCharaLeft.y = (LGlobal.height -bitmapCharaLeft.getHeight())*0.5;
	var bitmapCharaRight = bitmapCharaLeft.clone();
	bitmapCharaRight.y = bitmapCharaRight.y;
	bitmapCharaRight.alpha = 0.5;
	bitmapCharaRight.x = LGlobal.width;
	var toX = (LGlobal.width - bitmapCharaLeft.getWidth()) * 0.5;
	var bitmapDataSecBar = new LBitmapData(LMvc.datalist["secBar"]);
	var bitmapSecBar = new LBitmap(bitmapDataSecBar);
	bitmapSecBar.y = -bitmapSecBar.getHeight()*0.5;
	var secBar = new LSprite();
	secBar.addChild(bitmapSecBar);
	self.effectLayer.addChild(secBar);
	secBar.y = LGlobal.height*0.5;
	secBar.scaleX = LGlobal.width/bitmapDataSecBar.width;
	secBar.scaleY = 0.1;
	var toScaleY = (bitmapDataChara.height + 40)/bitmapDataSecBar.height;
	
	self.effectLayer.addChild(bitmapCharaLeft);
	self.effectLayer.addChild(bitmapCharaRight);
	
	LTweenLite.to(secBar,0.5,{scaleY:toScaleY,onComplete:function(){
		var txt = new LTextField();
		txt.text = "火神";
		txt.size = 50;
		txt.color = "#FFFFFF";
		txt.lineColor = "#FF0000";
		txt.lineWidth = 5;
		txt.stroke = true;
		txt.x = (LGlobal.width - txt.getWidth()) * 0.5;
		txt.y = (LGlobal.height - txt.getHeight()) * 0.5;
		self.effectLayer.addChild(txt);
		LTweenLite.to(bitmapCharaRight,1,{x:toX})
		LTweenLite.to(bitmapCharaLeft,1,{x:toX,onComplete:function(){
			LTweenLite.to(self.effectLayer,0.5,{alpha:0.1,onComplete:function(){
				self.effectLayer.removeAllChild();
				self.effectLayer.alpha = 1;
				self.addFireGodView();
			}});
		}})
	}})
};
BattleView.prototype.addFireGodView = function(){
	var self = this;
	var fire = new FireGodView(self.controller);
	self.addChild(fire);
};
BattleView.prototype.onframe=function(event){
	if(LMvc.stop)return;
	var self = event.currentTarget;
    self.charaLayer.childList = self.charaLayer.childList.sort(function(a,b){return a.y - b.y;});
	var baseLayer = self.baseLayer;
	baseLayer.x = 0;
	if(baseLayer.y > 0){
		baseLayer.y = 0;
	}else if(baseLayer.y < LGlobal.height - self.height){
		baseLayer.y = LGlobal.height - self.height;
	}
};
