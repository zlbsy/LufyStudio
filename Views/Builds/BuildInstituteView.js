/**
 * 太学院
 * 发展技术，研究兵种
 */
function BuildInstituteView(controller){
	var self = this;
	base(self,BuildBaseView,[controller,"institute"]);
}
BuildInstituteView.prototype.showMenu=function(){
	var self = this, layer = new LSprite(), menuY = 0, menuHeight = 55;
	var buttonTechnology = getButton(Language.get("technology"),200);
	buttonTechnology.y = menuY;
	layer.addChild(buttonTechnology);
	
	menuY += menuHeight;
	var buttonResearch = getButton(Language.get("research"),200);
	buttonResearch.y = menuY;
	layer.addChild(buttonResearch);
	
	return layer;
};
BuildInstituteView.prototype.onClick=function(event){
	var self = event.currentTarget;
	self.controller.tavernShow();
};