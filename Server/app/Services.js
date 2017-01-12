module.exports = function Services() {
    var Restify = global.OStore.Restify;
    var Modules = global.OStore.Modules;

    //products

    Restify.AddGetService('/get/products', false, Modules.Product.GetAll);

    Restify.AddGetService('/get/category/producs/:_id', false, function (req, res, next) {
        Modules.Product.GetByFilter({CategoryId: req.params._id}, function (err, products) {
            if (err) {
                Restify.RespondError("DB Error");
            }
            else {
                Restify.RespondSuccess(res, products);
            }
        })
    });

    Restify.AddGetService('/get/product/:_id', false, Modules.Product.GetById);

    Restify.AddPostService('/create/product', false, Modules.Product.Create);

    Restify.AddPutService('/update/product', false, Modules.Product.Update);

    Restify.AddPostService('/delete/product', false, Modules.Product.Delete);

    //todo: Return id of the attachment
    Restify.AddPostService('/product/attachment', false, function (req, res, next) {
        if (!req.files.file) {
            Restify.RespondError(res, 401, "No file recieved");
            next();
        }
        else {
            Modules.DMS.SaveFile(req.files.file, function (err, file) {
                Restify.RespondSuccess(res, file);
            });
        }
    });


    //categories

    Restify.AddGetService('/get/categories', false, Modules.Category.GetAll);

    Restify.AddGetService('/get/category/:_id', false, Modules.Category.GetById);

    Restify.AddPostService('/create/category', false, Modules.Category.Create);

    Restify.AddPutService('/update/category', false, Modules.Category.Update);

    Restify.AddPostService('/delete/category', false, Modules.Category.Delete);


    //users

    Restify.AddPostService('/user/authenticate', true, Modules.User.Create);

    Restify.AddPostService('/user/register', true, Modules.User.Create);

    Restify.AddPostService('/user/register', true, function (req, res, next) {
        // Modules.Mailer.SendWelcomeEmail("angelfilov@gmail.com");
    });


};