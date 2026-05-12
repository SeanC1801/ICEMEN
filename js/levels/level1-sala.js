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
        GAYA.Gameplay.loadAndStart('bedroom', handleInteract);
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
                            var hs = GAYA.Gameplay.hotspots;
                            var door = null;
                            for (var i = 0; i < hs.length; i++) {
                                if (hs[i].id === 'door_exit') { door = hs[i]; break; }
                            }
                            if (door) {
                                door.active = true;
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
                    /* Transition to the Living Room */
                    GAYA.Gameplay.stop();
                    var fade = GAYA.Scene.getFadeOverlay();
                    setTimeout(function() {
                        fade.classList.add('active');
                        setTimeout(function() {
                            GAYA.State.currentScreen = 'livingroom';
                            fade.classList.remove('active');
                            /* Start the Living Room level */
                            if (GAYA.Levels.Livingroom) {
                                GAYA.Levels.Livingroom.start();
                            }
                        }, 1200);
                    }, 800);
                }
                break;
        }
    }

    return { start: start };
})();
