const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample Product Data
let products = [
  {
    id: 1,
    name: "Apple iPhone 14 Pro Max",
    description:
      "The iPhone 14 Pro Max is the latest flagship smartphone from Apple.",
    price: 1099.99,
    currency: "USD",
    brand: "Apple",
    category: "Smartphones",
    sku: "IP14PM-128GB",
    stock: 1500,
    colorOptions: ["Space Gray", "Silver", "Gold", "Deep Purple"],
    sizeOptions: ["128GB", "256GB", "512GB", "1TB"],
    imageUrls: [
      "https://example.com/images/iphone14_1.jpg",
      "https://example.com/images/iphone14_2.jpg",
      "https://example.com/images/iphone14_3.jpg",
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
app.get("/", (req, res) => {
  res.send("Welcome to the E-commerce API!");
});

app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});
app.post("/products", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});
app.put("/products/:id", (req, res) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  products[index] = {
    ...products[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };
  res.json(products[index]);
});
app.delete("/products/:id", (req, res) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  products.splice(index, 1);
  res.json({ message: "Product deleted successfully" });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
