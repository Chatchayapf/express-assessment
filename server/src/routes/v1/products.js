import { Router } from "express";
import { products } from "../../module/Product.js";

export const router = Router();

// Read All Products (พร้อม Search Query String)
router.get("/", (req, res, next) => {
  try {
    const { search } = req.query;

// ถ้ามีการส่ง ?search= มา ให้ filter กรองตามชื่อที่พิมพ์หามา
    if (search) {
      const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );
      return res.status(200).json(filteredProducts);
    }

// ถ้าไม่มี search ส่งมา ก็คืนค่า products ทั้งหมด
    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

// Read One Product by ID
router.get("/:id", (req, res, next) => {
  try {
    const product = products.find((p) => p.id === req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

// Create product
router.post("/", (req, res, next) => {
  try {
    const { name, price, quantity } = req.body;

    // ใส่ข้อมูลตอนเพิ่มสินค้าไม่ครบ
    if (!name || price == null) {
      return res.status(400).json({ error: "Name and price are required" });
    }

    const newProduct = {
      id: String(Date.now()), // สร้าง ID ด้วย timestamp
      name: name,
      price: Number(price),
      quantity: quantity != null ? Number(quantity) : 1, // ถ้าไม่ส่ง quantity ให้เป็น 1
    };

    // ถ้าใส่ครบจะข้ามมาขั้นตอนนี้
    products.push(newProduct);

    return res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

// Update Product (PUT /:id)
router.put("/:id", (req, res, next) => {
  try {
    const product = products.find((p) => p.id === req.params.id);

    // ในกรณีหา id ไม่เจอ
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const { name, price, quantity } = req.body;

    // ในกรณีใส่ข้อมูลไม่ครบตอนอัปเดต
    if (!name || price == null) {
      return res.status(400).json({ error: "Name and price are required" });
    }

    // ถ้าใส่ครบจะมาอัปเดตตรงนี้
    product.name = name;
    product.price = Number(price);
    product.quantity = quantity != null ? Number(quantity) : product.quantity;

    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

// Delete Product (DELETE /:id)
router.delete("/:id", (req, res, next) => {
  try {
    const index = products.findIndex((p) => p.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: "Product not found" });
    }

    const [deleted] = products.splice(index, 1);

    return res.status(200).json(deleted);
  } catch (err) {
    next(err);
  }
});

