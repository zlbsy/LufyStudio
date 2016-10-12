function TournamentsConfirmView(){
	base(this,LView,[]);
	this.layerInit();
}
TournamentsConfirmView.prototype.updateView=function(){
	var self = this;
	var charas = self.parent.controller.getValue("characters");
	self.lineLayer.graphics.clear();
	for(var i=0;i<self.namesBox.length;i++){
		if(i >= charas.length){
			break;
		}
		var box = self.namesBox[i];
		var name = box[2];
		var charaModel = CharacterModel.getChara(charas[i].id);
		name.text = charaModel.name();
		if(charaModel.seigniorId() == LMvc.selectSeignorId){
			name.color="#8FBC8F";
		}
		name.x = box[0] + (100 - name.getWidth())*0.5;
		name.y = box[1]+50 + (50 - name.getHeight())*0.5;
		if(charas[i].r){
			var lineObj = self.namesLine[i];
			for(var j=0;j<lineObj.length - 2;j+=2){
				self.lineLayer.graphics.drawLine(6,"#F4A460",[lineObj[j], lineObj[j+1],lineObj[j+2], lineObj[j+3]]);
			}
		}
	}
};
TournamentsConfirmView.prototype.layerInit=function(){
	var self = this;
	self.addChild(getTranslucentMask());
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);
	self.lineLayer = new LSprite();
	self.lineLayer.y = 50;
	self.addChild(self.lineLayer);
	self.nameLayer = new LSprite();
	self.addChild(self.nameLayer);
	var panel = getPanel("win05",LMvc.screenWidth, LMvc.screenHeight);
	self.backLayer.addChild(panel);
	var panelTitle = getPanel("win02",200, 60);
	panelTitle.x = (LMvc.screenWidth - 200) * 0.5;
	self.backLayer.addChild(panelTitle);
	var name = getStrokeLabel(Language.get("tournaments"),20,"#FFFFFF","#000000",4);
	name.x = panelTitle.x + (200 - name.getWidth()) * 0.5;
	name.y = (60 - name.getHeight())*0.5;
	self.nameLayer.addChild(name);
	self.namesBox = [
	[10,0], [10,100], [370,0],[370,100],
	[10,250], [10,350], [370,250],[370,350],
	[120,50],[260,50], [120,300],[260,300],
	[190,140],[190,210]
	];
	for(var i=0;i<self.namesBox.length;i++){
		var box = self.namesBox[i];
		var panel = getPanel("win03",100, 50);
		panel.x = box[0];
		panel.y = box[1]+50;
		self.backLayer.addChild(panel);
		//self.backLayer.graphics.drawLine();
		var name = getStrokeLabel("",20,"#FFFFFF","#000000",4);
		self.nameLayer.addChild(name);
		box.push(name);
	}
	
	self.namesLine = [
	[60,50,60,75,120,75], 
	[60,100,60,75,120,75], 
	[420,50,420,75,360,75],
	[420,100,420,75,360,75],
	[60,300,60,325,120,325], 
	[60,350,60,325,120,325], 
	[420,300,420,325,360,325],
	[420,350,420,325,360,325],
	[220,75,240,75,240,140],
	[260,75,240,75,240,140], 
	[220,325,240,325,240,260],
	[260,325,240,325,240,260],
	//[190,140],[190,210]
	];
	var layer = new LSprite();
	layer.y = 50;
	self.backLayer.addChild(layer);
	layer.graphics.add(function(c){
		c.beginPath();
		for(var i=0;i<self.namesLine.length;i++){
			var lineObj = self.namesLine[i];
			for(var j=0;j<lineObj.length - 2;j+=2){
				c.moveTo(lineObj[j], lineObj[j+1]);
				c.lineTo(lineObj[j+2], lineObj[j+3]);
			}
		}
		c.lineWidth = 10;
		c.strokeStyle = "#FFFFFF";
		c.closePath();
		c.stroke();
	});
	self.backLayer.cacheAsBitmap(true);
	
	var buttonOk = getButton(Language.get("start"),200);
	buttonOk.x = (LMvc.screenWidth - 200) * 0.5;
	buttonOk.y = LMvc.screenHeight - 60;
	self.addChild(buttonOk);
	buttonOk.addEventListener(LMouseEvent.MOUSE_UP, self.singleStart);
};
TournamentsConfirmView.prototype.singleStart=function(event){
	var self = event.currentTarget.getParentByConstructor(TournamentsConfirmView);
	var tournamentsView = self.getParentByConstructor(TournamentsView);
	tournamentsView.singleCombatStart();
};