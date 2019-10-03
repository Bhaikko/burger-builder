const Sequelize = require("sequelize");

const { DATABASE_USERNAME, DATABASE_PASSWORD } = require("../credentials");

const database = new Sequelize("burgerBuilder", DATABASE_USERNAME, DATABASE_PASSWORD, {
    host: "localhost",
    dialect: "mysql",
    logging: false 
});

const Users = database.define("users", {
    email: {
        type: Sequelize.STRING,
        unique: {
            args: true,
            msg: "Email Already Exist"
        },
        allowNull: {
            args: false,
            msg: "Required"
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        // len: {
        //     args: [8, 32],
        //     msg: "Password must have 8 charaters."
        // }
    }
});

const Orders = database.define("orders", {
    price: {
        type: Sequelize.STRING
    },
    date: {
        type: Sequelize.DATE
    },
    name: {
        type: Sequelize.STRING,
        allowNull: {
            args: false,
            msg: "Name Required"
        }
    },
    street: {
        type: Sequelize.STRING,
        allowNull: {
            args: false,
            msg: "Street Required"
        }
    },
    zipcode: {
        type: Sequelize.STRING, 
        allowNull: {
            args: false,
            msg: "Zipcode Required"
        }
    },
    email: {
        type: Sequelize.STRING, 
        allowNull: {
            args: false,
            msg: "Email Required"
        }
    },
    country: {
        type: Sequelize.STRING, 
        allowNull: {
            args: false,
            msg: "Country Required"
        }
    },
    method: {
        type: Sequelize.STRING,
        defaultValue: "Fastest"
    }

});

const Ingredients = database.define("ingredients", {
    bacon: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    cheese: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    meat: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    salad: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});

Orders.belongsTo(Users);
Users.hasMany(Orders);

Ingredients.belongsTo(Orders);
Orders.hasOne(Ingredients);

module.exports = {
    database,
    Orders,
    Users,
    Ingredients
}

