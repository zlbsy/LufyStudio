package com.lufylegend.sgj.com.lufylegend.sgj.alipay;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import android.app.Activity;
import android.os.Handler;
import android.os.Message;
import android.util.Log;

import com.alipay.sdk.app.PayTask;

public class AliPayAPI {

	private static final String TAG = "AliPayAPI";
	public static final int RQF_PAY = 1;
	public static final String MSG_KEY_OUT_TRADE_NO = "AliPayOutTradeNo";
	public static final String MSG_KEY_RESULT = "AliPayResult";
	
	public static void startAlipay(final Activity activity, final Handler handler, 
			final String trGameId, final String outTradeNo, final String subject, final String body, final String totalFee) {
		
		AliPayOrderInfo aliOrder = new AliPayOrderInfo();
		aliOrder.outTradeNo = outTradeNo;
		aliOrder.subject = subject;
		aliOrder.body = body;
		aliOrder.price = totalFee;

		String orderInfo = aliOrder.getOrderInfo();		
		String sign = SignUtils.sign(orderInfo, Keys.PRIVATE);
		try {
			// 仅需对sign 做URL编码
			sign = URLEncoder.encode(sign, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		final String payInfo = orderInfo + "&sign=\"" + sign + "\"&sign_type=\"RSA\"";
		Log.d("AliPayAPI", "info=" + payInfo);
		
		Runnable payRunnable = new Runnable() {
			@Override
			public void run() {
				// 构造PayTask 对象
				PayTask alipay = new PayTask(activity);
				// 调用支付接口
				String result = alipay.pay(payInfo,true);
				
				Log.i(TAG, "result = " + result);
				
				Message msg = new Message();
				msg.what = RQF_PAY;
				msg.getData().putString(MSG_KEY_OUT_TRADE_NO, outTradeNo);
				msg.getData().putString(MSG_KEY_RESULT, result);
				handler.sendMessage(msg);
			}
		};

		Thread payThread = new Thread(payRunnable);
		payThread.start();
	}
}
