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
	
};
CreateCharacterArmIconItemView.prototype.init=function(){
	var self = this;
	var size = new LPoint(64, 64);
	var imgIndex = self.img;
	if(!imgIndex){
		imgIndex = "common/" + self.soldierMaster().id() + "-1";
	}
	var icon = new BitmapSprite(LMvc.IMG_PATH + "character/s/"+imgIndex+".png", [64*18,0,64,64],size);
	icon.addEventListener(LEvent.COMPLETE, self.iconComplete);
	var winPanel = getPanel("win06",size.x,size.y);
	icon.addChild(winPanel);
	self.addChild(icon);
};
CreateCharacterArmIconItemView.prototype.iconComplete=function(event){
	var self = event.currentTarget.parent;
	self.cacheAsBitmap(false);
	self.updateView();
};
