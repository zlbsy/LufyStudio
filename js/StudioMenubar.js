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
				{label:"LBitmap",click:function(){trace("文件");}},
				{label:"LBitmapData",click:function(){trace("文件");}}
			]},
			{label:"读取工程",click:function(){trace("File");}},
			{label:"读取图片",click:self.loadImage}
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
	self.addChild(back);
	var menu = new LMenubar(list,{textSize:20,textColor:"#FFFFFF",lineColor:"#000000",backgroundColor:"#333333"});
	self.addChild(menu);
	back.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,menu.getHeight()],true,"#333333");
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
	return;
	var b = new LBitmap(new LBitmapData(loader.content));
	addChild(b);
};