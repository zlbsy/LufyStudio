
function troopsFromCharactersToCity(characterList, cityData) {
	characterList.forEach(function(child){
		var troops = child.troops();
		var soldier = child.currentSoldiers();
		var cityTroops = cityData.troops(soldier.id());
		cityTroops.quantity += troops;
		cityData.troops(soldier.id(), cityTroops);
		child.troops(0);
	});
}