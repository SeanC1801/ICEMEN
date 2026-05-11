/* ============================================
   GAYA — Petal Particle System
   Falling sampaguita petals on the title screen.
   ============================================ */

window.GAYA = window.GAYA || {};

GAYA.Petals = (function() {
    'use strict';

    var container = null;

    function ensureDOM() {
        if (!container) container = document.getElementById('petals-container');
    }

    function createPetal() {
        ensureDOM();
        var petal = document.createElement('div');
        petal.classList.add('petal');
        var x        = Math.random() * 100;
        var duration = 7 + Math.random() * 6;
        var delay    = Math.random() * 0.5;
        var scale    = 0.6 + Math.random() * 0.8;
        var opacity  = 0.35 + Math.random() * 0.3;
        petal.style.setProperty('--fall-x', x + '%');
        petal.style.setProperty('--fall-duration', duration + 's');
        petal.style.setProperty('--fall-delay', delay + 's');
        petal.style.setProperty('--petal-scale', scale);
        petal.style.setProperty('--petal-opacity', opacity);
        container.appendChild(petal);
    }

    function start() {
        ensureDOM();
        for (var i = 0; i < 12; i++) {
            (function(idx) {
                setTimeout(function() { createPetal(); }, idx * 600);
            })(i);
        }
        setInterval(function() {
            if (container.children.length < 15) createPetal();
        }, 2000);
    }

    return { start: start };
})();
