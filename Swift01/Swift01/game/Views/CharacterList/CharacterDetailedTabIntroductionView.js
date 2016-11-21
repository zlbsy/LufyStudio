function CharacterDetailedTabIntroductionView(controller, w, h){
	var self = this;
	base(self,LView,[controller]);
	self.tabWidth = w;
	self.tabHeight = h;
}
CharacterDetailedTabIntroductionView.prototype.updateView=function(){
	var self = this;
	self.showStatus();
};
CharacterDetailedTabIntroductionView.prototype.showStatus=function(){
	var self = this;
	self.removeAllChild();
	var txtHeight = 27, startY = 5, startX = 5;
	var statusLayer = new LSprite();
	var characterModel = self.controller.getValue("selectedCharacter");
	//var introduction = characterModel.introduction();
	var introduction;
	if(characterModel.id() == 139){
		introduction = "黄硕，字月英。美而淑，聪而贤，女娲妒之，于面部赐一黑记。年十八，乡众皆避其貌，唯亮奇其才，乃数往求之，月英见其意甚诚，乃诺。或言亮常驻于军中者，为避其丑尔，亮亦闻之，乃归。英察其意，曰：讹言者，讹言也。亮大惭，乃笑。其贤如此。";
	}else{
		introduction = "黄硕，字月英。美而淑，聪而贤，女娲妒之，于面部赐一黑记。年十八，乡众皆避其貌，唯亮奇其才，乃数往求之，月英见其意甚诚，乃诺。或言亮常驻于军中者，为避其丑尔，亮亦闻之，乃归。英察其意，曰：讹言者，讹言也。亮大惭，乃笑。其贤如此。";
	}
	var lblIntroduction = getStrokeLabel(introduction,20,"#FFFFFF","#000000",4);
	lblIntroduction.width = self.tabWidth;
	lblIntroduction.setWordWrap(true, txtHeight);
	lblIntroduction.x = startX;
	lblIntroduction.y = startY;
	statusLayer.addChild(lblIntroduction);
	statusLayer.graphics.drawRect(0, "#000000", [0, 0, self.tabWidth, lblIntroduction.getHeight() + 10]);
	statusLayer.cacheAsBitmap(true);
	var backLayer = new LSprite();
	backLayer.addChild(statusLayer);
	var sc = new LScrollbar(backLayer, self.tabWidth, self.tabHeight, 10);
	self.addChild(sc);
};