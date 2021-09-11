import React from "react";
import PropTypes from "prop-types";

const Sort = React.memo(function Sort({ activeItem, items, onClickItem })  {

    const [visiblePopup, setVisiblePopup] = React.useState(false);
    const popupRef = React.useRef();
    const activeLabel = items.find(obj => obj.type === activeItem).name;

    const onSelectItem = (type) => {
        onClickItem(type);
        setVisiblePopup(false);
    }

    const toggleVisiblePopup = () => {
        setVisiblePopup(!visiblePopup);
    }

    const handleOutsideClick = (e) => {
        if (!e.path.includes(popupRef.current)) {
            setVisiblePopup(false);
        }
    }

    React.useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick);
    }, []);

    return (
        <div
            ref={popupRef}
            className="sort">
            <div className="sort__label">
                <svg className={visiblePopup ? "active" : ""} width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 7L11 1" stroke="#181818" strokeWidth="2"/>
                </svg>
                <b>Сортировка по:</b>
                <span onClick={toggleVisiblePopup}>{activeLabel}</span>
            </div>
            {visiblePopup &&
            <div className="sort__popup">
                <ul>
                    {items &&
                    items.map((item, index) => (
                        <li
                            className={activeItem === item.type ? 'active' : ''}
                            onClick={() => onSelectItem(item)}
                            key={`${item.name}_${index}`}
                        >
                            {item.name}
                        </li>
                    ))
                    }
                </ul>
            </div>
            }
        </div>
    );
});

Sort.propTypes = {
    activeItem: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
    onClickItem: PropTypes.func.isRequired
};

Sort.defaultProps = {
    activeItem: 'popular',
    items: [{name:'популярности', type:'popular'}],
};

export default Sort;