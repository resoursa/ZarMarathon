import { createElement } from './utils.js';
import { POSITION, ACTIVITY } from './consts.js';
import getLogString from './logs.js';
import DataService from './data.js';

class Game {
    constructor(){
        this.$arenas = document.querySelector('.arenas');
        this.$formFight = document.querySelector('.control');
        this.$chat = document.querySelector('.chat');
        this._userPlayer = null;
        this._enemyPlayer = null;
        this._dataService = new DataService();
    }

    _showLog = (type, attacker, defender) => {
        const log = getLogString(type, attacker, defender);
        const el = `<p>${log}</p>`;
        this.$chat.insertAdjacentHTML('afterbegin', el);
    };

    _showResult = (playerWinner, playerLoser) => {
        const $loseTitle = createElement('div', 'loseTitle');

        // отображаем надпись с результатом
        if (playerWinner) {
            $loseTitle.innerText = playerWinner.name + ' wins!';
            this._showLog('end', playerWinner, playerLoser);
        } else {
            $loseTitle.innerText = "It's a draw!";
            this._showLog('draw', undefined, undefined);
        }
        this.$arenas.appendChild($loseTitle);

        // кнопка Reload
        const $reloadButton = this._createReloadButton();
        $reloadButton.addEventListener('click', function () {
            window.location.reload();
        });
    };

    _createReloadButton = () => {
        const $reloadWrap = createElement('div', 'reloadWrap');
        const $button = createElement('div', 'button');
        $button.innerText = 'Restart';

        $reloadWrap.appendChild($button);
        this.$arenas.appendChild($reloadWrap);

        return $button;
    };

    _getUserSelection = () => {
        const result = {};
        [...this.$formFight].forEach(item => {
            if (item.checked) {
                if (item.name === ACTIVITY.hit) {
                    result.target = item.value;
                }
                if (item.name === ACTIVITY.defence) {
                    result.defence = item.value;
                }
                item.checked = false;
            }
        });
        return result;
    };

    _getPlayersDamages = (userAttack, enemyAttack) => {
        const result = {};
        result.userDamage = userAttack.defence !== enemyAttack.target ? enemyAttack.force : 0;
        result.enemyDamage = enemyAttack.defence !== userAttack.target ? userAttack.force : 0;
        return result;
    };

    _showPlayersDamages = ({userDamage, enemyDamage}) => {
        this._userPlayer.changeHP(userDamage);
        this._enemyPlayer.changeHP(enemyDamage);
        this._userPlayer.renderHP();
        this._enemyPlayer.renderHP();
    };

    _selectPlayersDamagesLogs = ({userDamage, enemyDamage}) => {
        if (userDamage > 0) {
            this._showLog(ACTIVITY.hit, this._enemyPlayer, this._userPlayer);
        } else {
            this._showLog(ACTIVITY.defence, this._enemyPlayer, this._userPlayer);
        }

        if (enemyDamage > 0) {
            this._showLog(ACTIVITY.hit, this._userPlayer, this._enemyPlayer);
        } else {
            this._showLog(ACTIVITY.defence, this._userPlayer, this._enemyPlayer);
        }
    };

    _checkEndGame = () => {
        switch (true) {
            case this._userPlayer.hp === 0 && this._enemyPlayer.hp === 0:
                this._showResult();
                break;
            case this._userPlayer.hp === 0 && this._enemyPlayer.hp > 0:
                this._showResult(this._enemyPlayer, this._userPlayer);
                break;
            case this._enemyPlayer.hp === 0 && this._userPlayer.hp > 0:
                this._showResult(this._userPlayer, this._enemyPlayer);
                break;
        }
    };

    _onSubmit = async () => {
        const userSelection = this._getUserSelection();
        const fightAttacks = await this._dataService.getAttacks(userSelection);

        const damages = this._getPlayersDamages(fightAttacks.userAttack, fightAttacks.enemyAttack);
        this._showPlayersDamages(damages);
        this._selectPlayersDamagesLogs(damages);
        this._checkEndGame();
    };

    start = async () => {
        this._userPlayer = await this._dataService.getRandomPlayer(POSITION.left);
        this._enemyPlayer = await this._dataService.getRandomPlayer(POSITION.right);

        // отображаем игроков
        this._userPlayer.renderSelfOn(this.$arenas);
        this._enemyPlayer.renderSelfOn(this.$arenas);

        // начальная строка в лог
        this._showLog('start', this._userPlayer, this._enemyPlayer);

        // кнопка Fight
        this.$formFight.addEventListener('submit', async (event) => {
            event.preventDefault();
            await this._onSubmit();
        });
    };
}

export default Game;
