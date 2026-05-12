/* ============================================
   GAYA — Player Controller
   Uses a single sprite sheet (sprite-max-px-36.png).
   
   Sheet: 6 cols × 6 rows = 504×634 per frame
     Row 0-1 (12 frames): Front / Down  — facing camera
     Row 2-3 (12 frames): Right side    — walking right
     Row 4-5 (12 frames): Back / Up     — facing away
     Left = mirrored Right (horizontal flip)
   
   Idle = frame 0 (static).
   Walking = cycle through frames.
   No separate run sprite — Shift just increases speed.
   ============================================ */

window.GAYA = window.GAYA || {};

GAYA.Player = (function() {
    'use strict';

    var CFG = GAYA.Config;
    var TILE_SIZE = CFG.TILE_SIZE;
    var ANIM_FPS = CFG.ANIM_FPS || 8;
    var MOVE_SPEED = CFG.MOVE_SPEED || 150;
    var RENDER_SCALE = CFG.PLAYER_RENDER_SCALE || 0.12;
    var GRID = CFG.spriteGrid;

    /* Pre-extracted frame canvases */
    var frames = null; // { down: [], right: [], left: [], up: [] }

    /* Extract frames from loaded sprite sheet image */
    function extractFrames(img) {
        if (frames) return;

        var cols = GRID.cols;  // 6
        var fw = GRID.fw;     // 504
        var fh = GRID.fh;     // 634

        frames = { down: [], right: [], left: [], up: [] };

        /* Row 0-1 → Down/Front (12 frames) */
        for (var r = 0; r < 2; r++) {
            for (var c = 0; c < cols; c++) {
                var canvas = _cutFrame(img, c * fw, r * fh, fw, fh);
                frames.down.push(canvas);
            }
        }

        /* Row 2-3 → Right (12 frames) */
        for (var r = 2; r < 4; r++) {
            for (var c = 0; c < cols; c++) {
                var canvas = _cutFrame(img, c * fw, r * fh, fw, fh);
                frames.right.push(canvas);
            }
        }

        /* Row 4-5 → Up/Back (12 frames) */
        for (var r = 4; r < 6; r++) {
            for (var c = 0; c < cols; c++) {
                var canvas = _cutFrame(img, c * fw, r * fh, fw, fh);
                frames.up.push(canvas);
            }
        }

        /* Left = mirrored Right */
        frames.left = [];
        for (var i = 0; i < frames.right.length; i++) {
            var src = frames.right[i];
            var lc = document.createElement('canvas');
            lc.width = fw; lc.height = fh;
            var lctx = lc.getContext('2d');
            lctx.save();
            lctx.scale(-1, 1);
            lctx.drawImage(src, -fw, 0);
            lctx.restore();
            frames.left.push(lc);
        }
    }

    /* Cut one frame from the sheet into its own canvas */
    function _cutFrame(img, sx, sy, w, h) {
        var c = document.createElement('canvas');
        c.width = w; c.height = h;
        var ctx = c.getContext('2d');
        ctx.drawImage(img, sx, sy, w, h, 0, 0, w, h);
        return c;
    }

    var player = {
        x: 0, y: 0,
        velX: 0, velY: 0,
        direction: 0,   // 0=Down, 1=Left, 2=Right, 3=Up
        frame: 0,
        animTimer: 0,
        moving: false,

        init: function(sx, sy) {
            this.x = sx * TILE_SIZE;
            this.y = sy * TILE_SIZE;
            this.velX = 0;
            this.velY = 0;
            this.frame = 0;
            this.animTimer = 0;
            this.moving = false;
        },

        update: function(dt, keys, solid, MW, MH) {
            var dx = 0, dy = 0;
            if (keys.w || keys.ArrowUp)    dy -= 1;
            if (keys.s || keys.ArrowDown)  dy += 1;
            if (keys.a || keys.ArrowLeft)  dx -= 1;
            if (keys.d || keys.ArrowRight) dx += 1;

            /* Diagonal normalization */
            if (dx !== 0 && dy !== 0) {
                var inv = 1 / Math.SQRT2;
                dx *= inv; dy *= inv;
            }

            this.moving = (dx !== 0 || dy !== 0);

            /* Speed — Shift makes you walk faster (no separate run sprite) */
            var spd = keys.Shift && this.moving ? MOVE_SPEED * 1.6 : MOVE_SPEED;

            /* Velocity interpolation */
            var targetVX = dx * spd;
            var targetVY = dy * spd;
            this.velX += (targetVX - this.velX) * 8 * dt;
            this.velY += (targetVY - this.velY) * 8 * dt;
            if (Math.abs(this.velX) < 0.5 && dx === 0) this.velX = 0;
            if (Math.abs(this.velY) < 0.5 && dy === 0) this.velY = 0;

            /* Direction */
            if (this.moving) {
                if (dx > 0)  this.direction = 2; // Right
                else if (dx < 0) this.direction = 1; // Left
                if (dy > 0 && Math.abs(dy) >= Math.abs(dx)) this.direction = 0; // Down
                else if (dy < 0 && Math.abs(dy) >= Math.abs(dx)) this.direction = 3; // Up
            }

            /* Collision detection */
            var rw = GRID.fw * RENDER_SCALE;
            var rh = GRID.fh * RENDER_SCALE;
            var cw = rw * 0.4;
            var ch = rh * 0.2;
            var offsetX = (rw - cw) / 2;
            var offsetY = rh - ch;

            var nx = this.x + this.velX * dt;
            var ny = this.y + this.velY * dt;

            /* Try combined movement first */
            if (!this._collides(nx, ny, offsetX, offsetY, cw, ch, solid, MW, MH)) {
                this.x = nx;
                this.y = ny;
            } else {
                /* Wall sliding: try X and Y independently */
                if (!this._collides(nx, this.y, offsetX, offsetY, cw, ch, solid, MW, MH)) {
                    this.x = nx;
                }
                if (!this._collides(this.x, ny, offsetX, offsetY, cw, ch, solid, MW, MH)) {
                    this.y = ny;
                }
            }

            /* Animation */
            if (this.moving) {
                this.animTimer += dt;
                var interval = keys.Shift ? (1 / (ANIM_FPS * 1.3)) : (1 / ANIM_FPS);
                if (this.animTimer >= interval) {
                    this.animTimer -= interval;
                    this.frame = (this.frame + 1) % GRID.framesPerDir;
                }
            } else {
                /* Idle = static frame 0 */
                this.frame = 0;
                this.animTimer = 0;
            }
        },

        _collides: function(px, py, ox, oy, cw, ch, solid, MW, MH) {
            var tl = Math.floor((px + ox) / TILE_SIZE);
            var tr = Math.floor((px + ox + cw) / TILE_SIZE);
            var tt = Math.floor((py + oy) / TILE_SIZE);
            var tb = Math.floor((py + oy + ch) / TILE_SIZE);
            for (var ty = tt; ty <= tb; ty++) {
                for (var tx = tl; tx <= tr; tx++) {
                    if (ty >= 0 && ty < MH && tx >= 0 && tx < MW) {
                        if (solid[ty][tx]) return true;
                    } else { return true; }
                }
            }
            return false;
        },

        _getGrid: function() {
            return GRID;
        },

        draw: function(ctx, assets) {
            /* Extract frames on first draw */
            if (!frames && assets.playerSprite) {
                extractFrames(assets.playerSprite);
            }
            if (!frames) return;

            var dirKey;
            switch (this.direction) {
                case 0: dirKey = 'down'; break;
                case 1: dirKey = 'left'; break;
                case 2: dirKey = 'right'; break;
                case 3: dirKey = 'up'; break;
                default: dirKey = 'down';
            }

            var dirFrames = frames[dirKey];
            if (!dirFrames || dirFrames.length === 0) return;

            var f = this.frame % dirFrames.length;
            var sprite = dirFrames[f];

            var dw = sprite.width * RENDER_SCALE;
            var dh = sprite.height * RENDER_SCALE;

            /* Shadow */
            ctx.fillStyle = 'rgba(0,0,0,0.12)';
            ctx.beginPath();
            ctx.ellipse(
                this.x + dw / 2,
                this.y + dh - 4,
                dw * 0.25, 5,
                0, 0, Math.PI * 2
            );
            ctx.fill();

            /* Draw sprite — crisp pixel art */
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(sprite, Math.floor(this.x), Math.floor(this.y), dw, dh);
            ctx.imageSmoothingEnabled = true;
        }
    };

    return player;
})();
