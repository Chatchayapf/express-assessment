import express from "express";
import Router from "./v1/products.js";

const app = express();
app.use(express.json());
app.use("/", Router);
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