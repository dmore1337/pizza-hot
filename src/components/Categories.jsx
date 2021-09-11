import React from "react";
import PropTypes from "prop-types";

const Categories = React.memo(function Categories({ activeItem, items, onClickItem }) {
    return(
        <div className="categories">
            <ul>
                {items &&
                items.map((name, index) => (
                    <li
                        className={activeItem === index ? 'active' : ''}
                        onClick={() => onClickItem(index)}
                        key={`${name}_${index}`}
                    >
                        {name}
                    </li>
                ))
                }
            </ul>
        </div>
    );
});

Categories.propTypes = {
    activeItem: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.string),
    onClickItem: PropTypes.func.isRequired
};

Categories.defaultProps = {
    activeItem: 0,
    items: ['Все']
};

export default Categories;