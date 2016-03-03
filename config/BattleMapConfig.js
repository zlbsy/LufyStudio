function BattleMapConfig(){
}
BattleMapConfig.SPEED = 4;
BattleMapConfig.AttackQuantity = 5;
BattleMapConfig.DefenseQuantity = 10;
BattleMapConfig.DetachmentQuantity = 2;

var MapHelperSetting = {
	w:10,h:10,
	bitmapData:null,
	tiles:{}
};

var BattleWinConfirmType = {
	selfCaptive:1,
	selfRecruitFail:2,
	enemyCaptive:3,
	attackAndOccupy:4
};
var BattleFailConfirmType = {
	selectMoveCity:-1,
	enemyCaptive:-2,
	selfCaptive:-3,
	attackAndOccupy:-4,
	lossOfResources:-5
};
/*
BattleMapConfig.GameClear = "gameClear";
BattleMapConfig.GameOver = "gameOver";
BattleMapConfig.GameNext = "gameNext";
BattleMapConfig.GameBattle = "gameBattle";
BattleMapConfig.STEP_WIDTH = 48;
BattleMapConfig.STEP_HEIGHT = 48;
BattleMapConfig.DATA_NULL = 0;
BattleMapConfig.DATA_OUR_CHARACTER = 1;
BattleMapConfig.DATA_ENEMY_CHARACTER = 2;
BattleMapConfig.DATA_OUR_CASTLE = 3;
BattleMapConfig.DATA_ENEMY_CASTLE = 4;*/