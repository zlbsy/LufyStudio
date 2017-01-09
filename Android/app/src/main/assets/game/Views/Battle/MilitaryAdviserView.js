function MilitaryAdviserView(controller, characterModel){
	var self = this;
	LExtends(self,LView,[controller]);
	self.set(characterModel);
}
MilitaryAdviserView.prototype.set = function(characterModel){
	var self = this;
	var militaryModel = characterModel.military();
	var msg = getStrokeLabel(String.format(Language.get("militaryConfirm"),militaryModel.name()),16,"#FFFFFF","#000000",4, "htmlText");
	var lblDetailed = String.format("<font size='21' color='#D3D3D3'>{0}：</font><font size='21' color='#FFFFFF'>{1}</font>", Language.get("effect"), militaryModel.explanation());
	var detailed = getStrokeLabel(lblDetailed,16,"#FFFFFF","#000000",4, "htmlText");
	detailed.width = 300;
	detailed.setWordWrap(true,27);
	detailed.y = 40;
	var note = getStrokeLabel(Language.get("militaryNode"),16,"#FAFAD2","#000000",4);
	note.y = 125;
	self.addChild(msg);
	self.addChild(detailed);
	self.addChild(note);
};