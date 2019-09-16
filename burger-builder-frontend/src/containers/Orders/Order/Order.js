import React from 'react';

import classes from './Order.css';

const order = (props) => {
    
    const ingredients = [];
    
    // eslint-disable-next-line
    for(let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span 
            key={ig.name}
            style={{
                textTransform: "capitalize",
                display: "inline-block",
                margin: "0 8px",
                padding: "5px",
                border: "1px solid #ccc"
            }} >{ig.name} ({ig.amount})</span>
    });

    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>$ {(+props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default order;