function EventMapView(){
	base(this,LView,[]);
}
EventMapView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
EventMapView.prototype.init=function(){
	var self = this;
	self.layerInit();
	self.menuLayerInit();
};
EventMapView.prototype.layerInit=function(){
	var self = this;
	self.addChild(getBlackBitmap());
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
	self.mapLayer = new LSprite();
	self.baseLayer.addChild(self.mapLayer);
	//人物层
	self.charaLayer = new LSprite();
	self.baseLayer.addChild(self.charaLayer);
	
	self.messageLayer = new LSprite();
	self.baseLayer.addChild(self.messageLayer);
	
	self.clickLayer = new LSprite();
	self.clickLayer.addShape(LShape.RECT,[0,0,LMvc.screenWidth,LMvc.screenHeight]);
	self.clickLayer.addEventListener(LMouseEvent.MOUSE_UP, self.clickToNextScript);
	self.baseLayer.addChild(self.clickLayer);
	self.clickLayer.visible = false;
	//遮挡层
	self.menuLayer = new LSprite();
	self.baseLayer.addChild(self.menuLayer);
};
EventMapView.prototype.clickToNextScript=function(event){
	var self = event.currentTarget.getParentByConstructor(EventMapView);
	if(self.messageLayer.numChildren > 0){
		var msgText = self.messageLayer.getChildAt(0).getChildByName("message");
		if(msgText.windRunning){
			msgText.windComplete();
			return;
		}
		self.messageLayer.removeAllChild();
	}
	self.clickLayer.visible = false;
	LGlobal.script.analysis();
};
EventMapView.prototype.menuLayerInit=function(){
	var self = this;
	var buttonSkip = getButton(Language.get("skip_drama"),100);
	buttonSkip.x = LMvc.screenWidth - 100;
	self.menuLayer.addChild(buttonSkip);
	buttonSkip.addEventListener(LMouseEvent.MOUSE_UP, self.onClickSkipButton);
};
EventMapView.prototype.onClickSkipButton=function(event){
	var self = event.currentTarget.getParentByConstructor(EventMapView);
	LGlobal.script.lineList.unshift("Mark.goto(EventEnd)");
	LGlobal.script.analysis();
};
EventMapView.prototype.addCharacter=function(id,x,y,animation,waitClick){
	var self = this;
	var characterModel = CharacterModel.getChara(id);
	if(!characterModel && id >= 1000){
		characterModel = CharacterModel.getChara(1);
	}
	var face = characterModel.face();
	face.characterId = characterModel.id();
	face.y = y;
	self.charaLayer.addChild(face);
	var animationObj = {ease:LEasing.None.easeIn};
	if(waitClick){
		animationObj.onComplete = function(){
			self.clickLayer.visible = true;
		};
	}else{
		animationObj.onComplete = LGlobal.script.analysis;
	}
	switch(animation){
		case "fade":
		default:
			face.x = parseFloat(x) - 1;
			face.alpha = 0;
			animationObj.alpha = 1;
			animationObj.x = parseFloat(x);
			break;
	}
	LTweenLite.to(face,0.5,animationObj);
};
EventMapView.prototype.removeCharacter=function(id,animation){
	var self = this;
	var face = self.charaLayer.childList.find(function(child){
		return child.characterId == id;
	});
	if(!face && id >= 1000){
		face = self.charaLayer.childList.find(function(child){
			return child.characterId == 1;
		});
	}
	if(!face){
		LGlobal.script.analysis();
		return;
	}
	var animationObj = {ease:LEasing.None.easeIn};
	switch(animation){
		case "fade":
		default:
			animationObj.alpha = 0;
			break;
	}
	animationObj.onComplete = function(event){
		event.target.remove();
		LGlobal.script.analysis();
	};
	LTweenLite.to(face,0.5,animationObj);
};
EventMapView.prototype.mapShow=function(mapIndex){
	var self = this;
	var path = self.model.mapPath(mapIndex);
	var pathTxt = path + ".txt";
	var GameData = LPlugin.GetData("GameData", null);
	if(GameData && LPlugin.dataVer(GameData.ver) > LPlugin.dataVer(LMvc.ver) && GameData.files.findIndex(function(child){return pathTxt == child;}) > 0){
		var key = pathTxt.replace(/\//g,"_");
		var data = LPlugin.GetData(key, null);
		if(data){
			path = data;
		}
	}
	var oldBackground = self.mapLayer.getChildByName("background");
	if(oldBackground){
		LTweenLite.to(oldBackground,0.5,{alpha:0,ease:LEasing.None.easeIn,onComplete:self.removeBackground});
	}
	var bitmapSprite = new BitmapSprite(path);
	bitmapSprite.name = "background";
	bitmapSprite.alpha = 0;
	bitmapSprite.addEventListener(LEvent.COMPLETE, self.loadMapOver);
	self.mapLayer.addChild(bitmapSprite);
};
EventMapView.prototype.removeBackground=function(event){
	event.target.remove();
};
EventMapView.prototype.loadMapOver=function(event){
	var bitmapSprite = event.currentTarget;
	bitmapSprite.removeEventListener(LEvent.COMPLETE);
	bitmapSprite.y = (LMvc.screenHeight - bitmapSprite.getHeight()) * 0.5;
	LTweenLite.to(bitmapSprite,0.5,{alpha:1,ease:LEasing.None.easeIn,onComplete:LGlobal.script.analysis});
};
EventMapView.prototype.messageShow=function(msg, speed){
	var self = this;
	var panel = getPanel("win03",360,300);
	panel.x = (LMvc.screenWidth - 360) * 0.5;
	panel.y = (LMvc.screenHeight - 300) * 0.5;
	var label = getStrokeLabel(msg,20,"#FFFFFF","#000000",4);
	label.name = "message";
	label.width = 320;
	label.x = label.y = 20;
	label.setWordWrap(true,27);
	panel.addChild(label);
	label.speed = LPlugin.gameSetting.speed;
	label.wind();
	self.clickLayer.visible = true;
	self.messageLayer.addChild(panel);
};
EventMapView.prototype.talk=function(id,message){
	var self = this;
	var face = self.charaLayer.childList.find(function(child){
		return child.characterId == id;
	});
	self.charaLayer.setChildIndex(face, self.charaLayer.numChildren - 1);
	self.charaLayer.childList.forEach(function(face){
		if(face.characterId == id && face.alpha < 1){
			LTweenLite.to(face,0.5,{alpha:1,scaleX:1,scaleY:1,ease:LEasing.None.easeIn});
		}else if(face.characterId != id && face.alpha == 1){
			LTweenLite.to(face,0.5,{alpha:0.7,scaleX:0.9,scaleY:0.9,ease:LEasing.None.easeIn});
		}
	});
	Talk(self.messageLayer, id, -1, message, function() {
		LMvc.talkOver = true;
	});
};
