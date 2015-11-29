var studioMenubar;
var characters;
var components;
var projectFiles;
var gameStage;
var character;
var currentComponent;
var dragPoint;
var user;
var helper;
var iconSlider;
function ToolInterface(){
}
ToolInterface.init = function(){
	titleLayer = new LSprite();
	stageLayer.addChild(titleLayer);
	gameStage = new LSprite();
	//gameStage.graphics.drawRect(1,"#333333",[0,0,600,800],true,"#FFFFFF");
	
	var scrollbar = new LScrollbar(gameStage,660,960,20);
	scrollbar.x = 1;
	scrollbar.y = 30;
	stageLayer.addChild(scrollbar);
	//stageLayer.addChild(gameStage);
	var com = new LComboBox();
	com.x = 5;
	com.setChild({label:"50%",value:0.5});
	com.setChild({label:"75%",value:0.75});
	com.setChild({label:"100%",value:1});
	com.setChild({label:"150%",value:1.5});
	com.setChild({label:"200%",value:2});
	com.setChild({label:"250%",value:2.5});
	com.setChild({label:"300%",value:3});
	com.setValue(1);
	stageLayer.addChild(com);
	com.addEventListener(LComboBox.ON_CHANGE,function(event){
		gameStage.scaleX = gameStage.scaleY = event.target.value;
		gameStage.x = gameStage.y = 0;
	});

	
	studioMenubar = new StudioMenubar();
	rootLayer.addChild(studioMenubar);
	stageLayer.y = studioMenubar.getHeight();
	
	helper = new Helper();
	helper.x = 300;
	helper.y = 5;
	rootLayer.addChild(helper);
	var maskObj = new LSprite();
	maskObj.x = helper.x;
    maskObj.graphics.drawRect(0, "#ff0000", [0, 0, 600, 30]);
	helper.mask = maskObj;
	
	user = new User();
	user.x = LGlobal.width;
	rootLayer.addChild(user);
	
	characters = new Characters();
	characters.x = LGlobal.width - characters.getWidth();
	stageLayer.addChild(characters);
	
	components = new Components();
	components.x = characters.x;
	stageLayer.addChild(components);
	
	characters.toshow();
	ToolInterface.charactersPush(characterList, 0);
	
	character = new Character(true);
	gameStage.addChild(character);
	
	iconSlider = new IconSlider();
	rootLayer.addChild(iconSlider);
	iconSlider.reset();
	iconSlider.visible = false;
	
	
	LGlobal.stage.addEventListener(LEvent.WINDOW_RESIZE, ToolInterface.onresize);
	if(window.localStorage.getItem("faceStudio_username")){
		LAjax.responseType = LAjax.JSON;
		var username = window.localStorage.getItem("faceStudio_username");
		var password = window.localStorage.getItem("faceStudio_password");
		LAjax.post("./Data/login.php",{"username":username,"password":password},function(responseData){
			console.log("./Data/login.php",responseData);
			if(responseData.result){
				user.ssid = responseData.ssid;
				user.uid = responseData.data.uid;
				user.username.text = username;
				user.button.setLabel("退出");
				user.button.width = 70;
				user.username.x = -user.button.width - user.username.getWidth() - 10;
			}
		});
	}
};
ToolInterface.charactersSearch = function(){
	characters.scrollbar.scrollToTop();
	characters.showLayer.removeAllChild();
	if(characters.searchName.text.length == 0){
		ToolInterface.charactersPush(characterList, 0);
		return;
	}
	var name = LString.trim(characters.searchName.text);
	var charaList = [],child;
	var value = characters.filterCombox.value;
	for(var i=0,l=characterList.length;i<l;i++){
		var obj = characterList[i];
		if(obj.name.indexOf(name) >= 0){
			//charaList.push(obj);
			if(value == 0){
				charaList.push(obj);
			}else if(value == 1){
				if(obj.type == "◎"){
					charaList.push(obj);
				}
			}else if(value == 2){
				if(obj.type == "◯"){
					charaList.push(obj);
				}
			}else if(value == 3){
				if(obj.type == "△"){
					charaList.push(obj);
				}
			}else if(value == 4){
				if(obj.type == "☆"){
					charaList.push(obj);
				}
			}else if(value == 5){
				if(obj.type == "×"){
					charaList.push(obj);
				}
			}
		}
	}
	ToolInterface.charactersPush(charaList, 0);
};
ToolInterface.charactersFilter = function(value){
	characters.scrollbar.scrollToTop();
	characters.showLayer.removeAllChild();
	if(value == 0){
		ToolInterface.charactersPush(characterList, 0);
		return;
	}
	var charaList = [];
	for(var i=0,l=characterList.length;i<l;i++){
		var obj = characterList[i];
		if(value == 1){
			if(obj.type == "◎"){
				charaList.push(obj);
			}
		}else if(value == 2){
			if(obj.type == "◯"){
				charaList.push(obj);
			}
		}else if(value == 3){
			if(obj.type == "△"){
				charaList.push(obj);
			}
		}else if(value == 4){
			if(obj.type == "☆"){
				charaList.push(obj);
			}
		}else if(value == 5){
			if(obj.type == "×"){
				charaList.push(obj);
			}
		}
	}
	ToolInterface.charactersPush(charaList, 0);
};
ToolInterface.charactersPush = function(charas, characterIndex){
	var child,length = charas.length < characterIndex + 50 ? charas.length : characterIndex + 50;
	for(var i=characterIndex;i<length;i++){
		child = charas[i];
		characters.add(child.name, child.index);
	}
	if(length < charas.length){
		setTimeout(function(){
			ToolInterface.charactersPush(charas, length);
		},1);
	}
};
ToolInterface.titleInit = function(_name,_stage){
	for(var i=0,l=gameStage.childList.length;i<l;i++){
		gameStage.childList[i].visible = false;
	}
	var closeButton;
	var stageTitle = new LSprite();
	stageTitle.stage = _stage;
	stageTitle.y = 3;
	if(gameStage.childList.length > 0){
		closeButton = new LButton(new LBitmap(new LBitmapData(datalist["iconClose"],0,0,24,24)),new LBitmap(new LBitmapData(datalist["iconClose"],24,0,24,24)));
		closeButton.x = 5;
		closeButton.y = 4;
		closeButton.addEventListener(LMouseEvent.MOUSE_UP,ToolInterface.removeStageFromCloseButton);
		stageTitle.addChild(closeButton);
	}
	var titleLabel = new LTextField();
	titleLabel.text = _name;
	titleLabel.color = "#FFFFFF";
	titleLabel.size = 120;
	titleLabel.x = 10 + (closeButton?closeButton.getWidth():0);
	titleLabel.y = 8;
	stageTitle.addChild(titleLabel);
	
	stageTitle.graphics.drawRoundRect(1,"#000000",[0,0,titleLabel.x + titleLabel.getWidth() + 10,40,10],true,"#666666");
	stageTitle.x = titleLayer.getWidth();
	titleLayer.addChild(stageTitle);
	gameStage.addChild(_stage);
	_stage.visible = true;
	//stageList.push(stageTitle.stage);
};
ToolInterface.removeStageFromCloseButton = function(e){
	var closeBtn = e.clickTarget;
	closeBtn.parent.stage.remove();
	closeBtn.parent.remove();
	var l=titleLayer.childList.length,startX=0;
	for(var i=0;i<l;i++){
		if(i==l-1){
			gameStage.childList[i].visible = true;
		}else{
			gameStage.childList[i].visible = false;
		}
		titleLayer.childList[i].x = startX;
		console.log("titleLayer.childList[i].getWidth()",titleLayer.childList[i].getWidth());
		startX += titleLayer.childList[i].getWidth();
	}
};
ToolInterface.onresize = function(){
	LGlobal.width = window.innerWidth;
	LGlobal.height = window.innerHeight;
	LGlobal.canvasObj.width  = LGlobal.width;
	LGlobal.canvasObj.height  = LGlobal.height;
	LGlobal.resize();
	rootLayer.graphics.clear();
	rootLayer.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,LGlobal.height],true,"#999999");
	
	var backgroundColor=LGlobal.canvas.createLinearGradient(0,-20,0,30);
	backgroundColor.addColorStop(0,"#FFFFFF");
	backgroundColor.addColorStop(1,"#000000");
	studioMenubar.back.graphics.clear();
	studioMenubar.back.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,studioMenubar.menu.getHeight()],true,backgroundColor);
	
	characters.x = LGlobal.width - characters.getWidth();
	components.x = characters.x;

	iconSlider.reset();
	user.x = LGlobal.width;
};