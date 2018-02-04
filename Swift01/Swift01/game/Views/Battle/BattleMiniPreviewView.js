function BattleMiniPreviewView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
	self.alpha = 0.7;
	self.maxSize = 200;
	var bitmapData = self.model.mapBitmapData.clone();
	bitmapData.x = 0;
	bitmapData.y = 0;
	bitmapData.width = bitmapData.image.width;
	bitmapData.height = bitmapData.image.height;
	var bitmap = new LBitmap(bitmapData);
	if(self.model.map.width > self.model.map.height){
		self.scaleValue = self.maxSize / bitmapData.width;
	}else{
		self.scaleValue = self.maxSize / bitmapData.height;
	}
	bitmap.scaleX = bitmap.scaleY = self.scaleValue;
	self.stepW = BattleCharacterSize.width * self.scaleValue;
	self.stepH = BattleCharacterSize.height * self.scaleValue;
	self.map = new LSprite();
	var background = getBlackBitmap(LMvc.screenWidth,LMvc.screenHeight);
	self.map.addChild(bitmap);
	
	self.controller.nextFrameExecute(function(){
		self.map.cacheAsBitmap(true);
	});
	self.map.x = 10;
	self.map.y = 40;
	self.addChild(self.map);
	self.characterLayer = new LSprite();
	self.characterLayer.x = self.map.x;
	self.characterLayer.y = self.map.y;
	self.addChild(self.characterLayer);
	
	self.characterLayer.graphics.add(function(c){
		var view = LMvc.BattleController.view;
		var weatherLayer = view.weatherLayer;
		var miniLayer = view.miniLayer;
		var charaLayer = view.charaLayer;
		var charas = [charaLayer.getCharactersFromBelong(Belong.SELF),charaLayer.getCharactersFromBelong(Belong.ENEMY)];
		var isCloud = weatherLayer.isWeather(BattleWeatherConfig.CLOUD);
		var colors = ["#ff0000", "#008800"];
		for(var j = 0, jl = charas.length; j < jl; j++){
			var childs = charas[j];
			c.beginPath();
			c.fillStyle = colors[j];
			for(var i = 0, l = childs.length; i < l; i++){
				var child = childs[i];
				if(isCloud && child.hideByCloud){
					continue;
				}
				c.rect(child.x * miniLayer.scaleValue + 1, child.y * miniLayer.scaleValue + 1, miniLayer.stepW - 2, miniLayer.stepH - 2);
			}
			c.fill();
		}
	});
}
