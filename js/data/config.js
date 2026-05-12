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
    assetPaths: {
        playerWalk: "01_Assets/Character_Sprites/Gaya/Gaya 16x16 Walk-Sheet.png",
        playerIdle: "01_Assets/Character_Sprites/Gaya/Gaya 16x16 Idle-Sheet.png",
        playerRun:  "01_Assets/Character_Sprites/Gaya/Gaya 16x16 Run-Sheet.png",
        diary:      "01_Assets/Objects/Pink Diary with Torn Page.png",
        tornPage:   "01_Assets/Objects/Torn Page 001.png",
    },
    /* Map background images (rendered instead of procedural tiles) */
    mapBackgrounds: {
        bedroom: "04_Locations/Levels/Bedroom 004.png",
    },
    /* Grid layout: the ONLY exact integer divisions of the sprite sheet pixel dimensions.
       Idle/Walk 447×558 → 3 cols × 6 rows = 149×93 per frame (exact)
       Run 500×500 → 5 cols × 5 rows = 100×100 per frame (exact) */
    spriteGrid: {
        playerWalk: { cols: 3, rows: 6, fw: 149, fh: 93 },
        playerIdle: { cols: 3, rows: 6, fw: 149, fh: 93 },
        playerRun:  { cols: 5, rows: 5, fw: 100, fh: 100 },
    }
};

/* Shared mutable game state — accessed by narration, scenes, levels, and input */
GAYA.State = {
    currentScreen: 'warning',
    isNarrating: false,
    isTyping: false,
};
