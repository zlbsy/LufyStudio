function ChapterDetailedChildView(controller,data){
	var self = this;
	base(self, LListChildView, []);
	self.data = data;
	self.controller = controller;
	self.set();
}
ChapterDetailedChildView.prototype.set=function(){
	var self = this;
	
	var name = getStrokeLabel(self.data.name,20,"#FFFFFF","#000000",1);
	self.addChild(name);
	
	var city_count = getStrokeLabel(self.data.citys.length,20,"#FFFFFF","#000000",1);
	city_count.x = 140;
	self.addChild(city_count);
	
	var general_count = getStrokeLabel(self.data.general_count,20,"#FFFFFF","#000000",1);
	general_count.x = 200;
	self.addChild(general_count);
};