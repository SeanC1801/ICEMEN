/* ============================================
   GAYA — Configuration & Constants
   Shared settings and mutable game state
   used across all modules.
   ============================================ */

window.GAYA = window.GAYA || {};

GAYA.Config = {
    SCALE: 2.5,
    TILE_SIZE: 16 * 2.5,   // 40px per tile
    TYPE_SPEED: 28,         // ms per character in typewriter
    ANIM_FPS: 8,            // sprite animation frames per second
    MOVE_SPEED: 150,        // walk speed in px/s
    PLAYER_RENDER_SCALE: 0.12,

    assetPaths: {
        /* Single unified sprite sheet: 6 cols × 6 rows, 504×634 per frame */
        playerSprite: "01_Assets/Character_Sprites/Gaya/sprite-max-px-36.png",
        tornPage:     "01_Assets/Objects/Torn Page 001.png",
        basketFlowers:"01_Assets/Objects/Basket with Flowers.png",
    },

    /* Map background images — all states for progressive reveals */
    mapBackgrounds: {
        bedroom:        "04_Locations/Levels/Level 1/Bedroom 005.png",
        livingroom:     "04_Locations/Levels/Level 1/Livingroom 005.png",
        livingroom_006: "04_Locations/Levels/Level 1/Livingroom 006.png",
        livingroom_007: "04_Locations/Levels/Level 1/Livingroom 007.png",
        livingroom_008: "04_Locations/Levels/Level 1/Livingroom 008.png",
        livingroom_009: "04_Locations/Levels/Level 1/Livingroom 009.png",
        livingroom_010: "04_Locations/Levels/Level 1/Livingroom 010.png",
        livingroom_011: "04_Locations/Levels/Level 1/Livingroom 011.png",
        livingroom_012: "04_Locations/Levels/Level 1/Livingroom 012.png",
        livingroom_013: "04_Locations/Levels/Level 1/Livingroom 013.png",
        livingroom_014: "04_Locations/Levels/Level 1/Livingroom 014.png",
    },

    /* Sprite grid: 6 cols × 6 rows from 3024×3804 sheet */
    spriteGrid: {
        cols: 6,
        rows: 6,
        fw: 504,
        fh: 634,
        framesPerDir: 12,
    }
};

/* Shared mutable game state */
GAYA.State = {
    currentScreen: 'warning',
    isNarrating: false,
    isTyping: false,
};
