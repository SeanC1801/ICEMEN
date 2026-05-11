/* ============================================
   GAYA — Level 2: The Bedroom (Dress)
   Five dress flaws to fix, mirror sequence,
   and the second diary page discovery.
   ============================================ */

window.GAYA = window.GAYA || {};
GAYA.Levels = GAYA.Levels || {};

GAYA.Levels.Level2 = (function() {
    'use strict';

    var D = function() { return GAYA.Dialogue.level2; };
    var state = { flawsFixed: 0, hasSeenMirror: false, hasSeenMagazine: false, mirrorClicks: 0 };

    function start() {
        GAYA.Narration.show(D().intro, function() {
            Gameplay.switchMap('bedroom', handleInteract);
        });
    }

    function handleInteract(hotspot) {
        if (GAYA.State.isNarrating) return;
        var hs = Gameplay.getHotspots();

        switch (hotspot.id) {
            /* ---- Supporting objects (clues) ---- */
            case 'fitting_mirror':
                state.hasSeenMirror = true; hotspot.completed = true;
                var hem = hs.find(function(h) { return h.id === 'dress_hem'; });
                if (hem) hem.active = true;
                GAYA.Narration.show(D().fitting_mirror);
                break;

            case 'magazine':
                state.hasSeenMagazine = true; hotspot.completed = true;
                var sleeves = hs.find(function(h) { return h.id === 'dress_sleeves'; });
                if (sleeves) sleeves.active = true;
                GAYA.Narration.show(D().magazine);
                break;

            /* ---- The 5 dress flaws ---- */
            case 'dress_fabric':
                if (!hotspot.completed) {
                    hotspot.completed = true; state.flawsFixed++;
                    GAYA.Narration.show(D().dress_fabric, checkComplete);
                } break;
            case 'dress_collar':
                if (!hotspot.completed) {
                    hotspot.completed = true; state.flawsFixed++;
                    GAYA.Narration.show(D().dress_collar, checkComplete);
                } break;
            case 'dress_hem':
                if (!hotspot.completed) {
                    hotspot.completed = true; state.flawsFixed++;
                    GAYA.Narration.show(D().dress_hem, checkComplete);
                } break;
            case 'dress_sleeves':
                if (!hotspot.completed) {
                    hotspot.completed = true; state.flawsFixed++;
                    GAYA.Narration.show(D().dress_sleeves, checkComplete);
                } break;
            case 'dress_lace':
                if (!hotspot.completed) {
                    hotspot.completed = true; state.flawsFixed++;
                    GAYA.Narration.show(D().dress_lace, checkComplete);
                } break;

            /* ---- Mirror sequence (3 interactions) ---- */
            case 'full_mirror':
                state.mirrorClicks++;
                if (state.mirrorClicks === 1) {
                    GAYA.Narration.show(D().mirror_1);
                } else if (state.mirrorClicks === 2) {
                    GAYA.Narration.show(D().mirror_2);
                } else if (state.mirrorClicks === 3) {
                    hotspot.completed = true;
                    GAYA.Narration.show(D().mirror_3, function() {
                        var pocket = hs.find(function(h) { return h.id === 'dress_pocket'; });
                        if (pocket) pocket.active = true;
                    });
                } break;

            /* ---- Empty shoes space ---- */
            case 'shoes_empty':
                GAYA.Narration.show(D().shoes_empty);
                hotspot.completed = true;
                break;

            /* ---- Diary Entry 2 ---- */
            case 'dress_pocket':
                if (!hotspot.completed) {
                    hotspot.completed = true;
                    GAYA.Narration.show(D().dress_pocket, function() {
                        Gameplay.stop();
                        var fade = GAYA.Scene.getFadeOverlay();
                        setTimeout(function() {
                            fade.classList.add('active');
                            setTimeout(function() {
                                GAYA.State.currentScreen = 'interlude';
                                fade.classList.remove('active');
                                GAYA.Levels.Interlude.start();
                            }, 1200);
                        }, 800);
                    });
                } break;
        }
    }

    function checkComplete() {
        if (state.flawsFixed === 5) {
            var hs = Gameplay.getHotspots();
            var mirror = hs.find(function(h) { return h.id === 'full_mirror'; });
            var shoes  = hs.find(function(h) { return h.id === 'shoes_empty'; });
            if (mirror) mirror.active = true;
            if (shoes)  shoes.active = true;
            setTimeout(function() {
                GAYA.Narration.show(D().dress_complete);
            }, 1500);
        }
    }

    return { start: start };
})();
