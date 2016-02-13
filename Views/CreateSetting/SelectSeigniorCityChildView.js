function SelectSeigniorCityChildView(cityData){
	var self = this;
	//{id:39,prefecture:1,generals:[1,2]}
	base(self,LListChildView,[]);
	self.cityData = cityData;
	self.cityModel = AreaModel.getArea(cityData.id);
	self.init();
}
SelectSeigniorCityChildView.prototype.onClick = function(event) {
	var self = event.target;
	var listView = event.currentTarget;
};
SelectSeigniorCityChildView.prototype.init = function() {
	var self = this, label;
	self.graphics.drawRect(0, "#ff0000", [0, 0, 250, 40]);
	var bitmapLine = new LBitmap(new LBitmapData(LMvc.datalist["icon-line"]));
	bitmapLine.scaleX = 190;
	bitmapLine.x = 5;
	bitmapLine.y = 38;
	self.addChild(bitmapLine);
	
	label = getStrokeLabel(self.cityModel.name(),18,"#FFFFFF","#000000",4);
	label.x = 5;
	label.y = 10;
	self.addChild(label);
		
	var characters = GameManager.getNoSetCharacters(LMvc.chapterId);
	var character = characters.find(function(child){
		return child.id == self.cityData.prefecture;
	});
	
	label = getStrokeLabel(character.name+character.name,18,"#FFFFFF","#000000",4);
	label.x = 55;
	label.y = 10;
	self.addChild(label);
	
	label = getStrokeLabel(self.cityData.generals.length,18,"#FFFFFF","#000000",4);
	label.x = 145;
	label.y = 10;
	self.addChild(label);
	
	var closeButton = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
	closeButton.x = 190;
	closeButton.y = 5;
	closeButton.scaleX = closeButton.scaleY = 0.5;
	self.addChild(closeButton);
};