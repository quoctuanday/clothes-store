const { multipleMongooseToObject } = require('../utils/mongoose');
const { mongooseToObject } = require('../utils/mongoose');
const Product = require('../models/Product');

class ProductController {
    showProducts(req, res, next) {
        Product.find({ quantityInStock: { $gt: 0 } })
            .then(products => {
                res.json({ products: multipleMongooseToObject(products) }); //
            })
            .catch(error => {
                console.error('Lỗi khi đưa ra danh sách sản phẩm:', error);
                next(error);
            });
    }
    showProductDetails(req, res, next) {
        const productId = req.params.id;
        Product.findById(productId)
            .then(product => {
                res.json({ product: mongooseToObject(product) });
            })
            .catch(error => {
                console.error('Lỗi khi đưa ra chi tiet san pham:', error);
                next(error);
            });
    }

    deleteProducts(req, res, next) {
        Product.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(err => {
                console.error('Lỗi khi xóa sản phẩm: ', err);
                next(err);
            });
    }

    createProduct(req, res, next) {
        const formData = req.body;
        formData.quantitySold = 0;
        const product = new Product(formData);
        product
            .save()
            .then(() => res.redirect('/admin/products'))
            .catch(err => {
                console.error('Lỗi khi tạo sản phẩm: ', err);
                next(err);
            });
    }

    updateProduct(req, res, next) {
        Product.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.send('updated product successfully'))
            .catch(err => {
                console.error('Lỗi khi update product: ', err);
                next(err);
            });
    }
}

module.exports = new ProductController();
