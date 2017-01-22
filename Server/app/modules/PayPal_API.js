"use strict";
module.exports = function PayPal_API() {
    var paypal = require('paypal-rest-sdk');
    var config = global.OStore.Config;
    paypal.configure({
        'mode': config.paypal.mode, //sandbox or live
        'client_id': config.paypal.client_id,
        'client_secret': config.paypal.client_secret
    });

    this.createBlankOrder = function (url) {
        var order = {
            "intent": "order",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": url,
                "cancel_url": "http://cancel.url"
            },
            "transactions": [{
                "item_list": {
                    "items": []
                },
                "amount": {
                    "currency": "USD",
                    "total": ""
                },
                "description": "This is the payment description."
            }]
        }
        return order;
    };

    this.transformProduct = function (product, quantity) {
        return {
            "name": product.Name,
            "sku": product._id,
            "price": product.Price,
            "currency": "USD",
            "quantity": quantity
        }
    };

    this.transformCartProducts = function (products) {
        var cartProducts = [];
        for (var i = 0; i < products.length; i++) {
            var cartProduct = products[i];
            cartProducts.push( {
                "name": cartProduct.Product.Name,
                "sku": cartProduct.Product._id,
                "price": cartProduct.Product.Price,
                "currency": "USD",
                "quantity": cartProduct.Quantity
            })
        }
        return cartProducts;
    };
    this.calculateTotalCart = function (products) {
        var total = 0;
        for (var i = 0; i < products.length; i++) {
            var cartProduct = products[i];
            total+= cartProduct.Total;
        }
        return total;
    }


    this.CreateOrderSingleProduct = function (product, quantity, callBack) {
        var order = this.createBlankOrder("http://localhost:3031/#!/products/product/"+ product._id+"/");
        var OrderProduct = this.transformProduct(product, quantity);
        order.transactions[0].item_list.items.push(OrderProduct);
        order.transactions[0].amount.total = quantity * product.Price;
        paypal.payment.create(order, function (error, payment) {
            callBack(error, payment);
        });
    };

    this.CheckOutCartProducts = function (products,callBack) {
        var order = this.createBlankOrder("http://localhost:3031/#!/shopcart/");
        var CartProducts = this.transformCartProducts(products);
        order.transactions[0].item_list.items = CartProducts;
        order.transactions[0].amount.total = this.calculateTotalCart(products);
        paypal.payment.create(order, function (error, payment) {
            callBack(error, payment);
        });
    };

    this.GetOrder = function (orderId) {
        paypal.payment.get(orderId, function (err, payment) {

        });
    }


    this.createExecutePayment = function (payerId, Total) {
        return {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": Total.toString() + ".00"
                }
            }]
        };
    };


    this.ExecuteOrder = function (paymentId,payerId,total, callBack) {
        var executedPayment = this.createExecutePayment(payerId,total);
        paypal.payment.execute(paymentId, executedPayment, function (error, payment) {
            callBack(error, payment);
        });
    };


};