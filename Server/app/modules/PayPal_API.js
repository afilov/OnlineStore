module.exports = function Mandrill_API () {
    var paypal = require('paypal-rest-sdk');
    var config = global.OStore.Config;
    paypal.configure({
        'mode': config.paypal.mode, //sandbox or live
        'client_id': config.paypal.client_id,
        'client_secret': config.paypal.client_secret
    });


    var card_data = {
        "type": "visa",
        "number": "4417119669820331",
        "expire_month": "11",
        "expire_year": "2018",
        "cvv2": "123",
        "first_name": "Joe",
        "last_name": "Shopper"
    };

    paypal.creditCard.create(card_data, function(error, credit_card){
        if (error) {
            console.log(error);
            throw error;
        } else {
            console.log("Create Credit-Card Response");
            console.log(credit_card);
        }
    })

};