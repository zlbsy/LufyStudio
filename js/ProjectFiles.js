function ProjectFiles(){
	var self = this;
	base(self,LSprite,[]);
	self.graphics.drawRect(2,"#000000",[0,0,200,500],true,"#333333");
	self.graphics.drawRect(2,"#000000",[1,1,200,23],true,"#111111");
	
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
ProjectFiles.prototype.add = function(name,displayObject){
	var self = this;
	var child = new LSprite();
	child.y = self.showLayer.childList.length * 22;
	child.graphics.drawRect(0,"#666666",[0,0,170,22]);
	self.showLayer.addChild(child);
	var label = new LTextField();
	label.x = 3;
	label.name = name;
	var i=10;
	do{
		label.text = name.substring(0,i++);
		if(label.getWidth() > 170){
			i--;
			break;
		}
	}while(i < name.length);
	label.text = name.substring(0,i);
	label.color = "#FFFFFF";
	child.addChild(label);
	child.data = displayObject;
	
	self.showLayer.graphics.drawRect(0,"#000000",[0,0,200,self.showLayer.getHeight() > 473 ? self.showLayer.getHeight():473],true,"#333333");
	
	child.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		if(self.select){
			self.select.graphics.clear();
			self.select.graphics.drawRect(0,"#666666",[0,0,200,22]);
		}
		//self.review(child);
		child.graphics.drawRect(0,"#666666",[0,0,200,22],true,"#666666");
		self.select = child;
	});
};
