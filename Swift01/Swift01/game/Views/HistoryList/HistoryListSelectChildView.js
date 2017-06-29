function HistoryListSelectChildView(characterIds) {
	var self = this;
	base(self, LListChildView, []);
	self.characterIds = characterIds;
	self.set();
}
HistoryListSelectChildView.prototype.layerInit=function(){
	var self = this;
	self.layer = new LSprite();
	self.addChild(self.layer);
	var bitmapLine = new LBitmap(new LBitmapData(LMvc.datalist["icon-line"]));
	bitmapLine.scaleX = self.getWidth();
	bitmapLine.y = self.getHeight() - 1;
	self.layer.addChild(bitmapLine);
};
HistoryListSelectChildView.prototype.iconComplete=function(event){
	var self = event.currentTarget.getParentByConstructor(HistoryListSelectChildView);
	self.characterComplete++;
	if(self.characterComplete < self.characterIds.length){
		return;
	}
	self.cacheAsBitmap(false);
	self.updateView();
};
HistoryListSelectChildView.prototype.getWidth=function(){
	return 440;
};
HistoryListSelectChildView.prototype.getHeight=function(){
	return 56;
};
HistoryListSelectChildView.prototype.set=function(){
	var self = this;
	self.layerInit();
	self.characterComplete = 0;
	for (var j = 0; j < self.characterIds.length; j++) {
		var characterModel = CharacterModel.getChara(self.characterIds[j]);
		var charaImg = characterModel.currentSoldiers().icon(new LPoint(48, 48),self.iconComplete);
		charaImg.alpha = characterModel.seigniorId() == LMvc.selectSeignorId ? 1 : 0.4;
		charaImg.x = j * 55;
		//charaImg.y = i * 60;
		self.layer.addChild(charaImg);
		var name = getStrokeLabel(characterModel.name(),14,"#FFFFFF","#000000",4);
		name.x = charaImg.x + (48-name.getWidth())*0.5;
		name.y = 39;
		self.layer.addChild(name);
	}
};
HistoryListSelectChildView.prototype.onClick = function(event) {
	var self = event.target;
	var index = (event.selfX / 55 >>> 0);
	if(index >= self.characterIds.length){
		return;
	}
	var characterId = self.characterIds[index];
	var characterModel = CharacterModel.getChara(characterId);
	if(characterModel.seigniorId() != LMvc.selectSeignorId){
		return;
	}
	/*if(self.focus){
		return;
	}*/
	if(!self.focus){
		var listView = event.currentTarget;
		var detailView = listView.getParentByConstructor(HistoryListDetailedView);
		detailView.changeMustCount();
		
		self.focus = getPanel("focus",60,65);
		self.layer.addChild(self.focus);
		self.focus.y = -6;
	}
	self.focus.x = (event.selfX / 55 >>> 0) * 55 - 5;
	self.cacheAsBitmap(false);
	self.updateView();
	self.selectCharacter = characterModel;
};