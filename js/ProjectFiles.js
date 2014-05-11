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
	
	self.childTitle = new LSprite();
	self.addChild(self.childTitle);
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
		var child = e.clickTarget;
		var self = child.parent.parent;
		if(self.select){
			self.select.graphics.clear();
			self.select.graphics.drawRect(0,"#666666",[0,0,200,22]);
		}
		child.graphics.drawRect(0,"#666666",[0,0,200,22],true,"#666666");
		self.select = child;
	});
	child.addEventListener(LMouseEvent.MOUSE_MOVE,function(e){
		var child = e.clickTarget;
		self.showTitle(child,e);
	});
	child.addEventListener(LMouseEvent.MOUSE_OUT,function(e){
		var child = e.clickTarget;
		self.showTitle(null);
	});
	child.addEventListener(LMouseEvent.DOUBLE_CLICK,function(e){
		var child = e.clickTarget;
		var bitmapDataStage = child.data.clone();
	console.log("LMouseEvent.DOUBLE_CLICK",child.data,bitmapDataStage);
		ToolInterface.titleInit(bitmapDataStage.name,bitmapDataStage);
	});
	console.log("child.data",child.data);
};
ProjectFiles.prototype.showTitle = function(child,e){
	var self = this;
	var childTitle = self.childTitle;
	if(!child){
		childTitle.child = null;
		childTitle.removeAllChild();
		childTitle.die();
		return;
	}
	if(childTitle.child && childTitle.child.objectIndex == child.objectIndex){
		childTitle.x = self.scrollbar.x + child.x + e.selfX;
		childTitle.y = self.scrollbar.y + child.y + e.selfY;
		return;	
	}
	childTitle.child = child;
	var title = new LTextField();
	title.x = 3;
	title.y = 3;
	title.text = "["+child.data.childType+"]";
	childTitle.addChild(title);
	childTitle.x = self.scrollbar.x + child.x + e.selfX;
	childTitle.y = self.scrollbar.y + child.y + e.selfY;
	childTitle.graphics.drawRect(0,"#000000",[0,0,title.getWidth()+6,title.getHeight()+10],true,"#FFFFFF");
};