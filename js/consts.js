// названия типов действий игрока
class ACTIVITY {
    static hit = 'hit';
    static defence = 'defence';
}

// привязка позиции отображения к свойству player в экземпляре игрока
class POSITION {
    static left = 1;
    static right = 2;
}

export { POSITION, ACTIVITY };