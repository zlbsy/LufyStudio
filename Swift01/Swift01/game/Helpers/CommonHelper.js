/**
 * 俘虏概率
 */
function calculateHitrateCaptive(chara, nearCharas){
	if(chara.data.isTribeCharacter() || chara.data.isDefCharacter() || chara.data.isEmploy()){
		return false;
	}
	var rate = 1;
	if(chara.data.hasSkill(SkillSubType.RETREAT)){
		rate = 0.2;
	}else if(isPlayerBattle()){
		var positions = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]];
		var locationX = chara.locationX();
		var locationY = chara.locationY();
		var charaLayer = LMvc.BattleController.view.charaLayer;
		for(var i=0,l=positions.length;i<l;i++){
			var position = positions[i];
			var child = charaLayer.getCharacterFromLocation(locationX+position[0],locationY+position[1]);
			if(!child || !isSameBelong(child.belong, chara.belong) || !child.data.hasSkill(SkillSubType.RETREAT)){
				continue;
			}
			rate = 0.2;
			break;
		}
	}else if(nearCharas && nearCharas.length > 0){
		for(var i=0,l=nearCharas.length;i<l;i++){
			var child = nearCharas[i];
			if(!child.data.hasSkill(SkillSubType.RETREAT)){
				continue;
			}
			rate = 0.2;
			break;
		}
	}
	return Math.fakeRandom() < 0.1*rate;
}
function calculateLoyalty(characterModel, seignorId){
	var seignorCharacter = CharacterModel.getChara(seignorId);
	var compatibility = Math.abs(seignorCharacter.compatibility() - characterModel.compatibility());
	if(compatibility > JobCoefficient.COMPATIBILITY){
		compatibility -= JobCoefficient.COMPATIBILITY;
	}
	var percentageCompatibility = (JobCoefficient.COMPATIBILITY - compatibility) / JobCoefficient.COMPATIBILITY;
	var loyalty = 50 + 50 * percentageCompatibility >> 0;
	characterModel.loyalty(loyalty > 100 ? 100 : loyalty);
}
/**
 * 投降概率
 */
function calculateHitrateSurrender(seignorId, charaModel){
	var parentConfig = charactersParentConfig.find(function(child){
		return child.id == charaModel.id();
	});
	if(parentConfig){
		var parentCharacter = CharacterModel.getChara(parentConfig.parent);
		if(parentCharacter.seigniorId() == parentCharacter.id()){
			//关联君主在位
			return parentConfig.parent == seignorId;
		}
		//return parentConfig.parent == seignorId;
	}
	var seignorCharacter = CharacterModel.getChara(seignorId);
	//义气忠诚 60
	//相性忠诚 20
	var maxPersonalLoyalty = 15;
	var personalLoyalty = charaModel.personalLoyalty();
	var plusLoyalty = 30;
	if(maxPersonalLoyalty == personalLoyalty){
		plusLoyalty = 0;
	}
	var compatibility = Math.abs(charaModel.compatibility() - seignorCharacter.compatibility());
	if(compatibility > JobCoefficient.COMPATIBILITY){
		compatibility -= JobCoefficient.COMPATIBILITY;
	}
	var compatibilityLoyalty = 30 * (JobCoefficient.COMPATIBILITY - compatibility) / JobCoefficient.COMPATIBILITY;
	var surrebderLoyalty = 40 * (maxPersonalLoyalty - personalLoyalty)/maxPersonalLoyalty;
	var loyalty = charaModel.loyalty();
	if(compatibilityLoyalty + surrebderLoyalty + plusLoyalty >= loyalty){
		return true;
	}
	return false;
}
/**
 * 投降
 */
function generalSurrender(characterModel, city){
	characterModel.moveTo(city.id());
	characterModel.moveTo();
	characterModel.seigniorId(city.seigniorCharaId());
}
/**
 * 斩首概率
 */
function calculateHitrateBehead(leaderId, charaModel){
	if(!beheadIsValid()){
		return false;
	}
	if(Math.fakeRandom() > 0.1){
		return false;
	}
	var sum = 75;
	var leader = CharacterModel.getChara(leaderId);
	var compatibility = Math.abs(leader.compatibility() - charaModel.compatibility());
	if(compatibility > sum){
		compatibility = sum;
	}
	return Math.fakeRandom() < compatibility/sum;
}
function beheadCountPlus(){
	if(typeof LMvc.chapterData.behead == UNDEFINED){
		LMvc.chapterData.behead = 0;
	}
	LMvc.chapterData.behead++;
}
/**
 * 释放概率
 */
function calculateHitrateRelease(leaderId, charaModel){
	if(Math.fakeRandom() > 0.2){
		return false;
	}
	var sum = 75;
	var leader = CharacterModel.getChara(leaderId);
	var compatibility = Math.abs(leader.compatibility() - charaModel.compatibility());
	if(compatibility > sum){
		compatibility = sum;
	}
	return Math.fakeRandom() > compatibility/sum;;
}
function gameDataInit(){
	var data = LMvc.areaData;
	if(LMvc.chapterData.isCreateDebut){
		addCreateCharactersToGame();
	}
	SeigniorModel.setSeignior(data.seigniors);
	var setAreas = [];
	for(var i=0,l=data.seigniors.length;i<l;i++){
		var seignior = data.seigniors[i];
		var areas = seignior.areas;
		var areaList = [];
		areas.forEach(function(child){
			if(setAreas.indexOf(child.area_id) >= 0){
				return;
			}
			setAreas.push(child.area_id);
			var area = AreaModel.getArea(child.area_id);
			area.setSeignor(seignior,child);
			areaList.push(area);
		});
		seignior.areas = areaList;
	}
}
function addCreateCharactersToGame(){
	var characters = LPlugin.characters();
	for(var i=0,l=characters.list.length;i<l;i++){
		var character = characters.list[i];
		var chara = new CharacterModel(null,character);
		CharacterModel.list.push(chara);
	}
}
function addCreateSeigniorsToGame(){
	var seigniorList = GameManager.getCreateSeigniorList(LMvc.chapterId);
	var noneSeigniorIndex = LMvc.areaData.seigniors.findIndex(function(s){
		return s.chara_id == 0;
	});
	var noneSeignior = LMvc.areaData.seigniors[noneSeigniorIndex];
	for(var i=0,l=seigniorList.list.length;i<l;i++){
		var seignior = getCreateSeigniorAsType(noneSeignior, seigniorList.list[i]);
		if(seignior.areas.length == 0){
			continue;
		}
		LMvc.areaData.seigniors.push(seignior);
	}
	LMvc.areaData.seigniors[noneSeigniorIndex] = noneSeignior;
}
function getCreateSeigniorAsType(noneSeignior,child){
	var seignior = {};
	seignior.chara_id = child.id;
	seignior.color = child.color;
	seignior.areas = [];
	for(var j=0,jl=child.citys.length;j<jl;j++){
		var city = child.citys[j];
		var cityIndex = noneSeignior.areas.findIndex(function(c){
			return c.area_id == city.id;
		});
		if(cityIndex < 0){
			continue;
		}
		var area = noneSeignior.areas.splice(cityIndex, 1)[0];
		for(var i=0,l=city.generals.length;i<l;i++){
			area.prefecture = city.prefecture;
			area.level = 2;
			area.money = 5000;
			area.food = 25000;
			area.population = 50000;
			area.business = 6000;
			area.agriculture = 6000;
			area.technology = 3500;
			area.police = 100;
			area.city_defense = 1300;
			area.troops = 3000;
			area.generals.push({chara_id:city.generals[i],feat:0,loyalty:100});
		}
		seignior.areas.push(area);
	}
	return seignior;
}
function NumberToString(value, length){
	value = ""+value;
	while(value.length < length){
		value = "0"+value;
	}
	return value;
}
function checkSeigniorIsDie(seigniorId){
	var character = CharacterModel.getChara(seigniorId);
	return character.seigniorId() == 0;
}
/*智能任命新太守*/
function appointPrefecture(city){
	var generals = city.generals();
	if(generals.length == 0){
		city.prefecture(0);
		return;
	}else if(generals.length == 1){
		city.prefecture(generals[0].id());
		return;
	}
	
	var compatibility = city.seignior().character().compatibility();
	generals = generals.sort(function(a,b){
		var value = b.feat() - a.feat();
		if(value == 0){
			value = Math.abs(a.compatibility() - compatibility) - Math.abs(b.compatibility() - compatibility);
		}
		return value;
	});
	city.prefecture(generals[0].id());
}
function setCharacterInitFeat(chara){
	var city = chara.city();
	if(!city){
		chara.feat(0);
		return;
	}
	var generals = city.generals();
	if(generals.length == 0){
		chara.feat(0);
		return;
	}
	var minFeat = CharacterLevelConfig.exp * CharacterLevelConfig.maxLevel;
	for(var i=0;i<generals.length;i++){
		var child = generals[i];
		if(child.id() == chara.id()){
			continue;
		}
		if(child.feat() < minFeat){
			minFeat = child.feat();
		}
	}
	chara.feat(minFeat);
}
function getMonarchChangeId(seignior){
	var chara;
	//父子
	var childs = seignior.character().childs();
	if(childs && childs.length > 0){
		for(var i=0;i<childs.length;i++){
			chara = CharacterModel.getChara(childs[i]);
			if(chara.seigniorId() == seignior.chara_id() && chara.city() && chara.city().seigniorCharaId() == seignior.chara_id()){
				return chara.id();
			}
		}
	}
	//兄弟
	childs = seignior.character().father() ? seignior.character().fatherCharacter().childs() : null;
	if(childs && childs.length > 0){
		for(var i=0;i<childs.length;i++){
			if(childs[i] == seignior.chara_id()){
				continue;
			}
			chara = CharacterModel.getChara(childs[i]);
			if(chara.seigniorId() == seignior.chara_id() && chara.city() && chara.city().seigniorCharaId() == seignior.chara_id()){
				return chara.id();
			}
		}
	}
	var generals = seignior.generals();
	if(generals.length == 0){
		return 0;
	}
	var charas = [];
	var compatibilityValue = 1000;
	var compatibility = seignior.character().compatibility();
	for(var i=0,l=generals.length;i<l;i++){
		var child = generals[i];
		var value = Math.abs(child.compatibility() - compatibility);
		if(value < compatibilityValue){
			compatibilityValue = value;
			charas = [child];
		}else if(value == compatibilityValue){
			charas.push(child);
		}
	}
	if(charas.length > 1){
		charas = charas.sort(function(a,b){return b.feat()-a.feat();});
	}
	return charas[0].id();
}
function monarchChange(seigniorId, characterId){
	var seignior = SeigniorModel.getSeignior(seigniorId);
	if(!characterId){
		characterId = getMonarchChangeId(seignior);
		if(!characterId){
			return 0;
		}
	}
	var captives = SeigniorModel.getCharactersIsCaptives(seigniorId);
	seignior.chara_id(characterId);
	for(var i=0,l=captives.length;i<l;i++){
		var captive = captives[i];
		captive.seigniorId(characterId);
	}
	var areas = seignior.areas();
	for(var i=0,l=areas.length;i<l;i++){
		var city = areas[i];
		city.monarchChange(characterId);
		if(city.prefecture() == seigniorId){
			var generals = city.generals();
			if(generals.length == 0){
				city.prefecture(0);
				continue;
			}
			var charas = generals.sort(function(a,b){
				var va = a.feat()*100 + a.force() + a.intelligence() + a.agility() + a.luck() + a.command();
				var vb = b.feat()*100 + b.force() + b.intelligence() + b.agility() + b.luck() + b.command();
				return vb - va;
			});
			city.prefecture(charas[0].id());
		}
	}
	return characterId;
}
//物品转换忠诚度
function itemExchangeLoyalty(item){
	var loyalty = 0;
	if(item.itemType() == ItemType.EQUIPMENT){
		var params = item.params();
		for(var i=0;i<params.length;i++){
			loyalty += Math.ceil(item[params[i]]() * (i == 0 ? 1 : 0.5));
		}
	}
	return loyalty;
}
//获取可劝降武将列表
function getCanPersuadeCharacters(){
	return LMvc.chapterData.persuadeCharacters || [];
}
function removeCanPersuadeCharacters(id){
	var characters = getCanPersuadeCharacters();
	for(var i=0,l=characters.length;i<l;i++){
		var child = characters[i];
		if(child.i == id){
			characters.splice(i, 1);
			break;
		}
	}
	LMvc.chapterData.persuadeCharacters = characters;
}
//更新可劝降武将列表,忠诚度降序
function updateCanPersuadeCharacters(characterModel){
	var characters = getCanPersuadeCharacters();
	var id = characterModel.id();
	var index = characters.findIndex(function(child){
		return id == child.i;
	});
	var validLoyalty = characterModel.validLoyalty();
	if(characterModel.seigniorId() == 0 || validLoyalty >= 90){
		if(index >= 0){
			characters.splice(index, 1);
		}
	}else{
		var year = LMvc.chapterData.year;
		var month = LMvc.chapterData.month;
		if(index < 0){
			characters.push({i:id, l:validLoyalty, s:characterModel.seigniorId(), y:year, m:month});
		}else{
			characters[index].l = validLoyalty;
			if(characters[index].s != characterModel.seigniorId()){
				characters[index].y = year;
				characters[index].m = month;
			}
		}
		characters = characters.sort(function(a,b){return b.l - a.l;});
	}
	LMvc.chapterData.persuadeCharacters = characters;
}
/***
 * 势力等级更新，我军平均等级
 */
function SeigniorLevelUpdate(){
	var seignior = SeigniorModel.getSeignior(LMvc.selectSeignorId);
	var generals = seignior.generals();
	var levelSum = 0;
	for(var i=0,l=generals.length;i<l;i++){
		levelSum += generals[i].level();
	}
	var levelAverage = (levelSum / generals.length) >>> 0;
	if(LMvc.chapterData.level < levelAverage){
		LMvc.chapterData.level = levelAverage;
	}
}
function deathIsValid(){
	if(typeof LMvc.chapterData.validDeath == UNDEFINED){
		return 1;
	}
	return LMvc.chapterData.validDeath;
}
function beheadIsValid(){
	if(typeof LMvc.chapterData.validBehead == UNDEFINED){
		return 1;
	}
	return LMvc.chapterData.validBehead;
}
