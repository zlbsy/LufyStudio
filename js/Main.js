init(1000/60,"lufylegend",window.innerWidth,window.innerHeight,main);
var rootLayer;
var stageLayer;
var loadingLayer;
var datalist;
var loadData = [
{path:"./images/translucent.png",name:"translucent"},
{path:"./js/StudioMenubar.js",type:"js"},
{path:"./js/ProjectFiles.js",type:"js"},
{path:"./js/Materials.js",type:"js"},
{path:"./js/ToolInterface.js",type:"js"}
];
function main(){
	LMouseEventContainer.set(LMouseEvent.MOUSE_DOWN,true);
	LMouseEventContainer.set(LMouseEvent.MOUSE_UP,true);
	LMouseEventContainer.set(LMouseEvent.MOUSE_MOVE,true);
	LGlobal.setDebug(true);
	
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
}
function mainStart(){
	ToolInterface.init();
}
