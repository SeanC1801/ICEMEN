/* ============================================
   GAYA — Level 3: The Kitchen
   
   Flow:
   1. Opening dialogue → 3 candle hotspots activate
   2. Find candle → fade → word reshuffle puzzle → memory dialogue
   3. After all 3 → 18th candle sequence (fails to light)
   4. Diary Entry 3 → Mother lights it → final reveal
   
   Background progression:
     022 → base (15 lit, 3 missing)
     023 → 1 candle found (16 lit)
     024 → 2 candles found (17 lit)
     025 → 3 candles found (18th empty)
     026 → completion
     027 → mother enters
     028 → all 18 lit
   ============================================ */

window.GAYA = window.GAYA || {};
GAYA.Levels = GAYA.Levels || {};

GAYA.Levels.Level3 = (function() {
    'use strict';

    var D = function() { return GAYA.Dialogue.level3; };

    /* The 3 wishes — solved in fixed order regardless of which candle is picked up */
    var WISHES = [
        { sentence: 'I wish silence ended',                  words: ['I','wish','silence','ended'] },
        { sentence: 'I miss the warmth of our home',         words: ['I','miss','the','warmth','of','our','home'] },
        { sentence: 'Mother let my heart be happy again',    words: ['Mother','let','my','heart','be','happy','again'] }
    ];

    var state = {
        candlesFound: 0,
        currentWish: 0
    };

    /* ============================
       START
       ============================ */
    function start() {
        state.candlesFound = 0;
        state.currentWish = 0;

        GAYA.Gameplay.loadAndStart('kitchen', handleInteract);

        GAYA.Narration.show(D().opening, function() {
            activate('candle_1');
            activate('candle_2');
            activate('candle_3');
        });
    }

    /* ============================
       INTERACTION HANDLER
       ============================ */
    function handleInteract(hotspot) {
        if (GAYA.State.isNarrating) return;

        switch (hotspot.id) {
            case 'candle_1':
            case 'candle_2':
            case 'candle_3':
                deactivate(hotspot.id);
                findCandle();
                break;

            case 'candle_18':
                deactivate('candle_18');
                candle18Sequence();
                break;

            case 'diary_3':
                deactivate('diary_3');
                readDiary3();
                break;
        }
    }

    /* ============================
       FIND A CANDLE → WORD PUZZLE
       ============================ */
    function findCandle() {
        var fade = GAYA.Scene.getFadeOverlay();
        fade.classList.add('active');

        setTimeout(function() {
            fade.classList.remove('active');
            showWordPuzzle(state.currentWish);
        }, 1000);
    }

    /* ============================
       WORD RESHUFFLE PUZZLE UI
       ============================ */
    function showWordPuzzle(wishIndex) {
        var wish = WISHES[wishIndex];
        var overlay = document.getElementById('word-puzzle-overlay');
        if (!overlay) overlay = createPuzzleOverlay();

        /* Scramble each word */
        var scrambled = wish.words.map(function(w) { return scrambleWord(w); });
        var solved = new Array(wish.words.length);
        for (var i = 0; i < solved.length; i++) solved[i] = false;

        var container = overlay.querySelector('.puzzle-words');
        var answerRow = overlay.querySelector('.puzzle-answer');
        var hint = overlay.querySelector('.puzzle-hint');
        hint.textContent = 'Help Gaya remember her forgotten wish by reshuffling the letters.';

        /* Build scrambled word tiles */
        container.innerHTML = '';
        answerRow.innerHTML = '';

        for (var i = 0; i < scrambled.length; i++) {
            /* Answer slot */
            var slot = document.createElement('div');
            slot.className = 'puzzle-slot';
            slot.setAttribute('data-index', i);
            answerRow.appendChild(slot);
        }

        /* Scrambled tiles (shuffled order) */
        var indices = [];
        for (var i = 0; i < scrambled.length; i++) indices.push(i);
        shuffleArray(indices);

        for (var j = 0; j < indices.length; j++) {
            var idx = indices[j];
            var tile = document.createElement('div');
            tile.className = 'puzzle-tile';
            tile.textContent = scrambled[idx];
            tile.setAttribute('data-word', wish.words[idx]);
            tile.setAttribute('data-scrambled', scrambled[idx]);
            (function(t, correctWord) {
                t.addEventListener('click', function() {
                    if (t.classList.contains('used')) return;
                    tryPlaceWord(t, correctWord, wish, solved, overlay);
                });
            })(tile, wish.words[idx]);
            container.appendChild(tile);
        }

        overlay.classList.remove('hidden');
        overlay.classList.add('visible');
    }

    function tryPlaceWord(tile, correctWord, wish, solved, overlay) {
        /* Find next empty slot */
        var nextSlot = -1;
        for (var i = 0; i < solved.length; i++) {
            if (!solved[i]) { nextSlot = i; break; }
        }
        if (nextSlot === -1) return;

        /* Check if this word goes in the next position */
        if (correctWord === wish.words[nextSlot]) {
            solved[nextSlot] = true;
            tile.classList.add('used');
            var slot = overlay.querySelectorAll('.puzzle-slot')[nextSlot];
            slot.textContent = correctWord;
            slot.classList.add('filled');

            /* Check if puzzle complete */
            var allDone = solved.every(function(s) { return s; });
            if (allDone) {
                setTimeout(function() { onPuzzleSolved(overlay); }, 600);
            }
        } else {
            /* Wrong position — shake */
            tile.classList.add('shake');
            setTimeout(function() { tile.classList.remove('shake'); }, 400);
        }
    }

    function onPuzzleSolved(overlay) {
        overlay.classList.remove('visible');
        overlay.classList.add('hidden');

        state.candlesFound++;
        state.currentWish++;

        /* Swap background to show progress */
        var bgKey = 'kitchen_02' + (2 + state.candlesFound);
        if (GAYA.Config.mapBackgrounds[bgKey]) {
            GAYA.Gameplay.swapBackground(GAYA.Config.mapBackgrounds[bgKey]);
        }

        /* Memory dialogue */
        var memKey = 'memory_' + state.candlesFound;
        GAYA.Narration.show(D()[memKey], function() {
            if (state.candlesFound >= 3) {
                /* All 3 found → activate 18th candle */
                activate('candle_18');
            }
        });
    }

    function createPuzzleOverlay() {
        var overlay = document.createElement('div');
        overlay.id = 'word-puzzle-overlay';
        overlay.className = 'word-puzzle-overlay hidden';

        overlay.innerHTML =
            '<div class="puzzle-container">' +
                '<div class="puzzle-title">Remember the Wish</div>' +
                '<div class="puzzle-hint"></div>' +
                '<div class="puzzle-answer"></div>' +
                '<div class="puzzle-words"></div>' +
            '</div>';

        document.body.appendChild(overlay);
        return overlay;
    }

    /* ============================
       18TH CANDLE SEQUENCE
       ============================ */
    function candle18Sequence() {
        GAYA.Gameplay.swapBackground(GAYA.Config.mapBackgrounds.kitchen_026);

        GAYA.Narration.show(D().candle_18_fail, function() {
            activate('diary_3');
        });
    }

    /* ============================
       DIARY ENTRY 3
       ============================ */
    function readDiary3() {
        /* Show the diary image */
        GAYA.Items.show(GAYA.Config.assetPaths.diaryEntry3, function() {
            GAYA.Narration.show(D().diary_3, function() {
                motherLightsCandle();
            });
        });
    }

    /* ============================
       MOTHER LIGHTS THE 18TH CANDLE
       ============================ */
    function motherLightsCandle() {
        GAYA.Gameplay.swapBackground(GAYA.Config.mapBackgrounds.kitchen_027);

        GAYA.Narration.show(D().mother_lights, function() {
            GAYA.Gameplay.swapBackground(GAYA.Config.mapBackgrounds.kitchen_028);

            setTimeout(function() {
                finalReveal();
            }, 1500);
        });
    }

    /* ============================
       FINAL REVEAL
       ============================ */
    function finalReveal() {
        GAYA.Narration.show(D().final_reveal, function() {
            GAYA.Gameplay.stop();
            var fade = GAYA.Scene.getFadeOverlay();
            fade.classList.add('active');
            setTimeout(function() {
                fade.classList.remove('active');
                GAYA.Scene.goTo('ending', 800);
            }, 2000);
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

    function scrambleWord(word) {
        if (word.length <= 2) return word;
        var arr = word.split('');
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
        }
        var result = arr.join('');
        /* Make sure it's actually scrambled */
        return result === word ? scrambleWord(word) : result;
    }

    function shuffleArray(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
        }
    }

    return { start: start };
})();
