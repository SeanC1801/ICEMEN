# GAYA

*Full Game Design Document · v2.0*

> "Coming Of Age"

`Filipino` `Narrative Puzzle` `Mental Health` `Unreliable Player-Perspective` `Single-session`

### Table of Contents

1. [Game Overview & Premise](#overview)
2. [Core Themes](#themes)
3. [Characters](#characters)
4. [The Name Arc — "Gaya" to "LIGAYA"](#name-arc)
   * [The Banner: Before & After](#banner)
5. [Full Game Flow](#flow)
   * [Opening](#opening)
   * [Level 1 — The Flowers](#level1)
   * [Level 2 — The Dress](#level2)
   * [Interlude — The Diary Reading](#interlude)
   * [Level 3 — The Candles](#level3)
   * [The Ending](#ending)
6. [Diary Pages — Design & Placement Logic](#diary-design)
7. [Core Game Loop](#puzzle-overview)
8. [The Candle Wish Mechanic (Full)](#candles-mechanic)
9. [Gaya's Voice — Writing Guide](#gaya-voice)
10. [Full Dialogue Scripts by Level](#full-dialogue)
11. [Implementation Notes](#notes)


**001 — Overview**

## Game Overview & Premise

**PASINAYA** ("I Did Not Know") is a single-session Filipino narrative puzzle game. The player controls Ligaya "Gaya" Maria Reyes — an 18-year-old preparing for her debut — as she arranges flowers, prepares her dress, and lights the candles for the celebration. She is warm, excited, a little tired. Everything feels almost ready.

The player does not know, at first, that Gaya is dead. They understand it the way depression moves through a family — slowly, between the lines, in the things no one says aloud. By the end, they understand that they have been helping a ghost prepare a debut that never happened, alongside a mother who is preparing a wake.

The game's core mechanic is perspective: **the player sees what Gaya sees, but understands what Gaya cannot.** The puzzles are dual-reality — every action Gaya reads as celebration, the informed player reads as grief ritual. The game never lies. It simply shows everything through one set of eyes that cannot see itself clearly.

The title is what the mother would say — and what Gaya would say about herself. The same three words, the same weight, two completely different kinds of not knowing. *PASINAYA* — I did not know my daughter was drowning. I did not know I was the one who needed help.

#### Platform & Format


**Genre** — Narrative Puzzle / Walking Sim

Slow, point-and-click interaction. No fail states. No time pressure. The player cannot lose.


**Session Length** — 45–75 minutes

Designed as a single uninterrupted session. Three levels + interlude + ending.


**Perspective** — First-person narration

Gaya narrates everything. The player hears her internal voice, her humming, her interpretations. Gaya's voice is the unreliable instrument.


**Language** — Filipino / Taglish

Dialogue and internal narration in natural Taglish. All puzzle labels and UI in English for accessibility.


**002 — Themes**

## Core Themes

Theme 01

The Invisible Illness

Depression in Filipino families is often unnamed, often hidden behind performance — eating the right amount, smiling at the right times, making breakfast before anyone wakes up. Gaya is an expert at appearing okay. The tragedy is not that no one cared. It is that her pain had learned to look like nothing.

Theme 02

Seeing as She Was

Gaya cannot perceive her own state. She experiences the wake as a debut. She sees her mother's grief as admiration. She reads her own diary entries as if they were written by someone who was fine. She literally cannot see herself clearly — and the illness made this true while she was still alive. Death has simply made it permanent. The ghost sees what she saw.

Theme 03

The Name We Give Ourselves

Gaya made herself smaller than she was. She dropped the first syllable of her own name — the part that means happiness, joy, peace, freedom. She lived as Gaya. A fragment. Her mother, in grief, refuses to leave her there. The yellow "LI" written onto the banner is the entire theme in one image: I will not let you stay incomplete.

Theme 04

The Silence Between Them

The only real conversation Gaya and her mother have in the game is one where Gaya's written words are read back to her and she answers them, and neither of them can reach the other. The diary reading scene is the heart of the game: they are separated not just by death but by the exact same silence that separated them while Gaya was alive.

Theme 05

The Debut That Became a Farewell

Gaya made all the decorations herself. The flowers she chose are a lamay arrangement — a traditional Filipino wake arrangement — but she chose them because she thought they were beautiful. The debut banner became the funeral banner. She made both without knowing. The preparation was real. The meaning was doubled all along.


**003 — Characters**

## Characters

### Ligaya "Gaya" Maria Reyes

Age 18. The player character. Youngest child, only daughter. Named *Ligaya* — happiness, joy, peace, freedom in Filipino — by parents who hoped the name would be a gift. She shortened it to Gaya without thinking much about it. A nickname became an identity.

She is warm, capable, funny in an understated way. She loves her mother. She is very good at being okay. She has lived with a heaviness she could not name for at least a year — *yung pagod na walang dahilan*, the tiredness without reason — and she kept waiting for something to make it lift. She believed the debut would. She died before it came.

She does not know she is dead. She is seeing things as she was — the last version of herself that knew how to move through the world. She is still preparing. She is still hoping.

**On her voice:** Gaya does not sound tragic. She sounds like a real teenager. She gets excited about the embroidery on her dress. She has opinions about flower arrangements. She worries about small things. Her heaviness bleeds through in the pauses, in the tiredness she keeps explaining away, in the way she keeps deferring happiness to *after* — after the debut, after this, then I'll feel better. Write her like someone who is trying very hard and almost succeeding.

### The Mother (Nanay / "Mommy")

She is never named. She is only "Mommy." She exists in the game as grief made physical: hands that go still when they should be moving, lips that form a name no one can hear, a body that keeps doing the work of preparation while the person inside is somewhere else entirely.

She found the diary. She found the pages Gaya had hidden in the flowers, the dress, the candles — Gaya's private habit of keeping her thoughts close to the things she loved. The mother did not tear those pages out. They were already separated from the diary, kept by Gaya herself in the places she cared about most. What the mother did was read them. And understand, too late, what she was reading.

She finishes the preparations her daughter started. She adds three words to the debut banner by hand. She reads the diary to an empty room, not knowing the room is not entirely empty.

**On her presence:** The mother never speaks directly to the player. She is witnessed. Her moments are visible to the player and invisible to Gaya. Her grief is not theatrical — it is quiet and continuing. Filipino grief: you keep going. You finish what needs to be finished. You say the name because if you stop saying it, something final happens.


**004 — The Name Arc**

## The Name Arc: "Gaya" to "LIGAYA"

The emotional architecture of the entire game is built around a name. Gaya shortened herself. Her mother restores her. The arc runs from the opening banner to the final pull-back — across every level, every candle, every time the mother says *Ligaya* to a room that cannot fully hear her.

Opening

"Gaya Maria Reyes"

The banner reads as Gaya wrote it — her nickname, not her name. She walks past it without looking. She knows what it says. She always knew. The player sees it clearly and stores it.

Level 1 — The Flowers

The mother's lips move: *Ligaya*

The mother moves through the sala during the flower arrangement. Her lips form the full name — visible to the player who watches carefully. Gaya hears a sound, turns, smiles: *"I know, 'di ba? It looks great."* She thinks her mother is admiring the flowers. The mother is saying her daughter's name.

Level 2 — The Dress

The mother speaks aloud: *"Ligaya."*

The mother stands at the bedroom doorway and says the name quietly. Gaya looks up from the dress, delighted — *"Mommy! Yes, I fixed the hem already, it looks perfect—"* The mother doesn't look at her. She walks to the dress and touches the fabric. She was not calling anyone. She was saying her daughter's name because she needed to say it.

Interlude — The Diary

The mother reads. Gaya answers. The name falls.

The mother reads the diary aloud. Gaya answers every line, believing her mother can finally hear her. At the end, the mother whispers *"Ligaya"* — not a call, just the name, the way you say something that is still too heavy to believe is past tense. Gaya runs toward the sound: *"Yes! That's me. I'm Gaya, I'm here, I've been here the whole time—"* The mother closes the diary and holds it to her chest.

Level 3, Candle 5

The closest they come

Gaya's fifth wish: *"I hope Mommy knows how much I love her."* At that exact moment, the mother turns from where she is praying and looks directly at the space Gaya occupies. One long breath. Then quietly, not a question: *"Ligaya."* Full. Whole. Gaya freezes. *"Mommy?"* The mother looks away and keeps going. She almost sensed her. She almost did.

Final Reveal

"LIGAYA" — the LI written by hand, in yellow

The camera pulls back from the banner for the first time. The player reads the full name: **LIGAYA** — the "LI" added in yellow by the mother's hand, returning to her daughter the part of herself she gave away. The debut date appears for the first time. Below it, four handwritten words. The banner Gaya made became the banner the mother finished.


**005 — The Banner**

## The Banner: Before & After

Opening — as Gaya made it

Gaya Maria Reyes

Ika-18 Kaarawan · Abril 25, 2026

[ bottom of banner out of frame ]

The player only ever sees the top portion clearly. The banner is cut off at the frame. Gaya walks past it without looking — she knows what it says.

Final Reveal — as her mother completed it

LIGAYA Maria Reyes

Ika-18 Kaarawan · Abril 25, 2026

Hanggang sa muli, anak.

The camera pulls back for the first time. The "LI" is in the mother's hand, in yellow — the same gold Gaya used. The debut date was always there. Gaya never needed to read it. The four words below are the only thing the mother added.

**On "Hanggang sa muli, anak":** "Until we meet again, child." This is what Filipinos say at funerals — not goodbye, but a promise. It goes on a birthday banner. It is a farewell on a celebration. It is the entire game in one image: the debut that became a wake, the birthday that became a burial, the daughter who prepared both without knowing.

**On the "LI" in yellow:** The mother did not reprint the banner. She took a marker — the same gold color Gaya used — and wrote the two letters by hand. *LI*: happiness, joy, peace, freedom. The part of her name Gaya could never fully claim for herself. The mother gives it back in the only way she has left. The yellow is different from the gold of the rest — softer, warmer, unmistakably hand-done. That difference matters. It must be visible.


**006 — Story Flow**

## Full Game Flow

The game moves in a single, linear sequence: Opening → Level 1 → Level 2 → Interlude → Level 3 → Ending. There are no branches, no alternate paths, no fail states. The player cannot go back. The game is a one-way door.


**006a — Opening**

## Opening Sequence

### Scene Setup

Fade in from black. A Filipino home, morning light. A sala being prepared for a celebration — or something else. The player does not yet know which. Flowers in buckets near the entrance. Fabric draped over furniture. Candles in boxes near the back room.

The banner hangs across the sala entrance, catching the light. The player can read the top portion clearly: **Gaya Maria Reyes / Ika-18 Kaarawan · Abril 25, 2026.** Below that, the frame cuts off. The banner is just outside full view. The player files it and moves on.

### Gaya's First Words (Internal Narration)

Gaya's voice — warm, a little breathless, excited. She sounds like someone about to begin something.

Gaya (internal)

Okay. Okay. Flowers first, then the dress, then the candles. That's the order. I wrote it down somewhere — actually, I think I put the list in the flower planner. Doesn't matter. I know the order. Flowers, dress, candles. I know it.

Gaya (internal)

Mommy's already here somewhere. I can hear her moving around. She's been doing so much — I keep telling her I can handle it, but you know how she is. She can't just sit.

Gaya (internal)

Okay. Flowers first.

✦

**Tone note:** The opening should feel genuinely warm. Gaya is not sad in the opening. She is preparing. She is in the last good version of herself she knew. The grief bleeds in at the edges — the tiredness she explains away, the mother she hears but doesn't see — but the opening beat must be hopeful. Otherwise the reveal has nothing to shatter.


**006b — Level 1**

## Level 1 — The Flowers

01

The Flowers

The sala · Flower arrangement · Discovery of Entry 1

### Setting

The sala of the Reyes home. Six positions for flower arrangements: two at the entrance, one centerpiece, two alcoves on the sides, one at the altar table in the back. Six positions — the standard arrangement for a **lamay** (Filipino wake), not a debut. Gaya does not know this. She found the arrangement at Lola's house and at Tito Ben's and never looked at it carefully because you don't, when you're young.

### The Torn Page

Gaya finds it half-slid under the entrance table. She unfolds it. It is not a diagram. It is a paragraph — Gaya writing about the flowers the way she wrote about everything: conversational, Taglish, full of small feelings.

Finally decided. Sampaguita, white roses, white lilies. I want the sala to feel like something important is about to happen the moment you walk in. I looked at so many arrangements online and then I realized — I've seen this before. At Lola's. At Tito Ben's. I just never looked at it carefully because you don't, when you're young. You just know that the flowers mean the day matters.

She sets the page down. She looks at the sala. *"I know what I want. I just have to remember where I've seen it."*

### Primary Puzzle — The Framed Photograph

On the wall of the sala — hung beside the entrance, where it has always been, where Gaya has walked past it her whole life — is a framed photograph. A family gathering. The player can interact with it and zoom in.

It is Lola's *lamay*. The sala in the photograph is this sala — the same room, years ago — arranged for a wake. Sampaguita at the entrance. Roses at the center table. Lilies at the sides. Six positions. The same positions that are now marked by small rings on the floor from old vase placements, visible if the player looks closely.

The photograph is the puzzle. The player reads the image, cross-references the rings on the floor, and places each arrangement. Gaya narrates each placement warmly — she thinks she is recreating a beautiful family memory. She is. She does not know what kind.

**The detail that rewards attention:** In the photograph, there is a woman sitting beside the center arrangement. Young. The player may not recognize her immediately. When the puzzle is complete and the mother enters — the player looks at the mother's face, looks back at the photograph, and understands: that is her. Younger. Sitting beside flowers she arranged for her own mother's wake. She knows this arrangement because she made it before. For grief. She knows exactly where everything goes.

The player selects each flower arrangement from the buckets and places it in the positions marked by the rings. Gaya narrates each placement as a debut decision. The player places what is, visually and culturally, a wake.

As Gaya places each arrangement, she narrates. These are her own words — she chose these flowers, she loves these flowers. Each line sounds like celebration. Each line is a funeral arrangement.

Gaya (narrating, placing sampaguita at entrance)

Sampaguita for the entrance. Malinis, 'di ba? Clean and simple. I wanted people to feel it the moment they walk in — like a welcome. Like the space knows something important is happening.

Gaya (placing roses at center table)

Roses for the center table. The focal point. Everything draws the eye here. Mommy said I was being extra about the centerpiece — but that's exactly the point. The centerpiece should be extra.

Gaya (placing lilies in alcoves)

Lilies on both sides. For balance. I like how they stand tall. They look — I don't know — significant. Like something you'd see at something that matters.

### The Mother's Beat — Mid-Puzzle

While Gaya is arranging the flowers, the mother moves through the back of the sala. Her hands, which were always busy, go completely still when she passes the centerpiece arrangement. She touches one sampaguita. Her lips move. The player, watching, can read: *Ligaya.*

The mother's lips move. Gaya sees her mother's expression and reads it as approval.

Gaya (warmly, misreading)

I knew she'd love it. She always acts like I'm overdoing things and then when she actually sees it — I knew. I knew she'd love it.

The mother does not look up. Her hand stays on the sampaguita a moment longer. She straightens, moves on.

### Discovery Puzzle — Diary Entry 1

When all six arrangements are placed and Gaya steps back to look at the completed sala, one vase produces a subtle rattle when she touches it. The interaction prompt appears. Gaya tilts it. A folded page falls out.

**Why the page is here:** Gaya had a habit — when she wrote something she wanted to keep close to her, she tucked the page near something she cared about. She was planning the debut, she was excited about the flowers, she folded the diary page and slid it into the vase for safekeeping. *She put it there herself.* Her mother, preparing the space after Gaya's death, found it when she moved the vase — and read it. She did not remove it. She returned it to the same vase. It is still there where Gaya left it. The player finds what the mother found.

Gaya picks up the folded page. She recognizes her own handwriting.

Gaya

Oh — I must have put this here for safekeeping. My flower notes, probably. Smart actually.

She glances at it briefly and sets it aside on the table. The player can see the full entry. Gaya cannot — or will not — read it carefully. The diary page rests on the table, visible, as Gaya steps back to admire the sala.

### The Mother Enters

She comes in holding the torn page from the entrance table. She walks to the photograph on the wall. She looks at it for a moment — at herself in it, young, at the flowers, at the sala that is both then and now. She touches the frame lightly.

She folds the page. She finds the centerpiece vase. She rolls it small and slides it in among the flowers.

She steps back. She looks at the sala — her mother's lamay arrangement, now her daughter's debut arrangement, now her daughter's lamay arrangement. Three times in one room. The same flowers. Different names on the banner.

She leaves without looking at the banner.


**006c — Level 2**

## Level 2 — The Dress

02

The Dress

The bedroom · Dress preparation · Mirror sequence · Discovery of Entry 2

### Setting

Gaya's bedroom. The debut dress lies on the bed — white, embroidered, a debutante's dress. Or a burial dress. The room is quiet. The mother is somewhere nearby.

### The Torn Page

Gaya finds it folded inside the dress box — the box the dress came in, still sitting in the corner of the bedroom. She pulls it out. It is not a step-by-step list. It is a letter Gaya started writing to herself — the kind you write when something arrives and you need to record the feeling before it passes.

The dress is here. I tried to just look at it for a minute without touching it. I couldn't. The embroidery at the neckline is exactly what Mommy described — I kept saying plain, plain, plain, and she kept saying you'll see, you'll see. I see now. I always think I know and then she's right.  
  
I want to wear it perfectly. I want every part of it to be exactly right. Not for the photographs — for me. For the moment I stand in it and it's actually happening.

She holds the page. She looks at the dress on the bed. *"I want every part of it to be exactly right."*

### Primary Puzzle — The Dress Tells You What It Needs

There is no checklist. No diagram. The dress itself is the puzzle — the player has to look at it the way Gaya would: carefully, like it matters. Each of the five preparation steps is visible as a flaw, but only if the player examines that part of the dress closely. The interaction appears only when the player looks closely enough.

Step 1 — The Fabric

Smooth the ripple in the grain

When the player looks at the bodice, the light catches it wrong — a small ripple running against the fall of the fabric. The interaction appears only when the player looks closely enough to see it.

Step 2 — The Collar

Find the unfastened button

Two buttons are fastened. One is not — the second from the bottom, easy to miss unless the player checks each one. No prompt appears until the player's cursor rests on the collar directly.

Step 3 — The Hem

Look through the fitting mirror

From standing distance the hem looks straight. But there is a small fitting mirror propped against the wall at floor level — the kind used specifically to check hems. The player has to look through it to see that the hem dips slightly on the left side. The flaw is only visible from that angle, that height.

Step 4 — The Sleeves

Find the reference in the magazine

On the dresser is a magazine folded open to a debut spread — a debutante in a similar dress, sleeves folded back one clean turn. Gaya's sleeves are not folded. The magazine is the reference. The player has to find it.

Step 5 — The Lace

The almost that is not enough

The neckline lace is bunched slightly at the right side. The player only knows it's wrong because of Gaya's page — *I want every part of it to be exactly right.* The lace is almost right. Almost is not what Gaya wrote.

When all five steps are complete, the player notices the space beside the dress. It is empty. **No shoes.** Debut dresses always have shoes. Clicking the empty space:

Gaya

Shoes later, I think. The dress first.

She moves on. The player does not. There are never going to be shoes. The player understands this and Gaya does not.

### The Mother's Entrance — Name Beat 2

As Gaya finishes preparing the dress, the mother appears in the bedroom doorway. She stands very still. Looking at the dress on the bed.

The mother, quietly, from the doorway:

Mother

Ligaya.

Not a question. Not a summons. Just: the name. Gaya looks up from the dress, delighted.

Gaya

Mommy! Yes, I fixed the hem already — look, it falls perfectly now. The lace at the neckline too, I was worried it would bunch but it's fine, it looks perfect—

The mother walks into the room without looking at Gaya. She goes straight to the dress. She touches the fabric with both hands, slowly. She was not calling anyone. She was saying her daughter's name because she needed to say it, and the room was the only place left to say it.

Gaya (quieter now, watching her mother)

She always loved this dress. She was right about the embroidery — I almost went with the plain neckline, but she said no, the embroidery, and she was right. She's always right about the things that matter.

### The Mirror Sequence — The Only Moment She Almost Sees

After the mother leaves, Gaya stands before the mirror. The player can interact with the mirror up to three times. This is the most important single sequence in the game — the moment Gaya comes closest to seeing herself clearly. It must be executed with precision.

First interaction

Gaya sees herself in the dress — imagining it

*"Beautiful."* She smiles. She turns slightly, checking the fit. She is here. She is present. She is happy about the dress.

Second interaction

The reflection is slightly late

The reflection moves a half-second after she does. Gaya blinks. *"Must be the light."* She shakes her head slightly, still smiling, moves on. The player notices the lag. Gaya explains it away.

Third interaction

Two seconds of truth

For exactly two seconds, the reflection is empty. The dress is on the bed in the background. The room is as it is. Gaya is not in the mirror. In the doorway, reflected in the glass, the player sees the mother — standing where she has been standing, watching the room. She was never gone. Then Gaya reappears. She shakes her head firmly: *"I'm tired, that's all."*

✦

**Implementation note:** The two-second window in the mirror is the single most precisely-timed moment in the game. The player must have the full two seconds to register: the empty reflection, the dress on the bed, the mother in the doorway. Do not shorten this. Do not let Gaya's return be too fast. The player needs to sit in the truth of what they have just seen.

### Discovery Puzzle — Diary Entry 2

Gaya reaches into the dress pocket to check it's clean before final preparation. Her hand finds a folded page.

**Why the page is here:** Gaya tucked Entry 2 into the dress pocket when the dress arrived, on April 2. She was writing about the heaviness — about being very good at being okay — and the dress arrived, and it was so beautiful, and she folded the entry and slipped it into the pocket of the dress she couldn't wait to wear. She kept her pain where she kept her hope. Her mother found this page when she prepared the dress. She returned it to the same pocket. It is still where Gaya left it.

Gaya

Oh, I put this here? Smart naman. I always forget where I leave things and then they're exactly where I left them.

She sets the page down without reading it carefully. The player sees the full entry.

### The Mother Enters — Closing Beat

She comes in with the torn page from the dress box. She goes to the dress on its form — she prepared it already, in the real world, but she reads Gaya's words again standing in front of it. *I want every part of it to be exactly right.*

She checks each part of the dress. Slowly. The collar. The hem — she kneels to look at it at floor level, the same way the fitting mirror showed it. She smooths the sleeve fold. She lays the lace flat at the neckline. She is doing what Gaya wanted done. Following not a list but a feeling.

She folds the torn page. She slides it into the dress pocket. Presses the pocket flat.

She picks up the shoes from outside the doorway — the player couldn't see them from inside the room — and sets them beside the dress.

She leaves.

Gaya (from wherever she has drifted)

She always knows what's missing.


**006d — Interlude**

## Interlude — The Diary Reading Scene

Between Level 2 and Level 3. No puzzles. No mechanics. Just the mother sitting in the bedroom, reading the diary she found in Gaya's room — separate from the torn pages, which Gaya had already removed and hidden in the spaces she loved. The diary is the rest of the entries. The mother reads from it. Gaya answers.

This is the only real conversation they have in the game. It is not a conversation. Gaya answers her own words as if they are her mother speaking to her. Her mother keeps reading. It is the closest they ever come. It still is not enough.

### Scene Setup

The mother sits on the edge of Gaya's bed. The dress has been moved — it is now on its form or hanger, dressed. The diary is open in her lap. She reads the way Filipinos pray: soft, barely above a whisper, the words private and necessary. Gaya, nearby, hears her mother's voice for the first time seeming to speak. She believes — finally — that she can be heard.

### Full Scene Script

The mother opens the diary. She finds the page from early March — before the entries the player already found. She begins to read.

Mother (reading, barely above a whisper)

"Ang pagod ko. I don't even know why. I didn't really do anything today, I mostly just sat. But I feel like I ran somewhere. That's been happening a lot..."

Gaya (turning sharply toward the sound)

Mommy? Are you — are you reading my —   
  
Mommy. I'm here. I'm right here.

The mother turns the page without looking up.

Mother (reading)

"I think I'm very good at being okay. Like, it's almost impressive kung gano kaya ko gawin. I just don't know what I do with all the not-okay."

Gaya (urgent now, moving closer)

I was okay, Mommy. I am okay. I'm literally standing right here, I don't know why you can't — Mommy, look at me. I'm right here. Look at me.

The mother's hand presses flat on the open page. She breathes — one slow breath, as if steadying something. She keeps reading.

Mother (reading, her voice flatter now — grief flattens the voice)

"I hope the heaviness goes away after this. I really think it will. They have to. Right?"

Gaya (faster, a little breathless)

It did, Mommy. It's — I'm here, I'm helping you, the flowers are done and the dress is ready and we just have the candles — it got better, I promise, I'm fine, I just need you to look at me —

The mother turns to the final page. She reads the date. April 22. 6:14am. She reads the one unfinished sentence: *"I just wanted to tell someone that I —"* She does not read it aloud. She looks at it. Her hand covers the blank space after it — the rest of the page, blank, where the sentence did not finish. She holds her hand there. A long beat.

Mother (not reading now — just saying it, quiet and plain, the weight of it in the flatness)

Ligaya.

Gaya (running toward the sound of it)

Yes. Yes, Mommy — that's me. I'm Gaya, I'm here, I've been here the whole time. I've been here. I set up the flowers and I checked the dress and I've been — I've been right here — Mommy —   
  
Why can't you hear me?

The mother closes the diary slowly. She holds it against her chest with both hands, arms wrapped around it, the way you hold something that is all you have left. She sits with her eyes closed. The room is very quiet. Gaya stands across from her, both arms raised, reaching — unable to cross the space between them. The scene holds for several seconds. Gaya's arms slowly lower. She does not understand. She is not ready to. The scene fades into Level 3.

**On the mother's delivery of "Ligaya":** This line must not be performed emotionally. It should be quiet and plain — the weight is in the flatness, not in the sound. It is how you say something that is too heavy to carry feeling. The writer's note is: "say it the way you say something you are still trying to make real." That instruction should be communicated to voice direction.

**On Gaya's voice through this scene:** She starts cautious, then urgent, then breathless — like someone running toward a closing door. Her last line — *"Why can't you hear me?"* — is the first moment she has asked something she does not immediately answer. She does not understand what it means yet. But the question is there. The scene ends before she has to know.


**006e — Level 3**

## Level 3 — The Candles

03

The Candles

The sala · Candle placement + wishes · Climax · Discovery of Entry 3

### Setting

The sala again — but the flowers are now in place and something has shifted in the light. The altar table at the back — which Gaya has been treating as the welcome table for debut gifts — is visible now as a lamay altar. Evening light comes through the windowsill. Seven candles wait in a box.

The number is not a debut number. Seven is the number of days of Filipino mourning. Gaya does not know this either. She chose seven because she liked how they looked. Because seven was the exact number of things she was still hoping for.

### The Torn Page

Gaya finds it on the windowsill of the sala — resting against the glass, the evening light coming through it so the player can almost read the words from across the room before Gaya picks it up. It is the most personal page. Not planning. Not describing. Just writing — the way you write when you're alone and it's late and you're almost ready and something in you needs to speak before it's too late to speak quietly.

Seven candles. I chose seven because I kept looking at the number and it felt like enough. Like seven was the exact number of things I'm still hoping for. I didn't write them down anywhere else. Just here.  
  
I want to light them myself. I want to be the one who lights them.

No wishes are written on the page. They are only in Gaya's voice — private, unrecorded. The player will hear them when Gaya lights each candle. But the page does not tell you what the wishes are. It only tells you that she had them. That she kept them close. That she wanted to be the one.

### Primary Puzzle — The Room Holds the Map

No diagram. No marked positions. Seven candles in a box on the altar table. The player has to find where they go. The evidence is in the room itself.

The Wax Marks

Six positions already written into the cloth

Seven small wax circles on the altar cloth — old, faint, from candles that stood here before. The cloth has been used for this before. The positions are already written into the fabric in the language of wax and heat. Some are easy — the two at the front of the altar are obvious. The ones at the sides require the player to move around the altar table and look at the cloth from different angles.

The Hidden Mark

Move the diary page

The centermost wax circle is hidden under the diary page Gaya set down when the interlude ended. The player has to move the page to find the mark underneath.

The Seventh Position

A space left open on purpose

One position — the seventh — has no wax mark. The cloth is clean there. This position has never held a candle before. It is new. The player finds it by elimination: six marks, six candles, one candle left, one space on the altar that feels like it was left open on purpose.

*Clicking that empty space:* "Here. The last one goes here. I don't know how I know that." She doesn't know. Her mother put the altar cloth down with that space deliberately open. For the seventh candle. For the last wish. For after.

The Lighting Order

Isa-isa, mula sa puso

A small handwritten note is tucked under the candle box — not the torn page, something else, something the mother wrote and left — that reads only: *isa-isa, mula sa puso.* One by one, from the heart. The center candle first, then outward. Each correctly lit candle makes the next position glow faintly in the candlelight, guiding outward. Wrong order: the candle lights but no wish comes. Gaya is quiet. The player tries again.

### The Candle Wish Mechanic

The emotional spine of the game. Each candle lit — in the correct order, from the center outward — triggers two simultaneous beats: **Gaya's wish** (audible, hopeful, private) and a **parallel beat of the mother** (visible to the player, invisible to Gaya). The two realities run alongside each other. They never meet — except at Candle 5.

006e continued — Candles

## Full Candle Wish Sequence

| # | Gaya's Wish (what she says aloud) | Mother's Parallel Beat (visible to player only) |
| --- | --- | --- |
| 1 | *"I hope the guests will like the flowers."* | The mother kneels at the altar — the table Gaya calls the "welcome table." She clasps her hands. Her lips begin to move in prayer. |
| 2 | *"I hope I don't cry when I dance."* | The mother's lips keep moving. The prayer is continuing. She has been praying since Candle 1. She is asking for something the candles cannot give. |
| 3 | *"I hope Tita Cora comes. She always makes things lighter."* | The mother takes a small photograph from her pocket. The player cannot see whose photograph it is — but they see her hold it in both hands, looking at it the way you look at something that is also looking back at you. |
| 4 | *"I hope the heaviness goes away after this. I really think it will."* | The mother sets the photograph face-down on the altar. She does not want to hold it while she prays anymore. The action is too small and too complete to explain. |
| 5 | *"I hope Mommy knows how much I love her."* | The mother stops praying. She turns from the altar and looks directly at the space Gaya occupies. One full breath — the player sits in it. Then quietly, not a question: **"Ligaya."** Full. Whole. Gaya freezes. *"Mommy?"* The mother looks away. She picks up the photograph again and keeps going. It is the closest they come. This must hold for at least one full second before the mother looks away. |
| 6 | *"I hope this is the beginning of something."* | The mother puts her face in her hands. Three seconds. Then she straightens. She keeps going. She always keeps going. |
| 7 | Gaya lifts the last candle to place it — and stops. Something is under it. | The diary page. Entry 3. It was under the candle all along. |

**On Candle 5:** This is the emotional climax of the candle sequence and the culmination of the name arc. Gaya wishes for her mother to know she is loved — and at that exact moment, the mother almost senses her. The player sits in the gap between *almost* and *not quite*. The timing is the entire meaning. Do not rush it.

### Discovery — Diary Entry 3 + The Final Beat

Gaya picks up the last diary page from under the seventh candle. She starts to open it — and the mother makes a small sound across the room. Not words. Just a sound. Gaya immediately looks up.

**Why the page is here:** Gaya wrote Entry 3 in the days before April 22. She was sitting near the candles she had already bought and laid out — she kept looking at them because they made her feel like something was almost ready. She folded the page and slid it under the centermost candle. It was the last thing she hid. She put her final diary pages closest to the things that mattered most to her: the flowers for the entrance, the dress she would wear, the candles that would mark the moment. Her mother found each page when she prepared each space. She left every one exactly where Gaya had placed it.

Gaya lifts the last candle. The page is underneath it.

Gaya

Oh — one more. How many did I hide? [a small laugh] I forget sometimes, that I do this.

She starts to unfold the page. The mother makes a small sound from across the room — not loud. Just: a sound. The kind that has no name. Gaya looks up immediately.

Gaya

Mommy?

She sets the page on the table — still open, still visible to the player — and crosses the room toward her mother. She reaches out to put her hand on her mother's shoulder. She wants to comfort her. She doesn't know from what.

Her hand passes through.

The candle burns on the table. The open diary page beside it. The player can read Entry 3. Gaya looks at her hand. She looks at it for a long time. The candle burns. The sala is silent.

Gaya (very quiet — not frightened. Just: beginning to understand.)

Oh.

### The Mother Enters — Closing Beat

She is holding the torn page from the windowsill. She goes to the altar. She reads the page standing in the candlelight — *I want to be the one who lights them* — and she looks at the seven candles already burning, lit by hands she cannot see. She does not know how they are lit. She does not question it. She reads the page once more.

She folds it carefully — more carefully than the others, smaller, tighter, the way you fold something that is the last of something. She goes to the seventh candle — the new position, the one with no wax mark beneath it. She lifts it gently. She places the folded page flat on the altar cloth. She sets the candle back down over it.

The page is under the seventh candle now. Gaya's last private words held under the last light she lit.

The mother stands. She looks at the sala. She takes out her marker.


**006f — Ending**

## The Ending

### Sequence

The camera does not rush. After Gaya looks at her hand, there is a held beat — just the sala, the candles lit, the flowers in their places, the dress on its form in the next room. Everything is ready. It has always been ready. She has been preparing a space she could not enter.

The sala begins to shift slightly — not dramatically. The debut decorations are still there. But the candles are now wake candles in the light. The flowers are now lamay flowers in the way they are held and placed. The altar is what it is. The truth has always been here. The player has been the one who knew. Gaya is only now beginning to know.

### The Banner Pull-Back

The camera moves slowly — for the first time — to the banner at the sala entrance. It pulls back until the full banner is visible. The whole frame. The whole name. The player reads:

LIGAYA Maria Reyes

Ika-18 Kaarawan · Abril 25, 2026

Hanggang sa muli, anak.

The "LI" is in yellow — softer than the gold of the rest of the banner. It is clearly hand-done. The mother's handwriting. The debut date — April 25 — is visible for the first time. Gaya never looked at the banner carefully. She knew what it said. She thought she did. Below the date: four words, in the mother's hand.

### Gaya's Final Lines

Gaya looks at the banner. She is very still.

Gaya (reading it — her own name, the full name, the whole thing)

Ligaya.

A beat.

Gaya

I forgot. I actually forgot that was my name.

She looks at the four words her mother added. She reads them.

Gaya (soft)

Hanggang sa muli.

A long beat. She understands now. Not fully — some understanding is bigger than a moment. But enough. She looks around the sala — the flowers she chose, the candles she placed, the space she prepared. She looks at her mother, still at the altar, still praying.

Gaya (not a goodbye — a realization, warm and a little broken)

I did all of this, Mommy. I did all of it. It looks so beautiful.   
  
PASINAYA.

The candles burn. Fade to black, slowly, on the sala. On the lit flowers. On the banner. The last thing visible before black is the "LI" — yellow against the dark.

### Post-Credits / Final Text

After the fade to black, text appears — white on black, in the game's serif typeface. No music. Just the words.

Kung ikaw ay nagdurusa, may taong gustong makinig.  
*If you are suffering, there is someone who wants to listen.*

[Mental health resources for the Philippines and international players]


**007 — Diary Pages**

## Diary Pages — Design & Placement Logic

This is the single most important design decision in the game's narrative architecture. The diary pages are not planted clues. **They are Gaya's own habit turned into a symbol.**

**The core rule:** Gaya kept her most private writing near the things she loved most. When she wrote something that felt important — something she wanted to keep close — she tore the page from the diary and tucked it in the space she was thinking about. It was a personal ritual. The mother found each page when she prepared each space after Gaya's death. She read them. She returned them to the same places. They are still there. The player finds what the mother found. The mother's act of returning the pages is itself a kind of keeping — she could not keep her daughter, but she could keep this.

Entry 1 — The Flowers

Found in the centerpiece vase

Written March 3, while planning the arrangements. Gaya folded it into the vase with her flower diagram — keeping her excitement and her plans in the same place. Written before the heaviness got bad. She was genuinely excited about the debut. That matters.

Entry 2 — The Dress

Found in the dress pocket

Written April 2, the day the dress arrived. She had written about being very good at being okay, folded the page, and slipped it into the pocket of the dress she couldn't wait to wear. She kept her pain where she kept her hope.

Entry 3 — The Candles

Found under the seventh candle

Written April 19 and April 22. The last pages. Gaya slid this under the centermost candle — she had laid the candles out already and kept looking at them. She placed her final words under the last light she arranged. This is the page the player never quite gets to read fully. Entry 3 cuts off. The mother found it here. She left it here.

### What the Mother Did and Did Not Do

The mother did not tear the pages out of the diary. They were already torn out — by Gaya, when she wanted to keep them close. The diary itself is intact, with those pages missing. The mother found the diary separately. She read it. She reads from it in the Interlude. The torn pages in the flowers, dress, and candles are separate from the diary — they are Gaya's own hidden archive.

When the mother found each page in each space, she read it. She understood. And then she put it back — exactly where Gaya had left it. This is the mother's act in the game: not removal, not preservation in a box, not framing. Just: returning. Leaving things in the places they were loved.


**008 — Diary Entries**

## Full Diary Entries (Canonical Text)

### Entry 1 — Found in the Centerpiece Vase

March 3

Okay so I finally decided on the flowers. Sampaguita, white roses, and yung mga lilies para sa centerpiece. Mommy said we can get them from Ate Rosing sa palengke kasi mas mura daw at mas tumatagal. I think she's right.

I'm actually excited. Like, for real excited — not the kind where I just tell myself to be. Debut flowers feel very official. It means it's actually happening na.

I found this arrangement style on Pinterest where the flowers are in clusters instead of single stems and it looks so clean. I drew a little diagram of where everything goes — entrance, sala table, the sides — I'll put it here so I don't lose it.

Anyway. I'll finish the diagram in a bit.

Ang pagod ko. I don't even know why. I didn't really do anything today, I mostly just sat. But I feel like I ran somewhere. That's been happening a lot — yung pagod na walang dahilan. I'll sleep early tonight, siguro that's it.

Okay. Sampaguita near the entrance. Roses on the center table. Lilies on both sides of the —

I'll finish this tomorrow.

The entry ends mid-sentence. She finished the diagram separately. The tiredness at the end is the first signal — written in passing, explained away. *I'll sleep early tonight, siguro that's it.*

### Entry 2 — Found in the Dress Pocket

April 2

Yesterday was a bad day. I don't know how else to say it. I woke up and the heaviness was already there, yung pakiramdam na parang may nakadagan sa dibdib ko, and I knew I wasn't going to be able to do anything. I just stayed in my room. Hindi ako lumabas kahit isang beses.

Mommy knocked twice. I said I was just tired. She believed me I think. Or she didn't want to ask more. I don't know which one.

This morning I got up and made breakfast before she woke up. Scrambled eggs, the way she likes. I asked about her work, yung project niya sa opisina. I ate the right amount. I smiled at the right times.

She said I looked better.

I think I'm very good at being okay. Like, it's almost impressive kung gano kaya ko gawin. I just don't know what I do with all the not-okay. It has to go somewhere but I don't know where it goes. I just keep going.

The dress arrived. It's so beautiful, Mommy was right about the embroidery. I can't wait to actually wear it. The debut is close na. I keep thinking — after this, things will feel different. They have to.

Right?

The key line: *"I think I'm very good at being okay."* The entire entry builds toward it. This is the line the writer must protect. Gaya is not dramatizing — she is observing herself with tired accuracy. That is the voice: not poetic, not literary, just: tired and noticing. The final *"Right?"* is not rhetoric. It is a real question she is asking to no one.

✦

**Voice note for Entry 2:** This entry must not be over-written. The Taglish is natural — she switches without thinking. The observations are specific, not sweeping. She does not say "I am depressed." She says she stayed in her room and couldn't do anything and she doesn't know where the not-okay goes. That specificity is the truth of it. If the voice feels too self-aware or too literary, pull it back toward the concrete and the tired.

### Entry 3 — Found Under the Seventh Candle

April 19

Six days na lang.

Everything's almost ready. The flowers, the dress, the candles — Mommy's been working so hard. I want to help more but I also feel like I'm in the way sometimes. Or maybe I just feel like I'm in the way. I'm not sure.

The heaviness is bad again. It's been bad for a while, actually. I keep thinking it'll be better after the debut. After the debut I'll feel like a new person. After the debut things will start. That's what 18 is supposed to mean, 'di ba? Like a door that finally opens.

I just need to get through this. I just need to get to April 25 and then after that, I'll —

---

April 22 · 6:14am

I just wanted to tell someone that I —

The entry does not finish. It never finishes. The player reads the date — April 22 — and understands that three days before the debut, something happened that the diary does not contain because the diary was not the thing Gaya needed. The blank after the dash is the thing the game cannot say. The player completes it themselves. That is the right ending for a sentence like this.

**On Entry 3's incompleteness:** The unfinished sentence is the most important moment in the diary. Do not finish it. Do not suggest what she was going to write. The dash is the whole thing. The mother reads it in the interlude and puts her hand over the blank page after it — she covers the emptiness because she cannot fill it. That is grief. That is the game.


**009 — Core Game Loop**

## The Core Loop

*The torn page tells you what Gaya felt. The room tells you what to do.*

The page is emotional context. The environment is the puzzle. The player has to read both — hold Gaya's words in one hand and the physical space in the other — and find where they meet.

The Torn Page

What Gaya felt and wanted

Not a diagram. Not a checklist. A paragraph. A letter. A private note left near something she loved. The record of a person who cared deeply about getting things right and wrote down the caring, not the steps.

The Room

What to do

A photograph on the wall. A dress with flaws only visible up close. Wax marks on an altar cloth. The steps were always in the room — waiting for someone who looked carefully enough to find them.

The Player

Holds both and finds where they meet

Gaya completes each puzzle in her own voice, believing she is the one doing it. Every action she reads as celebration, the player reads as grief ritual. The player's growing understanding is the puzzle.

The Mother

Reads both and builds the space

After each puzzle, she enters. She reads the page again. She places it where it belongs — in the vase, in the pocket, under the seventh candle. She does what Gaya wanted done, following not a list but a feeling.

### Applied Across All Three Levels

Level 1 — The Flowers

Torn page → framed photograph → mother slides page into vase

The page is a paragraph about flowers she's seen before at family gatherings. The room holds a photograph of Lola's lamay — this sala, years ago — with wax rings on the floor marking the same six positions. The mother enters and recognizes herself in the photograph: young, arranging the same flowers for her own mother's wake.

Level 2 — The Dress

Torn page → dress flaws on close inspection → mother slides page into pocket, brings shoes

The page is a letter about wanting every part of it to be exactly right. The dress tells you what it needs — a ripple in the fabric, an unfastened button, a hem only the fitting mirror reveals, sleeves the magazine shows how to fold, lace that is almost right. The mother follows the feeling, not a list, and brings the shoes the player knew were missing.

Level 3 — The Candles

Torn page → wax marks on cloth → mother places page under seventh candle

The page says she wanted to be the one who lights them. The cloth holds six old wax marks and one clean space — the seventh position, left open on purpose. The mother's note says: *isa-isa, mula sa puso.* After the seventh wish and the hand that passes through, the mother folds the page smaller than any of the others and places it under the last light her daughter lit.

Gaya wrote what she felt. The room held what she meant. Her mother read both and built the space where they could finally be the same thing.

### No Fail States

All puzzles are completable. No timers. No wrong answers. The game is an experience, not a challenge. The only gates are completion — and attention. The game rewards presence. Speed is not rewarded. Looking closely is.


**010 — Voice**

## Gaya's Voice — Writing Guide

Gaya's voice is the instrument of the entire game. It must be right. Here is how to write her:

Rule 1

She sounds like a real teenager, not a tragic character

She gets excited about embroidery. She has opinions about centerpieces. She says *naman* and *kasi* and *'di ba* in the natural rhythms of Taglish. She is funny in an understated way. She is warm. The grief bleeds through in the pauses and the tiredness and the way she keeps saying *after this* — but she does not sound like someone in a sad story. She sounds like someone who is fine.

Rule 2

She explains her tiredness away — every time

Every time the heaviness is present, Gaya names it and then immediately explains it: *I'll sleep early tonight, siguro that's it / Must be the light / I'm tired, that's all.* She has been doing this for a long time. She is practiced at it. The explanations are immediate and automatic. She does not pause before them.

Rule 3

She defers happiness to "after"

*After the debut, things will feel different. After this, I'll feel like a new person. After April 25.* She keeps moving the threshold. After is the word that carries her. The player, hearing it enough times, understands what she does not: the threshold never arrives. Write "after" deliberately. Every instance matters.

Rule 4

She misreads her mother — always warmly

Every time the mother does something that is clearly grief, Gaya reads it as love or approval. *"She always loved this dress."* *"I knew she'd love it."* *"She's admiring it."* These misreadings are not stupid — they are the natural readings of someone who trusts her mother and trusts the context she believes she is in. The tragedy is that she is not wrong about the love. She is only wrong about the direction.

Rule 5

She only calls herself Gaya

Throughout the entire game, Gaya refers to herself only as Gaya — never Ligaya. If she refers to her name at all, it is as a nickname, her identity, the name she knows herself by. The full name lands in the ending for the first time because it has been absent the entire game. Protect this absence. It is the shape that the ending fills.


**011 — Dialogue**

## Full Dialogue Scripts by Level

### Level 1 — The Flowers (Additional Lines)

Gaya (humming, then stopping)

I keep humming that song and I don't even know the full lyrics. Just the first part and then da-da-da and then something about home. It's been in my head for a week.

Gaya (examining the sampaguita)

Sampaguita smells like — I don't know how to describe it. Like something important is about to happen. Like the thing right before a good thing.

Gaya (stepping back, looking at the sala)

Okay. Okay, this is actually — this is exactly what I imagined. Better, actually. Sometimes the real thing is better than the picture in your head. I didn't know that happened.

Gaya (after finding the diary page)

My handwriting is so bad. Like, objectively. I don't know why it's so hard for me to write small. My thoughts are small — or, well. They're not small, actually. They're — I don't know. They're a lot. But I try to write them small.

### Level 2 — The Dress (Additional Lines)

Gaya (smoothing the fabric)

Mommy picked the embroidery. I wanted the plain neckline but she said no, you'll regret the plain one, get the embroidery. And she was right. She's always right about the things that are going to matter later.

Gaya (buttoning the collar)

Eighteen. That number doesn't feel like anything yet. I thought it would, by now. Maybe it feels like something after. After you've actually crossed the line.

Gaya (first mirror interaction)

Beautiful. [soft] I'll wear it and I'll feel like — I'll feel like myself, but the version of myself that I was supposed to be. Does that make sense? Like meeting someone you already know.

Gaya (after third mirror interaction)

I'm tired, that's all. I've been tired for — it's fine. It'll be fine after. Everything will be fine after.

### Level 3 — The Candles (Additional Lines)

Gaya (placing the first candle)

Seven candles. I wanted an even number at first — eight felt right, like good luck. But then I looked at seven and seven just looked like the right number. Some numbers just look right.

Gaya (lighting, between Candle 3 and 4)

Tita Cora is going to cry. She cries at everything — the good things and the bad things both. She says she just has a lot of feelings. I think that sounds exhausting, actually. Having a lot of feelings and letting them all out. I wonder what that's like.

Gaya (after Candle 5, quiet)

Mommy?   
[a beat]   
Nothing. I thought she said something.

Gaya (lifting the last candle, finding the page)

Oh — one more. How many did I hide? [small laugh] I forget sometimes, that I do this. I tuck things into places and then forget and then find them and think — oh, there you are. I was looking for you.


**012 — Production**

## Implementation Notes

Audio Design

Ambient sound over music

The sala should sound like a real Filipino home being prepared — distant traffic, birds, the sound of fabric, the clinking of glass. Gaya's humming is diegetic. Music, if any, should be sparse — a single instrument, something that can be the debut song and the lamay song depending on how you listen to it. Consider using a traditional Filipino instrument.

Visual Palette

Light that is both things at once

The lighting must support the dual reading. Morning light, white flowers, candles — these are debut and wake in the same image. The space should never look undeniably like either. Trust the player to read it. Don't design one reading out. The ambiguity is the design.

The Mirror

Precisely 2 seconds

The empty reflection in Level 2 must hold for exactly two seconds. This has been specified by the design. Do not shorten. The player needs to see: empty reflection, dress on bed, mother in doorway. Three things. Two seconds. Then Gaya returns. Then her explanation.

Candle 5

One full second of the mother looking

The mother looks at the space Gaya occupies after the fifth wish. This holds for one full second minimum before she says "Ligaya" and before she looks away. The player must sit in the almost. This is the closest they come. Time it.

The Hand Passes Through

No dramatic effect — just: nothing

When Gaya's hand passes through her mother's shoulder, there is no sound effect, no visual distortion, no dramatic signal. Her hand simply passes through and is on the other side. The absence of reaction is the reaction. Do not add particles or ripples or sound. Just: nothing where there should be something.

The "LI" in Yellow

Visually distinct from the rest of the banner

The "LI" the mother adds must read as hand-done. It is slightly larger, slightly imperfect in a human way, and unmistakably yellow-gold rather than the deeper gold of the printed text. The difference matters — it must be visible as an addition. As something that was not there before and is now.

The Diary Pages

Readable texture

The diary pages should look like real notebook pages — slightly yellowed, Gaya's handwriting visible as a texture even when not readable. When the player looks carefully, the full entry text becomes legible. The pages should feel like something someone held and folded and carried. They are not documents. They are the most private thing in the game.

Mental Health Resources

Mandatory post-credits

The post-credits resource screen is non-optional and non-skippable for at least 5 seconds. It should include Philippine-specific resources (Hopeline Philippines, In Touch Crisis Lines, local DOH mental health resources) and international options. The game is explicit that this is a game about mental health — the resources should reflect that without being clinical or alarming. Warm, direct, specific.

**Final note to all departments:** This game will be played by people who have been Gaya. By people who have been the mother. By people who did not know, and by people who knew too late, and by people who are still in the middle of not knowing. Make it with that in mind. Every decision — lighting, sound, timing, text — is being made for those players. Get it right.

GAYA — Full Game Design Document

Version 2.0 · Complete