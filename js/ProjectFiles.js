function ProjectFiles(){
	var self = this;
	base(self,LSprite,[]);
	self.graphics.drawRect(4,"#000000",[0,0,200,500],true,"#333333");
	var showLayer = new LSprite();
	showLayer.graphics.drawRect(0,"#000000",[0,0,200,600],true,"#333333");
	var scrollbar = new LScrollbar(showLayer,178,498,20,false);
	scrollbar.x = scrollbar.y = 1;
	self.addChild(scrollbar);
}
