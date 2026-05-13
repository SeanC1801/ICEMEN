/* ============================================
   GAYA — Map Definitions
   
   Collision grids based on the official
   Collision Guide images (red = blocked, green = walkable).
   
   Bedroom: 24 cols × 14 rows
   Living Room: 30 cols × 16 rows
   ============================================ */

window.GAYA = window.GAYA || {};

function _addSolid(s, sx, sy, w, h, type) {
    for (var y = sy; y < sy + h; y++)
        for (var x = sx; x < sx + w; x++)
            if (y >= 0 && y < s.length && x >= 0 && x < s[0].length)
                s[y][x] = { type: type || true };
}

GAYA.Maps = {};

/* ============================================
   BEDROOM  (Bedroom Collision Guide)
   
   RED = blocked (walls, bed, nightstands, wardrobe,
         bookshelf, clock, couch, table)
   GREEN = walkable floor
   Exit at bottom center leads to living room
   ============================================ */
GAYA.Maps.bedroom = {
    width: 24, height: 14,
    playerStart: { x: 8, y: 8 },
    colors: { floor:'#6b5040', floorAlt:'#624838', wall:'#5a4230', wallTop:'#4a3220', door:'#3a2a18', furniture:'#5a4230', furnitureTop:'#6b5040' },
    build: function(s, t, h) {
        /* Start ALL solid (red) */
        for (var y = 0; y < 14; y++) for (var x = 0; x < 24; x++) {
            s[y][x] = true; t[y][x] = 0;
        }

        /* Carve GREEN walkable zones from collision guide */
        /* Narrow strip left of bed: col 2, rows 3-4 */
        for (var y = 3; y <= 4; y++) s[y][2] = false;

        /* Main floor area below bed row: cols 2-21, rows 5-12 */
        for (var y = 5; y <= 12; y++)
            for (var x = 2; x <= 21; x++)
                s[y][x] = false;

        /* Re-block furniture in walkable zone: */
        /* Couch area: cols 11-14, rows 6-7 */
        _addSolid(s, 11, 6, 4, 2, 'couch');
        /* Coffee table below couch: cols 12-13, row 8 */
        _addSolid(s, 12, 8, 2, 1, 'table');

        /* Exit gap at bottom center: cols 9-14 */
        for (var x = 9; x <= 14; x++) s[13][x] = false;

        /* ===== HOTSPOTS ===== */
        /* Level 1 hotspots */
        h.push({ id:'torn_page', x:9, y:3, w:2, h:1, label:'Notebook', active:true });
        h.push({ id:'door_exit', x:10, y:12, w:4, h:2, label:'Go to the Living Room', active:false });

        /* Level 2 hotspots (activated by level2-bedroom.js) */
        h.push({ id:'white_dress', x:5, y:3, w:3, h:2, label:'White Gown', active:false, sprite:'whiteDress' });
        h.push({ id:'full_mirror', x:11, y:5, w:2, h:2, label:'Full-length Mirror', active:false });
        h.push({ id:'torn_note', x:6, y:3, w:2, h:1, label:'Piece of Paper', active:false, sprite:'tornPageSmall' });
    },
    drawExtras: null
};

/* Legacy alias */
GAYA.Maps.sala = GAYA.Maps.bedroom;

/* ============================================
   LIVING ROOM  (Livingroom Collision Guide)
   
   30 cols × 16 rows. The room has an irregular shape
   (staircase cut on top-left).
   
   RED: borders, staircase, plants, sofas, tables,
        TV area, bookshelf, guitar, heater
   GREEN: floor paths between furniture
   
   Bottom exit at center leads back to bedroom
   (lined up with bottom border corners)
   ============================================ */
GAYA.Maps.livingroom = {
    width: 30, height: 16,
    playerStart: { x: 14, y: 3 },
    colors: { floor:'#8a6a4a', floorAlt:'#7d6040', wall:'#6b5030', wallTop:'#5a4020', door:'#3a2a18', furniture:'#6b5040', furnitureTop:'#8a7a68' },
    build: function(s, t, h) {
        /* Start ALL solid */
        for (var y = 0; y < 16; y++) for (var x = 0; x < 30; x++) {
            s[y][x] = true; t[y][x] = 0;
        }

        /* ===== Carve GREEN walkable zones ===== */
        /* Row 3: small gaps */
        for (var x = 4; x <= 6; x++) s[3][x] = false;
        for (var x = 15; x <= 18; x++) s[3][x] = false;

        /* Row 4 */
        for (var x = 3; x <= 6; x++) s[4][x] = false;
        for (var x = 13; x <= 23; x++) s[4][x] = false;

        /* Row 5 */
        for (var x = 2; x <= 8; x++) s[5][x] = false;
        for (var x = 12; x <= 26; x++) s[5][x] = false;

        /* Row 6: full walkable strip */
        for (var x = 2; x <= 26; x++) s[6][x] = false;

        /* Rows 7-10: large open floor */
        for (var y = 7; y <= 10; y++)
            for (var x = 2; x <= 27; x++)
                s[y][x] = false;

        /* Row 11 */
        for (var x = 1; x <= 23; x++) s[11][x] = false;

        /* Row 12 */
        for (var x = 2; x <= 21; x++) s[12][x] = false;

        /* Row 13 */
        for (var x = 2; x <= 20; x++) s[13][x] = false;

        /* ===== Re-block furniture ===== */
        /* Coffee table (center-left area) */
        _addSolid(s, 5, 5, 3, 2, 'coffee_table');

        /* Bookshelf/stair divider (center) */
        _addSolid(s, 9, 4, 3, 4, 'stair_divider');

        /* Right sofa area */
        _addSolid(s, 13, 5, 3, 2, 'right_sofa');

        /* Flower pot (bottom area) */
        _addSolid(s, 18, 11, 1, 1, 'flower_pot');

        /* Heater (bottom-right) */
        _addSolid(s, 22, 11, 3, 2, 'heater');

        /* Pet bed */
        _addSolid(s, 20, 7, 2, 1, 'pet_bed');

        /* ===== Bottom exit to bedroom ===== */
        /* Gap at bottom center aligned with border corners */
        for (var x = 10; x <= 15; x++) {
            s[14][x] = false;
            s[15][x] = false;
        }

        /* ===== HOTSPOTS ===== */
        /* Flower basket: spawns randomly (default position, overridden by level script) */
        h.push({ id:'flower_basket', x:10, y:9, w:1, h:1, label:'Flower Basket', active:true, sprite:'basketFlowers' });

        /* 3 Black vases: scattered around the room */
        h.push({ id:'vase_left',   x:3,  y:7,  w:1, h:1, label:'Black Vase (Left)',   active:false });
        h.push({ id:'vase_middle', x:18, y:4,  w:1, h:1, label:'Black Vase (Middle)',  active:false });
        h.push({ id:'vase_right',  x:21, y:10, w:1, h:1, label:'Black Vase (Right)',   active:false });

        /* Table hotspot for flower matching phase (after vases collected) */
        h.push({ id:'table_vases', x:5, y:5, w:3, h:2, label:'Arrange Flowers in Vases', active:false });

        /* Torn paper in basket (appears after flower matching is complete) */
        h.push({ id:'basket_note', x:10, y:9, w:1, h:1, label:'Something in the basket...', active:false });

        /* Bottom door exit to bedroom */
        h.push({ id:'door_bedroom', x:11, y:14, w:4, h:2, label:'Go to the Bedroom', active:false });
    },
    /* Get walkable tiles for random basket spawning */
    getWalkableTiles: function() {
        var tiles = [];
        var s = [], t = [], h = [];
        for (var y = 0; y < 16; y++) { s[y] = []; t[y] = []; for (var x = 0; x < 30; x++) { s[y][x] = true; t[y][x] = 0; } }
        this.build(s, t, h);
        for (var y = 0; y < 16; y++)
            for (var x = 0; x < 30; x++)
                if (!s[y][x]) tiles.push({x:x, y:y});
        return tiles.filter(function(tile) {
            return !h.some(function(hs) {
                return tile.x >= hs.x && tile.x < hs.x + hs.w &&
                       tile.y >= hs.y && tile.y < hs.y + hs.h;
            });
        });
    },
    drawExtras: null
};

/* ============================================
   KITCHEN  (Kitchen Collision Guide)
   
   RED = blocked (walls, counters, fridge,
         candle table, bench)
   GREEN = walkable floor
   24 cols × 12 rows
   ============================================ */
GAYA.Maps.kitchen = {
    width: 24,
    height: 12,
    colors: {
        floor: '#8a7a60', floorAlt: '#857560',
        wall: '#5a4a38', wallTop: '#4a3a28',
        door: '#6b5a48', furniture: '#6b5a48', furnitureTop: '#8a7a68'
    },
    playerStart: { x: 3, y: 9 },
    build: function(s, t, h) {
        /* Top wall — rows 0-1 all solid */
        _addSolid(s, 0, 0, 24, 2, 'wall');

        /* Left wall col 0 */
        _addSolid(s, 0, 2, 2, 4, 'wall');

        /* Counters + fridge — row 2-4 cols 2-23 */
        _addSolid(s, 4, 2, 20, 3, 'counter');

        /* Candle table — center of room */
        _addSolid(s, 7, 5, 9, 3, 'table');

        /* Bench below table */
        _addSolid(s, 8, 8, 6, 1, 'bench');

        /* Right counter edge */
        _addSolid(s, 22, 5, 2, 2, 'counter');

        /* Bottom wall */
        _addSolid(s, 0, 11, 24, 1, 'wall');

        /* ===== HOTSPOTS ===== */
        /* 3 hidden unlit candles around the kitchen */
        h.push({ id:'candle_1', x:3,  y:5, w:1, h:1, label:'Something on the shelf...', active:false, sprite:'unlitCandle' });
        h.push({ id:'candle_2', x:20, y:6, w:1, h:1, label:'A candle behind the jars...', active:false, sprite:'unlitCandle' });
        h.push({ id:'candle_3', x:5,  y:9, w:1, h:1, label:'A candle under the bench...', active:false, sprite:'unlitCandle' });

        /* 18th candle — final interaction */
        h.push({ id:'candle_18', x:11, y:5, w:2, h:1, label:'The 18th candle...', active:false });

        /* Diary under the 18th candle */
        h.push({ id:'diary_3', x:11, y:6, w:2, h:1, label:'A folded page...', active:false, sprite:'tornPageSmall' });
    },
    drawExtras: null
};
