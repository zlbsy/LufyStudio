function LPlugin(){
}
LPlugin.playSE = playSE;
LPlugin.playBGM = playBGM;
LPlugin.readFile = readFile;
LPlugin.writeToFile = writeToFile;
LPlugin.print = myPrint;

function LPurchaseInit(){
    function LPurchase(){
        LExtends(this, LEventDispatcher, []);
    }
    LPurchase.Instance = function(){
        if(!LPurchase._Instance){
            LPurchase._Instance = new LPurchase();
        }
        return LPurchase._Instance;
    };
    LPurchase.PURCHASE_LOG_COMPLETE = 'purchaseLogComplete';
    LPurchase.PRODUCT_INFORMATION_COMPLETE = 'ProductInformationComplete';
    LPurchase.prototype.purchaseLog = purchaseLog;
    LPurchase.prototype.productInformation = productInformation;
    LPurchase._ll_dispatchEvent = function(data, type){
        var event = new LEvent(type);
        event.target = data;
        LPurchase.Instance().dispatchEvent(event);
    };
    window['LPurchase'] = LPurchase;
}