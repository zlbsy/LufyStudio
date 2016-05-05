function RecordController(){
	base(this,MyController,[]);
}
RecordController.RECORD_MAX = 20;
RecordController.SAVE_MODE = "saveMode";
RecordController.READ_MODE = "readMode";
RecordController.instance = function(){
	if(!RecordController._instance){
		RecordController._instance = new RecordController();
		LMvc.layer.addChild(RecordController._instance.view);
		RecordController._instance.view.visible = false;
	}
	return RecordController._instance;
};
RecordController.prototype.construct=function(){
	var self = this;
};
RecordController.prototype.show=function(mode){
	var self = this;
	self.mode = mode;
	LMvc.layer.setChildIndex(self.view,LMvc.layer.numChildren - 1);
	//self.view.y = LGlobal.height;
	var list = self.model.getImages();
	self.load.image(list,self.loadLibrary);
	//self.load.view(["Record/RecordChild"],self.showRecordList);
};
RecordController.prototype.hide=function(){
	var self = this;
	self.view.visible = false;
};
RecordController.prototype.loadLibrary=function(){
	var self = this;
	self.load.library(["GameManager", String.format("language/{0}/LanguageAll",LPlugin.language())],self.loadView);
};
RecordController.prototype.loadView=function(){
	var self = this;
	self.load.view(["Record/RecordChild"],self.showRecordList);
};
RecordController.prototype.showRecordList=function(){
	var self = this;
	self.view.visible = true;
	self.dispatchEvent(LEvent.COMPLETE);
	/*var records = [];
	for(var i=0;i<RecordController.RECORD_MAX;i++){
		var record = LPlugin.GetData("gameRecord_" + i);
		
	}*/
	/*self.gameRecord = LPlugin.GetData("gameRecord");
	if(!self.gameRecord.records){
		var records = [];
		self.gameRecord.records = records;
	}*/
};
RecordController.prototype.autoSaveRecord=function(){
	var self = this;console.log("autoSaveRecord");
	var items = self.view.listView.getItems();
	items[0].toSaveData();
};