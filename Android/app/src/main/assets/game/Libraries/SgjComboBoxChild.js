function SgjComboBoxChild(content, comboBox, selected) {
	var self = this;
	base(self, LComboBoxChild, [content, comboBox, selected]);
}
SgjComboBoxChild.prototype.setStatus = function(content, comboBox) {
	var self = this;
	var panel = new LPanel(new LBitmapData(LMvc.datalist["win05"], 10,10,20,20), self.childWidth, 40);
	panel.cacheAsBitmap(true);
	self.addChild(panel);
	var text = LTextField.getLabel();
	text.size = comboBox.size;
	text.color = comboBox.color;
	text.font = comboBox.font;
	text.lineColor = "#000000";
	text.stroke = true;
	text.lineWidth = 3;
	text.text = content.label;
	text.x = text.y = 10;
	self.addChild(text);
	self.updateView();
};
SgjComboBoxChild.prototype.setSelectStatus = function(content, comboBox) {
	var self = this;
	var panel = new LPanel(new LBitmapData(LMvc.datalist["win07"], 15,10,20,20), self.childWidth, 40);
	panel.cacheAsBitmap(true);
	self.addChild(panel);
	var text = LTextField.getLabel();
	text.size = comboBox.size;
	text.color = comboBox.color;
	text.font = comboBox.font;
	text.lineColor = "#000000";
	text.stroke = true;
	text.lineWidth = 3;
	text.text = content.label;
	text.x = text.y = 10;
	self.addChild(text);
	self.updateView();
};
function TrainingComboBoxChild(content, comboBox, selected) {
	var self = this;
	self.childWidth = 250;
	base(self, SgjComboBoxChild, [content, comboBox, selected]);
}
function ExpeditionComboBoxChild(content, comboBox, selected) {
	var self = this;
	self.childWidth = 210;
	base(self, SgjComboBoxChild, [content, comboBox, selected]);
}
function CreateCharacterComboBoxChild(content, comboBox, selected) {
	var self = this;
	self.childWidth = 100;
	base(self, SgjComboBoxChild, [content, comboBox, selected]);
}
function CreateCharacterSkillComboBoxChild(content, comboBox, selected) {
	var self = this;
	self.childWidth = 170;
	base(self, SgjComboBoxChild, [content, comboBox, selected]);
}
function CreateCityComboBoxChild(content, comboBox, selected) {
	var self = this;
	self.childWidth = 120;
	base(self, SgjComboBoxChild, [content, comboBox, selected]);
}
function CreatePrefectureComboBoxChild(content, comboBox, selected) {
	var self = this;
	self.childWidth = 150;
	base(self, SgjComboBoxChild, [content, comboBox, selected]);
}