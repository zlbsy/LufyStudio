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
	
	var detailedView = new CreateCharacterDetailedView(self.controller);
	var obj = {title:Language.get("武将做成"),subWindow:detailedView,contentStartY:60,width:LGlobal.width,height:LGlobal.height - 20,okEvent:null,cancelEvent:null};
	var windowLayer = ConfirmWindow(obj);
	self.addChild(windowLayer);
};