function ArmListModel(){
	base(this,MyModel,[]);
}
ArmListModel.prototype.construct=function(){
};
ArmListModel.prototype.getImages=function(){
	var list = [];
	list.push({name:"checkbox-background",path:LMvc.IMG_PATH+"component/checkbox-background.png"});
	list.push({name:"checkbox-on",path:LMvc.IMG_PATH+"component/checkbox-on.png"});
	list.push({name:"close",path:LMvc.IMG_PATH+"component/close.png"});
	return list;
};