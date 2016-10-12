function IndexView(){
	base(this,LView,[]);
}
IndexView.prototype.construct=function(){
	var self = this;
	LMvc.layer.addChild(self);
    var script = new LScript(LMvc.layer,"",LMvc.screenWidth,LMvc.screenHeight);
};
