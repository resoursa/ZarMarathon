import getRandom from './utils.js';
import { maxEndIndex, maxHitIndex, maxDefenceIndex, getLogString} from './logs.js';

// ссылка на игровое поле
const $arenas = document.querySelector('.arenas');
// ссылка на форму
const $formFight = document.querySelector('.control');
//
const $chat = document.querySelector('.chat');

// предельные значения урона
const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};

// названия целей атак
const ATTACK = ['head', 'body', 'foot'];

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

// создание элемента для DOM
function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

// создание игрока в DOM
function createPlayer(playerObj) {
    const $player = createElement('div', `player${playerObj.player}`);
    const $progressbar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const $img = createElement('img');

    $life.style.width = playerObj.hp + '%';
    $name.innerText = playerObj.name;
    $img.src = playerObj.img;

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);
    $player.appendChild($progressbar);
    $player.appendChild($character);

    return $player;
}

// создание кнопки Reload
function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $button = createElement('div', 'button');
    $button.innerText = 'Restart';

    $reloadWrap.appendChild($button);
    $arenas.appendChild($reloadWrap);

    return $button;
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

// получение объекта вражеской атаки
function getEnemyAttack() {
    const target = ATTACK[getRandom(0, 3)];
    const defence = ATTACK[getRandom(0, 3)];
    const force = getRandom(1, HIT[target]);

    return { force, target, defence };
}

// получение объекта пользовательской атаки
function getUserAttack() {
    const result = {};
    for (const item of $formFight) {
        if (item.checked) {
            if (item.name === 'hit') {
                result.force = getRandom(1, HIT[item.value]);
                result.target = item.value;
            }
            if (item.name === 'defence') {
                result.defence = item.value;
            }
            item.checked = false;
        }
    }

    return result;
}

// получение объекта конечных значений урона польз. и врага
function getPlayersDamages(user, enemy) {
    const result = {};

    result.userDamage = user.defence !== enemy.target ? enemy.force : 0;
    result.enemyDamage = enemy.defence !== user.target ? user.force : 0;

    return result;
}

// получение значения текущего времени
function getCurrentTime() {
    const zeroPrefix = value => value.toString().length > 1 ? value : `0${value}`;
    const date = new Date();
    return `${zeroPrefix(date.getHours())}:${zeroPrefix(date.getMinutes())}`;
}

// отображение результатов после единичн. атаки
function showPlayersDamages(damages) {
    userPlayer.changeHP(damages.userDamage);
    enemyPlayer.changeHP(damages.enemyDamage);
    userPlayer.renderHP();
    enemyPlayer.renderHP();
}

// отображение логов игры
function showLog(type, attacker, defender) {
    const time = getCurrentTime();

    let index = 0;
    switch (type) {
        case 'end':
            index = getRandom(index, maxEndIndex);
            break;
        case 'hit':
            index = getRandom(index, maxHitIndex);
            break;
        case 'defence':
            index = getRandom(index, maxDefenceIndex);
            break;
        default:
            index = 0;
            break;
    }

    const log = getLogString(type, index, time, attacker, defender);
    const el = `<p>${log}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);
}

// отображение результатов поединка
function showResult(playerWinner, playerLoser) {
    const $loseTitle = createElement('div', 'loseTitle');

    // отображаем надпись с результатом
    if (playerWinner) {
        $loseTitle.innerText = playerWinner.name + ' wins!';
        showLog('end', playerWinner, playerLoser);
    } else {
        $loseTitle.innerText = "It's a draw!";
        showLog('draw', undefined, undefined);
    }
    $arenas.appendChild($loseTitle);

    // кнопка Reload
    const $reloadButton = createReloadButton();
    $reloadButton.addEventListener('click', function () {
        window.location.reload();
    });
}

// логирование урона и защиты игроков
function selectPlayersDamagesLogs(damages) {
    const types = ['hit', 'defence'];
    if (damages.userDamage > 0) {
        showLog(types[0], enemyPlayer, userPlayer);
    } else {
        showLog(types[1], enemyPlayer, userPlayer);
    }

    if (damages.enemyDamage > 0) {
        showLog(types[0], userPlayer, enemyPlayer);
    } else {
        showLog(types[1], userPlayer, enemyPlayer);
    }
}

// проверка значений здоровья на окончание игры
function checkEndGame() {
    switch (true) {
        case userPlayer.hp === 0 && enemyPlayer.hp === 0:
            showResult();
            break;
        case userPlayer.hp === 0 && enemyPlayer.hp > 0:
            showResult(enemyPlayer, userPlayer);
            break;
        case enemyPlayer.hp === 0 && userPlayer.hp > 0:
            showResult(userPlayer, enemyPlayer);
            break;
    }
}

// обработка клика по кнопке Fight
$formFight.addEventListener('submit', function(event) {
    event.preventDefault();

    const user = getUserAttack();
    const enemy = getEnemyAttack();
    const damages = getPlayersDamages(user, enemy);
    showPlayersDamages(damages);
    selectPlayersDamagesLogs(damages);
    checkEndGame();
});

// отображение игроков
$arenas.appendChild(createPlayer(userPlayer));
$arenas.appendChild(createPlayer(enemyPlayer));
// начальная строка в лог
showLog('start', userPlayer, enemyPlayer);
