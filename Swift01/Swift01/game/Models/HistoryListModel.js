function HistoryListModel(){
	base(this,MyModel,[]);
}
HistoryListModel.prototype.construct=function(){
};
HistoryListModel.prototype.getImages=function(){
	var self = this;
	var list = [];
	list.push({name:"lock",path:LMvc.IMG_PATH+"icon/lock.png"});
	list.push({name:"icon-line",path:LMvc.IMG_PATH+"icon/line.png"});
	list.push({name:"focus",path:LMvc.IMG_PATH+"common/focus.png"});
	list.push({name:"range",path:LMvc.IMG_PATH+"component/range.png"});
	return list;
};