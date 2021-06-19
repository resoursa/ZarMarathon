import { createElement } from './utils.js';

class Player {
    constructor(player, name, img, hp, avatar) {
        this.player = player;
        this.name = name;
        this.img = img;
        this.hp = hp || 100;
        this.avatar = avatar || '';
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

export { Player };