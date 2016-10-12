function BuildBaseView(controller, buildName){
	var self = this;
	self.isBuildBaseView = true;
	base(self,LView,[controller]);
	self.setBackground();
	self.buildName = buildName;
	self.name = "build_"+buildName;
	var view = controller.view;
	var visibleLayer = view.buildLayer.childList.find(function(child){
		return child.visible;
	});
	var build = visibleLayer.childList.find(function(child){
		return child.name == buildName;
	});
	self.menuLayer = new LSprite();
	self.addChild(self.menuLayer);
	self.contentLayer = new LSprite();
	self.addChild(self.contentLayer);
	
	self.controller.addEventListener(CharacterListEvent.SHOW, self.hideBuild);
	self.controller.addEventListener(CharacterListEvent.CLOSE, self.showBuild);
	
	var menuLayer = self.showMenu();
	if(menuLayer){
		self.menuLayer.addChild(menuLayer);
		if(build){
			self.setMenuPosition(build, menuLayer);
		}else{
			var button = view.footerLayer.childList.find(function(child){
				return child.visible && child.name.indexOf(buildName) >= 0;
			});
			self.setMenuPositionByFooter(button, menuLayer);
		}
	}else{
		self.run();
	}
}
BuildBaseView.prototype.showMenu=function(){};
BuildBaseView.prototype.setBackground=function(){
	var self = this;
	self.controller.view.contentMask.visible = true;
};
BuildBaseView.prototype.setMenuPositionByFooter=function(build, menuLayer){
	var self = this;
	var menuW = menuLayer.getWidth();
	var menuH = menuLayer.getHeight();
	menuLayer.x = build.x + (build.getWidth() - menuW) * 0.5;
	menuLayer.y = LMvc.screenHeight - menuH - 100;
};
BuildBaseView.prototype.setMenuPosition=function(build, menuLayer){
	var self = this;
	var centerX = build.x + build.getWidth() * 0.5;
	var centerY = build.y + build.getHeight() * 0.5;
	var menuW = menuLayer.getWidth();
	var menuH = menuLayer.getHeight();
	if(centerX < LMvc.screenWidth * 0.6){
		menuLayer.x = centerX;
	}else{
		menuLayer.x = centerX - menuW;
	}
	if(centerY < LMvc.screenHeight * 0.6){
		menuLayer.y = centerY;	
		if(menuLayer.y + menuH > LMvc.screenHeight - 10){
			menuLayer.y = LMvc.screenHeight - 10 - menuH;
		}
	}else{
		menuLayer.y = centerY - menuH;
		if(menuLayer.y - menuH < 10){
			menuLayer.y = 10;
		}
	}
};
BuildBaseView.prototype.hideBuild=function(event){
	var self;
	if(event){
		var contentLayer = event.currentTarget.view.contentLayer;
		self = contentLayer.childList.find(function(child){
			return child.isBuildBaseView;
		});
	}else{
		self = this;
	}
	self.menuLayer.visible = false;
	self.controller.view.baseLayer.visible = false;
};
BuildBaseView.prototype.selectComplete=function(event){
	var self = this;
	var characterList = event.characterList;
	if(!characterList){
		self.cityId = null;
		return true;
	}
	characterList.forEach(function(child){
		var jobContent = characterListType2JobType(event.characterListType);
		child.job(jobContent);
	});
	var cityModel = self.controller.getValue("cityData");
	cityModel.money(-event.usedMoney);
	return true;
};
BuildBaseView.prototype.showBuild=function(event){
	var contentLayer = event.currentTarget.view.contentLayer;
	var self = contentLayer.childList.find(function(child){
		return child.isBuildBaseView;
	});
	if(!self.selectComplete(event)){
		return false;
	}
	contentLayer.removeChildAt(contentLayer.numChildren - 1);
	self.menuLayer.visible = true;
	self.controller.view.baseLayer.visible = true;
	return true;
};
BuildBaseView.prototype.die=function(){
	var self = this;
	self.callParent("die",arguments);
	self.controller.removeEventListener(CharacterListEvent.SHOW, self.hideBuild);
	self.controller.removeEventListener(CharacterListEvent.CLOSE, self.showBuild);
};
