function StudioMenubar(){
	var self = this;
	var list = [
		{label:"LufyStudio 0.0.1",list:[
			{label:"关于LufyStudio 0.0.1",click:function(){
				var myWindow = new LWindow(500,300);
				myWindow.x = (LGlobal.width - myWindow.getWidth())*0.5;
				myWindow.y = (LGlobal.height - myWindow.getHeight())*0.5;
				stageLayer.addChild(myWindow);
				
				var title = new LTextField();
				title.text = "关于LufyStudio 0.0.1";
				title.size = 20;
				title.x = 100;
				title.y = 10;
				myWindow.layer.addChild(title);
				
				var msgLabel = new LTextField();
				msgLabel.width = 400;
				msgLabel.setWordWrap(true,35);
				msgLabel.text = "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试";
				msgLabel.x = 50;
				msgLabel.y = 70;
				myWindow.layer.addChild(msgLabel);
			}},
			{label:"作者",click:function(){trace("Test2");}}
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
			{label:"读取图片",click:function(){trace("File");}}
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
	base(self,LMenubar,[list,{textSize:20,textColor:"#FFFFFF",lineColor:"#000000",backgroundColor:"#333333"}]);
}
