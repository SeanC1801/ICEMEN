/* ============================================
   GAYA — Scene Transitions
   Fade-based screen switching and the
   scene-entry router that starts each level.
   ============================================ */

window.GAYA = window.GAYA || {};

GAYA.Scene = (function() {
    'use strict';

    var fadeOverlay = null;
    var screens = {};

    function ensureDOM() {
        if (!fadeOverlay) {
            fadeOverlay = document.getElementById('fade-overlay');
            document.querySelectorAll('.screen').forEach(function(s) {
                var id = s.id.replace('screen-', '');
                screens[id] = s;
            });
        }
    }

    function getFadeOverlay() { ensureDOM(); return fadeOverlay; }
    function getScreens()     { ensureDOM(); return screens; }

    /* ---- Transition to a scene by id ---- */
    function goTo(id, delay) {
        ensureDOM();
        fadeOverlay.classList.add('active');
        setTimeout(function() {
            document.querySelectorAll('.screen.active').forEach(function(s) {
                s.classList.remove('active');
            });
            if (screens[id]) screens[id].classList.add('active');
            GAYA.State.currentScreen = id;
            setTimeout(function() {
                fadeOverlay.classList.remove('active');
                onEnter(id);
            }, 600);
        }, delay || 1200);
    }

    /* ---- Route to the correct level start ---- */
    function onEnter(id) {
        switch (id) {
            case 'opening': GAYA.Levels.Opening.start();  break;
            case 'level1':  GAYA.Levels.Level1.start();   break;
            case 'level2':
                /* Level 2 reuses the same canvas as Level 1 */
                if (screens['level1']) screens['level1'].classList.add('active');
                GAYA.Levels.Level2.start();
                break;
            case 'level3':
                if (screens['level1']) screens['level1'].classList.add('active');
                GAYA.Levels.Level3.start();
                break;
        }
    }

    return {
        goTo: goTo,
        getFadeOverlay: getFadeOverlay,
        getScreens: getScreens
    };
})();
