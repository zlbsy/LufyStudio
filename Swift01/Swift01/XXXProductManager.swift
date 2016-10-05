//
//  XXXProductManager.swift
//  Swift01
//
//  Created by zhanglubin on 2016/04/24.
//  Copyright © 2016年 張路斌. All rights reserved.
//

import Foundation
import StoreKit

private var productManagers : Set<XXXProductManager> = Set()

class XXXProductManager: NSObject, SKProductsRequestDelegate {
    
    fileprivate var completionForProductidentifiers : (([SKProduct]?,NSError?) -> Void)?
    
    /// 課金アイテム情報を取得
    class func productsWithProductIdentifiers(_ productIdentifiers : [String]!,completion:(([SKProduct]?,NSError?) -> Void)?){
        let productManager = XXXProductManager()
        productManager.completionForProductidentifiers = completion
        let productRequest = SKProductsRequest(productIdentifiers: Set(productIdentifiers))
        productRequest.delegate = productManager
        productRequest.start()
        productManagers.insert(productManager)
    }
    
    // MARK: - SKProducts Request Delegate
    func productsRequest(_ request: SKProductsRequest, didReceive response: SKProductsResponse) {
        var error : NSError? = nil
        if response.products.count == 0 {
            error = NSError(domain: "ProductsRequestErrorDomain", code: 0, userInfo: [NSLocalizedDescriptionKey:"productsRequest プロダクトを取得できませんでした。"])
        }
        completionForProductidentifiers?(response.products, error)
    }
    
    func request(_ request: SKRequest, didFailWithError error: Error) {
        let error = NSError(domain: "ProductsRequestErrorDomain", code: 0, userInfo: [NSLocalizedDescriptionKey:"request プロダクトを取得できませんでした。"])
        completionForProductidentifiers?(nil,error)
        productManagers.remove(self)
    }
    
    func requestDidFinish(_ request: SKRequest) {
        productManagers.remove(self)
    }
    
    // MARK: - Utility
    /// おまけ 価格情報を抽出
    class func priceStringFromProduct(_ product: SKProduct!) -> String {
        let numberFormatter = NumberFormatter()
        numberFormatter.formatterBehavior = .behavior10_4
        numberFormatter.numberStyle = .currency
        numberFormatter.locale = product.priceLocale
        return numberFormatter.string(from: product.price)!
    }
    
}
