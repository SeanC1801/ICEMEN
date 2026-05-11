/* ============================================
   GAYA — Level 1: The Sala (Flowers)
   Flower arrangement puzzle with torn page,
   photograph reference, and diary discovery.
   ============================================ */

window.GAYA = window.GAYA || {};
GAYA.Levels = GAYA.Levels || {};

GAYA.Levels.Level1 = (function() {
    'use strict';

    var D = function() { return GAYA.Dialogue.level1; };
    var state = { hasPage: false, hasSeenPhoto: false, flowersPlaced: 0 };

    function start() {
        Gameplay.loadAndStart(handleInteract, 'sala');
    }

    function handleInteract(hotspot) {
        if (GAYA.State.isNarrating) return;

        switch (hotspot.id) {
            case 'torn_page':
                if (!state.hasPage) {
                    state.hasPage = true; hotspot.completed = true;
                    GAYA.Narration.show(D().torn_page);
                }
                break;

            case 'photograph':
                state.hasSeenPhoto = true;
                GAYA.Narration.show(D().photograph);
                break;

            case 'flower_0': case 'flower_1': case 'flower_2':
            case 'flower_3': case 'flower_4': case 'flower_5':
                if (!state.hasSeenPhoto) {
                    GAYA.Narration.show(D().no_reference);
                    return;
                }
                if (!hotspot.completed) {
                    hotspot.completed = true;
                    state.flowersPlaced++;

                    if (hotspot.id === 'flower_0' || hotspot.id === 'flower_1')
                        GAYA.Narration.show(D().flower_entrance);
                    else if (hotspot.id === 'flower_2')
                        GAYA.Narration.show(D().flower_center);
                    else
                        GAYA.Narration.show(D().flower_sides);

                    if (state.flowersPlaced === 6) {
                        var hs = Gameplay.getHotspots();
                        var vase = hs.find(function(h) { return h.id === 'vase_diary'; });
                        if (vase) vase.active = true;
                        setTimeout(function() {
                            GAYA.Narration.show(D().flowers_done);
                        }, 3000);
                    }
                }
                break;

            case 'vase_diary':
                if (!hotspot.completed) {
                    hotspot.completed = true;
                    GAYA.Narration.show(D().vase_diary, function() {
                        Gameplay.stop();
                        var fade = GAYA.Scene.getFadeOverlay();
                        setTimeout(function() {
                            fade.classList.add('active');
                            setTimeout(function() {
                                GAYA.State.currentScreen = 'level2';
                                fade.classList.remove('active');
                                GAYA.Levels.Level2.start();
                            }, 1200);
                        }, 800);
                    });
                }
                break;
        }
    }

    return { start: start };
})();
