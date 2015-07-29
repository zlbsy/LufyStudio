function BattleWeatherView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
	self.weathers = {};
};
BattleWeatherView.RAIN = "rain";
BattleWeatherView.prototype.create = function(weather){
	var self = this;
	var layer;
	switch(weather){
		case BattleWeatherView.RAIN:
			layer = self.createRain();
			break;
		default:
			layer = new LSprite();
	}
	self.addChild(layer);
	return layer;
};
BattleWeatherView.prototype.createRain = function(){
	var layer = new LSprite();
	
	layer.graphics.drawRect(0,"#000000",[0,0,LGlobal.width * 1.3,LGlobal.height * 1.3]);
	layer.graphics.add(function (){
    	var c = LGlobal.canvas;
    	c.strokeStyle = "#ffffff";
		c.beginPath();
		for(var i=0;i<50;i++){
			var l = 50 + Math.random()*100;
			var sx = Math.random()*LGlobal.width * 1.3;
			var sy = Math.random()*LGlobal.height * 1.3;
			c.moveTo(sx,sy);
			c.lineTo(sx,sy + l);
		}
		c.stroke();
	});
	//return layer;
	
	var bitmap = getBitmap(layer);
	bitmap.x = LGlobal.width * 0.15;
	bitmap.y = -LGlobal.height * 0.2;
	bitmap.rotate = 20;
	return bitmap;
};
BattleWeatherView.prototype.show = function(weather){
	var self = this;
	if(self.currentWeather){
		self.currentWeather.visible = false;
	}
	if(!self.weathers[weather]){
		self.weathers[weather] = self.create(weather);
	}
	self.currentWeather = self.weathers[weather];
	self.currentWeather.visible = true;
};