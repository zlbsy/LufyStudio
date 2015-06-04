function LogoModel(){
	base(this,MyModel,[]);
}
LogoModel.prototype.construct=function(){
};
LogoModel.prototype.getImages=function(){
	var list = [
		{name:"common-loading",path:LMvc.IMG_PATH+"common/loading.png"},
		{name:"translucent",path:LMvc.IMG_PATH+"common/translucent.png"},
		{name:"win01",path:LMvc.IMG_PATH+"win/win01.png"}
	];
	return list;
};