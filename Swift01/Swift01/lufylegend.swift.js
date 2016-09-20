function LPlugin() {
}

LPlugin.native = true;
LPlugin.playSE = playSE;
LPlugin.playBGM = playBGM;
LPlugin.readFile = readFile;
LPlugin.deleteFileInDomain = deleteFileInDomain;
LPlugin.readFileInDomain = readFileInDomain;
LPlugin.writeToFileInDomain = writeToFileInDomain;
LPlugin.preferredLanguage = preferredLanguage;
LPlugin.getSystemVersion = getSystemVersion;
LPlugin.bundleVersion = bundleVersion;
LPlugin.print = myPrint;
LPlugin.openURL = openURL;

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
    LPurchase.PURCHASE_RESTORE_COMPLETE = 'purchaseRestoreComplete';
	LPurchase.PRODUCT_INFORMATION_COMPLETE = 'productInformationComplete';
	LPurchase.PURCHASE_COMPLETE = 'purchaseComplete';
    LPurchase.prototype.purchaseLog = purchaseLog;
    LPurchase.prototype.purchaseRestore = purchaseRestore;
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
    window["LPurchase"] = LPurchase;
	LURLLoader.prototype.ll_load_base = LURLLoader.prototype.load;
	LURLLoader.prototype.load = function(u, t){
		var s = this;
		if (t == LURLLoader.TYPE_TEXT || (!t && getExtension(u) == "txt")) {
			s.loadtype = LURLLoader.TYPE_TEXT;
			var extension = getExtension(u);
			var extensionIndex = u.indexOf("." + extension);
			var pathIndex = u.indexOf("./");
			if(pathIndex == 0){
				pathIndex = 2;
			}
			var data = LPlugin.readFile(u.substring(pathIndex, extensionIndex), extension);
			var event = new LEvent(LEvent.COMPLETE);
			s.data = data;
			event.currentTarget = s;
			event.target = data;
			s.dispatchEvent(event);
			delete s.content;
			delete s.data;
		}else{
			s.ll_load_base(u, t);
		}
	};
}
