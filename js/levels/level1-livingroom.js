/* ============================================
   GAYA — Level 1: Living Room
   
   PHASE 1: Find the flower basket (random spawn)
   PHASE 2: Find 3 black vases (left → middle → right)
   PHASE 3: Flower & Symbol matching (click-based puzzle)
   COMPLETION: Read diary entry in basket
   
   Background progression:
     005 → start
     006 → 1 vase found
     007 → 2 vases found
     008 → all 3 found
     009 → vases on table (transition)
     010 → flower matching puzzle (close-up)
     011 → sampaguita placed correctly
     012 → roses placed correctly
     013 → lilies placed correctly
     014 → completion (zoom out, all flowers + basket)
   ============================================ */

window.GAYA = window.GAYA || {};
GAYA.Levels = GAYA.Levels || {};

GAYA.Levels.Livingroom = (function() {
    'use strict';

    var D = function() { return GAYA.Dialogue.livingroom; };

    var state = {
        phase: 0,           // 0=opening, 1=find basket, 2=find vases, 3=flower match, 4=complete
        hasBasket: false,
        vasesCollected: 0,
        flowersPlaced: 0,
        basketSpawned: false,
        placements: { dancing: null, hugging: null, looking: null },
        selectedFlower: null
    };

    /* ============================
       START
       ============================ */
    function start() {
        state.phase = 0;
        state.hasBasket = false;
        state.vasesCollected = 0;
        state.flowersPlaced = 0;
        state.basketSpawned = false;
        state.placements = { dancing: null, hugging: null, looking: null };
        state.selectedFlower = null;

        GAYA.Gameplay.loadAndStart('livingroom', function() {
            /* Randomize basket position */
            spawnBasketRandomly();

            /* Opening dialogue */
            GAYA.Narration.show(D().opening, function() {
                state.phase = 1;
                /* Basket is already active from map definition */
            });
        });
    }

    /* ============================
       BASKET RANDOM SPAWN
       ============================ */
    function spawnBasketRandomly() {
        if (state.basketSpawned) return;
        var map = GAYA.Maps.livingroom;
        var walkable = map.getWalkableTiles();

        /* Filter tiles not too close to player start */
        var ps = map.playerStart;
        walkable = walkable.filter(function(t) {
            return (Math.abs(t.x - ps.x) + Math.abs(t.y - ps.y)) > 4;
        });

        if (walkable.length === 0) return;
        var chosen = walkable[Math.floor(Math.random() * walkable.length)];

        var hotspots = GAYA.Gameplay.hotspots;
        for (var i = 0; i < hotspots.length; i++) {
            if (hotspots[i].id === 'flower_basket') {
                hotspots[i].x = chosen.x;
                hotspots[i].y = chosen.y;
                hotspots[i].active = true;
                break;
            }
        }
        state.basketSpawned = true;
    }

    /* ============================
       INTERACTION HANDLER
       ============================ */
    function interact(hotspotId) {
        if (GAYA.State.isNarrating) return;

        switch (hotspotId) {

            /* --- PHASE 1: Find the basket --- */
            case 'flower_basket':
                if (state.hasBasket) return;
                state.hasBasket = true;
                deactivate('flower_basket');

                GAYA.Narration.show(D().basket_found, function() {
                    state.phase = 2;
                    /* Activate the 3 vase hotspots */
                    activate('vase_left');
                    activate('vase_middle');
                    activate('vase_right');
                });
                break;

            /* --- PHASE 2: Find the 3 vases --- */
            case 'vase_left':
                if (state.vasesCollected !== 0) {
                    if (state.vasesCollected > 0) GAYA.Narration.show([{ speaker:'GAYA', text:'I already picked this one up.' }]);
                    return;
                }
                state.vasesCollected = 1;
                GAYA.Gameplay.swapBackground(GAYA.Config.mapBackgrounds.livingroom_006);
                deactivate('vase_left');
                GAYA.Narration.show(D().vase_1);
                break;

            case 'vase_middle':
                if (state.vasesCollected !== 1) {
                    if (state.vasesCollected === 0) {
                        GAYA.Narration.show([{ speaker:'GAYA', text:'I should get the one on the left first.' }]);
                    } else {
                        GAYA.Narration.show([{ speaker:'GAYA', text:'Already got this one.' }]);
                    }
                    return;
                }
                state.vasesCollected = 2;
                GAYA.Gameplay.swapBackground(GAYA.Config.mapBackgrounds.livingroom_007);
                deactivate('vase_middle');
                GAYA.Narration.show(D().vase_2);
                break;

            case 'vase_right':
                if (state.vasesCollected !== 2) {
                    if (state.vasesCollected < 2) {
                        GAYA.Narration.show([{ speaker:'GAYA', text:'Not yet. I need to get the others first.' }]);
                    } else {
                        GAYA.Narration.show([{ speaker:'GAYA', text:'Already got this one.' }]);
                    }
                    return;
                }
                state.vasesCollected = 3;
                GAYA.Gameplay.swapBackground(GAYA.Config.mapBackgrounds.livingroom_008);
                deactivate('vase_right');
                GAYA.Narration.show(D().vase_3, function() {
                    /* Transition to vases on table */
                    setTimeout(function() {
                        GAYA.Gameplay.swapBackground(GAYA.Config.mapBackgrounds.livingroom_009);
                        GAYA.Narration.show(D().vases_on_table, function() {
                            state.phase = 3;
                            /* Activate the table hotspot for flower matching */
                            activate('table_vases');
                        });
                    }, 1000);
                });
                break;

            /* --- PHASE 3: Flower matching --- */
            case 'table_vases':
                if (state.phase !== 3) return;
                /* Swap to close-up view and open flower matching UI */
                GAYA.Gameplay.swapBackground(GAYA.Config.mapBackgrounds.livingroom_010);
                GAYA.Gameplay.stop();
                setTimeout(function() {
                    openFlowerMatchingUI();
                }, 500);
                break;

            /* --- PHASE 4: Completion — read torn paper in basket --- */
            case 'basket_note':
                if (state.phase !== 4) return;
                deactivate('basket_note');
                GAYA.Narration.show(D().final_dialogue, function() {
                    /* Show diary entry as item popup */
                    GAYA.Narration.show(D().diary_entry, function() {
                        /* Enable the door to bedroom */
                        activate('door_bedroom');
                        GAYA.Narration.show([
                            { speaker: 'GAYA', text: 'I should head back...' }
                        ]);
                    });
                });
                break;

            /* --- Exit to bedroom --- */
            case 'door_bedroom':
                GAYA.Gameplay.stop();
                var fade = GAYA.Scene.getFadeOverlay();
                setTimeout(function() {
                    fade.classList.add('active');
                    setTimeout(function() {
                        GAYA.State.currentScreen = 'bedroom_return';
                        fade.classList.remove('active');
                        /* TODO: Next level / bedroom return */
                        if (GAYA.Levels.Level2) {
                            GAYA.Levels.Level2.start();
                        } else {
                            GAYA.Narration.show([{ speaker:'GAYA', text: 'The bedroom...' }]);
                        }
                    }, 1200);
                }, 800);
                break;
        }
    }

    /* ============================
       FLOWER MATCHING UI
       ============================ */
    function openFlowerMatchingUI() {
        var overlay = document.getElementById('flower-match-overlay');
        if (!overlay) {
            overlay = createFlowerMatchingOverlay();
        }
        resetFlowerUI(overlay);
        overlay.classList.remove('hidden');
        overlay.classList.add('visible');
    }

    function createFlowerMatchingOverlay() {
        var overlay = document.createElement('div');
        overlay.id = 'flower-match-overlay';
        overlay.className = 'flower-match-overlay hidden';

        overlay.innerHTML = '' +
            '<div class="flower-match-container">' +
                '<div class="flower-match-title">Arrange the Flowers</div>' +
                '<div class="flower-match-subtitle">Click a flower, then click the vase with the matching symbol</div>' +
                /* Background image */
                '<div class="flower-match-scene" id="flower-match-scene">' +
                    '<img id="flower-match-bg" class="flower-match-bg" src="" alt="" draggable="false">' +
                    /* Vase click zones (positioned over the image) */
                    '<div class="vase-zone vase-left" data-vase="dancing" id="vase-zone-dancing">' +
                        '<div class="vase-label">Dancing</div>' +
                    '</div>' +
                    '<div class="vase-zone vase-center" data-vase="hugging" id="vase-zone-hugging">' +
                        '<div class="vase-label">Hugging</div>' +
                    '</div>' +
                    '<div class="vase-zone vase-right" data-vase="looking" id="vase-zone-looking">' +
                        '<div class="vase-label">Looking Up</div>' +
                    '</div>' +
                '</div>' +
                /* Flower selection buttons */
                '<div class="flower-selection">' +
                    '<button class="flower-btn" data-flower="sampaguita" id="btn-sampaguita">' +
                        '🌸 Sampaguita' +
                    '</button>' +
                    '<button class="flower-btn" data-flower="roses" id="btn-roses">' +
                        '🌹 Roses' +
                    '</button>' +
                    '<button class="flower-btn" data-flower="lilies" id="btn-lilies">' +
                        '🌷 Lilies' +
                    '</button>' +
                '</div>' +
                '<div class="flower-match-hint" id="flower-match-hint">Select a flower from the basket</div>' +
            '</div>';

        document.body.appendChild(overlay);

        /* Bind events */
        var flowerBtns = overlay.querySelectorAll('.flower-btn');
        for (var i = 0; i < flowerBtns.length; i++) {
            flowerBtns[i].addEventListener('click', function(e) {
                var flower = this.getAttribute('data-flower');
                selectFlower(flower, overlay);
            });
        }

        var vaseZones = overlay.querySelectorAll('.vase-zone');
        for (var j = 0; j < vaseZones.length; j++) {
            vaseZones[j].addEventListener('click', function(e) {
                var vase = this.getAttribute('data-vase');
                placeFlower(vase, overlay);
            });
        }

        return overlay;
    }

    function resetFlowerUI(overlay) {
        state.selectedFlower = null;
        state.placements = { dancing: null, hugging: null, looking: null };
        state.flowersPlaced = 0;

        /* Set initial background image */
        var bg = overlay.querySelector('#flower-match-bg');
        bg.src = GAYA.Config.mapBackgrounds.livingroom_010;

        /* Reset all buttons */
        var btns = overlay.querySelectorAll('.flower-btn');
        for (var i = 0; i < btns.length; i++) {
            btns[i].disabled = false;
            btns[i].classList.remove('selected', 'placed');
        }

        /* Reset vase zones */
        var zones = overlay.querySelectorAll('.vase-zone');
        for (var j = 0; j < zones.length; j++) {
            zones[j].classList.remove('filled', 'glow');
        }

        var hint = overlay.querySelector('#flower-match-hint');
        if (hint) hint.textContent = 'Select a flower from the basket';
    }

    function selectFlower(flower, overlay) {
        /* Deselect others */
        var btns = overlay.querySelectorAll('.flower-btn');
        for (var i = 0; i < btns.length; i++) btns[i].classList.remove('selected');

        state.selectedFlower = flower;
        var btn = overlay.querySelector('#btn-' + flower);
        if (btn) btn.classList.add('selected');

        var hint = overlay.querySelector('#flower-match-hint');
        if (hint) hint.textContent = 'Now click the vase with the matching symbol';
    }

    function placeFlower(vaseSymbol, overlay) {
        if (!state.selectedFlower) {
            var hint = overlay.querySelector('#flower-match-hint');
            if (hint) hint.textContent = 'Select a flower first!';
            return;
        }

        /* Already filled? */
        if (state.placements[vaseSymbol]) {
            var hint = overlay.querySelector('#flower-match-hint');
            if (hint) hint.textContent = 'This vase already has a flower.';
            return;
        }

        var flower = state.selectedFlower;

        /* Check correct pairings */
        var correct = {
            sampaguita: 'dancing',
            roses: 'hugging',
            lilies: 'looking'
        };

        if (correct[flower] === vaseSymbol) {
            /* CORRECT! */
            state.placements[vaseSymbol] = flower;
            state.flowersPlaced++;
            state.selectedFlower = null;

            /* Disable the flower button */
            var btn = overlay.querySelector('#btn-' + flower);
            if (btn) {
                btn.classList.remove('selected');
                btn.classList.add('placed');
                btn.disabled = true;
            }

            /* Glow the vase */
            var zone = overlay.querySelector('#vase-zone-' + vaseSymbol);
            if (zone) zone.classList.add('filled', 'glow');

            /* Swap background for each correct placement */
            var bgMap = {
                1: GAYA.Config.mapBackgrounds.livingroom_011,
                2: GAYA.Config.mapBackgrounds.livingroom_012,
                3: GAYA.Config.mapBackgrounds.livingroom_013
            };
            var bg = overlay.querySelector('#flower-match-bg');
            if (bg && bgMap[state.flowersPlaced]) {
                bg.src = bgMap[state.flowersPlaced];
            }

            /* Hide overlay temporarily for narration */
            overlay.classList.remove('visible');
            overlay.classList.add('hidden');

            /* Show the correct placement dialogue */
            var dialogues = {
                sampaguita: D().correct_sampaguita,
                roses: D().correct_roses,
                lilies: D().correct_lilies
            };

            GAYA.Narration.show(dialogues[flower], function() {
                if (state.flowersPlaced >= 3) {
                    /* All done! */
                    onFlowerMatchComplete();
                } else {
                    /* Re-open the overlay for next flower */
                    overlay.classList.remove('hidden');
                    overlay.classList.add('visible');
                    var hint = overlay.querySelector('#flower-match-hint');
                    if (hint) hint.textContent = 'Select the next flower';
                }
            });

        } else {
            /* WRONG placement — show hint dialogue */
            overlay.classList.remove('visible');
            overlay.classList.add('hidden');

            var wrongDialogues = {
                sampaguita: D().wrong_sampaguita,
                roses: D().wrong_roses,
                lilies: D().wrong_lilies
            };

            GAYA.Narration.show(wrongDialogues[flower], function() {
                /* Deselect the flower */
                state.selectedFlower = null;
                var btns = overlay.querySelectorAll('.flower-btn');
                for (var i = 0; i < btns.length; i++) btns[i].classList.remove('selected');

                /* Re-open the overlay */
                overlay.classList.remove('hidden');
                overlay.classList.add('visible');
                var hint = overlay.querySelector('#flower-match-hint');
                if (hint) hint.textContent = 'Try a different vase for this flower...';
            });
        }
    }

    /* ============================
       FLOWER MATCH COMPLETE
       ============================ */
    function onFlowerMatchComplete() {
        /* Swap to completion background (014) */
        GAYA.Gameplay.swapBackground(GAYA.Config.mapBackgrounds.livingroom_014);

        GAYA.Narration.show(D().completion, function() {
            state.phase = 4;
            /* Resume gameplay */
            GAYA.Gameplay.loadAndStart('livingroom', function() {
                /* Swap to 014 background */
                GAYA.Gameplay.swapBackground(GAYA.Config.mapBackgrounds.livingroom_014);

                /* Re-spawn the basket note hotspot near the basket's original area */
                var hotspots = GAYA.Gameplay.hotspots;
                for (var i = 0; i < hotspots.length; i++) {
                    if (hotspots[i].id === 'basket_note') {
                        hotspots[i].active = true;
                        /* Position it at the center of the room (near the table) */
                        hotspots[i].x = 7;
                        hotspots[i].y = 7;
                        break;
                    }
                }
                /* Deactivate all vase/basket hotspots */
                deactivate('flower_basket');
                deactivate('vase_left');
                deactivate('vase_middle');
                deactivate('vase_right');
                deactivate('table_vases');

                GAYA.Narration.show(D().final_dialogue);
            });
        });
    }

    /* ============================
       HELPERS
       ============================ */
    function activate(id) {
        var hs = GAYA.Gameplay.hotspots;
        if (!hs) return;
        for (var i = 0; i < hs.length; i++) {
            if (hs[i].id === id) { hs[i].active = true; break; }
        }
    }

    function deactivate(id) {
        var hs = GAYA.Gameplay.hotspots;
        if (!hs) return;
        for (var i = 0; i < hs.length; i++) {
            if (hs[i].id === id) { hs[i].active = false; break; }
        }
    }

    return { start: start, interact: interact };
})();
