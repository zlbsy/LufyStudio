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
	var list = self.model.getImages();
	self.load.image(list,self.loadLibrary);
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
};
RecordController.prototype.autoSaveRecord=function(){
	var self = this;
	if(self.view.listView){
		var items = self.view.listView.getItems();
		items[0].toSaveData();
	}else{
		GameManager.save(0);
	}
};