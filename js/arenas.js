import { getDiv, getImg, withClassName, withSrc } from './utilities.js';

const arenas = (function () {
    // ссылки на элементы страницы
    const $arenas = document.querySelector('.arenas');
    const $randomButton = document.querySelector('.button');

    // <<<<<<<< Random Button <<<<<<<<<<<<<<<<<<
    function switchOffRandomButton() {
        $randomButton.disabled = true;
    }

    let _onClickRandomButton = null;
    function setOnClickButton(action) {
        _onClickRandomButton = action;
    }
    // >>>>>>>> Random Button >>>>>>>>>>>>>>>>>>>>>>

    // <<<<<<<< Индикаторы здоровья <<<<<<<<<<<<<<<<
    let $lifePlayer1, $lifePlayer2;

    function updateProgressHP(playerId, hp) {
        const value = hp + '%';
        if (playerId === 1) {
            $lifePlayer1.style.width = value;
        } else {
            $lifePlayer2.style.width = value;
        }
    }
    // >>>>>>>> Индикаторы здоровья >>>>>>>>>>>>>>>>

    // отображение надписи по окончании игры
    function showResult(message) {
        const $loseTitle = getDiv('loseTitle')(withClassName);
        $loseTitle.innerText = message;
        $arenas.appendChild($loseTitle);
    }

    // отображение игрока
    function addPlayer(playerObj) {
        const $player = getDiv(`player${playerObj.player}`)(withClassName);
        const $progressbar = getDiv('progressbar')(withClassName);
        const $life = getDiv('life')(withClassName);
        const $name = getDiv('name')(withClassName);
        const $character = getDiv('character')(withClassName);
        const $img = getImg(playerObj.img)(withSrc);

        // отображаем имя и здоровье игрока
        $name.innerText = playerObj.name;
        $life.style.width = playerObj.hp + '%';

        // разметка
        $progressbar.appendChild($life);
        $progressbar.appendChild($name);
        $character.appendChild($img);
        $player.appendChild($progressbar);
        $player.appendChild($character);
        // вставка на страницу
        $arenas.appendChild($player);

        // запоминаем ссылку на здоровье игрока
        if (playerObj.player === 1) {
            $lifePlayer1 = $life;
        } else {
            $lifePlayer2 = $life;
        }

        // подписка на событие нажатия на кнопку Random
        if (_onClickRandomButton === false) {
            throw new Error('Ссылка на обработчик click пустая');
        }
        $randomButton.addEventListener('click', _onClickRandomButton);
    }

    return { showPlayer: addPlayer,
             switchOffRandomButton,
             setOnClickButton,
             updateProgressHP,
             showResult, };
})();

export default arenas;