function LogoModel(){
	base(this,MyModel,[]);
}
LogoModel.prototype.construct=function(){
};
LogoModel.prototype.getImages=function(){
	var list = [
		{name:"common-loading",path:LMvc.IMG_PATH+"common/loading.png"},
		{name:"translucent",path:LMvc.IMG_PATH+"common/translucent.png"},
		{name:"win01",path:LMvc.IMG_PATH+"win/win01.png"},
		{name:"win02",path:LMvc.IMG_PATH+"win/win02.png"},
		{name:"win03",path:LMvc.IMG_PATH+"win/win03.png"},
		{name:"win05",path:LMvc.IMG_PATH+"win/win05.png"},
		{name:"win07",path:LMvc.IMG_PATH+"win/win07.png"},
		{name:"close",path:LMvc.IMG_PATH+"component/close.png"},
		{name:"ok",path:LMvc.IMG_PATH+"component/ok.png"},
		{name:"lock",path:LMvc.IMG_PATH+"icon/lock.png"}
	];
	return list;
};