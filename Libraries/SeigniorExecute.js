function SeigniorExecute(){
	var self = this;
};
SeigniorExecute.start = function(){
	if(!SeigniorExecute.Instance){
		SeigniorExecute.Instance = new SeigniorExecute();
	}
	SeigniorExecute.Instance.run();
};
SeigniorExecute.prototype.run=function(){
	var self = this;
	self.maskShow();
	for(var i=0;i<SeigniorModel.list.length;i++){
		var seigniorModel = SeigniorModel.list[i];
		self.areasRun(seigniorModel.chara_id());
	}
	self.maskHide();
};
SeigniorExecute.prototype.areaRun=function(area){
	var self = this, chara, job;
	var generals = area.generals();
	console.log("SeigniorExecute.prototype.areaRun",generals);
	var list = [];
	for(var i=0;i<generals.length;i++){
		chara = generals[i];
		job = chara.job();
		//console.log("SeigniorExecute.prototype.areaRun job",chara.id(),job);
		switch(job){
			case Job.MOVE:
				list.push(chara);
				break;
			case Job.AGRICULTURE:
				agricultureRun(chara);
				break;
			case Job.BUSINESS:
				businessRun(chara);
				break;
			case Job.POLICE:
				policeRun(chara);
				break;
			case Job.TECHNOLOGY:
				technologyRun(chara);
				break;
		}
	}
	if(list.length == 0){
		return;
	}
	console.log("SeigniorExecute.prototype.areaRun list",list.length);
	for(var i=0;i<list.length;i++){
		chara = list[i];
		job = chara.job();
		switch(job){
			case Job.MOVE:
				console.log("SeigniorExecute.prototype.areaRun move chara",chara.id());
				chara.moveTo();
				break;
		}
	}
};
SeigniorExecute.prototype.areasRun=function(chara_id){
	var self = this;
	for(var i=0;i<AreaModel.list.length;i++){
		var areaModel = AreaModel.list[i];
		if(areaModel.seignior_chara_id() == chara_id){
			self.areaRun(areaModel);
		}
	}
};
SeigniorExecute.prototype.maskShow=function(){
	var self = this;
	self.backLayer = new LSprite();
	self.backLayer.addChild(getBitmap(new LPanel(new LBitmapData(LMvc.datalist["translucent"]),LGlobal.width, LGlobal.height)));
	self.backLayer.addEventListener(LMouseEvent.MOUSE_UP, function(){});
	self.backLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function(){});
	LMvc.MapController.view.parent.addChild(self.backLayer);
};
SeigniorExecute.prototype.maskHide=function(){
	this.backLayer.remove();
};