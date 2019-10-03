const express = require("express");

const databaseHandler = require("./../database/index");
const passport = require("./../passport").passport;

const router = express.Router();

router.get("/", (req, res, next) => {
    res.send("Order Route Working");
});

router.get("/getOrders", (req, res, next) => {
    // console.log(req.user.id);
    databaseHandler.getOrders(req.user.id)
        .then(orders => res.send(orders))
        .catch(err => console.log(err));
});

router.post("/addOrder", (req, res, next) => {
//    console.log(req.body);
//    console.log(req.user.id);

   const orderData = { ...req.body.orderData };

   databaseHandler.addOrder(req.user.id, req.body.ingredients, req.body.price, new Date(), orderData)
    .then(response => res.sendStatus(200))
    .catch(err => res.sendStatus(400));

});


module.exports = {
    router
}