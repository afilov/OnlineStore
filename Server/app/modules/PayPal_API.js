"use strict";
module.exports = function Mandrill_API () {
    var paypal = require('paypal-rest-sdk');
    var config = global.OStore.Config;
    paypal.configure({
        'mode': config.paypal.mode, //sandbox or live
        'client_id': config.paypal.client_id,
        'client_secret': config.paypal.client_secret
    });

    //
    // var card_data = {
    //     "type": "visa",
    //     "number": "4417119669820331",
    //     "expire_month": "11",
    //     "expire_year": "2018",
    //     "cvv2": "123",
    //     "first_name": "Joe",
    //     "last_name": "Shopper"
    // };
    //
    // paypal.creditCard.create(card_data, function(error, credit_card){
    //     if (error) {
    //         console.log(error);
    //         throw error;
    //     } else {
    //         console.log("Create Credit-Card Response");
    //         console.log(credit_card);
    //     }
    // })

    var create_payment_json = {
        "intent": "order",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://return.url",
            "cancel_url": "http://cancel.url"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    "price": "1.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "1.00"
            },
            "description": "This is the payment description."
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {

        }
    });

};