const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const passportJWT = require("passport-jwt");

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt; 
const { Users } = require("./database/database");
const { TOKEN_SECRET_KEY } = require("./environments");

// This is responsible for the initial login on the web app 
passport.use("user", new LocalStrategy({ usernameField: "email", passwordField: "password" }, (username, password, done) => {
    Users.findOne({
        where: {
            email: username 
        } 
    })
        .then(user => {
            if(!user)
                return done(null, false, { message: "Incorrect Password or Username" });

            return bcrypt.compare(password, user.password, function(err, res){
                if(res)
                    return done(null, user);

                return done(null, false, { message: "Incorrect Password or Username" });
            });
        })
        .catch(err => console.log(err));
}));


passport.use("jwt", new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: TOKEN_SECRET_KEY
}, (jwtPayload, done) => {
        return Users.findOne({
           where: jwtPayload.id
        })
            .then(user => done(null, user))
            .catch(err => done(err));
}));

module.exports = {
    passport 
}
