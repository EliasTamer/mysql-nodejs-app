const db = require("../db")

exports.createCategory = async (req, res, next) => {
    const { name } = req.body;

    try {
        if (!name) {
            const error = new Error("name must not be null")
            error.statusCode = 400;
            throw error;
        }

        const query = 'INSERT INTO category (name) VALUES (?)';

        db.query(query, [name], (error, results) => {
            if (error) {
                const error = new Error("error inserting category into db");
                error.statusCode = 500;
                throw error;
            }
            res.status(201).json({ message: 'Category inserted successfully', id: results.insertId, name });
        });
    }
    catch (error) {
        next(error);
    }
}

exports.getCategories = async (req, res, next) => {

    try {
        const categoriesQuery = "SELECT * From categories"

        const categories = await new Promise((resolve, reject) => {
            db.query(categoriesQuery, [], (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });

        return res.status(401).json({ message: "categories fetched successufly", categories })
    }

    catch (error) {
        next(error)
    }
}