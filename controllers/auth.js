const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require("uuid");
const db = require("../db")

exports.signUp = async (req, res, next) => {
    const { email, password, name } = req.body;

    try {
        const encryptedPassword = await bcrypt.hash(password, 12);

        if (!email || !name) {
            const error = new Error("email and password are not valid.")
            error.statusCode = 404;
            throw error;
        }

        const query = 'INSERT INTO user (email,name,password) VALUES (?,?,?)';

        db.query(query, [email, name, encryptedPassword], (error, results) => {
            if (error) {
                const error = new Error("error inserting user into db");
                error.statusCode = 500;
                throw error;
            }
            res.status(201).json({ message: 'User created successfully', id: results.insertId, name, email });
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const query = "SELECT * FROM user WHERE email = ?";

        const results = await new Promise((resolve, reject) => {
            db.query(query, [email], (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });

        if (results.length === 0) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        const user = results[0];

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
            const error = new Error("Incorrect password");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({ email: user.email, id: user.id }, "secrethere", { expiresIn: '1h' });

        return res.status(200).json({
            status: "success",
            name: user.name,
            email: user.email,
            token
        });
    } catch (error) {
        console.log("Caught error:", error.message);
        next(error);
    }
};