/* ============================================
   GAYA — Player Controller
   Movement, collision detection, sprite animation,
   and shadow rendering for the player character.
   ============================================ */

window.GAYA = window.GAYA || {};

GAYA.Player = (function() {
    'use strict';

    var SCALE = GAYA.Config.SCALE;
    var TILE_SIZE = GAYA.Config.TILE_SIZE;

    var player = {
        x: 0, y: 0,
        width: 20 * SCALE,
        height: 20 * SCALE,
        speed: 110 * SCALE,
        runMult: 1.6,
        direction: 3,
        frame: 0,
        frameTimer: 0,
        state: 'idle',
        frameWidth: 20,
        frameHeight: 20,

        init: function(sx, sy) {
            this.x = sx * TILE_SIZE;
            this.y = sy * TILE_SIZE;
        },

        update: function(dt, keys, solid, MW, MH) {
            var dx = 0, dy = 0;
            if (keys.w || keys.ArrowUp)    dy -= 1;
            if (keys.s || keys.ArrowDown)  dy += 1;
            if (keys.a || keys.ArrowLeft)  dx -= 1;
            if (keys.d || keys.ArrowRight) dx += 1;
            if (dx !== 0 && dy !== 0) {
                var l = Math.sqrt(dx * dx + dy * dy);
                dx /= l; dy /= l;
            }
            var isRun = keys.Shift && (dx !== 0 || dy !== 0);
            var spd = isRun ? this.speed * this.runMult : this.speed;

            if (dx !== 0 || dy !== 0) {
                this.state = isRun ? 'run' : 'walk';
                if (Math.abs(dx) > Math.abs(dy)) this.direction = dx > 0 ? 2 : 1;
                else this.direction = dy > 0 ? 0 : 3;

                var nx = this.x + dx * spd * dt;
                var ny = this.y + dy * spd * dt;
                var padX = 6 * SCALE, padY = 10 * SCALE;
                var tl = Math.floor((nx + padX) / TILE_SIZE);
                var tr = Math.floor((nx + this.width - padX) / TILE_SIZE);
                var tt = Math.floor((ny + padY) / TILE_SIZE);
                var tb = Math.floor((ny + this.height) / TILE_SIZE);
                var col = false;
                for (var ty = tt; ty <= tb; ty++) {
                    for (var tx = tl; tx <= tr; tx++) {
                        if (ty >= 0 && ty < MH && tx >= 0 && tx < MW) {
                            if (solid[ty][tx]) col = true;
                        } else { col = true; }
                    }
                }
                if (!col) { this.x = nx; this.y = ny; }

                this.frameTimer += dt;
                if (this.frameTimer >= (isRun ? 0.08 : 0.12)) {
                    this.frameTimer = 0;
                    this.frame++;
                }
            } else {
                this.state = 'idle';
                this.frameTimer += dt;
                if (this.frameTimer >= 0.2) {
                    this.frameTimer = 0;
                    this.frame++;
                }
            }
        },

        draw: function(ctx, assets) {
            var img, maxF = 4;
            switch (this.state) {
                case 'walk': img = assets.playerWalk; maxF = 4; break;
                case 'run':  img = assets.playerRun;  maxF = 6; break;
                default:     img = assets.playerIdle;  maxF = 4;
            }
            // Shadow
            ctx.fillStyle = 'rgba(0,0,0,0.15)';
            ctx.beginPath();
            ctx.ellipse(
                this.x + this.width / 2,
                this.y + this.height - 2 * SCALE,
                this.width / 3, this.width / 6,
                0, 0, Math.PI * 2
            );
            ctx.fill();
            // Sprite
            var f = this.frame % maxF;
            ctx.drawImage(img,
                f * this.frameWidth, this.direction * this.frameHeight,
                this.frameWidth, this.frameHeight,
                Math.floor(this.x), Math.floor(this.y),
                this.width, this.height
            );
        }
    };

    return player;
})();
