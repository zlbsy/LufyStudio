function BuildView(controller,img,name){
	var self = this;
	base(self,LView,[controller]);
	self.set(img,name);
}
BuildView.prototype.set=function(img,name){
	var self = this;
	self.name = name;
	var layer = new LSprite();
	var bitmap = new LBitmap(new LBitmapData(LMvc.datalist[img]));
	self.width = bitmap.getWidth();
	self.height = bitmap.getHeight();
	layer.addChild(bitmap);
	
	var name = getStrokeLabel(Language.get(name),25,"#FFFFFF","#000000",4);
	name.x = (bitmap.getWidth() - name.getWidth())*0.5;
	name.y = bitmap.getHeight() - name.getHeight();
	name.heightMode = LTextField.HEIGHT_MODE_BASELINE;
	layer.addChild(name);
	self.addChild(getBitmap(layer));
	self.addShape(LShape.RECT,[0,0,self.width,self.height]);
};