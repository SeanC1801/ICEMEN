/* ============================================
   GAYA — Ending Sequence
   Final narration, banner reveal,
   and post-credits mental health resources.
   ============================================ */

window.GAYA = window.GAYA || {};
GAYA.Levels = GAYA.Levels || {};

GAYA.Levels.Ending = {
    start: function() {
        var fade = GAYA.Scene.getFadeOverlay();

        GAYA.Narration.show(GAYA.Dialogue.ending, function() {
            fade.classList.add('active');
            setTimeout(function() {
                GAYA.Narration.show(GAYA.Dialogue.postCredits);
            }, 3000);
        });
    }
};
