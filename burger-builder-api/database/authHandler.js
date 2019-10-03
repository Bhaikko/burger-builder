const { Users, Orders, Ingredients } = require("./database");

const { databaseParser } = require("./utility");

const addUser = (email, password) => {
    return Users.create({
        email,
        password 
    })
        .then(user => user);
}

const getUser = (email) => {
    return Users.findOne({
        email 
    })
        .then(user => user);
}

module.exports = {
    getUser,
    addUser
}