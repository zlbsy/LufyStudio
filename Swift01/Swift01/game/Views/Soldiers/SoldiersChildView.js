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
SoldiersChildView.prototype.setLvUpButton=function(){
	var self = this;
	if(!self.soldierModel.next()){
		if(self.btnLvUp){
			self.btnLvUp.remove();
		}
		return;
	}
	if(!self.btnLvUp){
		var canLvUp = self.soldierModel.proficiency() >= self.soldierModel.maxProficiency();
		var img = canLvUp ? "win01" : "win07";
		var btnLvUp = getPanel(img,60, 40);
		btnLvUp.img = img;
		var textLabel = getStrokeLabel(Language.get("levelUp"),18,canLvUp ? "#FFFFFF" : "#666666","#000000",3);
		textLabel.x = (60 - textLabel.getWidth()) * 0.5;
		textLabel.y = (40 - textLabel.getHeight()) * 0.5;
		btnLvUp.addChild(textLabel);
		btnLvUp.x = self.lblName.x + 250;
		btnLvUp.y = self.lblName.y;
		self.layer.addChild(btnLvUp);
		self.btnLvUp = btnLvUp;
	}else{
		if(self.soldierModel.proficiency() >= self.soldierModel.maxProficiency() && self.btnLvUp.img == "win07"){
			var data = GameCacher.getPanelBitmapData("win01",60, 40);
			self.btnLvUp.removeChildAt(0);
			self.btnLvUp.addChildAt(new LBitmap(data), 0);
			self.btnLvUp.img = "win01";
			self.btnLvUp.getChildAt(1).color = "#FFFFFF";
		}
	}
};
SoldiersChildView.prototype.getLevel=function(){
	var self = this;
	if(!self.lblLevel){
		var lblLevel = getStrokeLabel("", 23, "#FFFFFF", "#000000", 3);
		lblLevel.x = self.lblName.x + 110;
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
		lblCurrent.x = self.lblLevel.x + 210;
		lblCurrent.y = 10;
		self.layer.addChild(lblCurrent);
		self.lblCurrent = lblCurrent;
	}
	return self.lblCurrent;
};
SoldiersChildView.prototype.getCheckBox=function(){
	var self = this;
	if(self.lockIcon){
		self.lockIcon.remove();
		self.lockIcon = null;
	}
	if(!self.checkbox){
		var bitmap = new LBitmap(new LBitmapData(LMvc.datalist["checkbox-background"]));
		var bitmapSelect = new LBitmap(new LBitmapData(LMvc.datalist["checkbox-on"]));
		var check = new LCheckBox(bitmap, bitmapSelect);
		check.x = self.lblLevel.x + 210;
		check.y = 10;
		self.layer.addChild(check);
		self.checkbox = check;
	}
	return self.checkbox;
};
SoldiersChildView.prototype.setLockIcon=function(){
	var self = this;
	if(self.lockIcon){
		return;
	}
	var lockIcon = new LBitmap(new LBitmapData(LMvc.datalist["lock"]));
	lockIcon.scaleX = lockIcon.scaleY = 30 / lockIcon.getWidth();
	lockIcon.x = self.lblLevel.x + 200;
	lockIcon.y = 10;
	self.layer.addChild(lockIcon);
	self.lockIcon = lockIcon;
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
		self.setLvUpButton();
		if(self.soldierModel.isSpecialSoldiers()){
			if(purchaseHasBuy(productIdConfig.soldier_special)){
				var check = self.getCheckBox();
				check.setChecked(self.soldierModel.id() == self.characterModel.currentSoldierId());
			}else{
				self.setLockIcon();
			}
		}else{
			var check = self.getCheckBox();
			check.setChecked(self.soldierModel.id() == self.characterModel.currentSoldierId());
		}
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
	self.characterModel.currentSoldierId(self.soldierModel.id());
	var items = listView.getItems();
	for(var i = 0, l = items.length; i < l; i++){
		var child = items[i];
		if(!child.checkbox || child.objectIndex == self.objectIndex){
			continue;
		}
		child.checkbox.setChecked(false);
		child.cacheAsBitmap(false);
		if(listView.isInClipping(i)){
			child.updateView();
		}
	}
	self.checkbox.setChecked(true);
	self.cacheAsBitmap(false);
	self.updateView();
};
SoldiersChildView.prototype.toPurchase = function(listView) {
	var self = this;
	var name =Language.get("soldier_special");
	purchaseConfirm(productIdConfig.soldier_special, name, function(productId){
		var items = listView.getItems();
		for(var i=0,l=items.length;i<l;i++){
			var item = items[i];
			if(!item.lockIcon){
				continue;
			}
			item.cacheAsBitmap(false);
			item.updateView();
		}
	});
};
SoldiersChildView.prototype.onClick = function(event) {
	var self = event.target;
	var listView = event.currentTarget;
	var canSelect = (!LMvc.BattleController && self.characterModel.seigniorId() == LMvc.selectSeignorId);
	if(canSelect){
		if(self.checkbox && event.offsetX > self.checkbox.x - 10){
			self.toSelected(listView);
			return;
		}else if(self.lockIcon && event.offsetX > self.lockIcon.x - 10){
			self.toPurchase(listView);
			return;
		}else if(self.btnLvUp && event.offsetX > self.btnLvUp.x - 10){
			var canLvUp = self.soldierModel.proficiency() >= self.soldierModel.maxProficiency();
			var obj = {
				title : Language.get("confirm"),
				width : 340,
				height : 260
			};
			if(canLvUp){
				var nextSoldiers = SoldierMasterModel.getMaster(self.soldierModel.next());
				obj.messageHtml = String.format(Language.get("<font size='21' color='#D3D3D3'>将兵种升级为 「<font size='21' color='#FAFAD2'>{0}</font>」 吗？</font>"), nextSoldiers.name());
				obj.okEvent = function(e) {
					e.currentTarget.parent.remove();
					var nextSoldiersData = {id:nextSoldiers.id(),proficiency:self.soldierModel.maxProficiency(), img:self.soldierModel.img()};
					self.soldierModel = new SoldierModel(null, nextSoldiersData);
					self.cacheAsBitmap(false);
					self.updateView();
				};
				obj.cancelEvent = null;
			}else{
				obj.messageHtml = String.format(Language.get("<font size='21' color='#D3D3D3'>兵种升级需要熟练度达到 「<font size='21' color='#FAFAD2'>{0}</font>」 。</font>"), self.soldierModel.maxProficiency());
			}
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
			return;
		}
	}
	var soldiersView = listView.getParentByConstructor(SoldiersView);
	var soldierDetailed = new SoldierDetailedView(soldiersView.controller,self.soldierModel);
	var obj = {title:self.soldierModel.name(),subWindow:soldierDetailed,width:400,height:500, noButton:true};
	var windowLayer = ConfirmWindow(obj);
	LMvc.layer.addChild(windowLayer);
};