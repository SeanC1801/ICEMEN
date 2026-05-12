// =============================================
// GAYA - 2D Narrative Game Prototype
// Player Movement System (Sprite Sheet Based)
// =============================================

const W = 960, H = 540;
const GROUND_Y_MIN = 400;
const GROUND_Y_MAX = 500;
const MOVE_SPEED = 180;
const VERT_SPEED = 90;
const ANIM_FPS = 10;
const SCALE = 7;
const ROOM_L = 60, ROOM_R = 900;

// Sprite sheet: 80x100 image, 4 cols x 5 rows = 20x20px per cell
// Walking right uses 8 frames (rows 0-3, cols 0-1 reading left-to-right, top-to-bottom)
// Actual layout per the concept art: 2 columns × 4 rows for the 8 walk frames
// But the PNG is actually 4 cols × 5 rows of 20×20 cells
const CELL_W = 20, CELL_H = 20;
const SHEET_COLS = 4;
// We use first 8 frames: row0-col0, row0-col1, row0-col2, row0-col3, row1-col0, row1-col1, row1-col2, row1-col3
const TOTAL_WALK_FRAMES = 8;

// --- Input ---
const keys = {};
window.addEventListener('keydown', e => {
    keys[e.code] = true;
    if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Space'].includes(e.code)) {
        e.preventDefault();
    }
});
window.addEventListener('keyup', e => { keys[e.code] = false; });

function getInput() {
    let dx = 0, dy = 0;
    if (keys['ArrowLeft']  || keys['KeyA']) dx -= 1;
    if (keys['ArrowRight'] || keys['KeyD']) dx += 1;
    if (keys['ArrowUp']    || keys['KeyW']) dy -= 1;
    if (keys['ArrowDown']  || keys['KeyS']) dy += 1;
    if (dx !== 0 && dy !== 0) {
        const inv = 1 / Math.SQRT2;
        dx *= inv; dy *= inv;
    }
    return { dx, dy };
}

// --- Sprite Sheet Loader ---
class SpriteSheet {
    constructor() {
        this.loaded = false;
        this.image = new Image();
        this.framesRight = [];
        this.framesLeft = [];
    }

    load(src) {
        return new Promise((resolve, reject) => {
            this.image.onload = () => {
                this.extractFrames();
                this.loaded = true;
                resolve();
            };
            this.image.onerror = reject;
            this.image.src = src;
        });
    }

    extractFrames() {
        // Extract 8 walking frames from the 4×5 grid (first 2 rows)
        for (let i = 0; i < TOTAL_WALK_FRAMES; i++) {
            const col = i % SHEET_COLS;
            const row = Math.floor(i / SHEET_COLS);
            const sx = col * CELL_W;
            const sy = row * CELL_H;

            // Right-facing frame (original)
            const rc = document.createElement('canvas');
            rc.width = CELL_W; rc.height = CELL_H;
            const rCtx = rc.getContext('2d');
            rCtx.drawImage(this.image, sx, sy, CELL_W, CELL_H, 0, 0, CELL_W, CELL_H);
            this.framesRight.push(rc);

            // Left-facing frame (mirrored)
            const lc = document.createElement('canvas');
            lc.width = CELL_W; lc.height = CELL_H;
            const lCtx = lc.getContext('2d');
            lCtx.save();
            lCtx.scale(-1, 1);
            lCtx.drawImage(rc, -CELL_W, 0);
            lCtx.restore();
            this.framesLeft.push(lc);
        }
    }
}

// --- Room Drawing ---
function drawRoom(ctx) {
    const wallGrad = ctx.createLinearGradient(0, 0, 0, GROUND_Y_MIN);
    wallGrad.addColorStop(0, '#e8ddd0');
    wallGrad.addColorStop(1, '#ddd0c0');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(0, 0, W, GROUND_Y_MIN);

    ctx.fillStyle = '#8b7355';
    ctx.fillRect(0, GROUND_Y_MIN - 12, W, 12);
    ctx.fillStyle = '#7a6548';
    ctx.fillRect(0, GROUND_Y_MIN - 13, W, 2);

    const floorGrad = ctx.createLinearGradient(0, GROUND_Y_MIN, 0, H);
    floorGrad.addColorStop(0, '#b0946c');
    floorGrad.addColorStop(1, '#8a7050');
    ctx.fillStyle = floorGrad;
    ctx.fillRect(0, GROUND_Y_MIN, W, H - GROUND_Y_MIN);

    ctx.strokeStyle = 'rgba(100,70,30,0.25)';
    ctx.lineWidth = 0.5;
    for (let py = GROUND_Y_MIN; py < H; py += 18) {
        ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(W, py); ctx.stroke();
    }
    for (let px = 30; px < W; px += 120) {
        for (let py = GROUND_Y_MIN; py < H; py += 18) {
            const off = (Math.floor((py - GROUND_Y_MIN) / 18) % 2) * 60;
            ctx.beginPath(); ctx.moveTo(px + off, py); ctx.lineTo(px + off, py + 18); ctx.stroke();
        }
    }

    const floorShadow = ctx.createLinearGradient(0, GROUND_Y_MIN, 0, GROUND_Y_MIN + 30);
    floorShadow.addColorStop(0, 'rgba(0,0,0,0.12)');
    floorShadow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = floorShadow;
    ctx.fillRect(0, GROUND_Y_MIN, W, 30);

    drawWindow(ctx, 200, 80, 120, 140);
    drawPicture(ctx, 600, 100, 70, 55);
    drawShelf(ctx, 720, 150, 100, 12);
    drawBookshelf(ctx, 40, 200, 80, 188);
    drawBed(ctx, 740, 265, 180, 123);
    drawNightstand(ctx, 680, 310, 50, 78);
    drawRug(ctx, 330, GROUND_Y_MIN + 20, 220, 60);

    ctx.fillStyle = 'rgba(255,245,220,0.05)';
    ctx.beginPath();
    ctx.moveTo(200, 80); ctx.lineTo(100, H); ctx.lineTo(420, H); ctx.lineTo(320, 80);
    ctx.closePath(); ctx.fill();
}

function drawWindow(ctx, x, y, w, h) {
    ctx.fillStyle = '#7a6548';
    ctx.fillRect(x - 4, y - 4, w + 8, h + 8);
    const skyGrad = ctx.createLinearGradient(x, y, x, y + h);
    skyGrad.addColorStop(0, '#a8d8ea'); skyGrad.addColorStop(1, '#cbe8f0');
    ctx.fillStyle = skyGrad; ctx.fillRect(x, y, w, h);
    ctx.fillStyle = '#7a6548';
    ctx.fillRect(x + w/2 - 2, y, 4, h); ctx.fillRect(x, y + h/2 - 2, w, 4);
    ctx.fillStyle = '#c9b8a0';
    ctx.fillRect(x - 12, y - 10, 16, h + 20); ctx.fillRect(x + w - 4, y - 10, 16, h + 20);
    ctx.fillStyle = '#6b5a3e'; ctx.fillRect(x - 16, y - 14, w + 32, 5);
}

function drawPicture(ctx, x, y, w, h) {
    ctx.fillStyle = '#6b5a3e'; ctx.fillRect(x - 4, y - 4, w + 8, h + 8);
    ctx.fillStyle = '#d4c4a0'; ctx.fillRect(x, y, w, h);
    ctx.fillStyle = '#8fbc8f'; ctx.beginPath();
    ctx.moveTo(x, y+h); ctx.lineTo(x+w*0.3, y+h*0.4); ctx.lineTo(x+w*0.6, y+h*0.7);
    ctx.lineTo(x+w*0.85, y+h*0.3); ctx.lineTo(x+w, y+h); ctx.closePath(); ctx.fill();
}

function drawShelf(ctx, x, y, w, h) {
    ctx.fillStyle = '#7a6548'; ctx.fillRect(x, y, w, h);
    ctx.fillStyle = '#6b5a3e'; ctx.fillRect(x, y+h, 4, 6); ctx.fillRect(x+w-4, y+h, 4, 6);
    ctx.fillStyle = '#d4a76a'; ctx.fillRect(x+10, y-18, 12, 18);
    ctx.fillStyle = '#6a8f6a'; ctx.beginPath(); ctx.arc(x+16, y-22, 6, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#b85c5c'; ctx.fillRect(x+60, y-14, 10, 14);
    ctx.fillStyle = '#5c7ab8'; ctx.fillRect(x+72, y-12, 8, 12);
}

function drawBookshelf(ctx, x, y, w, h) {
    ctx.fillStyle = '#6b5a3e'; ctx.fillRect(x, y, w, h);
    ctx.fillStyle = '#5a4a30'; ctx.fillRect(x, y, w, 3);
    const colors = ['#c06040','#4080a0','#80a040','#a06080','#d0a040','#6060a0','#a04040','#40a080'];
    for (let sy = 0; sy < 4; sy++) {
        const sY = y + 6 + sy * 46;
        ctx.fillStyle = '#5a4a30'; ctx.fillRect(x+3, sY+40, w-6, 3);
        let bx = x + 6;
        for (let b = 0; b < 5; b++) {
            const bw = 8 + ((sy*7+b*13)%5), bh = 30 + ((sy*3+b*7)%10);
            ctx.fillStyle = colors[(sy*5+b)%colors.length];
            ctx.fillRect(bx, sY+40-bh, bw, bh);
            ctx.strokeStyle = 'rgba(0,0,0,0.2)'; ctx.lineWidth = 0.5;
            ctx.strokeRect(bx, sY+40-bh, bw, bh);
            bx += bw + 2; if (bx > x+w-10) break;
        }
    }
    ctx.fillStyle = '#d4a030'; ctx.fillRect(x+8, y+52, 14, 34);
    ctx.fillStyle = '#fff'; ctx.font = 'bold 16px Inter, sans-serif'; ctx.fillText('?', x+12, y+76);
}

function drawBed(ctx, x, y, w, h) {
    ctx.fillStyle = '#7a6548'; ctx.fillRect(x, y+h-20, w, 20);
    ctx.fillStyle = '#e8ddd0'; ctx.fillRect(x+5, y+20, w-10, h-40);
    ctx.strokeStyle = '#c0b090'; ctx.lineWidth = 1; ctx.strokeRect(x+5, y+20, w-10, h-40);
    ctx.fillStyle = '#8faa8f'; ctx.fillRect(x+5, y+40, w-10, h-60);
    ctx.strokeStyle = '#6a8a6a'; ctx.strokeRect(x+5, y+40, w-10, h-60);
    ctx.fillStyle = '#f5f0e8'; roundRectSimple(ctx, x+10, y+22, 50, 20, 6);
    ctx.strokeStyle = '#d0c8b8'; ctx.lineWidth = 0.8; ctx.stroke();
    ctx.fillStyle = '#6b5a3e'; ctx.fillRect(x+w-8, y, 8, h);
    ctx.fillStyle = '#5a4a30'; ctx.fillRect(x, y+h, 6, 12); ctx.fillRect(x+w-6, y+h, 6, 12);
}

function drawNightstand(ctx, x, y, w, h) {
    ctx.fillStyle = '#7a6548'; ctx.fillRect(x, y, w, h);
    ctx.fillStyle = '#6b5a3e'; ctx.fillRect(x+2, y+2, w-4, 3); ctx.fillRect(x+15, y+h/2-2, 20, 4);
    ctx.fillStyle = '#8b7355'; ctx.fillRect(x+18, y-8, 8, 8); ctx.fillRect(x+20, y-28, 4, 20);
    ctx.fillStyle = '#f0dcc0'; ctx.beginPath();
    ctx.moveTo(x+10, y-28); ctx.lineTo(x+34, y-28); ctx.lineTo(x+30, y-48); ctx.lineTo(x+14, y-48);
    ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#c0a880'; ctx.lineWidth = 0.8; ctx.stroke();
    ctx.fillStyle = 'rgba(255,240,200,0.08)'; ctx.beginPath(); ctx.arc(x+22, y-30, 50, 0, Math.PI*2); ctx.fill();
}

function drawRug(ctx, x, y, w, h) {
    ctx.fillStyle = '#8b6040'; roundRectSimple(ctx, x, y, w, h, 4);
    ctx.strokeStyle = '#6b4020'; ctx.lineWidth = 2; ctx.stroke();
    ctx.strokeStyle = '#a07050'; ctx.lineWidth = 1; roundRectSimple(ctx, x+8, y+6, w-16, h-12, 2); ctx.stroke();
    ctx.fillStyle = '#a07850'; ctx.beginPath();
    ctx.moveTo(x+w/2, y+10); ctx.lineTo(x+w/2+25, y+h/2);
    ctx.lineTo(x+w/2, y+h-10); ctx.lineTo(x+w/2-25, y+h/2); ctx.closePath(); ctx.fill();
}

function roundRectSimple(ctx, x, y, w, h, r) {
    ctx.beginPath(); ctx.moveTo(x+r, y);
    ctx.arcTo(x+w, y, x+w, y+h, r); ctx.arcTo(x+w, y+h, x, y+h, r);
    ctx.arcTo(x, y+h, x, y, r); ctx.arcTo(x, y, x+w, y, r);
    ctx.closePath(); ctx.fill();
}

// --- Dust Particles ---
class Particle {
    constructor() { this.reset(true); }
    reset(init) {
        this.x = Math.random() * W;
        this.y = init ? Math.random() * GROUND_Y_MIN : -5;
        this.size = 1 + Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = 0.15 + Math.random() * 0.3;
        this.alpha = 0.1 + Math.random() * 0.15;
        this.life = 0;
    }
    update(dt) {
        this.x += this.speedX; this.y += this.speedY; this.life += dt;
        if (this.y > GROUND_Y_MIN || this.life > 15) this.reset(false);
    }
    draw(ctx) {
        ctx.fillStyle = `rgba(255,245,220,${this.alpha})`;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fill();
    }
}

// --- Player ---
class Player {
    constructor(spriteSheet) {
        this.x = W / 2;
        this.y = GROUND_Y_MIN + 40;
        this.sprites = spriteSheet;
        this.facing = 'right';
        this.moving = false;
        this.frame = 0;
        this.animTimer = 0;
        this.velX = 0;
        this.velY = 0;
    }

    update(dt) {
        const input = getInput();
        this.moving = (input.dx !== 0 || input.dy !== 0);

        if (input.dx > 0) this.facing = 'right';
        else if (input.dx < 0) this.facing = 'left';

        const targetX = input.dx * MOVE_SPEED;
        const targetY = input.dy * VERT_SPEED;
        this.velX += (targetX - this.velX) * 8 * dt;
        this.velY += (targetY - this.velY) * 8 * dt;
        if (Math.abs(this.velX) < 0.5 && input.dx === 0) this.velX = 0;
        if (Math.abs(this.velY) < 0.5 && input.dy === 0) this.velY = 0;

        this.x += this.velX * dt;
        this.y += this.velY * dt;

        const hw = (CELL_W * SCALE) / 2;
        this.x = Math.max(ROOM_L + hw, Math.min(ROOM_R - hw, this.x));
        this.y = Math.max(GROUND_Y_MIN + 10, Math.min(GROUND_Y_MAX, this.y));

        if (this.moving) {
            this.animTimer += dt;
            if (this.animTimer >= 1 / ANIM_FPS) {
                this.animTimer -= 1 / ANIM_FPS;
                this.frame = (this.frame + 1) % TOTAL_WALK_FRAMES;
            }
        } else {
            this.frame = 0;
            this.animTimer = 0;
        }
    }

    draw(ctx) {
        const frames = this.facing === 'right' ? this.sprites.framesRight : this.sprites.framesLeft;
        const sprite = frames[this.frame];
        const dw = CELL_W * SCALE;
        const dh = CELL_H * SCALE;
        const dx = this.x - dw / 2;
        const dy = this.y - dh;

        // Depth-scaled shadow
        const depthFactor = (this.y - GROUND_Y_MIN) / (GROUND_Y_MAX - GROUND_Y_MIN);
        ctx.fillStyle = `rgba(0,0,0,${0.1 + depthFactor * 0.08})`;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y + 2, dw * 0.3, 4 + depthFactor * 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Crisp pixel art scaling
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(sprite, dx, dy, dw, dh);
        ctx.imageSmoothingEnabled = true;
    }
}

// --- Main Game ---
async function init() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const spriteSheet = new SpriteSheet();
    await spriteSheet.load('walk_right.png');

    const player = new Player(spriteSheet);
    const particles = Array.from({ length: 20 }, () => new Particle());

    const roomCanvas = document.createElement('canvas');
    roomCanvas.width = W; roomCanvas.height = H;
    drawRoom(roomCanvas.getContext('2d'));

    let lastTime = performance.now();

    function gameLoop(now) {
        const dt = Math.min((now - lastTime) / 1000, 0.05);
        lastTime = now;

        player.update(dt);
        particles.forEach(p => p.update(dt));

        ctx.drawImage(roomCanvas, 0, 0);
        particles.forEach(p => p.draw(ctx));
        player.draw(ctx);

        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
}

init();
