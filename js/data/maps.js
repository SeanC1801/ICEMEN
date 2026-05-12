/* ============================================
   GAYA — Map Definitions
   Layout data for each playable area.
   
   Collision zones match only VISIBLE FURNITURE
   in Bedroom 005.png. The brown wood floor is
   fully walkable.
   
   Grid: 24 cols × 14 rows at 40px tiles = 960×560.
   Source image: 1920×1080 → each tile = 80×77 src px.
   
   Mapping (source px → grid tile):
     col = Math.floor(srcX / 80)
     row = Math.floor(srcY / 77)
   ============================================ */

window.GAYA = window.GAYA || {};

/* Helper: mark a rectangular region as solid */
function _addSolid(s, sx, sy, w, h, type) {
    for (let y = sy; y < sy + h; y++)
        for (let x = sx; x < sx + w; x++)
            if (y >= 0 && y < s.length && x >= 0 && x < s[0].length)
                s[y][x] = { type: type };
}

GAYA.Maps = {};

/* ============================================
   LEVEL 1: THE BEDROOM
   Uses Bedroom 005.png as background.
   
   Furniture collision map (only real furniture):
   
   ┌──────────────────────────────┐
   │ BORDER  (row 0)             │
   │ WALL + FRAMES  (row 1)     │
   │ LAMP  BED────── NS  DOOR BK│  row 2-3
   │  NS   BED──────     WDRB BK│
   │       BED──────          BK │  row 4-5
   │       carpet                │  row 6
   │            COUCH            │  row 7-8
   │            TABLE            │  row 9
   │       (open floor)          │  row 10-11
   │       (open floor)          │  row 12
   │ BORDER─── EXIT ───BORDER    │  row 13
   └──────────────────────────────┘
   
   NS = Nightstand, BK = Bookshelf, WDRB = Wardrobe
   
   Key: Brown floor = WALKABLE (no collision).
   Only furniture pieces and room borders are solid.
   Exit is at the bottom center of the map.
   ============================================ */
GAYA.Maps.sala = {
    width: 24, height: 14,
    playerStart: { x: 8, y: 8 },
    colors: {
        floor: '#6b5040', floorAlt: '#624838',
        wall: '#5a4230', wallTop: '#4a3220', door: '#3a2a18',
        furniture: '#5a4230', furnitureTop: '#6b5040'
    },
    build: function(s, t, h) {
        /* Start with everything walkable */
        for (let y = 0; y < 14; y++) for (let x = 0; x < 24; x++) {
            s[y][x] = false; t[y][x] = 0;
        }

        /* ===== ROOM BORDERS ===== */
        /* Top border (row 0): black area above room */
        for (let x = 0; x < 24; x++) s[0][x] = true;

        /* Top wall / picture frame strip (row 1) */
        for (let x = 0; x < 24; x++) s[1][x] = true;

        /* Left border: cols 0-1 */
        for (let y = 0; y < 14; y++) { s[y][0] = true; s[y][1] = true; }

        /* Right border: cols 22-23 */
        for (let y = 0; y < 14; y++) { s[y][22] = true; s[y][23] = true; }

        /* Bottom border (row 13): solid EXCEPT the exit gap */
        for (let x = 0; x < 24; x++) s[13][x] = true;
        /* Exit gap at bottom center: cols 9-14 are walkable */
        for (let x = 9; x <= 14; x++) s[13][x] = false;

        /* ===== FURNITURE (only real pieces) ===== */

        /* 1. Left nightstand + lamp (top-left corner) */
        _addSolid(s, 2, 2, 2, 2, 'nightstand_left');

        /* 2. Bed (large, center-left area) */
        _addSolid(s, 4, 2, 5, 5, 'bed');

        /* 3. Right nightstand with diary (right of bed) */
        _addSolid(s, 9, 2, 2, 2, 'nightstand_right');

        /* 4. Wardrobe / door frame (top center, around the dark opening) */
        _addSolid(s, 11, 2, 2, 3, 'wardrobe');

        /* 5. Bookshelf (right side of room, tall) */
        _addSolid(s, 13, 2, 4, 4, 'bookshelf');

        /* 6. Grandfather clock (far right, on wall) */
        _addSolid(s, 17, 2, 2, 3, 'clock');

        /* 7. Right shelving / cabinet */
        _addSolid(s, 19, 2, 3, 3, 'shelf_right');

        /* 8. Blue couch (center-right area) */
        _addSolid(s, 11, 7, 5, 2, 'couch');

        /* 9. Coffee table with plant (below couch) */
        _addSolid(s, 11, 9, 4, 2, 'table');

        /* ===== HOTSPOTS ===== */

        /* Notebook on the right nightstand (the pink book in the map) */
        h.push({
            id: 'torn_page',
            x: 9, y: 3, w: 2, h: 1,
            label: 'Notebook',
            active: true
        });

        /* Door exit at the BOTTOM of the map */
        h.push({
            id: 'door_exit',
            x: 10, y: 12, w: 4, h: 2,
            label: 'Go to the Living Room',
            active: false   /* Enabled after reading the torn page */
        });
    },
    drawExtras: null
};

/* ============================================
   LEVEL 2: THE BEDROOM (Dress scene)
   Same room, different objectives.
   ============================================ */
GAYA.Maps.bedroom = {
    width: 24, height: 14,
    playerStart: { x: 8, y: 8 },
    colors: {
        floor: '#6b5040', floorAlt: '#624838',
        wall: '#5a4230', wallTop: '#4a3220', door: '#3a2a18',
        furniture: '#5a4230', furnitureTop: '#6b5040'
    },
    build: function(s, t, h) {
        for (let y = 0; y < 14; y++) for (let x = 0; x < 24; x++) {
            s[y][x] = false; t[y][x] = 0;
        }

        /* Borders */
        for (let x = 0; x < 24; x++) { s[0][x] = true; s[1][x] = true; s[13][x] = true; }
        for (let y = 0; y < 14; y++) { s[y][0] = true; s[y][1] = true; s[y][22] = true; s[y][23] = true; }

        /* Furniture */
        _addSolid(s, 2, 2, 2, 2, 'nightstand_left');
        _addSolid(s, 4, 2, 5, 5, 'bed');
        _addSolid(s, 9, 2, 2, 2, 'nightstand_right');
        _addSolid(s, 11, 2, 2, 3, 'wardrobe');
        _addSolid(s, 13, 2, 4, 4, 'bookshelf');
        _addSolid(s, 17, 2, 2, 3, 'clock');
        _addSolid(s, 19, 2, 3, 3, 'shelf_right');
        _addSolid(s, 11, 7, 5, 2, 'couch');
        _addSolid(s, 11, 9, 4, 2, 'table');

        /* Level 2 hotspots */
        h.push({ id:'diary', x:9, y:3, w:1, h:1, label:'Pink Diary', active:true });
        h.push({ id:'dress_fabric', x:5, y:2, w:1, h:1, label:'Dress Fabric', active:true });
        h.push({ id:'fitting_mirror', x:2, y:8, w:1, h:1, label:'Fitting Mirror', active:true });
        h.push({ id:'magazine', x:2, y:5, w:2, h:1, label:'Magazine', active:true });
        h.push({ id:'full_mirror', x:21, y:6, w:1, h:2, label:'Mirror', active:false });
    },
    drawExtras: null
};

/* ============================================
   LEVEL 3: SALA AT EVENING (CANDLES)
   ============================================ */
GAYA.Maps.sala_evening = {
    width: 24, height: 14,
    playerStart: { x: 8, y: 8 },
    colors: {
        floor: '#5a4030', floorAlt: '#523828',
        wall: '#4a3220', wallTop: '#3a2210', door: '#2a1a08',
        furniture: '#4a3220', furnitureTop: '#5a4230'
    },
    build: function(s, t, h) {
        for (let y = 0; y < 14; y++) for (let x = 0; x < 24; x++) {
            s[y][x] = false; t[y][x] = 0;
        }

        /* Borders */
        for (let x = 0; x < 24; x++) { s[0][x] = true; s[1][x] = true; s[13][x] = true; }
        for (let y = 0; y < 14; y++) { s[y][0] = true; s[y][1] = true; s[y][22] = true; s[y][23] = true; }

        /* Furniture */
        _addSolid(s, 2, 2, 2, 2, 'nightstand_left');
        _addSolid(s, 4, 2, 5, 5, 'bed');
        _addSolid(s, 9, 2, 2, 2, 'nightstand_right');
        _addSolid(s, 11, 2, 2, 3, 'wardrobe');
        _addSolid(s, 13, 2, 4, 4, 'bookshelf');
        _addSolid(s, 17, 2, 2, 3, 'clock');
        _addSolid(s, 19, 2, 3, 3, 'shelf_right');
        _addSolid(s, 11, 7, 5, 2, 'couch');
        _addSolid(s, 11, 9, 4, 2, 'table');

        /* Level 3 hotspots */
        h.push({ id:'candle_page', x:21, y:5, w:1, h:1, label:'Page', active:true });
        h.push({ id:'mother_note', x:14, y:3, w:1, h:1, label:'Candle Box', active:true });
    },
    drawExtras: function(ctx, TS) {
        ctx.fillStyle = 'rgba(255,180,60,0.06)';
        ctx.fillRect(0, 0, 24 * TS, 14 * TS);
    }
};
