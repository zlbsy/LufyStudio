var studioMenubar;
var materials;
var projectFiles;
var gameStage;
var stageList = [];
var playLayer;
function ToolInterface(){
}
ToolInterface.init = function(){
	
	gameStage = new LSprite();
	gameStage.graphics.drawRect(1,"#333333",[0,0,800,480],true,"#FFFFFF");
	stageLayer.addChild(gameStage);
	
	studioMenubar = new StudioMenubar();
	rootLayer.addChild(studioMenubar);
	stageLayer.y = studioMenubar.getHeight();
	materials = new Materials();
	materials.x = LGlobal.width - materials.getWidth();
	stageLayer.addChild(materials);
	
	projectFiles = new ProjectFiles();
	projectFiles.x = materials.x - projectFiles.getWidth();
	stageLayer.addChild(projectFiles);
	
	playLayer = new LSprite();
	var iconPlay = new LBitmap(new LBitmapData(datalist["iconPlay"]));
	iconPlay.x = (iconPlay.getWidth()*3 + 6 - iconPlay.getWidth())*0.5;
	playLayer.addChild(iconPlay);
	playLayer.graphics.drawRect(1,"#000000",[0,0,iconPlay.getWidth()*3 + 6,48],true,"#666666");
	playLayer.x = (LGlobal.width - playLayer.getWidth())*0.5;
	stageLayer.addChild(playLayer);
	
	gameStage.y = iconPlay.getHeight();
	window.onresize = ToolInterface.onresize;
	
	ToolInterface.titleInit();
};
ToolInterface.titleInit = function(){
	var stageTitle = new LSprite();
	var closeButton = new LButton(new LBitmap(new LBitmapData(datalist["iconClose"],0,0,24,24)),new LBitmap(new LBitmapData(datalist["iconClose"],24,0,24,24)));
	closeButton.x = 5;
	closeButton.y = 12;
	stageTitle.addChild(closeButton);
	
	var titleLabel = new LTextField();
	titleLabel.text = "舞台";
	titleLabel.color = "#FFFFFF";
	titleLabel.size = 14;
	titleLabel.x = closeButton.x + 30;
	titleLabel.y = closeButton.y;
	stageTitle.addChild(titleLabel);
	
	stageTitle.graphics.drawRect(1,"#000000",[0,0,200,48],true,"#666666");
	stageLayer.addChild(stageTitle);
	stageList.push(stageTitle);
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
	
	studioMenubar.back.graphics.clear();
	studioMenubar.back.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,studioMenubar.menu.getHeight()],true,"#333333");
	
	materials.x = LGlobal.width - materials.getWidth();
	projectFiles.x = materials.x - projectFiles.getWidth();
	playLayer.x = (LGlobal.width - playLayer.getWidth())*0.5;
	
};
