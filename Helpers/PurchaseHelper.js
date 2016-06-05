function purchaseLogGet(callback) {
	var purchase = LPurchase.Instance();
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


function purchaseProductInformation(callback) {
	var purchase = LPurchase.Instance();
	purchase.addEventListener(LPurchase.PRODUCT_INFORMATION_COMPLETE, function(event) {
		var data = event.target;
		GameCacher.setData("productInformation", data);
		callback();
	});
	purchase.productInformation(productIdConfig.productIds);
}

function purchaseStart(productId, callback) {
	var purchase = LPurchase.Instance();
	purchase.addEventListener(LPurchase.PURCHASE_COMPLETE,function(event){
		if(event.status == 0){
			//error
		}
		//success
		var data = event.target;
		callback(data.productId);
		//purchase log update
		purchaseLogGet();
	});
	purchase.purchase(productId);
}

function purchaseHasBuy(productId) {
	var purchaseLog = LPlugin.GetData("purchaseLog", []);
	var child = purchaseLog.find(function(c){
		return c.product_id == productId;
	});
	return child != null;
}


function purchaseConfirm(productId, name, callback) {
	var obj = {
		title : Language.get("confirm"),
		width : 340,
		height : 240,
		cancelEvent : null
	};
	if (LPlugin.native) {
		var productInformation = GameCacher.getData("productInformation");
		if (!productInformation) {
			purchaseProductInformation(function() {
				purchaseConfirm(productId, name, callback);
			});
			return;
		}
		var product = productInformation.find(function(child) {
			return child.productId == productId;
		});
		obj.messageHtml = String.format(Language.get("purchase_confirm_native_message"), name, product.priceLabel);
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
