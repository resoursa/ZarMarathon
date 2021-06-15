// получение случайного значения в нужном интервале
function getRandom(min = 1, max = 20) {
    return Math.trunc((Math.random() * (max - min)) + min);
}

// получение значения текущего времени
function getCurrentTime() {
    const zeroPrefix = value => value.toString().length > 1 ? value : `0${value}`;
    const date = new Date();
    return `${zeroPrefix(date.getHours())}:${zeroPrefix(date.getMinutes())}`;
}

export { getRandom, getCurrentTime };