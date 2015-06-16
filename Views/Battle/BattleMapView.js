function BattleMapView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
};
BattleMapView.prototype.setSmall = function(data){
	var self = this;
	
	var bitmapData = new LBitmapData(LMvc.datalist["img-small"]);
	var scale = data["width"]/bitmapData.width;
	
	self.map = new LBitmap(bitmapData);
	self.map.scaleX = self.map.scaleY = scale;
	self.addChild(self.map);
	
	var loader = new LLoader();
	loader.addEventListener(LEvent.COMPLETE,self.setBig.bind(this));
	loader.load(LMvc.IMG_PATH+"smap/" + data["img-big"]+(LGlobal.traceDebug?("?"+(new Date()).getTime()):""));
};
BattleMapView.prototype.setBig = function(event){
	var self = this;
	self.bitmapData = new LBitmapData(event.target);
	
	self.datas = [new LBitmapData(event.target,0,0,self.controller.model.map.width,self.controller.model.map.height,LBitmapData.DATA_CANVAS), new LBitmapData(event.target,0,0,self.controller.model.map.width,self.controller.model.map.height,LBitmapData.DATA_CANVAS)];
	self.map.bitmapData = self.datas[0];
	self.dataIndex = 0;
	self.map.scaleX = self.map.scaleY = 1;
	self.addEventListener(LEvent.ENTER_FRAME, self.onframe);
	alert(self.controller.view.charaLayer.childList.length);
	self.controller.view.charaLayer.childList.forEach(function(chara){
		self.characterIn(chara);
		chara.visible=false;
	});
	self.controller.view.charaLayer.visible=false;
};
BattleMapView.prototype.onframe = function(event){
	var self = event.currentTarget;
	self.map.x = -self.parent.x;
	self.map.y = -self.parent.y;
	var bitmapData = self.datas[self.dataIndex++];
	if(self.dataIndex >= self.datas.length){
		self.dataIndex = 0;
	}
	bitmapData.setProperties(self.map.x,self.map.y,LGlobal.width,LGlobal.height);
	self.map.bitmapData = bitmapData;
};
BattleMapView.prototype.characterIn = function(chara){
	var self = this;
	var bitmapData = self.datas[0];
	bitmapData.copyPixels(chara.anime.bitmapData,new LRectangle(8,8,48,48),new LPoint(chara.x,chara.y));
	chara.anime.onframe();
	/*bitmapData = self.datas[1];
	bitmapData.copyPixels(chara.anime.bitmapData,new LRectangle(8,8,48,48),new LPoint(chara.x,chara.y));*/
};
BattleMapView.prototype.characterOut = function(chara){

};
/*
copyPixels : function(sourceBitmapData, sourceRect, destPoint) {
			var s = this, left, top, width, height, bd = sourceBitmapData;
			if (s.dataType != LBitmapData.DATA_CANVAS) {
				return;
			}
			left = bd.x;
			top = bd.y;
			width = bd.width;
			height = bd.height;
			bd.setProperties(sourceRect.x + bd.x, sourceRect.y + bd.y, sourceRect.width, sourceRect.height);
			s._context.drawImage(bd.image, bd.x, bd.y, bd.width, bd.height, destPoint.x, destPoint.y, bd.width, bd.height);
			bd.x = left;
			bd.y = top;
			bd.width = width;
			bd.height = height;
		}
	};
*/