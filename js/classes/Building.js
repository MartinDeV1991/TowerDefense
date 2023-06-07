class Building extends Sprite {
    constructor({ position = { x: 0, y: 0 }, stats }) {
        super({ position, imageSrc: 'sprites/tower.png', frames: { max: 19 }, offset: { x: 0, y: -80 } })
        
        this.projectileSpeed = stats.projectileSpeed
        this.speed = stats.speed
        this.power = stats.power
        this.width = 64 * 2
        this.height = 64
        this.center = { x: this.position.x + this.width / 2, y: this.position.y + this.height / 2 }
        this.projectiles = []
        this.target
        this.frames.hold = Math.floor(5 / this.speed)
    }
    draw() {
        super.draw()
    }

    update() {
        this.draw()
        if (this.target || !this.target && this.frames.current !== 0) super.update()
        if (this.target && this.frames.current === 6 && this.frames.elapsed % this.frames.hold === 0) {
            this.shoot()
        }
    }
    shoot() {
        this.projectiles.push(new Projectile({
            position: {
                x: this.center.x - 20,
                y: this.center.y - 105
            },
            enemy: this.target,
            projectileSpeed: this.projectileSpeed,
            power: this.power
        }))

    }
}

class Building1 extends Building {
    constructor({ position = { x: 0, y: 0 }, stats }) {
        super({ position, stats})
        this.speed = stats.speed
        this.power = stats.power
        this.projectileSpeed = stats.projectileSpeed
        this.radius = stats.radius
    }
    draw() {
        super.draw()
    }
}

class Building2 extends Building {
    constructor({ position = { x: 0, y: 0 }, stats }) {
        super({ position, stats})
        this.speed = stats.speed
        this.power = stats.power
        this.projectileSpeed = stats.projectileSpeed
        this.radius = stats.radius
    }
    draw() {
        c.filter = 'hue-rotate(225deg)'
        super.draw()
        c.filter = 'none';
        // c.beginPath()
        // c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        // c.fillStyle = 'rgba(0, 0, 255, 0.1)'
        // c.fill()
    }
}

class Building3 extends Building {
    constructor({ position = { x: 0, y: 0 }, stats }) {
        super({ position, stats})
        this.speed = stats.speed
        this.power = stats.power
        this.projectileSpeed = stats.projectileSpeed
        this.radius = stats.radius
    }
    draw() {
        c.filter = 'hue-rotate(90deg)'
        super.draw()
        c.filter = 'none';
    }
}

class Building4 extends Building {
    constructor({ position = { x: 0, y: 0 }, stats }) {
        super({ position, stats})
        this.speed = stats.speed
        this.power = stats.power
        this.projectileSpeed = stats.projectileSpeed
        this.radius = stats.radius
    }
    draw() {
        c.filter = 'hue-rotate(-30deg)'
        super.draw()
        c.filter = 'none';
    }
}




