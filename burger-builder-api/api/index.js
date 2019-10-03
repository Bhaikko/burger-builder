const express = require("express");

const authRouter = require("./auth").router;
const ordersRouter = require("./orders").router;
const passport = require("./../passport").passport;

const router = express.Router();

router.use("/auth", authRouter);
router.use("/orders", passport.authenticate("jwt", { session: false }), ordersRouter);

router.get("/getIngredients", (req, res, next) => {
    const data = {
        ingredients: {
            bacon: 0,
            cheese: 0,
            meat: 0,
            salad: 0
        },
        prices: {
            salad: 0.5,
            cheese: 0.4,
            meat: 1.3,
            bacon: 0.7
        },
        totalPrice: 4
    }

    res.json(data);
});


module.exports = {
    router
}