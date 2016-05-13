/*版本升级后加到引擎中，暂时添加*/
LTextField.prototype.windComplete = function() {
	var s = this;
	s._speedIndex = s.speed;
	s.text = s._ll_wind_text;
	s._ll_wind_length = s._ll_wind_text.length + 1;
	s._ll_windRun();
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
//////////////////////华丽的分界线////////////////////

/*不需要加到引擎中，只在本游戏中使用*/
LButton.prototype.setCursorEnabled = function(event) {
	var self = this;
	self.callParent("setCursorEnabled", arguments);
	if (!self.se) {
		self.se = "Se_ok";
		self.addEventListener(LMouseEvent.MOUSE_DOWN, playButtonSe);
	}
}; 