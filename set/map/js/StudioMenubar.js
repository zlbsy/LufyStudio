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
			{label:"保存",click:self.save.bind(this)},
			{label:"打开",click:self.open.bind(this)},
			{label:"保存缓存",click:self.saveCache.bind(this)},
			{label:"读取缓存",click:self.readCache.bind(this)}
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
	var self = this;
	self.openWindow(self.saveCacheRun);
}
StudioMenubar.prototype.saveCacheRun = function(index){
	window.localStorage.setItem("maps-"+index, JSON.stringify(maps));
	//window.localStorage.setItem("maps", JSON.stringify(maps));
}
StudioMenubar.prototype.readCache = function(e){
	var self = this;
	self.openWindow(self.readCacheRun);
};
StudioMenubar.prototype.readCacheRun = function(index){
	var strMap = window.localStorage.getItem("maps-"+index);
	var t = getTimer();
	if(strMap){
		maps = JSON.parse(strMap);
	}else{
		alert("no cache");
		return;
	}
	ToolInterface.stageInit();
	alert(getTimer() - t);
};
StudioMenubar.prototype.openWindow = function(complete){
	var myWindow = new LWindow({width:350,height:140,title:"确认"});
	myWindow.x = (LGlobal.width - myWindow.getWidth()) * 0.5;
	myWindow.y = (LGlobal.height - myWindow.getHeight()) * 0.5;
	LGlobal.stage.addChild(myWindow);
	
	var indexLabel = new LTextField();
	indexLabel.text = "输入序号(1-55)：";
	indexLabel.x = 30;
	indexLabel.y = 20;
	myWindow.layer.addChild(indexLabel);
	var indexText = new LTextField();
	indexText.x = 160;
	indexText.y = 20;
	indexText.text = 20;
	indexText.width = 100;
	//indexText.setWordWrap(true);
	indexText.setType(LTextFieldType.INPUT);
	myWindow.layer.addChild(indexText);
	indexText.focus();
	
	var button01 = new LButtonSample1("确认");
	button01.x = (350 - button01.getWidth()) * 0.5;
	button01.y = 60;
	myWindow.layer.addChild(button01);
	button01.addEventListener(LMouseEvent.MOUSE_UP,function(){
		var index = parseInt(indexText.text);
		if(index <= 0 || index > 55){
			alert("error");
		}
		myWindow.close();
		complete(index);
	});
	
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
	self.openWindow(self.saveRun);
};
StudioMenubar.prototype.saveRun = function(index){
	LAjax.post("http://d.lufylegend.com/set/map/Data/save.php",{"data":JSON.stringify(maps),"index":index},function(responseData){
		alert(responseData);
	},function(){alert("error");});
};
StudioMenubar.prototype.open = function(e){
	var self = e.target.parent;
	self.openWindow(self.openRun);
};
StudioMenubar.prototype.openRun = function(index){
	LAjax.get("http://d.lufylegend.com/set/map/Data/map_"+index+".txt?time="+(new Date()).getTime(),{},function(data){
		maps = JSON.parse(data);
		ToolInterface.stageInit();
	},function(){alert("error");});
	//character.loadData("Data/map.txt?t="+(new Date()).getTime());
};