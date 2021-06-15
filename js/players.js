// объекты игроков
const userPlayer = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    lastDamage: 0,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    attack,
    changeHP,
    elHP,
    renderHP,
    toStringHP
};

const enemyPlayer = {
    player: 2,
    name: 'SUB-ZERO',
    hp: 100,
    lastDamage: 0,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['weapon2', 'weapon3'],
    attack,
    changeHP,
    elHP,
    renderHP,
    toStringHP
};

// атака игрока
function attack() {
    console.log(this.name + ' ' + 'Fight...');
}

// определение элемента отображаещего кол-во здоровья игрока
function elHP() {
    const selector = `.player${this.player} .life`;
    return document.querySelector(selector);
}

// отображение количества здоровья игрока
function renderHP() {
    const $life = this.elHP();
    $life.style.width = this.hp + '%';
}

// вывод здоровья игрока в форме [hp/100]
function toStringHP() {
 return `[${this.hp}/100]`;
}

// изменение количества здоровья игрока
function changeHP(healthDamage) {
    const newHP = this.hp - healthDamage;
    this.hp = newHP < 0 ? 0 : newHP;
    this.lastDamage = -healthDamage;
}

export { userPlayer, enemyPlayer };