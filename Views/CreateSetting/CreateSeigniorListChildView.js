function CreateSeigniorListChildView(data) {
	var self = this;
	//{id:1,color:"0,0,255",citys:[{id:39,generals:[1,2]}]}
	base(self, LListChildView, []);
	self.set(data);
}

CreateSeigniorListChildView.prototype.set = function(data) {
	var self = this;
	self.data = data;
	self.seignior = LPlugin.characters().list.find(function(child){
		return child.id == data.id;
	});
	self.removeAllChild();
	self.setStatus();
};
CreateSeigniorListChildView.prototype.onClick = function(event) {
	
};
CreateSeigniorListChildView.prototype.setStatus = function() {
	var self = this;
	self.graphics.drawRect(0, "#ff0000", [0, 0, 420, 40]);
	var bitmapLine = new LBitmap(new LBitmapData(LMvc.datalist["icon-line"]));
	bitmapLine.scaleX = 320;
	bitmapLine.x = 10;
	bitmapLine.y = 38;
	self.addChild(bitmapLine);
	var name = getStrokeLabel(self.seignior.name, 20, "#FFFFFF", "#000000", 4);
	name.x = 10;
	name.y = 5;
	self.addChild(name);
	var cityCount = self.data.citys.length;
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
	self.deleteButton = deleteButton;
}; 
