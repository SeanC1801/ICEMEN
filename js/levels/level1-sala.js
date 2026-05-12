/* ============================================
   GAYA — Level 1: The Bedroom (Reading the Torn Page)
   First gameplay after the opening cutscene.
   
   Objective 1: Walk to the desk and read the notebook.
   Objective 2: Exit through the door to the living room.
   ============================================ */

window.GAYA = window.GAYA || {};
GAYA.Levels = GAYA.Levels || {};

GAYA.Levels.Level1 = (function() {
    'use strict';

    var D = function() { return GAYA.Dialogue.level1; };
    var state = { hasReadPage: false };

    function start() {
        state.hasReadPage = false;
        Gameplay.loadAndStart(handleInteract, 'sala');
    }

    function handleInteract(hotspot) {
        if (GAYA.State.isNarrating) return;

        switch (hotspot.id) {
            case 'torn_page':
                if (!state.hasReadPage) {
                    state.hasReadPage = true;
                    hotspot.completed = true;

                    /* Show the Torn Page 001 image popup, then narration */
                    GAYA.Items.show(GAYA.Config.assetPaths.tornPage, function() {
                        GAYA.Narration.show(D().torn_page, function() {
                            /* After reading, enable the door exit */
                            var hs = Gameplay.getHotspots();
                            var door = hs.find(function(h) { return h.id === 'door_exit'; });
                            if (door) {
                                door.active = true;
                                /* Prompt the player */
                                setTimeout(function() {
                                    GAYA.Narration.show([
                                        { speaker: 'Gaya', text: 'I should head to the living room.' }
                                    ]);
                                }, 1000);
                            }
                        });
                    });
                }
                break;

            case 'door_exit':
                if (state.hasReadPage) {
                    hotspot.completed = true;
                    /* Transition to the living room (Level 2 or placeholder) */
                    Gameplay.stop();
                    var fade = GAYA.Scene.getFadeOverlay();
                    setTimeout(function() {
                        fade.classList.add('active');
                        setTimeout(function() {
                            GAYA.State.currentScreen = 'level2';
                            fade.classList.remove('active');
                            /* Start Level 2 when the living room map is ready.
                               For now, show a placeholder narration. */
                            if (GAYA.Levels.Level2) {
                                GAYA.Levels.Level2.start();
                            } else {
                                GAYA.Narration.show([
                                    { speaker: 'Gaya', text: 'The living room...' }
                                ]);
                            }
                        }, 1200);
                    }, 800);
                }
                break;
        }
    }

    return { start: start };
})();
