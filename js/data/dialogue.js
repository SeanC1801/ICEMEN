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

    livingroom: {
        opening: [
            { speaker: 'GAYA', text: 'That torn note from before... three black vases with symbols on them.' },
            { speaker: 'GAYA', text: 'One dancing... one hugging... and one looking up to the sky.' },
            { speaker: 'GAYA', text: 'Mom used to arrange flowers there all the time...' },
            { speaker: 'GAYA', text: 'I should find the basket with her favorite flowers first.' }
        ],
        basket_found: [
            { speaker: 'GAYA', text: 'Sampaguita... roses... lilies...' },
            { speaker: 'GAYA', text: 'Mom always paired these with those strange vases.' },
            { speaker: 'GAYA', text: 'Maybe the symbols will tell me where they belong.' },
            { speaker: 'GAYA', text: 'I need to find the three black vases.' }
        ],
        vase_1: [{ speaker: 'GAYA', text: '1 vase found out of 3.' }],
        vase_2: [{ speaker: 'GAYA', text: '2 vases found out of 3.' }],
        vase_3: [{ speaker: 'GAYA', text: 'All 3 vases found.' }],
        vases_on_table: [
            { speaker: '...', text: 'The three black vases are now neatly arranged on the wooden table.' },
            { speaker: '...', text: 'The room becomes quieter. Sunlight lands directly on the ceramic surfaces.' }
        ],
        /* Wrong placements */
        wrong_sampaguita: [
            { speaker: 'GAYA', text: "No... that doesn't feel right." },
            { speaker: 'GAYA', text: 'Mom gave me sampaguita when we danced together during my sixteenth birthday...' },
            { speaker: 'GAYA', text: 'She said even small things could fill a whole room with happiness.' }
        ],
        wrong_roses: [
            { speaker: 'GAYA', text: "Roses... weren't about romance to her." },
            { speaker: 'GAYA', text: 'Mom used to hold me so tightly whenever I cried...' },
            { speaker: 'GAYA', text: 'Like she was trying to protect every broken part of me.' }
        ],
        wrong_lilies: [
            { speaker: 'GAYA', text: 'Lilies always reminded her to look up.' },
            { speaker: 'GAYA', text: "Whenever life felt heavy, she'd tell me the sky was proof that things could still open beautifully." }
        ],
        /* Correct placements */
        correct_sampaguita: [
            { speaker: 'GAYA', text: 'Mom and I danced barefoot in the living room that night...' },
            { speaker: 'GAYA', text: 'She tucked sampaguita behind my ear and laughed when I stepped on her foot.' },
            { speaker: 'GAYA', text: "I haven't heard that laugh in so long..." }
        ],
        correct_roses: [
            { speaker: 'GAYA', text: 'Whenever I was scared, Mom would pull me into her arms before I even asked.' },
            { speaker: 'GAYA', text: 'She smelled like roses and laundry soap...' },
            { speaker: 'GAYA', text: 'Back then, I thought her hugs could stop the whole world from hurting me.' }
        ],
        correct_lilies: [
            { speaker: 'GAYA', text: 'Mom used to point at the sky after the rain...' },
            { speaker: 'GAYA', text: "She said joy wasn't something you waited for." },
            { speaker: 'GAYA', text: 'You searched for it... even in the smallest light.' },
            { speaker: 'GAYA', text: 'Ligaya...' },
            { speaker: 'GAYA', text: "Maybe that's what she wanted me to remember." }
        ],
        /* Completion */
        completion: [
            { speaker: '...', text: 'The camera slowly zooms out from the glowing vases.' },
            { speaker: '...', text: 'The room feels warmer now — alive again.' },
            { speaker: '...', text: 'A loose piece of torn paper slightly sticks out from the flower basket.' }
        ],
        final_dialogue: [
            { speaker: 'GAYA', text: "There's something inside the basket..." },
            { speaker: 'GAYA', text: 'A note?' }
        ],
        /* Diary Entry 1 */
        diary_entry: [
            { speaker: 'Diary Entry — March 3', text: 'I asked Mommy what her favorite flower was...' },
            { speaker: 'Diary Entry — March 3', text: "She said sampaguita because it's small, but you can smell it from across the room." },
            { speaker: 'GAYA', text: 'I want to mean more than I look.' }
        ]
    },

    level2: {
        /* Bedroom 015 — Opening */
        opening: [
            { speaker: 'Gaya', text: 'My debut dress.' },
            { speaker: 'Gaya', text: 'I wonder if I should put it on.' }
        ],
        /* Bedroom 016 — After changing into the dress */
        after_changing: [
            { speaker: 'Gaya', text: 'It still fits perfectly.' },
            { speaker: 'Gaya', text: 'But looking at it like this... something feels off.' },
            { speaker: 'Gaya', text: 'I should check the mirror.' }
        ],
        /* Bedroom 018 — Memory at the mirror */
        memory: [
            { speaker: 'Gaya', text: 'That drawing... the one I made of how I wanted to look on my debut.' },
            { speaker: 'Gaya', text: 'I remember exactly how I pictured myself.' },
            { speaker: 'Gaya', text: 'I need to fix this.' }
        ],
        /* Spot the differences — Hair */
        diff_hair: [
            { speaker: 'Gaya', text: 'The hair... in the drawing, it\u2019s tied up differently.' },
            { speaker: 'Gaya', text: 'I wanted it pulled back like that. Let me fix it.' }
        ],
        /* Spot the differences — Pin */
        diff_pin: [
            { speaker: 'Gaya', text: 'The pin on the dress \u2014 I drew it right there, on the chest.' },
            { speaker: 'Gaya', text: 'How did I forget to put it on?' }
        ],
        /* Bedroom 020 — Completion */
        completion: [
            { speaker: 'Gaya', text: 'That\u2019s better. Now... I just need to put on my shoes.' }
        ],
        /* Bedroom 021 — Note discovery */
        note_discovery: [
            { speaker: 'Gaya', text: 'Wait...' },
            { speaker: 'Gaya', text: 'What is this piece of paper doing here?' }
        ],
        /* Diary Entry 2 */
        diary_entry_2: [
            { speaker: 'Diary Entry \u2014 October 14', text: '...Mommy walked into the room...' },
            { speaker: 'Diary Entry \u2014 October 14', text: 'She looked at me for a second and said \u2014 why do you look like you\u2019re apologizing?' },
            { speaker: 'Gaya', text: '...What would it feel like to just look like myself and not want to apologize for it?' }
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
