class Player {
    constructor(player, name, img) {
        this.player = player;
        this.name = name;
        this.img = img;

        this.hp = 100;
        this.lastDamage = 0;
        this.selector = `.player${this.player}`;
    }
    _getElementHP = () => {
        const selector = `${this.selector} .life`;
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
}

class PlayerNames {
    static scorpion = 'scorpion';
    static kitana = 'kitana';
    static liukang = 'liukang';
    static sonya = 'sonya';
    static subzero = 'subzero';
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

export { PlayerNames, PlayerFactory };