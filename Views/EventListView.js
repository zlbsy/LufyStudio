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
	self.listView = new LListView();
	self.listView.y = 15;
	self.listView.resize(440, LGlobal.height - 100);
	self.listView.maxPerLine = 2;
	self.listView.cellWidth = 220;
	self.listView.cellHeight = 100;
	self.listLayer.addChild(self.listView);
	self.listView.x = 20;
	self.listView.y = 80;
	var items = [];
	for(var i=0,l=EventListConfig.length;i<l;i++){
		var eventObject = EventListConfig[i];
		var child = new EventListChildView(eventObject);
		items.push(child);
	}
	self.listView.updateList(items);
};
EventListView.prototype.showDetailed = function(eventObject) {
	var self = this;
	var script = "";
	var params = LPlugin.GetData("event_params_"+eventObject.id);
	if(params && params.length){
		for(var i=0;i<params.length;i++){
			var param = params[i];
			script += String.format("Var.set({0},{1});", param.n, param.v);
		}
	}
	var path = String.format(eventObject.script,LPlugin.language());
	script += "SGJEvent.init();";
	script += "Load.script("+path+");";
	script += "SGJEvent.end();";
	LGlobal.script.addScript(script);
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
