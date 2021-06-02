// объекты игроков
const player1 = {
    name: 'SCORPION',
    hp: 50,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    attack: function() {
        console.log(this.name + ' ' + 'Fight...');
    }
};

const player2 = {
    name: 'SUB-ZERO',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['weapon2', 'weapon3'],
    attack: function() {
        console.log(this.name + ' ' + 'Fight...');
    }
};

/* console.log(player1);
console.log(player1.attack());
console.log(player2);
console.log(player2.attack()); */