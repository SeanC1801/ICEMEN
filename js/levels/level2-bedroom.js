/* ============================================
   GAYA — Level 2: The Bedroom
   
   Simple flow:
   1. Opening dialogue → dress hotspot appears on bed
   2. Interact with dress → fade → sprite swap → dialogue
   3. Walk to mirror → cutscene slides (017→018→019→020)
   4. Return to gameplay → torn note appears on bed
   5. Read note → diary entry → transition
   ============================================ */

window.GAYA = window.GAYA || {};
GAYA.Levels = GAYA.Levels || {};

GAYA.Levels.Level2 = (function() {
    'use strict';

    var D = function() { return GAYA.Dialogue.level2; };

    var state = {
        phase: 0,
        diffsFound: 0,
        foundHair: false,
        foundPin: false
    };

    /* ---- Cutscene slide helpers ---- */
    var slides = null;
    function getSlides() {
        if (!slides) {
            slides = {
                s017: document.getElementById('cutscene-017'),
                s018: document.getElementById('cutscene-018'),
                s019: document.getElementById('cutscene-019'),
                s020: document.getElementById('cutscene-020')
            };
        }
        return slides;
    }
    function showSlide(id) {
        var sl = getSlides();
        for (var k in sl) { if (sl[k]) sl[k].classList.remove('active'); }
        if (sl[id]) sl[id].classList.add('active');
    }
    function hideAllSlides() {
        var sl = getSlides();
        for (var k in sl) { if (sl[k]) sl[k].classList.remove('active'); }
    }

    /* ============================
       START
       ============================ */
    function start() {
        state.phase = 0;
        state.diffsFound = 0;
        state.foundHair = false;
        state.foundPin = false;

        GAYA.Gameplay.loadAndStart('bedroom', handleInteract);

        GAYA.Narration.show(D().opening, function() {
            state.phase = 1;
            activate('white_dress');
        });
    }

    /* ============================
       INTERACTION HANDLER
       ============================ */
    function handleInteract(hotspot) {
        if (GAYA.State.isNarrating) return;

        switch (hotspot.id) {
            case 'white_dress':
                if (state.phase !== 1) return;
                deactivate('white_dress');
                tryOnDress();
                break;

            case 'full_mirror':
                if (state.phase !== 2) return;
                deactivate('full_mirror');
                goToMirror();
                break;

            case 'torn_note':
                if (state.phase !== 4) return;
                deactivate('torn_note');
                readNote();
                break;
        }
    }

    /* ============================
       PHASE 1→2: TRY ON THE DRESS
       ============================ */
    function tryOnDress() {
        var fade = GAYA.Scene.getFadeOverlay();
        fade.classList.add('active');

        setTimeout(function() {
            swapToWhiteDressSprite();

            setTimeout(function() {
                fade.classList.remove('active');
                state.phase = 2;

                GAYA.Narration.show(D().after_changing, function() {
                    activate('full_mirror');
                });
            }, 800);
        }, 1200);
    }

    /* ============================
       PHASE 2→3: MIRROR CUTSCENE
       ============================ */
    function goToMirror() {
        GAYA.Gameplay.stop();

        /* Switch to cutscene screen */
        var gameScreen = document.getElementById('screen-level1');
        var cutScreen = document.getElementById('screen-level2-cutscene');
        if (gameScreen) gameScreen.classList.remove('active');
        if (cutScreen) cutScreen.classList.add('active');

        /* Slide 017 — Gaya at mirror */
        showSlide('s017');

        setTimeout(function() {
            /* Slide 018 — Drawing appears */
            showSlide('s018');

            GAYA.Narration.show(D().memory, function() {
                /* Slide 019 — Differences circled, open puzzle */
                showSlide('s019');
                state.phase = 3;
                openSpotDiffUI();
            });
        }, 2000);
    }

    /* ============================
       SPOT THE DIFFERENCES
       ============================ */
    function openSpotDiffUI() {
        var overlay = document.getElementById('spot-diff-overlay');
        if (!overlay) overlay = createSpotDiffOverlay();
        resetSpotDiffUI(overlay);
        overlay.classList.remove('hidden');
        overlay.classList.add('visible');
    }

    function createSpotDiffOverlay() {
        var overlay = document.createElement('div');
        overlay.id = 'spot-diff-overlay';
        overlay.className = 'spot-diff-overlay hidden';

        overlay.innerHTML =
            '<div class="spot-diff-container">' +
                '<div class="spot-diff-title">Spot the Differences</div>' +
                '<div class="spot-diff-subtitle">Click the 2 differences between Gaya and the drawing</div>' +
                '<div class="spot-diff-scene">' +
                    '<img class="spot-diff-bg" src="04_Locations/Cutscene/Bedroom 019.png" alt="" draggable="false">' +
                    '<div class="diff-zone diff-hair" data-diff="hair" id="diff-zone-hair"><div class="diff-label">?</div></div>' +
                    '<div class="diff-zone diff-pin" data-diff="pin" id="diff-zone-pin"><div class="diff-label">?</div></div>' +
                '</div>' +
                '<div class="spot-diff-progress" id="spot-diff-progress">0 / 2 found</div>' +
            '</div>';

        document.body.appendChild(overlay);

        var zones = overlay.querySelectorAll('.diff-zone');
        for (var i = 0; i < zones.length; i++) {
            zones[i].addEventListener('click', function() {
                onDiffFound(this.getAttribute('data-diff'));
            });
        }
        return overlay;
    }

    function resetSpotDiffUI(overlay) {
        state.diffsFound = 0;
        state.foundHair = false;
        state.foundPin = false;
        var zones = overlay.querySelectorAll('.diff-zone');
        for (var i = 0; i < zones.length; i++) {
            zones[i].classList.remove('found');
            zones[i].querySelector('.diff-label').textContent = '?';
        }
        overlay.querySelector('#spot-diff-progress').textContent = '0 / 2 found';
    }

    function onDiffFound(type) {
        if (type === 'hair' && state.foundHair) return;
        if (type === 'pin' && state.foundPin) return;

        if (type === 'hair') state.foundHair = true;
        if (type === 'pin') state.foundPin = true;
        state.diffsFound++;

        var zone = document.getElementById('diff-zone-' + type);
        if (zone) {
            zone.classList.add('found');
            zone.querySelector('.diff-label').textContent = '✓';
        }
        document.getElementById('spot-diff-progress').textContent = state.diffsFound + ' / 2 found';

        /* Hide overlay for dialogue */
        var overlay = document.getElementById('spot-diff-overlay');
        overlay.classList.remove('visible');
        overlay.classList.add('hidden');

        var dKey = type === 'hair' ? 'diff_hair' : 'diff_pin';
        GAYA.Narration.show(D()[dKey], function() {
            if (state.diffsFound >= 2) {
                onAllDiffsFound();
            } else {
                overlay.classList.remove('hidden');
                overlay.classList.add('visible');
            }
        });
    }

    /* ============================
       ALL DIFFS FOUND → BACK TO GAMEPLAY
       ============================ */
    function onAllDiffsFound() {
        var overlay = document.getElementById('spot-diff-overlay');
        if (overlay) { overlay.classList.remove('visible'); overlay.classList.add('hidden'); }

        /* Show completion slide 020 */
        showSlide('s020');

        GAYA.Narration.show(D().completion, function() {
            /* Return to gameplay */
            hideAllSlides();
            var cutScreen = document.getElementById('screen-level2-cutscene');
            var gameScreen = document.getElementById('screen-level1');
            if (cutScreen) cutScreen.classList.remove('active');
            if (gameScreen) gameScreen.classList.add('active');

            state.phase = 4;
            GAYA.Gameplay.loadAndStart('bedroom', handleInteract);
            swapToWhiteDressSprite();

            /* Show torn note on bed */
            setTimeout(function() {
                GAYA.Narration.show(D().note_discovery, function() {
                    activate('torn_note');
                });
            }, 600);
        });
    }

    /* ============================
       PHASE 4: READ NOTE
       ============================ */
    function readNote() {
        /* Show the torn page sprite first */
        GAYA.Items.show(GAYA.Config.assetPaths.tornPageSmall, function() {
            /* Then show Diary Entry #2 image */
            GAYA.Items.show(GAYA.Config.assetPaths.diaryEntry2, function() {
                GAYA.Narration.show(D().diary_entry_2, function() {
                    GAYA.Gameplay.stop();
                    var fade = GAYA.Scene.getFadeOverlay();
                    setTimeout(function() {
                        fade.classList.add('active');
                        setTimeout(function() {
                            fade.classList.remove('active');
                            GAYA.Scene.goTo('level3', 800);
                        }, 1200);
                    }, 800);
                });
            });
        });
    }

    /* ============================
       SPRITE SWAP
       ============================ */
    function swapToWhiteDressSprite() {
        var path = GAYA.Config.assetPaths.playerSpriteWhiteDress;
        if (!path) return;
        var img = new Image();
        img.src = path;
        img.onload = function() {
            var grid = GAYA.Config.whiteDressSpriteGrid;
            GAYA.Config.PLAYER_RENDER_SCALE = 0.45;
            if (GAYA.Player && GAYA.Player.swapSprite) {
                GAYA.Player.swapSprite(img, grid);
            }
        };
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

    return { start: start };
})();
