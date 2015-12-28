function MessageView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
	self.init();
}
MessageView.prototype.add = function(msg, color){
	var self = this;console.log("add "+msg);
	var child = new MessageChildView(msg, color);
	self.listView.insertChildView(child);
	var height = self.listView.cellHeight*self.listView.getItems().length;
	if(height < self.listView.clipping.height){
		return;
	}
	self.listView.clipping.y = height - self.listView.clipping.height;
};
MessageView.prototype.init = function(){
	var self = this
	var height = 200;
	var backgroundData = new LBitmapData(LMvc.datalist["win03"]);
	var panel = new LPanel(backgroundData,LGlobal.width,height);
	panel.cacheAsBitmap(true);
	panel.y = LGlobal.height - height;
	self.addChild(panel);
	self.listView = new LListView();
	self.listView.x = 5;
	self.listView.y = panel.y + 5;
	self.listView.resize(LGlobal.width - 10,height - 10);
	self.listView.cellWidth = LGlobal.width;
	self.listView.cellHeight = 20;
	self.addChild(self.listView);
};
