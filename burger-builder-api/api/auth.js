const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const databaseHandler = require("./../database/index");
const { passport } = require("./../passport");
const { TOKEN_SECRET_KEY } = require("./../credentials");

const router = express.Router();

router.get("/", (req, res, next) => {
    res.send("Auth Route Working");
});

router.post("/signup", (req, res, next) =>{
    bcrypt.hash(req.body.password, 10, function(err, password) {
        databaseHandler.addUser(req.body.email, password)
            .then(() => res.sendStatus(200))
            .catch(err => console.log(err));
    });
});


router.post("/login", {session: false}, (req, res, next) => {
    passport.authenticate("user", (err, user, info) => {
        if(err || !user)
        {
            return res.status(400).json({
                message: "Inavlid Email or Password",
                user: user 
            });
        }

        req.login(user, {session: false}, (err) => {
            if(err) {
                res.send(err);
            }

            const token = jwt.sign(user, TOKEN_SECRET_KEY, { expiresIn: '1h' });
            return res.json({
                user, 
                token
            });
        });
    });
});

// This is responsible for protected requests, and act as middleware


router.get("/logout", (req, res, next) => {
    req.logout();
    res.sendStatus(200);
});

module.exports = {
    router
}