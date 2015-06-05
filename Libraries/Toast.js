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
	var back = getBitmap(layer);
	back.x = (LGlobal.width - back.getWidth()) * 0.5;
	back.y = (LGlobal.width - back.getHeight()) * 0.5;
	self.addChild(back);
}
Toast.makeText = function(message){
	console.log("Toast.makeText = " + message);
	var toast = new Toast(message);
	return toast;
};
Toast.prototype.show = function(){
	var self = this;
	addChild(self);
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

