/* ============================================
   GAYA — Opening Cutscene
   Four-slide cinematic sequence:
     Slide 1: Bedroom 001 — Gaya sleeping (no dialog, cinematic pause)
     Slide 2: Bedroom 002 — Gaya yawning (dialog line 0)
     Slide 3: Bedroom 003 — Gaya sitting up (dialog line 1)
     Slide 4: Bedroom 004 — Lit bedroom (dialog line 2)
   Then transitions to Level 1 gameplay.
   ============================================ */

window.GAYA = window.GAYA || {};
GAYA.Levels = GAYA.Levels || {};

GAYA.Levels.Opening = {
    start: function() {
        var slides = [
            document.getElementById('cutscene-1'),
            document.getElementById('cutscene-2'),
            document.getElementById('cutscene-3'),
            document.getElementById('cutscene-4')
        ];
        var lines = GAYA.Dialogue.opening; // 3 lines (indices 0, 1, 2)

        /* Show the first slide (Bedroom 001 — sleeping) */
        showSlide(0);

        /* Slide 1 has NO dialog — hold for 3 seconds then proceed */
        setTimeout(function() {
            /* Transition to Slide 2 (Bedroom 002 — yawning) */
            showSlide(1);
            setTimeout(function() {
                /* Show dialog line 0 on Slide 2 */
                GAYA.Narration.show([lines[0]], function() {
                    setTimeout(function() {
                        /* Transition to Slide 3 (Bedroom 003 — sitting up) */
                        showSlide(2);
                        setTimeout(function() {
                            /* Show dialog line 1 on Slide 3 */
                            GAYA.Narration.show([lines[1]], function() {
                                setTimeout(function() {
                                    /* Transition to Slide 4 (Bedroom 004 — lit room) */
                                    showSlide(3);
                                    setTimeout(function() {
                                        /* Show dialog line 2 on Slide 4 */
                                        GAYA.Narration.show([lines[2]], function() {
                                            /* All done — go to Level 1 */
                                            setTimeout(function() {
                                                GAYA.Scene.goTo('level1', 1800);
                                            }, 800);
                                        });
                                    }, 1200);
                                }, 400);
                            });
                        }, 1200);
                    }, 400);
                });
            }, 1200);
        }, 3000);

        /* ---- Switch active slide with crossfade ---- */
        function showSlide(index) {
            slides.forEach(function(s) { if (s) s.classList.remove('active'); });
            if (index < slides.length && slides[index]) {
                slides[index].classList.add('active');
            }
        }
    }
};
