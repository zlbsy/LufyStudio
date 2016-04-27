function StrategyDetailedView(controller,soldierModel,fromView){
	var self = this;
	base(self,LView,[controller]);
	self.soldierModel = soldierModel;
	self.fromView = fromView;
	self.set();
}
StrategyDetailedView.prototype.set=function(){
	var self = this;
	
	var layer = new LSprite();
	
	var width = 48, height = 48;
	var icon = self.soldierModel.icon(new LPoint(width,height), true);
	layer.addChild(icon);
	var hertIcon = new LBitmap(new LBitmapData(LMvc.datalist["icon_hert"]));
	hertIcon.scaleX = hertIcon.scaleY = 16 / hertIcon.getHeight();
	hertIcon.x = icon.x + width + 15;
	hertIcon.y = icon.y;
	layer.addChild(hertIcon);
	var hpBack = new LPanel(new LBitmapData(LMvc.datalist["blue_bar"]),144,14);
	hpBack.x = icon.x + width + 35;
	hpBack.y = icon.y;
	layer.addChild(hpBack);
	var hpSize = 140 * 1;
	var hpIcon = new LPanel(new LBitmapData(LMvc.datalist["red_bar"]),hpSize,10);
	hpIcon.x = hpBack.x + 140 - hpSize + 2;
	hpIcon.y = icon.y + 2;
	layer.addChild(hpIcon);
	var lblHp = getStrokeLabel(String.format("{0}/{1} ",1000,1000),16,"#FFFFFF","#000000",1);
	lblHp.x = icon.x + width + 30 + 140 - lblHp.getWidth();
	lblHp.y = hpBack.y + hpBack.getHeight() - lblHp.getHeight();
	layer.addChild(lblHp);
	
	var yellowBallIcon = new LBitmap(new LBitmapData(LMvc.datalist["yellow_ball"]));
	yellowBallIcon.scaleX = yellowBallIcon.scaleY = 16 / yellowBallIcon.getHeight();
	yellowBallIcon.x = icon.x + width + 15 + 1;
	yellowBallIcon.y = icon.y + 19;
	layer.addChild(yellowBallIcon);
	var mpBack = new LPanel(new LBitmapData(LMvc.datalist["blue_bar"]),144,14);
	mpBack.x = icon.x + width + 35;
	mpBack.y = icon.y + 20;
	layer.addChild(mpBack);
	var mpSize = 140 * 0.8;
	var mpIcon = new LPanel(new LBitmapData(LMvc.datalist["yellow_bar"]),mpSize,10);
	mpIcon.x = mpBack.x + 140 - mpSize + 2;
	mpIcon.y = mpBack.y + 2;
	layer.addChild(mpIcon);
	var lblMp = getStrokeLabel(String.format("{0}/{1} ",430* 0.8 >>> 0,430),16,"#FFFFFF","#000000",1);
	lblMp.x = icon.x + width + 30 + 140 - lblMp.getWidth();
	lblMp.y = mpBack.y + mpBack.getHeight() - lblMp.getHeight();
	layer.addChild(lblMp);
	
	var lblProficiency = getStrokeLabel(String.format("{0} : {1} ",Language.get("proficiency"),self.soldierModel.proficiency()),16,"#FFFFFF","#000000",2);
	lblProficiency.x = icon.x + width + 15;
	lblProficiency.y = icon.y + 40;
	layer.addChild(lblProficiency);
	
	var dataList = [
		["attack",self.soldierModel.property().attack],
		["spirit",self.soldierModel.property().spirit],
		["defense",self.soldierModel.property().defense],
		["breakout",self.soldierModel.property().breakout],
		["morale",self.soldierModel.property().morale],
		["movePower",self.soldierModel.movePower()]
	];
	for(var i=0;i<dataList.length;i++){
		var label = getStrokeLabel(String.format("{0} : {1} ",Language.get(dataList[i][0]),dataList[i][1]),16,"#FFFFFF","#000000",2);
		label.y = icon.y + height + 20 + i * 26;
		layer.addChild(label);
	}
	var bitmapLine = new LBitmap(new LBitmapData(LMvc.datalist["icon-line"]));
	bitmapLine.scaleX = 340;
	bitmapLine.y = icon.y + height + 20 + dataList.length * 26;
	layer.addChild(bitmapLine);
	
	var lblExplanation = getStrokeLabel(self.soldierModel.explanation(),14,"#FFFFFF","#000000",2);
	lblExplanation.width = 340;
	lblExplanation.setWordWrap(true, 25);
	lblExplanation.y = bitmapLine.y + 10;
	layer.addChild(lblExplanation);

	var rangeAttackLayer = self.getRangeAttack();
	rangeAttackLayer.x = 90;
	rangeAttackLayer.y = 70;
	layer.addChild(rangeAttackLayer);
	
	var rangeAttackLayer = self.getRangeAttackTarget();
	rangeAttackLayer.x = 220;
	rangeAttackLayer.y = 70;
	layer.addChild(rangeAttackLayer);
	
	self.addChild(layer);
};
StrategyDetailedView.prototype.getRangeAttack=function(){
	var self = this;
	var layer = new LSprite();
	var label = getStrokeLabel(Language.get("attack_range"),16,"#FFFFFF","#000000",2);
	layer.addChild(label);
	var labelHeight = 20,maxLength = 5,step = 11;
	var rangeAttack = self.soldierModel.rangeAttack();
	//[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}]
	for(var i=0;i<rangeAttack.length;i++){
		var range = rangeAttack[i];
		maxLength = Math.max(maxLength, Math.abs(range.x), Math.abs(range.y));
	}
	layer.graphics.drawRect(2, "#000000", [0, labelHeight, (maxLength*2 + 1) * step, (maxLength*2 + 1) * step]);
	for(var i=0,l=maxLength*2 + 1;i<l;i++){
		layer.graphics.drawLine(1, "#000000", [0, step*i + labelHeight, step*l, step*i + labelHeight]);
		layer.graphics.drawLine(1, "#000000", [step*i, labelHeight, step*i, step*l + labelHeight]);
	}
	for(var i=0;i<rangeAttack.length;i++){
		var range = rangeAttack[i];
		layer.graphics.drawRect(0, "#000000", [(maxLength + range.x)*step, labelHeight + (maxLength + range.y)*step, step, step],true,"#FF0000");
	}
	return getBitmap(layer);
};
StrategyDetailedView.prototype.getRangeAttackTarget=function(){
	var self = this;
	var layer = new LSprite();
	var label = getStrokeLabel(Language.get("attack_effect"),16,"#FFFFFF","#000000",2);
	layer.addChild(label);
	var labelHeight = 20,maxLength = 5,step = 11;
	var rangeAttack = self.soldierModel.rangeAttackTarget();
	//[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}]
	for(var i=0;i<rangeAttack.length;i++){
		var range = rangeAttack[i];
		maxLength = Math.max(maxLength, Math.abs(range.x), Math.abs(range.y));
	}
	layer.graphics.drawRect(2, "#000000", [0, labelHeight, (maxLength*2 + 1) * step, (maxLength*2 + 1) * step]);
	for(var i=0,l=maxLength*2 + 1;i<l;i++){
		layer.graphics.drawLine(1, "#000000", [0, step*i + labelHeight, step*l, step*i + labelHeight]);
		layer.graphics.drawLine(1, "#000000", [step*i, labelHeight, step*i, step*l + labelHeight]);
	}
	for(var i=0;i<rangeAttack.length;i++){
		var range = rangeAttack[i];
		layer.graphics.drawRect(0, "#000000", [(maxLength + range.x)*step, labelHeight + (maxLength + range.y)*step, step, step],true,"#FF0000");
	}
	return getBitmap(layer);
};
