const {
    calculateProgress
} = require('../js/tasks');

test('0 tareas devuelve 0%', () => {
    expect(calculateProgress(0, 0)).toBe(0);
});

test('5 de 10 tareas completadas devuelve 50%', () => {
    expect(calculateProgress(10, 5)).toBe(50);
});

test('10 de 10 tareas completadas devuelve 100%', () => {
    expect(calculateProgress(10, 10)).toBe(100);
});