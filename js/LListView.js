function LListView(){
	var self = this;
	base(self,LSprite,[]);
	//childWidth:单位宽度
	//childHeight:单位高度
	//direction:vertical/horizontal排列方向
	//number:每组长度
	self.addEventListener(LEvent.ENTER_FRAME,self.onframe);
}
LListView.prototype.onframe = function(event){
	var self = event.target;
};
LListView.prototype.updateView = function(){
	
};
function LListChildView(){
	var self = this;
	base(self,LSprite,[]);
	
}
LListChildView.prototype.updateView = function(){
	
};
LListChildView.prototype.updateView = function(){
	
};