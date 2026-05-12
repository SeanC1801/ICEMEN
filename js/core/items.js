/* ============================================
   GAYA — Item Inspection System
   Shows found objects (like torn pages) as
   fullscreen popups with dark backdrop.
   ============================================ */

window.GAYA = window.GAYA || {};

GAYA.Items = (function() {
    'use strict';

    var overlay, image;
    var onDismiss = null;

    function ensureDOM() {
        if (!overlay) {
            overlay = document.getElementById('item-overlay');
            image   = document.getElementById('item-image');

            /* Click/key to dismiss */
            overlay.addEventListener('click', dismiss);
            document.addEventListener('keydown', function(e) {
                if (overlay.classList.contains('visible')) {
                    if (e.code === 'Space' || e.key === 'Enter' || e.key === 'e' || e.key === 'E') {
                        e.preventDefault();
                        dismiss();
                    }
                }
            });
        }
    }

    /**
     * Show an item image as a fullscreen popup.
     * @param {string} src  — Image source URL or path
     * @param {function} onDone — Called after the player dismisses the popup
     */
    function show(src, onDone) {
        ensureDOM();
        onDismiss = onDone || null;
        image.src = src;
        overlay.classList.remove('hidden');
        overlay.classList.add('visible');
    }

    function dismiss() {
        if (!overlay || !overlay.classList.contains('visible')) return;
        overlay.classList.remove('visible');
        overlay.classList.add('hidden');
        if (onDismiss) {
            var cb = onDismiss;
            onDismiss = null;
            /* Small delay so the fade-out finishes */
            setTimeout(cb, 400);
        }
    }

    return { show: show, dismiss: dismiss };
})();
