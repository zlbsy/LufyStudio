function ItemListModel(){
	base(this,MyModel,[]);
}
ItemListModel.prototype.construct=function(){
};

ItemListModel.prototype.getImages=function(){
	var self = this;
	var list = [];
	list.push({name:"win06",path:LMvc.IMG_PATH+"win/win06.png"});
	list.push({name:"lock",path:LMvc.IMG_PATH+"icon/lock.png"});
	return list;
};