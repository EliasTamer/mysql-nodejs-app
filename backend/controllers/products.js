const db = require("../db")

exports.createProduct = async (req, res, next) => {
    const { name, description, price, base64Img, categoryId, quantity } = req.body;

    try {
        if (!name) {
            const error = new Error("name must not be null")
            error.statusCode = 400;
            throw error;
        }

        const query = 'INSERT INTO products (name, description, price, base64Img, categoryId,quantity) VALUES (?, ?, ?, ?, ?, ?)';

        db.query(query, [name, description, price, base64Img, categoryId, quantity], (error, results) => {
            if (error) {

                const error = new Error("error inserting product into db");
                error.statusCode = 500;
                throw error;
            }
            res.status(201).json({ message: 'Product inserted successfully', id: results.insertId, name, description, price, categoryId, base64Img, quantity });
        });
    }
    catch (error) {
        next(error);
    }
}

exports.productDetails = async (req, res, next) => {
    const { id } = req.params

    try {
        const productDetailsQuery = "SELECT * FROM products WHERE id=?"

        const product_details_result = await new Promise((resolve, reject) => {
            db.query(productDetailsQuery, [id], (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });

        const product = product_details_result[0];

        if (!product) {
            const error = new Error("product doesn't exist.")
            error.statusCode = 404;
            throw error;
        }

        const relatedProductsQuery = "SELECT * FROM products WHERE categoryId=? and id !=?"

        const relatedProducts = await new Promise((resolve, reject) => {
            db.query(relatedProductsQuery, [product.categoryId, id], (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });

        res.status(201).json({ message: 'product fetched successfuly.', ...product, relatedProducts });
    }
    catch (error) {
        next(error)
    }
}

exports.products = async (req, res, next) => {
    const { name, price, categoryId } = req.body

    let productsQuery = "SELECT * FROM products WHERE 1=1 "
    let params = []

    if (name) {
        productsQuery += 'AND name LIKE ? ';
        params.push(`%${name}%`);
    }

    if (price) {
        productsQuery += 'AND price =? '
        params.push(price)
    }

    if (categoryId) {
        productsQuery += 'AND categoryId =?'
        params.push(categoryId)
    }

    const products = await new Promise((resolve, reject) => {
        db.query(productsQuery, params, (error, results) => {
            if (error) reject(error);
            else resolve(results);
        });
    });

    return res.status(401).json({ message: "products fetched successfuly", products })

}