import { createElement } from './utils.js';

class Player {
    constructor(player, name, img) {
        this.player = player;
        this.name = name;
        this.img = img;

        this.hp = 100;
        this.lastDamage = 0;
        this.selector = `player${this.player}`;
    }
    _getElementHP = () => {
        const selector = `.${this.selector} .life`;
        return document.querySelector(selector);
    };
    renderHP = () => {
        const $life = this._getElementHP();
        $life.style.width = this.hp + '%';
    };
    toStringHP = () => `[${this.hp}/100]`;
    changeHP = (healthDamage) => {
        const newHP = this.hp - healthDamage;
        this.hp = newHP < 0 ? 0 : newHP;
        this.lastDamage = -healthDamage;
    };
    renderSelfOn = ($place) => {
        const $player = createElement('div', this.selector);
        const $progressbar = createElement('div', 'progressbar');
        const $life = createElement('div', 'life');
        const $name = createElement('div', 'name');
        const $character = createElement('div', 'character');
        const $img = createElement('img');

        $life.style.width = this.hp + '%';
        $name.innerText = this.name;
        $img.src = this.img;

        $progressbar.appendChild($life);
        $progressbar.appendChild($name);
        $character.appendChild($img);
        $player.appendChild($progressbar);
        $player.appendChild($character);

        $place.appendChild($player);
    };
}

class PlayerFactory {
    create(player, name) {
        switch (name) {
            case 'scorpion':
                return new Player(
                    player,
                    'SCORPION',
                    'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif');
            case 'kitana':
                return new Player(
                    player,
                    'KITANA',
                    'http://reactmarathon-api.herokuapp.com/assets/kitana.gif');
            case 'liukang':
                return new Player(
                    player,
                    'LIU-KANG',
                    'http://reactmarathon-api.herokuapp.com/assets/liukang.gif');
            case 'sonya':
                return new Player(
                    player,
                    'SONYA',
                    'http://reactmarathon-api.herokuapp.com/assets/sonya.gif');
            case 'subzero':
                return new Player(
                    player,
                    'SUB-ZERO',
                    'http://reactmarathon-api.herokuapp.com/assets/subzero.gif');
            default:
                throw new Error('Неправильное имя игрока: ' + name);
        }
    }
}

export { Player, PlayerFactory };