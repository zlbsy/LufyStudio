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
	var self = event.target;
	var listView = event.currentTarget;
	
};
CreateCityCharacterListChildView.prototype.setStatus = function() {
	var self = this;
	self.graphics.drawRect(0, "#ff0000", [0, 0, 440, 40]);
	var bitmapLine = new LBitmap(new LBitmapData(LMvc.datalist["icon-line"]));
	bitmapLine.scaleX = 400;
	bitmapLine.x = 20;
	bitmapLine.y = 38;
	self.addChild(bitmapLine);
	
	var list = ["name", 80, "force", 180, "intelligence", 230, "command", 280, "agility", 330, "luck", 380];
	for(var i=0,l=list.length;i<l;i+=2){
		label = getStrokeLabel(self.data[list[i]],18,"#FFFFFF","#000000",4);
		label.x = list[i + 1];
		label.y = 10;
		self.addChild(label);
	}
	var closeButton = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
	closeButton.x = 190;
	closeButton.y = 5;
	closeButton.scaleX = closeButton.scaleY = 0.5;
	self.addChild(closeButton);
}; 
