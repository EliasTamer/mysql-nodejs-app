require("dotenv").config();
const express = require("express");
const mysql = require('mysql2');
const cors = require("cors");
const app = express();

const port = process.env.PORT || 3001;

const categoriesRoutes = require("./routes/categories")
const productsRoutes = require("./routes/products")
const authRoutes = require("./routes/auth")
const ordersRoutes = require("./routes/orders")

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/orders", ordersRoutes);


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});


app.get('/', (req, res) => {
    const dummyData = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        message: 'Hello, this is some dummy data!'
    };

    res.json(dummyData);
});

// to handle the thrown errors in my controllers
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({
        message: message,
        data: data,
    });
});

app.listen(port, () => {
    connection.connect(err => {
        if (err) {
          console.error('Error connecting to MySQL:', err.stack);
          return;
        }
        console.log('Connected to MySQL as id ' + connection.threadId);
      });
});