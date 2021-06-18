// предельные значения урона
const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};

// названия целей атак
const ATTACK = ['head', 'body', 'foot'];

// названия типов действий игрока
class ACTIVITY {
    static hit = 'hit';
    static defence = 'defence';
}

// имена игроков для фабрики
class PLAYER_NAME {
    static scorpion = 'scorpion';
    static kitana = 'kitana';
    static liukang = 'liukang';
    static sonya = 'sonya';
    static subzero = 'subzero';
}

// привязка позиции отображения к свойству player в экземпляре игрока
class POSITION {
    static left = 1;
    static right = 2;
}

export { POSITION, PLAYER_NAME, HIT, ATTACK, ACTIVITY };