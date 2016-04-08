/*版本升级后加到引擎中，暂时添加*/
LTextField.prototype.windComplete = function(){
	var s = this;
	s._speedIndex = s.speed;
	s.text = s._ll_wind_text;
	s._ll_wind_length = s._ll_wind_text.length + 1;
	s._ll_windRun();
};
//////////////////////华丽的分界线////////////////////

/*不需要加到引擎中，只在本游戏中使用*/
LButton.prototype.setCursorEnabled = function (event) {
	var self = this;
	self.callParent("setCursorEnabled",arguments);
	if(!self.se){
		self.se = "Se_ok";
		self.addEventListener(LMouseEvent.MOUSE_DOWN,playButtonSe);
	}
};