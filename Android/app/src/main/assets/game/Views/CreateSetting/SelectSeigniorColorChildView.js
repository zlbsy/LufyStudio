function SelectSeigniorColorChildView(color){
	var self = this;
	base(self,LListChildView,[]);
	self.color = color;
	self.graphics.drawRect(0, "#ff0000", [20, 10, 60, 30],true,String.format("rgb({0})",color));
}
SelectSeigniorColorChildView.prototype.onClick = function(event) {
	var self = event.target;
	var listView = event.currentTarget;
	listView.parent.colorSelected(self.color);
};