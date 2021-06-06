import * as players from './players.js';
import arenas from './arenas.js';

// объекты игроков
const factory = new players.PlayerFactory();
const player1 = factory.create(1, 'scorpion');
const player2 = factory.create(2, 'subzero');

// отображаем игроков на арене
arenas.createPlayer(player1);
arenas.createPlayer(player2);
