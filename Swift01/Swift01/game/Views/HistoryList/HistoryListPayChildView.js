function HistoryListPayChildView(characterId) {
	var self = this;console.log("HistoryListPayChildView");
	base(self, LListChildView, []);
	self.characterId = characterId;
	self.set();
}
HistoryListPayChildView.prototype.layerInit=function(){
	var self = this;
	self.layer = new LSprite();
	self.addChild(self.layer);
};
HistoryListPayChildView.prototype.iconComplete=function(event){
	var self = event.currentTarget.getParentByConstructor(HistoryListPayChildView);
	self.cacheAsBitmap(false);
	self.updateView();
};
HistoryListPayChildView.prototype.getWidth=function(){
	return 65;
};
HistoryListPayChildView.prototype.getHeight=function(){
	return 56;
};
HistoryListPayChildView.prototype.set=function(){
	var self = this;
	self.layerInit();
	var characterModel = CharacterModel.getChara(self.characterId);
	var charaImg = characterModel.currentSoldiers().icon(new LPoint(48, 48),self.iconComplete);
	charaImg.x=(self.getWidth() - 48)*0.5;
	self.layer.addChild(charaImg);
	if(!purchaseHasBuy(productIdConfig["history_"+self.characterId])){
		lockedButton(self.layer, 0.3);
	}
	var name = getStrokeLabel(characterModel.name(),14,"#FFFFFF","#000000",4);
	name.x = charaImg.x + (48-name.getWidth())*0.5;
	name.y = 39;
	self.layer.addChild(name);
};
HistoryListPayChildView.prototype.onClick = function(event) {
	var self = event.target;
	if(self.lock){
		return;
	}
	if(!self.focus){
		self.focus = getPanel("focus",65,65);
		self.layer.addChild(self.focus);
		//self.focus.x = -5;
		self.focus.y = -6;
		self.focus.visible = false;
	}
	self.focus.visible = !self.focus.visible;
	self.cacheAsBitmap(false);
	self.updateView();
	/*var listView = event.currentTarget;
	var detailView = listView.getParentByConstructor(HistoryListDetailedView);
	detailView.changeSubCount(self.focus.visible?1:-1);*/
};