import { Player } from './player.js';

class DataService {
    static _urlAll = 'https://reactmarathon-api.herokuapp.com/api/mk/players';
    static _urlRandom = 'https://reactmarathon-api.herokuapp.com/api/mk/player/choose';
    static _urlFight = 'http://reactmarathon-api.herokuapp.com/api/mk/player/fight';
    constructor() { }

    _getJson = async (url) => {
        return fetch(url)
            .then(data => data.json())
            .catch(console.error);
    };

    _mapToPlayer = (jsonItem, player) => {
        const result = new Player(
            player,
            jsonItem.name,
            jsonItem.img,
            jsonItem.hp,
            jsonItem.avatar
        );
        return result;
    };

    getAllPlayers = async _ => {
        const jsonItems = await this._getJson(DataService._urlAll);
        const players = jsonItems.map(this._mapToPlayer);
        return players;
    };

    getRandomPlayer = async (player = 1) => {
        const jsonItem = await this._getJson(DataService._urlRandom);
        const result = this._mapToPlayer(jsonItem, player);
        return result;
    };

    _postJson = async (url, attack) => {
        const body = JSON.stringify({hit: attack.target, defence: attack.defence});
        const options = {method: 'POST', body};
        return fetch(url, options)
                .then(data => data.json())
                .catch(console.error);
    }

    _mapToAttacks = (answer) => {
       return {
           userAttack: {
               force: answer.player1.value,
               target: answer.player1.hit,
               defence: answer.player1.defence
           },
           enemyAttack: {
               force: answer.player2.value,
               target: answer.player2.hit,
               defence: answer.player2.defence
           }
       };
    };

    getAttacks = async (userAttack) => {
        const jsonAnswer = await this._postJson(DataService._urlFight, userAttack);
        const attacks = this._mapToAttacks(jsonAnswer);
        return attacks;
    };

}

export default DataService;