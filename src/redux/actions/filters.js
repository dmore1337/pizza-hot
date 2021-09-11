export const setSortBy = ({ type, ord }) => ({
    type: 'SET_SORT_BY',
    payload: {type, ord},
});

export const setCategory = (index) => ({
    type: 'SET_CATEGORY',
    payload: index,
});