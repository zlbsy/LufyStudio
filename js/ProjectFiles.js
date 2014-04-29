function ProjectFiles(){
	var self = this;
	base(self,LSprite,[]);
	self.graphics.drawRect(2,"#000000",[0,0,200,500],true,"#333333");
	self.graphics.drawRect(2,"#000000",[1,1,200,23],true,"#222222");
	
	var title = new LTextField();
	title.x = 3;
	title.y = 5;
	title.text = "工程文件";
	title.color = "#FFFFFF";
	self.addChild(title);
	
	var showLayer = new LSprite();
	self.showLayer = showLayer;
	showLayer.graphics.drawRect(0,"#000000",[0,0,200,473],true,"#333333");
	var scrollbar = new LScrollbar(showLayer,178,473,20,false);
	self.scrollbar = scrollbar;
	scrollbar.x = 1;
	scrollbar.y = 26;
	self.addChild(scrollbar);
}
