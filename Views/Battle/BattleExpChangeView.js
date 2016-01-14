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
	self.setData();
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
	var panel = getBitmap(new LPanel(backgroundData,LGlobal.width,30 * (self.datas.length + 1) + 20));
	self.baseLayer.addChildAt(panel,0);
};
BattleExpChangeView.prototype.initData = function(){
	var self = this, label;
	var layer = new LSprite();
	layer.x = 50;
	layer.y = 10;
	self.baseLayer.addChild(layer);
	self.expLayer = layer;
	
	var model = LMvc.BattleController.model;
	var datas = [];
	var sumExp = 0;
	for(var i=0,l=model.ourList.length;i<l;i++){
		var character = model.ourList[i];
		datas.push({name:character.data.name(), exp:character.data.exp()});
		sumExp += character.data.exp();
	}
	for(var i=0,l=model.enemyCaptive.length;i<l;i++){
		var characterId = model.enemyCaptive[i];
		var character = CharacterModel.getChara(characterId);
		datas.push({name:character.name(), exp:character.exp()});
		sumExp += character.exp();
	}
	self.average = sumExp / datas.length;
	self.datas = datas.sort(function(a,b){return b.exp - a.exp;});
	
	var xs = self.xs;
	label = getStrokeLabel(Language.get("generals"),20,"#FFFFFF","#000000",4);
	label.x = xs[0];
	layer.addChild(label);
	label = getStrokeLabel(Language.get("exp"),20,"#FFFFFF","#000000",4);
	label.x = xs[1];
	layer.addChild(label);
	label = getStrokeLabel(Language.get("feat"),20,"#FFFFFF","#000000",4);
	label.x = xs[2];
	layer.addChild(label);
};
BattleExpChangeView.prototype.setData = function(index){
	var self = this, label;
	var xs = self.xs;
	var isAll = (typeof index == UNDEFINED);
	if(!isAll && index >= self.datas.length){
		return;
	}
	if(self.isEnd){
		return;
	}
	for(var i=0,l=self.datas.length;i<l;i++){
		if(!isAll && i != index){
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
		
		var featLabel = getStrokeLabel(0,20,"#FFFFFF","#000000",4);
		featLabel.x = xs[3];
		featLabel.feat = 0;
		layer.addChild(featLabel);
		
		var rewardLabel;
		if(data.exp  >= self.average * 1.5){
			rewardLabel = getStrokeLabel("首功",20,"#FF0000","#000000",4);
			rewardLabel.x = xs[4];
			rewardLabel.alpha = 0;
			rewardLabel.scaleX = rewardLabel.scaleY = 2;
			layer.addChild(rewardLabel);
		}
		if(isAll){
			continue;
		}
		
		layer.alpha = 0;
		layer.scaleY = 0.1;
		if(rewardLabel){
			LTweenLite.to(layer,0.5,{alpha:1,scaleY:1,ease:LEasing.Elastic.easeOut})
			.to(featLabel,0.5,{feat:data.exp,onUpdate:function(e){
				e.target.text = e.target.feat >>> 0;
			}})
			.to(rewardLabel,0.5,{alpha:1,scaleX:1,scaleY:1,
			onComplete:function(e){
				var obj = e.target.parent;
				var s = obj.parent.parent.parent;
				s.setData(obj.index + 1);
			}});
		}else{
			LTweenLite.to(layer,0.5,{alpha:1,scaleY:1,ease:LEasing.Elastic.easeOut})
			.to(featLabel,0.5,{feat:data.exp,onUpdate:function(e){
				e.target.text = e.target.feat >>> 0;
			},onComplete:function(e){
				var obj = e.target.parent;
				var s = obj.parent.parent.parent;
				s.setData(obj.index + 1);
			}});
		}
	}
};