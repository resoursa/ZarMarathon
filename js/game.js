import { getRandom } from './utils.js';
import getLogString from './logs.js';

// игроки
let _userPlayer, _enemyPlayer;

// ссылка на игровое поле
const $arenas = document.querySelector('.arenas');
// ссылка на форму
const $formFight = document.querySelector('.control');
// ссылка на отображение логов
const $chat = document.querySelector('.chat');

// предельные значения урона
const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};

// названия целей атак
const ATTACK = ['head', 'body', 'foot'];

// названия подтипов атаки
const _subtypeAttacks = ['hit', 'defence'];

// создание элемента для DOM
function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

// создание игрока в DOM
function createPlayer({player, hp, name, img}) {
    const $player = createElement('div', `player${player}`);
    const $progressbar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const $img = createElement('img');

    $life.style.width = hp + '%';
    $name.innerText = name;
    $img.src = img;

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

    [...$formFight].forEach(item => {
        if (item.checked) {
            if (item.name === _subtypeAttacks[0]) {
                result.force = getRandom(1, HIT[item.value]);
                result.target = item.value;
            }
            if (item.name === _subtypeAttacks[1]) {
                result.defence = item.value;
            }
            item.checked = false;
        }
    });

    return result;
}

// получение объекта конечных значений урона польз. и врага
function getPlayersDamages(userAttack, enemyAttack) {
    const result = {};

    result.userDamage = userAttack.defence !== enemyAttack.target ? enemyAttack.force : 0;
    result.enemyDamage = enemyAttack.defence !== userAttack.target ? userAttack.force : 0;

    return result;
}

// отображение результатов после единичн. атаки
function showPlayersDamages({userDamage, enemyDamage}) {
    _userPlayer.changeHP(userDamage);
    _enemyPlayer.changeHP(enemyDamage);
    _userPlayer.renderHP();
    _enemyPlayer.renderHP();
}

// отображение записи лога игры
function showLog(type, attacker, defender) {
    const log = getLogString(type, attacker, defender);
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
function selectPlayersDamagesLogs({userDamage, enemyDamage}) {
    if (userDamage > 0) {
        showLog(_subtypeAttacks[0], _enemyPlayer, _userPlayer);
    } else {
        showLog(_subtypeAttacks[1], _enemyPlayer, _userPlayer);
    }

    if (enemyDamage > 0) {
        showLog(_subtypeAttacks[0], _userPlayer, _enemyPlayer);
    } else {
        showLog(_subtypeAttacks[1], _userPlayer, _enemyPlayer);
    }
}

// проверка значений здоровья на окончание игры
function checkEndGame() {
    switch (true) {
        case _userPlayer.hp === 0 && _enemyPlayer.hp === 0:
            showResult();
            break;
        case _userPlayer.hp === 0 && _enemyPlayer.hp > 0:
            showResult(_enemyPlayer, _userPlayer);
            break;
        case _enemyPlayer.hp === 0 && _userPlayer.hp > 0:
            showResult(_userPlayer, _enemyPlayer);
            break;
    }
}

// запуск игры
function startFight(userPlayer, enemyPlayer) {
    _userPlayer = userPlayer;
    _enemyPlayer = enemyPlayer;

    $arenas.appendChild(createPlayer(_userPlayer));
    $arenas.appendChild(createPlayer(_enemyPlayer));
}

// обработчик для кнопки Fight
function onSubmit() {
    const userAttack = getUserAttack();
    const enemyAttack = getEnemyAttack();
    const damages = getPlayersDamages(userAttack, enemyAttack);
    showPlayersDamages(damages);
    selectPlayersDamagesLogs(damages);
    checkEndGame();
}

export { startFight, onSubmit, showLog };
