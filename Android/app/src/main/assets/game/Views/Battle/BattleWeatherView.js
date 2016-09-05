function BattleWeatherView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
	self.weathers = {};
};
BattleWeatherView.prototype.change = function(){
	var self = this;
	var probability = 1;
	if(self.currentWeather){
		self.currentWeather.probability += 0.1;
		probability = self.currentWeather.probability;
	}
	if(Math.fakeRandom() > probability){
		return;
	}
	var weatherProbabilitys = WeatherProbabilityConfig[LMvc.chapterData.month];
	var rand = Math.fakeRandom(), sum = 0;
	for(var i=0, l=weatherProbabilitys.length; i<l; i++){
		var weatherProbability = weatherProbabilitys[i];
		sum += weatherProbability.probability;
		if(rand > sum){
			continue;
		}
		self.show(weatherProbability.weather);
		break;
	}
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
		case BattleWeatherConfig.CLOUD:
			layer = self.createCloud();
			break;
		default:
			layer = new LSprite();
	}
	layer.weather = weather;
	self.addChild(layer);
	return layer;
};
BattleWeatherView.prototype.createCloud = function(){
	var layer = new LSprite();
	layer.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,LGlobal.height], true, "#ffffff");
	layer.alpha = 0.6;
	layer.cacheAsBitmap(true);
	return layer;
};
BattleWeatherView.prototype.createSnow = function(){
	var datas = [], listChild = [];
	for(var i=0;i<4;i++){
		var layer = new LSprite();
		layer.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,LGlobal.height]);
		layer.graphics.add(function (c){
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
		layer.graphics.add(function (c){
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
		var bitmapData = getBitmapData(layer, true);
		layer.die();
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
	self.currentWeather.probability = 0;
	cloudWeatherCharacterShow();
};
BattleWeatherView.prototype.isWeather = function(weather){
	var self = this;
	if(!self.weathers[weather]){
		return weather == BattleWeatherConfig.SUNNY;
	}
	return self.currentWeather.objectIndex == self.weathers[weather].objectIndex;
};
BattleWeatherView.prototype.getLavel = function(){
	var self = this;
	var weather = self.currentWeather ? self.currentWeather.weather : BattleWeatherConfig.SUNNY;
	return Language.get(weather);
};
BattleWeatherView.prototype.getData = function(){
	var self = this;
	if(self.currentWeather){
		return {weather:self.currentWeather.weather, probability:self.currentWeather.probability};
	}
	return {weather:BattleWeatherConfig.CLOUD, probability:0};
};
BattleWeatherView.prototype.setData = function(obj){
	var self = this;
	self.show(obj.weather);
	self.currentWeather.probability = obj.probability;
};