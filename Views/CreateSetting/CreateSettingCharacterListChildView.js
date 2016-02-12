function CreateSettingCharacterListChildView(data) {
	var self = this;
	//{id:1,color:"0,0,255",citys:[{id:39,generals:[1,2]}]}
	base(self, LListChildView, []);
	self.set(data);
}

CreateSettingCharacterListChildView.prototype.set = function(data) {
	var self = this;
	self.data = data;
	self.removeAllChild();
	self.setStatus();
};
CreateSettingCharacterListChildView.prototype.onClick = function(event) {
	
};
CreateSettingCharacterListChildView.prototype.setStatus = function() {
	var self = this;
	self.graphics.drawRect(0, "#ff0000", [0, 0, 420, 40]);
	var bitmapLine = new LBitmap(new LBitmapData(LMvc.datalist["icon-line"]));
	bitmapLine.scaleX = 320;
	bitmapLine.x = 10;
	bitmapLine.y = 38;
	self.addChild(bitmapLine);
	var bitmap = new LBitmap(new LBitmapData(LMvc.datalist["checkbox-background"]));
	var bitmapSelect = new LBitmap(new LBitmapData(LMvc.datalist["checkbox-on"]));
	var check = new LCheckBox(bitmap, bitmapSelect);
	check.x = 10;
	check.y = 10;
	self.addChild(check);
	self.checkbox = check;
	var name = getStrokeLabel(self.data.name, 20, "#FFFFFF", "#000000", 4);
	name.x = 60;
	name.y = 5;
	self.addChild(name);
	/*var cityCount = self.data.citys.length;
	var city = getStrokeLabel(cityCount, 20, "#FFFFFF", "#000000", 4);
	city.x = 120;
	city.y = 5;
	self.addChild(city);
	var generalCount = 0;
	for(var i = 0;i<cityCount;i++){
		generalCount += self.data.citys[i].generals.length;
	}
	var general = getStrokeLabel(generalCount, 20, "#FFFFFF", "#000000", 4);
	general.x = 190;
	general.y = 5;
	self.addChild(general);
	self.graphics.drawRect(0, "#ff0000", [260, 5, 60, 30],true,String.format("rgb({0})",self.data.color));
	var deleteButton = getSizeButton(Language.get("删除"),100,40);
	deleteButton.x = 340;
	self.addChild(deleteButton);
	self.deleteButton = deleteButton;*/
}; 
