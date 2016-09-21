function purchaseLogGet(callback) {
	var purchase = LPurchase.Instance();
	purchase.removeAllEventListener();
	purchase.addEventListener(LPurchase.PURCHASE_LOG_COMPLETE, function(event) {
		var data = event.target;
		var log = [];
		if(data && data.receipt && data.receipt.in_app){
			log = data.receipt.in_app;
		}
		LPlugin.SetData("purchaseLog", log);
		if(callback){
			callback();
		}
	});
	purchase.purchaseLog();
}
function purchaseRestore(callback) {
	var purchase = LPurchase.Instance();
	purchase.removeAllEventListener();
	purchase.addEventListener(LPurchase.PURCHASE_COMPLETE,purchaseComplete);
	purchase.addEventListener(LPurchase.PURCHASE_RESTORE_COMPLETE, function(event) {
		callback();
	});
	LPlugin.SetData("purchaseLog", []);
	purchase.purchaseRestore();
}

function purchaseProductInformation(callback) {
	GameCacher.setData("productInformation", [
	{productId:"com.lufylegend.sgj.newWujiang",title:"新武将",price:6,priceLabel:"¥6"},
	{productId:"com.lufylegend.sgj.saveReport",title:"存档",price:6,priceLabel:"¥6"},
	{productId:"com.lufylegend.sgj.chapter_3",title:"chapter_3",price:6,priceLabel:"¥6"},
	{productId:"com.lufylegend.sgj.chapter_4",title:"chapter_4",price:6,priceLabel:"¥6"},
	{productId:"com.lufylegend.sgj.chapter_5",title:"chapter_5",price:6,priceLabel:"¥6"},
	{productId:"com.lufylegend.sgj.chapter_6",title:"chapter_6",price:6,priceLabel:"¥6"},
	{productId:"com.lufylegend.sgj.chapter_7",title:"chapter_7",price:6,priceLabel:"¥6"},
	{productId:"com.lufylegend.sgj.chapter_8",title:"chapter_8",price:6,priceLabel:"¥6"},
	{productId:"com.lufylegend.sgj.chapter_9",title:"chapter_9",price:6,priceLabel:"¥6"},
	{productId:"com.lufylegend.sgj.chapter_10",title:"chapter_10",price:6,priceLabel:"¥6"},
	{productId:"com.lufylegend.sgj.chapter_11",title:"chapter_11",price:6,priceLabel:"¥6"},
	{productId:"com.lufylegend.sgj.chapter_194_211",title:"chapter_194_211",price:12,priceLabel:"¥12"},
	{productId:"com.lufylegend.sgj.chapter_219_263",title:"chapter_219_263",price:12,priceLabel:"¥12"},
	]);
	callback();return;
	
	
	var purchase = LPurchase.Instance();
	purchase.removeAllEventListener();
	purchase.addEventListener(LPurchase.PRODUCT_INFORMATION_COMPLETE, function(event) {
		var data = event.target;
		GameCacher.setData("productInformation", data);
		callback();
	});
	purchase.productInformation(productIdConfig.productIds);
}

function purchaseComplete(event, callback) {
	LPlugin.print(JSON.stringify(event));
	if(event.status == 0){
		//error
		if(callback){
			callback(null);
		}
	}else{
		//success
		var data = event.target ? event.target : {};
		//purchase log update
		var purchaseLog = LPlugin.GetData("purchaseLog", []);
		purchaseLog.push({"product_id":data.productId});
		LPlugin.SetData("purchaseLog", purchaseLog);
		if(callback){
			callback(data.productId);
		}
	}
}
function purchaseStart(productId, callback) {
	if(LGlobal.android){
		purchaseStartAndroidInput(productId, callback);
		return;
	}
	var purchase = LPurchase.Instance();
	purchase.removeAllEventListener();
	purchase.addEventListener(LPurchase.PURCHASE_COMPLETE,function(event){
		purchaseComplete(event, callback);
	});
	purchase.purchase(productId);
}
function purchaseStartAndroidInput(productId, callback) {
	var purchaseStartView = new PurchaseStartView(null, productId, callback);
	var productInformation = GameCacher.getData("productInformation");
	var product = productInformation.find(function(child) {
		return child.productId == productId;
	});
	var obj = {width:440, height:580, subWindow:purchaseStartView, title:product.title, titleWidth:200, 
		okEvent:purchaseStartView.clickOK, cancelEvent:function(event){
		event.currentTarget.parent.remove();
		LGlobal.preventDefault = true;
	}};
	var purchaseStartDialog = ConfirmWindow(obj);
	purchaseStartDialog.name = "PurchaseStartWindow";
	LMvc.layer.addChild(purchaseStartDialog);
}
function purchaseStartAndroidCheck(productId, name, num, paymentTime, email, qq, callback) {
	var purchase = LPurchase.Instance();
	purchase.removeAllEventListener();
	purchase.addEventListener(LPurchase.PURCHASE_CHECK_COMPLETE,function(event){
		var data = event.target;
		if(data.num_rows == 0){
			purchaseStartAndroid(productId, name, num, paymentTime, email, qq, callback);
		}else{
			var productInformation = GameCacher.getData("productInformation");
			var product = productInformation.find(function(child) {
				return child.productId == productId;
			});
			var obj = {
				title : Language.get("confirm"),
				width : 340,
				height : 260,
				messageHtml : String.format(Language.get("purchase_already_buy_confirm"), product.title)
			};
			obj.okEvent = function(e){
				e.currentTarget.parent.remove();
				purchaseStartAndroid(productId, name, num, paymentTime, email, qq, callback);
			};
			obj.cancelEvent = function(e){
				e.currentTarget.parent.remove();
				var purchaseStartWindow = LMvc.layer.getChildByName("PurchaseStartWindow");
				var purchaseStartView = purchaseStartWindow.getChildByName("PurchaseStartView");
				purchaseStartView.mouseEnabled = true;
			};
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
		}
	});
	purchase.purchaseCheck(productId);
}
function purchaseStartAndroid(productId, name, num, paymentTime, email, qq, callback) {
	var purchase = LPurchase.Instance();
	purchase.removeAllEventListener();
	purchase.addEventListener(LPurchase.PURCHASE_COMPLETE,function(event){
		var purchaseStartWindow = LMvc.layer.getChildByName("PurchaseStartWindow");
		purchaseStartWindow.remove();
		var purchaseBatch = LPlugin.GetData("purchaseBatch", []);
		var updateTime = event.target.updateTime;
		purchaseBatch.push(updateTime);
		LPlugin.SetData("purchaseBatch", purchaseBatch);
	});
	purchase.purchase(productId, name, num, paymentTime, email, qq);
}

function purchaseHasBuy(productId) {
	if(LGlobal.traceDebug || LPlugin.testVersion){
		return true;
	}
	var purchaseLog = LPlugin.GetData("purchaseLog", []);
	var child = purchaseLog.find(function(c){
		return c.product_id == productId;
	});
	return child != null;
}
function getGroupChapterNames(group){
	var names = [];
	for(var i=0;i<chapterListSetting.length;i++){
		var chapter = chapterListSetting[i];
		if(chapter.group == group){
			names.push("・" + Language.get("chapter_"+chapter.id));
		}
	}
	return names.join("\n");
}
function purchaseGroupConfirm(productId, name, group, callback){
	purchaseConfirmShow(productId, name, group, callback);
}
function purchaseConfirm(productId, name, callback) {
	purchaseConfirmShow(productId, name, null, callback);
}
function purchaseConfirmShow(productId, name, group, callback) {
	var obj = {
		title : Language.get("confirm"),
		width : 340,
		height : 260,
		cancelEvent : null
	};
	if (LPlugin.native) {
		var productInformation = GameCacher.getData("productInformation");
		if (!productInformation) {
			purchaseProductInformation(function() {
				purchaseConfirmShow(productId, name, group, callback);
			});
			return;
		}
		var product = productInformation.find(function(child) {
			return child.productId == productId;
		});
		if(group){
			obj.messageHtml = String.format(Language.get("purchase_confirm_group_message"), product.priceLabel, getGroupChapterNames(group));
			obj.height += 160;
		}else{
			obj.messageHtml = String.format(Language.get("purchase_confirm_native_message"), name, product.priceLabel);
		}
		obj.okEvent = function(e) {
			e.currentTarget.parent.remove();
			purchaseStart(productId, callback);
		};
	} else {
		obj.messageHtml = String.format(Language.get("purchase_confirm_web_message"), name);
		obj.okEvent = function(e) {
			e.currentTarget.parent.remove();
			callback();
		};
	}
	var windowLayer = ConfirmWindow(obj);
	LMvc.layer.addChild(windowLayer);
}
