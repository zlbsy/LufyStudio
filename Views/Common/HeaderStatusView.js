function HeaderStatusView(controller){
	var self = this;
	base(self,LView,[controller]);
}
HeaderStatusView.prototype.get=function(value){
	return this.cityFree ? value : "***";
};
HeaderStatusView.prototype.set=function(){
	var self = this;
	self.x = 10;
	self.y = 10;
	self.stepWidth = 150;
	self.stepMiniWidth = 100;
	self.stepHeight = 30;
	self.cityFree = self.controller.getValue("cityFree");
	var cityModel = self.controller.getValue("cityData");
	var panel = new LPanel(new LBitmapData(LMvc.datalist["background-header"]),300,50);
	panel.x = 5;
	self.addChild(panel);
	var title = getStrokeLabel(String.format(Language.get("city_title"), LMvc.chapterData.year, LMvc.chapterData.month, cityModel.name(), cityModel.size()),24,"#FFFFFF","#000000",2);
	title.x = 5;
	title.y = 10;
	panel.addChild(title);
	var seigniorCharacterName = "***";
	if(cityModel.seignior_chara_id()){
		 seigniorCharacterName = CharacterModel.getChara(cityModel.seignior_chara_id()).name();
	}
	var prefectureCharacterName = "***";
	if(cityModel.prefecture()){
		 prefectureCharacterName = CharacterModel.getChara(cityModel.prefecture()).name();
	}
	self.setStatus(Language.get("seignior"), seigniorCharacterName, self.stepWidth * 2 + 5, 0, self.stepWidth);
	self.setStatus(Language.get("prefecture"), prefectureCharacterName, self.stepWidth * 2 + 5, self.stepHeight, self.stepWidth);
	
	self.setStatus(Language.get("business"), self.get(cityModel.business()), self.stepMiniWidth * 0 + 5, self.stepHeight * 2, self.stepMiniWidth);
	self.setStatus(Language.get("agriculture"), self.get(cityModel.agriculture()), self.stepMiniWidth * 0 + 5, self.stepHeight * 3, self.stepMiniWidth);
	self.setStatus(Language.get("technology"), self.get(cityModel.technology()), self.stepMiniWidth  * 0+ 5, self.stepHeight * 4, self.stepMiniWidth);
	
	self.setStatus(Language.get("city_defense"), self.get(cityModel.cityDefenseLabel()), self.stepMiniWidth * 1 + 5, self.stepHeight * 2, self.stepMiniWidth + 20);
	self.setStatus(Language.get("troops"), self.get(cityModel.troopsSum()), self.stepMiniWidth * 1 + 5, self.stepHeight * 3, self.stepMiniWidth + 20);
	self.setStatus(Language.get("police"), self.get(cityModel.police()), self.stepMiniWidth * 1 + 5, self.stepHeight * 4, self.stepMiniWidth + 20);
	
	self.setStatus(Language.get("generals"), self.get(cityModel.generalsSum()), self.stepMiniWidth * 2 + 5 + 20, self.stepHeight * 2, self.stepMiniWidth - 20);
	self.setStatus(Language.get("out_of_office"), self.get(cityModel.outOfOfficeSum()), self.stepMiniWidth * 2 + 5 + 20, self.stepHeight * 3, self.stepMiniWidth - 20);
	self.setStatus(Language.get("captive"), self.get(cityModel.captiveSum()), self.stepMiniWidth * 2 + 5 + 20, self.stepHeight * 4, self.stepMiniWidth - 20);
	
	self.setStatus(Language.get("population"), self.get(cityModel.populationLabel()), self.stepMiniWidth * 3 + 5, self.stepHeight * 2, self.stepWidth);
	self.setStatus(Language.get("money"), self.get(cityModel.moneyLabel()), self.stepMiniWidth * 3 + 5, self.stepHeight * 3, self.stepWidth);
	self.setStatus(Language.get("food"), self.get(cityModel.foodLabel()), self.stepMiniWidth * 3 + 5, self.stepHeight * 4, self.stepWidth);
};
HeaderStatusView.prototype.updateView = function(){
	var self = this;
	self.die();
	self.removeAllChild();
	self.set();
};
HeaderStatusView.prototype.setStatus=function(label,value,x,y,stepWidth,size){
	var self = this;
	var layer = new LSprite();
	var panel = new LPanel(new LBitmapData(LMvc.datalist["background-text01"]),stepWidth,self.stepHeight);
	layer.addChild(panel);
	if(typeof size == UNDEFINED){
		size = 17;
	}
	var labelText = getStrokeLabel(label,size,"#FFFFFF","#000000",2);
	labelText.x = 5;
	labelText.y = (self.stepHeight - labelText.getHeight()) * 0.5;
	panel.addChild(labelText);
	
	var valueText = getStrokeLabel(value,size,"#FFFFFF","#000000",2);
	valueText.x = stepWidth - valueText.getWidth() - 5;
	valueText.y = (self.stepHeight - labelText.getHeight()) * 0.5;
	panel.addChild(valueText);
	
	var bitmapLayer = getBitmap(panel);
	bitmapLayer.x = x;
	bitmapLayer.y = y;
	self.addChild(bitmapLayer);
};