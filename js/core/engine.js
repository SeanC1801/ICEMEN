/* ============================================
   GAYA — Game Engine
   Core game loop, map loading, asset management,
   interaction detection, and the public Gameplay API.
   ============================================ */

window.GAYA = window.GAYA || {};

var Gameplay = (function() {
    'use strict';

    var TILE_SIZE = GAYA.Config.TILE_SIZE;
    var canvas, ctx;
    var running = false;
    var lastTime = 0;
    var animFrame = 0;
    var currentMapId = '';
    var onInteractCb = null;
    var inputBound = false;

    /* ---- Assets ---- */
    var assets = {};         // playerSprite, etc.
    var objectSprites = {};  // tornPage, etc.
    var mapBgImages = {};    // pre-loaded map background images
    var currentMapBg = null; // active background for the current map
    var spritesReady = false;

    /* ---- Input state ---- */
    var keys = { w:false, a:false, s:false, d:false, ArrowUp:false, ArrowLeft:false, ArrowDown:false, ArrowRight:false, Shift:false };

    /* ---- Map state ---- */
    var MW = 20, MH = 15;
    var solid = [];
    var hotspots = [];
    var tileMap = [];
    var mapColors = {};
    var drawMapExtras = null;
    var nearHotspot = null;

    /* ---- Load a map definition ---- */
    function loadMap(mapId) {
        var def = GAYA.Maps[mapId];
        if (!def) { console.error('[GAYA] Unknown map:', mapId); return; }
        currentMapId = mapId;
        MW = def.width; MH = def.height;
        solid = []; tileMap = []; hotspots.length = 0;
        for (var y = 0; y < MH; y++) {
            solid[y] = []; tileMap[y] = [];
            for (var x = 0; x < MW; x++) { solid[y][x] = false; tileMap[y][x] = 0; }
        }
        mapColors = def.colors;
        drawMapExtras = def.drawExtras || null;
        /* Set background image if one exists for this map */
        currentMapBg = mapBgImages[mapId] || null;
        def.build(solid, tileMap, hotspots);
        GAYA.Player.init(def.playerStart.x, def.playerStart.y);
    }

    /* ---- Proximity-based interaction check ---- */
    function checkInteraction() {
        var player = GAYA.Player;
        var grid = player._getGrid();
        var rs = GAYA.Config.PLAYER_RENDER_SCALE || 0.12;
        var rw = grid.fw * rs;
        var rh = grid.fh * rs;
        var ptx = Math.floor((player.x + rw / 2) / TILE_SIZE);
        var pty = Math.floor((player.y + rh / 2) / TILE_SIZE);
        nearHotspot = null;
        for (var i = 0; i < hotspots.length; i++) {
            var h = hotspots[i];
            if (!h.active || h.completed) continue;
            var found = false;
            for (var hx = h.x; hx < h.x + h.w; hx++) {
                for (var hy = h.y; hy < h.y + h.h; hy++) {
                    if (Math.abs(ptx - hx) + Math.abs(pty - hy) <= 2) { nearHotspot = h; found = true; break; }
                }
                if (found) break;
            }
            if (nearHotspot) break;
        }
        var p = document.getElementById('interact-prompt');
        if (nearHotspot && p) {
            p.style.display = '';
            document.getElementById('interact-label').textContent = nearHotspot.label;
        } else if (p) {
            p.style.display = 'none';
        }
    }

    /* ---- Main game loop ---- */
    function loop(timestamp) {
        if (!running) return;
        var dt = Math.min((timestamp - lastTime) / 1000, 0.1);
        lastTime = timestamp;
        animFrame++;
        GAYA._animFrame = animFrame;

        GAYA.Player.update(dt, keys, solid, MW, MH);
        GAYA.Camera.update(GAYA.Player, canvas, MW, MH);
        checkInteraction();

        ctx.fillStyle = '#0a0810';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(-GAYA.Camera.x, -GAYA.Camera.y);
        GAYA.Renderer.drawMap(ctx, tileMap, solid, mapColors, MW, MH, drawMapExtras, currentMapBg);
        GAYA.Renderer.drawHotspots(ctx, hotspots, animFrame, currentMapId, objectSprites);
        GAYA.Player.draw(ctx, assets);
        ctx.restore();

        requestAnimationFrame(loop);
    }

    /* ============================================
       PUBLIC API
       ============================================ */
    function loadAndStart(onInteract, mapId) {
        onInteractCb = onInteract;
        canvas = document.getElementById('game-canvas');
        ctx = canvas.getContext('2d');

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            ctx.imageSmoothingEnabled = false;
        }
        window.addEventListener('resize', resize);
        resize();

        if (!inputBound) {
            inputBound = true;
            window.addEventListener('keydown', function(e) {
                if (keys.hasOwnProperty(e.key)) keys[e.key] = true;
                if (e.key === 'e' || e.key === 'E') {
                    if (nearHotspot && onInteractCb) onInteractCb(nearHotspot);
                }
            });
            window.addEventListener('keyup', function(e) {
                if (keys.hasOwnProperty(e.key)) keys[e.key] = false;
            });
        }

        loadMap(mapId || 'sala');

        if (spritesReady) {
            running = true; lastTime = performance.now(); requestAnimationFrame(loop);
            return;
        }

        /* ---- Collect all assets to load ---- */
        var assetPaths = GAYA.Config.assetPaths;
        var bgPaths    = GAYA.Config.mapBackgrounds || {};
        var loaded = 0;
        var total  = Object.keys(assetPaths).length + Object.keys(bgPaths).length;

        function onAssetLoaded() {
            loaded++;
            if (loaded === total) {
                spritesReady = true; running = true;
                currentMapBg = mapBgImages[currentMapId] || null;
                lastTime = performance.now(); requestAnimationFrame(loop);
            }
        }
        function onAssetError(key) {
            console.warn('[GAYA] Failed to load:', key);
            onAssetLoaded();
        }

        /* ---- Load sprites ---- */
        Object.keys(assetPaths).forEach(function(key) {
            var img = new Image();
            img.onload  = onAssetLoaded;
            img.onerror = function() { onAssetError(key); };
            img.src = assetPaths[key];
            if (key.startsWith('player')) {
                assets[key] = img;
            } else {
                objectSprites[key] = img;
            }
        });

        /* ---- Map background images ---- */
        Object.keys(bgPaths).forEach(function(mapKey) {
            var img = new Image();
            img.onload  = onAssetLoaded;
            img.onerror = function() { onAssetError('bg:' + mapKey); };
            img.src = bgPaths[mapKey];
            mapBgImages[mapKey] = img;
        });
    }

    function switchMap(mapId, onInteract) {
        running = false;
        onInteractCb = onInteract;
        loadMap(mapId);
        setTimeout(function() {
            running = true; lastTime = performance.now(); requestAnimationFrame(loop);
        }, 100);
    }

    function stop() { running = false; }
    function getHotspots() { return hotspots; }
    function getObjectSprites() { return objectSprites; }

    return { loadAndStart: loadAndStart, switchMap: switchMap, stop: stop, getHotspots: getHotspots, getObjectSprites: getObjectSprites };
})();
