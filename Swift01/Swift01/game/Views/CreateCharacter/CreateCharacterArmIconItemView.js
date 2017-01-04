function CreateCharacterArmIconItemView(listView, soldierMaster, img){
	var self = this;
	base(self,LListChildView,[]);
	self.listView = listView;
	self.soldierMaster = soldierMaster;
	self.img = img;
	self.init();
}
CreateCharacterArmIconItemView.prototype.onClick=function(event){
	var self = event.target;
	var detailedView = LMvc.logoStage.parent.getChildByName("CreateCharacterDetailedView");
	detailedView.visible = true;
	var armView = detailedView.armView;
	var armItemView = armView.listView.getItems().find(function(child){
		return child.soldierMaster.id() == self.soldierMaster.id();
	});
	var icon = self.icon.clone();
	icon.scaleX = icon.scaleY = 50 / icon.getWidth();
	icon.x = icon.y = (50 - icon.getWidth()) * 0.5;
	armItemView.setIcon(icon);
	armItemView.soldier.data.img = self.img;
	LMvc.layer.removeChildAt(LMvc.layer.numChildren - 1);
};
CreateCharacterArmIconItemView.prototype.init=function(){
	var self = this;
	var size = new LPoint(64, 64);
	var imgIndex = self.img;
	if(!imgIndex){
		imgIndex = "common/" + self.soldierMaster.id() + "-1";
	}
	var icon = new BitmapSprite(LMvc.IMG_PATH + "character/s/"+imgIndex+".png", [64*18,0,64,64],size);
	icon.x = icon.y = 3;
	icon.addEventListener(LEvent.COMPLETE, self.iconComplete);
	var winPanel = getPanel("win06",size.x,size.y);
	icon.addChild(winPanel);
	self.icon = icon;
	self.addChild(icon);
};
CreateCharacterArmIconItemView.prototype.iconComplete=function(event){
	var self = event.currentTarget.parent;
	self.cacheAsBitmap(false);
	self.updateView();
};
