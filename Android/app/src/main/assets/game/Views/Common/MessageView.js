function MessageView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
	self.timer = new LTimer(LGlobal.speed, 1);
	self.timer.addEventListener(LTimerEvent.TIMER, MessageView.SetCurrentSeigniorId);
	self.init();
}
MessageView._Instance = null;
MessageView.Instance = function(){
	if(!MessageView._Instance){
		MessageView._Instance = new MessageView();
	}
	return MessageView._Instance;
};
MessageView.currentSeigniorId = 0;
MessageView.SetCurrentSeigniorId = function(){
	MessageView.Instance().setSeignior(MessageView.currentSeigniorId);
};
MessageView.prototype.removeAllChild=function(){
	var self = this;
	self.listView.clear();
	console.warn("MessageView.prototype.removeAllChild");
};
MessageView.prototype.cached=function(){
	console.warn("MessageView.prototype.cached");
};
MessageView.prototype.die = function(){
	var self = this;
	self.seignior = null;
	self.time = null;
	self.timer.stop();
};
MessageView.prototype.add = function(msg, color){
	var self = this;
	var child = MessageChildView.createChild(msg, color ? color : "#FFFFFF");
	self.listView.insertChildView(child);
	var height = self.listView.cellHeight * self.listView.getItems().length;
	if(height < self.listView.clipping.height){
		return;
	}
	self.listView.clipping.y = height - self.listView.clipping.height;
};
MessageView.prototype.init = function(){
	var self = this;
	var height = 200;
	var backgroundData = new LBitmapData(LMvc.datalist["win03"]);
	var panel = new LPanel(backgroundData,LGlobal.width,height);
	panel.cacheAsBitmap(true);
	panel.y = LGlobal.height - height;
	self.addChild(panel);
	self.listView = new LListView();
	self.listView.x = 5;
	self.listView.y = panel.y + 5;
	self.listView.resize(LGlobal.width - 10,height - 10);
	self.listView.cellWidth = LGlobal.width - 10;
	self.listView.cellHeight = 20;
	self.addChild(self.listView);
	self.panelY = panel.y;
	
	var faceW = 220;
	var faceH = 320;
	var win = new LPanel(new LBitmapData(LMvc.datalist["win05"]),LGlobal.width,faceH);
	win.cacheAsBitmap(true);
	self.addChild(win);
	self.seigniorBackground = win;
	self.seigniorLayer = new LSprite();
	self.addChild(self.seigniorLayer);
};
MessageView.prototype.hideSeignior = function(){
	var self = this;
	self.seigniorBackground.visible = false;
	self.seigniorLayer.visible = false;
};
MessageView.prototype.showSeignior = function(){
	var self = this;
	self.seigniorBackground.visible = true;
	self.seigniorLayer.visible = true;
};
MessageView.prototype.clearSeignior = function(){
	var self = this;
	self.hideSeignior();
	//self.removeChild(self.seigniorBackground);
	//self.removeChild(self.seigniorLayer);
};
MessageView.prototype.setSeignior = function(seigniorId){
	var self = this;
	var waitTime = (LPlugin.gameSetting.speed == 1 ? 1000 : 300);
	if(self.time){
		var time = getTimer();
		if(time - self.time < waitTime){
			MessageView.currentSeigniorId = seigniorId;
			self.timer.reset();
			self.timer.start();
			return;
		}
	}
	self.time = getTimer();
	var faceW = 220;
	var faceH = 320;
	//self.seigniorLayer.removeAllChild();
	
	var seignior = SeigniorModel.getSeignior(seigniorId);
	self.seignior = seignior;
	var layer;
	if(!self.contentLayer){
		layer = new LSprite();
		layer.x = faceW + 10;
		self.seigniorLayer.addChild(layer);
		self.contentLayer = layer;
	}else{
		layer = self.contentLayer;
		layer.cacheAsBitmap(false);
	}
	if(self.face){
		self.face.remove();
	}
	var face = seignior.character().face();
	self.face = face;
	self.seigniorLayer.addChildAt(face, 0);
	if(!self.nameLabel){
		var name = getStrokeLabel("",22,"#FFFFFF","#000000",2,"htmlText");
		name.y = 30;
		layer.addChild(name);
		self.nameLabel = name;
	}
	self.nameLabel.htmlText = String.format(Language.get("seigniorProcess"), seignior.character().name());
	if(!self.city_count){
		var city_count_label = getStrokeLabel(Language.get("city"),20,"#FFFFFF","#000000",2);
		city_count_label.y = 80;
		layer.addChild(city_count_label);
		var city_count = getStrokeLabel("",20,"#FFFFFF","#000000",2);
		city_count.x = city_count_label.x;
		city_count.y = 110;
		layer.addChild(city_count);
		self.city_count = city_count;
	}
	self.city_count.text = seignior.areas().length;
	if(!self.general_count){
		var general_count_label = getStrokeLabel(Language.get("generals"),20,"#FFFFFF","#000000",2);
		general_count_label.y = 150;
		layer.addChild(general_count_label);
		var general_count = getStrokeLabel("",20,"#FFFFFF","#000000",2);
		general_count.x = general_count_label.x;
		general_count.y = 180;
		layer.addChild(general_count);
		self.general_count = general_count;
	}
	self.general_count.text = seignior.generalsCount();
	
	var barWidth = LGlobal.width - layer.x - 20;
	if(!self.barBack){
		var barBack = new LPanel(new LBitmapData(LMvc.datalist["blue_bar"]), barWidth, 14);
		barBack.y = 280;
		layer.addChild(barBack);
		self.barBack = barBack;
	}
	layer.cacheAsBitmap(true);
	if(!self.process){
		var barFore = new LPanel(new LBitmapData(LMvc.datalist["yellow_bar"]), barWidth, 14);
		barFore.cacheAsBitmap(true);
		barFore.x = layer.x;
		barFore.y = 280;
		barFore.scaleX = 0.5;
		self.seigniorLayer.addChild(barFore);
		self.process = barFore;
		self.process.scaleX = 0.01;
	}
	LMvc.MapController.view.positionChangeToCity(seignior.character().city());
	jobAiSetCityBattleDistance(seignior);
};
MessageView.prototype.setSeigniorProcess = function(index){
	var self = this;
	if(!self.seignior){
		var seigniorExecute = SeigniorExecute.Instance();
		var seigniorModel = SeigniorModel.list[seigniorExecute.seigniorIndex];
		self.setSeignior(seigniorModel.chara_id());
	}
	self.process.scaleX = (index + 1) / self.seignior.areas().length;
};
