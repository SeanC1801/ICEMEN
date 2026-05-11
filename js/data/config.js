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
        playerWalk: "01_Assets/draft_sprite (eris esra)/16x16/16x16 Walk-Sheet.png",
        playerIdle: "01_Assets/draft_sprite (eris esra)/16x16/16x16 Idle-Sheet.png",
        playerRun:  "01_Assets/draft_sprite (eris esra)/16x16/16x16 Run-Sheet.png",
    }
};

/* Shared mutable game state — accessed by narration, scenes, levels, and input */
GAYA.State = {
    currentScreen: 'warning',
    isNarrating: false,
    isTyping: false,
};
