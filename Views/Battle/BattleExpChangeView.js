function BattleExpChangeView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
	var baseLayer = new LSprite();
	baseLayer.y = 100;
	self.addChild(baseLayer);
	self.setData();
	self.setBackground();
}
BattleExpChangeView.prototype.setBackground = function(){
	var self = this;
	var backgroundData = new LBitmapData(LMvc.datalist["background-text01"]);
	var panel = getBitmap(new LPanel(backgroundData,LGlobal.width,30 * self.datas.length + 20));
	baseLayer.addChildAt(panel,0);
};
BattleExpChangeView.prototype.setData = function(){
	var self = this;
	var layer = new LSprite();
	layer.x = 50;
	layer.y = 10;
	baseLayer.addChild(layer);
	var model = LMvc.BattleController.model;
	var datas = [];
	for(var i=0,l=model.ourList.length;i<l;i++){
		var character = model.ourList[i];
		datas.push({name:character.data.name(), exp:character.data.exp()});
	}
	for(var i=0,l=model.enemyCaptive.length;i<l;i++){
		var characterId = model.enemyCaptive[i];
		var character = CharacterModel.getChara(characterId);
		datas.push({name:character.name(), exp:character.exp()});
	}
	self.datas = datas.sort(function(a,b){return b.exp - a.exp;});
	for(var i=0,l=self.datas.length;i<l;i++){
		var data = self.datas[i];
		var label = getStrokeLabel(String.format("{0} : {1}",data.name, data.exp),20,"#FFFFFF","#000000",4);
		label.y = i * 30;
		layer.addChild(label);
		if(i==0){
			label = getStrokeLabel("首功",20,"#FF0000","#000000",4);
			label.x = 200;
			label.y = i * 30;
			layer.addChild(label);
		}
	}
};