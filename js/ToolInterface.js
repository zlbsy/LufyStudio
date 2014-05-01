var studioMenubar;
var materials;
var projectFiles;
var gameStage;
var stageList;
function ToolInterface(){
}
ToolInterface.init = function(){
	studioMenubar = new StudioMenubar();
	rootLayer.addChild(studioMenubar);
	stageLayer.y = studioMenubar.getHeight();
	materials = new Materials();
	materials.x = LGlobal.width - materials.getWidth();
	stageLayer.addChild(materials);
	
	projectFiles = new ProjectFiles();
	projectFiles.x = materials.x - projectFiles.getWidth();
	stageLayer.addChild(projectFiles);
	
	var playLayer = new LSprite();
	var iconPlay = new LBitmap(new LBitmapData(datalist["iconPlay"]));
	iconPlay.x = (iconPlay.getWidth()*3 + 6 - iconPlay.getWidth())*0.5;
	playLayer.addChild(iconPlay);
	playLayer.graphics.drawRect(1,"#000000",[0,0,iconPlay.getWidth()*3 + 6,48],true,"#666666");
	playLayer.x = (LGlobal.width - playLayer.getWidth())*0.5;
	stageLayer.addChild(playLayer);
	
	gameStage = new LSprite();
	gameStage.y = iconPlay.getHeight();
	gameStage.graphics.drawRect(1,"#333333",[0,0,800,480],true,"#FFFFFF");
	stageLayer.addChild(gameStage);
	
	ToolInterface.titleInit();
};
ToolInterface.titleInit = function(){
	var stageTitle = new LSprite();
	var closeButton = new LButton(new LBitmap(new LBitmapData(datalist["iconClose"],0,0,24,24)),new LBitmap(new LBitmapData(datalist["iconClose"],24,0,24,24)));
	closeButton.x = 5;
	closeButton.y = 12;
	stageTitle.addChild(closeButton);
	stageTitle.graphics.drawRect(1,"#000000",[0,0,200,48],true,"#666666");
	stageLayer.addChild(stageTitle);
};
