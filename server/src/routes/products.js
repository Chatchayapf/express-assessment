import express from "express";
import { products } from "../module/Product.js";

const router = express.Router();

// read all product
router.get("/products", (req, res, next) => {
  try {
    const { name } = req.query;
    let filteredProducts = products;
    if (name) {
      filteredProducts = filteredProducts.filter((item) => {
        return item.name.toLocaleLowerCase().includes(name.toLocaleLowerCase());
      });
    }
    return res.status(200).send(filteredProducts);
  } catch (err) {
    next(err);
  }
});

// read product by id
router.get("/products/:id", (req, res, next) => {
  try {
    const product = products.find((p) => p.id === req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found!" });
    }

    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

// create product
router.post("/products", (req, res, next) => {
  try {
    const { name, price, quantity } = req.body;

    if (!name || !price || !quantity) {
      return res
        .status(400)
        .json({ error: "name, price, quantity are required! " });
    }

    // const hightestId = products.reduce(
    //   (max, product) => Math.max(max, Number(product.id)),
    //   0,
    // );

    const nextId = `prod-${Date.now()}`;

    const newProduct = {
      id: nextId,
      name: name,
      price: price,
      quantity: quantity,
    };

    products.push(newProduct);
    return res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

// Update products
router.patch("/products/:id", (req, res, next) => {
  try {
    const product = products.find((p) => p.id === req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found!" });
    }
    const { name, price, quantity } = req.body;

    if (!name || !price || !quantity) {
      return res
        .status(400)
        .json({ error: "name, price, quantity are required!" });
    }

    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.quantity = quantity ?? product.quantity;

    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

// Delete Users
router.delete("/products/:id", (req, res, next) => {
  try {
    const product = products.find((p) => p.id === req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found!" });
    }

    const index = products.indexOf(product);
    products.splice(index, 1);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;