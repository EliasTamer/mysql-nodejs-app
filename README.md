# What is this project?

this is a node backend that serves endpoints for an e-commerce app.

1- modify your env variables in the compose.yaml file. (mainly everything related to database credentials, rest can stay the same)

2- run the app, this should create 2 docker containers, one for the MySQL database and another one for the node backend.

```
docker compose up --build
```

3- watch for local changes so that you can sync them directly to your docker container

``` 
docker compose watch
```

this should create 2 docker containers, one for the MySQL database and another one for the node backend.


4- run the below queries inside your MySQL container terminal to create the needed tables.

```
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price INT NOT NULL,
    base64Img LONGTEXT,
    categoryId INT NOT NULL,
    quantity INT NOT NULL,
    UNIQUE KEY (name),
    FOREIGN KEY (categoryId) REFERENCES categories(id)
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY (email),
    UNIQUE KEY (name),
    UNIQUE KEY (password)
);

```