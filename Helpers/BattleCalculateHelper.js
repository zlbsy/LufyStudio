/********************************************
 双击概率计算
 如果Sa/Sd<1，那么H=1；
 如果1<=Sa/Sd<2，那么H=2+18*（Sa/Sd-1）；
 如果2<=Sa/Sd<=3，那么H=20+80*（Sa/Sd-2）；
 如果Sa/Sd>=3，那么H=100；
 *********************************************/
function calculateDoubleAtt(attCharaModel,hertCharaModel){
	var h;
	//得到双方的爆发力
	var attBreakout = attCharaModel.breakout();
	var hertBreakout = hertCharaModel.breakout();
	var rate = attBreakout/hertBreakout;
	if(rate < 1){
		h = 1;
	}else if(rate >= 1 && rate < 2){
		h = 2 + 18*(rate - 1);
	}else if(rate >= 2 && rate < 3){
		h = 20 + 80*(rate - 2);
	}else if(rate >= 3){
		h = 100;
	}
	if(Math.random()*100 <= h){
		return true;
	}
	return false;
}
/********************************************
 致命概率计算
 如果Sa/Sd<1，那么H=1；
 如果1<=Sa/Sd<2，那么H=2+18*（Sa/Sd-1）；
 如果2<=Sa/Sd<=3，那么H=20+80*（Sa/Sd-2）；
 如果Sa/Sd>=3，那么H=100；
 *********************************************/
function calculateFatalAtt(attCharaModel,hertCharaModel){
	var h;
	//得到双方的士气
	var attMorale = attCharaModel.morale();
	var hertMorale = hertCharaModel.morale();
	var rate = attMorale/hertMorale;
	if(rate < 1){
		h = 1;
	}else if(rate >= 1 && rate < 2){
		h = 2 + 18*(rate - 1);
	}else if(rate >= 2 && rate < 3){
		h = 20 + 80*(rate - 2);
	}else if(rate >= 3){
		h = 100;
	}
	if(Math.random()*100 <= h){
		return true;
	}
	return false;
}
/********************************************
 物理攻击的命中率<br>
 X代表我方的爆发力，Y代表敌方的爆发力。R表示命中率<br>
 if (x>2*y)<br>
 r=100;<br>
 else if(x>y)<br>
 r=(x-y)*10/y+90;<br>
 else if(x>y/2)<br>
 r=(x-y/2)*30/(y/2)+60;<br>
 else<br>
 r=(x-y/3)*30/(y/3)+30;<br>
 注：手套和盾有加成效果。比如敌人有辅助防御15%的宝物，那么最终的命中率是r-15<br>
 2、法术攻击的命中率<br>
 计算公式与1相同，其中X表示我方的精神力与运气之和，Y表示敌方的精神力与运气之和<br>
 再考虑宝物的加成<br>
 最后，不同的法术还会有具体的权重系数，比如还要乘以1.5、0.9等等。
 *********************************************/
function getHitrate(attCharaModel,hertCharaModl){
	//TODO::对方混乱
	//if(hertChara.statusArray[LSouSouCharacterS.STATUS_CHAOS][0]> 0)return true;
	var r;
	//得到双方的爆发力
	var attBreakout = attCharaModel.breakout();
	var hertBreakout = hertCharaModel.breakout();
	if(attBreakout > 2*hertBreakout){
		r = 100;
	}else if(attBreakout > hertBreakout){
		r=(attBreakout-hertBreakout)*10/hertBreakout+90;
	}else if(attBreakout > hertBreakout){
		r=(attBreakout-hertBreakout/2)*30/(hertBreakout/2)+60;
	}else{
		r=(attBreakout-hertBreakout/3)*30/(hertBreakout/3)+30;
	}
	if(Math.random()*100 <= r){
		return true;
	}
	return false;
}
/********************************************
 法术攻击的命中率<br>
 X代表我方的精神力与运气之和，Y代表敌方的精神力与运气之和。R表示命中率<br>
 if (x>2*y)<br>
 r=100;<br>
 else if(x>y)<br>
 r=(x-y)*10/y+90;<br>
 else if(x>y/2)<br>
 r=(x-y/2)*30/(y/2)+60;<br>
 else<br>
 r=(x-y/3)*30/(y/3)+30;<br>
 宝物的加成<br>
 *********************************************/
function getHitrateStrategy(attCharaModel,hertCharaModel){
	//TODO::对方混乱
	//if(hertChara.statusArray[LSouSouCharacterS.STATUS_CHAOS][0]> 0)return true;
	var r;
	//得到双方的爆发力
	var attX = attCharaModel.spirit() + attCharaModel.morale();
	var hertY = hertCharaModel.spirit() + hertCharaModel.morale();
	if(attX > 2*hertY){
		r = 100;
	}else if(attX > hertY){
		r=(attX-hertY)*10/hertY+90;
	}else if(attX > hertY){
		r=(attX-hertY/2)*30/(hertY/2)+60;
	}else{
		r=(attX-hertY/3)*30/(hertY/3)+30;
	}
	if(Math.random()*100 <= r){
		return true;
	}	
	return false;
}
/************************************************************
 法术攻击的伤害值计算<br>
 X代表攻击方的精神力，Y代表被攻击方的精神力，Lv表示攻击方的等级。R表示伤害值<br>
 if (x'>y')<br>
 r=Lv+25+(X'-Y')/3;<br>
 else<br>
 r=Lv+25-(Y'-X')/3<br>
 然后再根据兵种相克和宝物进行修正
 **************************************************************/
function getHertStrategyValue(attCharaModel,hertCharaModel){
	var r;
	//得到攻击方的精神力和等级
	var attLv =  attCharaModel.lv();
	var attAttack = attCharaModel.spirit();
	//得到防御方的精神力
	var hertDefense = hertCharaModel.spirit();	
	//物理攻击的伤害值计算
	if(attAttack > hertDefense){
		r = attLv + 25 + (attAttack - hertDefense)/3;
	}else{
		r = attLv + 25 - (hertDefense - attAttack)/3;
	}
	//TODO:兵种加成
	//TODO:宝物加成
	//TODO:法术系数加成
	//r = int(r * Number(LSouSouObject.sMap.strategy.Hert.toString()));
	return r;
}	
/*****************************************************************
 物理攻击的伤害值计算
 X代表攻击方的攻击力，Y代表被攻击方的防御力，Lv表示攻击方的等级。R表示伤害值
 首先会根据地形修正攻击和防御力为X',Y'
 if (x'>y')
 r=Lv+25+(X'-Y')/2;
 else
 r=Lv+25-(Y'-X')/2
 然后再根据兵种相克和宝物进行修正
 **************************************************************/
function getHertValue(attCharaModel,hertCharaModel){
	var r;
	var attCharaModel = attChara.data;
	var hertCharaModel = hertChara.data;
	//得到攻击方的攻击力和等级
	var attLv =  attCharaModel.lv();
	var attAttack = attCharaModel.attack();// + parseInt(attChara.statusArray[LSouSouCharacterS.STATUS_ATTACK][2]);
	//得到防御方的防御力
	var hertDefense = hertCharaModel.defense();// + int(hertChara.statusArray[LSouSouCharacterS.STATUS_DEFENSE][2]);
	//地形修正
	var map = LMvc.BattleController.model.map.data;
	var attAttackAddition = attAttack * attCharaModel.currentSoldiers().terrain(map[attChara.locationY()][hertChara.locationX()].value).value * 0.01;
	var hertDefenseAddition = hertDefense * hertCharaModel.currentSoldiers().terrain(map[hertChara.locationY()][hertChara.locationX()].value).value * 0.01;
	console.log("attAttackAddition = " + attAttackAddition,"hertDefenseAddition = " + hertDefenseAddition);
	//物理攻击的伤害值计算
	if(attAttackAddition > hertDefenseAddition){
		r = attLv + 25 + (attAttackAddition - hertDefenseAddition)/2;
	}else{
		r = attLv + 25 - (hertDefenseAddition - attAttackAddition)/2;
	}
	//兵种相克
	r = r * attCharaModel.currentSoldiers().restrain(hertCharaModel.currentSoldiers().id()).value * 0.01;
	//随即系数
	r = (11 - Math.random() * 2) * 0.1 * r;
	if(r < 1){
		r = 1;
	}
	r = r >>> 0;
	//TODO:: 宝物修正
	return r;
}