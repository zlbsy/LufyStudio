init(1000/60,"lufylegend",480,800,main);
var rootLayer;
var stageLayer;
var loadingLayer;
var characterList;
var datalist;
var loadData = [
{path:"./js/ToolInterface.js",type:"js"},
{path:"./js/StudioMenubar.js",type:"js"},
{path:"./js/CreateWindow.js",type:"js"},
{path:"./js/MapChild.js",type:"js"},
{path:"./tile_map.png",name:"tile_map"}
];
function main(){
	LMouseEventContainer.set(LMouseEvent.MOUSE_DOWN,true);
	LMouseEventContainer.set(LMouseEvent.MOUSE_UP,true);
	LMouseEventContainer.set(LMouseEvent.MOUSE_MOVE,true);
	LMouseEventContainer.set(LMouseEvent.DOUBLE_CLICK,true);
	LGlobal.setDebug(true);
	if(LGlobal.mobile){
		LGlobal.width = 480;
		LGlobal.height = 480*window.innerHeight/window.innerWidth;
		LGlobal.canvasObj.width  = LGlobal.width;
		LGlobal.canvasObj.height  = LGlobal.height;
	}
	LGlobal.align = LStageAlign.TOP_LEFT;
	LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
	LSystem.screen(LStage.FULL_SCREEN);
			
	initLayer();
	loadingLayer = new LoadingSample4();
	rootLayer.addChild(loadingLayer);	
	LLoadManage.load(
		loadData,
		function(progress){
			loadingLayer.setProgress(progress);
		},
		function(result){
			datalist = result;
			rootLayer.removeChild(loadingLayer);
			loadingLayer = null;
			mainStart();
		}
	);
}
function initLayer(){
	rootLayer = new LSprite();
	rootLayer.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,LGlobal.height],true,"#999999");
	addChild(rootLayer);
	stageLayer = new LSprite();
	rootLayer.addChild(stageLayer);
	//addChild(new FPS());
}
function mainStart(){
	
	ToolInterface.init();
}