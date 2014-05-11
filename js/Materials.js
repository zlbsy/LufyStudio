function Materials(){
	var self = this;
	base(self,LSprite,[]);
	self.graphics.drawRect(2,"#000000",[0,0,200,500],true,"#333333");
	self.graphics.drawRect(2,"#000000",[1,1,200,23],true,"#111111");
	//self.graphics.drawRect(1,"#000000",[0,500,200,200],true,"#000000");
	var translucentLayer = new LSprite();
	for(var i=0;i<19;i++){
		for(var j=0;j<20;j++){
			translucentLayer.graphics.drawRect(0,"#CCCCCC",[(i+j)%2==1?(i*10):(10 + i*10),j*10,10,10],true,"#FFFFFF");
			translucentLayer.graphics.drawRect(0,"#CCCCCC",[(i+j)%2==0?(i*10):(10 + i*10),j*10,10,10],true,"#CCCCCC");
		}
	}
	var translucentBitmapData = new LBitmapData(null,0,0,200,200);
	translucentBitmapData.draw(translucentLayer);
	var translucentBitmap = new LBitmap(translucentBitmapData);
	self.translucentBitmap = translucentBitmap;
	self.addChild(translucentBitmap);
	translucentBitmap.y = 500;
	
	var titleLayer = new LSprite();
	self.titleLayer = titleLayer;
	titleLayer.graphics.drawRect(2,"#000000",[1,1,50,23],true,"#333333");
	titleLayer.addEventListener(LMouseEvent.MOUSE_UP,self.toshow);
	self.addChild(titleLayer);
	var title = new LTextField();
	title.x = 10;
	title.y = 5;
	title.text = "素材";
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
Materials.prototype.add = function(name,image){
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
	child.data = new LBitmapData(image);
	child.data.name = name;
	
	self.showLayer.graphics.drawRect(0,"#000000",[0,0,200,self.showLayer.getHeight() > 473 ? self.showLayer.getHeight():473],true,"#333333");
	
	child.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		if(self.select){
			self.select.graphics.clear();
			self.select.graphics.drawRect(0,"#666666",[0,0,200,22]);
		}
		self.review(child);
		if(e.button == 2){
			var menu = new LBitmapDataMenu(child);
			menu.x = mouseX;
			menu.y = mouseY;
			rootLayer.addChild(menu);
		}
	});
};
Materials.prototype.review = function(child){
	var self = this;
	child.graphics.drawRect(0,"#666666",[0,0,200,22],true,"#666666");
	self.select = child;
	if(!self.view){
		self.view = new LBitmap(child.data);
		self.addChild(self.view);
	}else{
		self.view.bitmapData = child.data;
	}
	self.view.scaleX = self.view.scaleY = self.view.bitmapData.width > self.view.bitmapData.height ? 200/self.view.bitmapData.width : 200/self.view.bitmapData.height;
	self.view.x = (200 - self.view.getWidth())*0.5;
	self.view.y = 500 + (200 - self.view.getHeight())*0.5;
};
Materials.prototype.toshow = function(e){
	var self = this;
	if(e)self = e.clickTarget.parent;
	if(self.view)self.view.visible = true;
	self.scrollbar.visible = true;
	self.translucentBitmap.visible = true;
	self.titleLayer.graphics.clear();
	self.titleLayer.graphics.drawRect(2,"#000000",[1,1,50,23],true,"#333333");
	property.scrollbar.visible = false;
	property.titleLayer.graphics.clear();
	property.titleLayer.graphics.drawRect(0,"#000000",[51,1,50,23],false,"#333333");
};
