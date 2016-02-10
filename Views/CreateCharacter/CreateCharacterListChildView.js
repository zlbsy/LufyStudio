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
	parentView.toShowDetailed(self.data);
};
CreateCharacterListChildView.prototype.setStatus = function() {
	var self = this, label;
	var layer = new LSprite();
	layer.graphics.drawRect(0, "#ff0000", [0, 0, LGlobal.width - 20, 40]);
	var bitmapLine = new LBitmap(new LBitmapData(LMvc.datalist["icon-line"]));
	bitmapLine.scaleX = LGlobal.width - 60;
	//bitmapLine.x = 10;
	bitmapLine.y = 38;
	layer.addChild(bitmapLine);
	/*
	self.setAbilityProperties();
}; 
CreateCharacterListChildView.prototype.setAbilityProperties = function() {
	var self = this, label;
	var layer = new LSprite();
	layer.graphics.drawRect(0, "#ff0000", [0, 0, LGlobal.width - 20, 50]);*/
	var list = ["name", 20, "force", 110, "intelligence", 160, "command", 210, "agility", 260, "luck", 310];
	for(var i=0,l=list.length;i<l;i+=2){
		label = getStrokeLabel(self.data[list[i]],18,"#FFFFFF","#000000",4);
		label.x = list[i + 1] - list[1];
		label.y = 5;
		layer.addChild(label);
	}
	var skillName;
	if(self.data.skill > 0){
		skillName = SkillMasterModel.getMaster(self.data.skill).name();
	}else{
		skillName = Language.get("null");
	}
	label = getStrokeLabel(skillName,18,"#FFFFFF","#000000",4);
	label.x = 360 - list[1];
	label.y = 5;
	layer.addChild(label);
	/*var name = getStrokeLabel(self.data.command, 18, "#FFFFFF", "#000000", 4);
	name.x = 5;
	name.y = 5;
	layer.addChild(name);
	var name = getStrokeLabel(self.data.force, 18, "#FFFFFF", "#000000", 4);
	name.x = 60 + 5;
	name.y = 5;
	layer.addChild(name);
	var name = getStrokeLabel(self.data.intelligence, 18, "#FFFFFF", "#000000", 4);
	name.x = 60 * 2 + 5;
	name.y = 5;
	layer.addChild(name);
	var name = getStrokeLabel(self.data.agility, 18, "#FFFFFF", "#000000", 4);
	name.x = 60 * 3 + 5;
	name.y = 5;
	layer.addChild(name);
	var name = getStrokeLabel(self.data.luck, 18, "#FFFFFF", "#000000", 4);
	name.x = 60 * 4 + 5;
	name.y = 5;
	layer.addChild(name);*/

	layer.x = 10;
	layer.y = 10;
	self.addChild(layer);
}; 