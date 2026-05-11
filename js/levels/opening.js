/* ============================================
   GAYA — Opening Scene
   Initial narration before Level 1 begins.
   ============================================ */

window.GAYA = window.GAYA || {};
GAYA.Levels = GAYA.Levels || {};

GAYA.Levels.Opening = {
    start: function() {
        setTimeout(function() {
            GAYA.Narration.show(GAYA.Dialogue.opening, function() {
                GAYA.Scene.goTo('level1', 1500);
            });
        }, 1500);
    }
};
