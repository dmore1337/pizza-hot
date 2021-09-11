import axios from "axios";

export const setLoaded = val => ({
    type: 'SET_LOADED',
    payload: val,
});

export const setPizzas = (items) => ({
    type: 'SET_PIZZAS',
    payload: items,
});

export const fetchPizzas = (category, sortBy) => (dispatch) => {
    dispatch(setLoaded(false));
    axios.get(`/pizzas?${category >0 ? `category=${category}` : ''}&_sort=${sortBy.type}&_order=${sortBy.ord}`).then(({ data }) => {
        dispatch(setPizzas(data));
    });
};