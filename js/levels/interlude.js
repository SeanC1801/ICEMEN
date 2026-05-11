/* ============================================
   GAYA — Interlude: The Diary Reading
   The mother reads the diary aloud while
   Gaya desperately tries to be seen.
   ============================================ */

window.GAYA = window.GAYA || {};
GAYA.Levels = GAYA.Levels || {};

GAYA.Levels.Interlude = {
    start: function() {
        GAYA.Narration.show(GAYA.Dialogue.interlude, function() {
            var fade = GAYA.Scene.getFadeOverlay();
            fade.classList.add('active');
            setTimeout(function() {
                GAYA.State.currentScreen = 'level3';
                fade.classList.remove('active');
                GAYA.Levels.Level3.start();
            }, 1500);
        });
    }
};
