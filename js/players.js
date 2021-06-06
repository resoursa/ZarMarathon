class Player {
    constructor(player, name, img, weapon) {
        this.player = player;
        this.name = name;
        this.img = img;
        this.weapon = weapon;

        this.hp = 100;
    }

    _getHealthDamage(min = 1, max = 20) {
        return Math.trunc((Math.random() * (max - min)) + min);
    }

    updateHP() {
        const healthDamage = this._getHealthDamage();
        const newHP = this.hp - healthDamage;
        this.hp = newHP < 0 ? 0 : newHP;
    }

    attack() {
        console.log(this.name + ' ' + 'Fight...');
    }
}

class PlayerFactory {
    create(player, name) {
        switch (name) {
            case 'scorpion':
                return new Player(
                    player,
                    'SCORPION',
                    'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
                    ['weapon1', 'weapon2', 'weapon3']);
            case 'kitana':
                return new Player(
                    player,
                    'KITANA',
                    'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
                    ['weapon1', 'weapon2', 'weapon3']);
            case 'liukang':
                return new Player(
                    player,
                    'LI-U-KANG',
                    'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
                    ['weapon1', 'weapon2', 'weapon3']);
            case 'sonya':
                return new Player(
                    player,
                    'SONYA',
                    'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
                    ['weapon1', 'weapon2', 'weapon3']);
            case 'subzero':
                return new Player(
                    player,
                    'SUB-ZERO',
                    'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
                    ['weapon1', 'weapon2', 'weapon3']);
            default:
                throw new Error('Неправильное имя игрока: ' + name);
        }
    }
}

export { Player, PlayerFactory };