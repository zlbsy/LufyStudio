function CityModel(){
	base(this,MyModel,[]);
}
CityModel.prototype.construct=function(){
	var self = this;console.log("CityModel.prototype.construct",self.controller);
};
CityModel.prototype.getImages=function(){
	var list = [
		{name:"main-background",path:LMvc.IMG_PATH+"main/background.png"},
		{name:"builds-market",path:LMvc.IMG_PATH+"builds/market.png"},
		{name:"main-official",path:LMvc.IMG_PATH+"main/official.png"},
		{name:"main-tavern",path:LMvc.IMG_PATH+"main/tavern.png"},
		{name:"main-shop",path:LMvc.IMG_PATH+"main/shop.png"},
		{name:"checkbox-background",path:LMvc.IMG_PATH+"component/checkbox-background.png"},
		{name:"checkbox-on",path:LMvc.IMG_PATH+"component/checkbox-on.png"},
		{name:"close",path:LMvc.IMG_PATH+"component/close.png"},
		{name:"main-citygate",path:LMvc.IMG_PATH+"main/citygate.png"},
		{name:"main-trainingGround",path:LMvc.IMG_PATH+"main/trainingground.png"},
		{name:"icon-header",path:LMvc.IMG_PATH+"icon/header.png"},
		{name:"icon-line",path:LMvc.IMG_PATH+"icon/line.png"},
		{name:"icon-mainMenu",path:LMvc.IMG_PATH+"icon/mainMenu.png"},
		{name:"win02",path:LMvc.IMG_PATH+"win/win02.png"},
		{name:"win03",path:LMvc.IMG_PATH+"win/win03.png"},
		{name:"win04",path:LMvc.IMG_PATH+"win/win04.png"},
		{name:"win05",path:LMvc.IMG_PATH+"win/win05.png"},
		{name:"win06",path:LMvc.IMG_PATH+"win/win06.png"},
		{name:"win07",path:LMvc.IMG_PATH+"win/win07.png"},
		{name:"background-text01",path:LMvc.IMG_PATH+"background/text01.png"},
		{name:"background-header",path:LMvc.IMG_PATH+"background/header.png"},
		{name:"icon-return",path:LMvc.IMG_PATH+"icon/return.png"}
	];
	//人物头像
	//list.push({name:"face-5",path:LMvc.IMG_PATH+"face/5.png"});
	return list;
};
