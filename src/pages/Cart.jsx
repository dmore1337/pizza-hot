import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { CartItem, Button } from "../components";
import { clearCart, removePizzaFromCart, addPizzaToCart, minusPizzaFromCart } from "../redux/actions/cart";
import cartEmptyImage from "../assets/img/empty.svg";

function Cart() {
    const dispatch = useDispatch();

    const { items, totalCount, totalPrice } = useSelector(({ cart }) => ({
        items: [].concat.apply([], Object.values(cart.items).map((item) => (Object.values(item)))).filter(item => Object.keys(item).length>0),
        totalCount: cart.totalCount,
        totalPrice: cart.totalPrice,
    }));

    const onClearCart = () => {
        if (window.confirm('Вы действительно хотите очистить корзину?')) {
            dispatch(clearCart());
        }
    };

    const onRemovePizza = (obj) => {
        if (window.confirm('ВЫ действительно хотите удалить пиццу?')) {
            dispatch(removePizzaFromCart(obj));
        }
    };

    const onPlusPizza = (obj) => {
        dispatch(addPizzaToCart(obj));
    };

    const onMinusPizza = (obj) => {
        dispatch(minusPizzaFromCart(obj));
    };

    const onReturnCart = () => {
        console.log('Ваш заказ', items);
    };

    return (
        <div className="container container--cart">
            {
                totalCount
                    ?   <div className="cart">
                            <div className="cart__section top">
                                <h2>
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9 24C7.35 24 6 25.35 6 27C6 28.65 7.35 30 9 30C10.65 30 12 28.65 12 27C12 25.35 10.65 24 9 24ZM0 0V3H3L8.4 14.4L6.3 18C6.15 18.45 6 19.05 6 19.5C6 21.15 7.35 22.5 9 22.5H27V19.5H9.6C9.45 19.5 9.3 19.35 9.3 19.2V19.0499L10.65 16.4999H21.75C22.95 16.4999 23.85 15.8999 24.3 14.9999L29.7 5.25C30 4.95 30 4.8 30 4.5C30 3.6 29.4 3 28.5 3H6.3L4.95 0H0ZM24 24C22.35 24 21 25.35 21 27C21 28.65 22.35 30 24 30C25.65 30 27 28.65 27 27C27 25.35 25.65 24 24 24Z"
                                            fill="#181818"/>
                                    </svg>
                                    Корзина
                                </h2>
                                <div onClick={onClearCart} className="cart__clear">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.5 5H4.16667H17.5" stroke="black" strokeWidth="1.2" strokeLinecap="round"
                                              strokeLinejoin="round"/>
                                        <path
                                            d="M6.66675 5.00001V3.33334C6.66675 2.89131 6.84234 2.46739 7.1549 2.15483C7.46746 1.84227 7.89139 1.66667 8.33342 1.66667H11.6667C12.1088 1.66667 12.5327 1.84227 12.8453 2.15483C13.1578 2.46739 13.3334 2.89131 13.3334 3.33334V5.00001M15.8334 5.00001V16.6667C15.8334 17.1087 15.6578 17.5326 15.3453 17.8452C15.0327 18.1577 14.6088 18.3333 14.1667 18.3333H5.83341C5.39139 18.3333 4.96746 18.1577 4.6549 17.8452C4.34234 17.5326 4.16675 17.1087 4.16675 16.6667V5.00001H15.8334Z"
                                            stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M8.33325 9.16667V14.1667" stroke="black" strokeWidth="1.2" strokeLinecap="round"
                                              strokeLinejoin="round"/>
                                        <path d="M11.6667 9.16667V14.1667" stroke="black" strokeWidth="1.2" strokeLinecap="round"
                                              strokeLinejoin="round"/>
                                    </svg>
                                    <span>Очистить корзину</span>
                                </div>
                            </div>
                            <div className="cart__items">
                                {
                                    items.map((obj, index) =>
                                        <CartItem
                                            key={`${obj.item.name}_${index}`}
                                            id={obj.item.id}
                                            imageUrl={obj.item.imageUrl}
                                            name={obj.item.name}
                                            type={obj.item.type}
                                            size={obj.item.size}
                                            price={obj.item.price}
                                            itemCount={obj.itemCount}
                                            itemPrice={obj.itemPrice}
                                            onRemovePizza={onRemovePizza}
                                            onPlusPizza={onPlusPizza}
                                            onMinusPizza={onMinusPizza}
                                        />
                                    )
                                }
                            </div>
                            <div className="cart__bottom">
                                <div className="cart__bottom-details">
                                    <span> Всего пицц: <b>{totalCount} шт.</b> </span>
                                    <span> Сумма заказа: <b>{totalPrice} ₴</b> </span>
                                </div>
                                <div className="cart__bottom-buttons">
                                    <Link to="/">
                                        <Button className={"button--add go-back"} outline>
                                            <svg width="8" height="14" viewBox="0 0 8 14" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7 13L1 6.93015L6.86175 1" stroke="#181818" strokeWidth="1.5"
                                                      strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>Вернуться назад</span>
                                        </Button>
                                    </Link>
                                    <Button onClick={onReturnCart} className={"pay-btn"}>
                                        <span>Оплатить сейчас</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    :   <div className="cart cart--empty">
                            <h2>Корзина пустая <icon>😕</icon></h2>
                            <p>
                                Вероятней всего, вы ещё не заказывали пиццу.<br/>
                                Для того, чтобы заказать пиццу, перейдите на главную страницу.
                            </p>
                            <img src={cartEmptyImage} alt="empty cart"/>
                                <Link to="/">
                                    <Button className="button button--black">
                                        <span>Вернуться назад</span>
                                    </Button>
                                </Link>
                        </div>
            }

        </div>
    );
}

export default Cart;