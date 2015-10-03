function SeigniorListChildView(controller, charaModel, cityModel, parentView) {
	var self = this;
	base(self, LView, [controller]);
	self.charaModel = charaModel;
	self.cityModel = cityModel;
	self.parentView = parentView;
	self.set();
}