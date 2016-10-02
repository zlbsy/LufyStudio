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
	lblName.text = Language.get(self.word);
	lblName.x = (110 - lblName.getWidth()) * 0.5;
	lblName.y = (50 - lblName.getHeight()) * 0.5;
};
DictionaryChildView.prototype.onClick = function(event) {
	var self = event.target;
	
	var listView = event.currentTarget;
	var dictionaryView = listView.getParentByConstructor(DictionaryView);
	dictionaryView.showDetailedDialog(self.word);
};