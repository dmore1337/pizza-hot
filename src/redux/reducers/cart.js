const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0
};

const cart = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_PIZZA_TO_CART':
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]:
                        !state.items[action.payload.id]
                            ? {[`${action.payload.type}_${action.payload.size}`]: {item: action.payload, itemCount: 1, itemPrice: action.payload.price}, itemsCount: 1}
                            : !state.items[action.payload.id][`${action.payload.type}_${action.payload.size}`]
                                ? {
                                    ...state.items[action.payload.id],
                                    [`${action.payload.type}_${action.payload.size}`]: {item: action.payload, itemCount: 1, itemPrice: action.payload.price},
                                    itemsCount: state.items[action.payload.id].itemsCount + 1,
                                }
                                : {
                                    ...state.items[action.payload.id],
                                    [`${action.payload.type}_${action.payload.size}`]:
                                        {
                                            ...state.items[action.payload.id].[`${action.payload.type}_${action.payload.size}`],
                                            itemCount: state.items[action.payload.id].[`${action.payload.type}_${action.payload.size}`].itemCount+1,
                                            itemPrice: state.items[action.payload.id].[`${action.payload.type}_${action.payload.size}`].itemPrice + action.payload.price
                                        },
                                    itemsCount: state.items[action.payload.id].itemsCount + 1,
                                }
                },
                totalCount: state.totalCount + 1,
                totalPrice: state.totalPrice + action.payload.price
            };

        case 'MINUS_PIZZA_FROM_CART':
            if(state.items[action.payload.id].[`${action.payload.type}_${action.payload.size}`].itemCount > 1) {
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [action.payload.id]: {
                            ...state.items[action.payload.id],
                            [`${action.payload.type}_${action.payload.size}`]: {
                                ...state.items[action.payload.id].[`${action.payload.type}_${action.payload.size}`],
                                itemCount: state.items[action.payload.id].[`${action.payload.type}_${action.payload.size}`].itemCount - 1,
                                itemPrice: state.items[action.payload.id].[`${action.payload.type}_${action.payload.size}`].itemPrice - action.payload.price
                            },
                            itemsCount: state.items[action.payload.id].itemsCount - 1,
                        }
                    },
                    totalCount: state.totalCount - 1,
                    totalPrice: state.totalPrice - action.payload.price
                };
            }
            return { ...state };


        case 'REMOVE_PIZZA_FROM_CART':
            const newItems = {
                ...state.items,
                [action.payload.id]: {
                    ...state.items.[action.payload.id],
                    itemsCount: state.items.[action.payload.id].itemsCount - action.payload.count,
                }
            };
            delete newItems.[action.payload.id].[`${action.payload.type}_${action.payload.size}`];
            if (Object.keys(newItems.[action.payload.id]).length === 1) {
                delete newItems.[action.payload.id];
            }
            return {
                ...state,
                items: newItems,
                totalCount: state.totalCount - action.payload.count,
                totalPrice: state.totalPrice - action.payload.itemPrice
            };

        case 'CLEAR_CART':
            return {
                ...initialState
            };

        default:
            return state
    }
};

export default cart;