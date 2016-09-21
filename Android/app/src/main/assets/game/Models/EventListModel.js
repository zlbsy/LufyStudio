function EventListModel(){
	base(this,MyModel,[]);
}
EventListModel.prototype.construct=function(){
};
EventListModel.prototype.getImages=function(){
	var self = this;
	var list = [];
	list.push({name:"lock",path:LMvc.IMG_PATH+"icon/lock.png"});
	return list;
};