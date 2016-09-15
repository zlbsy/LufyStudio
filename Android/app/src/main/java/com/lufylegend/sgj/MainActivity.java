package com.lufylegend.sgj;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Base64;

import org.bouncycastle.jce.provider.BouncyCastleProvider;

import java.security.MessageDigest;
import java.security.Provider;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        /*
        try {
            String text = "WEFoT1JDUmF0TTFtZndERcz00ky2B7XRiADpW8VPKn80MMgzOuV1vCkIsLCgpG2HLoNwir5hMkYmdlIYGhudbrjBt+d+HYCeKn0WkXB75V4CJbI/d5AaPMFZqDnRnJBdg7HfmNjoheUlKisD2tU/Gw93UNdYUFU/DhPriAJYodH36sSkZjssC1Fsi1YxHjG3F53kT1sKwfea2SMRqNo2Z0m4cZoLQpRZkWfFupYIdz4oWl9tTV7H8/nYXj78aHfVBe16SrBqZsuHYyA6wWOjmtpp5ucFoW6SQeSpNdubxsgi3MCh13C/gU9Yf4LHC9NOxtOws405S39KmfZY1IrsYYDSN4mQoSf5VxBcLwZuBA40HE0ftwZDzw0UiuJ7oDGDB6YgN7lAXoZ97o8kfjpK0TriVMOUIVvpfwIdkVsRaz0sCHx/lfVtYDi0Ngr8s87PpsWVdY6SCFWhNxbWFocgVjeR7vRX9ASQu7I3XOdzjPhkoRqSX6cPF+ygU+MiW33B5vewIr483V510JRVIFNKBZnAiZTQFqSeutWw1aCyh3hIEW+93y5HIFPbvy1woDPlX8DaZGlmzWreGMdtHNHMCtjddKDPHVRyg+EAeQgN5QHYMA8qWYXCUp2wIc/MXuQOseBJT071xGtqYW7GWHtyL39bHMPv2TOLxZdOv5kt4j3vnrnL3Nx2Om75fyqFfIBugnl5sDp3tHnq0GrnRDXu5MZA2gLyalEnhaZn8tfbJU/bTFpkysEyr+hv0FeY1R5Tv310tpLkXGr5ApOqUQLtzVXMLULdOSrZBJQEEDnldL9Sr1R65kqaKvdsA/Foc3usVrgJzazKNLj6dP+JQkaVPnA91mwacVDNK2xyA5IPQwO1f14DuvznRBRvmStivZuXOVldvnX1FzYPO3Q+Jv3wyT07rozI+WF4Q0p+h5X+xInK9lCRsDWmuwOKVfKTcAO+lcbHvcIjkf9rnLjP9oI7vTFOmsoWhuCB2HJdCG83Z8u3/6TUZUdRABMzydoe/7u7TAN2bvcnAi7aryNvk/3xAJBNseS7t+sAvAqIidQ2YRGN1VkE6Xc1JyrP5L1bbyQi9Khtqdy1petTFNdkwsHuwbsnRxVCGSimUdOqPUwn1pe1wOpjZ/qqrg4NHLa7rhvOSfF62iozV1TS25mn6ZODhpjmMiwazkxWzxxkiBbvT9C+smJr15RsXM36BGQEptngyzD4MNR9iQDTrA4+7srsTMb42oBDsfgJf33AcL8UrmxTKARvxxAHSbGI7yqS/nd0uRQGM2CS3cppwe0jo8PceFkazOd2fb4jlvlhVRUV86o4cRlduSu48tX2eTsvwqjvR8nE/iV2LWa4d30ffiUDagZXzLt707krw/485MtNMd9ViV1zOnyLGkEqZSucvK3uwTlEeOxmdp8f54Rt2JyY3A==";
            byte[] byteText = android.util.Base64.decode(text, Base64.DEFAULT);
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
            String strResult = new String(byteResult, "UTF-8");
            android.util.Log.e("strResult", strResult.substring(15));
            for(int i=0;i<20;i++){
                android.util.Log.e("substring", strResult.substring(15,i+16));
            }
        }catch (Exception e) {
            e.printStackTrace();
        }*/
        Lufylegend.initialize("game/",this);
    }
}
