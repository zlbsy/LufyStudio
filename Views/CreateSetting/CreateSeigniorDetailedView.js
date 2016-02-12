function CreateSeigniorDetailedView(controller, data){
	var self = this;
	base(self,LView,[controller]);
	self.data = data;
	self.init();
}
CreateSeigniorDetailedView.prototype.init=function(){
	var self = this;
	self.layerInit();
	self.titleInit();
	self.faceInit();
};
CreateSeigniorDetailedView.prototype.layerInit=function(){
	var self = this;
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
	var panel = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win05"]),LGlobal.width, LGlobal.height));
	self.baseLayer.addChild(panel);
	self.titleLayer = new LSprite();
	self.baseLayer.addChild(self.titleLayer);
	self.contentLayer = new LSprite();
	self.contentLayer.y = 50;
	self.baseLayer.addChild(self.contentLayer);
	
	var closeButton = new LButton(new LBitmap(new LBitmapData(LMvc.datalist["close"])));
	closeButton.x = LGlobal.width - closeButton.getWidth();
	self.baseLayer.addChild(closeButton);
	closeButton.addEventListener(LMouseEvent.MOUSE_UP, self.closeSelf);
	
	self.selectSeigniorLayer = new LSprite();
	self.addChild(self.selectSeigniorLayer);
};
CreateSeigniorDetailedView.prototype.changeMonarchColor=function(){
	var self = this;
	
};
CreateSeigniorDetailedView.prototype.closeCharacterList=function(characters){
	var self = this;
	self.baseLayer.visible = true;
	self.selectSeigniorView.remove();
	self.selectSeigniorView = null;
	if(characters.length == 0){
		return;
	}
	var character = characters[0];
	if(!self.data){
		self.data = {id:character.data.id,color:"255,255,255",citys:[]};
	}else{
		/*{id:1000,color:"0,0,255",citys:[{id:39,prefecture:1,generals:[1,2]}]}*/
		var seigniorId = self.data.id;
		if(self.data.citys.length == 1){
			self.data.citys[0].prefecture = character.data.id;
			if(self.data.citys[0].generals.indexOf(character.data.id) < 0){
				self.data.citys[0].generals.push(character.data.id);
			}
		}else if(self.data.citys.length > 1){
			var indexOld = self.data.citys.findIndex(function(city){
				return city.generals.indexOf(self.data.id) >= 0;
			});
			var indexNew = self.data.citys.findIndex(function(city){
				return city.generals.indexOf(character.data.id) >= 0;
			});
			if(indexNew < 0){
				self.data.citys[indexOld].generals.push(character.data.id);
				self.data.citys[indexOld].prefecture = character.data.id;
			}else if(indexOld == indexNew){
				self.data.citys[indexOld].prefecture = character.data.id;
			}else{
				self.data.citys[indexNew].prefecture = character.data.id;
			}
		}
		self.data.id = character.data.id;
	}
	self.faceLayer.setData(character.data, self.data.color);
};
CreateSeigniorDetailedView.prototype.closeSelf=function(event){
	var self = event.currentTarget.getParentByConstructor(CreateSeigniorDetailedView);
	self.parent.baseLayer.visible = true;
	self.remove();
};
CreateSeigniorDetailedView.prototype.titleInit=function(data){
	var self = this, label;
	label = getStrokeLabel(Language.get(data ? "update_seignior" : "create_seignior"),26,"#CDD4AF","#000000",4);
	label.x = 15;
	label.y = 15;
	self.titleLayer.addChild(label);
	self.titleLayer.cacheAsBitmap(true);
};
CreateSeigniorDetailedView.prototype.faceInit=function(){
	var self = this;
	self.faceLayer = new CreateSeigniorFaceView(null, self.data);
	self.contentLayer.addChild(self.faceLayer);
};
CreateSeigniorDetailedView.prototype.toSelectSeignior=function(){
	var self = this;
	self.selectSeigniorView = new CreateSettingCharacterListView(null, "change_monarch");
	self.addChild(self.selectSeigniorView);
	self.baseLayer.visible = false;
};
CreateSeigniorDetailedView.prototype.getData=function(){
	var self = this;
};