package com.lufylegend.sgj;

import android.app.Activity;
import android.os.Bundle;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Lufylegend.initialize("game/",this);
    }
    @Override
    public void onBackPressed(){
        Lufylegend.instance.quitConfirm();
    }
}
