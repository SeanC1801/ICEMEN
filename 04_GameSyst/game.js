/* ============================================
   GAYA — Game Logic
   ============================================ */

(function() {
    'use strict';

    /* ---- State ---- */
    let currentScreen = 'warning';
    let narrationQueue = [];
    let isTyping = false;
    let isNarrating = false;
    let onNarrationDone = null;
    let typeTimer = null;
    let fullText = '';
    let typeEl = null;
    const TYPE_SPEED = 28;

    /* ---- DOM ---- */
    const screens = {};
    const petalsContainer = document.getElementById('petals-container');
    const fadeOverlay = document.getElementById('fade-overlay');
    const narrationOverlay = document.getElementById('narration-overlay');
    const narrationBox = document.getElementById('narration-box');
    const narrationSpeaker = document.getElementById('narration-speaker');
    const narrationText = document.getElementById('narration-text');

    // Collect all screens
    document.querySelectorAll('.screen').forEach(s => {
        const id = s.id.replace('screen-', '');
        screens[id] = s;
    });

    /* ============================================
       NARRATION ENGINE
       ============================================ */
    function showNarration(lines, onDone) {
        narrationQueue = Array.isArray(lines) ? [...lines] : [lines];
        onNarrationDone = onDone || null;
        narrationOverlay.classList.remove('hidden');
        narrationOverlay.classList.add('visible');
        advanceNarration();
    }

    function advanceNarration() {
        // If still typing, finish instantly
        if (isTyping) {
            finishTyping();
            return;
        }
        // If queue empty, close narration
        if (narrationQueue.length === 0) {
            narrationOverlay.classList.remove('visible');
            narrationOverlay.classList.add('hidden');
            isNarrating = false;
            if (onNarrationDone) {
                const cb = onNarrationDone;
                onNarrationDone = null;
                cb();
            }
            return;
        }
        isNarrating = true;
        const line = narrationQueue.shift();
        const speaker = line.speaker || '';
        narrationSpeaker.textContent = speaker;
        typeWrite(narrationText, line.text || line);
    }

    function typeWrite(el, text) {
        typeEl = el;
        fullText = text;
        el.textContent = '';
        isTyping = true;
        let i = 0;
        clearInterval(typeTimer);
        typeTimer = setInterval(() => {
            if (i < fullText.length) {
                el.textContent += fullText[i];
                i++;
            } else {
                clearInterval(typeTimer);
                isTyping = false;
            }
        }, TYPE_SPEED);
    }

    function finishTyping() {
        clearInterval(typeTimer);
        if (typeEl) typeEl.textContent = fullText;
        isTyping = false;
    }

    /* ============================================
       SCENE TRANSITIONS
       ============================================ */
    function goToScene(id, delay) {
        fadeOverlay.classList.add('active');
        setTimeout(() => {
            // Hide all screens
            document.querySelectorAll('.screen.active').forEach(s => s.classList.remove('active'));
            // Show target
            if (screens[id]) {
                screens[id].classList.add('active');
            }
            currentScreen = id;
            // Fade back in
            setTimeout(() => {
                fadeOverlay.classList.remove('active');
                onSceneEnter(id);
            }, 600);
        }, delay || 1200);
    }

    /* ============================================
       SCENE ENTRY ROUTER
       ============================================ */
    function onSceneEnter(id) {
        switch(id) {
            case 'opening': startOpening(); break;
            case 'level1': startLevel1(); break;
            case 'level2': startLevel2(); break;
        }
    }

    /* ============================================
       OPENING SCENE
       ============================================ */
    function startOpening() {
        setTimeout(() => {
            showNarration([
                { speaker: 'Gaya (internal)', text: 'Okay. Okay. Flowers first, then the dress, then the candles. That\'s the order. I wrote it down somewhere — actually, I think I put the list in the flower planner. Doesn\'t matter. I know the order. Flowers, dress, candles. I know it.' },
                { speaker: 'Gaya (internal)', text: 'Mommy\'s already here somewhere. I can hear her moving around. She\'s been doing so much — I keep telling her I can handle it, but you know how she is. She can\'t just sit.' },
                { speaker: 'Gaya (internal)', text: 'Okay. Flowers first.' }
            ], () => {
                goToScene('level1', 1500);
            });
        }, 1500);
    }

    /* ============================================
       LEVEL 1: THE SALA (FLOWERS)
       ============================================ */
    const l1State = { hasPage: false, hasSeenPhoto: false, flowersPlaced: 0 };

    function startLevel1() {
        Gameplay.loadAndStart(handleLevel1Interact, 'sala');
    }

    function handleLevel1Interact(hotspot) {
        if (isNarrating) return;
        switch (hotspot.id) {
            case 'torn_page':
                if (!l1State.hasPage) {
                    l1State.hasPage = true; hotspot.completed = true;
                    showNarration([
                        { speaker: 'Torn Page', text: '"Finally decided. Sampaguita, white roses, white lilies. I want the sala to feel like something important is about to happen... I\'ve seen this before. At Lola\'s. At Tito Ben\'s."' },
                        { speaker: 'Gaya', text: 'I know what I want. I just have to remember where I\'ve seen it.' }
                    ]);
                } break;
            case 'photograph':
                l1State.hasSeenPhoto = true;
                showNarration([
                    { speaker: 'Gaya', text: 'Lola\'s family gathering. The sala was so full that day.' },
                    { speaker: 'Gaya (internal)', text: 'Look at the flowers. Sampaguita at the entrance. Roses at the center. Lilies on the sides. Six arrangements total. That\'s what I want.' }
                ]); break;
            case 'flower_0': case 'flower_1': case 'flower_2': case 'flower_3': case 'flower_4': case 'flower_5':
                if (!l1State.hasSeenPhoto) { showNarration([{ speaker: 'Gaya', text: 'I should figure out where these go first. I had a reference somewhere...' }]); return; }
                if (!hotspot.completed) {
                    hotspot.completed = true; l1State.flowersPlaced++;
                    if (hotspot.id==='flower_0'||hotspot.id==='flower_1') showNarration([{ speaker:'Gaya', text:'Sampaguita for the entrance. Clean and simple. I wanted people to feel it the moment they walk in — like a welcome.' }]);
                    else if (hotspot.id==='flower_2') showNarration([{ speaker:'Gaya', text:'Roses for the center table. The focal point. Everything draws the eye here.' }]);
                    else showNarration([{ speaker:'Gaya', text:'Lilies on both sides. For balance. I like how they stand tall. Like something you\'d see at something that matters.' }]);
                    if (l1State.flowersPlaced === 6) {
                        const hs = Gameplay.getHotspots(); const vase = hs.find(h => h.id === 'vase_diary');
                        if (vase) vase.active = true;
                        setTimeout(() => showNarration([
                            { speaker:'Gaya', text:'I knew Mommy would love it. She always acts like I\'m overdoing things and then when she actually sees it — I knew.' },
                            { speaker:'Gaya (internal)', text:'(There\'s a subtle rattling sound coming from the center vase...)' }
                        ]), 3000);
                    }
                } break;
            case 'vase_diary':
                if (!hotspot.completed) {
                    hotspot.completed = true;
                    showNarration([
                        { speaker:'Diary Page', text:'"...Ang pagod ko. I don\'t even know why... yung pagod na walang dahilan. I\'ll sleep early tonight, siguro that\'s it."' },
                        { speaker:'Gaya', text:'Oh — I must have put this here for safekeeping. My flower notes, probably. Smart actually.' }
                    ], () => {
                        // Switch to bedroom map (Level 2) using the same canvas
                        Gameplay.stop();
                        setTimeout(() => {
                            fadeOverlay.classList.add('active');
                            setTimeout(() => {
                                currentScreen = 'level2';
                                fadeOverlay.classList.remove('active');
                                startLevel2();
                            }, 1200);
                        }, 800);
                    });
                } break;
        }
    }

    /* ============================================
       LEVEL 2: THE DRESS (BEDROOM)
       ============================================ */
    const l2State = { flawsFixed: 0, hasSeenMirror: false, hasSeenMagazine: false, mirrorClicks: 0 };

    function startLevel2() {
        showNarration([
            { speaker: 'Gaya (internal)', text: 'The dress is here. I tried to just look at it for a minute without touching it. I couldn\'t. The embroidery at the neckline is exactly what Mommy described.' },
            { speaker: 'Gaya (internal)', text: 'I want to wear it perfectly. I want every part of it to be exactly right. Not for the photographs — for me.' }
        ], () => {
            Gameplay.switchMap('bedroom', handleLevel2Interact);
        });
    }

    function handleLevel2Interact(hotspot) {
        if (isNarrating) return;
        const hs = Gameplay.getHotspots();

        switch (hotspot.id) {
            // --- Supporting objects (clues) ---
            case 'fitting_mirror':
                l2State.hasSeenMirror = true;
                hotspot.completed = true;
                // Enable the hem hotspot
                const hem = hs.find(h => h.id === 'dress_hem');
                if (hem) hem.active = true;
                showNarration([
                    { speaker: 'Gaya', text: 'A fitting mirror. For checking hems at floor level.' },
                    { speaker: 'Gaya (internal)', text: 'Wait — looking through it, the hem dips slightly on the left side. I wouldn\'t have seen that from standing.' }
                ]); break;

            case 'magazine':
                l2State.hasSeenMagazine = true;
                hotspot.completed = true;
                // Enable the sleeves hotspot
                const sleeves = hs.find(h => h.id === 'dress_sleeves');
                if (sleeves) sleeves.active = true;
                showNarration([
                    { speaker: 'Gaya', text: 'A debut spread. The debutante in the picture has her sleeves folded back one clean turn.' },
                    { speaker: 'Gaya (internal)', text: 'That\'s it. That\'s how the sleeves should look.' }
                ]); break;

            // --- The 5 dress flaws ---
            case 'dress_fabric':
                if (!hotspot.completed) {
                    hotspot.completed = true; l2State.flawsFixed++;
                    showNarration([
                        { speaker: 'Gaya', text: 'There — a ripple running against the grain of the fabric. Small, but I can see it.' },
                        { speaker: 'Gaya', text: 'Smooth it out. Perfect.' }
                    ], () => checkDressComplete());
                } break;
            case 'dress_collar':
                if (!hotspot.completed) {
                    hotspot.completed = true; l2State.flawsFixed++;
                    showNarration([
                        { speaker: 'Gaya', text: 'Two buttons fastened. One unfastened — the second from the bottom.' },
                        { speaker: 'Gaya', text: 'Got it. All three now.' }
                    ], () => checkDressComplete());
                } break;
            case 'dress_hem':
                if (!hotspot.completed) {
                    hotspot.completed = true; l2State.flawsFixed++;
                    showNarration([
                        { speaker: 'Gaya', text: 'The hem dips on the left. I only saw it through the fitting mirror. Fixed.' }
                    ], () => checkDressComplete());
                } break;
            case 'dress_sleeves':
                if (!hotspot.completed) {
                    hotspot.completed = true; l2State.flawsFixed++;
                    showNarration([
                        { speaker: 'Gaya', text: 'Fold the sleeves back one clean turn. Like the magazine. There.' }
                    ], () => checkDressComplete());
                } break;
            case 'dress_lace':
                if (!hotspot.completed) {
                    hotspot.completed = true; l2State.flawsFixed++;
                    showNarration([
                        { speaker: 'Gaya', text: 'The neckline lace is bunched slightly at the right side. Almost right. Almost is not what I wrote.' },
                        { speaker: 'Gaya', text: 'There. Now it\'s right.' }
                    ], () => checkDressComplete());
                } break;

            // --- Mirror sequence (3 interactions) ---
            case 'full_mirror':
                l2State.mirrorClicks++;
                if (l2State.mirrorClicks === 1) {
                    showNarration([{ speaker: 'Gaya', text: 'Beautiful. I\'ll wear it and I\'ll feel like — the version of myself that I was supposed to be.' }]);
                } else if (l2State.mirrorClicks === 2) {
                    showNarration([{ speaker: 'Gaya (internal)', text: 'The reflection moved... a half-second after I did.' },
                        { speaker: 'Gaya', text: 'Must be the light.' }]);
                } else if (l2State.mirrorClicks === 3) {
                    hotspot.completed = true;
                    showNarration([
                        { speaker: '...', text: 'For two seconds, the reflection is empty. The dress is on the bed. The room is as it is. In the doorway, the mother stands watching.' },
                        { speaker: 'Gaya', text: 'I\'m tired, that\'s all. I\'ve been tired for — it\'s fine. It\'ll be fine after. Everything will be fine after.' }
                    ], () => {
                        // Enable diary pocket
                        const pocket = hs.find(h => h.id === 'dress_pocket');
                        if (pocket) pocket.active = true;
                    });
                } break;

            // --- Empty shoes space ---
            case 'shoes_empty':
                showNarration([{ speaker: 'Gaya', text: 'Shoes later, I think. The dress first.' }]);
                hotspot.completed = true; break;

            // --- Diary Entry 2 ---
            case 'dress_pocket':
                if (!hotspot.completed) {
                    hotspot.completed = true;
                    showNarration([
                        { speaker: 'Gaya', text: 'Oh, I put this here? Smart naman. I always forget where I leave things and then they\'re exactly where I left them.' },
                        { speaker: 'Diary Page', text: '"I think I\'m very good at being okay. Like, it\'s almost impressive kung gano kaya ko gawin. I just don\'t know what I do with all the not-okay..."' },
                        { speaker: 'Diary Page', text: '"The dress arrived. It\'s so beautiful. The debut is close na. I keep thinking — after this, things will feel different. They have to. Right?"' },
                        { speaker: 'Gaya (quiet)', text: 'She always knows what\'s missing.' }
                    ], () => {
                        // Level 2 complete → Interlude
                        Gameplay.stop();
                        setTimeout(() => {
                            fadeOverlay.classList.add('active');
                            setTimeout(() => {
                                currentScreen = 'interlude';
                                fadeOverlay.classList.remove('active');
                                startInterlude();
                            }, 1200);
                        }, 800);
                    });
                } break;
        }
    }

    function checkDressComplete() {
        if (l2State.flawsFixed === 5) {
            const hs = Gameplay.getHotspots();
            const mirror = hs.find(h => h.id === 'full_mirror');
            const shoes = hs.find(h => h.id === 'shoes_empty');
            if (mirror) mirror.active = true;
            if (shoes) shoes.active = true;
            setTimeout(() => {
                showNarration([
                    { speaker: 'Mother (from the doorway)', text: '"Ligaya."' },
                    { speaker: 'Gaya (delighted)', text: 'Mommy! Yes, I fixed the hem already — look, it falls perfectly now. The lace at the neckline too, it looks perfect—' },
                    { speaker: 'Gaya (quieter)', text: 'She always loved this dress. She was right about the embroidery.' }
                ]);
            }, 1500);
        }
    }

    /* ============================================
       INTERLUDE: THE DIARY READING
       ============================================ */
    function startInterlude() {
        showNarration([
            { speaker: 'Mother (reading)', text: '"Ang pagod ko. I don\'t even know why. I didn\'t really do anything today, I mostly just sat. But I feel like I ran somewhere. That\'s been happening a lot..."' },
            { speaker: 'Gaya (turning sharply)', text: 'Mommy? Are you — are you reading my — Mommy. I\'m here. I\'m right here.' },
            { speaker: 'Mother (reading)', text: '"I think I\'m very good at being okay. Like, it\'s almost impressive kung gano kaya ko gawin. I just don\'t know what I do with all the not-okay."' },
            { speaker: 'Gaya (urgent)', text: 'I was okay, Mommy. I am okay. I\'m literally standing right here — Mommy, look at me. I\'m right here. Look at me.' },
            { speaker: 'Mother (reading, flatter)', text: '"I hope the heaviness goes away after this. I really think it will. They have to. Right?"' },
            { speaker: 'Gaya (breathless)', text: 'It did, Mommy. It\'s — I\'m here, I\'m helping you, the flowers are done and the dress is ready — it got better, I promise, I\'m fine—' },
            { speaker: '...', text: 'The mother turns to the final page. April 22. 6:14am. One unfinished sentence: "I just wanted to tell someone that I —"' },
            { speaker: '...', text: 'Her hand covers the blank space after it. A long beat.' },
            { speaker: 'Mother (quiet, plain)', text: '"Ligaya."' },
            { speaker: 'Gaya (running)', text: 'Yes. Yes, Mommy — that\'s me. I\'m Gaya, I\'m here, I\'ve been here the whole time. I\'ve been here—' },
            { speaker: 'Gaya', text: 'Why can\'t you hear me?' },
            { speaker: '...', text: 'The mother closes the diary. She holds it against her chest. The room is very quiet.' }
        ], () => {
            // After interlude → Level 3
            fadeOverlay.classList.add('active');
            setTimeout(() => {
                currentScreen = 'level3';
                fadeOverlay.classList.remove('active');
                startLevel3();
            }, 1500);
        });
    }

    /* ============================================
       LEVEL 3: THE CANDLES
       ============================================ */
    const l3State = { hasPage: false, hasNote: false, candlesLit: 0, candleOrder: ['candle_4','candle_3','candle_5','candle_2','candle_6','candle_1','candle_7'] };

    function startLevel3() {
        showNarration([
            { speaker: 'Gaya (internal)', text: 'The sala looks different now. Evening light. The flowers are all in place. The candles are waiting.' },
            { speaker: 'Gaya (internal)', text: 'Seven candles. I chose seven because I kept looking at the number and it felt like enough. Like seven was the exact number of things I\'m still hoping for.' }
        ], () => {
            Gameplay.switchMap('sala_evening', handleLevel3Interact);
        });
    }

    const CANDLE_WISHES = {
        candle_4: { speaker: 'Gaya (wish 1)', text: '"I hope the guests will like the flowers."' },
        candle_3: { speaker: 'Gaya (wish 2)', text: '"I hope I don\'t cry when I dance."' },
        candle_5: { speaker: 'Gaya (wish 3)', text: '"I hope Tita Cora comes. She always makes things lighter."' },
        candle_2: { speaker: 'Gaya (wish 4)', text: '"I hope the heaviness goes away after this. I really think it will."' },
        candle_6: { speaker: 'Gaya (wish 5)', text: '"I hope Mommy knows how much I love her."' },
        candle_1: { speaker: 'Gaya (wish 6)', text: '"I hope this is the beginning of something."' },
    };

    const CANDLE_MOTHER = {
        candle_4: { speaker: '...', text: 'The mother kneels at the altar. Her lips begin to move in prayer.' },
        candle_3: { speaker: '...', text: 'The mother\'s lips keep moving. The prayer is continuing.' },
        candle_5: { speaker: '...', text: 'The mother takes a small photograph from her pocket. She holds it in both hands.' },
        candle_2: { speaker: '...', text: 'The mother sets the photograph face-down on the altar.' },
        candle_6: [
            { speaker: '...', text: 'The mother stops praying. She turns and looks directly at the space Gaya occupies. One full breath.' },
            { speaker: 'Mother (quiet)', text: '"Ligaya."' },
            { speaker: 'Gaya', text: 'Mommy?' },
            { speaker: '...', text: 'The mother looks away. She picks up the photograph and keeps going.' }
        ],
        candle_1: { speaker: '...', text: 'The mother puts her face in her hands. Three seconds. Then she straightens. She keeps going.' },
    };

    function handleLevel3Interact(hotspot) {
        if (isNarrating) return;
        const hs = Gameplay.getHotspots();

        switch (hotspot.id) {
            case 'candle_page':
                l3State.hasPage = true; hotspot.completed = true;
                showNarration([
                    { speaker: 'Torn Page', text: '"Seven candles. I chose seven because I kept looking at the number and it felt like enough. I want to light them myself. I want to be the one who lights them."' },
                    { speaker: 'Gaya', text: 'I want to be the one.' }
                ]); break;

            case 'mother_note':
                l3State.hasNote = true; hotspot.completed = true;
                // Enable center candle (first in order)
                const center = hs.find(h => h.id === 'candle_4');
                if (center) center.active = true;
                showNarration([
                    { speaker: 'Handwritten Note', text: '"Isa-isa, mula sa puso." One by one, from the heart.' },
                    { speaker: 'Gaya (internal)', text: 'Center first. Then outward.' }
                ]); break;

            // Candles 1-6 (with wishes)
            case 'candle_4': case 'candle_3': case 'candle_5': case 'candle_2': case 'candle_6': case 'candle_1':
                if (!l3State.hasNote) {
                    showNarration([{ speaker: 'Gaya', text: 'I need to figure out the order first...' }]);
                    return;
                }
                // Check correct order
                if (hotspot.id !== l3State.candleOrder[l3State.candlesLit]) {
                    showNarration([{ speaker: 'Gaya', text: 'Not this one yet. From the heart outward.' }]);
                    return;
                }
                hotspot.completed = true;
                l3State.candlesLit++;
                // Build narration: wish + mother's beat
                const lines = [CANDLE_WISHES[hotspot.id]];
                const mb = CANDLE_MOTHER[hotspot.id];
                if (Array.isArray(mb)) lines.push(...mb);
                else if (mb) lines.push(mb);

                showNarration(lines, () => {
                    // Unlock next candle
                    if (l3State.candlesLit < l3State.candleOrder.length) {
                        const next = hs.find(h => h.id === l3State.candleOrder[l3State.candlesLit]);
                        if (next) next.active = true;
                    }
                });
                break;

            // 7th candle — the climax
            case 'candle_7':
                if (l3State.candlesLit < 6) {
                    showNarration([{ speaker: 'Gaya', text: 'Not yet. The others first.' }]);
                    return;
                }
                hotspot.completed = true;
                // Enable diary page under this candle
                const diary = hs.find(h => h.id === 'candle_diary');
                if (diary) diary.active = true;
                showNarration([
                    { speaker: 'Gaya', text: 'The last one. Here.' },
                    { speaker: 'Gaya (internal)', text: 'There\'s something under it.' }
                ]); break;

            // Diary Entry 3 + the hand passes through
            case 'candle_diary':
                hotspot.completed = true;
                showNarration([
                    { speaker: 'Gaya', text: 'Oh — one more. How many did I hide? [small laugh] I forget sometimes, that I do this.' },
                    { speaker: 'Diary Page', text: '"Six days na lang. Everything\'s almost ready. I keep thinking it\'ll be better after the debut. After the debut I\'ll feel like a new person..."' },
                    { speaker: 'Diary Page', text: '"April 22 · 6:14am — I just wanted to tell someone that I —"' },
                    { speaker: '...', text: 'The mother makes a small sound across the room. Gaya looks up immediately.' },
                    { speaker: 'Gaya', text: 'Mommy?' },
                    { speaker: '...', text: 'She reaches out to put her hand on her mother\'s shoulder.' },
                    { speaker: '...', text: 'Her hand passes through.' },
                    { speaker: '...', text: 'No sound. No effect. Just: nothing where there should be something.' },
                    { speaker: 'Gaya (very quiet)', text: 'Oh.' }
                ], () => {
                    // All levels complete → Ending
                    Gameplay.stop();
                    setTimeout(() => {
                        fadeOverlay.classList.add('active');
                        setTimeout(() => {
                            currentScreen = 'ending';
                            fadeOverlay.classList.remove('active');
                            startEnding();
                        }, 2000);
                    }, 1500);
                }); break;
        }
    }

    /* ============================================
       THE ENDING
       ============================================ */
    function startEnding() {
        showNarration([
            { speaker: '...', text: 'The camera pulls back slowly. For the first time, the full banner is visible.' },
            { speaker: '...', text: 'LIGAYA Maria Reyes — the "LI" in yellow, hand-done, the mother\'s handwriting.' },
            { speaker: '...', text: 'Ika-18 Kaarawan · Abril 25, 2026' },
            { speaker: '...', text: 'And below the date, four words: "Hanggang sa muli, anak."' },
            { speaker: 'Gaya', text: 'Ligaya.' },
            { speaker: 'Gaya', text: 'I forgot. I actually forgot that was my name.' },
            { speaker: 'Gaya (soft)', text: 'Hanggang sa muli.' },
            { speaker: 'Gaya', text: 'I did all of this, Mommy. I did all of it. It looks so beautiful.' },
            { speaker: 'Gaya', text: 'PASINAYA.' },
            { speaker: '...', text: 'The candles burn. Fade to black on the sala. On the lit flowers. On the banner. The last thing visible is the "LI" — yellow against the dark.' }
        ], () => {
            // Post-credits
            fadeOverlay.classList.add('active');
            setTimeout(() => {
                showNarration([
                    { speaker: '', text: 'Kung ikaw ay nagdurusa, may taong gustong makinig.' },
                    { speaker: '', text: 'If you are suffering, there is someone who wants to listen.' },
                    { speaker: '', text: 'In Touch Community Services: (02) 8893-7603 · NCMH Crisis Hotline: 1553 · Hopeline Philippines: (02) 804-4673' },
                    { speaker: '', text: 'Thank you for playing.' }
                ]);
            }, 3000);
        });
    }

    /* ============================================
       PETAL SYSTEM
       ============================================ */
    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        const x = Math.random() * 100;
        const duration = 7 + Math.random() * 6;
        const delay = Math.random() * 0.5;
        const scale = 0.6 + Math.random() * 0.8;
        const opacity = 0.35 + Math.random() * 0.3;
        petal.style.setProperty('--fall-x', x + '%');
        petal.style.setProperty('--fall-duration', duration + 's');
        petal.style.setProperty('--fall-delay', delay + 's');
        petal.style.setProperty('--petal-scale', scale);
        petal.style.setProperty('--petal-opacity', opacity);
        petalsContainer.appendChild(petal);
    }

    function startPetals() {
        for (let i = 0; i < 12; i++) {
            setTimeout(() => createPetal(), i * 600);
        }
        setInterval(() => {
            if (petalsContainer.children.length < 15) {
                createPetal();
            }
        }, 2000);
    }

    /* ============================================
       CLICK / INPUT HANDLERS
       ============================================ */
    // Warning screen → Title
    screens.warning.addEventListener('click', () => {
        if (currentScreen === 'warning') {
            screens.warning.classList.remove('active');
            currentScreen = 'title';
            setTimeout(() => {
                screens.title.classList.add('active');
                startPetals();
            }, 1200);
        }
    });

    // Title → Opening (via fade)
    screens.title.addEventListener('click', () => {
        if (currentScreen === 'title') {
            goToScene('opening', 1500);
        }
    });

    // Narration: click to advance
    narrationBox.addEventListener('click', (e) => {
        e.stopPropagation();
        advanceNarration();
    });

    // Keyboard: Space / Enter to advance
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.key === 'Enter') {
            e.preventDefault();
            if (currentScreen === 'warning') {
                screens.warning.click();
            } else if (currentScreen === 'title') {
                screens.title.click();
            } else if (isNarrating) {
                advanceNarration();
            }
        }
    });

})();
