function SettingGameView(){
	base(this,LView,[]);
}
SettingGameView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
SettingGameView.prototype.layerInit=function(){
	var self = this;
	self.addChild(getTranslucentMask());
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
	self.contentLayer = new LSprite();
	self.addChild(self.contentLayer);
};
SettingGameView.prototype.backgroundInit=function(){
	var self = this;
	var backgroundData = new LBitmapData(LMvc.datalist["win05"]);
	var panel = getBitmap(new LPanel(backgroundData,self.size.x, self.size.y));
	panel.x = (LGlobal.width - self.size.x) * 0.5;
	panel.y = (LGlobal.height - self.size.y) * 0.5;
	self.baseLayer.addChild(panel);
	
	var titleData = new LBitmapData(LMvc.datalist["win02"]);
	var titlePanel = getBitmap(new LPanel(titleData,160,60));
	titlePanel.x = (LGlobal.width - titlePanel.getWidth()) * 0.5;
	titlePanel.y = panel.y - 10;
	self.baseLayer.addChild(titlePanel);
	
	var title = getStrokeLabel("环境设定",20,"#FFFFFF","#000000",4);
	title.x = (LGlobal.width - title.getWidth())*0.5;
	title.y = panel.y + 8;
	self.baseLayer.addChild(title);
};
SettingGameView.prototype.add=function(){
	var self = this;
	self.addChild(getTranslucentMask());
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
};
SettingGameView.prototype.init=function(){
	var self = this;
	self.size = new LPoint(LGlobal.width - 40, 300);
	self.layerInit();
	self.backgroundInit();
	
	self.contentLayer.x = (LGlobal.width - self.size.x) * 0.5 + 20;
	self.contentLayer.y = (LGlobal.height - self.size.y) * 0.5 + 60;
	
	var rangeBackground = new LPanel(new LBitmapData(LMvc.datalist["win04"]),250,40);
	rangeBackground.cacheAsBitmap(true);
	var rangeSelect = new LBitmap(new LBitmapData(LMvc.datalist["range"]));
	var soundLayer = new LSprite();
	self.contentLayer.addChild(soundLayer);
	var soundLabel = getStrokeLabel("音效大小",20,"#FFFFFF","#000000",4);
	soundLabel.y = 12;
	soundLayer.addChild(soundLabel);
	var rangeSound = new LRange(rangeBackground, rangeSelect);
	rangeSound.setValue(LPlugin.volumeSE * 100);
	rangeSound.x = 130;
	soundLayer.addChild(rangeSound);
	rangeSound.addEventListener(LRange.ON_CHANGE, self.onSoundChange);
	
	var rangeBackground = new LPanel(new LBitmapData(LMvc.datalist["win04"]),250,40);
	rangeBackground.cacheAsBitmap(true);
	var rangeSelect = new LBitmap(new LBitmapData(LMvc.datalist["range"]));
	var bgmLayer = new LSprite();
	bgmLayer.y = 80;
	self.contentLayer.addChild(bgmLayer);
	var bgmLabel = getStrokeLabel("音乐大小",20,"#FFFFFF","#000000",4);
	bgmLabel.y = 12;
	bgmLayer.addChild(bgmLabel);
	var rangeBgm = new LRange(rangeBackground, rangeSelect);
	rangeBgm.setValue(LPlugin.volumeBGM * 100);
	rangeBgm.x = 130;
	bgmLayer.addChild(rangeBgm);
	rangeBgm.addEventListener(LRange.ON_CHANGE, self.onBgmChange);
	
	var speedLayer = new LSprite();
	speedLayer.y = 160;
	self.contentLayer.addChild(speedLayer);
	var speedLabel = getStrokeLabel("游戏速度",20,"#FFFFFF","#000000",4);
	speedLabel.y = 3;
	speedLayer.addChild(speedLabel);
	
	var normalLabel = getStrokeLabel("正常",20,"#FFFFFF","#000000",4);
	normalLabel.x = 120;
	normalLabel.y = 3;
	speedLayer.addChild(normalLabel);
	var fastLabel = getStrokeLabel("快速",20,"#FFFFFF","#000000",4);
	fastLabel.x = 220;
	fastLabel.y = 3;
	speedLayer.addChild(fastLabel);
	var radioBackground = new LBitmap(new LBitmapData(LMvc.datalist["checkbox-background"]));
	var radioSelect = new LBitmap(new LBitmapData(LMvc.datalist["checkbox-on"]));
	speedRadio = new LRadio();
	speedRadio.x = 160;
	speedRadio.setChildRadio(1,0,0,radioBackground,radioSelect);
	speedRadio.setChildRadio(2,100,0,radioBackground,radioSelect);
	speedRadio.setValue(2);
	speedLayer.addChild(speedRadio);
	speedRadio.addEventListener(LMouseEvent.MOUSE_UP,self.onSpeedChange);
	
	var bitmapClose = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
	var buttonClose = new LButton(bitmapClose);
	buttonClose.x = (LGlobal.width - self.size.x) * 0.5 + self.size.x - bitmapClose.getWidth()*0.7;
	buttonClose.y = (LGlobal.height - self.size.y) * 0.5 - bitmapClose.getHeight()*0.3;
	self.baseLayer.addChild(buttonClose);
	buttonClose.addEventListener(LMouseEvent.MOUSE_UP,self.closeSelf);
};
SettingGameView.prototype.closeSelf=function(event){
	event.currentTarget.parent.parent.remove();
};
SettingGameView.prototype.onSoundChange=function(event){
	//console.log(event.currentTarget.value);
	LPlugin.volumeSE = event.currentTarget.value * 0.01;
	LPlugin.SetData("volumeSetting", {SE:LPlugin.volumeSE, BGM:LPlugin.volumeBGM});
};
SettingGameView.prototype.onBgmChange=function(event){
	//console.log(event.currentTarget.value);
	LPlugin.volumeBGM = event.currentTarget.value * 0.01;console.log(LPlugin.volumeBGM);
	LPlugin.SetData("volumeSetting", {SE:LPlugin.volumeSE, BGM:LPlugin.volumeBGM});
};
SettingGameView.prototype.onSpeedChange=function(event){
	console.log(event.currentTarget.value);
};