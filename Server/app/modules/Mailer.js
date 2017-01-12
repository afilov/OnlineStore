module.exports = function Mailer () {

    var config = global.OStore.Config;
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport(config.mailCredentials);


    this.CreateEmail = function (to,subject,text,html) {
        if (!text){
            text = null;
        }
        if (!html){
            html = null;
        }
        var Email = {
            from:'"OStore 👥" <ostore@info.mk>',
            to:to,
            subject:subject,
            text:text,
            html:html
        };
        return Email;
    };


    this.SendWelcomeEmail = function (to, callBack) {
        var Email = this.CreateEmail(to,"Welcome","Welcome to OStore");
        transporter.sendMail(Email, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
    };




};