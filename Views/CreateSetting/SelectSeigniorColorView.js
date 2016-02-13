function SelectSeigniorColorView(controller){
	var self = this;
	base(self,LView,[controller]);
	self.init();
}
SelectSeigniorColorView.prototype.init=function(){
	var self = this;
		
	self.listView = new LListView();
	self.listView.maxPerLine = 4;
	self.listView.cellWidth = 100;
	self.listView.cellHeight = 50;
	self.addChild(self.listView);
	var list = [1,80,160,255];
	var colors = [];
	for(var r = 0;r<list.length;r++){
		for(var g = 0;g<list.length;g++){
			for(var b = 0;b<list.length;b++){
				colors.push(list[r]+","+list[g]+","+list[b]);
			}
		}
	}
	var items = [], child;
	for(var i=0,l=colors.length;i<l;i++){
		var color = colors[i];
		child = new SelectSeigniorColorChildView(color);
		items.push(child);
	}
		
	self.listView.resize(400, 400);
	self.listView.updateList(items);
};
SelectSeigniorColorView.prototype.colorSelected=function(color){
	var self = this;
	self.getParentByConstructor(CreateSeigniorDetailedView).selectedMonarchColor(color);
};