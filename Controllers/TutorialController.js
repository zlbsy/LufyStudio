function TutorialController(){
	base(this,MyController,[]);
}
TutorialController.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.loadChapterList);
};
TutorialController.prototype.loadChapterList = function(){
	var self = this;
	self.load.config(["MapSetting","chapterListSetting"],self.init);
};
TutorialController.prototype.end=function(){
	var self = this;
	self.view.remove();
	LMvc.TutorialController = null;
};
TutorialController.prototype.init=function(){
	var self = this;
	AreaModel.setArea(MapSetting);
	LMvc.TutorialController = self;
	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY);
	LMvc.logoStage.controller.showChapter(0);
	LMvc.layer.parent.addChild(self.view);
	LMvc.keepLoading(false);
	var path = String.format("Data/Event/{0}/tutorial.txt",LPlugin.language());
	LGlobal.script.addScript("Load.script("+path+");");
};
TutorialController.prototype.waitTime = function(millisecond){
	var self = this;
	self.timer = new LTimer(millisecond, 1);
	self.timer.addEventListener(LTimerEvent.TIMER, function(e){
		self.timer.destroy();
		LGlobal.script.analysis();
	});
	self.timer.start();
};
TutorialController.prototype.wait = function(path, name, visible){
	var self = this, func;
	var sprite = self.getObject(path);
	if(visible === "0"){
		if(!sprite){
			func = LGlobal.script.analysis;
		}else{
			if(name && name !== "0"){
				sprite = self.getObjectFromChilds(sprite, name);
			}
			if(!sprite || !sprite.visible){
				func = LGlobal.script.analysis;
			}
		}
	}else if(sprite){
		if(name && name !== "0"){
			sprite = self.getObjectFromChilds(sprite, name);
		}
		if(sprite && sprite.visible){
			func = LGlobal.script.analysis;
		}
	}
	if(!func){
		func = function(){
			self.wait(path, name, visible);
		};
	}
	self.nextFrameExecute(func);
};
TutorialController.prototype.talk=function(id, message){
	this.view.talk(id,message);
};
TutorialController.prototype.getObject=function(path){
	var sprites = path.split(".");
	var sprite = window[sprites[0]];
	for(var i=1;i<sprites.length;i++){
		sprite = sprite[sprites[i]];
		if(sprite == null){
			return null;
		}
	}
	return sprite;
};
TutorialController.prototype.getObjectFromChilds=function(sprite, name){
	var self = this;
	if(!sprite || !sprite.getChildByName){
		return null;
	}
	var target = sprite.getChildByName(name);
	if(target){
		return target;
	}
	for(var i=0;i<sprite.numChildren;i++){
		var parent = sprite.childList[i];
		target = self.getObjectFromChilds(parent, name);
		if(target){
			return target;
		}
	}
	return null;
};
TutorialController.prototype.clickMask=function(path, name, width, height, fromX, fromY){
	var self = this;
	var sprite = self.getObject(path);
	var target = name == "0" ? sprite : self.getObjectFromChilds(sprite, name);
	var root = target.getRootCoordinate();
	if(typeof fromX == UNDEFINED || typeof fromY == UNDEFINED){
		fromX = 0;
		fromY = 0;
	}else{
		fromX = parseInt(fromX);
		fromY = parseInt(fromY);
	}
	if(!width){
		width = target.getWidth();
	}else if(width == "LGlobal.width"){
		width = LGlobal.width;
	}else{
		width = parseInt(width);
	}
	if(!height){
		height = target.getHeight();
	}else if(height == "LGlobal.height"){
		height = LGlobal.height;
	}else{
		height = parseInt(height);
	}
	self.view.setMask(new LRectangle(root.x + fromX, root.y + fromY, width, height));
};
TutorialController.prototype.call=function(path, name, method){
	var self = this;
	var sprite = self.getObject(path);
	if(name !== "0"){
		sprite = self.getObjectFromChilds(sprite, name);
	}
	var params = [];
	for(var i=3;i<arguments.length;i++){
		params.push(arguments[i]);
	}
	sprite[method].apply(sprite, params);
	LGlobal.script.analysis();
};
