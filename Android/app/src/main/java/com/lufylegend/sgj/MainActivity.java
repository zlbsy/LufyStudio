package com.lufylegend.sgj;

import android.os.Bundle;
import android.provider.Settings;
import android.support.v7.app.AppCompatActivity;

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
        String src = "my test";
        String enc = AESUtil.encrypt(src);
        android.util.Log.e("enc",enc);
        String dec = AESUtil.decrypt(enc);
        android.util.Log.e("dec",dec);
        Lufylegend.initialize("game/",this);
    }
}
