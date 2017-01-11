module.exports = function Mandrill_API () {

    var mandrill = require('mandrill-api/mandrill');
    var config = globa.OStore.Config;

    var mandrill_client = new mandrill.Mandrill(config.mandrill.apiKey);

    var async = false;
    var ip_pool = "Main Pool";

    this.SendEmailByTemplate = function (sender, recepient, subject, body, template_name, template_content, callBack) {
        var message = {
            "from_email": sender,
            "to": [{
                "email": recepient,
                "type": "to"
            }]
        };

        if (subject.length > 0) {
            message['subject'] = subject;
        }

        mandrill_client.messages.sendTemplate({
            "template_name": template_name,
            "template_content": template_content,
            "message": message,
            "async": async,
            "ip_pool": ip_pool,
        }, function (result) {
            callBack(null, result);
        }, function (e) {
            callBack(e, null);
        });
    };

    this.SendWelcomeEmail = function (to, callBack) {
        var template = config.mandrill.En.Welcome;
        this.SendEmailByTemplate(config.mandrill.Email, to, "", "", template, [{
            "name": "header",
            "content": "<h2>Your Order is Complete</h2>"
        }, {
            "name": "main",
            "content": "We appreciate your business. Your order information is below."
        }], function (err, result) {
            callBack(err, result);
        });
    };



};