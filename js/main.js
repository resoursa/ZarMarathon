// объекты игроков
const player1 = {
    name: 'SCORPION',
    hp: 50,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    attack: function() {
        console.log(this.name + ' ' + 'Fight...');
    }
};

const player2 = {
    name: 'SUB-ZERO',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['weapon2', 'weapon3'],
    attack: function() {
        console.log(this.name + ' ' + 'Fight...');
    }
};

/* console.log(player1);
console.log(player1.attack());
console.log(player2);
console.log(player2.attack()); */

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

// функция создания игрока в DOM
function createPlayer(playerId, playerObj) {
    const $player = getDiv(playerId)(withClassName);
    const $progressbar = getDiv('progressbar')(withClassName);
    const $life = getDiv('life')(withClassName);
    const $name = getDiv('name')(withClassName);
    const $character = getDiv('character')(withClassName);
    const $img = getImg(playerObj.img)(withSrc);

    $life.innerText = playerObj.hp + '%';
    $name.innerText = playerObj.name;

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);
    $player.appendChild($progressbar);
    $player.appendChild($character);

    const $root = document.querySelector('.arenas');
    $root.appendChild($player);
}

createPlayer('player1', player1);
createPlayer('player2', player2);