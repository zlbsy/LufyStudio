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
		var obj = {
			title : Language.get("confirm"),
			width : 340,
			height : 260,
			message : Language.get("purchase_buy_fail")
		};
		obj.okEvent = function(e){
			e.currentTarget.parent.remove();
			if(callback){
				callback(null);
			}
		};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
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
		purchaseStartAndroidCheck(productId, callback);
		return;
	}
	var purchase = LPurchase.Instance();
	purchase.removeAllEventListener();
	purchase.addEventListener(LPurchase.PURCHASE_COMPLETE,function(event){
		purchaseComplete(event, callback);
	});
	purchase.purchase(productId);
}
function purchaseStartAndroidCheck(productId, callback) {
	var purchase = LPurchase.Instance();
	purchase.removeAllEventListener();
	purchase.addEventListener(LPurchase.PURCHASE_CHECK_COMPLETE,function(event){
		var data = event.target;
		if(data.num_rows == 0){
			purchaseStartAndroid(productId, callback);
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
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
		}
	});
	purchase.purchaseCheck(productId);
}
function purchaseStartAndroid(productId, callback) {
	var purchase = LPurchase.Instance();
	purchase.removeAllEventListener();
	purchase.addEventListener(LPurchase.PURCHASE_COMPLETE,function(event){
		purchaseComplete(event, callback);
	});
	var paymentTime = formatDate(new Date(), "MMDDhhmmss");
	var productInformation = GameCacher.getData("productInformation");
	var product = productInformation.find(function(child) {
		return child.productId == productId;
	});
	var gameName = "三国记";
	var subject = gameName;
	var body = gameName + "-" + product.title;
	var totalFee = product.price;
	var itemId = product.itemId;
	purchase.purchase(productId, itemId, paymentTime, subject, body, totalFee);
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
		if(LGlobal.android){
			obj.messageHtml += "\n" + Language.get("purchase_only_alipay");
			obj.height += 40;
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
	if(LPlugin.language() == "japanese"){
		var fundSettlementLaw = getButton(Language.get("資金決済法に基づく表示"), obj.width);
		fundSettlementLaw.x = (LMvc.screenWidth - obj.width) * 0.5;
		fundSettlementLaw.y =  (LMvc.screenHeight + obj.height) * 0.5 + 5;
		windowLayer.addChild(fundSettlementLaw);
		fundSettlementLaw.addEventListener(LMouseEvent.MOUSE_UP, function(event){
			purchaseConfirmLawShow(LMvc.fundSettlementLawURL);
		});
		var specifiedCommercialTransactionLaw = getButton(Language.get("特定商取引法に基づく表記"), obj.width);
		specifiedCommercialTransactionLaw.x = (LMvc.screenWidth - obj.width) * 0.5;
		specifiedCommercialTransactionLaw.y =  fundSettlementLaw.y + fundSettlementLaw.getHeight() + 5;
		windowLayer.addChild(specifiedCommercialTransactionLaw);
		specifiedCommercialTransactionLaw.addEventListener(LMouseEvent.MOUSE_UP, function(event){
			purchaseConfirmLawShow(LMvc.specifiedCommercialTransactionLawURL);
		});
	}
	LMvc.layer.addChild(windowLayer);
}

function purchaseConfirmLawShow(url){
	var lawWindow = new LSprite();
	var newsBackMask = getTranslucentMask();
	lawWindow.addChild(newsBackMask);
	var w = 400, h = LMvc.screenHeight - 100, x, y;
	x = (LMvc.screenWidth - w) * 0.5;
	y = (LMvc.screenHeight - h) * 0.5;
	var newsBackground = getPanel("win02", w + 20, h + 20);
	newsBackground.x = x - 10;
	newsBackground.y = y - 10;
	lawWindow.addChild(newsBackground);
	
	var webview = new LStageWebView();
	webview.setViewPort(new LRectangle(x, y, w, h));
	webview.loadURL(url);
	webview.show();
	var closeButton = new LButton(new LBitmap(new LBitmapData(LMvc.datalist["close"])));
	closeButton.x = x + w - 10;// - closeButton.getWidth() + 10;
	closeButton.y = y - closeButton.getHeight();
	self.addChild(closeButton);
	closeButton.addEventListener(LMouseEvent.MOUSE_UP,function(event){
		event.currentTarget.remove();
		newsBackMask.remove();
		newsBackground.remove();
		webview.hide();
	});
};