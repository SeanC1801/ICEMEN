/* ============================================
   GAYA — Narration Engine
   Typewriter text display, dialogue queue,
   and advance/skip logic for story beats.
   ============================================ */

window.GAYA = window.GAYA || {};

GAYA.Narration = (function() {
    'use strict';

    var TYPE_SPEED = GAYA.Config.TYPE_SPEED;
    var narrationQueue = [];
    var onNarrationDone = null;
    var typeTimer = null;
    var fullText = '';
    var typeEl = null;

    /* ---- DOM references (set on first use) ---- */
    var overlay, box, speaker, text;

    function ensureDOM() {
        if (!overlay) {
            overlay = document.getElementById('narration-overlay');
            box     = document.getElementById('narration-box');
            speaker = document.getElementById('narration-speaker');
            text    = document.getElementById('narration-text');
        }
    }

    /* ---- Typewriter effect ---- */
    function typeWrite(el, str) {
        typeEl = el;
        fullText = str;
        el.textContent = '';
        GAYA.State.isTyping = true;
        var i = 0;
        clearInterval(typeTimer);
        typeTimer = setInterval(function() {
            if (i < fullText.length) {
                el.textContent += fullText[i];
                i++;
            } else {
                clearInterval(typeTimer);
                GAYA.State.isTyping = false;
            }
        }, TYPE_SPEED);
    }

    function finishTyping() {
        clearInterval(typeTimer);
        if (typeEl) typeEl.textContent = fullText;
        GAYA.State.isTyping = false;
    }

    /* ---- Queue management ---- */
    function show(lines, onDone) {
        ensureDOM();
        narrationQueue = Array.isArray(lines) ? lines.slice() : [lines];
        onNarrationDone = onDone || null;
        overlay.classList.remove('hidden');
        overlay.classList.add('visible');
        advance();
    }

    function advance() {
        if (GAYA.State.isTyping) { finishTyping(); return; }
        if (narrationQueue.length === 0) {
            overlay.classList.remove('visible');
            overlay.classList.add('hidden');
            GAYA.State.isNarrating = false;
            if (onNarrationDone) {
                var cb = onNarrationDone;
                onNarrationDone = null;
                cb();
            }
            return;
        }
        GAYA.State.isNarrating = true;
        var line = narrationQueue.shift();
        speaker.textContent = line.speaker || '';
        typeWrite(text, line.text || line);
    }

    return { show: show, advance: advance };
})();
