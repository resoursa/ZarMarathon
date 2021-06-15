function getRandom(min = 1, max = 20) {
    return Math.trunc((Math.random() * (max - min)) + min);
}

export default getRandom;