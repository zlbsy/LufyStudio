function MyController(){
	base(this,LController,[]);
}
MyController.waitExecuteFuncs = [];
MyController.prototype.construct=function(){
};
MyController.prototype.nextFrameExecute=function(func){
	if(!MyController.timer){
		MyController.timer = new LTimer(LGlobal.speed*1.1, 1);
		MyController.timer.addEventListener(LTimerEvent.TIMER, MyController.waitExecuteFuncsExecute);
	}
	if(MyController.waitExecuteFuncs.length == 0){
		MyController.timer.reset();
		MyController.timer.start();
	}
	MyController.waitExecuteFuncs.push(func);
};
MyController.waitExecuteFuncsExecute=function(){
	for (var i = 0, l=MyController.waitExecuteFuncs.length; i < l; i++) {
		var func = MyController.waitExecuteFuncs[i];
		if(typeof func == "function"){
			func();
		}
	}
	MyController.waitExecuteFuncs.length = 0;
};