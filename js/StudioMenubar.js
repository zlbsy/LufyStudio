function StudioMenubar(){
	var self = this;
	base(self,LSprite,[]);
	var list = [
		{label:"LufyStudio",list:[
			{label:"关于LufyStudio",click:self.aboutStudio},
			{label:"关于作者",click:self.aboutAuthor},
			{label:"支援作者",click:self.aboutAuthor}
		]},
		{label:"文件",list:[
			{label:"新建",list:[
				{label:"工程",click:function(){trace("工程");}},
				{label:"LSprite",click:function(){trace("文件");}},
				{label:"LAnimationTimeline",click:function(){trace("文件");}},
				{label:"LBitmap",click:function(){self.createBitmap();}},
				{label:"LBitmapData",click:function(){self.createBitmapData();}}
			]},
			{label:"读取工程",click:function(){trace("File");}},
			{label:"读取图片",click:self.loadImage},
			{label:"保存",click:self.save}
		]},
		{label:"编辑",list:[
			{label:"Test1",click:function(){trace("Test1");}},
			{label:"Test2",click:function(){trace("Test2");}}
		]},
		{label:"测试",list:[
			{label:"Test1",click:function(){trace("Test1");}},
			{label:"Test2",click:function(){trace("Test2");}}
		]},
		{label:"窗口",list:[
			{label:"Test1",click:function(){trace("Test1");}},
			{label:"Test2",click:function(){trace("Test2");}}
		]},
		{label:"帮助",list:[
			{label:"About",click:function(){trace("About");}},
			{label:"Test3",click:function(){trace("Test3");}}
		]}
	];
	var back = new LSprite();
	self.back = back;
	self.addChild(back);
	
	var backgroundColor=LGlobal.canvas.createLinearGradient(0,-20,0,30);
	backgroundColor.addColorStop(0,"#FFFFFF");
	backgroundColor.addColorStop(1,"#000000");
	/*
	var selectColor=LGlobal.canvas.createLinearGradient(0,-10,0,30);
	selectColor.addColorStop(0,"#FFFFFF");
	selectColor.addColorStop(1,"#1E90FF");*/
	var menu = new LMenubar(list,{textSize:20,textColor:"#FFFFFF",lineColor:"#000000",backgroundColor:backgroundColor,itemBackgroundColor:"#333333"});
	
	
	//var menu = new LMenubar(list,{textSize:16,textColor:"#FFFFFF",lineColor:"#000000",backgroundColor:"#333333"});
	self.menu = menu;
	self.addChild(self.menu);
	self.back.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,menu.getHeight()],true,backgroundColor);
	//self.menu.mainMenuHide();
	//self.menu.openMainMenu(0);
}
StudioMenubar.prototype.aboutStudio = function(e){
	LMessageBox.show({
		title:"关于LufyStudio",
		message:"版本号：0.0.1\n\n测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试"
	});
};
StudioMenubar.prototype.aboutAuthor = function(e){
	LMessageBox.show({
		title:"关于作者",
		message:"测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试"
	});
};
StudioMenubar.prototype.save = function(e){
	var self = e.target.parent;
	var stageList = gameStage.childList;
	var displayObject = stageList[stageList.length - 1];
	console.log(displayObject.childType);
	switch(displayObject.childType){
		case "LBitmapData":
			LBitmapDataObject.save(displayObject);
			break;
		case "LBitmap":
			LBitmapObject.save(displayObject);
			break;
	}
};
StudioMenubar.prototype.loadImage = function(e){
	var self = e.target.parent;
	if(self.form){
		document.body.removeChild(self.form);
		self.form = null;
	}
	var form = document.createElement("form");
	document.body.appendChild(form);
	self.form = form;
	form.style.width="1px";
	form.style.height="1px";
	var inputFile = document.createElement("input");
	inputFile.style.width="1px";
	inputFile.style.height="1px";
	inputFile.menubar = self;
	inputFile.multiple = true;
	inputFile.type = "file";
	form.appendChild(inputFile);
	inputFile.addEventListener('change', self.loadImageSelect, false);
	inputFile.click();
};
StudioMenubar.prototype.loadImageSelect = function(e){
	var inputFile = e.target;
	var self = inputFile.menubar;
	var files = inputFile.files;
	for (var i = 0, f; f = files[i]; i++) {
		if (!f.type.match('image.*')) continue;
		var reader = new FileReader();
		reader.onload = (function(theFile) {
			return function(e) {
			    var loader = new LLoader();
			    loader.fileName = theFile.name;
			    loader.menubar = self;
			    loader.addEventListener(LEvent.COMPLETE,self.loadImageComplete);  
			    loader.load(e.target.result,"bitmapData"); 
			};
		})(f);
		reader.readAsDataURL(f);
	}
	document.body.removeChild(self.form);
	self.form = null;
};
StudioMenubar.prototype.loadImageComplete = function(e){
	var loader = e.target;
	var self = loader.menubar;
	materials.add(loader.fileName,loader.content);
};
StudioMenubar.prototype.createBitmapData = function(){
	var self = this;
	var bitmapDataStage = new LSprite();
	bitmapDataStage.addChild(new LBitmap(new LBitmapData("#000000",0,0,200,200)));
	bitmapDataStage.addChild(new LBitmap(new LBitmapData("#000000",0,0,200,200)));
	bitmapDataStage.childType = "LBitmapData";
	bitmapDataStage.name = "LBitmapData"+bitmapDataStage.objectIndex;
	ToolInterface.titleInit(bitmapDataStage.name,bitmapDataStage);
	projectFiles.add(bitmapDataStage.name,bitmapDataStage);
};
StudioMenubar.prototype.createBitmap = function(){
	var self = this;
	var bitmapStage = new LSprite();
	bitmapStage.addChild(new LBitmap(new LBitmapData("#FFFFFF",0,0,1,1)));
	bitmapStage.childType = "LBitmap";
	bitmapStage.name = "LBitmap"+bitmapStage.objectIndex;
	ToolInterface.titleInit(bitmapStage.name,bitmapStage);
	projectFiles.add(bitmapStage.name,bitmapStage);
};

