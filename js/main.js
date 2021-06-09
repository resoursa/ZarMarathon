// ссылка на игровое поле
const $arenas = document.querySelector('.arenas');
// ссылка на кнопку Random
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
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP
};

const player2 = {
    player: 2,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['weapon2', 'weapon3'],
    attack() {
        console.log(this.name + ' ' + 'Fight...');
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP
};

// создание элемента для DOM
function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

// функция создания игрока в DOM
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

// получение значения урона здоровью игрока
function getHealthDamage(min = 1, max = 20) {
    return Math.trunc((Math.random() * (max - min)) + min);
}

// отображение результатов поединка
function showResult(name) {
    const $loseTitle = createElement('div', 'loseTitle');
    if (name) {
        $loseTitle.innerText = name + ' wins!';
    } else {
        $loseTitle.innerText = "It's a draw!";
    }

    $arenas.appendChild($loseTitle);
    $randomButton.disabled = true;

    // кнопка Reload
    const $reloadButton = createReloadButton();
    $reloadButton.addEventListener('click', function () {
        window.location.reload();
    });
}

// определение элемента отображаещего кол-во здоровья
function elHP() {
    const selector = `.player${this.player} .life`;
    return document.querySelector(selector);
}

// отображение количества здоровья
function renderHP() {
    const $life = this.elHP();
    $life.style.width = this.hp + '%';
}

// изменение количества здоровья
function changeHP(healthDamage) {
    const newHP = this.hp - healthDamage;
    this.hp = newHP < 0 ? 0 : newHP;
}

// подписка на событие нажатия на кнопку Random
$randomButton.addEventListener('click', function() {
    player1.changeHP(getHealthDamage());
    player2.changeHP(getHealthDamage());
    player1.renderHP();
    player2.renderHP();

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
