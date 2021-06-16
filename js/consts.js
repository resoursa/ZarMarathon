// предельные значения урона
const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};

// названия целей атак
const ATTACK = ['head', 'body', 'foot'];

// названия типов действий игрока
class ACTIVITIES {
    static hit = 'hit';
    static defence = 'defence';
}

export { HIT, ATTACK, ACTIVITIES };