import { getRandom, getCurrentTime } from './utils.js';

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

const maxEndIndex = logs['end'].length - 1;
const maxHitIndex = logs['hit'].length - 1;
const maxDefenceIndex = logs['defence'].length - 1;

function getStartLog(type, time, user, enemy) {
    const log = logs[type].replace('[time]', time)
                            .replace('[player1]', user.name)
                            .replace('[player2]', enemy.name);
    return log;
}

function getEndLog(type, index, attacker, defender) {
    const log = logs[type][index].replace('[playerWins]', attacker.name)
                                .replace('[playerLose]', defender.name);
    return log;
}

function getHitLog(type, index, time, attacker, defender) {
    let log = logs[type][index].replace('[playerKick]', attacker.name)
                            .replace('[playerDefence]', defender.name);
    log = `${time} ${log} ${defender.lastDamage} ${defender.toStringHP()}`;
    return log;
}

function getDefenceLog(type, index, time, attacker, defender) {
    let log = logs[type][index].replace('[playerKick]', attacker.name)
                            .replace('[playerDefence]', defender.name);
    log = `${time} ${log}`;
    return log;
}

// формирование строки лога для отображения
function getLogString(type, attacker, defender) {
    let result = '';
    let index = 0;
    const time = getCurrentTime();

    switch (type) {
        case 'start':
            result = getStartLog(type, time, attacker, defender);
            break;
        case 'end':
            index = getRandom(index, maxEndIndex)
            result = getEndLog(type, index, attacker, defender);
            break;
        case 'hit':
            index = getRandom(index, maxHitIndex);
            result = getHitLog(type, index, time, attacker, defender);
            break;
        case 'defence':
            index = getRandom(index, maxDefenceIndex);
            result = getDefenceLog(type, index, time, attacker, defender);
            break;
        case 'draw':
            result = logs['draw'];
            break;
        default:
            result = 'a unknown key of logs';
            break;
    }

    return result;
}

export default getLogString;