/* ============================================
   GAYA — Level 3: The Candles
   Seven candles lit from center outward,
   each paired with a wish and a mother beat.
   ============================================ */

window.GAYA = window.GAYA || {};
GAYA.Levels = GAYA.Levels || {};

GAYA.Levels.Level3 = (function() {
    'use strict';

    var D = function() { return GAYA.Dialogue.level3; };
    var state = {
        hasPage: false,
        hasNote: false,
        candlesLit: 0,
        candleOrder: ['candle_4','candle_3','candle_5','candle_2','candle_6','candle_1','candle_7']
    };

    function start() {
        GAYA.Narration.show(D().intro, function() {
            Gameplay.switchMap('sala_evening', handleInteract);
        });
    }

    function handleInteract(hotspot) {
        if (GAYA.State.isNarrating) return;
        var hs = Gameplay.getHotspots();

        switch (hotspot.id) {
            case 'candle_page':
                state.hasPage = true; hotspot.completed = true;
                GAYA.Narration.show(D().candle_page);
                break;

            case 'mother_note':
                state.hasNote = true; hotspot.completed = true;
                var center = hs.find(function(h) { return h.id === 'candle_4'; });
                if (center) center.active = true;
                GAYA.Narration.show(D().mother_note);
                break;

            /* ---- Candles 1–6 (with wishes) ---- */
            case 'candle_4': case 'candle_3': case 'candle_5':
            case 'candle_2': case 'candle_6': case 'candle_1':
                if (!state.hasNote) {
                    GAYA.Narration.show(D().no_order);
                    return;
                }
                if (hotspot.id !== state.candleOrder[state.candlesLit]) {
                    GAYA.Narration.show(D().wrong_candle);
                    return;
                }
                hotspot.completed = true;
                state.candlesLit++;

                var lines = [D().wishes[hotspot.id]];
                var mb = D().mother_beats[hotspot.id];
                if (Array.isArray(mb)) lines = lines.concat(mb);
                else if (mb) lines.push(mb);

                GAYA.Narration.show(lines, function() {
                    if (state.candlesLit < state.candleOrder.length) {
                        var next = hs.find(function(h) { return h.id === state.candleOrder[state.candlesLit]; });
                        if (next) next.active = true;
                    }
                });
                break;

            /* ---- 7th candle — the climax ---- */
            case 'candle_7':
                if (state.candlesLit < 6) {
                    GAYA.Narration.show(D().candle_7_early);
                    return;
                }
                hotspot.completed = true;
                var diary = hs.find(function(h) { return h.id === 'candle_diary'; });
                if (diary) diary.active = true;
                GAYA.Narration.show(D().candle_7);
                break;

            /* ---- Diary Entry 3 + the hand passes through ---- */
            case 'candle_diary':
                hotspot.completed = true;
                GAYA.Narration.show(D().candle_diary, function() {
                    Gameplay.stop();
                    var fade = GAYA.Scene.getFadeOverlay();
                    setTimeout(function() {
                        fade.classList.add('active');
                        setTimeout(function() {
                            GAYA.State.currentScreen = 'ending';
                            fade.classList.remove('active');
                            GAYA.Levels.Ending.start();
                        }, 2000);
                    }, 1500);
                });
                break;
        }
    }

    return { start: start };
})();
