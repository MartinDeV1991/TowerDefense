class Projectile extends Sprite {
    constructor({ position = { x: 0, y: 0 }, enemy, speed = 1, power = 1 }) {
        super({position, imageSrc: 'sprites/projectile.png'})
        this.velocity = { x: 0, y: 0 }

        this.enemy = enemy
        this.radius = 15
        this.speed = speed
        this.power = power
    }
    
    update() {
        this.draw()

        const angle = Math.atan2(this.enemy.center.y - this.position.y, this.enemy.center.x - this.position.x)

        const speed = 10 * this.speed
        this.velocity.x = Math.cos(angle) * speed
        this.velocity.y = Math.sin(angle) * speed

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}