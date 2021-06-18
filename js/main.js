import Game from './game.js';
import DataService from './data.js';


const ds = new DataService();
// const player = await ds.getRandomPlayer();
// console.log(player);
const players = await ds.getAllPlayers();
console.table(players);

const game = new Game();
game.start();
