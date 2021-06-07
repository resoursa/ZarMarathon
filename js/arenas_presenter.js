import * as players from './players.js';

const presenter = (function () {
    // ссылка на view
    let _view;
    // объекты игроков
    let _player1, _player2;

    // получение очереди игроков
    const getQueuePlayers = () => {
      const order = Math.floor(Math.random() * 2) + 1;
      console.log('Порядок: ' + order);
      if (order > 1) {
          return [_player2, _player1];
      }
      return [_player1, _player2];
    };

    // событие нажатия на кнопку
    const onClick = function () {
        const players = getQueuePlayers();
        players.forEach(p => p.updateHP());
        players.forEach(p => _view.updateProgressHP(p.player, p.hp));

        if (players.filter(p => p.hp === 0).length > 1) {
            _view.showResult("It's a draw!");
            _view.switchOffRandomButton();
            return;
        }

        const deadPlayer = players.find(p => p.hp === 0);
        if (deadPlayer) {
            const winner = players.find(p => p.hp > 0);
            _view.showResult(`${winner.name} won!`);
            _view.switchOffRandomButton();
        }
    }

    function initialization(view) {
        if (view === false) {
            throw new Error('Параметр view пустой');
        }

        _view = view;
        _view.setOnClickButton(onClick);

        const factory = new players.PlayerFactory();
        _player1 = factory.create(1, 'scorpion');
        _player2 = factory.create(2, 'subzero');
        _view.showPlayer(_player1);
        _view.showPlayer(_player2);
    }

    return { init: initialization };
})();

export default presenter;