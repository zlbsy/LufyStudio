import UIKit
import AVFoundation
import StoreKit

typealias ID = Any!
extension JSContext {
    func fetch(_ key:String)->JSValue {
        return getJSVinJSC(self, key)
    }
    func store(_ key:String, _ val:ID) {
        setJSVinJSC(self, key, val)
    }
    // Yikes.  Swift 1.2 and its JavaScriptCore no longer allows method overloding by type
    func setb0(_ key:String, _ blk:@escaping ()->ID) {
        setB0JSVinJSC(self, key, blk)
    }
    func setb1(_ key:String, _ blk:@escaping (ID)->ID) {
        setB1JSVinJSC(self, key, blk)
    }
    func setb2(_ key:String, _ blk:@escaping (ID,ID)->ID) {
        setB2JSVinJSC(self, key, blk)
    }
    func setb3(_ key:String, _ blk:@escaping (ID,ID,ID)->ID) {
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
    func initialize(_ gamePath: String, viewController: UIViewController, delegate: UIWebViewDelegate){
        GAME_PATH = gamePath
        PATH_SOUND = GAME_PATH + "Sound/"
        
        webView.delegate = delegate
        webView.frame = viewController.view.bounds
        viewController.view.addSubview(webView)
        
        if let url = Bundle.main.url(forResource: GAME_PATH + "index", withExtension: "html") {
            webView.loadRequest(URLRequest(url: url))
        }
        if let ctx = webView.value(forKeyPath: "documentView.webView.mainFrame.javaScriptContext") {
            let context = ctx as! JSContext
            self.contextInit(context)
        }
    }
    func playSE(_ name : String, volume : Int){
        if(volume == 0){
            return
        }
        var soundIdRing:SystemSoundID = 0
        let soundUrl = URL(fileURLWithPath: Bundle.main.path(forResource: PATH_SOUND + name, ofType:TYPE_SE)!)
        AudioServicesCreateSystemSoundID(soundUrl as CFURL, &soundIdRing)
        AudioServicesPlaySystemSound(soundIdRing)
    }
    func playBGM(_ name : String, volume : Int){
        if(volume == 0){
            if(bgmPlaying){
                bgmPlaying = false
                if(audioBGMPlayer.isPlaying){
                    audioBGMPlayer.stop()
                }
            }
            return
        }
        let coinSound = URL(fileURLWithPath: Bundle.main.path(forResource: PATH_SOUND + name, ofType: TYPE_BGM)!)
        do{
            audioBGMPlayer = try AVAudioPlayer(contentsOf:coinSound)
            audioBGMPlayer.volume = 1
            audioBGMPlayer.numberOfLoops = -1
            audioBGMPlayer.prepareToPlay()
            audioBGMPlayer.play()
            bgmPlaying = true
        }catch {
            print("Error :: getting the audio file : " + name)
        }
    }
    func writeToFileInDomain(_ name : String, data : String) -> Bool{
        let paths = NSSearchPathForDirectoriesInDomains(
            .documentDirectory,
            .userDomainMask, true)
        let dir = paths.first!
        let file_name =  dir + ("/" + name + ".txt")
        do {
            try data.write( toFile: file_name, atomically: false, encoding: String.Encoding.utf8 )
            return true
        } catch {
            print("Error :: can't save to file : " + file_name)
        }
        return false
    }
    func deleteFileInDomain(_ name : String) -> Bool{
        let paths = NSSearchPathForDirectoriesInDomains(
            .documentDirectory,
            .userDomainMask, true)
        let dir = paths.first!
        let file_name =  dir + ("/" + name + ".txt")
        let manager = FileManager()
        if(manager.fileExists(atPath: file_name)){
            do {
                try manager.removeItem(atPath: file_name)
                return true
            } catch {
                print("Error :: can't delete file : " + file_name)
            }
        }
        return false
    }
    func readFileInDomain(_ name : String) -> String{
        let paths = NSSearchPathForDirectoriesInDomains(
            .documentDirectory,
            .userDomainMask, true)
        let dir = paths.first!
        let file_name =  dir + ("/" + name + ".txt")
        var data = "";
        let manager = FileManager()
        if(!manager.fileExists(atPath: file_name)){
            return data
        }
        do {
            data = (try NSString( contentsOfFile: file_name, encoding: String.Encoding.utf8.rawValue )) as String
        } catch {
            print("Error :: getting the file : " + file_name)
        }
        return data
    }
    func readFile(_ name : String, extensionType : String) -> String{
        let path = Bundle.main.path(forResource: GAME_PATH + name, ofType: extensionType)!
        
        let manager = FileManager()
        if(!manager.fileExists(atPath: path)){
            return ""
        }
        if let data = try? Data(contentsOf: URL(fileURLWithPath: path)){
            var data = String(NSString(data: data, encoding: String.Encoding.utf8.rawValue)!)
            data = data.replacingOccurrences(of: "\n", with: "", options: NSString.CompareOptions.literal, range: nil)
            return data;
        }
        print("Error :: getting the file : " + path)
        return ""
    }
    func bundleVersion() -> String{
        let nsObject: AnyObject? = Bundle.main.infoDictionary!["CFBundleShortVersionString"] as AnyObject?
        let version = nsObject as! String
        let versions = version.components(separatedBy: ".")
        if(versions.count >= 3){
            return version
        }
        return version + ".0"
    }
    func preferredLanguage() -> String{
        let languages = Locale.preferredLanguages
        let language = languages.first!
        return language
    }
    func contextInit(_ c : JSContext){
        context = c
        context.setb2("playSE", {(seName:Any!, volume:Any!)->Any in
            self.playSE(seName as! String, volume: volume as! Int)
            return "" as Any
        })
        context.setb2("playBGM", {(seName:Any!, volume:Any!)->Any in
            self.playBGM(seName as! String, volume: volume as! Int)
            return "" as Any
        })
        context.setb2("readFile", {(name:Any!, extensionType:Any!)->Any in
            return self.readFile(name as! String, extensionType: extensionType as! String)
        })
        context.setb1("deleteFileInDomain", {(name:Any!)->Any in
            return self.deleteFileInDomain(name as! String)
        })
        context.setb1("readFileInDomain", {(name:Any!)->Any in
            return self.readFileInDomain(name as! String)
        })
        context.setb2("writeToFileInDomain", {(name:Any!, data:Any!)->Any in
            return self.writeToFileInDomain(name as! String, data: data as! String)
        })
        context.setb1("purchaseLog", {(complete:Any!)->Any in
            self.purchaseLog()
            return "" as Any
        })
        context.setb1("productInformation", {(productIds:Any!)->Any in
            self.fetchProductInformationForIds(productIds as! [String])
            return "" as Any
        })
        context.setb1("purchase", {(productId:Any!)->Any in
            self.purchase(productId as! String)
            return "" as Any
        })
        context.setb1("myPrint", {(data:Any!)->Any in
            print(data as! String)
            return "" as Any
        })
        context.setb1("openURL", {(data:Any!)->Any in
            let url = URL(string: data as! String)
            if UIApplication.shared.canOpenURL(url!){
                UIApplication.shared.openURL(url!)
            }
            return "" as Any
        })
        context.setb0("purchaseRestore", {()->Any in
            self.startRestore()
            return "" as Any
        })
        context.setb0("preferredLanguage", {()->Any in
            return self.preferredLanguage()
        })
        context.setb0("bundleVersion", {()->Any in
            return self.bundleVersion()
        })
        context.setb0("getSystemVersion", {()->Any in
            return UIDevice.current.systemVersion
        })
        /*let notificationCenter = NSNotificationCenter.defaultCenter()
        notificationCenter.addObserver(
            self,
            selector: Selector("stopBGM:"),
            name:UIApplicationWillTerminateNotification,
            object: nil)
        */
        
        let path = Bundle.main.path(forResource: "lufylegend.swift", ofType: "js")!
        if let data = try? Data(contentsOf: URL(fileURLWithPath: path)){
            var strScript = String(NSString(data: data, encoding: String.Encoding.utf8.rawValue)!)
            strScript = strScript.replacingOccurrences(of: "\n", with: "", options: NSString.CompareOptions.literal, range: nil)
            context.evaluateScript(strScript)
        }
        
    }
    func stopBGM(_ notification: Notification?){
        audioBGMPlayer.stop()
    }
    func purchaseLog(){
        if let receiptUrl: URL = Bundle.main.appStoreReceiptURL {
            if let receiptData: Data = try? Data(contentsOf: receiptUrl) {
                let receiptBase64Str: String = receiptData.base64EncodedString(options: NSData.Base64EncodingOptions())
                
                let requestContents: NSDictionary = ["receipt-data": receiptBase64Str] as NSDictionary
                let url:URL = URL(string:"https://buy.itunes.apple.com/verifyReceipt")!
                //let url: NSURL = NSURL(string: "https://sandbox.itunes.apple.com/verifyReceipt")!
                let request: NSMutableURLRequest = NSMutableURLRequest(url: url)
                
                request.setValue("application/x-www-form-urlencoded", forHTTPHeaderField:"content-type")
                request.timeoutInterval = 5.0
                request.httpMethod = "POST"
                do {
                    request.httpBody = try JSONSerialization.data(withJSONObject: requestContents, options: JSONSerialization.WritingOptions.init(rawValue: 2))
                } catch {
                    // Error Handling
                    print("NSJSONSerialization Error")
                    let _ll_dispatchEvent = "LPurchase._ll_dispatchEventError('Json Error', LPurchase.PURCHASE_LOG_COMPLETE);"
                    self.context.evaluateScript(_ll_dispatchEvent)
                    return
                }
                let configuration = URLSessionConfiguration.default
                let session = URLSession(configuration: configuration, delegate:nil, delegateQueue:OperationQueue.main)
                let task = session.dataTask(with: request as URLRequest, completionHandler: {
                    (data, response, error) -> Void in
                    let myData:NSString = NSString(data: data!, encoding: String.Encoding.utf8.rawValue)!
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
    fileprivate func fetchProductInformationForIds(_ productIds:[String]) {
        XXXProductManager.productsWithProductIdentifiers(productIds,
                                                         completion: {[weak self] (products : [SKProduct]?, error : NSError?) -> Void in
                                                            if error != nil {
                                                                print(error?.localizedDescription)
                                                                let _ll_dispatchEvent = "LPurchase._ll_dispatchEventError('"+(error?.localizedDescription)!+"', LPurchase.PRODUCT_INFORMATION_COMPLETE);"
                                                                self!.context.evaluateScript(_ll_dispatchEvent)
                                                                return
                                                            }
                                                            var str : String = "["
                                                            var add = ""
                                                            for product in products! {
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
    fileprivate func purchase(_ productId:String) {
        self.currentProductId = productId
        //デリゲード設定
        XXXPurchaseManager.sharedManager().delegate = self
        
        //プロダクト情報を取得
        XXXProductManager.productsWithProductIdentifiers([productId],
                                                         completion: {[weak self]  (products : [SKProduct]?, error : NSError?) -> Void in
                                                            if error != nil {
                                                                if let weakSelf = self {
                                                                    weakSelf.purchaseManager(XXXPurchaseManager.sharedManager(), didFailWithError: error)
                                                                }
                                                                print(error?.localizedDescription)
                                                                let _ll_dispatchEvent = "LPurchase._ll_dispatchEventError('"+(error?.localizedDescription)!+"', LPurchase.PURCHASE_COMPLETE);"
                                                                self!.context.evaluateScript(_ll_dispatchEvent)
                                                                return
                                                            }
                                                            
                                                            if (products?.count)! > 0 {
                                                                //課金処理開始
                                                                XXXPurchaseManager.sharedManager().startWithProduct((products?[0])!)
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
    @objc func purchaseManager(_ purchaseManager: XXXPurchaseManager!, didFinishPurchaseWithTransaction transaction: SKPaymentTransaction!, decisionHandler: ((_ complete: Bool) -> Void)!) {
        //課金終了時に呼び出される
        /*productIdentifier
         TODO: コンテンツ解放処理
         */
        print("purchase finish! " + transaction.payment.productIdentifier)
        //コンテンツ解放が終了したら、この処理を実行(true: 課金処理全部完了, false 課金処理中断)
        decisionHandler(true)
        let _ll_dispatchEvent = "LPurchase._ll_dispatchEvent({'status':1,'productId':'"+transaction.payment.productIdentifier+"'}, LPurchase.PURCHASE_COMPLETE);"
        self.context.evaluateScript(_ll_dispatchEvent)
    }
    
    @objc func purchaseManager(_ purchaseManager: XXXPurchaseManager!, didFinishUntreatedPurchaseWithTransaction transaction: SKPaymentTransaction!, decisionHandler: ((_ complete: Bool) -> Void)!) {
        //課金終了時に呼び出される(startPurchaseで指定したプロダクトID以外のものが課金された時。)
        /*
         TODO: コンテンツ解放処理
         */
        print("purchase finish!(Untreated.)")
        //コンテンツ解放が終了したら、この処理を実行(true: 課金処理全部完了, false 課金処理中断)
        decisionHandler(true)
        let _ll_dispatchEvent = "LPurchase._ll_dispatchEvent({'status':1,'productId':'"+transaction.payment.productIdentifier+"'}, LPurchase.PURCHASE_COMPLETE);"
        self.context.evaluateScript(_ll_dispatchEvent)
    }
    
    @objc func purchaseManager(_ purchaseManager: XXXPurchaseManager!, didFailWithError error: NSError!) {
        //課金失敗時に呼び出される
        /*
         TODO: errorを使ってアラート表示
         */
        print("purchase fail...")
        let _ll_dispatchEvent = "LPurchase._ll_dispatchEventError('purchase fail!', LPurchase.PURCHASE_COMPLETE);"
        self.context.evaluateScript(_ll_dispatchEvent)
    }
    
    @objc func purchaseManagerDidFinishRestore(_ purchaseManager: XXXPurchaseManager!) {
        //リストア終了時に呼び出される(個々のトランザクションは”課金終了”で処理)
        /*
         TODO: インジケータなどを表示していたら非表示に         
         */
        print("restore finish!")
        let _ll_dispatchEvent = "LPurchase._ll_dispatchEventError('purchase success!', LPurchase.PURCHASE_RESTORE_COMPLETE);"
        self.context.evaluateScript(_ll_dispatchEvent)
    }
    
    @objc func purchaseManagerDidDeferred(_ purchaseManager: XXXPurchaseManager!) {
        //承認待ち状態時に呼び出される(ファミリー共有)
        /*
         TODO: インジケータなどを表示していたら非表示に
         */
        print("purcase defferd.")
    }
    
}
