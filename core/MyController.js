function MyController(){
	base(this,LController,[]);
}
MyController.waitExecuteFuncs = [];
MyController.prototype.construct=function(){
};
MyController.prototype.nextFrameExecute=function(func){
	if(!MyController.timer){
		MyController.timer = new LTimer(LGlobal.speed, 1);
		MyController.timer.addEventListener(LTimerEvent.TIMER, MyController.waitExecuteFuncsExecute);
	}
	
};
MyController.waitExecuteFuncsExecute=function(){
	if(!MyController.timer){
		MyController.timer = new LTimer(LGlobal.speed, 1);
		MyController.timer.addEventListener(LTimerEvent.TIMER, MyController.waitExecuteFuncsExecute);
	}
	
};