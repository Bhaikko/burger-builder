const {
    getOrders,
    addOrder
} = require("./ordersHandler");

const {
    addUser,
    getUser
} = require("./authHandler");

module.exports = {
    getOrders,
    addOrder,
    getUser,
    addUser
}