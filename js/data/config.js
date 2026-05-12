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
    PLAYER_RENDER_SCALE: 0.12, // render scale (frame is 504×634 src px → ~60×76 on screen)

    assetPaths: {
        /* Single unified sprite sheet: 6 cols × 6 rows, 504×634 per frame
           Row 0-1: Front/Down, Row 2-3: Right side, Row 4-5: Back/Up
           Left = mirrored Right */
        playerSprite: "01_Assets/Character_Sprites/Gaya/sprite-max-px-36.png",
        tornPage:     "01_Assets/Objects/Torn Page 001.png",
    },

    /* Map background images */
    mapBackgrounds: {
        sala:    "04_Locations/Levels/Bedroom 005.png",
        bedroom: "04_Locations/Levels/Bedroom 005.png",
    },

    /* Sprite grid: 6 cols × 6 rows from 3024×3804 sheet
       Row 0-1 = Down/Front (12 frames total)
       Row 2-3 = Right side (12 frames total)
       Row 4-5 = Back/Up (12 frames total)
       Left = mirrored Right */
    spriteGrid: {
        cols: 6,
        rows: 6,
        fw: 504,   // 3024 / 6
        fh: 634,   // 3804 / 6
        framesPerDir: 12, // 2 rows × 6 cols per direction
    }
};

/* Shared mutable game state */
GAYA.State = {
    currentScreen: 'warning',
    isNarrating: false,
    isTyping: false,
};
