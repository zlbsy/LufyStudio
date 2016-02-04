function ChapterSeigniorView(data){
	var self = this;
	base(self, LListChildView, []);
	self.data = data;
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
	
	var city_count_label = getStrokeLabel("城市",20,"#000000","#CCCCCC",1);
	city_count_label.x = faceSize + 5;
	city_count_label.y = 55;
	win.addChild(city_count_label);
	var city_count = getStrokeLabel(self.data.city_count,20,"#000000","#CCCCCC",1);
	city_count.x = faceSize + 5;
	city_count.y = 75;
	win.addChild(city_count);
	
	var general_count_label = getStrokeLabel("武将",20,"#000000","#CCCCCC",1);
	general_count_label.x = faceSize + 5;
	general_count_label.y = 100;
	win.addChild(general_count_label);
	var general_count = getStrokeLabel(self.data.general_count,20,"#000000","#CCCCCC",1);
	general_count.x = faceSize + 5;
	general_count.y = 120;
	win.addChild(general_count);
	win.cacheAsBitmap(true);
	self.layer.addChild(win);
	
	var face = new CharacterFace(self.data.faceImg);
	face.x = 5;
	face.y = 5;
	face.scaleX = face.scaleY = 100 / 220;
	self.layer.addChild(face);
    face.addEventListener(LEvent.COMPLETE, self.loadFaceComplete); 
};
ChapterSeigniorView.prototype.loadFaceComplete=function(event){
	var self = event.currentTarget.parent.parent;
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