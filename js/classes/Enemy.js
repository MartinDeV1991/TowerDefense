class Enemy extends Sprite {
    constructor({ position = { x: 0, y: 0 }, imageSrc, frames, offset, scale = 1 }) {
        super({position, imageSrc, frames, offset, scale})
        this.position = position
        this.width = 100
        this.height = 100
        this.waypointIndex = 0
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
        this.radius = 50
        this.startHealth = 100
        this.health = this.startHealth
        this.velocity = {
            x: 0,
            y: 0
        }
    }
    draw() {
        super.draw()
        // health bar
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y - 15, this.width, 10)
        
        c.fillStyle = 'green'
        c.fillRect(this.position.x, this.position.y - 15, this.width * this.health / this.startHealth, 10)
    }

    update() {
        this.draw()
        super.update()

        const waypoint = waypoints[this.waypointIndex]
        const xDistance = waypoint.x - this.center.x
        const yDistance = waypoint.y - this.center.y
        const angle = Math.atan2(yDistance, xDistance)

        this.velocity.x = Math.cos(angle) * this.speed
        this.velocity.y = Math.sin(angle) * this.speed

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
        if (Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) < Math.abs(this.velocity.x) &&
        Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) < Math.abs(this.velocity.y) && this.waypointIndex < waypoints.length - 1) {
            this.waypointIndex++
        }
    }
}

class Enemy1 extends Enemy {
    constructor({ position = { x: 0, y: 0 }, stats }) {
        super({position, imageSrc: 'sprites/orc.png', frames: {max: 7, hold: 3}, offset: { x: 0, y: 0}})
        this.startHealth = stats.health
        this.health = this.startHealth
        this.speed = stats.speed
        this.reward = stats.reward
    }
    draw() {
        super.draw()        
    }
}

class Enemy2 extends Enemy {
    constructor({ position = { x: 0, y: 0 }, stats }) {
        super({position, imageSrc: 'sprites/skeleton1.png', frames: {max: 4, hold: 8}, offset: { x: -100, y: -120}, scale: 2})
        this.startHealth = stats.health
        this.health = this.startHealth
        this.speed = stats.speed
        this.reward = stats.reward
    }
    draw() {
        super.draw()
    }
}

class Enemy3 extends Enemy {
    constructor({ position = { x: 0, y: 0 }, stats }) {
        super({position, imageSrc: 'sprites/goblin.png', frames: {max: 8, hold: 3}, offset: { x: -100, y: -120}, scale: 2})
        this.startHealth = stats.health
        this.health = this.startHealth
        this.speed = stats.speed
        this.reward = stats.reward
    }
    draw() {
        super.draw()        
    }
}

// class Enemy4 extends Enemy {
//     constructor({ position = { x: 0, y: 0 } }) {
//         super({position, imageSrc: 'sprites/skeleton.png', frames: {max: 13, hold: 3}, offset: { x: 30, y: 0}, scale: 2.5})
//         this.startHealth = 5000
//         this.health = this.startHealth
//         this.speed = 1
//     }
//     draw() {
//         super.draw()
//         c.beginPath()
//         c.arc(this.position.x + this.width / 2, this.position.y + this.height / 2, this.radius, 0, Math.PI * 2)
//         c.fillStyle = 'rgb(255, 215, 0, 0.3)'
//         c.fill()
        
//     }
// }
