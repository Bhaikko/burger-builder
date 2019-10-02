const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const passportJWT = require("passport-jwt");

const JWTStrategy = passport.Strategy;
const ExtractJWT = passportJWT.ExtractJwt; 
const { Users } = require("./database/database");
const { TOKEN_SECRET_KEY } = require("./credentials");

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
            else if(!bcrypt.compare(password, user.passport, (err, res) => res))
                return done(null, false, { message: "Incorrect Password or Username" });
            else 
                return done(null, user);
        })
        .catch(err => console.log(err));
}));


passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: TOKEN_SECRET_KEY
}, (jwtPayload, done) => {
        return Users.findOneById(jwtPayload.id)
            .then(user => done(null, user))
            .catch(err => done(err));
}));


// passport.serializeUser((user, done) => done(null, user.id));

// passport.deserializeUser((userId, done) => {
//     Users.findOne({
//         where: {
//             id: userId 
//         }
//     })
//         .then(user => done(null, user))
//         .catch(err => console.log(err));
// });

module.exports = {
    passport 
}
