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
	purchase.purchaseRestore();
}

function purchaseProductInformation(callback) {
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
		LPlugin.print("data.productId="+data.productId);
		purchaseLog.push({"product_id":data.productId});
		LPlugin.SetData("purchaseLog", purchaseLog);
		if(callback){
			callback(data.productId);
		}
	}
}

function purchaseStart(productId, callback) {
	var purchase = LPurchase.Instance();
	purchase.removeAllEventListener();
	purchase.addEventListener(LPurchase.PURCHASE_COMPLETE,function(event){
		purchaseComplete(event, callback);
	});
	purchase.purchase(productId);
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
function purchaseConfirmShow(productId, name, group, callback) {console.log("purchaseConfirmShow");
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
