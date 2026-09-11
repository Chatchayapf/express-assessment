import express from "express";
import productRouter from "./routes/products.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// custom Logger Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/", productRouter);
// CRUD

// Centrailize Error Handling Middleware
app.use((err, req, res, next) => {
  return res.status(500).json({
    error: "Something went wrong on ther server...",
    message: err.message,
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT} 🟢`);
});