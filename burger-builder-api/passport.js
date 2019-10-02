const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const { Users } = require("./database/database");

passport.use("user", new LocalStrategy((username, password, done) => {
    Users.findOne({
        where: {
            email: username 
        } 
    })
        .then(user => {
            if(!user)
                return done(null, false, { message: "Incorrect Password or Username" });
            else if(!bcrpyt.compare(password, user.passport, (err, res) => res))
                return done(null, false, { message: "Incorrect Password or Username" });
            else 
                return done(null, user);
        })
        .catch(err => console.log(err));
}));


passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((userId, done) => {
    Users.findOne({
        where: {
            id: userId 
        }
    })
        .then(user => done(null, user))
        .catch(err => console.log(err));
});

module.exports = {
    passport 
}
