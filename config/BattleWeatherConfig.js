//TODO::ver1.1增加天气的影响
//大雾，可视范围缩小->已添加
//大雨，移动力下降
//大雪，移动后几率滑动
var BattleWeatherConfig = {};
BattleWeatherConfig.RAIN = "rain";
BattleWeatherConfig.CLOUD = "cloud";
BattleWeatherConfig.SNOW = "snow";
BattleWeatherConfig.SUNNY = "sunny";

var BattleWeatherObstacle = {};
BattleWeatherObstacle[BattleWeatherConfig.SUNNY] = 0;
BattleWeatherObstacle[BattleWeatherConfig.SNOW] = 1;
BattleWeatherObstacle[BattleWeatherConfig.RAIN] = 1;
BattleWeatherObstacle[BattleWeatherConfig.CLOUD] = 2;

//天气随机变化
var _weatherList;
var WeatherProbabilityConfig = [];
_weatherList = [
	{probability:0.5, weather:BattleWeatherConfig.RAIN},
	{probability:0.1, weather:BattleWeatherConfig.CLOUD},
	{probability:0, weather:BattleWeatherConfig.SNOW},
	{probability:0.4, weather:BattleWeatherConfig.SUNNY}
];
//12 雪:50% 雾:10% 雨:0% 晴:40%
WeatherProbabilityConfig[12] = _weatherList;
_weatherList = [
	{probability:0.3, weather:BattleWeatherConfig.RAIN},
	{probability:0.1, weather:BattleWeatherConfig.CLOUD},
	{probability:0, weather:BattleWeatherConfig.SNOW},
	{probability:0.6, weather:BattleWeatherConfig.SUNNY}
];
//11,1 雪:30% 雾:10% 雨:0% 晴:60%
WeatherProbabilityConfig[1] = _weatherList;
WeatherProbabilityConfig[11] = _weatherList;
_weatherList = [
	{probability:0.1, weather:BattleWeatherConfig.RAIN},
	{probability:0.1, weather:BattleWeatherConfig.CLOUD},
	{probability:0.1, weather:BattleWeatherConfig.SNOW},
	{probability:0.7, weather:BattleWeatherConfig.SUNNY}
];
//2,10 雪:10% 雾:10% 雨:10% 晴:70%
WeatherProbabilityConfig[2] = _weatherList;
WeatherProbabilityConfig[10] = _weatherList;
_weatherList = [
	{probability:0, weather:BattleWeatherConfig.RAIN},
	{probability:0.3, weather:BattleWeatherConfig.CLOUD},
	{probability:0.1, weather:BattleWeatherConfig.SNOW},
	{probability:0.6, weather:BattleWeatherConfig.SUNNY}
];
//3,9 雪:0% 雾:30% 雨:10% 晴:60%
WeatherProbabilityConfig[3] = _weatherList;
WeatherProbabilityConfig[9] = _weatherList;
_weatherList = [
	{probability:0, weather:BattleWeatherConfig.RAIN},
	{probability:0.1, weather:BattleWeatherConfig.CLOUD},
	{probability:0.1, weather:BattleWeatherConfig.SNOW},
	{probability:0.8, weather:BattleWeatherConfig.SUNNY}
];
//4,8 雪:0% 雾:10% 雨:10% 晴:80%
WeatherProbabilityConfig[4] = _weatherList;
WeatherProbabilityConfig[8] = _weatherList;
_weatherList = [
	{probability:0, weather:BattleWeatherConfig.RAIN},
	{probability:0.1, weather:BattleWeatherConfig.CLOUD},
	{probability:0.3, weather:BattleWeatherConfig.SNOW},
	{probability:0.6, weather:BattleWeatherConfig.SUNNY}
];
//5,7 雪:0% 雾:10% 雨:30% 晴:60%
WeatherProbabilityConfig[5] = _weatherList;
WeatherProbabilityConfig[7] = _weatherList;
_weatherList = [
	{probability:0, weather:BattleWeatherConfig.RAIN},
	{probability:0.1, weather:BattleWeatherConfig.CLOUD},
	{probability:0.5, weather:BattleWeatherConfig.SNOW},
	{probability:0.4, weather:BattleWeatherConfig.SUNNY}
];
//6 雪:0% 雾:10% 雨:50% 晴:40%
WeatherProbabilityConfig[6] = _weatherList;