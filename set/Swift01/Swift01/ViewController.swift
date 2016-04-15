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

class ViewController: UIViewController, UIWebViewDelegate {
    let myWebView : UIWebView = UIWebView()
    override func viewDidLoad() {
        super.viewDidLoad()
        print("viewDidLoad！")
        
        //画面一杯にWebを表示
        
        myWebView.delegate = self
        myWebView.frame = self.view.bounds
        self.view.addSubview(myWebView)
        if let url = NSBundle.mainBundle().URLForResource("test", withExtension: "html") {
            print("loadRequest！")
            myWebView.loadRequest(NSURLRequest(URL: url))
        }
        let file_name = "/sgj_data.txt"
        //var text = "12345" //保存する内容
        //var read_text = ""
        let lufy = Lufylegend()
        print(lufy.readFile(file_name))
        /*let paths1 = NSSearchPathForDirectoriesInDomains(
            .DocumentDirectory,
            .UserDomainMask, true)
        let dir = paths1.first!
        let path_file_name =  dir.stringByAppendingString(file_name as String)
        print(path_file_name)
        do {
            
            read_text += (try NSString( contentsOfFile: path_file_name, encoding: NSUTF8StringEncoding )) as String
            print( "read :: " + read_text )
            
        } catch {
            print("エラー")
        }
        
        do {
            text += read_text
            try text.writeToFile( path_file_name, atomically: false, encoding: NSUTF8StringEncoding )
            print("OK")
        } catch {
             print("エラー")
        }*/
        /*if let dir : NSString = NSSearchPathForDirectoriesInDomains( NSSearchPathDirectory.DocumentDirectory, NSSearchPathDomainMask.AllDomainsMask, true ).first {
            
            let path_file_name = dir.stringByAppendingPathComponent( file_name )
            
            do {
                
                try text.writeToFile( path_file_name, atomically: false, encoding: NSUTF8StringEncoding )
                
            } catch {
                //エラー処理
                print("エラー")
            }
        }*/
        //JSContext *ctx = [webView valueForKeyPath:@”documentView.webView.mainFrame.javaScriptContext”];
        if let ctx = myWebView.valueForKeyPath("documentView.webView.mainFrame.javaScriptContext") {
            let context = ctx as! JSContext
            lufy.contextInit(context)
            /*
            let script = "value = encodeURI('<name>');"
            context.evaluateScript(script)
            let value:JSValue = context.objectForKeyedSubscript("value")
            print(value.toString())
            let function = {(values:AnyObject!)->AnyObject in
                var sum:Int = 0
                for value in values as! NSArray
                {
                    sum += value.integerValue
                }
                return sum
            }
            //context.setObject(function, forKeyedSubscript: "sum")
            context.setb1("sum", function)
            print(context.evaluateScript("sum([1,2,3])"))
            var audioPlayer:AVAudioPlayer = AVAudioPlayer()
            context.setb1("playSE", {(value:AnyObject!)->AnyObject in
                
                let coinSound = NSURL(fileURLWithPath: NSBundle.mainBundle().pathForResource("Sound/Se_ok", ofType: "wav")!)
                do{print(coinSound)
                    audioPlayer = try AVAudioPlayer(contentsOfURL:coinSound)
                    audioPlayer.prepareToPlay()
                    audioPlayer.play()
                }catch {
                    print("Error getting the audio file")
                }
                
                return "";
            })
            */
        }

    }
    func webViewDidFinishLoad(webView: UIWebView) {
        print("webViewDidFinishLoad")
        let path = NSBundle.mainBundle().pathForResource("data", ofType: "js")!
        if let data = NSData(contentsOfFile: path){
            var str = String(NSString(data: data, encoding: NSUTF8StringEncoding)!)
            str = str.stringByReplacingOccurrencesOfString("\n", withString: "", options: NSStringCompareOptions.LiteralSearch, range: nil)
            print("jsload="+str)
            myWebView.stringByEvaluatingJavaScriptFromString(str)
        }else{
            print("データなし")
        }
        //myWebView.stringByEvaluatingJavaScriptFromString("if(typeof window.testLoad == 'undefined'){window.mylist={};window.testLoad=function(url,callback){var f=function(){if(!window.mylist[url]){setTimeout(f,100);}else{callback(window.mylist[url]);}};f();location.href=url;};}")
    }
    func webView(webView: UIWebView, shouldStartLoadWithRequest request: NSURLRequest, navigationType: UIWebViewNavigationType) -> Bool {
        
        print("request.URL : " + String(request.URL))
        if let r = request.URL!.absoluteString.rangeOfString("nativecall") {
            print("nativecallを発見しました。ここでネイティブコールを実行します。");
            print("r : " + String(r))
            myWebView.stringByEvaluatingJavaScriptFromString("window.mylist['nativecall://abcdef?x=a&y=b']='abcdefg';")
            return false;
        }
        
        return true
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

