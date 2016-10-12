/*
 * Copyright (C) 2010 The MobileSecurePay Project
 * All right reserved.
 * author: shiqun.shi@alipay.com
 * 
 *  提示：如何获取安全校验码和合作身份者id
 *  1.用您的签约支付宝账号登录支付宝网站(www.alipay.com)
 *  2.点击“商家服务”(https://b.alipay.com/order/myorder.htm)
 *  3.点击“查询合作者身份(pid)”、“查询安全校验码(key)”
 */

package com.lufylegend.sgj;

//
// 请参考 Android平台安全支付服务(msp)应用开发接口(4.2 RSA算法签名)部分，并使用压缩包中的openssl RSA密钥生成工具，生成一套RSA公私钥。
// 这里签名时，只需要使用生成的RSA私钥。
// Note: 为安全起见，使用RSA私钥进行签名的操作过程，应该尽量放到商家服务器端去进行。
final class Keys {

	//合作身份者id，以2088开头的16位纯数字
	public static final String DEFAULT_PARTNER = "2088901132447379";

	//收款支付宝账号
	public static final String DEFAULT_SELLER = "hr@bantus.cn";

	//商户私钥，自助生成
	public static final String PRIVATE = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAL6BUxsMvnsoORllCLfc+jirAtP11KL3iNpv7GH7SMRfxOPcD7bqYgiSVToN+BwjonUenbsqAdRZGiXtU4iP+M7RoXVxrD13N24bwFYgcZy4TdgIiCe3DvPysJYsB4abCsidvGTp/0+cfDRv1QDZmHEqN6b1OvkAAo7xLDTGseFFAgMBAAECgYB/SBLJkOM3j/FOeUWw6tC3yfJywd3XIIHsSDlsYaMFqWL4RtCtCr6DMZoF1s19p4VksRb7tR5RzVJ+IqncJS07f9we5BfcMLhsx0aMF0qpYcoshhz8XCnCkC0e0vktEi6/qXZscF0ZlGcZ6jEHplw82jE942Icusp0hNaVHKmnwQJBAPzvv5uc+sp31+Ev4JBxQtVzp+GfQwmNw4tXEWaecO1yQhHJUi0wK2xa/vyRMvVi16iyWZ7NyFa8cU8ytVMVzBECQQDA0ACciBsJwCsm9ApNyRkQQ7ic8/+zB2QQSSMEcoDLmFzfJ/qFy+KcZBQ6k+JtiEGICHwrjeOI9BT47ER+hUX1AkEAlaJ0FWhqCauagDLlxC3tHv/7+oNQkm9WlrFcrvvezOpCYela/za3CbRPkzWHExp1gOx6DnOpKH70/ah/EvcbMQJAJ8L9TUp4IPOjMn5DHbVp2MPOb3eV9IqCpSUf9ovSaan7BP4OmMbp7Yxp64aRvDrMIMx3Jtg04wpKxOacXWcIfQJALQsMwFLbPryx4FY9O5WLZ94leONTPelJ4haMo8vKMxzahgm19tTA4jGYYIRpMgd3d/lIDHnIlAKoIjgSZdlqVw==";

	//支付宝公钥
	public static final String PUBLIC = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCnxj/9qwVfgoUh/y2W89L6BkRAFljhNhgPdyPuBV64bfQNN1PjbCzkIM6qRdKBoLPXmKKMiFYnkd6rAoprih3/PrQEB/VsW8OoM8fxn67UDYuyBTqA23MML9q1+ilIZwBC2AQ2UBVOrFXfFl75p6/B5KsiNG9zpgmLCUYuLkxpLQIDAQAB";

}
