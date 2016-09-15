function LPurchaseInit() {
    LMvc.IMG_PATH = "images/";
    LPlugin.native = true;
    LPlugin.testVersion = (function(){
        var vers = LPlugin.bundleVersion().split(".");
        return parseInt(vers[vers.length - 1]) > 0;
    })();
    LURLLoader.prototype.ll_load_base = LURLLoader.prototype.load;
    LURLLoader.prototype.load = function(u, t){
        var s = this;
        if(u.indexOf("./") == 0){
            u = u.substring(2);
        }
        LPlugin.print("LURLLoader.prototype.load u="+u+", t="+t +", " + s._loadIndex);
        if (t == LURLLoader.TYPE_TEXT || (!t && getExtension(u) == "txt")) {
            s.loadtype = LURLLoader.TYPE_TEXT;
            //LPlugin.print("LPlugin.readFile="+(typeof LPlugin.readFile));
            //var data = LPlugin.readFile(u.substring(pathIndex, extensionIndex), extension);
            var data = LPlugin.readFile(u);
            data = LPlugin.changeToScript(data);
            setTimeout(function(){
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
            document.querySelector('head').appendChild(script);
            //LPlugin.print("data="+data);
            script.innerHTML = data;
            setTimeout(function(){
                var event = new LEvent(LEvent.COMPLETE);
                event.currentTarget = s;
                event.target = s;
                s.dispatchEvent(event);
            }, 1);
        } else {
            s.ll_load_base(u, t);
        }
    };
    LLoader.prototype.loadStart = function(u){
    		var s = this;LPlugin.print("loadStart="+u);
    		s.content = new Image();
    		s.content.onload = function () {
    		    LPlugin.print("s.content.onload="+u);
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
    		var us = u.split(".");
    		s.content.src = "data:image/" + us[us.length - 1] + ";base64," +  base64;
    	};
}