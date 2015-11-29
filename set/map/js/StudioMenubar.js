function StudioMenubar(){
	var self = this;
	base(self,LSprite,[]);
	var list = [
		{label:"MapMaker",list:[
			{label:"关于MapMaker",click:null},
			{label:"关于作者",click:null}
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
StudioMenubar.prototype.save = function(e){
	var self = e.target.parent;
	var data = {
		b:character.body.getData(),
		f:character.face.getData(),
		e:character.eye.getData(),
		n:character.nose.getData(),
		m:character.mouth.getData(),
		h:character.hat.getData(),
		d1:character.decorative1.getData(),
		d2:character.decorative2.getData(),
		d3:character.decorative3.getData()
	};
	LAjax.responseType = LAjax.JSON;
	LAjax.post("./Data/save.php",{"data":JSON.stringify(data),"id":character.index,"ssid":user.ssid},function(responseData){
		console.log(responseData);
		if(responseData.result){
			LMessageBox.show({
				title:"完成",
				message:"保存完成！"
			});
			LAjax.responseType = LAjax.JSON;
			LAjax.post("./Data/get.php",{"id":character.index},function(list){
				characters.backupUpdate(list);
			});
			var index = characterList.findIndex(function(child){
				return character.index == child.index;
			});
			var characterObj = characterList[index];
			if(characterObj.type == "×"){
				characterList[index].type = "☆";
			}
		}else{
			LMessageBox.show({
				title:"出错了",
				message:responseData.error
			});
		}
	},function(){alert("error");});
};
StudioMenubar.prototype.create = function(e){
	var self = e.target.parent;
	if(typeof character.index == UNDEFINED){
		LMessageBox.show({
			title:"确认",
			message:"请先选择要修改的武将。"
		});
		return;
	}
	character.loadData("Data/default.txt?t="+(new Date()).getTime());
};
StudioMenubar.prototype.open = function(e){
	var self = e.target.parent;
};