function ChapterSeigniorView(controller,data){
	var self = this;
	base(self, LListChildView, []);
	self.data = data;
	self.controller = controller;
	self.layer = new LSprite();
	self.addChild(self.layer);
	self.set();
}
ChapterSeigniorView.prototype.set=function(){
	var self = this;
	var faceSize = 100, winSize = 160;
	
	var win = new LPanel(new LBitmapData(LMvc.datalist["win05"]),winSize,winSize);
	
	var name = getStrokeLabel(self.data.name,20,self.data.color,"#000000",1);
	name.x = faceSize + 5;
	name.y = 15;
	win.addChild(name);
	
	var city_count_label = getStrokeLabel(Language.get("city"),20,"#000000","#CCCCCC",1);
	city_count_label.x = faceSize + 5;
	city_count_label.y = 55;
	win.addChild(city_count_label);
	var city_count = getStrokeLabel(self.data.citys.length,20,"#000000","#CCCCCC",1);
	city_count.x = faceSize + 5;
	city_count.y = 75;
	win.addChild(city_count);
	
	var general_count_label = getStrokeLabel(Language.get("generals"),20,"#000000","#CCCCCC",1);
	general_count_label.x = faceSize + 5;
	general_count_label.y = 100;
	win.addChild(general_count_label);
	var general_count = getStrokeLabel(self.data.general_count,20,"#000000","#CCCCCC",1);
	general_count.x = faceSize + 5;
	general_count.y = 120;
	win.addChild(general_count);
	win.cacheAsBitmap(true);
	self.layer.addChild(win);
	
	var loader = new LURLLoader();
	loader.parent = self;
    loader.addEventListener(LEvent.COMPLETE, self.loadTxtComplete);
    var path = LMvc.IMG_PATH+"face/base64/"+self.data.faceImg+".txt";
    path += LGlobal.traceDebug ? "?t="+(new Date()).getTime() : "";
    loader.load(path, "text");
};
ChapterSeigniorView.prototype.loadTxtComplete=function(event){
	var self = event.currentTarget.parent;
	var txtData=event.target;
	var loader = new LLoader();
	loader.parent = self;
    loader.addEventListener(LEvent.COMPLETE, self.loadFaceComplete); 
    loader.load(txtData, "bitmapData");
};
ChapterSeigniorView.prototype.loadFaceComplete=function(event){
	var self = event.currentTarget.parent;
	var face = new LBitmap(new LBitmapData(event.target));
	face.x = 5;
	face.y = 5;
	self.layer.addChild(face);
	self.cacheAsBitmap(false);
	self.updateView();
};
ChapterSeigniorView.prototype.onClick=function(event){
	var self = event.target;
	var listView = event.currentTarget;
	var chapterView = listView.parent.parent;
	chapterView.select_chara_id = self.data.chara_id;
	var obj = {title:"确认",message:"选择"+self.data.name+"吗？",height:200,
	okEvent:chapterView.okEvent.bind(chapterView),cancelEvent:null};
	var windowLayer = ConfirmWindow(obj);
	chapterView.addChild(windowLayer);
};