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
	var panel = getPanel("win05",self.size.x, self.size.y);
	panel.x = (LMvc.screenWidth - self.size.x) * 0.5;
	panel.y = (LMvc.screenHeight - self.size.y) * 0.5;
	self.baseLayer.addChild(panel);
	
	var titlePanel = getPanel("win02",160,60);
	titlePanel.x = (LMvc.screenWidth - titlePanel.getWidth()) * 0.5;
	titlePanel.y = panel.y - 10;
	self.baseLayer.addChild(titlePanel);
	
	var title = getStrokeLabel(Language.get("game_setting"),20,"#FFFFFF","#000000",4);
	title.x = (LMvc.screenWidth - title.getWidth())*0.5;
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
	self.size = new LPoint(LMvc.screenWidth - 40, 300);
	self.layerInit();
	self.backgroundInit();
	
	self.contentLayer.x = (LMvc.screenWidth - self.size.x) * 0.5 + 20;
	self.contentLayer.y = (LMvc.screenHeight - self.size.y) * 0.5 + 60;
	
	var checkboxBackgroundData = new LBitmapData(LMvc.datalist["checkbox-background"]);
	var checkboxOnData = new LBitmapData(LMvc.datalist["checkbox-on"]);
	var radioBackground, radioSelect;
	var soundLayer = new LSprite();
	self.contentLayer.addChild(soundLayer);
	var soundLabel = getStrokeLabel(Language.get("se_set"),20,"#FFFFFF","#000000",4);
	soundLabel.y = 12;
	soundLayer.addChild(soundLabel);
	
	var enabledLabel = getStrokeLabel(Language.get("enabled"),20,"#FFFFFF","#000000",4);
	enabledLabel.x = 120;
	enabledLabel.y = 13;
	soundLayer.addChild(enabledLabel);
	var disabledLabel = getStrokeLabel(Language.get("disabled"),20,"#FFFFFF","#000000",4);
	disabledLabel.x = 220;
	disabledLabel.y = 13;
	soundLayer.addChild(disabledLabel);
	
	radioBackground = new LBitmap(checkboxBackgroundData);
	radioSelect = new LBitmap(checkboxOnData);
	seRadio = new LRadio();
	seRadio.x = 160;
	seRadio.setChildRadio(1,0,10,radioBackground,radioSelect);
	seRadio.setChildRadio(0,100,10,radioBackground,radioSelect);
	seRadio.setValue(LPlugin.gameSetting.SE);
	soundLayer.addChild(seRadio);
	seRadio.addEventListener(LMouseEvent.MOUSE_UP,self.onSEChange);

	var bgmLayer = new LSprite();
	bgmLayer.y = 70;
	self.contentLayer.addChild(bgmLayer);
	var bgmLabel = getStrokeLabel(Language.get("bgm_set"),20,"#FFFFFF","#000000",4);
	bgmLabel.y = 12;
	bgmLayer.addChild(bgmLabel);
	
	var enabledLabel = getStrokeLabel(Language.get("enabled"),20,"#FFFFFF","#000000",4);
	enabledLabel.x = 120;
	enabledLabel.y = 13;
	bgmLayer.addChild(enabledLabel);
	var disabledLabel = getStrokeLabel(Language.get("disabled"),20,"#FFFFFF","#000000",4);
	disabledLabel.x = 220;
	disabledLabel.y = 13;
	bgmLayer.addChild(disabledLabel);
	bgmRadio = new LRadio();
	bgmRadio.x = 160;
	bgmRadio.setChildRadio(1,0,10,radioBackground,radioSelect);
	bgmRadio.setChildRadio(0,100,10,radioBackground,radioSelect);
	bgmRadio.setValue(LPlugin.gameSetting.BGM);
	bgmLayer.addChild(bgmRadio);
	bgmRadio.addEventListener(LMouseEvent.MOUSE_UP,self.onBgmChange);
	
	var speedLayer = new LSprite();
	speedLayer.y = 160;
	self.contentLayer.addChild(speedLayer);
	var speedLabel = getStrokeLabel(Language.get("game_speed"),20,"#FFFFFF","#000000",4);
	speedLabel.y = 3;
	speedLayer.addChild(speedLabel);
	
	var normalLabel = getStrokeLabel(Language.get("speed_normal"),20,"#FFFFFF","#000000",4);
	normalLabel.x = 120;
	normalLabel.y = 3;
	speedLayer.addChild(normalLabel);
	var fastLabel = getStrokeLabel(Language.get("speed_fast"),20,"#FFFFFF","#000000",4);
	fastLabel.x = 220;
	fastLabel.y = 3;
	speedLayer.addChild(fastLabel);
	var radioBackground = new LBitmap(checkboxBackgroundData);
	var radioSelect = new LBitmap(checkboxOnData);
	speedRadio = new LRadio();
	speedRadio.x = 160;
	speedRadio.setChildRadio(1,0,0,radioBackground,radioSelect);
	speedRadio.setChildRadio(0,100,0,radioBackground,radioSelect);
	speedRadio.setValue(LPlugin.gameSetting.speed);
	speedLayer.addChild(speedRadio);
	speedRadio.addEventListener(LMouseEvent.MOUSE_UP,self.onSpeedChange);
	
	var bitmapClose = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
	var buttonClose = new LButton(bitmapClose);
	buttonClose.x = (LMvc.screenWidth - self.size.x) * 0.5 + self.size.x - bitmapClose.getWidth() - 7;
	buttonClose.y = (LMvc.screenHeight - self.size.y) * 0.5 + 7;
	self.baseLayer.addChild(buttonClose);
	buttonClose.addEventListener(LMouseEvent.MOUSE_UP,self.closeSelf);
};
SettingGameView.prototype.closeSelf=function(event){
	event.currentTarget.parent.parent.remove();
};
SettingGameView.prototype.onSEChange=function(event){
	LPlugin.gameSetting.SE = event.currentTarget.value;
	LPlugin.SetData("gameSetting", {SE:LPlugin.gameSetting.SE, BGM:LPlugin.gameSetting.BGM, speed:LPlugin.gameSetting.speed});
};
SettingGameView.prototype.onBgmChange=function(event){
	LPlugin.gameSetting.BGM = event.currentTarget.value;
	if(!LPlugin.gameSetting.BGM){
		LPlugin.playBGM("map", 0);
	}
	LPlugin.SetData("gameSetting", {SE:LPlugin.gameSetting.SE, BGM:LPlugin.gameSetting.BGM, speed:LPlugin.gameSetting.speed});
};
SettingGameView.prototype.onSpeedChange=function(event){
	LPlugin.gameSetting.speed = event.currentTarget.value;
	LPlugin.SetData("gameSetting", {SE:LPlugin.gameSetting.SE, BGM:LPlugin.gameSetting.BGM, speed:LPlugin.gameSetting.speed});
};