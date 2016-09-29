function CreateCityCharacterListChildView(data) {
	var self = this;
	//{id:1,color:"0,0,255",citys:[{id:39,generals:[1,2]}]}
	base(self, LListChildView, []);
	self.set(data);
}

CreateCityCharacterListChildView.prototype.set = function(data) {
	var self = this;
	self.data = data;
	self.removeAllChild();
	self.setStatus();
};
CreateCityCharacterListChildView.prototype.onClick = function(event) {
	if(event.selfX <= 360){
		return;
	}
	var self = event.target;
	var listView = event.currentTarget;
	var cityDetailed = listView.getParentByConstructor(CreateSeigniorCityDetailedView);
	cityDetailed.prefectureComboBox.deleteChild(self.data.id);
	listView.deleteChildView(self);
};
CreateCityCharacterListChildView.prototype.setStatus = function() {
	var self = this;
	self.graphics.drawRect(0, "#ff0000", [0, 0, 440, 40]);
	var bitmapLine = new LBitmap(new LBitmapData(LMvc.datalist["icon-line"]));
	bitmapLine.scaleX = 400;
	bitmapLine.x = 20;
	bitmapLine.y = 38;
	self.addChild(bitmapLine);
	
	var list = ["name", 0, "force", 100, "intelligence", 150, "command", 200, "agility", 250, "luck", 300];
	for(var i=0,l=list.length;i<l;i+=2){
		label = getStrokeLabel(self.data[list[i]],18,"#FFFFFF","#000000",4);
		label.x = list[i + 1] + 10;
		label.y = 10;
		self.addChild(label);
	}
	var closeButton = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
	closeButton.x = 380;
	closeButton.y = 5;
	closeButton.scaleX = closeButton.scaleY = 0.5;
	self.addChild(closeButton);
}; 
