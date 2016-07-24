function CityModel(){
	base(this,MyModel,[]);
}
CityModel.prototype.construct=function(){
	var self = this;
};
CityModel.prototype.getImages=function(){
	var list = [
		{name:"main-background",path:LMvc.IMG_PATH+"main/background.png"},
		{name:"main-official",path:LMvc.IMG_PATH+"main/official.png"},
		{name:"main-institute",path:LMvc.IMG_PATH+"main/institute.png"},
		{name:"main-farmland",path:LMvc.IMG_PATH+"main/farmland.png"},
		{name:"main-tavern",path:LMvc.IMG_PATH+"main/tavern.png"},
		{name:"main-shop",path:LMvc.IMG_PATH+"main/shop.png"},
		{name:"checkbox-background",path:LMvc.IMG_PATH+"component/checkbox-background.png"},
		{name:"checkbox-on",path:LMvc.IMG_PATH+"component/checkbox-on.png"},
		{name:"close",path:LMvc.IMG_PATH+"component/close.png"},
		{name:"main-citygate",path:LMvc.IMG_PATH+"main/citygate.png"},
		{name:"main-trainingGround",path:LMvc.IMG_PATH+"main/trainingground.png"},
		{name:"icon-line",path:LMvc.IMG_PATH+"icon/line.png"},
		{name:"icon-appoint",path:LMvc.IMG_PATH+"icon/appoint.png"},
		{name:"icon-map",path:LMvc.IMG_PATH+"icon/map.png"},
		{name:"icon-general",path:LMvc.IMG_PATH+"icon/general.png"},
		{name:"icon-expedition",path:LMvc.IMG_PATH+"icon/expedition.png"},
		{name:"icon-diplomacy",path:LMvc.IMG_PATH+"icon/diplomacy.png"},
		{name:"win02",path:LMvc.IMG_PATH+"win/win02.png"},
		{name:"win03",path:LMvc.IMG_PATH+"win/win03.png"},
		{name:"win04",path:LMvc.IMG_PATH+"win/win04.png"},
		{name:"win05",path:LMvc.IMG_PATH+"win/win05.png"},
		{name:"win06",path:LMvc.IMG_PATH+"win/win06.png"},
		{name:"win07",path:LMvc.IMG_PATH+"win/win07.png"},
		{name:"range",path:LMvc.IMG_PATH+"component/range.png"},
		{name:"background-text01",path:LMvc.IMG_PATH+"background/text01.png"},
		{name:"background-header",path:LMvc.IMG_PATH+"background/header.png"}
	];
	//人物头像
	//list.push({name:"face-5",path:LMvc.IMG_PATH+"face/5.png"});
	return list;
};
