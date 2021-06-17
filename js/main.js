import { PlayerFactory } from './player/index.js';
import { POSITION, PLAYER_NAME } from './consts.js';
import { startFight, onSubmit } from './game.js';

// ссылка на форму
const $formFight = document.querySelector('.control');

// обработка клика по кнопке Fight
$formFight.addEventListener('submit', function(event) {
    event.preventDefault();
    onSubmit();
});

// отображение игроков
const factory = new PlayerFactory();
const userPlayer = factory.create(POSITION.left, PLAYER_NAME.scorpion);
const enemyPlayer = factory.create(POSITION.right, PLAYER_NAME.subzero);
startFight(userPlayer, enemyPlayer);

