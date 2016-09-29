function SelectSeigniorCityChildView(cityData){
	var self = this;
	//{id:39,prefecture:1,generals:[1,2]}
	base(self,LListChildView,[]);
	self.init();
	self.setData(cityData);
}
SelectSeigniorCityChildView.prototype.onClick = function(event) {
	var self = event.target;
	var listView = event.currentTarget;
	if(event.selfX <= 180){
		var seigniorDetailed = event.currentTarget.getParentByConstructor(CreateSeigniorDetailedView);
		seigniorDetailed.showCityDetailed(self.cityData);
		return;
	}
	var errorMessage = String.format(Language.get("create_city_delete_error"), self.cityModel.name());
	var obj = {title:Language.get("confirm"),messageHtml:errorMessage,height:200,okEvent:function(event){
		listView.deleteChildView(self);
		event.currentTarget.parent.remove();
	}, cancelEvent:null};
	var windowLayer = ConfirmWindow(obj);
	LMvc.layer.addChild(windowLayer);
};
SelectSeigniorCityChildView.prototype.setData = function(cityData) {
	var self = this;
	self.cityData = cityData;
	self.cityModel = AreaModel.getArea(cityData.id);
	self.cityLabel.text = self.cityModel.name();
	var characters = LPlugin.characters().list;
	var character = characters.find(function(child){
		return child.id == self.cityData.prefecture;
	});
	self.prefectureLabel.text = character.name;
	self.generalsLabel.text = self.cityData.generals.length;
};
SelectSeigniorCityChildView.prototype.init = function() {
	var self = this, label;
	self.graphics.drawRect(0, "#ff0000", [0, 0, 250, 40]);
	var bitmapLine = new LBitmap(new LBitmapData(LMvc.datalist["icon-line"]));
	bitmapLine.scaleX = 190;
	bitmapLine.x = 5;
	bitmapLine.y = 38;
	self.addChild(bitmapLine);
	
	label = getStrokeLabel("",18,"#FFFFFF","#000000",4);
	label.x = 5;
	label.y = 10;
	self.addChild(label);
	self.cityLabel = label;
	
	label = getStrokeLabel("",18,"#FFFFFF","#000000",4);
	label.x = 55;
	label.y = 10;
	self.addChild(label);
	self.prefectureLabel = label;
	
	label = getStrokeLabel("",18,"#FFFFFF","#000000",4);
	label.x = 145;
	label.y = 10;
	self.addChild(label);
	self.generalsLabel = label;
	
	var closeButton = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
	closeButton.x = 190;
	closeButton.y = 5;
	closeButton.scaleX = closeButton.scaleY = 0.5;
	self.addChild(closeButton);
};