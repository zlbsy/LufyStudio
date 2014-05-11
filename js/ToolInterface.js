var studioMenubar;
var materials;
var property;
var projectFiles;
var gameStage;
var playLayer;
var titleLayer;
function ToolInterface(){
}
ToolInterface.init = function(){
	titleLayer = new LSprite();
	stageLayer.addChild(titleLayer);
	gameStage = new LSprite();
	gameStage.graphics.drawRect(1,"#333333",[0,0,800,480],true,"#FFFFFF");
	stageLayer.addChild(gameStage);
	
	studioMenubar = new StudioMenubar();
	rootLayer.addChild(studioMenubar);
	stageLayer.y = studioMenubar.getHeight();
	
	materials = new Materials();
	materials.x = LGlobal.width - materials.getWidth();
	stageLayer.addChild(materials);
	
	property = new Property();
	property.x = LGlobal.width - property.getWidth();
	stageLayer.addChild(property);
	
	materials.toshow();
	
	projectFiles = new ProjectFiles();
	projectFiles.x = materials.x - projectFiles.getWidth();
	stageLayer.addChild(projectFiles);
	
	playLayer = new LSprite();
	playLayer.addEventListener(LMouseEvent.DOUBLE_CLICK,function(e){alert("db");});
	var iconPlay = new LBitmap(new LBitmapData(datalist["iconPlay"]));
	iconPlay.x = 2;
	playLayer.addChild(iconPlay);
	var iconStop = new LBitmap(new LBitmapData(datalist["iconStop"]));
	//iconStop.x = (iconPlay.getWidth()*3 + 6 - iconPlay.getWidth())*0.5;
	iconStop.x = iconPlay.getWidth() + 4;
	playLayer.addChild(iconStop);
	var iconOut = new LBitmap(new LBitmapData(datalist["iconOut"]));
	iconOut.x = iconPlay.getWidth()*2 + 6;
	playLayer.addChild(iconOut);
	playLayer.graphics.drawRect(1,"#000000",[0,0,iconPlay.getWidth()*3 + 6,32],true,"#666666");
	playLayer.x = (LGlobal.width - playLayer.getWidth())*0.5;
	stageLayer.addChild(playLayer);
	
	gameStage.y = iconPlay.getHeight();
	gameStage.mask = new LSprite();
	gameStage.mask.y = gameStage.y;
	gameStage.mask.graphics.drawRect(0,"#333333",[0,0,LGlobal.width,LGlobal.height]);
	window.onresize = ToolInterface.onresize;
	
	ToolInterface.titleInit("舞台",new LSprite());
	//ToolInterface.titleInit("舞台",gameStage);
};
ToolInterface.titleInit = function(_name,_stage){
	for(var i=0,l=gameStage.childList.length;i<l;i++){
		gameStage.childList[i].visible = false;
	}
	var closeButton;
	var stageTitle = new LSprite();
	stageTitle.stage = _stage;
	stageTitle.y = 3;
	if(gameStage.childList.length > 0){
		closeButton = new LButton(new LBitmap(new LBitmapData(datalist["iconClose"],0,0,24,24)),new LBitmap(new LBitmapData(datalist["iconClose"],24,0,24,24)));
		closeButton.x = 5;
		closeButton.y = 4;
		closeButton.addEventListener(LMouseEvent.MOUSE_UP,ToolInterface.removeStageFromCloseButton);
		stageTitle.addChild(closeButton);
	}
	var titleLabel = new LTextField();
	titleLabel.text = _name;
	titleLabel.color = "#FFFFFF";
	titleLabel.size = 12;
	titleLabel.x = 10 + (closeButton?closeButton.getWidth():0);
	titleLabel.y = 8;
	stageTitle.addChild(titleLabel);
	
	stageTitle.graphics.drawRoundRect(1,"#000000",[0,0,titleLabel.x + titleLabel.getWidth() + 10,40,10],true,"#666666");
	stageTitle.x = titleLayer.getWidth();
	titleLayer.addChild(stageTitle);
	gameStage.addChild(_stage);
	_stage.visible = true;
	//stageList.push(stageTitle.stage);
};
ToolInterface.removeStageFromCloseButton = function(e){
	var closeBtn = e.clickTarget;
	closeBtn.parent.stage.remove();
	closeBtn.parent.remove();
	var l=titleLayer.childList.length,startX=0;
	for(var i=0;i<l;i++){
		if(i==l-1){
			gameStage.childList[i].visible = true;
		}else{
			gameStage.childList[i].visible = false;
		}
		titleLayer.childList[i].x = startX;
		console.log("titleLayer.childList[i].getWidth()",titleLayer.childList[i].getWidth());
		startX += titleLayer.childList[i].getWidth();
	}
};

LGlobal.onShow = function (){
	if(LGlobal.canvas == null)return;
	if(LGlobal.box2d != null){
		LGlobal.box2d.ll_show();
		if(!LGlobal.traceDebug && LGlobal.keepClear){
			LGlobal.canvas.clearRect(0,0,LGlobal.width+1,LGlobal.height+1);
		}
	}else{
		if(ToolInterface.isresize){
			ToolInterface.resize();
			ToolInterface.isresize = false;
		}
		if(LGlobal.keepClear){LGlobal.canvas.clearRect(0,0,LGlobal.width+1,LGlobal.height+1);}
		if(LGlobal.backgroundColor !== null){
			LGlobal.canvas.fillStyle=LGlobal.backgroundColor;
			LGlobal.canvas.fillRect(0,0,LGlobal.width,LGlobal.height);
		}
	}
	LGlobal.buttonShow(LGlobal.buttonList);
	LGlobal.show(LGlobal.childList);
};
ToolInterface.isresize = false;
ToolInterface.onresize = function(){
	ToolInterface.isresize = true;
};
ToolInterface.resize = function(){
	LGlobal.width = window.innerWidth;
	LGlobal.height = window.innerHeight;
	LGlobal.canvasObj.width  = LGlobal.width;
	LGlobal.canvasObj.height  = LGlobal.height;
	LGlobal.resize();
	rootLayer.graphics.clear();
	rootLayer.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,LGlobal.height],true,"#999999");
	
	var backgroundColor=LGlobal.canvas.createLinearGradient(0,-20,0,30);
	backgroundColor.addColorStop(0,"#FFFFFF");
	backgroundColor.addColorStop(1,"#000000");
	studioMenubar.back.graphics.clear();
	studioMenubar.back.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,studioMenubar.menu.getHeight()],true,backgroundColor);
	
	materials.x = LGlobal.width - materials.getWidth();
	property.x = LGlobal.width - materials.getWidth();
	projectFiles.x = materials.x - projectFiles.getWidth();
	playLayer.x = (LGlobal.width - playLayer.getWidth())*0.5;
	
};
