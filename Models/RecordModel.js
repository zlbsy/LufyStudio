function RecordModel(){
	base(this,MyModel,[]);
}
RecordModel.prototype.construct=function(){
	var self = this;
};
RecordModel.prototype.getImages=function(){
	var list = [
		{name:"win03",path:LMvc.IMG_PATH+"win/win03.png"},
		{name:"win05",path:LMvc.IMG_PATH+"win/win05.png"}
	];
	return list;
};