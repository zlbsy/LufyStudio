function belongLabel(){
	
}
function getDirectionFromTarget(chara, target){
	var self = this, direction = chara.direction;
	var coordinate = chara.getTo();
	var coordinateTo = target.getTo();
	var angle = Math.atan2(coordinateTo[1] - coordinate[1],coordinateTo[0] - coordinate[0])*180/Math.PI + 180;
	if(angle < 22.5 || angle > 337.5){
		direction = CharacterDirection.LEFT;
	}else if(angle > 22.5 && angle < 67.5){
		direction = CharacterDirection.LEFT_UP;
	}else if(angle > 67.5 && angle < 112.5){
		direction = CharacterDirection.UP;
	}else if(angle > 112.5 && angle < 157.5){
		direction = CharacterDirection.RIGHT_UP;
	}else if(angle > 157.5 && angle < 202.5){
		direction = CharacterDirection.RIGHT;
	}else if(angle > 202.5 && angle < 247.5){
		direction = CharacterDirection.RIGHT_DOWN;
	}else if(angle > 247.5 && angle < 292.5){
		direction = CharacterDirection.DOWN;
	}else{
		direction = CharacterDirection.LEFT_DOWN;
	}
	return direction;
};
function isSameBelong(belong,targetBelong){
	if(belong == Belong.ENEMY){
		if(targetBelong == Belong.ENEMY){
			return true;
		}else{
			return false;
		}
	}else{
		if(targetBelong == Belong.ENEMY){
			return false;
		}else{
			return true;
		}
	}
}
function battleSingleCombatCheck(chara){
	var script = "SGJTalk.show(" + chara.data.id() + ",0," + String.format(Language.get("single_combat_ask"), chara.AI.target.data.name()) + ");";
	//TODO::
	if(true){
		script += "SGJTalk.show(" + chara.AI.target.data.id() + ",0," + Language.get("single_combat_answer_ok") + ");" + 
		"SGJBattleCharacter.singleCombatStart(" + chara.belong + "," + chara.data.id() + ");";
	}else{
		script += "SGJTalk.show(" + chara.AI.target.data.id() + ",0," + Language.get("single_combat_answer_no") + ");" + 
		"SGJBattleCharacter.endAction(" + chara.belong + "," + chara.data.id() + ");";
	}
	LGlobal.script.addScript(script);
}
