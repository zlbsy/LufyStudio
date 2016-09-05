function LPurchaseInit() {
    LMvc.IMG_PATH = "game/images/";
    LPlugin.native = true;
    LPlugin.testVersion = (function(){
        var vers = LPlugin.bundleVersion().split(".");
        return parseInt(vers[vers.length - 1]) > 0;
    })();
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
    LLoader.prototype.loadStart = function(u){
    		var s = this;
    		s.content = new Image();
    		LPlugin.print("u="+u);
    		s.content.onload = function () {
    			s.content.onload = null;
    			var event = new LEvent(LEvent.COMPLETE);
    			event.currentTarget = s;
    			event.target = s.content;
    			if(s.useXHR){
    				s.revokeObjectURL(s.content.src);
    			}
    			s.dispatchEvent(event);
    			delete s.content;
    		};
    		if(!s.useXHR){
    			s.content.onerror = function(e){
    				var event = new LEvent(LEvent.ERROR);
    				event.currentTarget = s;
    				event.target = e.target;
    				event.responseURL = e.target.src;
    				s.dispatchEvent(event);
    			};
    		}
    		var base64 = LPlugin.encodeBase64(u);
    		LPlugin.print("base64="+base64);
    		var us = u.split(".");
    		s.content.src = "data:image/" + us[us.length - 1] + ";base64," +  base64;
    		//s.content.src = LPlugin.encodeBase64(u);
    		LPlugin.print("s.content.src="+s.content.src);
    	};
}