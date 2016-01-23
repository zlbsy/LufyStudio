function PerishView(controller,charaId){
	var self = this;
	base(self,LView,[controller]);
	self.charaId = charaId;
	self.set(charaId);
}
PerishView.prototype.set = function(charaId){
	var self = this;
	if(SeigniorExecute.running){
		SeigniorExecute.Instance().msgView.visible = false;
	}
	var faceW = 224, faceH = 336;
	var winW = 320, winH = faceH + 120;
	var layer = new LSprite();
	self.addChild(layer);
	var mask = getTranslucentMask();
	layer.addChild(mask);
	var win = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win05"]), winW, winH));
	win.x = (LGlobal.width - winW) * 0.5;
	win.y = (LGlobal.height - winH) * 0.5;
	layer.addChild(win);
	var charaModel = CharacterModel.getChara(charaId);
	var face = charaModel.face();
	face.x = (LGlobal.width - faceW) * 0.5;
	face.y = win.y + 10;
	layer.addChild(face);
	face.addEventListener(LEvent.COMPLETE, self.faceLoadOver);
	var message;
	if(LMvc.selectSeignorId == charaId){
		message = String.format(Language.get("seignor_die_self"),charaModel.name());
	}else{
		message = String.format(Language.get("seignor_die_other"),charaModel.name());
	}
	var messageLabel = getStrokeLabel(message, 20, "#FFFFFF", "#000000", 4);
	messageLabel.x = (LGlobal.width - messageLabel.getWidth()) * 0.5;
	messageLabel.y = face.y + faceH;
	layer.addChild(messageLabel);
	
	var buttonClose = getButton(Language.get("OK"),60);
	buttonClose.x = (LGlobal.width - buttonClose.getWidth()) * 0.5;
	buttonClose.y = messageLabel.y + messageLabel.getHeight() + 10;
	layer.addChild(buttonClose);
	buttonClose.addEventListener(LMouseEvent.MOUSE_UP, self.removeSelf);
};
PerishView.prototype.removeSelf = function(event){
	var self = event.currentTarget.parent.parent;
	var charaId = self.charaId;
	if(LMvc.selectSeignorId == charaId){
		console.log("Game Over");
	}else{
		self.remove();
		console.error("SeigniorExecute.running = " + SeigniorExecute.running);
		if(SeigniorExecute.running){
			SeigniorExecute.Instance().msgView.visible = true;
			SeigniorExecute.run();
		}else{
			LMvc.MapController.checkSeigniorWin();
		}
	}
};
PerishView.prototype.faceLoadOver = function(event){
	var face = event.currentTarget;
	LTweenLite.to(face,0.5,{alpha:0.5});
};