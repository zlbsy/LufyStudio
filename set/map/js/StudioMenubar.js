function StudioMenubar(){
	var self = this;
	base(self,LSprite,[]);
	var list = [
		{label:"MapMaker",list:[
			{label:"关于MapMaker",click:self.aboutTool},
			{label:"关于作者",click:self.aboutAuthor}
		]},
		{label:"文件",list:[
			{label:"新建",click:CreateWindow.create},
			{label:"保存",click:self.save},
			{label:"打开",click:self.open},
			{label:"保存缓存",click:self.saveCache},
			{label:"读取缓存",click:self.readCache}
		]}
	];
	var back = new LSprite();
	self.back = back;
	self.addChild(back);
	
	var backgroundColor=LGlobal.canvas.createLinearGradient(0,-20,0,30);
	backgroundColor.addColorStop(0,"#FFFFFF");
	backgroundColor.addColorStop(1,"#000000");

	var menu = new LMenubar(list,{textSize:20,textColor:"#FFFFFF",lineColor:"#000000",backgroundColor:backgroundColor,itemBackgroundColor:"#333333"});
	self.menu = menu;
	self.addChild(self.menu);
	self.back.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,menu.getHeight()],true,backgroundColor);
}
StudioMenubar.prototype.saveCache = function(e){
	console.log(JSON.stringify(maps));
	window.localStorage.setItem("maps", JSON.stringify(maps));
};
StudioMenubar.prototype.readCache = function(e){
	var strMap = window.localStorage.getItem("maps");
	if(strMap){
		maps = JSON.parse(strMap);
	}else{
		alert("no cache");
		return;
	}
	ToolInterface.stageInit();
};
StudioMenubar.prototype.aboutAuthor = function(e){
	LMessageBox.show({
		title:"关于作者",
		message:"作者lufy，HTML5开源游戏引擎lufylegend.js开发者。著有《HTML5 Canvas游戏开发实战》一书。"
	});
};
StudioMenubar.prototype.aboutTool = function(e){
	LMessageBox.show({
		title:"关于MapMaker",
		message:"。。。。"
	});
};
StudioMenubar.prototype.save = function(e){
	var self = e.target.parent;
	LAjax.post("http://d.lufylegend.com/set/map/Data/save.php",{"data":JSON.stringify(maps)},function(responseData){
		alert(responseData);
	},function(){alert("error");});
};
StudioMenubar.prototype.open = function(e){
	LAjax.get("http://d.lufylegend.com/set/map/Data/map.txt?time="+(new Date()).getTime(),{},function(data){
		maps = JSON.parse(data);
		ToolInterface.stageInit();
	});
	//character.loadData("Data/map.txt?t="+(new Date()).getTime());
};