
module.exports = function Services () {
    var Restify = global.OStore.Restify;
    var Modules = global.OStore.Modules;


    //products end points

    Restify.AddGetService('/get/products',false,Modules.Product.GetAll);

    Restify.AddPostService('/create/product',false,Modules.Product.Create);


    //user end points

    //todo: Create Method for authentcate
    Restify.AddGetService('/user/authenticate',false,Modules.User.Create);

    Restify.AddGetService('/user/register',false,Modules.User.Create);


};