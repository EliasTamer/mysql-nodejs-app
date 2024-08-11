const db = require("../db")

exports.createProduct = async (req, res, next) => {
    const { name, description, price, base64Img, categoryId } = req.body;

    try {
        if (!name) {
            const error = new Error("name must not be null")
            error.statusCode = 400;
            throw error;
        }

        const query = 'INSERT INTO product (name, description, price, base64Img, categoryId) VALUES (?, ?, ?, ?, ?)';

        db.query(query, [name, description, price, base64Img, categoryId], (error, results) => {
            if (error) {

                const error = new Error("error inserting product into db");
                error.statusCode = 500;
                throw error;
            }
            res.status(201).json({ message: 'Product inserted successfully', id: results.insertId, name, description, price, categoryId, base64Img });
        });
    }
    catch (error) {
        next(error);
    }
}