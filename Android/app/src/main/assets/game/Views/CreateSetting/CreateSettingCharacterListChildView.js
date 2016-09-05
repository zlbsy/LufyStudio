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
	var self = event.target;
	var listView = event.currentTarget;
	if(listView.isOnlyOne){
		var items = listView.getItems();
		for(var i=0,l=items.length;i<l;i++){
			var item = items[i];
			if(!item.checkbox.checked){
				continue;
			}
			item.checkbox.setChecked(false);
			item.cacheAsBitmap(false);
			item.updateView();
		}
	}
	self.checkbox.setChecked(!self.checkbox.checked);
	self.cacheAsBitmap(false);
	self.updateView();
};
CreateSettingCharacterListChildView.prototype.setStatus = function() {
	var self = this;
	self.graphics.drawRect(0, "#ff0000", [0, 0, 440, 40]);
	var bitmapLine = new LBitmap(new LBitmapData(LMvc.datalist["icon-line"]));
	bitmapLine.scaleX = 400;
	bitmapLine.x = 20;
	bitmapLine.y = 38;
	self.addChild(bitmapLine);
	var bitmap = new LBitmap(new LBitmapData(LMvc.datalist["checkbox-background"]));
	var bitmapSelect = new LBitmap(new LBitmapData(LMvc.datalist["checkbox-on"]));
	var check = new LCheckBox(bitmap, bitmapSelect);
	check.x = 20;
	check.y = 5;
	self.addChild(check);
	self.checkbox = check;
	
	var list = ["name", 80, "force", 180, "intelligence", 230, "command", 280, "agility", 330, "luck", 380];
	for(var i=0,l=list.length;i<l;i+=2){
		label = getStrokeLabel(self.data[list[i]],18,"#FFFFFF","#000000",4);
		label.x = list[i + 1];
		label.y = 10;
		self.addChild(label);
	}
}; 
