var LMvc = {
	IMG_PATH:"./images/",
	MVC_PATH:"./",
	loadingLock:false,
	layer:null,
	loading:null,
	datalist:null
};
LMvc.loadClass = function(name,callback,lastClass){
	if(typeof window[name+"Controller"] == "function"){
		callback.apply(lastClass,[]);
		return;
	}
	LMvc.loading.visible = true;
	var loader = new LMvcLoader();
	var names = ["Controllers/"+name+"Controller","Models/"+name+"Model","Views/"+name+"View"];
	loader.loadJs("","",names,function(){
		callback.apply(lastClass,[]);
		if(!LMvc.loadingLock)LMvc.loading.visible = false;
	});
};
LMvc.init = function(){
	LMvc.layer = new LSprite();
	addChild(LMvc.layer);
	if(!LMvc.loading){
		LMvc.loading = new LSprite();
		LMvc.loading.setProgress = function(){};
		LMvc.loading.graphics.drawRect(0, "#000000", [0, 0, LGlobal.width, LGlobal.height], true, "#000000");
		var label = new LTextField();
		label.text = "Loading...";
		label.color = "#FFFFFF";
		label.size = 20;
		label.x = (LGlobal.width - label.getWidth()) * 0.5;
		label.y = (LGlobal.height - label.getHeight()) * 0.5;
		LMvc.loading.addChild(label);
		addChild(LMvc.loading);
	}
	LMvc.loading.visible = false;
	LMvc.loadClass("Index",function(){
		LMvc.loading.visible = true;
		var controller = new IndexController();
		LMvc.loading.visible = false;
	});
};
LMvc.changeLoading = function(loadingClass){
	LMvc.loading.remove();
	LMvc.loading = new loadingClass();
	addChild(LMvc.loading);
};
LMvc.keepLoading = function(value){
	LMvc.loadingLock = LMvc.loading.visible = value;
};
function LMvcLoader(controller){
	this.controllerClass = controller;
}
LMvcLoader.prototype={
	controller:function(names,callback){
		var self = this;
		self.loadJs("Controllers","Controller",names,callback);
	},
	model:function(names,callback){
		var self = this;
		self.loadJs("Models","Model",names,callback);
	},
	view:function(names,callback){
		var self = this;
		self.loadJs("Views","View",names,callback);
	},
	image:function(datas,callback){
		var self = this;
		LMvc.loading.visible = true;
		var loadData = [];
		var loadDataCheck = {};
		for(var i=0;i<datas.length;i++){
			if(loadDataCheck[datas[i]["name"]] || LMvc.datalist[datas[i]["name"]])continue;
			loadData.push(datas[i]);
			loadDataCheck[datas[i]["name"]] = 1;
		}
		LLoadManage.load(
			loadData,function(progress){
				LMvc.loading.visible = true;
				LMvc.loading.setProgress(progress);
			},
			function(result){
				for(var k in result){
					LMvc.datalist[k] = result[k];
				}
				callback.apply(self.controllerClass,[]);
				if(!LMvc.loadingLock)LMvc.loading.visible = false;
			}
		);
	},
	config:function(names,callback){
		var self = this;
		self.loadJs("config","Config",names,callback);
	},
	library:function(names,callback){
		var self = this;
		self.loadJs("Libraries",null,names,callback);
	},
	helper:function(names,callback){
		var self = this;
		self.loadJs("Helpers",null,names,callback);
	},
	loadJs:function(type,classType,names,callback){
		var self = this,list=[],i,l;
		if(typeof names == "string")names = [names];
		for(i=0,l=names.length;i<l;i++){
			var name = names[i]+(classType?classType:"");
			var patts = name.split("/");
			if(window[patts[patts.length - 1]]){
				continue;
			}
			list.push({path:LMvc.MVC_PATH+(type?(type+"/"):"")+name+".js",type:"js"});
		}
		LMvc.loading.visible = true;
		LLoadManage.load(
			list,function(progress){
				LMvc.loading.visible = true;
				LMvc.loading.setProgress(progress);
			},
			function(result){
				callback.apply(self.controllerClass,[]);
				if(!LMvc.loadingLock)LMvc.loading.visible = false;
			}
		);
	}
};
function LMvcObject(){
}
LMvcObject.prototype.construct = function(){};
LMvcObject.prototype.loadMvc = function(names,callback){
	var self = this;
	if(typeof names == "string"){
		names = [names];
	}
	self._loadMvcInit(names,callback);
	self._loadMvc();
};
LMvcObject.prototype._loadMvcInit = function(names,callback){
	var self = this;
	self._loadMvcIndex = 0;
	self._loadMvcNames = names;
	self._loadMvcCallback = callback;
};
LMvcObject.prototype._loadMvc = function(){
	var self = this;
	var name = self._loadMvcNames[self._loadMvcIndex];
	self._loadMvcIndex += 1;
	if(self._loadMvcIndex >=  self._loadMvcNames.length){
		var callback = self._loadMvcCallback;
		self._loadMvcInit(null,null);
		LMvc.loadClass.apply(self,[name,callback,self]);
	}else{
		LMvc.loadClass.apply(self,[name,self._loadMvc,self]);
	}
};
function LController(){
	var self = this;
	self.mvcType = "controller";
	base(self,LMvcObject,[]);
	base(self,LEventDispatcher,[]);
	self.ll_viewList = [];
	self.ll_dispatcher = {};
	self.addEventListener(LController.NOTIFY,self.notify);
	var conName = self.constructor.name,length = conName.length;name = conName.substr(0,length - 10);
	self.load = new LMvcLoader(self);
	var model = window[name+"Model"];
	var view = window[name+"View"];
	view.baseView = true;
	self.model = new model();
	self.view = new view();
	self.model.controller = self;
	self.model.view = self.view;
	self.view.controller = self;
	self.view.model = self.model;
	self.addView(self.view);
	self.model.construct();
	self.view.construct();
	self.construct();
}
LController.NOTIFY = "notify";
LController.prototype.notify = function(event){
	var self = event.currentTarget;
	for(var i=0,l=self.ll_viewList.length;i<l;i++){
		var view = self.ll_viewList[i];
		if(view && view.mvcType == "view"){
			view.updateView();
		}
	}
};
LController.prototype.setValue = function(key,value){
	var self = this;
	self.ll_dispatcher[key] = value;
};
LController.prototype.getValue = function(key){
	return this.ll_dispatcher[key];
};
LController.prototype.clearValue = function(){
	this.ll_dispatcher = {};
};
LController.prototype.addView = function(view){
	this.ll_viewList.push(view);
};
LController.prototype.removeView = function(v){
	var self = this;
	for(var i=0,l=self.ll_viewList.length;i<l;i++){
		var view = self.ll_viewList[i];
		if(view && view.objectIndex == v.objectIndex){
			self.ll_viewList.splice(i,1);
			break;
		}
	}
};

function LModel(controller){
	var self = this;
	base(self,LMvcObject,[]);
	self.mvcType = "model";
	if (controller) {
		self.controller = controller;
		self.view = controller.view;
	}
}
function LView(controller){
	var self = this;
	base(self,LMvcObject,[]);
	base(self,LSprite,[]);
	self.mvcType = "view";
	if (controller) {
		self.controller = controller;
		self.model = controller.model;
		self.controller.addView(self);
	}
}
LView.prototype.die = function(){
	var self = this;
	if (self.controller) {
		self.controller.removeView(self);
	}
	if(self.baseView){
		self.controller.ll_dispatcher = {};
		self.controller.ll_viewList = [];
	}
	self.callParent("die",arguments);
	
	if (!LGlobal.destroy) {
		return;
	}
	var dieList = [];
	if (self.controller && self.controller.view && self.controller.view.objectIndex == self.objectIndex) {
		dieList.push(self.controller);
		dieList.push(self.controller.model);
	}
	dieList.push(self);
	if (dieList.length == 1) {
		return;
	}
	for (var i = 0; i < dieList.length; i++) {
		var obj = dieList[i];
		for (var k in obj) {
			delete obj[k];
		}
	}

};
LView.prototype.updateView = function(){};
