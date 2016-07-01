function TroubleSelectView(controller){
	var self = this;
	base(self, LListChildView, []);
	self.name = "TroubleSelectView";
	self.set();
}
TroubleSelectView.prototype.set=function(){
	var self = this;
	var bitmap = new LBitmap(new LBitmapData(LMvc.datalist["checkbox-background"]));
	var bitmapSelect = new LBitmap(new LBitmapData(LMvc.datalist["checkbox-on"]));
	var radio = new LRadio();
	radio.setChildRadio(TroubleConfig.EASE,0,0,bitmap,bitmapSelect);
	radio.setChildRadio(TroubleConfig.NORMAL,0,50,bitmap,bitmapSelect);
	radio.setChildRadio(TroubleConfig.HARD,0,100,bitmap,bitmapSelect);
	radio.setValue(0);
	self.addChild(radio);
	self.radioTrouble = radio;
	for(var i=0;i<radio.numChildren;i++){
		var child = radio.getChildAt(i);
		child.addShape(LShape.RECT,[0,0,240,50]);
	}
	
	var label = getStrokeLabel(Language.get("trouble_easy"),20,"#FFFFFF","#000000",3);
	label.x = 50;
	label.y = 5;
	self.addChild(label);
	
	label = getStrokeLabel(Language.get("trouble_normail"),20,"#FFFFFF","#000000",3);
	label.x = 50;
	label.y = 55;
	self.addChild(label);
	
	label = getStrokeLabel(Language.get("trouble_hard"),20,"#FFFFFF","#000000",3);
	label.x = 50;
	label.y = 105;
	self.addChild(label);
};
