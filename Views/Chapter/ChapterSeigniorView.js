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
	
	var name = getStrokeLabel(self.data.name,20,String.format("rgb({0})",self.data.color),self.data.color=="1,1,1"?"#CCCCCC":"#000000",1);
	name.x = winSize - name.getWidth() - 15;
	name.y = 15;
	win.addChild(name);
	
	var city_count_label = getStrokeLabel(Language.get("city"),18,"#000000","#CCCCCC",1);
	city_count_label.x = winSize - city_count_label.getWidth() - 15;
	city_count_label.y = 55;
	win.addChild(city_count_label);
	var city_count = getStrokeLabel(self.data.citys.length,18,"#000000","#CCCCCC",1);
	city_count.x = winSize - city_count.getWidth() - 15;
	city_count.y = 75;
	win.addChild(city_count);
	
	var general_count_label = getStrokeLabel(Language.get("generals"),18,"#000000","#CCCCCC",1);
	general_count_label.x = winSize - general_count_label.getWidth() - 15;
	general_count_label.y = 100;
	win.addChild(general_count_label);
	var general_count = getStrokeLabel(self.data.general_count,18,"#000000","#CCCCCC",1);
	general_count.x = winSize - general_count.getWidth() - 15;
	general_count.y = 120;
	win.addChild(general_count);
	win.cacheAsBitmap(true);
	self.layer.addChild(win);
	if(self.data.chara_id < 1000){
		var loader = new LURLLoader();
		loader.parent = self;
	    loader.addEventListener(LEvent.COMPLETE, self.loadTxtComplete);
	    var path = LMvc.IMG_PATH+"face/base64/"+self.data.faceImg+".txt";
	    path += LGlobal.traceDebug ? "?t="+(new Date()).getTime() : "";
	    loader.load(path, "text");
    }else{
    	var loader = new LLoader();
		loader.parent = self;
	    loader.addEventListener(LEvent.COMPLETE, self.loadFaceComplete); 
	    loader.load(GameManager.readFaceData(self.data.chara_id), "bitmapData");
    }
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
	var obj = {title:Language.get("confirm"),messageHtml:String.format(Language.get("select_seignior_message"), self.data.name),height:200,
	okEvent:chapterView.okEvent.bind(chapterView),cancelEvent:null};
	var windowLayer = ConfirmWindow(obj);
	chapterView.addChild(windowLayer);
};