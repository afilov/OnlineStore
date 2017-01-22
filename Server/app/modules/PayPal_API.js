"use strict";
module.exports = function PayPal_API() {
    var paypal = require('paypal-rest-sdk');
    var mongoose = require('mongoose');
    var config = global.OStore.Config;


    var queue = require('queue');
    var paypalCheckQueue = queue();
    var OrderModel = mongoose.model('Order');
    paypal.configure({
        'mode': config.paypal.mode, //sandbox or live
        'client_id': config.paypal.client_id,
        'client_secret': config.paypal.client_secret
    });

    this.Init = function () {
        setPayPalCheck();
    };
    paypalCheckQueue.on('timeout', function (next, job) {
        console.error("Confirm PAYPAL: TIMEOUT ERROR " + job.PayPalID + " " + new Date().toString());
        GetPayPalOrderFromDatabase(job.PayPalOrderID, function (err,curOrder) {
            if (err){
                console.error("Error on getting order from DB!");
            }
            else {
                curOrder.DateConfirmed = new Date();
                curOrder.Confirmed = true;
                curOrder.save(function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        });
        next();
    });

    var addPayPalConfirmCheckInQueue = function (PayPalOrderID) {
        var qFunc = function (cb) {
            confirmPayPal(PayPalOrderID, function (error,payment) {
                var DateCompleted = new Date();
                var Completed = true;
                if (error && error.response.name.toLowerCase() != "payment_already_done"){
                    DateCompleted = new Date();
                    Completed = false;
                }
                OrderModel.findOneAndUpdate({PayPalId:PayPalOrderID},
                    {$set:{Completed:Completed,DateCompleted:DateCompleted,DateConfirmed:new Date(),Confirmed:true}},function (err,order) {
                    if (err){
                        console.error("Error on confirming order PayPalOrderID")
                    }
                    cb();
                })
            });
        };

        qFunc.PayPalOrderID = PayPalOrderID;

        paypalCheckQueue.push(qFunc);
    }

    var GetPayPalOrderFromDatabase = function (ppID, callBack) {
        OrderModel.findOne({PayPalId: ppID}, function (err, order) {
            callBack(err, order);
        })
    };



    var confirmPayPal = function (orderId,callBack) {
        paypal.payment.get(orderId, function (err, payment) {
            var payerId = payment.payer.payer_info.payer_id;
            var executedPayment = this.createExecutePayment(payerId, "");
            executedPayment.transactions = payment.transactions;
            paypal.payment.execute(orderId, executedPayment, function (error, payment) {
                callBack(error,payment);
            }.bind(this));
        }.bind(this));
    }.bind(this);
    function payPalCheck() {
        if (paypalCheckQueue.length > 0) {
            console.log('paypalCheckQueue still working, pending checks: ' + paypalCheckQueue.length);
            return;
        }

        console.log("paypal Check " + new Date().toString());

        paypalCheckQueue.timeout = 30000;
        paypalCheckQueue.concurrency = 1;

        var queueStartCounter = 0;

        var startQueue = function () {
            queueStartCounter++;
            if(queueStartCounter >= 1 && paypalCheckQueue.running == false){
                paypalCheckQueue.start(function(err) {
                    console.log('paypal queue check finished!');
                });
            }
        };

        var date = new Date();
        date.setMinutes(date.getMinutes() - 30);


        OrderModel.find({$and: [{DateCreated: {$lte: date}}, {DateCompleted: {$eq: null}}, {DateConfirmed: {$eq: null}}]}, function (err, curOrders) {
            console.log("Confirming Orders on timer, total: " + curOrders.length + " " + new Date().toString());
            for (var i = 0; i < curOrders.length; i++) {
                addPayPalConfirmCheckInQueue(curOrders[i].PayPalId);
            }
            startQueue();
        }, function (error) {
            console.error(error);
            startQueue();
        });
    }

    function setPayPalCheck() {
        var minutes = 2, the_interval = minutes * 60 * 1000;
        setInterval(payPalCheck, the_interval);
    }

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
            cartProducts.push({
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
            total += cartProduct.Total;
        }
        return total;
    }


    this.CreateOrderSingleProduct = function (product, quantity, callBack) {
        var order = this.createBlankOrder("http://localhost:3031/#!/products/product/" + product._id + "/");
        var OrderProduct = this.transformProduct(product, quantity);
        order.transactions[0].item_list.items.push(OrderProduct);
        order.transactions[0].amount.total = quantity * product.Price;
        paypal.payment.create(order, function (error, payment) {
            callBack(error, payment);
        });
    };

    this.CheckOutCartProducts = function (products, callBack) {
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

    this.ValidateExistingOrders = function () {

    };


    this.ExecuteOrder = function (paymentId, payerId, total, callBack) {
        var executedPayment = this.createExecutePayment(payerId, total);
        paypal.payment.execute(paymentId, executedPayment, function (error, payment) {
            callBack(error, payment);
        });
    };


};