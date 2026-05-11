/* ============================================
   GAYA — Input Handler
   Keyboard and click event routing for
   screen navigation and narration advance.
   Loaded last — binds to all other modules.
   ============================================ */

window.GAYA = window.GAYA || {};

(function() {
    'use strict';

    var screens = GAYA.Scene.getScreens();

    /* ---- Warning screen → Title ---- */
    screens.warning.addEventListener('click', function() {
        if (GAYA.State.currentScreen === 'warning') {
            screens.warning.classList.remove('active');
            GAYA.State.currentScreen = 'title';
            setTimeout(function() {
                screens.title.classList.add('active');
                GAYA.Petals.start();
            }, 1200);
        }
    });

    /* ---- Title → Opening (via fade) ---- */
    screens.title.addEventListener('click', function() {
        if (GAYA.State.currentScreen === 'title') {
            GAYA.Scene.goTo('opening', 1500);
        }
    });

    /* ---- Narration: click to advance ---- */
    document.getElementById('narration-box').addEventListener('click', function(e) {
        e.stopPropagation();
        GAYA.Narration.advance();
    });

    /* ---- Keyboard: Space / Enter to advance ---- */
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' || e.key === 'Enter') {
            e.preventDefault();
            if (GAYA.State.currentScreen === 'warning') {
                screens.warning.click();
            } else if (GAYA.State.currentScreen === 'title') {
                screens.title.click();
            } else if (GAYA.State.isNarrating) {
                GAYA.Narration.advance();
            }
        }
    });
})();
