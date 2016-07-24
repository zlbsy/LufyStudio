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
	
	var label = getStrokeLabel(Language.get("select_trouble_title"),20,"#FFFFFF","#000000",3);
	self.addChild(label);
	
	var radio = new LRadio();
	radio.setChildRadio(TroubleConfig.EASE,0,35,bitmap,bitmapSelect);
	radio.setChildRadio(TroubleConfig.NORMAL,110,35,bitmap,bitmapSelect);
	radio.setChildRadio(TroubleConfig.HARD,220,35,bitmap,bitmapSelect);
	radio.setValue(0);
	self.addChild(radio);
	self.radioTrouble = radio;
	for(var i=0;i<radio.numChildren;i++){
		var child = radio.getChildAt(i);
		child.addShape(LShape.RECT,[0,-10,100,50]);
	}
	
	label = getStrokeLabel(Language.get("trouble_easy"),20,"#FFFFFF","#000000",3);
	label.x = 40;
	label.y = 40;
	self.addChild(label);
	
	label = getStrokeLabel(Language.get("trouble_normail"),20,"#FFFFFF","#000000",3);
	label.x = 150;
	label.y = 40;
	self.addChild(label);
	
	label = getStrokeLabel(Language.get("trouble_hard"),20,"#FFFFFF","#000000",3);
	label.x = 260;
	label.y = 40;
	self.addChild(label);
	
	label = getStrokeLabel(Language.get("select_death_title"),20,"#FFFFFF","#000000",3);
	label.y = 90;
	self.addChild(label);
	
	radio = new LRadio();
	radio.setChildRadio(1,0,125,bitmap,bitmapSelect);
	radio.setChildRadio(0,110,125,bitmap,bitmapSelect);
	radio.setValue(1);
	self.addChild(radio);
	self.radioDeath = radio;
	for(var i=0;i<radio.numChildren;i++){
		var child = radio.getChildAt(i);
		child.addShape(LShape.RECT,[0,-10,100,50]);
	}
	label = getStrokeLabel(Language.get("yes"),20,"#FFFFFF","#000000",3);
	label.x = 40;
	label.y = 130;
	self.addChild(label);
	
	label = getStrokeLabel(Language.get("no"),20,"#FFFFFF","#000000",3);
	label.x = 150;
	label.y = 130;
	self.addChild(label);
	
	
	label = getStrokeLabel(Language.get("select_behead_title"),20,"#FFFFFF","#000000",3);
	label.y = 180;
	self.addChild(label);
	
	radio = new LRadio();
	radio.setChildRadio(1,0,215,bitmap,bitmapSelect);
	radio.setChildRadio(0,110,215,bitmap,bitmapSelect);
	radio.setValue(1);
	self.addChild(radio);
	self.radioBehead = radio;
	for(var i=0;i<radio.numChildren;i++){
		var child = radio.getChildAt(i);
		child.addShape(LShape.RECT,[0,-10,100,50]);
	}
	label = getStrokeLabel(Language.get("yes"),20,"#FFFFFF","#000000",3);
	label.x = 40;
	label.y = 220;
	self.addChild(label);
	
	label = getStrokeLabel(Language.get("no"),20,"#FFFFFF","#000000",3);
	label.x = 150;
	label.y = 220;
	self.addChild(label);
};
