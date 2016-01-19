function BattleExpChangeView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
	
	self.isEnd = false;
	self.xs = [0, 100, 200, 230, 330];
	self.initLayer();
	self.initData();
	self.setBackground();
	self.setData(0);
	
	self.addShape(LShape.RECT,[0,0,LGlobal.width,LGlobal.height]);
	self.addEventListener(LMouseEvent.MOUSE_DOWN, self.mousedown); 
	self.addEventListener(LMouseEvent.MOUSE_UP, self.mouseup); 
}
BattleExpChangeView.prototype.mousedown = function(e){};
BattleExpChangeView.prototype.mouseup = function(event){
	var self = event.currentTarget;
	if(self.isEnd){
		var resultView = self.parent;
		self.remove();
		resultView.dispatchEvent(BattleResultEvent.CLOSE_EXP);
	}else{
		self.setData();
	}
};
BattleExpChangeView.prototype.initLayer = function(){
	var self = this;
	self.baseLayer = new LSprite();
	self.baseLayer.y = 100;
	self.addChild(self.baseLayer);
};
BattleExpChangeView.prototype.setBackground = function(){
	var self = this;
	var backgroundData = new LBitmapData(LMvc.datalist["background-text01"]);
	var panel = getBitmap(new LPanel(backgroundData,LGlobal.width,30 * (self.datas.length + 2)));
	self.baseLayer.addChildAt(panel,0);
};
BattleExpChangeView.prototype.initData = function(){
	var self = this, label;
	var layer = new LSprite();
	layer.x = 50;
	layer.y = 10;
	self.baseLayer.addChild(layer);
	
	var model = LMvc.BattleController.model;
	var datas = [];
	var sumExp = 0;
	var battleData = LMvc.BattleController.battleData;
	console.log("battleData.expeditionCharacterList.length="+battleData.expeditionCharacterList.length);
	for(var i=0,l=battleData.expeditionCharacterList.length;i<l;i++){
		var character = battleData.expeditionCharacterList[i];
		datas.push({name:character.name(), exp:character.exp()});
		sumExp += character.exp();
	}
	/*for(var i=0,l=model.ourList.length;i<l;i++){
		var character = model.ourList[i];
		datas.push({name:character.data.name(), exp:character.data.exp()});
		sumExp += character.data.exp();
	}
	for(var i=0,l=model.enemyCaptive.length;i<l;i++){
		var characterId = model.enemyCaptive[i];
		var character = CharacterModel.getChara(characterId);
		datas.push({name:character.name(), exp:character.exp()});
		sumExp += character.exp();
	}*/
	self.average = sumExp / datas.length;
	var feat = self.average * 1;
	var rewardValue = 1.5;
	self.datas = datas.sort(function(a,b){return b.exp - a.exp;});
	for(var i=0,l=self.datas.length;i<l;i++){
		var data = self.datas[i];
		data.feat = feat;
		if(data.feat < 10){
			data.feat = 10;
		}
		if(data.exp >= self.average * rewardValue){
			data.feat += feat * (data.exp / self.average  - rewardValue);
			data.reward = true;
		}
		feat -= 5;
		data.feat = data.feat >>> 0;
	}
	var xs = self.xs;
	label = getStrokeLabel(Language.get("generals"),20,"#FFFFFF","#000000",4);
	label.x = xs[0];
	layer.addChild(label);
	label = getStrokeLabel(Language.get("exp"),20,"#FFFFFF","#000000",4);
	label.x = xs[1];
	layer.addChild(label);
	label = getStrokeLabel(Language.get("feat"),20,"#FFFFFF","#000000",4);
	label.x = xs[3];
	layer.addChild(label);
	
	layer = new LSprite();
	layer.x = 50;
	layer.y = 20;
	self.baseLayer.addChild(layer);
	self.expLayer = layer;
};
BattleExpChangeView.prototype.setData = function(index){
	var self = this, label;
	if(self.isEnd){
		return;
	}
	var xs = self.xs;
	var isAll = (typeof index == UNDEFINED);
	if(isAll){
		index = -1;
		self.isEnd = true;
		self.expLayer.removeAllChild();
	}else if(index >= self.datas.length){
		self.isEnd = true;
		return;
	}
	
	for(var i=0,l=self.datas.length;i<l;i++){
		if(!isAll && i !== index){
			continue;
		}
		var layer = new LSprite();
		layer.index = index;
		self.expLayer.addChild(layer);
		layer.y = (i + 1) * 30;
		var data = self.datas[i];
		label = getStrokeLabel(data.name,20,"#FFFFFF","#000000",4);
		label.x = xs[0];
		layer.addChild(label);
		
		label = getStrokeLabel( data.exp,20,"#FFFFFF","#000000",4);
		label.x = xs[1];
		layer.addChild(label);
		
		label = getStrokeLabel( "→",20,"#FFFFFF","#000000",4);
		label.x = xs[2];
		layer.addChild(label);
		var feat = data.feat;
		var featLabel = getStrokeLabel(isAll?feat:0,20,"#FFFFFF","#000000",4);
		featLabel.x = xs[3];
		featLabel.feat = 0;
		layer.addChild(featLabel);
		
		var rewardLabel;
		if(data.reward){
			rewardLabel = getStrokeLabel("首功",20,"#FF0000","#000000",4);
			rewardLabel.x = xs[4];
			layer.addChild(rewardLabel);
		}
		if(isAll){
			continue;
		}
		
		layer.alpha = 0;
		layer.scaleY = 0.1;
		if(data.reward){
			rewardLabel.alpha = 0;
			rewardLabel.scaleX = rewardLabel.scaleY = 2;
			
			LTweenLite.to(layer,0.3,{alpha:1,scaleY:1,ease:LEasing.Elastic.easeOut})
			.to(featLabel,0.5,{feat:feat,onUpdate:function(e){
				e.target.text = e.target.feat >>> 0;
			},onComplete:function(e){
				e.target.text = e.target.feat >>> 0;
			}});
			LTweenLite.to(rewardLabel,0.3,{delay:0.8,alpha:1,scaleX:1,scaleY:1,onComplete:function(e){
				var obj = e.target.parent;
				var s = obj.parent.parent.parent;
				s.setData(obj.index + 1);
			}});
		}else{
			LTweenLite.to(layer,0.3,{alpha:1,scaleY:1,ease:LEasing.Elastic.easeOut})
			.to(featLabel,0.5,{feat:feat,onUpdate:function(e){
				e.target.text = e.target.feat >>> 0;
			},onComplete:function(e){
				e.target.text = e.target.feat >>> 0;
				var obj = e.target.parent;
				var s = obj.parent.parent.parent;
				s.setData(obj.index + 1);
			}});
		}
	}
};