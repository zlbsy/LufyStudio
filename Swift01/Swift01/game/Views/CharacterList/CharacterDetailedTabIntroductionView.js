function CharacterDetailedTabIntroductionView(controller, w, h){
	var self = this;
	base(self,LView,[controller]);
	self.tabWidth = w;
	self.tabHeight = h;
}
CharacterDetailedTabIntroductionView.prototype.updateView=function(){
	var self = this;
	self.showStatus();
};
CharacterDetailedTabIntroductionView.prototype.showStatus=function(){
	var self = this;
	self.removeAllChild();
	var txtHeight = 27, startY = 5, startX = 5;
	var statusLayer = new LSprite();
	var characterModel = self.controller.getValue("selectedCharacter");
	var lblIntroduction = getStrokeLabel("",20,"#FFFFFF","#000000",4);
	lblIntroduction.width = self.tabWidth;
	lblIntroduction.x = startX;
	lblIntroduction.y = startY;
	statusLayer.addChild(lblIntroduction);
	LAjax.get(LMvc.introductionURL, {n:characterModel.id(), l:LPlugin.language()}, function(data){
		lblIntroduction.text = data;
		lblIntroduction.setWordWrap(true, txtHeight);
		statusLayer.graphics.drawRect(0, "#000000", [0, 0, self.tabWidth, lblIntroduction.getHeight() + 10]);
		statusLayer.cacheAsBitmap(true);
	},function(){
		lblIntroduction.text = "Could Not Connect to Internet Error !!";
		lblIntroduction.setWordWrap(true, txtHeight);
		statusLayer.graphics.drawRect(0, "#000000", [0, 0, self.tabWidth, lblIntroduction.getHeight() + 10]);
		statusLayer.cacheAsBitmap(true);
	});
	var backLayer = new LSprite();
	backLayer.addChild(statusLayer);
	var sc = new LScrollbar(backLayer, self.tabWidth, self.tabHeight, 10);
	self.addChild(sc);
};