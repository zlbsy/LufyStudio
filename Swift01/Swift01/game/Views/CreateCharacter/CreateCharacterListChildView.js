function CreateCharacterListChildView(data) {
	var self = this;
	base(self, LListChildView, []);
	self.set(data);
}

CreateCharacterListChildView.prototype.set = function(data) {
	var self = this;
	self.data = data;
	self.removeAllChild();
	self.setStatus();
};
CreateCharacterListChildView.prototype.onClick = function(event) {
	var self = event.target;
	var parentView = event.currentTarget.parent.parent;
	if(event.selfX > 400){
		parentView.toDeleteChild(self.data);
		return;
	}
	parentView.toShowDetailed(self.data);
};
CreateCharacterListChildView.prototype.setStatus = function() {
	var self = this, label;
	var layer = new LSprite();
	layer.graphics.drawRect(0, "#ff0000", [0, 0, LMvc.screenWidth - 20, 40]);
	var bitmapLine = new LBitmap(new LBitmapData(LMvc.datalist["icon-line"]));
	bitmapLine.scaleX = LMvc.screenWidth - 60;
	bitmapLine.y = 38;
	layer.addChild(bitmapLine);
	var list = ["name", 20, "force", 110, "intelligence", 160, "command", 210, "agility", 260, "luck", 310];
	for(var i=0,l=list.length;i<l;i+=2){
		label = getStrokeLabel(self.data[list[i]],17,"#FFFFFF","#000000",4);
		label.x = list[i + 1] - list[1];
		label.x *= 0.9;
		label.y = 5;
		layer.addChild(label);
	}
	var skillName;
	if(self.data.skill > 0){
		skillName = SkillMasterModel.getMaster(self.data.skill).name();
	}else{
		skillName = Language.get("null");
	}
	label = getStrokeLabel(skillName,17,"#FFFFFF","#000000",4);
	label.x = 360 - list[1];
	label.x *= 0.9;
	label.y = 5;
	layer.addChild(label);
	
	label = getStrokeLabel("×",20,"#FF0000","#000000",4);
	label.x = 460 - list[1];
	label.x *= 0.9;
	label.y = 5;
	layer.addChild(label);
	
	layer.x = 10;
	layer.y = 10;
	self.addChild(layer);
}; 