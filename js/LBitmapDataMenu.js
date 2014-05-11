function LBitmapDataMenu(child){
	var self = this;
	base(self,LSprite,[]);
	self.data = child.data.image;
	self.name = child.data.name;
	var list = [
		{label:"menu",list:[
			{label:"添加到舞台",click:function(e){e.target.parent.addToStage();}},
			{label:"重命名",click:function(e){}},
			{label:"删除",click:function(e){}}
		]}
	];
	var menu = new LMenubar(list,{textSize:12,textColor:"#000000",lineColor:"#000000",backgroundColor:"#FFFFFF"});
	menu.addEventListener(LMenubar.MENU_CLOSE,function(e){
		e.parent.remove();
	});
	menu.y = -30;
	self.addChild(menu);
	menu.mainMenuHide();
	menu.openMainMenu(0);
};
LBitmapDataMenu.prototype.addToStage = function(){
	var self = this;
	var stageList = gameStage.childList;
	var displayObject = stageList[stageList.length - 1];
	console.log("LBitmapDataMenu.prototype.addToStage",displayObject);
	if(displayObject.childType != "LBitmapData"){
		self.remove();
		LMessageBox.show({
			width:340,
			height:200,
			title:"错误信息",
			message:"图片素材只能添加到LBitmapData上！"
		});
		return;
	}
	for(var i=0;i<2;i++){
		console.log(displayObject.getChildAt(i));
		displayObject.getChildAt(i).bitmapData = new LBitmapData(self.data);
		displayObject.getChildAt(i).bitmapData.name = self.name;
	}
	self.remove();
};
