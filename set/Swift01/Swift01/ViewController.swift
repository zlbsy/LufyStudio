//
//  ViewController.swift
//  Swift01
//
//  Created by 張路斌 on 2015/12/09.
//  Copyright © 2015年 張路斌. All rights reserved.
//

import UIKit
import Foundation
import AVFoundation
import JavaScriptCore;
import StoreKit

class ViewController: UIViewController, UIWebViewDelegate{
    
    let myWebView : UIWebView = UIWebView()
    override func viewDidLoad() {
        super.viewDidLoad()
        print("viewDidLoad！")
        
        //画面一杯にWebを表示
        
        myWebView.delegate = self
        myWebView.frame = self.view.bounds
        self.view.addSubview(myWebView)
        if let url = NSBundle.mainBundle().URLForResource("game/index", withExtension: "html") {
            //print("loadRequest！")
            myWebView.loadRequest(NSURLRequest(URL: url))
        }
        //let file_name = "/sgj_data.txt"
        let lufy = Lufylegend()
        //print(lufy.readFile(file_name))
        
        if let ctx = myWebView.valueForKeyPath("documentView.webView.mainFrame.javaScriptContext") {
            let context = ctx as! JSContext
            lufy.contextInit(context)
        }
        
        
        
        //プロダクトID達
        //let productIdentifiers = ["newWujiang","saveReport","com.lufylegend.sgj.id01"]
        //プロダクト情報取得
        //lufy.fetchProductInformationForIds(productIdentifiers)
        
    }
    
    
    func webViewDidFinishLoad(webView: UIWebView) {
        
    }
    func webView(webView: UIWebView, shouldStartLoadWithRequest request: NSURLRequest, navigationType: UIWebViewNavigationType) -> Bool {
        return true
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    
    
    
    
    
}

