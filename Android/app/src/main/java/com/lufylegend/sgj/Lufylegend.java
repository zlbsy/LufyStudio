package com.lufylegend.sgj;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.media.AudioAttributes;
import android.media.AudioManager;
import android.media.SoundPool;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Build;
import android.os.Handler;
import android.provider.Settings;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.net.URI;
import java.security.MessageDigest;
import java.security.Provider;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.HashMap;
import java.io.*;
import java.util.Random;

import android.content.res.AssetManager;

import com.lufylegend.sgj.AliPayAPI;
import com.lufylegend.sgj.AliPayResult;

import org.bouncycastle.jce.provider.BouncyCastleProvider;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

/**
 * Created by lubin.zhang on 16/08/31.
 */
public class Lufylegend {
    private static final String API_URL = "http://sgj.lufylegend.com/android_purchase/r7ahGNe_A8QLDKKd3Ys7/";
    public static String gamePath;
    public static WebView myWebView;
    public static Lufylegend instance = null;
    private String purchaseParams;
    private Activity context;
    private MediaPlayer mediaPlayer;
    private SoundPool soundPool;
    private AudioAttributes audioAttributes;
    private HashMap<String, Integer> soundIds = new HashMap<String, Integer>();
    public Lufylegend(Activity context){
        this.context = context;
        soundInit();
    }
    public static void initialize(String path, Activity activity){
        Lufylegend.gamePath = path;
        activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
        activity.requestWindowFeature(Window.FEATURE_NO_TITLE);
        activity.setContentView(R.layout.activity_main);
        //レイアウトで指定したWebViewのIDを指定する。
        WebView myWebView = (WebView)activity.findViewById(R.id.webView1);
        Lufylegend.myWebView = myWebView;
        //jacascriptを許可する
        myWebView.getSettings().setJavaScriptEnabled(true);
        Lufylegend.instance = new Lufylegend(activity);
        myWebView.addJavascriptInterface(Lufylegend.instance, "LPlugin");
        //リンクをタップしたときに標準ブラウザを起動させない
        myWebView.setWebViewClient(new WebViewClient());
        //ページを表示する。
        String url = String.format("%sindex.html", String.format("file:///android_asset/%s", path));
        myWebView.loadUrl(url);
        //instance.startAlipay("123", instance.getOutTradeNo(), "test", "test", "0.1");
    }

    /**
     * get the out_trade_no for an order. 生成商户订单号，该值在商户端应保持唯一（可自定义格式规范）
     *
     */
    private String getOutTradeNo() {
        SimpleDateFormat format = new SimpleDateFormat("MMddHHmmss", Locale.getDefault());
        Date date = new Date();
        String key = format.format(date);

        Random r = new Random();
        key = key + r.nextInt();
        key = key.substring(0, 15);
        return key;
    }
    private Handler mHandler = new Handler() {
        @Override
        public void handleMessage(android.os.Message msg) {
            //支付返回的订单号，可具体处理此订单的逻辑
            String outTradeNo = msg.getData().getString(AliPayAPI.MSG_KEY_OUT_TRADE_NO);
            String strResult = msg.getData().getString(AliPayAPI.MSG_KEY_RESULT);
            AliPayResult result = new AliPayResult(strResult);
/*
支付宝返回结果
 */
            switch (msg.what) {
                case AliPayAPI.RQF_PAY: {
                    if (result.isSucceed()) {//支付成功
                        Lufylegend.instance.purchaseLog();
                    } else {//支付失败
                        Lufylegend.instance.purchaseError();
                    }
                }
                break;
                default:
                    break;
            }
        };
    };
    /*
    trGameId:标示你的自己账户系统id，
    outTradeNo：订单号
    subject：描述信息
    body：带有订单信息的消息体
    totalFee：价格
    具体参数如果有疑问可参考这篇文章 https://doc.open.alipay.com/doc2/detail?treeId=59&articleId=103663&docType=1
     */
    public int startAlipay(String trGameId, String outTradeNo, String subject, String body,
                                  String totalFee) {
        if (this.context == null) {
            return 0;
        }
        Log.d("TRGame", String.format("Alipay,trGameId=%s,tradeNo=%s,subject=%s,body=%s,fee=%s",
                trGameId, outTradeNo, subject, body, totalFee));

        AliPayAPI.startAlipay(context, mHandler, trGameId, outTradeNo, subject, body,
                totalFee);
        return 1;
    }


    @JavascriptInterface
    public String getGamePath(){
        return Lufylegend.gamePath;
    }
    @JavascriptInterface
    public String encodeBase64(String path) {
        try{
            //Log.e("encodeBase64=",path);
            int readLength = 8192;
            final AssetManager assetManager = context.getAssets();
            InputStream inputStream = assetManager.open(Lufylegend.gamePath + path);
            BufferedReader br = null;
            br = new BufferedReader(new InputStreamReader(inputStream));
            String text = "";
            String str;
            while ((str = br.readLine()) != null) {
                text += str;
            }
            String base64Data = android.util.Base64.encodeToString(text.getBytes(),android.util.Base64.DEFAULT);
            return base64Data;
            /*
            final ByteArrayOutputStream byteStream = new ByteArrayOutputStream(readLength);  //一時バッファのように使う
            final byte[] bytes = new byte[readLength];
            final BufferedInputStream bis = new BufferedInputStream(inputStream, readLength);
            try {
                int len = 0;
                while ((len = bis.read(bytes, 0, readLength)) > 0) {
                    byteStream.write(bytes, 0, len);    //ストリームバッファに溜め込む
                }
                //return new String(byteStream.toByteArray());    //byte[] に変換

                String base64Data = android.util.Base64.encodeToString(byteStream.toByteArray(),android.util.Base64.DEFAULT);
                return base64Data;
            } finally {
                try {
                    byteStream.reset();     //すべてのデータを破棄
                    bis.close();            //ストリームを閉じる
                } catch (Exception e) {
                    //IOException
                }
            }*/
        }catch (Exception e)
        {
            e.printStackTrace();
        }
        return "";
    }
    @JavascriptInterface
    public String changeToScript(String text){
        String strResult = "";
        try {
            byte[] byteText = android.util.Base64.decode(text, android.util.Base64.DEFAULT);
            String ENCRYPT_KEY = "W4IG2lgO";
            String ENCRYPT_IV = "XAhORCRatM1mfwDE";
            byte[] byteIv = ENCRYPT_IV.getBytes("UTF-8");
            Provider provider = new BouncyCastleProvider();
            MessageDigest digester = MessageDigest.getInstance("SHA-256", provider);
            digester.update(String.valueOf(ENCRYPT_KEY).getBytes("UTF-8"));
            byte[] byteKey = digester.digest();
            SecretKeySpec key = new SecretKeySpec(byteKey, "AES");
            IvParameterSpec iv = new IvParameterSpec(byteIv);
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, key, iv);
            byte[] byteResult = cipher.doFinal(byteText);
            strResult = new String(byteResult, "UTF-8");
            return strResult.substring(15);
        }catch (Exception e) {
            e.printStackTrace();
        }
        return strResult;
    }
    @JavascriptInterface
    public String androidSetting(){
        String data = readFile("lufylegend.java.js", "");
        return changeToScript(data);
        //return "<script type=\"text/javascript\" src=\"../lufylegend.java.js\"></script>;";
    }
    @JavascriptInterface
    public String readFile(String filePath) {
        return readFile(filePath, Lufylegend.gamePath);
    }
    public String readFile(String filePath, String basePath) {
        try {
            final AssetManager assetManager = context.getAssets();
            InputStream inputStream = assetManager.open(basePath + filePath);
            BufferedReader br = null;
            br = new BufferedReader(new InputStreamReader(inputStream));
            String text = "";
            String str;
            while ((str = br.readLine()) != null) {
                text += str;
            }
            return text;
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
            //e.printStackTrace();
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
        Uri uri = Uri.parse(url);
        Intent i = new Intent(Intent.ACTION_VIEW,uri);
        context.startActivity(i);
    }
    private void javascriptRun(String script){
        final String strScript = script;
        Lufylegend.myWebView.post(new Runnable() {
            @Override
            public void run() {
                Lufylegend.myWebView.loadUrl("javascript:" + strScript);
            }
        });
    }
    @JavascriptInterface
    public void productInformation(String[] productIds){
        String identification_id = identificationId();
        String completeEvent = "LPurchase._ll_dispatchEvent(data, LPurchase.PRODUCT_INFORMATION_COMPLETE);";
        String errorEvent = "LPurchase._ll_dispatchEventError('Json Error', LPurchase.PRODUCT_INFORMATION_COMPLETE);";
        String params = "{";
        params += "'identification_id':'"+identification_id+"'";
        params += ",'language':'"+preferredLanguage()+"'";
        params += "}";
        execPost("purchase_information/", params, completeEvent, errorEvent);
    }
    @JavascriptInterface
    public void purchase(String productId, String itemId, String paymentTime, String subject, String body,String totalFee){
        String trGameId = identificationId();
        if(trGameId == ""){
            purchaseError();
            return;
        }
        String outTradeNo = itemId + "-" + trGameId + "-" + paymentTime;
        outTradeNo = outTradeNo.length() > 64 ? outTradeNo.substring(0, 64) : outTradeNo;
        String params = "{";
        params += "'identification_id':'"+trGameId+"'";
        params += ",'product_id':'"+productId+"'";
        params += ",'payment_time':'"+paymentTime+"'";
        params += "}";
        purchaseParams = params;
        startAlipay(trGameId, outTradeNo, subject, body, totalFee);
    }
    public void purchaseLog(){
        String identification_id = identificationId();
        String completeEvent = "";
        completeEvent += "LPurchase._ll_dispatchEvent(data, LPurchase.PURCHASE_COMPLETE);";
        String errorEvent = "LPurchase._ll_dispatchEventError('Json Error', LPurchase.PURCHASE_COMPLETE);";
        execPost("purchase_start/index.php", purchaseParams, completeEvent, errorEvent);
    }
    public void purchaseError(){
        String errorEvent = "LPurchase._ll_dispatchEventError('Json Error', LPurchase.PURCHASE_COMPLETE);";
        javascriptRun(errorEvent);
    }
    @JavascriptInterface
    public void purchaseCheck(String productId){
        String identification_id = identificationId();
        if(identification_id == ""){
            identification_id = "0";
        }
        String completeEvent = "";
        completeEvent += "LPurchase._ll_dispatchEvent(data, LPurchase.PURCHASE_CHECK_COMPLETE);";
        String errorEvent = "LPurchase._ll_dispatchEventError('Json Error', LPurchase.PURCHASE_CHECK_COMPLETE);";
        String params = "{";
        params += "'identification_id':'"+identification_id+"'";
        params += ",'product_id':'"+productId+"'";
        params += "}";
        execPost("purchase_start/check.php", params, completeEvent, errorEvent);
    }
    @JavascriptInterface
    public void purchaseRestore(){
        String identification_id = identificationId();
        String completeEvent = "for(var i=0;i<data.length;i++){";
        completeEvent += "LPurchase._ll_dispatchEvent({'status':1,'productId':data[i].product_id}, LPurchase.PURCHASE_COMPLETE);";
        completeEvent += "}";
        completeEvent += "LPurchase._ll_dispatchEvent(data, LPurchase.PURCHASE_RESTORE_COMPLETE);";
        String errorEvent = "LPurchase._ll_dispatchEventError('Json Error', LPurchase.PURCHASE_COMPLETE);";
        String params = "{";
        params += "'identification_id':'"+identification_id+"'";
        params += "}";
        execPost("purchase_restore/", params, completeEvent, errorEvent);
    }
    private void execPost(String strUrl, String params, String completeEvent, String errorEvent) {
        strUrl = Lufylegend.API_URL + strUrl;
        String script = "";
        script += "LAjax.post('"+strUrl+"',"+params+",";
        script += "function(data){data=JSON.parse(data);"+completeEvent+"},";
        script += "function(){"+errorEvent+"}";
        script += ")";
        javascriptRun(script);
    }
    @JavascriptInterface
    public String identificationId(){
        String id = androidId();
        if(id.isEmpty()){
            id = deviceId();
        }
        return id;
    }
    private String androidId(){
        String android_id = "";
        try{
            android_id = Settings.Secure.getString(
                    context.getContentResolver(),Settings.Secure.ANDROID_ID);
        }catch (Exception e){
            android_id = "";
        }
        return android_id;
    }
    private String deviceId(){
        String device_id = "";
        try{
            TelephonyManager telephonyManager = (TelephonyManager)context.getSystemService(Context.TELEPHONY_SERVICE);
            device_id = telephonyManager.getDeviceId();
        }catch (Exception e){
            device_id = "";
        }
        return device_id;
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
        String[] versions = version.split("\\.");
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
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
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
        }
        else {
            soundPool = new SoundPool(sounds.size(), AudioManager.STREAM_MUSIC, 0);
        }
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
