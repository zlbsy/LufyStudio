function EventListView(){
	base(this,LView,[]);
}
EventListView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
EventListView.prototype.init=function(){
	var self = this;
	var windowBackgrond = getBlackBitmap();
	self.addChild(windowBackgrond);
	
	var title = Language.get("stamp_list");
	var txtTitle = getStrokeLabel(title,30,"#FFFFFF","#CCCCCC",1);
	txtTitle.x = (LGlobal.width - txtTitle.getWidth()) * 0.5;
	txtTitle.y = 20;
	self.addChild(txtTitle);
	
	self.listLayer = new LSprite();
	self.addChild(self.listLayer);
	self.listLayerInit();
	
	self.ctrlLayer = new LSprite();
	self.addChild(self.ctrlLayer);
	self.ctrlLayerInit();
};
EventListView.prototype.onClickCloseButton=function(event){
	var self = event.currentTarget.parent.parent;
	self.areaMap = null;
	self.mapData = null;
	self.controller.close();
};
EventListView.prototype.listLayerInit=function(){
	var self = this;
	var backLayer = new LSprite();
	var bitmapData = new LBitmapData(null,0,0,430, 120 * ((EventListConfig.length / 2 >>> 0) + 1) - 10,LBitmapData.DATA_CANVAS);
	backLayer.addChild(new LBitmap(bitmapData));
	for(var i=0,l=EventListConfig.length;i<l;i++){
		var eventObject = EventListConfig[i];
		var child = new EventListChildView(self.controller, eventObject, bitmapData, 220 * (i % 2), 120 * (i / 2 >>> 0));
		backLayer.addChild(child);
	}
	
	self.listLayer.listLayer = backLayer;
	var left = backLayer.graphics.startX(), right = left + backLayer.graphics.getWidth();
	var sc = new LScrollbar(backLayer, 430, LGlobal.height - 100, 10);
	sc.x = 25;
	sc.y = 80;
	self.listLayer.addChild(sc);
	sc.excluding = true;
	backLayer.addEventListener(LMouseEvent.MOUSE_DOWN, self.stampClickDown.bind(self));
	backLayer.addEventListener(LMouseEvent.MOUSE_UP, self.stampClickUp.bind(self));
	
};
EventListView.prototype.stampClickDown = function(event) {
	var self = this;
	var stamp = event.target;
	self.clickIndex = stamp.objectIndex;
	stamp.offsetX = event.offsetX;
	stamp.offsetY = event.offsetY;
};
EventListView.prototype.stampClickUp = function(event) {
	if(event.target.constructor.name != "EventListChildView"){
		return;
	}
	var self = this;
	var stamp = event.target;
	if(self.clickIndex != stamp.objectIndex || stamp.lock){
		return;
	}
	if (stamp.offsetX && stamp.offsetY && Math.abs(stamp.offsetX - event.offsetX) < 5 && Math.abs(stamp.offsetY - event.offsetY) < 5) {
		var script = "";
		var params = LPlugin.GetData("event_params_"+stamp.eventObject.id);
		if(params && params.length){
			for(var i=0;i<params.length;i++){
				var param = params[i];
				script += String.format("Var.set({0},{1});", param.n, param.v);
			}
		}
		script += "SGJEvent.init();";
		script += "Load.script("+stamp.eventObject.script+");";
		script += "SGJEvent.end();";
		LGlobal.script.addScript(script);
	}
};
EventListView.prototype.ctrlLayerInit=function(){
	var self = this;
	var bitmapClose = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
	var buttonClose = new LButton(bitmapClose);
	buttonClose.x = LGlobal.width - bitmapClose.getWidth() - 5;
	buttonClose.y = 5;
	
	self.ctrlLayer.addChild(buttonClose);
	buttonClose.addEventListener(LMouseEvent.MOUSE_UP,self.onClickCloseButton);
};
