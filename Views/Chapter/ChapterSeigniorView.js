function ChapterSeigniorView(controller,data){
	var self = this;
	base(self,LView,[controller]);
	//{chara_id:1,name:"刘备",faceImg:6,minFace:[0,23,151,151], general_count:6, city_count:1,color:"#FF0000"}
	self.data = data;
	self.layer = new LSprite();
	self.addChild(self.layer);
	self.set();
}
ChapterSeigniorView.prototype.minFace = function(size) {
	var self = this;
	var face = new Face(LMvc.IMG_PATH + "face/" + self.data.faceImg + ".png", self.data.minFace);
	if ( typeof size == UNDEFINED) {
		size = 100;
	}
	face.scaleX = size / self.data.minFace[2];
	face.scaleY = size / self.data.minFace[3];
	return face;
};
ChapterSeigniorView.prototype.set=function(){
	var self = this;
	var faceSize = 100, winSize = 160;
	
	var win = new LPanel(new LBitmapData(LMvc.datalist["win05"]),winSize,150);
	var shape = new LShape();
	shape.x = 5;
	shape.y = faceSize + 5;
	shape.graphics.drawRect(0, "#000000", [0, 0, faceSize, 25],true,self.data.color);
	win.addChild(shape);
	
	var name = getStrokeLabel(self.data.name,22,"#000000","#CCCCCC",1);
	name.x = (faceSize - name.getWidth()) * 0.5;
	name.y = faceSize + 5;
	win.addChild(name);
	
	var city_count_label = getStrokeLabel("城池",20,"#000000","#CCCCCC",1);
	city_count_label.x = faceSize + 5;
	city_count_label.y = 10;
	win.addChild(city_count_label);
	var city_count = getStrokeLabel(self.data.city_count,20,"#000000","#CCCCCC",1);
	city_count.x = faceSize + 5;
	city_count.y = 37;
	win.addChild(city_count);
	
	var general_count_label = getStrokeLabel("武将",20,"#000000","#CCCCCC",1);
	general_count_label.x = faceSize + 5;
	general_count_label.y = 72;
	win.addChild(general_count_label);
	var general_count = getStrokeLabel(self.data.general_count,20,"#000000","#CCCCCC",1);
	general_count.x = faceSize + 5;
	general_count.y = 99;
	win.addChild(general_count);
	
	
	
	self.layer.addChild(getBitmap(win));
	
	var face = self.minFace(faceSize);
	face.x = face.y = 5;
	self.layer.addChild(face);
};