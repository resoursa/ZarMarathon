import { PlayerNames, PlayerFactory } from './player/index.js';
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
const userPlayer = factory.create(1, PlayerNames.scorpion);
const enemyPlayer = factory.create(2, PlayerNames.subzero);
startFight(userPlayer, enemyPlayer);

