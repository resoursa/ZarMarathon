const arenas = (function () {
    // ссылки на элементы страницы
    const $arenas = document.querySelector('.arenas');
    const $randomButton = document.querySelector('.button');

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

    // отображение игрока
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

        $arenas.appendChild($player);
    }

    // отображение надписи по окончании игры
    function showResult(message) {
        const $loseTitle = getDiv('loseTitle')(withClassName);
        $loseTitle.innerText = message;
        $arenas.appendChild($loseTitle);
        $randomButton.disabled = true;
    }

    // отображение изменения уровня жизни игрока
    function changeHP(playerObj) {
        const selector = `.player${playerObj.player} .life`;
        const $pLife = document.querySelector(selector);

        const newHP = playerObj.hp - getHealthDamage();
        playerObj.hp = newHP < 0 ? 0 : newHP;

        $pLife.style.width = playerObj.hp + '%';

        if (playerObj.hp === 0) {
            return false;
        }

        return true;
    }

    //
    return { createPlayer };
})();

export default arenas;