function BuildBaseView(controller, buildName){
	var self = this;
	self.isBuildBaseView = true;
	base(self,LView,[controller]);
	self.setBackground();
	self.buildName = buildName;
	var view = controller.view;
	var build = view.buildLayer.childList.find(function(child){
		return child.name == buildName;
	});
	self.menuLayer = new LSprite();
	self.addChild(self.menuLayer);
	self.contentLayer = new LSprite();
	self.addChild(self.contentLayer);
	var menuLayer = self.showMenu();
	self.menuLayer.addChild(menuLayer);
	if(build){
		self.setMenuPosition(build, menuLayer);
	}else{
		var button = view.footerLayer.childList.find(function(child){
			return child.name == buildName;
		});
		self.setMenuPositionByFooter(button, menuLayer);
	}
	self.controller.addEventListener(CharacterListEvent.SHOW, self.hideBuild);
	self.controller.addEventListener(CharacterListEvent.CLOSE, self.showBuild);
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
	menuLayer.y = LGlobal.height - menuH - 100;
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
BuildBaseView.prototype.hideBuild=function(event){
	var contentLayer = event.currentTarget.view.contentLayer;
	var self = contentLayer.childList.find(function(child){
		return child.isBuildBaseView;
	});
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
