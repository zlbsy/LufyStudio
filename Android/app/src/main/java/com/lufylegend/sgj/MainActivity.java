package com.lufylegend.sgj;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        /*System.out.println("base = " + new String(android.util.Base64.decode("dGhpcyBpcyB0ZXN0",2045)));
        String data = "/f1aBVr9bP39WSxx/Vf9/Q==";
        String decoded = new String(android.util.Base64.decode(data,2045));
        System.out.println("base = " + decoded);
        String dec = AESUtil.decrypt(data);
        System.out.println("decrypt = " + dec);*/
        try {
            String text = "NGU1V2E3MWZZb1Q3TUZFWGZNKt5//YTfSVsHSmQaA0c=";
            byte[] byteText = android.util.Base64.decode(text, 9999);
            String ENCRYPT_KEY = "RwcmlVpg";
            String ENCRYPT_IV = "4e5Wa71fYoT7MFEX";
            byte[] byteKey = ENCRYPT_KEY.getBytes("UTF-8");
            byte[] byteIv = ENCRYPT_IV.getBytes("UTF-8");
            SecretKeySpec key = new SecretKeySpec(byteKey, "AES");
            IvParameterSpec iv = new IvParameterSpec(byteIv);
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, key, iv);
            byte[] byteResult = cipher.doFinal(byteText);
            String strResult = new String(byteResult, "UTF-8");
            android.util.Log.e("strResult", strResult);
        }catch (Exception e) {
            e.printStackTrace();
        }
        Lufylegend.initialize("game/",this);
    }
}
