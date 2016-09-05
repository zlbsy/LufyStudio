function SpecialEffectView(controller){
	var self = this;
	base(self,LView,[controller]);
	self.set();
}
SpecialEffectView.prototype.set=function(){
	var self = this;
	var list = LGlobal.divideCoordinate(5760, 72, 1, 12);
	var data = new LBitmapData(LMvc.datalist["big_attack_1"], 0, 0, 480, 72);
	var anime = new LAnimationTimeline(data, list);
	anime.y = (LGlobal.height - 72) * 0.5;
	anime.speed = 2;
	anime.addEventListener(LEvent.COMPLETE, self.animeComplete);
	self.addChild(anime);
};
SpecialEffectView.prototype.animeComplete=function(event){
	var anime = event.currentTarget;
	var self = anime.parent;
	anime.stop();
	self.dispatchEvent(LEvent.COMPLETE);
	self.remove();
};
