function SoldiersChildView(soldierModel, characterModel,width, soldiersView, index){
	var self = this;
	base(self, LListChildView, []);
	self.soldierModel = soldierModel;
	self.characterModel = characterModel;
	self.soldiersView = soldiersView;
	self.index = index;
	self.fullWidth = width;
	self.iconWidth = 50;
	self.iconHeight = 50;
	self.layerInit();
}

SoldiersChildView.prototype.updateView = function(bitmap, rectangle, point){
	var self = this;
	if(!self._ll_cacheAsBitmap){
		self.set();
	}
	self.callParent("updateView",arguments);
};
SoldiersChildView.prototype.layerInit=function(){
	var self = this;
	self.layer = new LSprite();
	self.addChild(self.layer);
};
SoldiersChildView.prototype.drawLine=function(){
	var self = this;
	if(self.bitmapLine){
		return;
	}
	var bitmapLine = new LBitmap(new LBitmapData(LMvc.datalist["icon-line"]));
	bitmapLine.scaleX = self.fullWidth - self.lblName.x;
	bitmapLine.x = self.lblName.x;
	bitmapLine.y = 48;
	self.layer.addChild(bitmapLine);
	self.bitmapLine = bitmapLine;
};
SoldiersChildView.prototype.getName=function(){
	var self = this;
	if(!self.lblName){
		var lblName = getStrokeLabel("",23,"#FFFFFF","#000000",3);
		lblName.x = self.iconWidth + 5;
		lblName.y = 5;
		self.layer.addChild(lblName);
		self.lblName = lblName;
	}
	return self.lblName;
};
SoldiersChildView.prototype.getLevel=function(){
	var self = this;
	if(!self.lblLevel){
		var lblLevel = getStrokeLabel("", 23, "#FFFFFF", "#000000", 3);
		lblLevel.x = self.lblName.x + 120;
		lblLevel.y = self.lblName.y;
		self.layer.addChild(lblLevel);
		self.lblLevel = lblLevel;
	}
	return self.lblLevel;
};
SoldiersChildView.prototype.getCurrent=function(){
	var self = this;
	if(!self.lblCurrent){
		var lblCurrent = getStrokeLabel("",23,"#FFFFFF","#000000",3);
		lblCurrent.x = self.lblLevel.x + 200;
		lblCurrent.y = 10;
		self.layer.addChild(lblCurrent);
		self.lblCurrent = lblCurrent;
	}
	return self.lblCurrent;
};
SoldiersChildView.prototype.getCheckBox=function(){
	var self = this;
	if(!self.checkbox){
		var bitmap = new LBitmap(new LBitmapData(LMvc.datalist["checkbox-background"]));
		var bitmapSelect = new LBitmap(new LBitmapData(LMvc.datalist["checkbox-on"]));
		var check = new LCheckBox(bitmap, bitmapSelect);
		check.x = self.lblLevel.x + 200;
		check.y = 10;
		self.layer.addChild(check);
		self.checkbox = check;
	}
	return self.checkbox;
};
SoldiersChildView.prototype.set=function(){
	var self = this;
	
	var lblName = self.getName();
	lblName.text = self.soldierModel.name();
	var lblLevel = self.getLevel();
	lblLevel.text = Language.get("proficiency") + ": " + self.soldierModel.proficiency();
	self.drawLine();

	if(LMvc.BattleController){
		var lblCurrent = self.getCurrent();
		lblCurrent.text = self.soldierModel.id() == self.characterModel.currentSoldierId() ? Language.get("current") : "";
	}else{
		var check = self.getCheckBox();
		check.setChecked(self.soldierModel.id() == self.characterModel.currentSoldierId());
	}
	var iconImg = self.soldierModel.img();
	if(!self.iconImg || iconImg != self.iconImg){
		if(self.icon){
			self.icon.remove();
		}
		self.iconImg =iconImg;
		self.icon = self.soldierModel.icon(new LPoint(self.iconWidth, self.iconHeight),self.iconComplete);
		self.layer.addChild(self.icon);
	}
};
SoldiersChildView.prototype.iconComplete=function(event){
	var self = event.currentTarget.parent.parent;
	self.cacheAsBitmap(false);
	if(self.soldiersView.listView.isInClipping(self.index)){
		self.updateView();
	}
};
SoldiersChildView.prototype.toSelected=function(listView){
	var self = this;
	if(self.checkbox.checked){
		return;
	}
	var items = listView.getItems();
	for(var i = 0, l = items.length; i < l; i++){
		var child = items[i];
		if(!child.checkbox || !child.checkbox.checked){
			continue;
		}
		child.checkbox.setChecked(false);
		child.cacheAsBitmap(false);
		if(listView.isInClipping(i)){
			child.updateView();
		}
		break;
	}
	self.checkbox.setChecked(true);
	self.cacheAsBitmap(false);
	self.updateView();
	self.characterModel.currentSoldierId(self.soldierModel.id());
};
SoldiersChildView.prototype.onClick = function(event) {
	var self = event.target;
	var listView = event.currentTarget;
	var canSelect = (!LMvc.BattleController && self.characterModel.seigniorId() == LMvc.selectSeignorId);
	if(canSelect && event.offsetX > self.checkbox.x - 10){
		self.toSelected(listView);
		return;
	}
	var soldiersView = listView.getParentByConstructor(SoldiersView);
	var soldierDetailed = new SoldierDetailedView(soldiersView.controller,self.soldierModel);
	var obj = {title:self.soldierModel.name(),subWindow:soldierDetailed,width:400,height:520};
	if(canSelect){
		obj.okEvent = function(e){
			self.toSelected(listView);
			e.currentTarget.parent.remove();
		};
		obj.cancelEvent = null;
	}
	var windowLayer = ConfirmWindow(obj);
	LMvc.layer.addChild(windowLayer);
};