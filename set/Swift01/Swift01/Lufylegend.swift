import UIKit
import AVFoundation

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
}
class Lufylegend {
    let PATH_SOUND = "Sound/"
    let TYPE_SE = "wav"
    let TYPE_BGM = "mp3"
    var audioSEPlayer:AVAudioPlayer = AVAudioPlayer()
    var audioBGMPlayer:AVAudioPlayer = AVAudioPlayer()
    func playSE(name : String, volume : Float){
        let coinSound = NSURL(fileURLWithPath: NSBundle.mainBundle().pathForResource(PATH_SOUND + name, ofType: TYPE_SE)!)
        do{
            audioSEPlayer = try AVAudioPlayer(contentsOfURL:coinSound)
            audioSEPlayer.volume = volume
            audioSEPlayer.prepareToPlay()
            audioSEPlayer.play()
        }catch {
            print("Error :: getting the audio file : " + name)
        }
    }
    func playBGM(name : String, volume : Float){
        let coinSound = NSURL(fileURLWithPath: NSBundle.mainBundle().pathForResource(PATH_SOUND + name, ofType: TYPE_BGM)!)
        do{
            audioBGMPlayer = try AVAudioPlayer(contentsOfURL:coinSound)
            audioBGMPlayer.volume = volume
            audioBGMPlayer.prepareToPlay()
            audioBGMPlayer.play()
        }catch {
            print("Error :: getting the audio file : " + name)
        }
    }
    func writeToFile(name : String, data : String) -> Bool{
        let paths = NSSearchPathForDirectoriesInDomains(
            .DocumentDirectory,
            .UserDomainMask, true)
        let dir = paths.first!
        let file_name =  dir.stringByAppendingString(name as String)
        do {
            try data.writeToFile( file_name, atomically: false, encoding: NSUTF8StringEncoding )
            return true
        } catch {
            print("Error :: can't save to file : " + name)
        }
        return false
    }
    func readFile(name : String) -> String{
        let paths = NSSearchPathForDirectoriesInDomains(
            .DocumentDirectory,
            .UserDomainMask, true)
        let dir = paths.first!
        let file_name =  dir.stringByAppendingString(name as String)
        var data = "";
        do {
            data = (try NSString( contentsOfFile: file_name, encoding: NSUTF8StringEncoding )) as String
        } catch {
            print("Error :: getting the file : " + name)
        }
        return data;
    }
    func contextInit(context : JSContext){
        context.setb2("playSE", {(seName:AnyObject!, volume:AnyObject!)->AnyObject in
            self.playSE(seName as! String, volume: volume as! Float)
            return ""
        })
        context.setb2("playBGM", {(seName:AnyObject!, volume:AnyObject!)->AnyObject in
            self.playBGM(seName as! String, volume: volume as! Float)
            return ""
        })
        context.setb1("readFile", {(name:AnyObject!)->AnyObject in
            return self.readFile(name as! String)
        })
        context.setb2("writeToFile", {(name:AnyObject!, data:AnyObject!)->AnyObject in
            return self.writeToFile(name as! String, data: data as! String)
        })
        
        context.evaluateScript("function LPlugin(){}")
        context.evaluateScript("LPlugin.playSE = playSE;")
        context.evaluateScript("LPlugin.playBGM = playBGM;")
        context.evaluateScript("LPlugin.readFile = readFile;")
        context.evaluateScript("LPlugin.writeToFile = writeToFile;")
        //let value:JSValue = context.objectForKeyedSubscript("LPlugin")
        //print(value.toString())
    }
}