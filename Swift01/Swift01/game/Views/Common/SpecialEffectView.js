function SpecialEffectView(controller, charaModel, skillName){
	var self = this;
	base(self,LView,[controller]);
	var se = charaModel.isMale() ? "man_attack" : "woman_attack";
	LPlugin.playSE(se, LPlugin.gameSetting.SE);
	self.set(skillName);
}
SpecialEffectView.prototype.set=function(skillName){
	var self = this;
	var list = LGlobal.divideCoordinate(5760, 72, 1, 12);
	var data = new LBitmapData(LMvc.datalist["big_attack_1"], 0, 0, 480, 72);
	var anime = new LAnimationTimeline(data, list);
	anime.y = (LMvc.screenHeight - 72) * 0.5;
	anime.speed = 2;
	anime.addEventListener(LEvent.COMPLETE, self.animeComplete);
	self.addChild(anime);
	if(skillName){
		var labelText = getStrokeLabel(skillName,30,"#FFFFFF","#000000",2);
		labelText.x = anime.x + (anime.getWidth() - labelText.getWidth()) * 0.5;
		labelText.y = anime.y - labelText.getHeight();
		self.addChild(labelText);
	}
};
SpecialEffectView.prototype.animeComplete=function(event){
	var anime = event.currentTarget;
	var self = anime.parent;
	anime.stop();
	self.dispatchEvent(LEvent.COMPLETE);
	self.remove();
};
