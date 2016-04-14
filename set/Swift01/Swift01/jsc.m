//
//  jsc.m
//  Swift01
//
//  Created by zhanglubin on 2016/04/14.
//  Copyright © 2016年 張路斌. All rights reserved.
//

#import <JavaScriptCore/JavaScriptCore.h>
JSValue *getJSVinJSC(JSContext *ctx, NSString *key) {
    return ctx[key];
}
void setJSVinJSC(JSContext *ctx, NSString *key, id val) {
    ctx[key] = val;
}
void setB0JSVinJSC(
                   JSContext *ctx, NSString *key, id (^block)()
                   ) {
    ctx[key] = block;
}
void setB1JSVinJSC(
                   JSContext *ctx, NSString *key, id (^block)(id)
                   ) {
    ctx[key] = block;
}
void setB2JSVinJSC(
                   JSContext *ctx, NSString *key, id (^block)(id, id)
                   ){
    ctx[key] = block;
}
