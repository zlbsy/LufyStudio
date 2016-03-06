function troopsFromCharactersToCity(cityData, exceptList) {
	var generals = cityData.generals();
	var troops = 0;
	if(!exceptList){
		exceptList = [];
	}
	for(var i=0, l=generals.length;i<l;i++){
		var general = generals[i];
		var currentTroops = general.troops();
		if(currentTroops == 0){
			continue;
		}
		troops += currentTroops;
		general.troops(0);
	}
	cityData.troops(cityData.troops() + troops);
}