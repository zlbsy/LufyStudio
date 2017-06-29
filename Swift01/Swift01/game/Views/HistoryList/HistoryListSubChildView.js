function HistoryListSubChildView(characterId) {
	var self = this;console.log("HistoryListSubChildView");
	base(self, LListChildView, []);
	self.characterId = characterId;
	self.set();
}
HistoryListSubChildView.prototype.layerInit=function(){
	var self = this;
	self.layer = new LSprite();
	self.addChild(self.layer);
};
HistoryListSubChildView.prototype.iconComplete=function(event){
	var self = event.currentTarget.getParentByConstructor(HistoryListSubChildView);
	self.cacheAsBitmap(false);
	self.updateView();
};
HistoryListSubChildView.prototype.getWidth=function(){
	return 55;
};
HistoryListSubChildView.prototype.getHeight=function(){
	return 65;
};
HistoryListSubChildView.prototype.set=function(){
	var self = this;
	self.layerInit();
	var characterModel = CharacterModel.getChara(self.characterId);
	var charaImg = characterModel.currentSoldiers().icon(new LPoint(48, 48),self.iconComplete);
	self.hasCharacter = (characterModel.seigniorId() == LMvc.selectSeignorId);
	charaImg.alpha = self.hasCharacter ? 1 : 0.4;
	//charaImg.x = j * 55;
	self.layer.addChild(charaImg);
	var name = getStrokeLabel(characterModel.name(),14,"#FFFFFF","#000000",4);
	name.x = charaImg.x + (48-name.getWidth())*0.5;
	name.y = 48;
	self.layer.addChild(name);
};
HistoryListSubChildView.prototype.onClick = function(event) {
	var self = event.target;
	if(!self.hasCharacter){
		return;
	}
	if(!self.focus){
		self.focus = getPanel("focus",60,65);
		self.layer.addChild(self.focus);
		self.focus.x = -5;
		self.focus.y = -6;
		self.focus.visible = false;
	}
	self.focus.visible = !self.focus.visible;
	self.cacheAsBitmap(false);
	self.updateView();
	var listView = event.currentTarget;
	var detailView = listView.getParentByConstructor(HistoryListDetailedView);
	detailView.changeSubCount(self.focus.visible?1:-1);
};