import { getDiv, getImg, withClassName, withSrc } from './utilities.js';

// ссылка на игровое поле
const $arenas = document.querySelector('.arenas');
// ссылка на кнопку
const $randomButton = document.querySelector('.button');

// объекты игроков
const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    attack() {
        console.log(this.name + ' ' + 'Fight...');
    }
};

const player2 = {
    player: 2,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['weapon2', 'weapon3'],
    attack() {
        console.log(this.name + ' ' + 'Fight...');
    }
};

// функция создания игрока в DOM
function createPlayer(playerObj) {
    const $player = getDiv(`player${playerObj.player}`)(withClassName);
    const $progressbar = getDiv('progressbar')(withClassName);
    const $life = getDiv('life')(withClassName);
    const $name = getDiv('name')(withClassName);
    const $character = getDiv('character')(withClassName);
    const $img = getImg(playerObj.img)(withSrc);

    $life.style.width = playerObj.hp + '%';
    $name.innerText = playerObj.name;

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);
    $player.appendChild($progressbar);
    $player.appendChild($character);

    return $player;
}

// получение значения урона здоровью игрока
function getHealthDamage(min = 1, max = 20) {
    return Math.trunc((Math.random() * (max - min)) + min);
}

// отображение результатов поединка
function showResult(name) {
    const $loseTitle = getDiv('loseTitle')(withClassName);
    if (name) {
        $loseTitle.innerText = name + ' wins!';
    } else {
        $loseTitle.innerText = "It's a draw!";
    }

    $arenas.appendChild($loseTitle);
    $randomButton.disabled = true;
}

// изменение уровня здоровья
function changeHP(playerObj) {
    const selector = `.player${playerObj.player} .life`;
    const $pLife = document.querySelector(selector);

    const newHP = playerObj.hp - getHealthDamage();
    playerObj.hp = newHP < 0 ? 0 : newHP;

    $pLife.style.width = playerObj.hp + '%';
}

// подписка на событие нажатия на кнопку Random
$randomButton.addEventListener('click', function() {
    changeHP(player1);
    changeHP(player2);

    switch (true) {
        case player1.hp === 0 && player1.hp < player2.hp:
            return showResult(player2.name);
        case player2.hp === 0 && player2.hp < player1.hp:
            return showResult(player1.name);
        case player1.hp === 0 && player2.hp === 0:
            return showResult();
    }
});

// отображение игроков
$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));