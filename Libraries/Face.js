function Face(id){
	var self = this;
	base(self,LSprite,[]);
	//console.log("id="+id);
	self.id = id;
	self.loadData(LMvc.IMG_PATH + "face/"+id+".png");
}
Face.prototype.loadData = function(path){
	var self = this;
	var loader = new LLoader();
	loader.parent = self;
    loader.addEventListener(LEvent.COMPLETE, self.loadDataComplete);
    path += LGlobal.traceDebug ? "?t="+(new Date()).getTime() : "";
    loader.load(path, "bitmapData");
};
Face.prototype.loadDataComplete = function(event){
	var loader = event.currentTarget;
	var self = loader.parent;
    var bitmapdata = new LBitmapData(event.target);
	self.addChild(new LBitmap(bitmapdata));
	self.dispatchEvent(LEvent.COMPLETE);
};