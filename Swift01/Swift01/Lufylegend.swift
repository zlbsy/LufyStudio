import UIKit
import AVFoundation
import StoreKit

typealias ID = AnyObject!
extension JSContext {
    func fetch(key:String)->JSValue {
        return getJSVinJSC(self, key)
    }
    func store(key:String, _ val:ID) {
        setJSVinJSC(self, key, val)
    }
    // Yikes.  Swift 1.2 and its JavaScriptCore no longer allows method overloding by type
    func setb0(key:String, _ blk:()->ID) {
        setB0JSVinJSC(self, key, blk)
    }
    func setb1(key:String, _ blk:(ID)->ID) {
        setB1JSVinJSC(self, key, blk)
    }
    func setb2(key:String, _ blk:(ID,ID)->ID) {
        setB2JSVinJSC(self, key, blk)
    }
    func setb3(key:String, _ blk:(ID,ID,ID)->ID) {
        setB3JSVinJSC(self, key, blk)
    }
}
class Lufylegend : XXXPurchaseManagerDelegate{
    var GAME_PATH = ""
    var PATH_SOUND = ""
    let TYPE_SE = "wav"
    let TYPE_BGM = "mp3"
    var currentProductId = ""
    let webView : UIWebView = UIWebView()
    var context : JSContext = JSContext()
    var audioBGMPlayer:AVAudioPlayer = AVAudioPlayer()
    var bgmPlaying = false
    func initialize(gamePath: String, viewController: UIViewController, delegate: UIWebViewDelegate){
        GAME_PATH = gamePath
        PATH_SOUND = GAME_PATH + "Sound/"
        
        webView.delegate = delegate
        webView.frame = viewController.view.bounds
        viewController.view.addSubview(webView)
        
        if let url = NSBundle.mainBundle().URLForResource(GAME_PATH + "index", withExtension: "html") {
            webView.loadRequest(NSURLRequest(URL: url))
        }
        if let ctx = webView.valueForKeyPath("documentView.webView.mainFrame.javaScriptContext") {
            let context = ctx as! JSContext
            self.contextInit(context)
        }
    }
    func playSE(name : String, volume : Int){
        if(volume == 0){
            return
        }
        var soundIdRing:SystemSoundID = 0
        let soundUrl = NSURL.fileURLWithPath(NSBundle.mainBundle().pathForResource(PATH_SOUND + name, ofType:TYPE_SE)!)
        AudioServicesCreateSystemSoundID(soundUrl, &soundIdRing)
        AudioServicesPlaySystemSound(soundIdRing)
    }
    func playBGM(name : String, volume : Int){
        if(volume == 0){
            if(bgmPlaying){
                bgmPlaying = false
                if(audioBGMPlayer.playing){
                    audioBGMPlayer.stop()
                }
            }
            return
        }
        let coinSound = NSURL(fileURLWithPath: NSBundle.mainBundle().pathForResource(PATH_SOUND + name, ofType: TYPE_BGM)!)
        do{
            audioBGMPlayer = try AVAudioPlayer(contentsOfURL:coinSound)
            audioBGMPlayer.volume = 1
            audioBGMPlayer.numberOfLoops = -1
            audioBGMPlayer.prepareToPlay()
            audioBGMPlayer.play()
            bgmPlaying = true
        }catch {
            print("Error :: getting the audio file : " + name)
        }
    }
    func writeToFileInDomain(name : String, data : String) -> Bool{
        let paths = NSSearchPathForDirectoriesInDomains(
            .DocumentDirectory,
            .UserDomainMask, true)
        let dir = paths.first!
        let file_name =  dir.stringByAppendingString("/" + name + ".txt")
        do {
            try data.writeToFile( file_name, atomically: false, encoding: NSUTF8StringEncoding )
            return true
        } catch {
            print("Error :: can't save to file : " + file_name)
        }
        return false
    }
    func deleteFileInDomain(name : String) -> Bool{
        let paths = NSSearchPathForDirectoriesInDomains(
            .DocumentDirectory,
            .UserDomainMask, true)
        let dir = paths.first!
        let file_name =  dir.stringByAppendingString("/" + name + ".txt")
        let manager = NSFileManager()
        if(manager.fileExistsAtPath(file_name)){
            do {
                try manager.removeItemAtPath(file_name)
                return true
            } catch {
                print("Error :: can't delete file : " + file_name)
            }
        }
        return false
    }
    func readFileInDomain(name : String) -> String{
        let paths = NSSearchPathForDirectoriesInDomains(
            .DocumentDirectory,
            .UserDomainMask, true)
        let dir = paths.first!
        let file_name =  dir.stringByAppendingString("/" + name + ".txt")
        var data = "";
        let manager = NSFileManager()
        if(!manager.fileExistsAtPath(file_name)){
            return data
        }
        do {
            data = (try NSString( contentsOfFile: file_name, encoding: NSUTF8StringEncoding )) as String
        } catch {
            print("Error :: getting the file : " + file_name)
        }
        return data
    }
    func readFile(name : String, extensionType : String) -> String{
        let path = NSBundle.mainBundle().pathForResource(GAME_PATH + name, ofType: extensionType)!
        
        let manager = NSFileManager()
        if(!manager.fileExistsAtPath(path)){
            return ""
        }
        if let data = NSData(contentsOfFile: path){
            var data = String(NSString(data: data, encoding: NSUTF8StringEncoding)!)
            data = data.stringByReplacingOccurrencesOfString("\n", withString: "", options: NSStringCompareOptions.LiteralSearch, range: nil)
            return data;
        }
        print("Error :: getting the file : " + path)
        return ""
    }
    func bundleVersion() -> String{
        let nsObject: AnyObject? = NSBundle.mainBundle().infoDictionary!["CFBundleShortVersionString"]
        let version = nsObject as! String
        let versions = version.componentsSeparatedByString(".")
        if(versions.count >= 3){
            return version
        }
        return version + ".0"
    }
    func preferredLanguage() -> String{
        let languages = NSLocale.preferredLanguages()
        let language = languages.first!
        return language
    }
    func contextInit(c : JSContext){
        context = c
        context.setb2("playSE", {(seName:AnyObject!, volume:AnyObject!)->AnyObject in
            self.playSE(seName as! String, volume: volume as! Int)
            return ""
        })
        context.setb2("playBGM", {(seName:AnyObject!, volume:AnyObject!)->AnyObject in
            self.playBGM(seName as! String, volume: volume as! Int)
            return ""
        })
        context.setb2("readFile", {(name:AnyObject!, extensionType:AnyObject!)->AnyObject in
            return self.readFile(name as! String, extensionType: extensionType as! String)
        })
        context.setb1("deleteFileInDomain", {(name:AnyObject!)->AnyObject in
            return self.deleteFileInDomain(name as! String)
        })
        context.setb1("readFileInDomain", {(name:AnyObject!)->AnyObject in
            return self.readFileInDomain(name as! String)
        })
        context.setb2("writeToFileInDomain", {(name:AnyObject!, data:AnyObject!)->AnyObject in
            return self.writeToFileInDomain(name as! String, data: data as! String)
        })
        context.setb1("purchaseLog", {(complete:AnyObject!)->AnyObject in
            self.purchaseLog()
            return ""
        })
        context.setb1("productInformation", {(productIds:AnyObject!)->AnyObject in
            self.fetchProductInformationForIds(productIds as! [String])
            return ""
        })
        context.setb1("purchase", {(productId:AnyObject!)->AnyObject in
            self.purchase(productId as! String)
            return ""
        })
        context.setb1("myPrint", {(data:AnyObject!)->AnyObject in
            print(data as! String)
            return ""
        })
        context.setb1("openURL", {(data:AnyObject!)->AnyObject in
            let url = NSURL(string: data as! String)
            if UIApplication.sharedApplication().canOpenURL(url!){
                UIApplication.sharedApplication().openURL(url!)
            }
            return ""
        })
        context.setb0("purchaseRestore", {()->AnyObject in
            self.startRestore()
            return ""
        })
        context.setb0("preferredLanguage", {()->AnyObject in
            return self.preferredLanguage()
        })
        context.setb0("bundleVersion", {()->AnyObject in
            return self.bundleVersion()
        })
        context.setb0("getSystemVersion", {()->AnyObject in
            return UIDevice.currentDevice().systemVersion
        })
        /*let notificationCenter = NSNotificationCenter.defaultCenter()
        notificationCenter.addObserver(
            self,
            selector: Selector("stopBGM:"),
            name:UIApplicationWillTerminateNotification,
            object: nil)
        */
        
        let path = NSBundle.mainBundle().pathForResource("lufylegend.swift", ofType: "js")!
        if let data = NSData(contentsOfFile: path){
            var strScript = String(NSString(data: data, encoding: NSUTF8StringEncoding)!)
            strScript = strScript.stringByReplacingOccurrencesOfString("\n", withString: "", options: NSStringCompareOptions.LiteralSearch, range: nil)
            context.evaluateScript(strScript)
        }
        
    }
    func stopBGM(notification: NSNotification?){
        audioBGMPlayer.stop()
    }
    func purchaseLog(){
        if let receiptUrl: NSURL = NSBundle.mainBundle().appStoreReceiptURL {
            if let receiptData: NSData = NSData(contentsOfURL: receiptUrl) {
                let receiptBase64Str: String = receiptData.base64EncodedStringWithOptions(NSDataBase64EncodingOptions())
                
                let requestContents: NSDictionary = ["receipt-data": receiptBase64Str] as NSDictionary
                let url:NSURL = NSURL(string:"https://buy.itunes.apple.com/verifyReceipt")!
                //let url: NSURL = NSURL(string: "https://sandbox.itunes.apple.com/verifyReceipt")!
                let request: NSMutableURLRequest = NSMutableURLRequest(URL: url)
                
                request.setValue("application/x-www-form-urlencoded", forHTTPHeaderField:"content-type")
                request.timeoutInterval = 5.0
                request.HTTPMethod = "POST"
                do {
                    request.HTTPBody = try NSJSONSerialization.dataWithJSONObject(requestContents, options: NSJSONWritingOptions.init(rawValue: 2))
                } catch {
                    // Error Handling
                    print("NSJSONSerialization Error")
                    let _ll_dispatchEvent = "LPurchase._ll_dispatchEventError('Json Error', LPurchase.PURCHASE_LOG_COMPLETE);"
                    self.context.evaluateScript(_ll_dispatchEvent)
                    return
                }
                let configuration = NSURLSessionConfiguration.defaultSessionConfiguration()
                let session = NSURLSession(configuration: configuration, delegate:nil, delegateQueue:NSOperationQueue.mainQueue())
                let task = session.dataTaskWithRequest(request, completionHandler: {
                    (data, response, error) -> Void in
                    let myData:NSString = NSString(data: data!, encoding: NSUTF8StringEncoding)!
                    let _ll_dispatchEvent = "LPurchase._ll_dispatchEvent("+(myData as String)+", LPurchase.PURCHASE_LOG_COMPLETE);"
                    self.context.evaluateScript(_ll_dispatchEvent)
                })
                task.resume()
            }else{
                let _ll_dispatchEvent = "LPurchase._ll_dispatchEventError('Login Error', LPurchase.PURCHASE_LOG_COMPLETE);"
                self.context.evaluateScript(_ll_dispatchEvent)
                
            }
        }
    }
    
    ///プロダクト情報取得
    private func fetchProductInformationForIds(productIds:[String]) {
        XXXProductManager.productsWithProductIdentifiers(productIds,
                                                         completion: {[weak self] (products : [SKProduct]!, error : NSError?) -> Void in
                                                            if error != nil {
                                                                print(error?.localizedDescription)
                                                                let _ll_dispatchEvent = "LPurchase._ll_dispatchEventError('"+(error?.localizedDescription)!+"', LPurchase.PRODUCT_INFORMATION_COMPLETE);"
                                                                self!.context.evaluateScript(_ll_dispatchEvent)
                                                                return
                                                            }
                                                            var str : String = "["
                                                            var add = ""
                                                            for product in products {
                                                                //価格を抽出
                                                                let priceLabel = XXXProductManager.priceStringFromProduct(product)
                                                                
                                                                str += add
                                                                str += "{"
                                                                str += ("'title':'" + product.localizedTitle + "',")
                                                                str += ("'priceLabel':'" + priceLabel + "',")
                                                                str += ("'price':'" + product.price.stringValue + "',")
                                                                str += ("'productId':'" + product.productIdentifier + "'")
                                                                str += "}"
                                                                add = ","
                                                                /*
                                                                 TODO: UI更新*/
                                                                
                                                            }
                                                            str += "]"
                                                            print(str)
                                                            let _ll_dispatchEvent = "LPurchase._ll_dispatchEvent("+str+", LPurchase.PRODUCT_INFORMATION_COMPLETE);"
                                                            self!.context.evaluateScript(_ll_dispatchEvent)
            })
        
        
    }
    ///課金開始
    private func purchase(productId:String) {
        self.currentProductId = productId
        //デリゲード設定
        XXXPurchaseManager.sharedManager().delegate = self
        
        //プロダクト情報を取得
        XXXProductManager.productsWithProductIdentifiers([productId],
                                                         completion: {[weak self]  (products : [SKProduct]!, error : NSError?) -> Void in
                                                            if error != nil {
                                                                if let weakSelf = self {
                                                                    weakSelf.purchaseManager(XXXPurchaseManager.sharedManager(), didFailWithError: error)
                                                                }
                                                                print(error?.localizedDescription)
                                                                let _ll_dispatchEvent = "LPurchase._ll_dispatchEventError('"+(error?.localizedDescription)!+"', LPurchase.PURCHASE_COMPLETE);"
                                                                self!.context.evaluateScript(_ll_dispatchEvent)
                                                                return
                                                            }
                                                            
                                                            if products.count > 0 {
                                                                //課金処理開始
                                                                XXXPurchaseManager.sharedManager().startWithProduct(products[0])
                                                            }
            })
    }
    /// リストア開始
    func startRestore() {
        print("startRestore")
        //デリゲード設定
        XXXPurchaseManager.sharedManager().delegate = self
        
        //リストア開始
        XXXPurchaseManager.sharedManager().startRestore()
    }
    
    
    // MARK: - XXXPurchaseManager Delegate
    @objc func purchaseManager(purchaseManager: XXXPurchaseManager!, didFinishPurchaseWithTransaction transaction: SKPaymentTransaction!, decisionHandler: ((complete: Bool) -> Void)!) {
        //課金終了時に呼び出される
        /*productIdentifier
         TODO: コンテンツ解放処理
         */
        print("purchase finish! " + transaction.payment.productIdentifier)
        //コンテンツ解放が終了したら、この処理を実行(true: 課金処理全部完了, false 課金処理中断)
        decisionHandler(complete: true)
        let _ll_dispatchEvent = "LPurchase._ll_dispatchEvent({'status':1,'productId':'"+transaction.payment.productIdentifier+"'}, LPurchase.PURCHASE_COMPLETE);"
        self.context.evaluateScript(_ll_dispatchEvent)
    }
    
    @objc func purchaseManager(purchaseManager: XXXPurchaseManager!, didFinishUntreatedPurchaseWithTransaction transaction: SKPaymentTransaction!, decisionHandler: ((complete: Bool) -> Void)!) {
        //課金終了時に呼び出される(startPurchaseで指定したプロダクトID以外のものが課金された時。)
        /*
         TODO: コンテンツ解放処理
         */
        print("purchase finish!(Untreated.)")
        //コンテンツ解放が終了したら、この処理を実行(true: 課金処理全部完了, false 課金処理中断)
        decisionHandler(complete: true)
        let _ll_dispatchEvent = "LPurchase._ll_dispatchEvent({'status':1,'productId':'"+transaction.payment.productIdentifier+"'}, LPurchase.PURCHASE_COMPLETE);"
        self.context.evaluateScript(_ll_dispatchEvent)
    }
    
    @objc func purchaseManager(purchaseManager: XXXPurchaseManager!, didFailWithError error: NSError!) {
        //課金失敗時に呼び出される
        /*
         TODO: errorを使ってアラート表示
         */
        print("purchase fail...")
        let _ll_dispatchEvent = "LPurchase._ll_dispatchEventError('purchase fail!', LPurchase.PURCHASE_COMPLETE);"
        self.context.evaluateScript(_ll_dispatchEvent)
    }
    
    @objc func purchaseManagerDidFinishRestore(purchaseManager: XXXPurchaseManager!) {
        //リストア終了時に呼び出される(個々のトランザクションは”課金終了”で処理)
        /*
         TODO: インジケータなどを表示していたら非表示に         
         */
        print("restore finish!")
        let _ll_dispatchEvent = "LPurchase._ll_dispatchEventError('purchase success!', LPurchase.PURCHASE_RESTORE_COMPLETE);"
        self.context.evaluateScript(_ll_dispatchEvent)
    }
    
    @objc func purchaseManagerDidDeferred(purchaseManager: XXXPurchaseManager!) {
        //承認待ち状態時に呼び出される(ファミリー共有)
        /*
         TODO: インジケータなどを表示していたら非表示に
         */
        print("purcase defferd.")
    }
    
}