import { userPlayer, enemyPlayer } from './players.js';
import { startFight, onSubmit, showLog } from './game.js';

// ссылка на форму
const $formFight = document.querySelector('.control');

// обработка клика по кнопке Fight
$formFight.addEventListener('submit', function(event) {
    event.preventDefault();
    onSubmit();
});

// отображение игроков
startFight(userPlayer, enemyPlayer);
// начальная строка в лог
showLog('start', userPlayer, enemyPlayer);
