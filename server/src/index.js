import express from "express";
import { product } from "./module/Product.js";

const app = express();
app.use(express.json());

// CRUD

// Read product
app.get("/", (req, res, next) => {
    try{
        
    res.json(product);
    } catch(err){
        next(err)
    }
    });

// Create product
app.post("/product", (req, res, next) => {
    try{
    const {username, description, price} = req.body;

    if (!username || !description || !price) {
    return res.json({error: "username, description and price are required!"});
}

    const highestId = users.reduce((max, user)=> 
          Math.max(max,Number(user.id)),0,
    );

    const nextId = String(highestId + 1);

    const newUser = {
        id: nextId, 
        username: username, 
        description: description, 
        price: price,
    };

    users.push(newUser);

    return res.status(201).json(newUser);
    } catch(err){
        next(err);
    }
        
});

// Update product
app.put("/product/:id", (req, res, next) => {
    try{
    const user = product.find((u) => u.id === req.params.id);
      
    if(!user){ // ถ้ามีของ จะไม่โชว์ข้อความพวกนี้
    return res.status(404).json({error: "User not found!"});
 }

// การเข้าถึงข้อมูลใหม่
    const { username, description, price } = req.body;

    if ( !username || !description || !price ) {
     return res
     .status(400)
     .json({ error: "username, email and password are required!" });
}

    user.username = username;
    user.description = description;
    user.price  = price ;

    return res.status(200).json(user);
    } catch(err){
            next(err);
    }
});

// Delete product
app.delete("/product/:id", (req, res, next) => {
    try{
    const index = product.findIndex((u) => u.id === req.params.id);
        
    if (index === -1) {
    return res.status(404).json({ 
            error: "User not found" });
}
    const [deleted] = product.splice(index, 1);
    return res.json(deleted);
  } catch(err){
    next(err);
  }
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
    return res.status(500).json({
        error: "Something went wrong on the server...",
        message: err.message,
    });
});

    const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server runnig on RORT:${PORT}🟢`);
});

