function TutorialModel(){
	base(this,MyModel,[]);
}
TutorialModel.prototype.construct=function(){
};
TutorialModel.prototype.getImages=function(){
	var list = [
		{name:"translucent",path:LMvc.IMG_PATH+"common/translucent.png"},
		{name:"focus",path:LMvc.IMG_PATH+"common/focus.png"},
	];
	return list;
};