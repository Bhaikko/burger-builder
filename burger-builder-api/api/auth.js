const express = require("express");
const bcrypt = require("bcrypt");

const databaseHandler = require("./../database/index");
const { passport } = require("./../passport");

const router = express.Router();

const checkLoginStatus = (req, res, next) => {
    if(!req.user)
    {
        res.sendStatus(300);
        return;
    }
    next();
}

router.get("/", (req, res, next) => {
    res.send("Auth Route Working");
});

router.post("/signup", (req, res, next) =>{
    bcrypt.hash(req.body.password, 10, function(err, password) {
        databaseHandler.addUser(req.body.email, password)
            .then(() => res.send("User Added"))
            .catch(err => console.log(err));
    });
});

router.get("/logout", (req, res, next) => {
    req.logOut();
    res.sendStatus(200);
});

module.exports = {
    router
}