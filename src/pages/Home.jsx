import React from "react";
import {useDispatch, useSelector} from "react-redux";

import {Categories, Sort, PizzaItem, PizzaLoadingItem} from "../components";

import {setCategory, setSortBy} from '../redux/actions/filters';
import { fetchPizzas } from "../redux/actions/pizzas";
import {addPizzaToCart} from "../redux/actions/cart";

const categoryNames = [ 'Все', 'Мясные', 'Вегетарианские', 'Острые'];
const sortNames = [
    {name: 'популярности', type: 'rating', ord: 'desc'},
    {name: 'цене', type: 'price', ord: 'asc'},
    {name: 'алфавиту', type:'name', ord: 'asc'}
];

function Home( ) {
    const dispatch = useDispatch();
    const {items, isLoaded, category, sortBy, cartItems} = useSelector(({ pizzas, filters, cart }) => ({
        items: pizzas.items,
        isLoaded: pizzas.isLoaded,
        category: filters.category,
        sortBy: filters.sortBy,
        cartItems: cart.items,
    }));

    React.useEffect(() => {
        dispatch(fetchPizzas(category, sortBy));
    }, [category, sortBy]);

    const onSetCategory = React.useCallback((index) => {
        dispatch(setCategory(index));
    }, []);

    const onSetSort = React.useCallback((type) => {
        dispatch(setSortBy(type));
    }, []);

    const onSetPizzaToCart = obj => {
        dispatch(addPizzaToCart(obj));
    };

    return (
        <div className="container container--pizzas">
            <div className="content">
                <div className="content__top">
                    <Categories
                        activeItem={category}
                        items = {categoryNames}
                        onClickItem={onSetCategory}
                    />
                    <Sort
                        activeItem={sortBy.type}
                        items = {sortNames}
                        onClickItem={onSetSort}

                    />
                </div>
                <div className="content__items">
                    { isLoaded
                        ? items.map((item) => (
                            <PizzaItem
                                onAddPizza={onSetPizzaToCart}
                                key={item.id}
                                currentCount={cartItems[item.id] && cartItems[item.id].itemsCount}
                                {...item}
                            />
                        ))
                        : Array(6)
                            .fill(0)
                            .map((_, index) => <PizzaLoadingItem key={index} />)
                    }
                </div>
            </div>
        </div>
    );
}

export default Home;