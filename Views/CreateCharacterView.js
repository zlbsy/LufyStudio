function CreateCharacterView(controller){
	base(this,LView,[controller]);
}
CreateCharacterView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
CreateCharacterView.prototype.layerInit=function(){
	var self = this;
	//self.addChild(getTranslucentMask());
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
};
CreateCharacterView.prototype.init=function(){
	var self = this;
	self.layerInit();
	
	var updateButton = getSizeButton("做成",80,40);
	updateButton.x = 90;
	updateButton.y = 90;
	self.baseLayer.addChild(updateButton);
	updateButton.addEventListener(LMouseEvent.MOUSE_UP, self.showDetailed);
};
CreateCharacterView.prototype.showDetailed=function(event){
	var self = event.currentTarget.parent.parent;
	var data = {id:1,name:"测试",faceImg:4,gender:1,statusPoint:10,force:72,intelligence:92,command:99,agility:82,luck:96,born:155,life:54,personalLoyalty:6,ambition:15,disposition:0,skill:2,compatibility:25,initTroops:100,initStrategy:20,proficiencyPoint:100,soldiers:[{id:1,proficiency:900},{id:2,proficiency:500},{id:3,proficiency:0},{id:4,proficiency:0},{id:5,proficiency:0},{id:6,proficiency:0},{id:7,proficiency:0},{id:8,proficiency:0},{id:9,proficiency:0},{id:10,proficiency:0},{id:11,proficiency:0},{id:12,proficiency:0},{id:13,proficiency:0},{id:14,proficiency:0},{id:15,proficiency:0},{id:16,proficiency:0},{id:17,proficiency:0},{id:18,proficiency:0},{id:19,proficiency:0}],groupSkill:0};
	data = null;
	var detailedView = new CreateCharacterDetailedView(self.controller, data);
	var obj = {title:Language.get("武将做成"),subWindow:detailedView,contentStartY:60,width:LGlobal.width,height:LGlobal.height - 20,okEvent:null,cancelEvent:null};
	var windowLayer = ConfirmWindow(obj);
	self.addChild(windowLayer);
};