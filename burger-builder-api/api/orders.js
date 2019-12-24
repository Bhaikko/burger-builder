const express = require("express");


const databaseHandler = require("./../database/index");
const { MAILGUN_API_KEY, DOMAIN } = require("./../environments");
const mailgun = require("mailgun-js")({ apiKey: MAILGUN_API_KEY, domain: DOMAIN }); // This uses authorized recipients method of mailgun

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

   const orderData = { ...req.body.orderData };

   databaseHandler.addOrder(req.user.id, req.body.ingredients, req.body.price, new Date(), orderData)
    .then(response => {
        const data = {
            from: "xyz@gmail.com",
            to: orderData.email,
            subject: "test",
            text: `
                Hi There,
                You Placed an order of
                Salad: ${req.body.ingredients.salad}
                Cheese: ${req.body.ingredients.cheese}
                Bacon: ${req.body.ingredients.bacon}
                Meat: ${req.body.ingredients.meat}

                and Your Total Is: ${req.body.price}
            `
        };

        mailgun.messages().send(data, function(error, body){
            res.sendStatus(200);
        });
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(400)
    });

});


module.exports = {
    router
}