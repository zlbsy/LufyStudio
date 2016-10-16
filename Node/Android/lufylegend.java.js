function LPurchaseInit() {
	LPurchaseCreate();
	LPluginExtensionInit();
	LURLLoaderExtensionInit();
	LLoaderExtensionInit();
}
function LPluginExtensionInit() {
	LPlugin.native = true;
	LPlugin.testVersion = (function() {
		var vers = LPlugin.bundleVersion().split(".");
		return parseInt(vers[vers.length - 1]) == 9;
	})();
}
function LPurchaseCreate() {
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
	LPurchase.PURCHASE_CHECK_COMPLETE = 'purchaseCheckComplete';
    LPurchase.prototype.purchaseRestore = function(){
    	LPlugin.purchaseRestore();
    };
    LPurchase.prototype.productInformation = function(productIds){
    	LPlugin.productInformation(productIds);
    };
    LPurchase.prototype.purchase = function(productId, itemId, paymentTime, subject, body, totalFee){
    	LPlugin.purchase(productId, itemId, paymentTime, subject, body, totalFee);
    };
    LPurchase.prototype.purchaseCheck = function(productId){
    	LPlugin.purchaseCheck(productId);
    };
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
}
function LURLLoaderExtensionInit() {
	LURLLoader.prototype.ll_load_base = LURLLoader.prototype.load;
	LURLLoader.prototype.load = function(u, t) {
		var s = this;
		if (u.indexOf("./") == 0) {
			u = u.substring(2);
		}
		if (t == LURLLoader.TYPE_TEXT || (!t && getExtension(u) == "txt")) {
			s.loadtype = LURLLoader.TYPE_TEXT;
			var data = LPlugin.readFile(u);
			//暂时取消加密
			//data = LPlugin.changeToScript(data);
			setTimeout(function() {
				var event = new LEvent(LEvent.COMPLETE);
				s.data = data;
				event.currentTarget = s;
				event.target = data;
				s.dispatchEvent(event);
				delete s.data;
			}, 1);
		} else if (t == LURLLoader.TYPE_JS) {
			if(u.indexOf("LPluginExtension.js") < 0 && 
			u.indexOf("PurchaseHelper.js") < 0 && 
			u.indexOf("LogoController.js") < 0 && 
			u.indexOf("LogoView.js") < 0){
				s.ll_load_base(u, t);
				return;
			}
			var data = LPlugin.readFile(u);
			data = LPlugin.changeToScript(data);
			var script = document.createElement("script");
			script.innerHTML = data;
			document.querySelector('head').appendChild(script);
			setTimeout(function() {
				var event = new LEvent(LEvent.COMPLETE);
				event.currentTarget = s;
				event.target = s;
				s.dispatchEvent(event);
			}, 100);
		} else {
			s.ll_load_base(u, t);
		}
	};
}
function LLoaderExtensionInit() {
	LLoader.prototype.loadStart = function(u) {
		var s = this;
		s.content = new Image();
		s.content.onload = function() {
			s.content.onload = null;
			var event = new LEvent(LEvent.COMPLETE);
			event.currentTarget = s;
			event.target = s.content;
			if (s.useXHR) {
				s.revokeObjectURL(s.content.src);
			}
			s.dispatchEvent(event);
			delete s.content;
		};
		if (!s.useXHR) {
			s.content.onerror = function(e) {
				var event = new LEvent(LEvent.ERROR);
				event.currentTarget = s;
				event.target = e.target;
				event.responseURL = e.target.src;
				s.dispatchEvent(event);
			};
		}
		//var base64 = LPlugin.encodeBase64(u);
		var base64 = LPlugin.readFile(u);
		var us = u.split(".");
		s.content.src = "data:image/" + us[us.length - 1] + ";base64," + base64;
	};
}