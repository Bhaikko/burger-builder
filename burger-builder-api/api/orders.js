const express = require("express");

const databaseHandler = require("./../database/index");

const router = express.Router();

router.get("/", (req, res, next) => {
    res.send("Order Route Working");
});

router.get("/getOrders", (req, res, next) => {
    databaseHandler.getOrders()
        .then(orders => res.send(orders));
});

router.post("/addOrder", (req, res, next) => {
    const { userId, ingredientsObject, price, date } = req.body;
    databaseHandler.addOrder(userId, ingredientsObject, price, date)
        .then(() => res.send("Order Added"))
        .catch(err => console.log(err));
    
});


module.exports = {
    router
}