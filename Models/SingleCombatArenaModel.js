function SingleCombatArenaModel(){
	LExtends(this,MyModel,[]);
}
SingleCombatArenaModel.prototype.construct=function(){
	var self = this;
};
SingleCombatArenaModel.prototype.getImages=function(){
	var self = this;
	var list = [];
	list.push({name:"close",path:LMvc.IMG_PATH+"component/close.png"});
	list.push({name:"ok",path:LMvc.IMG_PATH+"component/ok.png"});
	list.push({name:"win02",path:LMvc.IMG_PATH+"win/win02.png"});
	list.push({name:"win05",path:LMvc.IMG_PATH+"win/win05.png"});
	
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