const enemyStats1 = {
    health: 200,
    speed: 2,
    reward: 25
}
const enemyStats2 = {
    health: 5000,
    speed: 1,
    reward: 50
}
const enemyStats3 = {
    health: 1000,
    speed: 5,
    reward: 100
}
const enemyStats = [enemyStats1, enemyStats2, enemyStats3]

const buildingStats1 = {
    cost: 50,
    speed: 5,
    projectileSpeed: 10,
    power: 1,
    radius: 250
}
const buildingStats2 = {
    cost: 200,
    speed: 1,
    projectileSpeed: 5,
    power: 50,
    radius: 250
}
const buildingStats3 = {
    cost: 100,
    speed: 5,
    projectileSpeed: 30,
    power: 1,
    radius: 250
}
const buildingStats4 = {
    cost: 500,
    speed: 1,
    projectileSpeed: 50,
    power: 50,
    radius: 1000
}

const buildingStats = [buildingStats1, buildingStats2, buildingStats3, buildingStats4]

const waves =
    [
        [1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 3, 1, 1, 3],
        [1, 3, 1, 1, 3],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 3, 1, 1, 3],
        [1, 3, 1, 1, 3],
        [2, 3, 2, 3, 2, 3, 2, 2, 3, 2, 2],
        [2, 3, 2, 3, 2, 3, 2, 2, 3, 2, 2],
        [2, 3, 2, 3, 2, 3, 2, 2, 3, 2, 2],
        [2, 3, 2, 3, 2, 3, 2, 2, 3, 2, 2],
        [2, 3, 2, 3, 2, 3, 2, 2, 3, 2, 2],
        [2, 3, 2, 3, 2, 3, 2, 2, 3, 2, 2],
        [2, 3, 2, 3, 2, 3, 2, 2, 3, 2, 2],
        [2, 3, 2, 3, 2, 3, 2, 2, 3, 2, 2],
        [2, 3, 2, 3, 2, 3, 2, 2, 3, 2, 2],
        [2, 3, 2, 3, 2, 3, 2, 2, 3, 2, 2],
        [1, 3, 1, 1, 3],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 3, 1, 1, 3],
        [1, 3, 1, 1, 3]
        [2, 3, 2, 3, 2, 3, 2, 2, 3, 2, 2],
        [2, 3, 2, 3, 2, 3, 2, 2, 3, 2, 2],
        [2, 3, 2, 3, 2, 3, 2, 2, 3, 2, 2],
        [2, 3, 2, 3, 2, 3, 2, 2, 3, 2, 2],
        [2, 3, 2, 3, 2, 3, 2, 2, 3, 2, 2],
        [2, 3, 2, 3, 2, 3, 2, 2, 3, 2, 2],
        [2, 3, 2, 3, 2, 3, 2, 2, 3, 2, 2],
        [2, 3, 2, 3, 2, 3, 2, 2, 3, 2, 2],
        [2, 3, 2, 3, 2, 3, 2, 2, 3, 2, 2],
        [2, 3, 2, 3, 2, 3, 2, 2, 3, 2, 2]
    ]