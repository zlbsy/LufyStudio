/**
 * @author lufy
 */
function Toast(message){
	var self = this;
	base(self,LSprite,[]);
	var msg = getStrokeLabel(message,26,"#FFFFFF","#FFFFFF",1);
	
	var layer = new LSprite();
	layer.graphics.drawRoundRect(1, "#999999", [0, 0, msg.getWidth() + 20, msg.getHeight() + 10, 10], true, "#000000");
	msg.x = 10, msg.y = 5;
	layer.addChild(msg);
	layer.cacheAsBitmap(true);
	//var back = getBitmap(layer);
	layer.x = (LGlobal.width - layer.getWidth()) * 0.5;
	layer.y = (LGlobal.width - layer.getHeight()) * 0.5;
	self.addChild(layer);
}
Toast.makeText = function(message){
	var toast = new Toast(message);
	return toast;
};
Toast.prototype.show = function(){
	var self = this;
	if(!Toast.layer){
		Toast.layer = new LSprite();
		addChild(Toast.layer);
	}
	Toast.layer.addChild(self);
	self.addEventListener(LEvent.ENTER_FRAME,self.onframe);
};
Toast.prototype.onframe = function(event){
	var self = event.currentTarget;
	if(self.alpha > 0.5){
		self.alpha -= 0.01;
	}else{
		self.alpha -= 0.03;
	}
	if(self.alpha < 0.1){
		self.remove();
	}
};

