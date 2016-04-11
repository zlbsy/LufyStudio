/**
 * 俘虏概率
 */
function calculateHitrateCaptive(chara, nearCharas){
	var rate = 1;
	if(chara.data.hasSkill(SkillSubType.RETREAT)){
		rate = 0.2;
	}else if(LMvc.BattleController){
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
	return Math.random() < 0.1*rate;
}
/**
 * 投降概率
 */
function calculateHitrateSurrender(seignorId, charaModel){
	var maxPersonalLoyalty = 15;
	var personalLoyalty = charaModel.personalLoyalty();
	var maxLoyalty = 80;
	if(maxPersonalLoyalty == personalLoyalty){
		maxLoyalty = 1;
	}
	var surrebderLoyalty = maxLoyalty*personalLoyalty/maxPersonalLoyalty;
	var loyalty = charaModel.loyalty();
	if(surrebderLoyalty >= loyalty){
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
	if(Math.random() > 0.1){
		return false;
	}
	var sum = 75;
	var leader = CharacterModel.getChara(leaderId);
	var compatibility = Math.abs(leader.compatibility() - charaModel.compatibility());
	if(compatibility > sum){
		compatibility = sum;
	}
	return Math.random() < compatibility/sum;
}
/**
 * 释放概率
 */
function calculateHitrateRelease(leaderId, charaModel){
	if(Math.random() > 0.2){
		return false;
	}
	var sum = 75;
	var leader = CharacterModel.getChara(leaderId);
	var compatibility = Math.abs(leader.compatibility() - charaModel.compatibility());
	if(compatibility > sum){
		compatibility = sum;
	}
	return Math.random() > compatibility/sum;;
}
function getIdentity(value){
	var identitis = ["在野","一般","太守"];
}
function gameDataInit(){
	var data = LMvc.areaData;
	if(LMvc.chapterData.isCreateDebut){
		addCreateCharactersToGame();
	}
	SeigniorModel.setSeignior(data.seigniors);
	for(var i=0,l=data.seigniors.length;i<l;i++){
		var seignior = data.seigniors[i];
		var areas = seignior.areas;
		var areaList = [];
		areas.forEach(function(child){
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
	console.log("getCreateSeigniorAsType",child);
	for(var j=0,jl=child.citys.length;j<jl;j++){
		var city = child.citys[j];
		console.log("city",city);
		var cityIndex = noneSeignior.areas.findIndex(function(c){
			return c.area_id == city.id;
		});
		if(cityIndex < 0){
			continue;
		}
		var area = noneSeignior.areas.splice(cityIndex, 1)[0];
		for(var i=0,l=city.generals.length;i<l;i++){
			area.prefecture = city.prefecture;
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
function getMonarchChangeId(seignior){
	var chara;
	var childs = seignior.character().childs();
	if(childs && childs.length > 0){
		for(var i=0;i<childs.length;i++){
			chara = CharacterModel.getChara(childs[i]);
			if(chara.seigniorId() == seignior.chara_id()){
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
		//console.log("getMonarchChangeId .characterId="+characterId);
		if(!characterId){
			return;
		}
	}
	var captives = SeigniorModel.getCharactersIsCaptives(seigniorId);
	seignior.chara_id(characterId);
	for(var i=0,l=captives.length;i<l;i++){
		var captive = captives[i];
		captive.seigniorId(characterId);
	}
	//console.log("seignior.chara="+seignior.character().name());
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