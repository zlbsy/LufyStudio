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
BattleWeatherView.prototype.getAndroidDialog = function(layer, weatherType){
	var self = this;
	var panel = getPanel("win05",200,240);
	layer.x = 10;
	layer.y = 50;
	panel.addChild(layer);
	var weather = String.format("{0}:{1}", Language.get("weather"),Language.get(weatherType));
	label = getStrokeLabel(weather,24,"#FFFFFF","#000000",4);
	label.x = 10;
	label.y = 10;
	panel.addChild(label);
	var closePanel = new LButton(new LBitmap(new LBitmapData(LMvc.datalist["close"])));
	closePanel.x = panel.getWidth() - closePanel.getWidth() - 10;
	closePanel.y = 5;
	panel.addChild(closePanel);
	closePanel.addEventListener(LMouseEvent.MOUSE_UP,function(event){
		event.currentTarget.parent.visible = false;
	});
	return panel;
};
BattleWeatherView.prototype.createCloud = function(){
	var self = this;
	var width = LMvc.screenWidth;
	var height = LMvc.screenHeight;
	if(LGlobal.android){
		width = height = 180;
	}
	var layer = new LSprite();
	layer.graphics.drawRect(0,"#000000",[0,0,width,height], true, "#ffffff");
	layer.alpha = 0.6;
	layer.cacheAsBitmap(true);
	if(LGlobal.android){
		var panel = self.getAndroidDialog(layer, BattleWeatherConfig.CLOUD);
		return panel;
	}else{
		return layer;
	}
};
BattleWeatherView.prototype.createSnow = function(){
	var self = this;
	var datas = [], listChild = [];
	for(var i=0;i<4;i++){
		var layer = new LSprite();
		layer.graphics.drawRect(0,"#000000",[0,0,LMvc.screenWidth,LMvc.screenHeight]);
		layer.graphics.add(function (c){
			c.fillStyle = "#ffffff";
			c.beginPath();
			for(var i=0;i<50;i++){
				var sx = Math.random()*LMvc.screenWidth;
				var sy = Math.random()*LMvc.screenHeight;
				c.moveTo(sx,sy);
				c.arc(sx,sy, 2 + Math.random()*5,0,2*Math.PI);
			}
			c.fill();
		});
		layer.alpha = 0.6;
		if(LGlobal.android){
			layer.scaleX = layer.scaleY = 180 / LMvc.screenWidth;
		}
		var bitmapData = getBitmapData(layer, true);
		if(LGlobal.android){
			bitmapData.height = bitmapData.width;
		}
		layer.die();
		datas.push(bitmapData);
		listChild.push({dataIndex : i, x : 0, y : 0, width : bitmapData.width, height : bitmapData.height, sx : 0, sy : 0});
	}
	var snowLayer = new LAnimationTimeline(datas, [listChild]);
	snowLayer.speed = 12;
	if(LGlobal.android){
		var panel = self.getAndroidDialog(snowLayer, BattleWeatherConfig.SNOW);
		return panel;
	}else{
		return snowLayer;
	}
};
BattleWeatherView.prototype.createRain = function(){
	var self = this;
	var datas = [], listChild = [];
	for(var i=0;i<4;i++){
		var layer = new LSprite();
		layer.graphics.drawRect(0,"#000000",[0,0,LMvc.screenWidth * 1.3,LMvc.screenHeight * 1.3]);
		layer.graphics.add(function (c){
	    	c.strokeStyle = "#ffffff";
			c.beginPath();
			for(var i=0;i<50;i++){
				var sx = Math.random()*LMvc.screenWidth * 1.3;
				var sy = Math.random()*LMvc.screenHeight * 1.3;
				c.moveTo(sx,sy);
				c.lineTo(sx,sy + 50 + Math.random()*100);
			}
			c.stroke();
		});
		if(LGlobal.android){
			layer.scaleX = layer.scaleY = 180 / LMvc.screenWidth * 1.3;
		}
		var bitmapData = getBitmapData(layer, true);
		if(LGlobal.android){
			bitmapData.height = bitmapData.width = 180;
		}
		layer.die();
		datas.push(bitmapData);
		listChild.push({dataIndex : i, x : 0, y : 0, width : bitmapData.width, height : bitmapData.height, sx : 0, sy : 0});
	}
	var rainLayer = new LAnimationTimeline(datas, [listChild]);
	rainLayer.speed = 2;
	if(LGlobal.android){
		var panel = self.getAndroidDialog(rainLayer, BattleWeatherConfig.RAIN);
		return panel;
	}else{
		rainLayer.x = LMvc.screenWidth * 0.15;
		rainLayer.y = -LMvc.screenHeight * 0.2;
		rainLayer.rotate = 20;
		return rainLayer;
	}
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
	return {weather:BattleWeatherConfig.SUNNY, probability:0};
};
BattleWeatherView.prototype.setData = function(obj){
	var self = this;
	self.show(obj.weather);
	self.currentWeather.probability = obj.probability;
};