function SoldiersChildView(soldierModel, width){
//function SoldiersChildView(controller,soldierModel){
	var self = this;
	base(self, LListChildView, []);
	self.soldierModel = soldierModel;
	self.fullWidth = width;
	self.set();
}
SoldiersChildView.prototype.layerInit=function(){
	var self = this;
	self.layer = new LSprite();
	self.addChild(self.layer);
};
SoldiersChildView.prototype.set=function(){
	var self = this;
	self.layerInit();
	
	var layer = new LSprite();
	
	var width = 50, height = 50;
	
	var lblName = getStrokeLabel(self.soldierModel.name(),23,"#FFFFFF","#000000",3);
	lblName.x = width + 5;
	lblName.y = 5;
	layer.addChild(lblName);
	
	var bitmapLine = new LBitmap(new LBitmapData(LMvc.datalist["icon-line"]));
	bitmapLine.scaleX = self.fullWidth - lblName.x;
	bitmapLine.x = lblName.x;
	bitmapLine.y = 48;
	layer.addChild(bitmapLine);
	
	var lblLevel = getStrokeLabel(String.format("熟练度:{0} ",self.soldierModel.proficiency()),23,"#FFFFFF","#000000",3);
	lblLevel.x = lblName.x + 120;
	lblLevel.y = lblName.y;
	layer.addChild(lblLevel);
	
	var bitmap = new LBitmap(new LBitmapData(LMvc.datalist["checkbox-background"]));
	var bitmapSelect = new LBitmap(new LBitmapData(LMvc.datalist["checkbox-on"]));
	var check = new LCheckBox(bitmap, bitmapSelect);
	check.x = lblLevel.x + 200;
	check.y = 10;
	layer.addChild(check);
	self.checkbox = check;
	
	self.layer.addChild(layer);
	var icon = self.soldierModel.icon(new LPoint(width,height),self.iconComplete);
	self.layer.addChild(icon);
};
SoldiersChildView.prototype.iconComplete=function(event){
	var self = event.currentTarget.parent.parent;
	self.cacheAsBitmap(false);
	self.updateView();
};
SoldiersChildView.prototype.toSelected=function(listView){
	var self = this;
	if(self.checkbox.checked){
		return;
	}
	var items = listView.getItems();
	for(var i = 0, l = items.length; i < l; i++){
		var child = items[i];
		if(!child.checkbox.checked){
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
};
SoldiersChildView.prototype.onClick = function(event) {
	var self = event.target;
	var listView = event.currentTarget;
	if(event.offsetX > self.checkbox.x - 10){
		self.toSelected(listView);
		return;
	}
	var soldierDetailed = new SoldierDetailedView(null,self.soldierModel);
	var obj = {title:self.soldierModel.name(),subWindow:soldierDetailed,width:400,height:480,okEvent:null,cancelEvent:null};
	var windowLayer = ConfirmWindow(obj);
		
	LMvc.layer.addChild(windowLayer);
};