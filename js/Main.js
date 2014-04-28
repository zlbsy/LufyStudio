init(1000/60,"lufylegend",window.innerWidth,window.innerHeight,main);
var baseLayer;
var stageLayer;
var loadingLayer;
var datalist;
var loadData = [
{path:"./js/StudioMenubar.js",type:"js"},
{path:"./js/ProjectFiles.js",type:"js"}
];
function main(){
	LMouseEventContainer.set(LMouseEvent.MOUSE_DOWN,true);
	LMouseEventContainer.set(LMouseEvent.MOUSE_UP,true);
	LMouseEventContainer.set(LMouseEvent.MOUSE_MOVE,true);
	LGlobal.setDebug(true);
	
	initLayer();
	
	loadingLayer = new LoadingSample4();
	baseLayer.addChild(loadingLayer);	
	LLoadManage.load(
		loadData,
		function(progress){
			loadingLayer.setProgress(progress);
		},
		function(result){
			datalist = result;
			baseLayer.removeChild(loadingLayer);
			loadingLayer = null;
			mainStart();
		}
	);
}
function initLayer(){
	baseLayer = new LSprite();
	baseLayer.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,LGlobal.height],true,"#999999");
	addChild(baseLayer);
	stageLayer = new LSprite();
	baseLayer.addChild(stageLayer);
}
function mainStart(){
	addMenubar();
}
function addMenubar(){
	var menu = new StudioMenubar();
	baseLayer.addChild(menu);
	
	var pro = new ProjectFiles();
	pro.y = 50;
	stageLayer.addChild(pro);
}
