const express = require("express");

const authRouter = require("./auth").router;
const ordersRouter = require("./orders").router;

const router = express.Router();

router.use("/auth", authRouter);
router.use("/orders", ordersRouter);


module.exports = {
    router
}