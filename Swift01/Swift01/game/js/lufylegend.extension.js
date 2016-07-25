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
		var d = c[i];
		LDisplayObjectContainer.destroy(d);
		delete d.parent;
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
		self._ll_items[i].removeAllChild();
	}
	self._ll_items.length = 0;
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
LShape.prototype.die = function(){
	var s = this;
	s.graphics.clear();
	s.callParent("die",arguments);
};
LListView.prototype.die = function(){
	var self = this;
	for (var i = 0, l = self._ll_items.length; i < l; i++) {
		self._ll_items[i].die();
		self._ll_items[i].removeAllChild();
	}
	self._ll_items.length = 0;
	self.callParent("die",arguments);
};
LListChildView.prototype.die = function(){
	var self = this;
	self.cacheAsBitmap(false);
	self.removeAllChild();
	self.ll_baseBitmap = null;
	self.ll_baseRectangle = null;
	self.ll_basePoint = null;
	self._canvas = null;
	self._context = null;
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
LTextField._labelsCreate=0;
LTextField.getLabel = function(){
	if(LTextField._labels.length > 0){
		var label = LTextField._labels.shift();
		label.init();
		return label;
	}
	//if(typeof LPlugin != UNDEFINED && !LPlugin.native)console.error("_labelsCreate",++LTextField._labelsCreate,LTextField._labels.length);
	return new LTextField();
};
LTextField.prototype.init = function(){
	var self = this;
	self.text = "";
	self.htmlText = "";
	self.filters = null;
	self.visible = true;
	self.alpha = 1;
	self.x = 0;
	self.y = 0;
	self.rotate = 0;
	self.texttype = null;
	self.styleSheet = "";
	self.lineWidth = 1;
	self.lineColor = "#000000";
	self.weight = "normal";
	self.textAlign = "left";
	self.color = "#000000";
	self.size = 15;
	self.font = "Arial";
	self.textBaseline = "top";
	self.heightMode = LTextField.HEIGHT_MODE_BOTTOM;
	self.stroke = false;
	self.width = 150;
	self.wordWrap = false;
	self.multiline = false;
	self.numLines = 1;
	self.windRunning = false;
	self._ll_wind_text = "";
	self.cacheAsBitmap(false);
	self.mask = null;
	self.parent = null;
	self.transform.matrix = null;
};
LTextField.prototype.cached = function(){return;
	var self = this;
	var has = false;
	for(var i=0, l=LTextField._labels.length;i<l;i++){
		var label = LTextField._labels[i];
		if(label.objectIndex == self.objectIndex){
			has = true;
			break;
		}
	}
	if(!has){
		self.init();
		LTextField._labels.push(self);
	}
	//if(typeof LPlugin != UNDEFINED && !LPlugin.native)console.error("LTextField.prototype.cached",LTextField._labels.length);
};
LDisplayObjectContainer.destroy = function (d) {
	if (!LGlobal.destroy) {
		return;
	}
	if (d.die) {
		d.die();
	}
	if (d.removeAllChild) {
		d.removeAllChild();
	}
	if (d.cached) {
		d.cached();
	}
};
LButton.prototype.ll_modeDown = function (e) {
	var s = e.clickTarget, w, h, tw, th, x, y, tx, ty, onComplete;
	if (!s.buttonMode || s.tween) {
		return;
	}
	if (s.state == LButton.STATE_DISABLE) {
		s.upState.visible = false;
		s.overState.visible = false;
		s.downState.visible = false;
		s.disableState.visible = true;
		return;
	}
	s.upState.visible = false;
	s.overState.visible = false;
	s.downState.visible = true;	
	s._tweenOver = s.ll_modeOver;
	onComplete = function(obj){
		var s = obj.parent;
		if(s){
			delete s.tween;
			s._tweenOver({clickTarget : s});
			delete s._tweenOver;
		}
	};
	if (s.staticMode) {
		s.tween = LTweenLiteTimeline.to(s.downState, 0.3, {}).to(s.downState, 0.1, {onComplete : onComplete});
	} else {
		w = s.downState.getWidth();
		h = s.downState.getHeight();
		tw = w * 1.1;
		th = h * 1.1;
		x = s.downState.x;
		y = s.downState.y;
		tx = x + (w - tw) * 0.5;
		ty = y + (h - th) * 0.5;
		s.tween = LTweenLiteTimeline.to(s.downState, 0.3, {x : tx, y : ty, scaleX : s._ll_down_sx*1.1, scaleY : s._ll_down_sy*1.1, ease : Quart.easeOut})
		.to(s.downState, 0.1, {x : x, y : y, scaleX : s._ll_down_sx, scaleY : s._ll_down_sy, ease : Quart.easeOut,onComplete : onComplete});
	}
};
LDisplayObjectContainer.prototype.removeChild = function (d) {
	var s  = this, c = s.childList, i, l;
	for (i = 0, l = c.length; i < l; i++) {
		if (d.objectIndex == c[i].objectIndex) {
			LDisplayObjectContainer.destroy(d);
			s.childList.splice(i, 1);
			break;
		}
	}
	s.numChildren = s.childList.length;
	delete d.parent;
};
LDisplayObjectContainer.prototype.removeChildAt = function (i) {
	var s  = this, c = s.childList, d;
	if (c.length <= i || i < 0) {
		return;
	}
	d = c[i];
	LDisplayObjectContainer.destroy(d);
	s.childList.splice(i, 1);
	delete d.parent;
	s.numChildren = s.childList.length;
	return d;
};
LDisplayObject._canvasList = [];
LDisplayObject._canvasCreateCount=0;
LDisplayObject.prototype._createCanvas = function(){
	var s = this;
	if (s._canvas) {
		return;
	}
	if(LDisplayObject._canvasList.length > 0){
		var _canvas = LDisplayObject._canvasList.shift();
		s._canvas = _canvas;
	}else{
		//if(typeof LPlugin != UNDEFINED && !LPlugin.native)console.error("_canvasCreateCount", ++LDisplayObject._canvasCreateCount, s);
		s._canvas = document.createElement("canvas");
		s._canvas.id = ++LGlobal.objectIndex;
		s._canvas.objectIndex = s._canvas.id;
	}
	s._context = s._canvas.getContext("2d");
};
LDisplayObject.pushCacheCanvas = function(_canvas){return;
	if(!_canvas){
		return;
	}
	var has = false;
	for(var i=0, l=LDisplayObject._canvasList.length;i<l;i++){
		var canvas = LDisplayObject._canvasList[i];
		if(canvas.id == _canvas.id){
			console.error("has="+has,_canvas.id);
			has = true;
			break;
		}
	}
	if(!has){
		_canvas.width = 0;
		_canvas.height = 0;
		//console.error(typeof _canvas, _canvas,_canvas.id);
		LDisplayObject._canvasList.push(_canvas);
	}
	//if(typeof LPlugin != UNDEFINED && !LPlugin.native)console.error("LDisplayObject.pushCacheCanvas",LDisplayObject._canvasList.length);
};
LDisplayObject.prototype.cached = function(){
	var s = this;
	if(!s._canvas){
		return;
	}
	LDisplayObject.pushCacheCanvas(s._canvas);
	s._canvas = null;
	s._context = null;
};
LDisplayObject.prototype.die = function(){
	var s = this;
	if(s._ll_cacheAsBitmap){
		s.cacheAsBitmap(false);
	}
	s.callParent("die", arguments);
};
LDisplayObject.prototype.cacheAsBitmap = function(value){
	var s = this;
	if(!value){
		LDisplayObject.pushCacheCanvas(s._canvas);
		s._canvas = null;
		s._context = null;
		s._ll_cacheAsBitmap = null;
		return;
	}
	var sx = s.x - s.startX(true), sy = s.y - s.startY(true);
	var data = s.getDataCanvas(sx, sy, s.getWidth(true), s.getHeight(true));
	var b = new LBitmapData(data, 0, 0, null, null, LBitmapData.DATA_CANVAS);
	var cache = new LBitmap(b);
	cache.x = -sx;
	cache.y = -sy;
	s._ll_cacheAsBitmap = cache;
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
