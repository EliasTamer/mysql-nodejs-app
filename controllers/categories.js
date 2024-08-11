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