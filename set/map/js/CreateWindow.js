function CreateWindow(){
};
CreateWindow.create = function(){
	var translucent = new LSprite();
	translucent.graphics.drawRect(0, "#000000", [0, 0, LGlobal.width, LGlobal.height], true, "#000000");
	translucent.alpha = 0.5;
	LGlobal.stage.addChild(translucent);
	translucent.addEventListener(LMouseEvent.MOUSE_UP, function (e) {});
	translucent.addEventListener(LMouseEvent.MOUSE_DOWN, function (e) {});
	translucent.addEventListener(LMouseEvent.MOUSE_MOVE, function (e) {});
	translucent.addEventListener(LMouseEvent.MOUSE_OVER, function (e) {});
	translucent.addEventListener(LMouseEvent.MOUSE_OUT, function (e) {});

	var myWindow = new LWindow({width:350,height:140,title:"新建"});
	myWindow.x = (LGlobal.width - myWindow.getWidth()) * 0.5;
	myWindow.y = (LGlobal.height - myWindow.getHeight()) * 0.5;
	LGlobal.stage.addChild(myWindow);
	myWindow.addEventListener(LWindow.CLOSE, function (e) {
		translucent.die();
		translucent.remove();
	});
	
	var xLabel = new LTextField();
	xLabel.text = "W：";
	xLabel.x = 30;
	xLabel.y = 20;
	myWindow.layer.addChild(xLabel);
	var xText = new LTextField();
	xText.x = 60;
	xText.y = 20;
	xText.text = 20;
	xText.width = 100;
	xText.setWordWrap(true);
	xText.setType(LTextFieldType.INPUT);
	myWindow.layer.addChild(xText);
	xText.focus();
	
	var yLabel = new LTextField();
	yLabel.text = "H：";
	yLabel.x = 190;
	yLabel.y = 20;
	myWindow.layer.addChild(yLabel);
	var yText = new LTextField();
	yText.x = 220;
	yText.y = 20;
	yText.text = 20;
	yText.width = 100;
	yText.setType(LTextFieldType.INPUT);
	myWindow.layer.addChild(yText);
	
	var button01 = new LButtonSample1("生成");
	button01.x = (350 - button01.getWidth()) * 0.5;
	button01.y = 60;
	myWindow.layer.addChild(button01);
	button01.addEventListener(LMouseEvent.MOUSE_UP,function(){
		myWindow.close();
		mapIndex.text = 0;
		maps = [];
		StudioMenubar.toCharas([],charaLayer,"red");
		StudioMenubar.toCharas([],enemyLayer,"blue");
		var w = parseInt(xText.text);
		var h = parseInt(yText.text);
		for(var i=0;i<h;i++){
			var arr = [];
			for(var j=0;j<w;j++){
				arr.push([0,0]);
			}
			maps.push(arr);
		}
		ToolInterface.stageInit();
	});
};