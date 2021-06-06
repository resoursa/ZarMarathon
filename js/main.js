import * as players from './players.js';
import arenas from './arenas.js';

// объекты игроков
const factory = new players.PlayerFactory();
const player1 = factory.create(1, 'scorpion');
const player2 = factory.create(2, 'subzero');

arenas.createPlayer(player1);
arenas.createPlayer(player2);



// // ссылка на игровое поле
// const $arenas = document.querySelector('.arenas');
// // ссылка на кнопку
// const $randomButton = document.querySelector('.button');


// // вспомогательные функции для создания игрока в DOM
// const buildElement = tag => attr => func => func(tag, attr);
// const withClassName = (tag, className) => {
//     const $el = document.createElement(tag);
//     $el.classList.add(className);
//     return $el;
// };
// const withSrc = (tag, src) => {
//     const $el = document.createElement(tag);
//     $el.src = src;
//     return $el;
// };
// const getDiv = buildElement('div');
// const getImg = buildElement('img');

// // функция создания игрока в DOM
// function createPlayer(playerObj) {
//     const $player = getDiv(`player${playerObj.player}`)(withClassName);
//     const $progressbar = getDiv('progressbar')(withClassName);
//     const $life = getDiv('life')(withClassName);
//     const $name = getDiv('name')(withClassName);
//     const $character = getDiv('character')(withClassName);
//     const $img = getImg(playerObj.img)(withSrc);

//     $life.style.width = playerObj.hp + '%';
//     $name.innerText = playerObj.name;

//     $progressbar.appendChild($life);
//     $progressbar.appendChild($name);
//     $character.appendChild($img);
//     $player.appendChild($progressbar);
//     $player.appendChild($character);

//     return $player;
// }

// // получение значения урона здоровью игрока
// function getHealthDamage(min = 1, max = 20) {
//     return Math.trunc((Math.random() * (max - min)) + min);
// }

// // отображение результатов поединка
// function showResult(message) {
//     const $loseTitle = getDiv('loseTitle')(withClassName);
//     $loseTitle.innerText = message;
//     $arenas.appendChild($loseTitle);
//     $randomButton.disabled = true;
// }

// /**
//  *
//  * @param {Object} playerObj
//  * @returns {Boolean} true если игрок живой
//  */
// function changeHP(playerObj) {
//     const selector = `.player${playerObj.player} .life`;
//     const $pLife = document.querySelector(selector);

//     const newHP = playerObj.hp - getHealthDamage();
//     playerObj.hp = newHP < 0 ? 0 : newHP;

//     $pLife.style.width = playerObj.hp + '%';

//     if (playerObj.hp === 0) {
//         return false;
//     }

//     return true;
// }

// // подписка на событие нажатия на кнопку Random
// $randomButton.addEventListener('click', function() {
//     const isAliveP1 = changeHP(player1);
//     const isAliveP2 = changeHP(player2);

//     switch (true) {
//         case isAliveP1 && (isAliveP2 === false):
//             showResult(`${player1.name} won!`);
//             break;
//         case isAliveP2 && (isAliveP1 === false):
//             showResult(`${player2.name} won!`);
//             break;
//         case (isAliveP1 === false) && (isAliveP2 === false):
//             showResult("It's a draw!");
//             break;
//     }
// });

// // отображение игроков
// $arenas.appendChild(createPlayer(player1));
// $arenas.appendChild(createPlayer(player2));