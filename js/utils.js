// получение случайного значения в нужном интервале
const getRandom = (min = 1, max = 20) => Math.trunc((Math.random() * (max - min)) + min);

const zeroPrefix = value => value.toString().length > 1 ? value : `0${value}`;
// получение значения текущего времени
const getCurrentTime = () => {
    const date = new Date();
    return `${zeroPrefix(date.getHours())}:${zeroPrefix(date.getMinutes())}`;
}

// создание элемента для DOM
function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

export { getRandom, getCurrentTime, createElement };