class Projectile extends Sprite {
    constructor({ position = { x: 0, y: 0 }, enemy, projectileSpeed, power = 1 }) {
        super({position, imageSrc: 'sprites/projectile.png', projectileSpeed})
        this.velocity = { x: 0, y: 0 }

        this.enemy = enemy
        this.radius = 15
        this.projectileSpeed = projectileSpeed
        this.power = power
    }
    
    update() {
        this.draw()

        const angle = Math.atan2(this.enemy.center.y - this.position.y, this.enemy.center.x - this.position.x)

        this.velocity.x = Math.cos(angle) * this.projectileSpeed
        this.velocity.y = Math.sin(angle) * this.projectileSpeed

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}