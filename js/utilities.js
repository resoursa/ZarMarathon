// вспомогательные функции для создания игрока в DOM
const buildElement = tag => attr => func => func(tag, attr);
const withClassName = (tag, className) => {
    const $el = document.createElement(tag);
    $el.classList.add(className);
    return $el;
};
const withSrc = (tag, src) => {
    const $el = document.createElement(tag);
    $el.src = src;
    return $el;
};
const getDiv = buildElement('div');
const getImg = buildElement('img');

export { getDiv, getImg, withClassName, withSrc };