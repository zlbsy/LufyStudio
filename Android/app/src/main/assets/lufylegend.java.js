function LPurchaseInit() {
	LPurchaseCreate();
	//LMvc.IMG_PATH = "images/";
	LPluginExtensionInit();
	LURLLoaderExtensionInit();
	LLoaderExtensionInit();
}
function LPluginExtensionInit() {
	LPlugin.native = true;
	LPlugin.testVersion = (function() {
		var vers = LPlugin.bundleVersion().split(".");
		return parseInt(vers[vers.length - 1]) > 0;
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
    LPurchase.prototype.purchaseLog = function(){
        var script = LPlugin.purchaseLog();
	    eval( script );
    };
    LPurchase.prototype.purchaseRestore = function(){
        var script = LPlugin.purchaseRestore();
	    eval( script );
    };
    LPurchase.prototype.productInformation = function(productIds){
        var script = LPlugin.productInformation(productIds);
	    eval( script );
    };
    LPurchase.prototype.purchase = function(productId, name, num, paymentTime, email, qq){
        var script = LPlugin.purchase(productId, name, num, paymentTime, email, qq);
	    eval( script );
    };
    LPurchase.prototype.purchaseCheck = function(productId){
        var script = LPlugin.purchaseCheck(productId);
	    eval( script );
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
			//LPlugin.print("LPlugin.readFile="+(typeof LPlugin.readFile));
			//var data = LPlugin.readFile(u.substring(pathIndex, extensionIndex), extension);
			var data = LPlugin.readFile(u);
			data = LPlugin.changeToScript(data);
			setTimeout(function() {
				var event = new LEvent(LEvent.COMPLETE);
				s.data = data;
				event.currentTarget = s;
				event.target = data;
				s.dispatchEvent(event);
				delete s.data;
			}, 1);
		} else if (t == LURLLoader.TYPE_JS) {
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