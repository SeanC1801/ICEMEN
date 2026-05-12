/* ============================================
   GAYA — Opening Cutscene
   Three-slide cinematic sequence synced with
   opening narration. Each dialogue line advances
   the background image:
     Slide 1: Gaya sleeping (Bedroom 001)
     Slide 2: Gaya yawning (Bedroom 002)
     Slide 3: Gaya sitting up (Bedroom 003)
   ============================================ */

window.GAYA = window.GAYA || {};
GAYA.Levels = GAYA.Levels || {};

GAYA.Levels.Opening = {
    start: function() {
        var slides = [
            document.getElementById('cutscene-1'),
            document.getElementById('cutscene-2'),
            document.getElementById('cutscene-3')
        ];
        var lines = GAYA.Dialogue.opening;

        /* Show the first slide immediately (sleeping) */
        showSlide(0);

        /* Begin narration after a cinematic pause */
        setTimeout(function() {
            chainNarration(0);
        }, 2000);

        /* ---- Switch active slide with crossfade ---- */
        function showSlide(index) {
            slides.forEach(function(s) { s.classList.remove('active'); });
            if (index < slides.length) {
                slides[index].classList.add('active');
            }
        }

        /* ---- Play one narration line, then advance slide & repeat ---- */
        function chainNarration(index) {
            if (index >= lines.length) {
                /* All narration done — transition to Level 1 */
                setTimeout(function() {
                    GAYA.Scene.goTo('level1', 1800);
                }, 800);
                return;
            }

            /* Show this line's narration */
            GAYA.Narration.show([lines[index]], function() {
                /* Brief pause between lines for the crossfade to breathe */
                setTimeout(function() {
                    /* Advance to next slide before next line */
                    showSlide(index + 1);
                    /* Let the image transition settle, then show next line */
                    setTimeout(function() {
                        chainNarration(index + 1);
                    }, 1200);
                }, 400);
            });
        }
    }
};
