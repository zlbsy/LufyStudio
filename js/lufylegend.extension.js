/*版本升级后加到引擎中，暂时添加*/
LTextField.prototype.windComplete = function() {
	var s = this;
	s._speedIndex = s.speed;
	s.text = s._ll_wind_text;
	s._ll_wind_length = s._ll_wind_text.length + 1;
	s._ll_windRun();
};
LDisplayObjectContainer.prototype.removeAllChild = function () {
	var s  = this, c = s.childList, i, l;
	for (i = 0, l = c.length; i < l; i++) {
		if (LGlobal.destroy && c[i].die) {
			c[i].die();
		}
		delete c[i].parent;
	}
	s.childList.length = 0;
	s.width = 0;
	s.height = 0;
	s.numChildren = 0;
};
LListView.prototype.clear = function() {
	var self = this;
	for (var i = 0, l = self._ll_items.length; i < l; i++) {
		self._ll_items[i].die();
	}
	self._ll_items.splice(0, self._ll_items.length);
	self.resizeScrollBar();
};
LListView.prototype.deleteChildView = function(child) {
	var self = this, c = self._ll_items, i, l;
	for ( i = 0, l = c.length; i < l; i++) {
		if (child.objectIndex == c[i].objectIndex) {
			c[i].die();
			self._ll_items.splice(i, 1);
			break;
		}
	}
	self.resizeScrollBar();
};
LListView.prototype.die = function(){
	var self = this;
	for(var i=0,l=self._ll_items.length;i<l;i++){
		self._ll_items[i].die();
	}
	self._ll_items = [];
	self.callParent("die",arguments);
};
LView.prototype.addController = function(controller){
	var self = this;
	if(self.controller){
		return;
	}
	self.controller = controller;
	self.model = controller.model;
	self.controller.addView(self);
};
LView.prototype.die = function() {
	var self = this;
	if (self.controller) {
		self.controller.removeView(self);
	}
	if (self.baseView) {
		self.controller.ll_dispatcher = {};
		self.controller.ll_viewList = [];
	}
	self.callParent("die", arguments);
	if (!LGlobal.destroy) {
		return;
	}
	return;
	var dieList = [];
	if (self.controller && self.controller.view && self.controller.view.objectIndex == self.objectIndex) {
		dieList.push(self.controller);
		dieList.push(self.controller.model);
	}
	dieList.push(self);
	if (dieList.length == 1) {
		return;
	}
	for (var i = 0; i < dieList.length; i++) {
		var obj = dieList[i];
		for (var k in obj) {
			delete obj[k];
		}
	}
};
LComboBox.prototype._showChildList = function (event) {
	var s = event.currentTarget;
	if(!s.list || s.list.length == 0){
		return;
	}
	s.showChildList();
};
//////////////////////华丽的分界线////////////////////
/*引擎中需调整*/
LButton.prototype.ll_button_mode = function(){
	return;
};
//////////////////////华丽的分界线////////////////////

/*不需要加到引擎中，只在本游戏中使用*/
LTextField._labels = [];
LTextField.getLabel = function(){
	if(LTextField._labels.length > 0){
		var label = LTextField._labels.shift();
		return label;
	}
	return new LTextField();
};
LTextField.prototype.die = function(){
	var self = this;
	self.text = "";
	self.htmlText = "";
	self.filters = null;
	self.visible = true;
	self.x = 0;
	self.y = 0;
	self.texttype = null;
	self.styleSheet = "";
	self.lineWidth = 1;
	self.weight = "normal";
	self.stroke = false;
	self.width = 150;
	self.wordWrap = false;
	self.multiline = false;
	self.numLines = 1;
	self.cacheAsBitmap(false);
	LTextField._labels.push(self);
	LMouseEventContainer.removeInputBox(self);
};
LButton.prototype.setCursorEnabled = function(event) {
	var self = this;
	self.callParent("setCursorEnabled", arguments);
	if (!self.se) {
		self.se = "Se_ok";
		self.addEventListener(LMouseEvent.MOUSE_DOWN, playButtonSe);
	}
};
if (!Array.getRandomArrays){
	Array.getRandomArrays = function(list,num){
		var result = [], length = list.length < num ? list.length : num;
		while (result.length < length){
			var i = Math.fakeRandom() * list.length >>> 0;
			var index = result.findIndex(function(child){
				return child == i;
			});
			if(index >= 0){
				continue;
			}
			result.push(i);
		}
		for(var i=0;i<result.length;i++){
			result[i] = list[result[i]];
		}
		return result;
	};
}
Math.fakeSeed = 1;
Math.fakeReset = function() {
	Math.fakeSeed = 233280 * Math.random() >>> 0;
};
Math.fakeRandom = function(max, min) {
	max = max || 1;
	min = min || 0;
	Math.fakeSeed = (Math.fakeSeed * 9301 + 49297) % 233280;
	var rnd = Math.fakeSeed / 233280;
	return min + rnd * (max - min);
};
Math.fakeReset();
