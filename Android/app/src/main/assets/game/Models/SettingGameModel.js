function SettingGameModel(){
	base(this,MyModel,[]);
}
SettingGameModel.prototype.construct=function(){
	var self = this;
};
SettingGameModel.prototype.getImages=function(){
	var list = [
		{name:"win01",path:LMvc.IMG_PATH+"win/win01.png"},
		{name:"win02",path:LMvc.IMG_PATH+"win/win02.png"},
		{name:"win03",path:LMvc.IMG_PATH+"win/win03.png"},
		{name:"win04",path:LMvc.IMG_PATH+"win/win04.png"},
		{name:"win05",path:LMvc.IMG_PATH+"win/win05.png"},
		{name:"close",path:LMvc.IMG_PATH+"component/close.png"},
		{name:"range",path:LMvc.IMG_PATH+"component/range.png"},
		{name:"checkbox-background",path:LMvc.IMG_PATH+"component/checkbox-background.png"},
		{name:"checkbox-on",path:LMvc.IMG_PATH+"component/checkbox-on.png"},
		{name:"common-black",path:LMvc.IMG_PATH+"common/black.png"}
	];
	return list;
};