function SeigniorListView(){
	base(this,LView,[]);
}
SeigniorListView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
SeigniorListView.prototype.init=function(){
	var self = this;
	self.listLayer = new LSprite();
	self.addChild(self.listLayer);
};
SeigniorListView.prototype.listInit=function(){
	var self = this;
	
};
SeigniorListView.prototype.onClickCloseButton=function(event){
	var self = this;
	
};
SeigniorListView.prototype.showList=function(){
	var self = this;
	var listHeight = LGlobal.height - self.contentLayer.y;
	var minusHeight = 0;
	switch(self.controller.characterListType){
		case CharacterListType.CHARACTER_LIST:
			break;
		case CharacterListType.CHARACTER_MOVE:
		case CharacterListType.ENLIST:
		case CharacterListType.TRAINING:
			minusHeight = 70;
			break;
		default:
			minusHeight = 100;
	}
	listHeight = LGlobal.height - self.contentLayer.y - minusHeight;
	var panel = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win05"]),LGlobal.width, LGlobal.height - self.contentLayer.y));
	self.contentLayer.addChild(panel);
	
	var cityModel = self.controller.getValue("cityData");
	self.listChildLayer = new LSprite();
	var scHeight = 0;
	console.log("showList self.dataList = ", self.dataList);
	for(var i=0,l=self.dataList.length;i<l;i++){
		var charaModel = self.dataList[i];
		var childLayer = new CharacterListChildView(self.controller,charaModel,cityModel,self);
		childLayer.y = 50 * i;
		self.listChildLayer.addChild(childLayer);
		if(i < l - 1){
			continue;
		}
		scHeight = childLayer.y + childLayer.getHeight();
	}
	self.listChildLayer.graphics.drawRect(0, "#000000", [0, 0, LGlobal.width - 30, scHeight]);
	var sc = new LScrollbar(self.listChildLayer, LGlobal.width - 20, listHeight - 30, 10, false);
	sc.y = 15;
	self.contentLayer.addChild(sc);
	sc.excluding = true;
};
