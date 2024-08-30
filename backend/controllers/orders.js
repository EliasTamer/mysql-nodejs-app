const db = require("../db")

exports.placeOrder = async (req, res, next) => {
    const { product_id, user_id, quantity } = req.body;
    console.log(quantity);

    try {
        const product_details_query = "SELECT * FROM products WHERE id=?"

        const product_details_result = await new Promise((resolve, reject) => {
            db.query(product_details_query, [product_id], (error, results) => {
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

        if (product.quantity < quantity) {
            const error = new Error("quantity unavailable.")
            error.statusCode = 404;
            throw error;
        }

        const order_query = "INSERT INTO orders (user_id,product_id,quantity) VALUES (?,?,?)"

        const order_results = await new Promise((resolve, reject) => {
            db.query(order_query, [user_id, product_id, quantity], (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });


        const update_product_quantity_query = "UPDATE products SET quantity=? WHERE id=?";

        await new Promise((resolve, reject) => {
            db.query(update_product_quantity_query, [product.quantity - 1, product_id], (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });

        res.status(201).json({ message: 'order placed successufly.', id: order_results.insertId });

    }
    catch (error) {
        next(error);
    }
}