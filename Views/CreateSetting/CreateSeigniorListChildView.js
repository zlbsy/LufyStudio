function CreateSeigniorListChildView(data) {
	var self = this;
	//{id:1,color:"0,0,255",citys:[{id:39,generals:[1,2]}]}
	base(self, LListChildView, []);
	self.set(data);
}

CreateSeigniorListChildView.prototype.set = function(data) {
	var self = this;
	self.data = data;
	self.removeAllChild();
	self.setStatus();
};
CreateSeigniorListChildView.prototype.onClick = function(event) {
	var self = event.target;
	var listView = event.currentTarget;
	var createSetting = listView.getParentByConstructor(CreateSettingView);
	if(event.selfX <= 360){
		createSetting.toShowDetailed(self.data);
		return;
	}
	var errorMessage = String.format(Language.get("create_seignior_delete_error"), self.data.name);
	var obj = {title:Language.get("confirm"),messageHtml:errorMessage,height:200,okEvent:function(event){
		createSetting.toDeleteDetailed(self);
		event.currentTarget.parent.remove();
	}, cancelEvent:null};
	var windowLayer = ConfirmWindow(obj);
	LMvc.layer.addChild(windowLayer);
};
CreateSeigniorListChildView.prototype.setStatus = function() {
	var self = this;
	self.graphics.drawRect(0, "#ff0000", [0, 0, 420, 40]);
	var bitmapLine = new LBitmap(new LBitmapData(LMvc.datalist["icon-line"]));
	bitmapLine.scaleX = 320;
	bitmapLine.x = 10;
	bitmapLine.y = 38;
	self.addChild(bitmapLine);
	var name = getStrokeLabel(self.data.name, 20, "#FFFFFF", "#000000", 4);
	name.x = 10;
	name.y = 5;
	self.addChild(name);
	var cityCount = self.data.citys.length;
	var city = getStrokeLabel(cityCount, 20, "#FFFFFF", "#000000", 4);
	city.x = 120;
	city.y = 5;
	self.addChild(city);
	var general = getStrokeLabel(self.data.general_count, 20, "#FFFFFF", "#000000", 4);
	general.x = 190;
	general.y = 5;
	self.addChild(general);
	self.graphics.drawRect(0, "#ff0000", [260, 5, 60, 30],true,String.format("rgb({0})",self.data.color));
	
	var deleteButton = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
	deleteButton.x = 350;
	deleteButton.y = 5;
	deleteButton.scaleX = deleteButton.scaleY = 0.5;
	self.addChild(deleteButton);
	self.deleteButton = deleteButton;
}; 
