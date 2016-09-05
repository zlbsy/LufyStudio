package com.lufylegend.sgj;

import android.content.Context;
import android.media.AudioAttributes;
import android.media.SoundPool;
import android.media.MediaPlayer;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import java.util.Locale;
import java.util.HashMap;
import java.io.*;
import android.content.res.AssetManager;
import org.apache.commons.codec.binary.Base64;

/**
 * Created by lubin.zhang on 16/08/31.
 */
public class Lufylegend {
    public static String gamePath;
    private Context context;
    private MediaPlayer mediaPlayer;
    private SoundPool soundPool;
    private AudioAttributes audioAttributes;
    private HashMap<String, Integer> soundIds = new HashMap<String, Integer>();
    public Lufylegend(Context context){
        this.context = context;
        soundInit();
        ///System.out.println("BuildConfig.VERSION_NAME="+BuildConfig.VERSION_NAME);
        //System.out.println("readFile="+readFile(""));
    }
    public static void initialize(String path, AppCompatActivity activity){
        Lufylegend.gamePath = String.format("file:///android_asset/%s", path);
        activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
        activity.requestWindowFeature(Window.FEATURE_NO_TITLE);
        activity.setContentView(R.layout.activity_main);
        //レイアウトで指定したWebViewのIDを指定する。
        WebView myWebView = (WebView)activity.findViewById(R.id.webView1);
        //jacascriptを許可する
        myWebView.getSettings().setJavaScriptEnabled(true);

        myWebView.addJavascriptInterface(new Lufylegend(activity), "LPlugin");
        //リンクをタップしたときに標準ブラウザを起動させない
        myWebView.setWebViewClient(new WebViewClient());
        //ページを表示する。
        String url = String.format("%sindex.html", Lufylegend.gamePath);
        myWebView.loadUrl(url);
    }
    @JavascriptInterface
    public String getGamePath(){
        return Lufylegend.gamePath;
    }
    @JavascriptInterface
    public String encodeBase64(String path) {
        try{
            Log.e("encodeBase64=",path);
            int readLength = 8192;
            final AssetManager assetManager = context.getAssets();
            InputStream inputStream = assetManager.open(path);
            final ByteArrayOutputStream byteStream = new ByteArrayOutputStream(readLength);  //一時バッファのように使う
            final byte[] bytes = new byte[readLength];
            final BufferedInputStream bis = new BufferedInputStream(inputStream, readLength);
            try {
                int len = 0;
                while ((len = bis.read(bytes, 0, readLength)) > 0) {
                    byteStream.write(bytes, 0, len);    //ストリームバッファに溜め込む
                }
                //return new String(byteStream.toByteArray());    //byte[] に変換

                byte[] outdata = Base64.encodeBase64(byteStream.toByteArray());
                String base64Data =  new String(outdata);
                Log.e("base64=",base64Data);
                return base64Data;
            } finally {
                try {
                    byteStream.reset();     //すべてのデータを破棄
                    bis.close();            //ストリームを閉じる
                } catch (Exception e) {
                    //IOException
                }
            }
            //FileInputStream fi = context.openFileInput(path);
            //byte[] readBytes = new byte[fi.available()];
            //fi.read(readBytes);
            //File inf = new File(path);
            //FileInputStream fi = new FileInputStream(inf);
            //byte[] indata = new byte[(int) inf.length()];
            //fi.read(indata);
            //fi.close();
        }catch (Exception e)
        {
            e.printStackTrace();
        }
        return "";
    }
    @JavascriptInterface
    public String androidSetting(){
        return "<script type=\"text/javascript\" src=\"../lufylegend.java.js\"></script>;";
    }
    @JavascriptInterface
    public String readFile(String filePath) {
        try {
            int readLength = 8192;
            final AssetManager assetManager = context.getAssets();
            Log.e("test", Lufylegend.gamePath + filePath);
            InputStream inputStream = assetManager.open(Lufylegend.gamePath + filePath);
            final ByteArrayOutputStream byteStream = new ByteArrayOutputStream(readLength);  //一時バッファのように使う
            final byte[] bytes = new byte[readLength];
            final BufferedInputStream bis = new BufferedInputStream(inputStream, readLength);
            try {
                int len = 0;
                while ((len = bis.read(bytes, 0, readLength)) > 0) {
                    byteStream.write(bytes, 0, len);    //ストリームバッファに溜め込む
                }
                return new String(byteStream.toByteArray());    //byte[] に変換

            } finally {
                try {
                    byteStream.reset();     //すべてのデータを破棄
                    bis.close();            //ストリームを閉じる
                } catch (Exception e) {
                    //IOException
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "";
    }
    @JavascriptInterface
    public String readFileInDomain(String name){
        // ファイルの読込
        try {
            FileInputStream fileInputStream = context.openFileInput(name);
            byte[] readBytes = new byte[fileInputStream.available()];
            fileInputStream.read(readBytes);
            fileInputStream.close();
            return new String(readBytes);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "";
    }
    @JavascriptInterface
    public void deleteFileInDomain(String name){
        String[] fileList = context.fileList();
        for(String file: fileList) {
            if(file != name)continue;
            context.deleteFile(file);
            break;
        }
    }
    @JavascriptInterface
    public void writeToFileInDomain(String name, String message){
        try {
            FileOutputStream fileOutputStream = context.openFileOutput(name, context.MODE_PRIVATE);
            fileOutputStream.write(message.getBytes());
            fileOutputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    @JavascriptInterface
    public void openURL(String url){

    }
    @JavascriptInterface
    public void print(String message){
        Log.d("print",message);
    }
    @JavascriptInterface
    public void playSE(String name){
        playSE(name, 1);
    }
    @JavascriptInterface
    public void playSE(String name, int volume){
        soundPool.play(soundIds.get(name.toLowerCase()), 1.0f, 1.0f, 0, 0, 1);
    }
    @JavascriptInterface
    public void playBGM(String name){
        playBGM(name, 1);
    }
    @JavascriptInterface
    public void playBGM(String name, int volume){
        if(mediaPlayer != null){
            mediaPlayer.stop();
        }
        mediaPlayer = MediaPlayer.create(context, soundIds.get(name.toLowerCase()));
        mediaPlayer.start();
    }
    @JavascriptInterface
    public String bundleVersion(){
        String version = BuildConfig.VERSION_NAME;
        String[] versions = version.split(".");
        return versions.length >= 3 ? version : version + ".0";
    }
    @JavascriptInterface
    public String preferredLanguage(){
        // ロケールの取得
        Locale locale = Locale.getDefault();
        String language = locale.getLanguage();

        if (language.equals("ja")) {
            return "japanese";
        } else {
            return "chinese";
        }
    }
    private void soundInit(){
        HashMap<Integer, String> sounds = new HashMap<Integer, String>(){
            {put(R.raw.se_big_block, "se_big_block");}
            {put(R.raw.se_big_hert, "se_big_hert");}
            {put(R.raw.se_block, "se_block");}
            {put(R.raw.se_cancel, "se_cancel");}
            {put(R.raw.se_charge, "se_charge");}
            {put(R.raw.se_die, "se_die");}
            {put(R.raw.se_gameover, "se_gameover");}
            {put(R.raw.se_goto_battle, "se_goto_battle");}
            {put(R.raw.se_hert, "se_hert");}
            {put(R.raw.se_loading, "se_loading");}
            {put(R.raw.se_move_car, "se_move_car");}
            {put(R.raw.se_move_cavalry, "se_move_cavalry");}
            {put(R.raw.se_move_infantry, "se_move_infantry");}
            {put(R.raw.se_move_warter, "se_move_warter");}
            {put(R.raw.se_no, "se_no");}
            {put(R.raw.se_ok, "se_ok");}
            {put(R.raw.se_set, "se_set");}
            {put(R.raw.se_strategy_earth, "se_strategy_earth");}
            {put(R.raw.se_strategy_fire, "se_strategy_fire");}
            {put(R.raw.se_strategy_heal1, "se_strategy_heal1");}
            {put(R.raw.se_strategy_heal2, "se_strategy_heal2");}
            {put(R.raw.se_strategy_hert1, "se_strategy_hert1");}
            {put(R.raw.se_strategy_hert2, "se_strategy_hert2");}
            {put(R.raw.se_strategy_warter, "se_strategy_warter");}
            {put(R.raw.se_strategy_wind, "se_strategy_wind");}
            {put(R.raw.se_swing, "se_swing");}
        };
        audioAttributes = new AudioAttributes.Builder()
                // USAGE_MEDIA
                // USAGE_GAME
                .setUsage(AudioAttributes.USAGE_GAME)
                // CONTENT_TYPE_MUSIC
                // CONTENT_TYPE_SPEECH, etc.
                .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
                .build();
        soundPool = new SoundPool.Builder()
                .setAudioAttributes(audioAttributes)
                // ストリーム数に応じて
                .setMaxStreams(sounds.size())
                .build();
        for (int id : sounds.keySet()) {
            int sound = soundPool.load(context, id, 1);
            soundIds.put(sounds.get(id), sound);
        }
        soundIds.put("battle1", R.raw.battle1);
        soundIds.put("battle2", R.raw.battle2);
        soundIds.put("city", R.raw.city);
        soundIds.put("map", R.raw.map);
    }
}
