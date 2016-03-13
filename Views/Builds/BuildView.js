function BuildView(controller,img,name){
	var self = this;
	base(self,LView,[controller]);
	self.set(img,name);
}
BuildView.prototype.set=function(img,name){
	var self = this;
	self.name = name;
	var layer = new LSprite();
	var display;
	if(self.controller.getValue("selfCity")){
		display = new LBitmap(new LBitmapData(LMvc.datalist[img]));
	}else{
		display = GameCacher.getGrayDisplayObject(img);
	}
	self.width = display.getWidth();
	self.height = display.getHeight();
	layer.addChild(display);
	
	var name = getStrokeLabel(Language.get(name),25,"#FFFFFF","#000000",4);
	name.x = (display.getWidth() - name.getWidth())*0.5;
	name.y = display.getHeight() - name.getHeight();
	name.heightMode = LTextField.HEIGHT_MODE_BASELINE;
	layer.addChild(name);
	layer.cacheAsBitmap(true);
	self.addChild(layer);
	self.addShape(LShape.RECT,[0,0,self.width,self.height]);
};