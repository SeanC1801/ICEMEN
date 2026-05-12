/* ============================================
   GAYA — Renderer
   All canvas drawing: tile map, furniture,
   hotspot indicators, candle flame effects,
   pixel-art backgrounds, and object sprites.
   ============================================ */

window.GAYA = window.GAYA || {};

GAYA.Renderer = (function() {
    'use strict';

    var TILE_SIZE = GAYA.Config.TILE_SIZE;

    /* ---- Furniture visual styles ---- */
    var FURN_STYLE = {
        altar:             { fill: '#4a3a28', top: '#5a4a38', pad: 1 },
        bed:               { fill: '#8a7a68', top: '#d8d0c0', pad: 2 },
        dresser:           { fill: '#6b5a48', top: '#8a7a68', pad: 2 },
        nightstand:        { fill: '#6b5a48', top: '#8a7560', pad: 4 },
        dress_form:        { fill: '#9a8a78', top: '#b8a898', pad: 6 },
        fitting_mirror_obj:{ fill: '#8090a0', top: '#a0b0c0', pad: 6 },
        table_left:        { fill: '#6b5a48', top: '#8a7560', pad: 2 },
        table_right:       { fill: '#6b5a48', top: '#8a7560', pad: 2 },
        chair:             { fill: '#7a6a58', top: '#9a8a78', pad: 6 },
        center_table:      { fill: '#6b5a48', top: '#8a7560', pad: 2 },
    };

    /* ---- Draw the tile map (floor, walls, doors) ---- */
    function drawMap(ctx, tileMap, solid, mapColors, MW, MH, drawMapExtras, mapBgImage) {

        /* If a pixel art background image is available, draw it
           stretched to cover the full tile-grid area */
        if (mapBgImage && mapBgImage.complete && mapBgImage.naturalWidth > 0) {
            var mapW = MW * TILE_SIZE;
            var mapH = MH * TILE_SIZE;
            ctx.drawImage(mapBgImage, 0, 0, mapW, mapH);

            /* Still run drawExtras on top for banners, labels, etc. */
            if (drawMapExtras) drawMapExtras(ctx, TILE_SIZE);
            return;
        }

        /* ---- Fallback: procedural tile rendering ---- */
        for (var y = 0; y < MH; y++) {
            for (var x = 0; x < MW; x++) {
                var px = x * TILE_SIZE, py = y * TILE_SIZE, tile = tileMap[y][x];
                if (tile === 0) {
                    ctx.fillStyle = (x + y) % 2 === 0 ? mapColors.floor : mapColors.floorAlt;
                    ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
                    ctx.strokeStyle = 'rgba(0,0,0,0.03)'; ctx.lineWidth = 1;
                    ctx.strokeRect(px + 1, py + 1, TILE_SIZE - 2, TILE_SIZE - 2);
                } else if (tile === 1) {
                    ctx.fillStyle = y === 0 ? mapColors.wallTop : mapColors.wall;
                    ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
                    if (x === 0 || x === MW - 1) {
                        ctx.fillStyle = 'rgba(0,0,0,0.06)';
                        ctx.fillRect(px, py + TILE_SIZE * 0.6, TILE_SIZE, TILE_SIZE * 0.4);
                    }
                    ctx.strokeStyle = 'rgba(0,0,0,0.08)'; ctx.lineWidth = 1;
                    ctx.strokeRect(px, py, TILE_SIZE, TILE_SIZE);
                } else if (tile === 2) {
                    ctx.fillStyle = mapColors.door;
                    ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
                    ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 2;
                    ctx.strokeRect(px + 3, py + 2, TILE_SIZE - 6, TILE_SIZE - 4);
                }
            }
        }

        // Furniture with distinct styles
        for (var y = 0; y < MH; y++) {
            for (var x = 0; x < MW; x++) {
                if (solid[y][x] && solid[y][x].type) {
                    var px = x * TILE_SIZE, py = y * TILE_SIZE;
                    var style = FURN_STYLE[solid[y][x].type] || { fill: mapColors.furniture, top: mapColors.furnitureTop, pad: 2 };
                    var p = style.pad;
                    ctx.fillStyle = 'rgba(0,0,0,0.08)';
                    ctx.fillRect(px + p + 2, py + p + 2, TILE_SIZE - p * 2, TILE_SIZE - p * 2);
                    ctx.fillStyle = style.fill;
                    ctx.fillRect(px + p, py + p, TILE_SIZE - p * 2, TILE_SIZE - p * 2);
                    ctx.fillStyle = style.top;
                    ctx.fillRect(px + p + 2, py + p + 2, TILE_SIZE - p * 2 - 4, TILE_SIZE - p * 2 - 4);
                }
            }
        }

        if (drawMapExtras) drawMapExtras(ctx, TILE_SIZE);
    }

    /* ---- Draw interactive hotspot indicators ---- */
    function drawHotspots(ctx, hotspots, animFrame, currentMapId, objectSprites) {
        hotspots.forEach(function(h) {
            if (!h.active) return;
            var px = h.x * TILE_SIZE, py = h.y * TILE_SIZE;
            var w = h.w * TILE_SIZE, ht = h.h * TILE_SIZE;
            var cx = px + w / 2, cy = py + ht / 2;

            if (h.completed) {
                ctx.fillStyle = 'rgba(100,180,100,0.25)';
                ctx.fillRect(px + 2, py + 2, w - 4, ht - 4);
                ctx.strokeStyle = 'rgba(80,160,80,0.5)'; ctx.lineWidth = 1;
                ctx.strokeRect(px + 2, py + 2, w - 4, ht - 4);
                ctx.strokeStyle = 'rgba(80,160,80,0.6)'; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(cx - 6, cy); ctx.lineTo(cx - 2, cy + 5); ctx.lineTo(cx + 7, cy - 5); ctx.stroke();

                if (h.id && h.id.startsWith('candle_') && h.id !== 'candle_page' && h.id !== 'candle_diary' && currentMapId === 'sala_evening') {
                    drawCandleFlame(ctx, cx, py + 4);
                }
            } else {
                /* ---- Check if this hotspot has an object sprite ---- */
                var spriteDrawn = false;
                if (objectSprites && h.sprite && objectSprites[h.sprite]) {
                    var simg = objectSprites[h.sprite];
                    if (simg.complete && simg.naturalWidth > 0) {
                        /* Pulsing glow behind the sprite */
                        var pulse = 0.5 + 0.5 * Math.sin(animFrame * 0.05);
                        var glowR = Math.max(w, ht) * 0.8;
                        var grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
                        grad.addColorStop(0, 'rgba(255, 220, 140, ' + (0.25 + 0.2 * pulse) + ')');
                        grad.addColorStop(0.6, 'rgba(255, 200, 100, ' + (0.08 + 0.06 * pulse) + ')');
                        grad.addColorStop(1, 'rgba(255, 200, 100, 0)');
                        ctx.fillStyle = grad;
                        ctx.fillRect(cx - glowR, cy - glowR, glowR * 2, glowR * 2);

                        /* Bob animation */
                        var bob = Math.sin(animFrame * 0.04) * 2;

                        /* Draw the sprite centered on the hotspot area */
                        var aspect = simg.naturalWidth / simg.naturalHeight;
                        var drawH = ht * 1.2;
                        var drawW = drawH * aspect;
                        ctx.drawImage(simg,
                            cx - drawW / 2, cy - drawH / 2 + bob,
                            drawW, drawH
                        );
                        spriteDrawn = true;
                    }
                }

                if (!spriteDrawn) {
                    /* Default pulsing diamond indicator */
                    var pulse = 0.5 + 0.5 * Math.sin(animFrame * 0.05);
                    var glow = 0.12 + 0.18 * pulse;
                    ctx.fillStyle = 'rgba(212,168,86,' + glow + ')';
                    ctx.fillRect(px, py, w, ht);
                    ctx.strokeStyle = 'rgba(212,168,86,' + (0.35 + 0.25 * pulse) + ')';
                    ctx.lineWidth = 1.5;
                    ctx.strokeRect(px + 1, py + 1, w - 2, ht - 2);
                    var bob = Math.sin(animFrame * 0.06) * 3;
                    ctx.save();
                    ctx.translate(cx, py - 6 + bob);
                    ctx.fillStyle = 'rgba(212,168,86,' + (0.6 + 0.3 * pulse) + ')';
                    ctx.beginPath(); ctx.moveTo(0, -5); ctx.lineTo(4, 0); ctx.lineTo(0, 5); ctx.lineTo(-4, 0); ctx.closePath(); ctx.fill();
                    ctx.restore();
                }
            }
        });
    }

    /* ---- Animated candle flame effect ---- */
    function drawCandleFlame(ctx, x, y) {
        var animFrame = GAYA._animFrame || 0;
        var flicker = Math.sin(animFrame * 0.15) * 1.5 + Math.cos(animFrame * 0.23) * 1;
        var grad = ctx.createRadialGradient(x, y, 0, x, y, TILE_SIZE * 0.8);
        grad.addColorStop(0, 'rgba(255,200,80,0.15)');
        grad.addColorStop(1, 'rgba(255,200,80,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(x - TILE_SIZE, y - TILE_SIZE, TILE_SIZE * 2, TILE_SIZE * 2);
        ctx.fillStyle = '#f0e8d0';
        ctx.fillRect(x - 2, y + 4, 4, 10);
        ctx.fillStyle = 'rgba(255,180,40,0.9)';
        ctx.beginPath(); ctx.moveTo(x, y - 6 + flicker); ctx.quadraticCurveTo(x + 4, y, x, y + 4); ctx.quadraticCurveTo(x - 4, y, x, y - 6 + flicker); ctx.fill();
        ctx.fillStyle = 'rgba(255,240,180,0.8)';
        ctx.beginPath(); ctx.moveTo(x, y - 3 + flicker * 0.5); ctx.quadraticCurveTo(x + 2, y, x, y + 2); ctx.quadraticCurveTo(x - 2, y, x, y - 3 + flicker * 0.5); ctx.fill();
    }

    return { drawMap: drawMap, drawHotspots: drawHotspots, drawCandleFlame: drawCandleFlame };
})();
