const { Users, Orders, Ingredients } = require("./database");

const { databaseParser } = require("./utility");

const getOrders = (userId) => {
    return Orders.findAll({
        where: userId 
    })
        .then(orders => {
            if(!orders)
                return {};

            if(typeof orders == "string")
                orders = [orders];

            return databaseParser(orders);
        })
        .catch(message => message);
}

const addOrder = (userId, ingredientsObject, price, date) => {

    return Orders.create({
        userId,
        price,
        date
    })
        .then(order => {
            return Ingredients.create({
                salad: ingredientsObject.salad,
                bacon: ingredientsObject.bacon,
                meat: ingredientsObject.meat,
                cheese: ingredientsObject.cheese,
                orderId: order.id
            });     
        });
}

module.exports = {
    getOrders,
    addOrder
}