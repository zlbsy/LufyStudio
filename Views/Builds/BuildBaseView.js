function BuildBaseView(controller, buildName){
	var self = this;
	base(self,LView,[controller]);
	self.setBackground();
	var build = controller.view.buildLayer.childList.find(function(child){
		return child.name == buildName;
	});
	self.menuLayer = new LSprite();
	self.addChild(self.menuLayer);
	self.contentLayer = new LSprite();
	self.addChild(self.contentLayer);
	var menuLayer = self.showMenu();
	self.menuLayer.addChild(menuLayer);
	self.setMenuPosition(build, menuLayer);
}
BuildBaseView.prototype.showMenu=function(){};
BuildBaseView.prototype.setBackground=function(){
	var self = this;
	self.controller.view.contentMask.visible = true;
};
BuildBaseView.prototype.setMenuPosition=function(build, menuLayer){
	var self = this;
	var centerX = build.x + build.getWidth() * 0.5;
	var centerY = build.y + build.getHeight() * 0.5;
	var menuW = menuLayer.getWidth();
	var menuH = menuLayer.getHeight();
	if(centerX < LGlobal.width * 0.6){
		menuLayer.x = centerX;
	}else{
		menuLayer.x = centerX - menuW;
	}
	if(centerY < LGlobal.height * 0.6){
		menuLayer.y = centerY;	
		if(menuLayer.y + menuH > LGlobal.height - 10){
			menuLayer.y = LGlobal.height - 10 - menuH;
		}
	}else{
		menuLayer.y = centerY - menuH;
		if(menuLayer.y - menuH < 10){
			menuLayer.y = 10;
		}
	}
};
BuildBaseView.prototype.hideBuild=function(){
	var self = this;
	self.menuLayer.visible = false;
	self.controller.view.baseLayer.visible = false;
};
BuildBaseView.prototype.showBuild=function(){
	var self = this;
	self.menuLayer.visible = true;
	self.controller.view.baseLayer.visible = true;
};
BuildBaseView.prototype.die=function(){
	var self = this;
	
};
