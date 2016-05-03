function LPlugin() {
}

LPlugin.native = true;
LPlugin.playSE = playSE;
LPlugin.playBGM = playBGM;
LPlugin.readFile = readFile;
LPlugin.writeToFile = writeToFile;
LPlugin.print = myPrint;

function LPurchaseInit() {
	function LPurchase() {
		LExtends(this, LEventDispatcher, []);
	}
	LPurchase.Instance = function() {
		if (!LPurchase._Instance) {
			LPurchase._Instance = new LPurchase();
		}
		return LPurchase._Instance;
	};
	LPurchase.PURCHASE_LOG_COMPLETE = 'purchaseLogComplete';
	LPurchase.PRODUCT_INFORMATION_COMPLETE = 'productInformationComplete';
	LPurchase.PURCHASE_COMPLETE = 'purchaseComplete';
	LPurchase.prototype.purchaseLog = purchaseLog;
	LPurchase.prototype.productInformation = productInformation;
	LPurchase.prototype.purchase = purchase;
	LPurchase._ll_dispatchEvent = function(data, type) {
		var event = new LEvent(type);
		event.status = 1;
		event.target = data;
		LPurchase.Instance().dispatchEvent(event);
	};
	LPurchase._ll_dispatchEventError = function(data, type) {
		var event = new LEvent(type);
		event.status = 0;
		event.message = data;
		LPurchase.Instance().dispatchEvent(event);
	};
	window['LPurchase'] = LPurchase;
}

(function LPurchaseInitReady() {
	if (document.readyState === "complete") {
		LPurchaseInit();
		return;
	}
	setTimeout(LPurchaseInitReady, 10);
})();
