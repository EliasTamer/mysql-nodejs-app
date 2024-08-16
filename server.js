require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 3001;

const categoriesRoutes = require("./routes/categories")
const productsRoutes = require("./routes/products")
const authRoutes = require("./routes/auth")

app.use(express.json());
app.use(cors());


app.use("/api/auth", authRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/orders", productsRoutes);


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
    console.log(`Server is running on post ${port}`);
});

