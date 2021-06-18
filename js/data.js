import { Player } from './player.js';

class DataService {
    static _urlAll = 'https://reactmarathon-api.herokuapp.com/api/mk/players';
    static _urlRandom = 'https://reactmarathon-api.herokuapp.com/api/mk/player/choose';
    static _urlFight = 'http://reactmarathon-api.herokuapp.com/api/mk/player/fight';
    constructor() { }

    _getJson = async (url) => {
        return fetch(url)
            .then(data => data.json())
            .catch(err => console.error(err));
    };

    _mapToPlayer = (jsonItem) => {
        const player = new Player(
            1,
            jsonItem.name,
            jsonItem.img,
            jsonItem.hp,
            jsonItem.avatar
        );
        return player;
    };

    getAllPlayers = async _ => {
        const jsonItems = await this._getJson(DataService._urlAll);
        const players = jsonItems.map(this._mapToPlayer);
        return players;
    };

    getRandomPlayer = async _ => {
        const jsonItem = await this._getJson(DataService._urlRandom);
        const player = this._mapToPlayer(jsonItem);
        return player;
    };

    getFightStep = ({ hit, defence }) => {

    };

}

export default DataService;