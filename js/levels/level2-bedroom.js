/* ============================================
   GAYA — Level 2: The Bedroom
   
   PHASE 0: Opening — Gaya sees the white dress
   PHASE 1: Try on the dress (fade to black, sprite swap)
   PHASE 2: Mirror scene → Spot the Differences puzzle
   PHASE 3: Completion — dress matches drawing
   PHASE 4: Hidden note discovery + Diary Entry 2

   Background progression:
     015 → room with dress on bed (opening)
     016 → after changing (dialogue)
     017 → Gaya at the mirror
     018 → drawing appears (memory)
     019 → differences circled (puzzle active)
     020 → matched / completion
     021 → wide bedroom, torn note on bed
   ============================================ */

window.GAYA = window.GAYA || {};
GAYA.Levels = GAYA.Levels || {};

GAYA.Levels.Level2 = (function() {
    'use strict';

    var D = function() { return GAYA.Dialogue.level2; };

    var state = {
        phase: 0,           // 0=opening, 1=try dress, 2=spot diff, 3=complete, 4=note
        diffsFound: 0,
        foundHair: false,
        foundPin: false
    };

    /* ============================
       START
       ============================ */
    function start() {
        state.phase = 0;
        state.diffsFound = 0;
        state.foundHair = false;
        state.foundPin = false;

        /* Load the bedroom map with Bedroom 015 background */
        GAYA.Gameplay.loadAndStart('bedroom', handleInteract);

        /* Swap to 015 (room with dress on bed) */
        GAYA.Gameplay.swapBackground(GAYA.Config.mapBackgrounds.bedroom_015);

        /* Opening dialogue — Bedroom 015 */
        GAYA.Narration.show(D().opening, function() {
            state.phase = 1;
            /* Activate the dress hotspot on the bed */
            activate('white_dress');
        });
    }

    /* ============================
       INTERACTION HANDLER
       ============================ */
    function handleInteract(hotspot) {
        if (GAYA.State.isNarrating) return;

        switch (hotspot.id) {

            /* --- PHASE 1: Try on the dress --- */
            case 'white_dress':
                if (state.phase !== 1) return;
                deactivate('white_dress');
                tryOnDress();
                break;

            /* --- PHASE 2: Mirror → starts spot-the-diff --- */
            case 'full_mirror':
                if (state.phase !== 1) return;
                goToMirror();
                break;

            /* --- PHASE 3: Shoes / note area --- */
            case 'bed_shoes':
                if (state.phase !== 3) return;
                goToNote();
                break;

            /* --- PHASE 4: Torn note --- */
            case 'torn_note':
                if (state.phase !== 4) return;
                readNote();
                break;
        }
    }

    /* ============================
       PHASE 1: TRY ON THE DRESS
       ============================ */
    function tryOnDress() {
        var fade = GAYA.Scene.getFadeOverlay();
        fade.classList.add('active');

        setTimeout(function() {
            /* Swap sprite to white dress version */
            swapToWhiteDressSprite();

            /* Swap background to 016 */
            GAYA.Gameplay.swapBackground(GAYA.Config.mapBackgrounds.bedroom_016);

            setTimeout(function() {
                fade.classList.remove('active');

                /* Dialogue after changing — Bedroom 016 */
                GAYA.Narration.show(D().after_changing, function() {
                    /* Activate mirror hotspot */
                    activate('full_mirror');
                });
            }, 800);
        }, 1200);
    }

    /* ============================
       MIRROR SCENE → SPOT THE DIFF
       ============================ */
    function goToMirror() {
        deactivate('full_mirror');

        /* Swap to 017 — Gaya at the mirror */
        GAYA.Gameplay.swapBackground(GAYA.Config.mapBackgrounds.bedroom_017);
        GAYA.Gameplay.stop();

        setTimeout(function() {
            /* Swap to 018 — memory / drawing appears */
            GAYA.Gameplay.swapBackground(GAYA.Config.mapBackgrounds.bedroom_018);

            GAYA.Narration.show(D().memory, function() {
                /* Swap to 019 — differences circled, open puzzle */
                GAYA.Gameplay.swapBackground(GAYA.Config.mapBackgrounds.bedroom_019);
                state.phase = 2;
                openSpotDiffUI();
            });
        }, 1500);
    }

    /* ============================
       SPOT THE DIFFERENCES UI
       ============================ */
    function openSpotDiffUI() {
        var overlay = document.getElementById('spot-diff-overlay');
        if (!overlay) {
            overlay = createSpotDiffOverlay();
        }
        resetSpotDiffUI(overlay);
        overlay.classList.remove('hidden');
        overlay.classList.add('visible');
    }

    function createSpotDiffOverlay() {
        var overlay = document.createElement('div');
        overlay.id = 'spot-diff-overlay';
        overlay.className = 'spot-diff-overlay hidden';

        overlay.innerHTML = '' +
            '<div class="spot-diff-container">' +
                '<div class="spot-diff-title">Spot the Differences</div>' +
                '<div class="spot-diff-subtitle">Click the 2 differences on the drawing compared to the mirror reflection</div>' +
                '<div class="spot-diff-scene" id="spot-diff-scene">' +
                    '<img id="spot-diff-bg" class="spot-diff-bg" src="" alt="" draggable="false">' +
                    /* Clickable zones on the drawing */
                    '<div class="diff-zone diff-hair" data-diff="hair" id="diff-zone-hair">' +
                        '<div class="diff-label">?</div>' +
                    '</div>' +
                    '<div class="diff-zone diff-pin" data-diff="pin" id="diff-zone-pin">' +
                        '<div class="diff-label">?</div>' +
                    '</div>' +
                '</div>' +
                '<div class="spot-diff-progress" id="spot-diff-progress">0 / 2 found</div>' +
                '<div class="spot-diff-hint" id="spot-diff-hint">Look carefully at the drawing and find what\'s different</div>' +
            '</div>';

        document.body.appendChild(overlay);

        /* Bind click events on diff zones */
        var zones = overlay.querySelectorAll('.diff-zone');
        for (var i = 0; i < zones.length; i++) {
            zones[i].addEventListener('click', function() {
                var diff = this.getAttribute('data-diff');
                onDiffFound(diff, overlay);
            });
        }

        return overlay;
    }

    function resetSpotDiffUI(overlay) {
        state.diffsFound = 0;
        state.foundHair = false;
        state.foundPin = false;

        var bg = overlay.querySelector('#spot-diff-bg');
        bg.src = GAYA.Config.mapBackgrounds.bedroom_019;

        var zones = overlay.querySelectorAll('.diff-zone');
        for (var i = 0; i < zones.length; i++) {
            zones[i].classList.remove('found');
            zones[i].querySelector('.diff-label').textContent = '?';
        }

        var progress = overlay.querySelector('#spot-diff-progress');
        if (progress) progress.textContent = '0 / 2 found';

        var hint = overlay.querySelector('#spot-diff-hint');
        if (hint) hint.textContent = "Look carefully at the drawing and find what's different";
    }

    function onDiffFound(diffType, overlay) {
        if (diffType === 'hair' && state.foundHair) return;
        if (diffType === 'pin' && state.foundPin) return;

        if (diffType === 'hair') state.foundHair = true;
        if (diffType === 'pin') state.foundPin = true;
        state.diffsFound++;

        /* Mark the zone as found */
        var zone = overlay.querySelector('#diff-zone-' + diffType);
        if (zone) {
            zone.classList.add('found');
            zone.querySelector('.diff-label').textContent = '✓';
        }

        var progress = overlay.querySelector('#spot-diff-progress');
        if (progress) progress.textContent = state.diffsFound + ' / 2 found';

        var hint = overlay.querySelector('#spot-diff-hint');

        /* Show dialogue for found diff */
        overlay.classList.remove('visible');
        overlay.classList.add('hidden');

        var dialogues = {
            hair: D().diff_hair,
            pin: D().diff_pin
        };

        GAYA.Narration.show(dialogues[diffType], function() {
            if (state.diffsFound >= 2) {
                onAllDiffsFound();
            } else {
                /* Re-open overlay for next diff */
                overlay.classList.remove('hidden');
                overlay.classList.add('visible');
                if (hint) hint.textContent = 'One more difference to find!';
            }
        });
    }

    /* ============================
       ALL DIFFERENCES FOUND
       ============================ */
    function onAllDiffsFound() {
        /* Remove the overlay */
        var overlay = document.getElementById('spot-diff-overlay');
        if (overlay) {
            overlay.classList.remove('visible');
            overlay.classList.add('hidden');
        }

        /* Swap to 020 — Gaya now matches the drawing */
        GAYA.Gameplay.swapBackground(GAYA.Config.mapBackgrounds.bedroom_020);

        state.phase = 3;

        /* Completion dialogue — Bedroom 020 */
        GAYA.Narration.show(D().completion, function() {
            /* Resume gameplay, activate bed_shoes hotspot */
            GAYA.Gameplay.loadAndStart('bedroom', handleInteract);
            GAYA.Gameplay.swapBackground(GAYA.Config.mapBackgrounds.bedroom_020);

            /* Re-apply white dress sprite */
            swapToWhiteDressSprite();

            activate('bed_shoes');
        });
    }

    /* ============================
       PHASE 4: HIDDEN NOTE
       ============================ */
    function goToNote() {
        deactivate('bed_shoes');
        state.phase = 4;

        /* Swap to 021 — wide bedroom, torn note visible */
        GAYA.Gameplay.swapBackground(GAYA.Config.mapBackgrounds.bedroom_021);

        /* Dialogue — Bedroom 021 */
        GAYA.Narration.show(D().note_discovery, function() {
            activate('torn_note');
        });
    }

    function readNote() {
        deactivate('torn_note');

        /* Show diary entry */
        GAYA.Narration.show(D().diary_entry_2, function() {
            /* Transition to next level / interlude */
            var fade = GAYA.Scene.getFadeOverlay();
            GAYA.Gameplay.stop();
            setTimeout(function() {
                fade.classList.add('active');
                setTimeout(function() {
                    GAYA.State.currentScreen = 'interlude';
                    fade.classList.remove('active');
                    if (GAYA.Levels.Interlude) {
                        GAYA.Levels.Interlude.start();
                    }
                }, 1200);
            }, 800);
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
            /* Swap the active player sprite with white dress grid config */
            var grid = GAYA.Config.whiteDressSpriteGrid;
            /* Adjust render scale for smaller frames (160×130 vs 504×634) */
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

    return { start: start, interact: handleInteract };
})();
