function DictionaryChildView(word){
	var self = this;
	base(self,LListChildView,[]);
	self.word = word;
	self.layerInit();
	//self.set();
}
DictionaryChildView.prototype.layerInit=function(){
	var self = this;
	var panel = getPanel("win01",110,50);
	self.addChild(panel);
};
DictionaryChildView.prototype.updateView = function(bitmap, rectangle, point){
	var self = this;
	if(!self._ll_cacheAsBitmap){
		self.set();
	}
	self.callParent("updateView",arguments);
};
DictionaryChildView.prototype.getName=function(){
	var self = this;
	if(!self.lblName){
		var lblName = getStrokeLabel("",16,"#FFFFFF","#000000",3);
		lblName.y = 5;
		self.addChild(lblName);
		self.lblName = lblName;
	}
	return self.lblName;
};
DictionaryChildView.prototype.set=function(){
	var self = this;
	var lblName = self.getName();
	lblName.text = Language.get(self.word.key);
	lblName.x = (110 - lblName.getWidth()) * 0.5;
	lblName.y = (50 - lblName.getHeight()) * 0.5;
	if(LPlugin.dataVer(self.word.ver) < LPlugin.dataVer(LMvc.ver) 
	|| LPlugin.DictionaryIsRead(self.word.key)){
		return;
	}
	if(self.getChildByName("newMark") != null){
		return;
	}
	var newMark = new LBitmap(new LBitmapData(LMvc.datalist["red_ball"]));
	newMark.name = "newMark";
	newMark.x = 90;
	newMark.y = 30;
	self.addChild(newMark);
};
DictionaryChildView.prototype.onClick = function(event) {
	var self = event.target;
	var listView = event.currentTarget;
	var newMark = self.getChildByName("newMark");
	if(newMark){
		LPlugin.ReadDictionary(self.word.key);
		newMark.visible = false;
		self.cacheAsBitmap(false);
		self.updateView();
	}
	var dictionaryView = listView.getParentByConstructor(DictionaryView);
	dictionaryView.showDetailedDialog(self.word.key);
};