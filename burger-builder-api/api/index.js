const express = require("express");

const authRouter = require("./auth").router;
const ordersRouter = require("./orders").router;

const router = express.Router();

router.use("/auth", authRouter);
router.use("/orders", ordersRouter);

router.get("/getIngredients", (req, res, next) => {
    const ingredients = {
        bacon: 0,
        cheese: 0,
        meat: 0,
        salad: 0
    }

    res.json(ingredients);
});


module.exports = {
    router
}