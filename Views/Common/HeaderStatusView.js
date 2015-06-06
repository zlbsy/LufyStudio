function HeaderStatusView(controller){
	var self = this;
	base(self,LView,[controller]);
	console.log("--- HeaderStatusView mvcType="+self.mvcType);
}
HeaderStatusView.prototype.set=function(){
	var self = this;
	self.x = 10;
	self.y = 10;
	self.stepWidth = 150;
	self.stepHeight = 30;
	
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
	self.setStatus(Language.get("seignior"), seigniorCharacterName, self.stepWidth * 2 + 5, 0);
	self.setStatus(Language.get("prefecture"), prefectureCharacterName, self.stepWidth * 2 + 5, self.stepHeight);
	
	self.setStatus(Language.get("money"), cityModel.money(), self.stepWidth * 0 + 5, self.stepHeight * 2);
	self.setStatus(Language.get("food"), cityModel.food(), self.stepWidth * 0 + 5, self.stepHeight * 3);
	self.setStatus(Language.get("technology"), cityModel.technology(), self.stepWidth  * 0+ 5, self.stepHeight * 4);
	
	self.setStatus(Language.get("population"), cityModel.population(), self.stepWidth * 1 + 5, self.stepHeight * 2);
	self.setStatus(Language.get("troops"), cityModel.troopsSum(), self.stepWidth * 1 + 5, self.stepHeight * 3);
	self.setStatus(Language.get("police"), cityModel.police(), self.stepWidth * 1 + 5, self.stepHeight * 4);
	
	self.setStatus(Language.get("city_defense"), cityModel.city_defense(), self.stepWidth * 2 + 5, self.stepHeight * 2);
	self.setStatus(Language.get("generals"), cityModel.generalsSum(), self.stepWidth * 2 + 5, self.stepHeight * 3);
	self.setStatus(Language.get("out_of_office"), cityModel.outOfOfficeSum(), self.stepWidth * 2 + 5, self.stepHeight * 4);
};
HeaderStatusView.prototype.updateView = function(){
	var self = this;
	console.log("HeaderStatusView.prototype.updateView run");
	self.die();
	self.removeAllChild();
	self.set();
};
HeaderStatusView.prototype.setStatus=function(label,value,x,y,size){
	var self = this;
	var layer = new LSprite();
	var panel = new LPanel(new LBitmapData(LMvc.datalist["background-text01"]),self.stepWidth,self.stepHeight);
	layer.addChild(panel);
	if(typeof size == UNDEFINED){
		size = 17;
	}
	var labelText = getStrokeLabel(label,size,"#FFFFFF","#000000",2);
	labelText.x = 5;
	labelText.y = (self.stepHeight - labelText.getHeight()) * 0.5;
	panel.addChild(labelText);
	
	var valueText = getStrokeLabel(value,size,"#FFFFFF","#000000",2);
	valueText.x = self.stepWidth - valueText.getWidth() - 5;
	valueText.y = (self.stepHeight - labelText.getHeight()) * 0.5;
	panel.addChild(valueText);
	
	var bitmapLayer = getBitmap(panel);
	bitmapLayer.x = x;
	bitmapLayer.y = y;
	self.addChild(bitmapLayer);
	return;
	var bitmapIcon = new LBitmap(bitmapData);
	layer.addChild(bitmapIcon);
	
	var bitmapWin = getBitmap(layer);
	
	bitmapWin.x = startX;
	self.addChild(bitmapWin);
	
	var label = getStrokeLabel("",15,"#FFFFFF","#000000",2);
	label.name = name;
	label.x = startX + bitmapData.width;
	label.y = (bitmapWin.getHeight() - label.getHeight())*0.5;
	self.statusLayer.addChild(label);
};