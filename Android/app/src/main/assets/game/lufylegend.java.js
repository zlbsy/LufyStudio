LPlugin.native = true;
LPlugin.testVersion = (function(){
    var vers = LPlugin.bundleVersion().split(".");
    return parseInt(vers[vers.length - 1]) > 0;
})();
function LPurchaseInit() {
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