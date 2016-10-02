function RecordModel(){
	base(this,MyModel,[]);
}
RecordModel.prototype.construct=function(){
	var self = this;
};
RecordModel.prototype.getImages=function(){
	var list = [
		{name:"close",path:LMvc.IMG_PATH+"component/close.png"},
		{name:"win02",path:LMvc.IMG_PATH+"win/win02.png"},
		{name:"win03",path:LMvc.IMG_PATH+"win/win03.png"},
		{name:"win05",path:LMvc.IMG_PATH+"win/win05.png"}
	];
	return list;
};