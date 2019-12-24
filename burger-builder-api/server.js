const express = require("express");
const session = require("express-session");
const cors = require("cors");

const { database } = require("./database/database");
const router = require("./api/index").router;
const { passport } = require("./passport");
const { COOKIE_SECRET_KEY } = require("./environments");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const sessionMiddleware = session({
    secret: COOKIE_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
});

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", router);

const PORT = 4000;
database.sync()
    .then(() => app.listen(PORT, () => console.log(`Database Synced And Server Up And Running At http://127.0.0.1:${PORT}`)));