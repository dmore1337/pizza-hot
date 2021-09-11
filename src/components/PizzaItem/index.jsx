import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Button from "../Button";

function Index({ id,  imageUrl, name, description, sizes, types, price, onAddPizza, currentCount}) {
    const availableNames = ['Маленькая', 'Средняя', 'Большая'];
    const availableSizes = [26, 30, 40];
    const availableTypes = ['Традиционное', 'Тонкое'];

    const [activeType, setActiveType] = React.useState(0);
    const [activeSize, setActiveSize] = React.useState(0);

    const onSelectType = (index) => {
        setActiveType(index);
    };

    const onSelectSize = (index) => {
        setActiveSize(index);
        if (!types[index].includes(activeType))
        {
            setActiveType(types[index][0]);
        }
    };

    const handleAddPizza = () => {
        const obj = {
            id,
            name,
            imageUrl: imageUrl[activeType][activeSize],
            price: price[activeSize],
            type: availableTypes[activeType],
            size: availableSizes[activeSize]
        };
        onAddPizza(obj);
    };

    return (
        <div className="pizza-item">
            <img
                className="pizza-item__image"
                src={imageUrl[activeType][activeSize]}
                alt="Pizza"
            />
            <div className="pizza-item-info">
                <h4 className="pizza-item-info__title">{name}</h4>
                <p className="pizza-item-info__description">{description}</p>
            </div>
            <div className="pizza-item--selector">
                <div className="pizza-item--selector__line">
                    <div className={classNames( "background3",
                        {
                            "active1": activeSize === 0,
                            "active2": activeSize === 1,
                            "active3": activeSize === 2,
                        })}/>
                    {
                        availableNames.map((size, index) => (
                            <label
                                onClick={() => onSelectSize(index)}
                                key={`${size}_${index}`}
                                className={classNames("option", {
                                    disabled: !sizes[activeType].includes(availableSizes[index]),
                                })}
                            >
                                {size}
                            </label>
                        ))
                    }
                </div>
                <div className="pizza-item--selector__line">
                    <div className={classNames( "background2",
                    {
                        "active1": !activeType,
                        "active2": activeType,
                    })}/>
                    {
                        availableTypes.map((type, index) => (
                            <label
                                onClick={() => onSelectType(index)}
                                key={`${type}_${index}`}
                                className={classNames("option", {
                                    disabled: !types[activeSize].includes(index),
                                })}
                            >
                                {type}
                            </label>
                        ))
                    }
                </div>
            </div>
            <div className="pizza-item-bottom">
                <div className="pizza-item-bottom__price">{price[activeSize]} ₴</div>
                <Button
                    onClick={handleAddPizza}
                    className="button--add"
                    outline >
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    {currentCount && <i>{currentCount}</i>}
                </Button>

            </div>
        </div>
    );
}

Index.propTypes = {
    imageUrl: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    name: PropTypes.string,
    description: PropTypes.string,
    sizes: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    types: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    price: PropTypes.arrayOf(PropTypes.number),
    onAddPizza: PropTypes.func.isRequired,
    currentCount: PropTypes.number,
};

Index.defaultProps = {
    imageUrl: [[], []],
    name: "Название пиццы",
    description: "Описание ингридиентов пиццы",
    sizes: [[], []],
    types: [[], [], []],
    price: [0],
};

export default Index;