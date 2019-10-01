const express = require("express");

const { database } = require("./database/database");
const router = require("./api/index").router;

const app = express();

app.use(express.json());
app.unsubscribe(express.urlencoded({ extended: true }));

app.use("/api", router);

const PORT = 4000;
database.sync()
    .then(() => app.listen(PORT, () => console.log(`Database Synced And Server Up And Running At http://127.0.0.1:${PORT}`)));