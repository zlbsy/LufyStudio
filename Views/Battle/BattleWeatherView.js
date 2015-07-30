function BattleWeatherView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
	self.weathers = {};
};
BattleWeatherView.prototype.create = function(weather){
	var self = this;
	var layer;
	switch(weather){
		case BattleWeatherConfig.RAIN:
			layer = self.createRain();
			break;
		case BattleWeatherConfig.SNOW:
			layer = self.createSnow();
			break;
		default:
			layer = new LSprite();
	}
	layer.weather = weather;
	self.addChild(layer);
	return layer;
};
BattleWeatherView.prototype.createSnow = function(){
	var datas = [], listChild = [];
	for(var i=0;i<4;i++){
		var layer = new LSprite();
		layer.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,LGlobal.height]);
		/*var layerChild = new LSprite();
		layerChild.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,LGlobal.height],true,"#ffffff");
		layerChild.alpha = 0.2;
		layer.addChild(layerChild);*/
		layer.graphics.add(function (){
			var c = LGlobal.canvas;
			c.fillStyle = "#ffffff";
			c.beginPath();
			for(var i=0;i<50;i++){
				var sx = Math.random()*LGlobal.width;
				var sy = Math.random()*LGlobal.height;
				c.moveTo(sx,sy);
				c.arc(sx,sy, 2 + Math.random()*5,0,2*Math.PI);
			}
			c.fill();
		});
		layer.alpha = 0.6;
		var bitmapData = getBitmapData(layer);
		datas.push(bitmapData);
		listChild.push({dataIndex : i, x : 0, y : 0, width : LGlobal.width, height : LGlobal.height, sx : 0, sy : 0});
	}
	var rainLayer = new LAnimationTimeline(datas, [listChild]);
	rainLayer.speed = 12;
	return rainLayer;
};
BattleWeatherView.prototype.createRain = function(){
	var datas = [], listChild = [];
	for(var i=0;i<4;i++){
		var layer = new LSprite();
		layer.graphics.drawRect(0,"#000000",[0,0,LGlobal.width * 1.3,LGlobal.height * 1.3]);
		layer.graphics.add(function (){
	    	var c = LGlobal.canvas;
	    	c.strokeStyle = "#ffffff";
			c.beginPath();
			for(var i=0;i<50;i++){
				var sx = Math.random()*LGlobal.width * 1.3;
				var sy = Math.random()*LGlobal.height * 1.3;
				c.moveTo(sx,sy);
				c.lineTo(sx,sy + 50 + Math.random()*100);
			}
			c.stroke();
		});
		var bitmapData = getBitmapData(layer);
		datas.push(bitmapData);
		listChild.push({dataIndex : i, x : 0, y : 0, width : LGlobal.width * 1.3, height : LGlobal.height * 1.3, sx : 0, sy : 0});
	}
	var rainLayer = new LAnimationTimeline(datas, [listChild]);
	rainLayer.speed = 2;
	rainLayer.x = LGlobal.width * 0.15;
	rainLayer.y = -LGlobal.height * 0.2;
	rainLayer.rotate = 20;
	return rainLayer;
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
BattleWeatherView.prototype.isWeather = function(weather){
	var self = this;
	if(!self.weathers[weather]){
		return false;
	}
	return self.currentWeather.objectIndex == self.weathers[weather].objectIndex;
};