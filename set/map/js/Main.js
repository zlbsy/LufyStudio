init(1000/60,"lufylegend",window.innerWidth,window.innerHeight,main);
var rootLayer;
var stageLayer;
var loadingLayer;
var characterList;
var datalist;
var loadData = [
{path:"./js/ToolInterface.js",type:"js"},
{path:"../../images/smap/01-small.png",name:"map"}
];
function main(){
	LMouseEventContainer.set(LMouseEvent.MOUSE_DOWN,true);
	LMouseEventContainer.set(LMouseEvent.MOUSE_UP,true);
	LMouseEventContainer.set(LMouseEvent.MOUSE_MOVE,true);
	LMouseEventContainer.set(LMouseEvent.DOUBLE_CLICK,true);
	LGlobal.setDebug(true);
	LGlobal.stageScale = LStageScaleMode.NO_SCALE;
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