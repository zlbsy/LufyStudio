function SingleCombatView(controller){
	var self = this;
	base(self,LView,[controller]);
	self.characterY = 230 - 48;
}
SingleCombatView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
SingleCombatView.prototype.init=function(){
	var self = this;
	self.backLayer = new LSprite();

	self.characterLayer = new LSprite();
	self.addChild(self.characterLayer);
	self.backLayerInit();
	self.characterLayerInit();
	
	var vsBitmap = new LBitmap(new LBitmapData(LMvc.datalist["battle-vs"]));
	vsBitmap.x = (LGlobal.width - vsBitmap.getWidth()) * 0.5;
	self.backLayer.addChild(vsBitmap);
	
	self.addChildAt(getBitmap(self.backLayer),0);
	
	self.ctrlLayer = new LSprite();
	self.ctrlLayer.y = LGlobal.height - 100;
	self.addChild(self.ctrlLayer);
	
	self.commandLayer = new LSprite();
	//self.commandLayer.y = self.characterY - self.ctrlLayer.y + 96 + i*50;
	self.addChild(self.commandLayer);
	
	self.startSingleCombat();
};
SingleCombatView.prototype.backLayerInit=function(){
	var self = this;
	var bitmapData = new LBitmapData(LMvc.datalist["singleCombatBackground"],0,0,LGlobal.width,LGlobal.height);
	var bitmap = new LBitmap(bitmapData);
	self.backLayer.addChild(bitmap);
	bitmapData = new LBitmapData(LMvc.datalist["singleCombatForeground"]);
	bitmap = new LBitmap(bitmapData);
	bitmap.x = (LGlobal.width - bitmap.getWidth()) * 0.5;
	bitmap.y = 210;
	self.backLayer.addChild(bitmap);
};
SingleCombatView.prototype.characterLayerInit=function(){
	var self = this;
	
	var currentCharacter = new SingleCombatCharacterView(null,self.controller.currentCharacterId,BattleCharacterSize.width,BattleCharacterSize.height);
	currentCharacter.scaleX = currentCharacter.scaleY = 2;
	self.characterLayer.addChild(currentCharacter);
	currentCharacter.setCoordinate(LGlobal.width * 0.5 - 96 - 96,self.characterY);
	currentCharacter.changeDirection(CharacterDirection.RIGHT);
	self.faceLayerInit(currentCharacter.data,true);
	
	var targetCharacter = new SingleCombatCharacterView(null,self.controller.targetCharacterId,BattleCharacterSize.width,BattleCharacterSize.height);
	targetCharacter.scaleX = targetCharacter.scaleY = 2;
	self.characterLayer.addChild(targetCharacter);
	targetCharacter.setCoordinate(LGlobal.width * 0.5 + 96,self.characterY);
	targetCharacter.changeDirection(CharacterDirection.LEFT);
	self.faceLayerInit(targetCharacter.data,false);
	
	self.leftCharacter = currentCharacter;
	self.rightCharacter = targetCharacter;
	/*
	var button01 = new LButtonSample1("单挑测试");
	button01.x = 200;
	button01.y = 490;
	self.addChild(button01);
	button01.addEventListener(LMouseEvent.MOUSE_UP,self.showSingleCombat.bind(self));
	self.leftHpView.changeValue(-20);
	*/
};
SingleCombatView.prototype.addCtrlButton=function(){
	var self = this;
	for(var i = 0;i<self.leftCharacter.maxCommand;i++){
		var child = getButton(Language.get(self.leftCharacter.commands[i]),80);
		child.x = LGlobal.width;
		self.ctrlLayer.addChild(child);
		child.addEventListener(LMouseEvent.MOUSE_UP,self.onButtonSelect);
		LTweenLite.to(child,0.4 - i * 0.05,{x:i * 80});
	}
};
SingleCombatView.prototype.onButtonSelect=function(event){
	var button = event.currentTarget;
	var self = button.parent.parent;
	if(button.y < 0){
		var index = self.ctrlLayer.getChildIndex(button);
		LTweenLite.to(button,0.4 - index * 0.05,{x:index * 80, y:0});
		index = self.leftCharacter.selectedButtons.findIndex(function(child){
			return child.objectIndex == button.objectIndex;
		});
		self.leftCharacter.selectedButtons.splice(index,1);
	}else{
		if(self.leftCharacter.selectedButtons.length >= 2){
			return;
		}
		self.leftCharacter.selectedButtons.push(button);
		for(var i = 0;i<self.leftCharacter.selectedButtons.length;i++){
			button = self.leftCharacter.selectedButtons[i];
			var completeEvent = self.buttonMoveComplete;
			if(i == 0){
				completeEvent = null;
			}
			LTweenLite.to(button,0.2,{x:self.leftCharacter.x + 8,y:self.characterY - self.ctrlLayer.y + 96 + i*50, onComplete:completeEvent});
		}
	}
};
SingleCombatView.prototype.buttonMoveComplete=function(event){
	var self = event.target.parent.parent;
	if(self.leftCharacter.selectedButtons.length < 2){
		return;
	}
	console.log("start");
	LGlobal.destroy = false;
	for(var i = self.ctrlLayer.numChildren - 1;i>=0;i--){
		var child = self.ctrlLayer.childList[i];
		if(child.y < 0){
			child.die();
			self.ctrlLayer.removeChild(child);
			child.y += self.ctrlLayer.y;
			self.commandLayer.addChild(child);
			continue;
		}
		LTweenLite.to(child,0.4 - i * 0.05,{x:LGlobal.width});
	}
	LGlobal.destroy = true;
	self.rightCharacter.toSelectCommand();
	/*
		var effect = new SpecialEffectView(self.controller);
		self.addChild(effect);
		return;
		var list = LGlobal.divideCoordinate(5760, 72, 1, 12);
	    var data = new LBitmapData(LMvc.datalist["big_attack_1"], 0, 0, 480, 72);
	    var anime = new LAnimationTimeline(data, list);
	    anime.speed = 2;
	    self.addChild(anime);
	    
	    var data = new LBitmapData(LMvc.datalist["big_attack_2"], 0, 0, 480, 72);
	    var anime = new LAnimationTimeline(data, list);
	    anime.y = 120;
	    anime.speed = 2;
	self.addChild(anime);*/
	
};
SingleCombatView.prototype.tweenButton=function(button){
	var self = this;
	var index = self.ctrlLayer.getChildIndex(button);
	LTweenLite.to(button,0.4 - index * 0.05,{x:index * 80,onComplete:self.addCtrlButton.bind(self)});
};
SingleCombatView.prototype.startSingleCombat=function(event){
	var self = this;
	var obj = [{x:0,y:20,tx:LGlobal.width},{x:0,y:150,tx:LGlobal.width},{x:100,y:20,tx:-LGlobal.width},{x:100,y:150,tx:-LGlobal.width}];
	obj.forEach(function(child){
		var cloud = new LBitmap(new LBitmapData(LMvc.datalist["domestic_clouds"]));
		cloud.x = child.x;
		cloud.y = child.y;
		self.addChild(cloud);
		LTweenLite.to(cloud,2,{x:child.tx,onComplete:function(s){
			s.remove();
		}});
	});
	
	
	self.leftCharacter.alpha = 0;
	self.rightCharacter.alpha = 0;
	LTweenLite.to(self.leftCharacter,1,{alpha:1,onStart:function(){
		self.leftCharacter.moveTo(LGlobal.width * 0.5 - 96,230 - 48);
		var talk = new SingleCombatTalkView(self.controller,"单挑talk测试单挑talk测试",true);
		talk.x = self.leftCharacter.x + 48;
		talk.y = self.leftCharacter.y + 5;
		self.addChild(talk);
	}});
	LTweenLite.to(self.rightCharacter,1,{alpha:1,delay:1,onComplete:self.addCtrlButton.bind(self),onStart:function(){
		self.rightCharacter.moveTo(LGlobal.width * 0.5,230 - 48);
		var talk = new SingleCombatTalkView(self.controller,"单挑talk测试单挑talk测试",true);
		talk.x = self.rightCharacter.x + 48;
		talk.y = self.rightCharacter.y + 5;
		self.addChild(talk);
	}});
};
SingleCombatView.prototype.faceLayerInit=function(characterModel,isLeft){
	var self = this;
	var faceSize = 100, startPosition = 10;
	var win = new LPanel(new LBitmapData(LMvc.datalist["win05"]),220,160);
	win.x = isLeft ? 0 : LGlobal.width - win.getWidth();
	self.backLayer.addChild(win);
	var face = characterModel.minFace(faceSize);
	face.x = isLeft ? startPosition : LGlobal.width - faceSize - startPosition;
	face.y = startPosition;
	self.characterLayer.addChild(face);
	
	var name = getStrokeLabel(characterModel.name(),20,"#FFFFFF","#000000",2);
	name.x = isLeft ? face.x + faceSize + startPosition * 0.5: win.x + startPosition;
	name.y = startPosition;
	self.backLayer.addChild(name);
	var formatForce = "武力 : {0}";
	var force = getStrokeLabel(String.format(formatForce, characterModel.force()),18,"#FFFFFF","#000000",2);
	force.x = name.x;
	force.y = name.y + name.getHeight() + startPosition;
	self.backLayer.addChild(force);

	var barHp = new StatusBarView(self.controller);
	barHp.y = face.y + faceSize;
	var obj = {maxValue:100,currentValue:100,name:"HP",icon:"icon_hert",frontBar:"red_bar",barSize:170};
	barHp.set(obj);
	barHp.x = isLeft ? startPosition : LGlobal.width - barHp.getWidth() - startPosition;
	self.characterLayer.addChild(barHp);

	var barAngry = new StatusBarView(self.controller);
	barAngry.x = barHp.x;
	barAngry.y = barHp.y + barHp.getHeight();
	var obj = {maxValue:100,currentValue:0,name:"怒气",icon:"orange_ball",frontBar:"orange_bar",barSize:170};
	barAngry.set(obj);
	self.characterLayer.addChild(barAngry);
	if(isLeft){
		self.leftHpView = barHp;
		self.leftAngryView = barAngry;
	}else{
		self.rightHpView = barHp;
		self.rightAngryView = barAngry;
	}
};