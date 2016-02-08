function CreateCharacterAbilityItemView(listView, name, list){
	var self = this;
	base(self,LListChildView,[]);
	self.listView = listView;
	self.name = name;
	self.init(list);
}
CreateCharacterAbilityItemView.prototype.init=function(list){
	var self = this;
	var label = getStrokeLabel(Language.get(self.name) + ":", 20, "#FFFFFF", "#000000", 3);
	label.y = 5;
	self.addChild(label);
	
	self.comboBox = self.getStatusComboBox(list);
	self.comboBox.x = 60;
	self.addChild(self.comboBox);
};
CreateCharacterAbilityItemView.prototype.onClick=function(){
	var self = this;
	self.comboBox.showChildList();
};
CreateCharacterAbilityItemView.prototype.getStatusComboBox=function(list){
	var panel = new LPanel(new LBitmapData(LMvc.datalist["win01"]),100,40);
	panel.cacheAsBitmap(true);
	var bitmapOn = new LBitmap(new LBitmapData(LMvc.datalist["combobox_arraw"]));
	var bitmapOff = new LBitmap(new LBitmapData(LMvc.datalist["combobox_arraw"]));
	var com = new BasicComboBox(18,"#ffffff","Arial",panel,bitmapOff,bitmapOn);
	com.setListChildView(CreateCharacterComboBoxChild);
	com.listView.cellWidth = 100;
	com.label.x = 10;
	com.label.y = 9;
	com.label.lineColor = "#000000";
	com.label.stroke = true;
	com.label.lineWidth = 3;
	for(var i=0,l=list.length;i<l;i++){
		com.setChild({label:list[i].label,value:list[i].value});
	}
	return com;
};
function BasicComboBox(size, color, font, layerBack, layerUp, layerOver){
	LExtends(this, LComboBox, [size, color, font, layerBack, layerUp, layerOver]);
}
BasicComboBox.prototype.getRootCoordinate = function(){
	var self = this;
	var listView = self.parent.listView;
	var objectIndex = self.parent.objectIndex;
	var point = listView.getRootCoordinate();
	var index = listView.getItems().findIndex(function(child){
		return child.objectIndex == objectIndex;
	});
	return new LPoint(point.x + self.parent.comboBox.x, point.y + index * listView.cellHeight);
};
