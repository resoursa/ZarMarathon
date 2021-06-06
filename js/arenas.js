import { getDiv, getImg, withClassName, withSrc } from './utilities.js';

const arenas = (function () {
    // ссылки на элементы страницы
    const $arenas = document.querySelector('.arenas');
    const $randomButton = document.querySelector('.button');
    // ссылки на экземпляры игроков
    let player1, player2;

    // отображение надписи по окончании игры
    function showResult(message) {
        const $loseTitle = getDiv('loseTitle')(withClassName);
        $loseTitle.innerText = message;
        $arenas.appendChild($loseTitle);
        $randomButton.disabled = true;
    }

    // отображение игрока
    function createPlayer(playerObj) {
        const $player = getDiv(`player${playerObj.player}`)(withClassName);
        const $progressbar = getDiv('progressbar')(withClassName);
        const $life = getDiv('life')(withClassName);
        const $name = getDiv('name')(withClassName);
        const $character = getDiv('character')(withClassName);
        const $img = getImg(playerObj.img)(withSrc);

        // отображаем имя и здоровье игрока
        $name.innerText = playerObj.name;
        $life.style.width = playerObj.hp + '%';

        $progressbar.appendChild($life);
        $progressbar.appendChild($name);
        $character.appendChild($img);
        $player.appendChild($progressbar);
        $player.appendChild($character);
        // вставка на страницу
        $arenas.appendChild($player);

        // запоминаем ссылку на игрока
        if (playerObj.player === 1) {
            player1 = playerObj;
        } else {
            player2 = playerObj;
        }

        // подписываемся на событие клика на кнопке
        $randomButton.addEventListener('click', function () {
            if ($randomButton.disabled) { return;
            }

            // обновляем здоровье у игрока
            playerObj.updateHP();
            $life.style.width = playerObj.hp + '%';

            // если у текущего игрока закончилось здоровье,
            // то выиграл противоположный
            if (playerObj.hp === 0) {
                if (playerObj === player1) {
                    showResult(`${player2.name} won!`);
                } else {
                    showResult(`${player1.name} won!`);
                }
            }
        });
    }

    return { createPlayer };
})();

export default arenas;