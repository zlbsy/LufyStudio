function purchaseLogGet(callback) {
	var purchase = LPurchase.Instance();
	purchase.addEventListener(LPurchase.PURCHASE_LOG_COMPLETE, function(event) {
		var data = event.target;
		var log = [];
		if(data && data.receipt && data.receipt.in_app){
			log = data.receipt.in_app;
		}
		LPlugin.SetData("purchaseLog", log);
		callback();
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
	if (!GameCacher.getData("productInformation")) {
		purchaseProductInformation(function() {
			purchaseCreateCharacter(callback);
		});
		return;
	}
	var purchase = LPurchase.Instance();
	purchase.addEventListener(LPurchase.PURCHASE_COMPLETE,function(event){
		if(event.status == 0){
			//error
		}
		var data = event.target;
		//success
		callback();
	});
	purchase.purchase(productIdConfig.createCharacter);
}

function purchaseHasBuy(productId) {
	var purchaseLog = LPlugin.GetData("purchaseLog");
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
		obj.messageHtml = String.format("<font size='21' color='#FFFFFF'>开通<font color='#FF0000'>{0}</font>功能需要花费<font color='#FF0000'>{1}</font>，要开通此功能吗?</font>", name, product.priceLabel);
		obj.okEvent = function(e) {
			e.currentTarget.parent.remove();
			purchaseStart(productId, callback);
		};
	} else {
		obj.messageHtml = String.format("<font size='21' color='#FFFFFF'>当前版本无法使用<font color='#FF0000'>{0}</font>功能，请下载<font color='#FF0000'>手机安装版本</font>!</font>", name);
		obj.okEvent = function(e) {
			e.currentTarget.parent.remove();
			callback();
		};
	}
	var windowLayer = ConfirmWindow(obj);
	LMvc.layer.addChild(windowLayer);
}
