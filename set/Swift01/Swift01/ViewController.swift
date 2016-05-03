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
    override func viewDidLoad() {
        super.viewDidLoad()
        let lufy = Lufylegend()
        lufy.initialize("game/", viewController: self, delegate: self )
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
    override func prefersStatusBarHidden() -> Bool {
        return true
    }
    
    
    
    
    
}

