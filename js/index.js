const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const startScreen = document.querySelector('#startScreen')
startScreen.style.display = 'block'
canvas.width = 1280
canvas.height = 768

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

const enemies = []
const explosions = []
const buildings = []
let placementTilesData2D = []

let pause = false
let autoWave = true
let wave = 1
let hearts = 10
let coins = 150
let activeTile = undefined
let enemyCount = 3
let animationId
let buildingType = 'building1'
let placementTiles = []
let placementTilesData
let images = ['img/gameMap.png', 'img/gameMap2.png']
let map = 1
let start = true

let imagePreview = new Image()
imagePreview.src = 'sprites/tower.png'

let image = new Image()
image.onload = () => {
    init()
    animate()
}
image.src = images[map - 1]

function spawnEnemies(spawnCount) {
    for (let i = 0; i < spawnCount; i++) {
        const xOffset = (i + 1) * 100
        if (waves[(wave - 1) % waves.length][i] === 1) {
            enemies.push(new Enemy1({
                position: { x: waypoints[0].x - xOffset, y: waypoints[0].y },
                stats: enemyStats[0]
            }))
        } else if (waves[(wave - 1) % waves.length][i] === 2) {
            enemies.push(new Enemy2({
                position: { x: waypoints[0].x - xOffset, y: waypoints[0].y },
                stats: enemyStats[1]
            }))
        } else if (waves[(wave - 1) % waves.length][i] === 3) {
            enemies.push(new Enemy3({
                position: { x: waypoints[0].x - xOffset, y: waypoints[0].y },
                stats: enemyStats[2]
            }))
        }
    }
}

function init() {
    document.querySelector('#gameOver').style.display = 'none';
    placementTiles = [];
    placementTilesData2D = []
    activeTile = undefined;
    wave = 1;
    hearts = 10;
    enemyCount = 3;
    coins = 150;
    buildings.length = 0;
    enemies.length = 0;
    explosions.length = 0;

    image = new Image()
    image.src = images[map - 1]

    placementTilesData = placementTilesDataAll[map - 1]
    waypoints = waypointsAll[map - 1]

    for (let i = 0; i < placementTilesData.length; i += 20) {
        placementTilesData2D.push(placementTilesData.slice(i, i + 20))
    }
    placementTilesData2D.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === 14) {
                // add building placement tile here
                placementTiles.push(new PlacementTile({ position: { x: x * 64, y: y * 64 } }))
            }
        })
    });
    spawnCount = waves[wave - 1].length
    document.querySelector('#wave').innerHTML = wave;
    document.querySelector('#hearts').innerHTML = hearts;
    document.querySelector('#enemies').innerHTML = enemyCount;
    document.querySelector('#coins').innerHTML = coins;
    spawnEnemies(enemyCount);1
}

function animate() {
    console.log('animate')
    animationId = requestAnimationFrame(animate)
    c.drawImage(image, 0, 0)
    if (buildingType === 'building2') {
        c.filter = 'hue-rotate(225deg)'
    } else if (buildingType === 'building3') {
        c.filter = 'hue-rotate(90deg)'
    } else if (buildingType === 'building4') {
        c.filter = 'hue-rotate(-30deg)'
    }

    c.drawImage(imagePreview, 0, 0, imagePreview.width / 19, imagePreview.height, mouse.x, mouse.y, 64, 64)
    c.filter = 'none'

    if (start === true) {
        cancelAnimationFrame(animationId)
    }

    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i]
        enemy.update()

        if (enemy.position.x > canvas.width) {
            hearts -= 1
            enemies.splice(i, 1)
            document.querySelector('#hearts').innerHTML = hearts

            if (hearts === 0) {
                document.querySelector('#gameOver').style.display = 'flex'
            }
        }
    }

    for (let i = explosions.length - 1; i >= 0; i--) {
        const explosion = explosions[i]
        if (explosion.frames.current >= explosion.frames.max - 1) {
            explosions.splice(i, 1)
        }
        explosion.draw()
        explosion.update()
    }

    // tracking total number of enemies
    if (autoWave === true) {
        if (enemies.length === 0 && hearts > 0) {
            wave += 1
            waveSpawn = waves[(wave - 1) % waves.length]
            enemyCount = waveSpawn.length
            spawnEnemies(enemyCount)
            document.querySelector('#wave').innerHTML = wave
            document.querySelector('#enemies').innerHTML = enemyCount
        }
    }

    placementTiles.forEach((tile) => {
        tile.update(mouse)
    })
    buildings.forEach((building) => {
        building.update()
        building.target = null
        const validEnemies = enemies.filter(enemy => {
            const xDifference = enemy.center.x - building.position.x
            const yDifference = enemy.center.y - building.position.y
            const distance = Math.hypot(xDifference, yDifference)
            return distance < enemy.radius + building.radius
        })
        validEnemies.sort((a, b) => {
            if (b.waypointIndex !== a.waypointIndex) {
                return b.waypointIndex - a.waypointIndex // Sort by index in descending order
            } else {

                return (Math.hypot(a.center.x - waypoints[a.waypointIndex].x, a.center.y - waypoints[a.waypointIndex].y) -
                    Math.hypot(b.center.x - waypoints[b.waypointIndex].x, b.center.y - waypoints[b.waypointIndex].y))  // Sort by bla in descending order if indices are equal
            }
        });
        building.target = validEnemies[0]

        for (let i = building.projectiles.length - 1; i >= 0; i--) {
            const projectile = building.projectiles[i]
            projectile.update()

            const xDifference = projectile.enemy.center.x - projectile.position.x
            const yDifference = projectile.enemy.center.y - projectile.position.y
            const distance = Math.hypot(xDifference, yDifference)

            // this is when a projectile hits an enemy
            if (distance < projectile.enemy.radius + projectile.radius) {
                projectile.enemy.health -= 20 * projectile.power
                if (projectile.enemy.health <= 0) {
                    const enemyIndex = enemies.findIndex((enemy) => {
                        return projectile.enemy === enemy
                    })
                    if (enemyIndex > -1) {
                        coins += projectile.enemy.reward
                        enemies.splice(enemyIndex, 1)
                        document.querySelector('#coins').innerHTML = coins
                    }
                }

                explosions.push(new Sprite(
                    { position: { x: projectile.position.x, y: projectile.position.y }, imageSrc: './sprites/explosion.png', frames: { max: 4, hold: 3 }, offset: { x: 0, y: 0 } }))
                building.projectiles.splice(i, 1)

            }
        }
    })
}

const mouse = {
    x: undefined,
    y: undefined
}

document.addEventListener('keydown', event => {
    console.log(pause)
    console.log(start)
    if (event.code === 'Space') {
        if (pause === false && start === false) {
            pause = true
            cancelAnimationFrame(animationId)
        }
        else if (pause === true && start === false) {
            pause = false
            animate()
        }
    }

    if (start === true) {
        start = false
        startScreen.style.display = 'none'
        animate()
    }
    if (event.code === 'Enter') {
        pause = false
        if (event.code === 'Enter') {
            pause = false
            start = false
            cancelAnimationFrame(animationId)
            init();
            animate()
        }
    }

});

document.addEventListener('keydown', event => {
    if (event.key === '1') {
        buildingType = 'building1'
        imagePreview = new Image()
        imagePreview.src = 'sprites/tower.png'
    } else if (event.key === '2') {
        buildingType = 'building2'
    } else if (event.key === '3') {
        buildingType = 'building3'
    } else if (event.key === '4') {
        buildingType = 'building4'
    }
});

canvas.addEventListener('click', (event) => {
    if (activeTile && !activeTile.isOccupied) {

        if (buildingType === 'building1' && coins - buildingStats1.cost >= 0) {
            coins -= buildingStats1.cost
            buildings.push(new Building1({
                position: {
                    x: activeTile.position.x,
                    y: activeTile.position.y
                },
                stats: buildingStats[0]
            }))
            activeTile.isOccupied = true
        } else if (buildingType === 'building2' && coins - buildingStats2.cost >= 0) {
            coins -= buildingStats2.cost
            buildings.push(new Building2({
                position: {
                    x: activeTile.position.x,
                    y: activeTile.position.y
                },
                stats: buildingStats[1]
            }))
            activeTile.isOccupied = true
        } else if (buildingType === 'building3' && coins - buildingStats3.cost >= 0) {
            coins -= buildingStats3.cost
            buildings.push(new Building3({
                position: {
                    x: activeTile.position.x,
                    y: activeTile.position.y
                },
                stats: buildingStats[2]
            }))
            activeTile.isOccupied = true
        } else if (buildingType === 'building4' && coins - buildingStats4.cost >= 0) {
            coins -= buildingStats3.cost
            buildings.push(new Building4({
                position: {
                    x: activeTile.position.x,
                    y: activeTile.position.y
                },
                stats: buildingStats[3]
            }))
            activeTile.isOccupied = true
        }

        document.querySelector('#coins').innerHTML = coins

        buildings.sort((a, b) => {
            return a.position.y - b.position.y
        })
    }
})

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY

    activeTile = null
    for (let i = 0; i < placementTiles.length; i++) {
        const tile = placementTiles[i]
        if (mouse.x > tile.position.x && mouse.x < tile.position.x + tile.size &&
            mouse.y > tile.position.y && mouse.y < tile.position.y + tile.size) {
            activeTile = tile
            break
        }
    }
})

const stopButton = document.querySelector('.stop-button');
stopButton.addEventListener('click', () => {
    autoWave = !autoWave
    if (autoWave === true) stopButton.innerHTML = 'Autowave: on'
    else if (autoWave === false) stopButton.innerHTML = 'Autowave: off'
})

const mapButton = document.querySelector('.map-button');
mapButton.addEventListener('click', () => {
    map += 1
    if (map > images.length) map = 1
    mapButton.innerHTML = 'Map: ' + map
})