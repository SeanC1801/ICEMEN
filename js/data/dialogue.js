/* ============================================
   GAYA — Dialogue & Narration Text
   All story content in one place for easy editing.
   ============================================ */
window.GAYA = window.GAYA || {};

GAYA.Dialogue = {
    opening: [
        /* Slide 1: Bedroom 001 — no dialog (cinematic pause, handled in opening.js) */
        /* Slide 2: Bedroom 002 — yawning */
        { speaker: 'Gaya', text: "Mommy's already here somewhere. I can hear her moving around. She's been doing so much \u2014 I keep telling her I can handle it, but you know how she is. She can't just sit." },
        /* Slide 3: Bedroom 003 — sitting up */
        { speaker: 'Gaya', text: "Okay. Okay. Flowers first, then the dress, then the candles. That's the order. I wrote it down somewhere \u2014 actually, I think I put the list in the flower planner. Doesn't matter. I know the order. Flowers, dress, candles. I know it." },
        /* Slide 4: Bedroom 004 — lit room */
        { speaker: 'Gaya', text: 'Okay. Flowers first.' }
    ],

    level1: {
        torn_page: [
            { speaker: 'Torn Page', text: "\u201CFinally decided. Sampaguita, white roses, white lilies. I want the sala to feel like something important is about to happen... I've seen this before. At Lola's. At Tito Ben's.\u201D" },
            { speaker: 'Gaya', text: "I know what I want. I just have to remember where I've seen it." }
        ],
        photograph: [
            { speaker: 'Gaya', text: "Lola's family gathering. The sala was so full that day." },
            { speaker: 'Gaya', text: "Look at the flowers. Sampaguita at the entrance. Roses at the center. Lilies on the sides. Six arrangements total. That's what I want." }
        ],
        flower_entrance: [{ speaker: 'Gaya', text: 'Sampaguita for the entrance. Clean and simple. I wanted people to feel it the moment they walk in \u2014 like a welcome.' }],
        flower_center:   [{ speaker: 'Gaya', text: 'Roses for the center table. The focal point. Everything draws the eye here.' }],
        flower_sides:    [{ speaker: 'Gaya', text: "Lilies on both sides. For balance. I like how they stand tall. Like something you'd see at something that matters." }],
        no_reference:    [{ speaker: 'Gaya', text: 'I should figure out where these go first. I had a reference somewhere...' }],
        flowers_done: [
            { speaker: 'Gaya', text: "I knew Mommy would love it. She always acts like I'm overdoing things and then when she actually sees it \u2014 I knew." },
            { speaker: 'Gaya', text: "(There's a subtle rattling sound coming from the center vase...)" }
        ],
        vase_diary: [
            { speaker: 'Diary Page', text: "\u201C...Ang pagod ko. I don't even know why... yung pagod na walang dahilan. I'll sleep early tonight, siguro that's it.\u201D" },
            { speaker: 'Gaya', text: "Oh \u2014 I must have put this here for safekeeping. My flower notes, probably. Smart actually." }
        ]
    },

    level2: {
        intro: [
            { speaker: 'Gaya', text: "The dress is here. I tried to just look at it for a minute without touching it. I couldn't. The embroidery at the neckline is exactly what Mommy described." },
            { speaker: 'Gaya', text: "I want to wear it perfectly. I want every part of it to be exactly right. Not for the photographs \u2014 for me." }
        ],
        fitting_mirror: [
            { speaker: 'Gaya', text: 'A fitting mirror. For checking hems at floor level.' },
            { speaker: 'Gaya', text: "Wait \u2014 looking through it, the hem dips slightly on the left side. I wouldn't have seen that from standing." }
        ],
        magazine: [
            { speaker: 'Gaya', text: 'A debut spread. The debutante in the picture has her sleeves folded back one clean turn.' },
            { speaker: 'Gaya', text: "That's it. That's how the sleeves should look." }
        ],
        dress_fabric: [
            { speaker: 'Gaya', text: "There \u2014 a ripple running against the grain of the fabric. Small, but I can see it." },
            { speaker: 'Gaya', text: 'Smooth it out. Perfect.' }
        ],
        dress_collar: [
            { speaker: 'Gaya', text: 'Two buttons fastened. One unfastened \u2014 the second from the bottom.' },
            { speaker: 'Gaya', text: 'Got it. All three now.' }
        ],
        dress_hem:     [{ speaker: 'Gaya', text: 'The hem dips on the left. I only saw it through the fitting mirror. Fixed.' }],
        dress_sleeves: [{ speaker: 'Gaya', text: 'Fold the sleeves back one clean turn. Like the magazine. There.' }],
        dress_lace: [
            { speaker: 'Gaya', text: 'The neckline lace is bunched slightly at the right side. Almost right. Almost is not what I wrote.' },
            { speaker: 'Gaya', text: "There. Now it's right." }
        ],
        mirror_1: [{ speaker: 'Gaya', text: "Beautiful. I'll wear it and I'll feel like \u2014 the version of myself that I was supposed to be." }],
        mirror_2: [
            { speaker: 'Gaya', text: 'The reflection moved... a half-second after I did.' },
            { speaker: 'Gaya', text: 'Must be the light.' }
        ],
        mirror_3: [
            { speaker: '...', text: 'For two seconds, the reflection is empty. The dress is on the bed. The room is as it is. In the doorway, the mother stands watching.' },
            { speaker: 'Gaya', text: "I'm tired, that's all. I've been tired for \u2014 it's fine. It'll be fine after. Everything will be fine after." }
        ],
        shoes_empty: [{ speaker: 'Gaya', text: 'Shoes later, I think. The dress first.' }],
        dress_pocket: [
            { speaker: 'Gaya', text: "Oh, I put this here? Smart naman. I always forget where I leave things and then they're exactly where I left them." },
            { speaker: 'Diary Page', text: "\u201CI think I'm very good at being okay. Like, it's almost impressive kung gano kaya ko gawin. I just don't know what I do with all the not-okay...\u201D" },
            { speaker: 'Diary Page', text: "\u201CThe dress arrived. It's so beautiful. The debut is close na. I keep thinking \u2014 after this, things will feel different. They have to. Right?\u201D" },
            { speaker: 'Gaya (quiet)', text: "She always knows what's missing." }
        ],
        dress_complete: [
            { speaker: 'Mother (from the doorway)', text: '\u201CLigaya.\u201D' },
            { speaker: 'Gaya (delighted)', text: "Mommy! Yes, I fixed the hem already \u2014 look, it falls perfectly now. The lace at the neckline too, it looks perfect\u2014" },
            { speaker: 'Gaya (quieter)', text: 'She always loved this dress. She was right about the embroidery.' }
        ]
    },

    interlude: [
        { speaker: 'Mother (reading)', text: "\u201CAng pagod ko. I don't even know why. I didn't really do anything today, I mostly just sat. But I feel like I ran somewhere. That's been happening a lot...\u201D" },
        { speaker: 'Gaya (turning sharply)', text: "Mommy? Are you \u2014 are you reading my \u2014 Mommy. I'm here. I'm right here." },
        { speaker: 'Mother (reading)', text: "\u201CI think I'm very good at being okay. Like, it's almost impressive kung gano kaya ko gawin. I just don't know what I do with all the not-okay.\u201D" },
        { speaker: 'Gaya (urgent)', text: "I was okay, Mommy. I am okay. I'm literally standing right here \u2014 Mommy, look at me. I'm right here. Look at me." },
        { speaker: 'Mother (reading, flatter)', text: "\u201CI hope the heaviness goes away after this. I really think it will. They have to. Right?\u201D" },
        { speaker: 'Gaya (breathless)', text: "It did, Mommy. It's \u2014 I'm here, I'm helping you, the flowers are done and the dress is ready \u2014 it got better, I promise, I'm fine\u2014" },
        { speaker: '...', text: "The mother turns to the final page. April 22. 6:14am. One unfinished sentence: \u201CI just wanted to tell someone that I \u2014\u201D" },
        { speaker: '...', text: 'Her hand covers the blank space after it. A long beat.' },
        { speaker: 'Mother (quiet, plain)', text: '\u201CLigaya.\u201D' },
        { speaker: 'Gaya (running)', text: "Yes. Yes, Mommy \u2014 that's me. I'm Gaya, I'm here, I've been here the whole time. I've been here\u2014" },
        { speaker: 'Gaya', text: "Why can't you hear me?" },
        { speaker: '...', text: 'The mother closes the diary. She holds it against her chest. The room is very quiet.' }
    ],

    level3: {
        intro: [
            { speaker: 'Gaya', text: 'The sala looks different now. Evening light. The flowers are all in place. The candles are waiting.' },
            { speaker: 'Gaya', text: "Seven candles. I chose seven because I kept looking at the number and it felt like enough. Like seven was the exact number of things I'm still hoping for." }
        ],
        candle_page: [
            { speaker: 'Torn Page', text: "\u201CSeven candles. I chose seven because I kept looking at the number and it felt like enough. I want to light them myself. I want to be the one who lights them.\u201D" },
            { speaker: 'Gaya', text: 'I want to be the one.' }
        ],
        mother_note: [
            { speaker: 'Handwritten Note', text: '\u201CIsa-isa, mula sa puso.\u201D One by one, from the heart.' },
            { speaker: 'Gaya', text: 'Center first. Then outward.' }
        ],
        no_order:      [{ speaker: 'Gaya', text: 'I need to figure out the order first...' }],
        wrong_candle:  [{ speaker: 'Gaya', text: 'Not this one yet. From the heart outward.' }],
        candle_7_early:[{ speaker: 'Gaya', text: 'Not yet. The others first.' }],
        candle_7: [
            { speaker: 'Gaya', text: 'The last one. Here.' },
            { speaker: 'Gaya', text: "There's something under it." }
        ],
        candle_diary: [
            { speaker: 'Gaya', text: "Oh \u2014 one more. How many did I hide? [small laugh] I forget sometimes, that I do this." },
            { speaker: 'Diary Page', text: "\u201CSix days na lang. Everything's almost ready. I keep thinking it'll be better after the debut. After the debut I'll feel like a new person...\u201D" },
            { speaker: 'Diary Page', text: "\u201CApril 22 \u00B7 6:14am \u2014 I just wanted to tell someone that I \u2014\u201D" },
            { speaker: '...', text: 'The mother makes a small sound across the room. Gaya looks up immediately.' },
            { speaker: 'Gaya', text: 'Mommy?' },
            { speaker: '...', text: "She reaches out to put her hand on her mother's shoulder." },
            { speaker: '...', text: 'Her hand passes through.' },
            { speaker: '...', text: 'No sound. No effect. Just: nothing where there should be something.' },
            { speaker: 'Gaya (very quiet)', text: 'Oh.' }
        ],
        wishes: {
            candle_4: { speaker: 'Gaya (wish 1)', text: '\u201CI hope the guests will like the flowers.\u201D' },
            candle_3: { speaker: 'Gaya (wish 2)', text: "\u201CI hope I don't cry when I dance.\u201D" },
            candle_5: { speaker: 'Gaya (wish 3)', text: '\u201CI hope Tita Cora comes. She always makes things lighter.\u201D' },
            candle_2: { speaker: 'Gaya (wish 4)', text: '\u201CI hope the heaviness goes away after this. I really think it will.\u201D' },
            candle_6: { speaker: 'Gaya (wish 5)', text: '\u201CI hope Mommy knows how much I love her.\u201D' },
            candle_1: { speaker: 'Gaya (wish 6)', text: '\u201CI hope this is the beginning of something.\u201D' }
        },
        mother_beats: {
            candle_4: { speaker: '...', text: 'The mother kneels at the altar. Her lips begin to move in prayer.' },
            candle_3: { speaker: '...', text: "The mother's lips keep moving. The prayer is continuing." },
            candle_5: { speaker: '...', text: 'The mother takes a small photograph from her pocket. She holds it in both hands.' },
            candle_2: { speaker: '...', text: 'The mother sets the photograph face-down on the altar.' },
            candle_6: [
                { speaker: '...', text: 'The mother stops praying. She turns and looks directly at the space Gaya occupies. One full breath.' },
                { speaker: 'Mother (quiet)', text: '\u201CLigaya.\u201D' },
                { speaker: 'Gaya', text: 'Mommy?' },
                { speaker: '...', text: 'The mother looks away. She picks up the photograph and keeps going.' }
            ],
            candle_1: { speaker: '...', text: 'The mother puts her face in her hands. Three seconds. Then she straightens. She keeps going.' }
        }
    },

    ending: [
        { speaker: '...', text: 'The camera pulls back slowly. For the first time, the full banner is visible.' },
        { speaker: '...', text: "LIGAYA Maria Reyes \u2014 the \u201CLI\u201D in yellow, hand-done, the mother's handwriting." },
        { speaker: '...', text: 'Ika-18 Kaarawan \u00B7 Abril 25, 2026' },
        { speaker: '...', text: 'And below the date, four words: \u201CHanggang sa muli, anak.\u201D' },
        { speaker: 'Gaya', text: 'Ligaya.' },
        { speaker: 'Gaya', text: 'I forgot. I actually forgot that was my name.' },
        { speaker: 'Gaya (soft)', text: 'Hanggang sa muli.' },
        { speaker: 'Gaya', text: 'I did all of this, Mommy. I did all of it. It looks so beautiful.' },
        { speaker: 'Gaya', text: 'PASINAYA.' },
        { speaker: '...', text: "The candles burn. Fade to black on the sala. On the lit flowers. On the banner. The last thing visible is the \u201CLI\u201D \u2014 yellow against the dark." }
    ],

    postCredits: [
        { speaker: '', text: 'Kung ikaw ay nagdurusa, may taong gustong makinig.' },
        { speaker: '', text: 'If you are suffering, there is someone who wants to listen.' },
        { speaker: '', text: 'In Touch Community Services: (02) 8893-7603 \u00B7 NCMH Crisis Hotline: 1553 \u00B7 Hopeline Philippines: (02) 804-4673' },
        { speaker: '', text: 'Thank you for playing.' }
    ]
};
