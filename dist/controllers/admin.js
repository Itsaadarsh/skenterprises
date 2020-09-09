"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const user_1 = require("../models/user");
const getAddProduct = (_req, res, _next) => {
    res.render('admin/edit-product', {
        pageTitle: 'ADD PRODUCTS',
        path: '/admin/add-product',
        editing: false,
    });
};
const postAddProduct = (req, res, _next) => {
    user_1.User.find({ select: ['id'] })
        .then(userID => {
        const product = new product_1.Product();
        product.title = req.body.title;
        product.imageUrl = req.body.imageUrl;
        product.price = req.body.price;
        product.description = req.body.description;
        product.userid = userID[userID.length - 1];
        product_1.Product.save(product);
        res.redirect('/');
    })
        .catch(err => console.log(err));
};
const getProducts = (req, res, _next) => {
    product_1.Product.find({ where: { userid: req.userId } })
        .then(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'ADMIN PRODUCTS',
            path: '/admin/products',
        });
    })
        .catch(err => console.log(err));
};
const getEditProduct = (req, res, _next) => {
    const prodId = +req.params.productId;
    const edit = req.query.edit;
    if (edit === 'false')
        res.redirect('/');
    product_1.Product.findOne({ id: +prodId })
        .then(prod => {
        if (!prod)
            res.redirect('/');
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: edit,
            product: prod,
        });
    })
        .catch(err => console.log(err));
};
const postEditProduct = (req, res, _next) => {
    const prodId = +req.body.productId;
    if (typeof prodId === 'number') {
        product_1.Product.update({ id: prodId }, {
            title: req.body.title,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            description: req.body.description,
        });
        res.redirect('/admin/products');
    }
};
const postDeleteProduct = (req, res, _next) => {
    const prodId = +req.body.productId;
    if (typeof prodId === 'number') {
        product_1.Product.delete({ id: prodId });
        res.redirect('/admin/products');
    }
};
exports.default = module.exports = {
    getAddProduct,
    getProducts,
    postAddProduct,
    getEditProduct,
    postEditProduct,
    postDeleteProduct,
};
//# sourceMappingURL=admin.js.map