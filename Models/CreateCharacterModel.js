function CreateCharacterModel(){
	base(this,MyModel,[]);
}
CreateCharacterModel.prototype.construct=function(){
	var self = this;
};
CreateCharacterModel.prototype.getImages=function(){
	var list = [
		{name:"win01",path:LMvc.IMG_PATH+"win/win01.png"},
		{name:"win02",path:LMvc.IMG_PATH+"win/win02.png"},
		{name:"win03",path:LMvc.IMG_PATH+"win/win03.png"},
		{name:"win04",path:LMvc.IMG_PATH+"win/win04.png"},
		{name:"win05",path:LMvc.IMG_PATH+"win/win05.png"},
		{name:"win06",path:LMvc.IMG_PATH+"win/win06.png"},
		{name:"combobox_arraw",path:LMvc.IMG_PATH+"component/combobox_off.png"},
		{name:"background-text01",path:LMvc.IMG_PATH+"background/text01.png"},
		{name:"close",path:LMvc.IMG_PATH+"component/close.png"},
		{name:"ok",path:LMvc.IMG_PATH+"component/ok.png"},
		{name:"range",path:LMvc.IMG_PATH+"component/range.png"},
		{name:"checkbox-background",path:LMvc.IMG_PATH+"component/checkbox-background.png"},
		{name:"checkbox-on",path:LMvc.IMG_PATH+"component/checkbox-on.png"},
		{name:"common-black",path:LMvc.IMG_PATH+"common/black.png"},
		{name:"icon-line",path:LMvc.IMG_PATH+"icon/line.png"}
	];
	
	var loadComponents = [
	{name:"body", num:23},
	{name:"eye", num:17},
	{name:"face", num:5},
	{name:"mouth", num:11},
	{name:"nose", num:7},
	{name:"hat", num:17},
	{name:"decorative", num:12},
	];
	for(var i=0;i<loadComponents.length;i++){
		var com = loadComponents[i];
		for(var j=1;j<=com.num;j++){
			var name = com.name + ("0" + j).substr(-2);
			list.push({path:"./images/face/"+com.name+"/"+j+".png",name:name});
		}
	}
	return list;
};