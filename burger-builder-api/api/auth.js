const express = require("express");

const databaseHandler = require("./../database/index");

const router = express.Router();

router.get("/", (req, res, next) => {
    res.send("Auth Route Working");
});

router.post("/addUser", (req, res, next) =>{
    databaseHandler.addUser(req.body.email, req.body.password)
        .then(() => res.send("User Added"))
        .catch(err => console.log(err));
});

module.exports = {
    router
}