export const addPizzaToCart = obj => ({
    type: 'ADD_PIZZA_TO_CART',
    payload: obj,
});

export const minusPizzaFromCart = val => ({
    type: 'MINUS_PIZZA_FROM_CART',
    payload: val,
});

export const removePizzaFromCart = info => ({
    type: 'REMOVE_PIZZA_FROM_CART',
    payload: info,
});

export const clearCart = () => ({
    type: 'CLEAR_CART',
});