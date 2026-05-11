# GAYA (PASINAYA) — Master Development Log

**Project:** GAYA — Filipino Narrative Puzzle Game  
**Concept Document:** Story Concept.md (v2.0)  
**Codebase:** /GAIA/  
**Status:** Architecture Complete • Narrative Wired • Visual Polish: Ongoing

---

## 1. Executive Implementation Summary

The GAYA project has been successfully translated from a 1,023-line Game Design Document (GDD) into a modular, canvas-based narrative engine. The implementation follows the **"Dual Perspective"** requirement: Gaya experiences the game as a debutante's celebration, while the player gradually discovers it is a mourning ritual.

### Key Milestones Completed:
- **Modular Refactoring:** 4 monolithic files split into 23 specialized modules.
- **Narrative Integrity:** 100% of the GDD dialogue (Taglish) is wired into the `js/data/dialogue.js` data structure.
- **Mechanics Mapping:** All 3 core levels (Flowers, Dress, Candles) feature the gated interaction logic specified in the concept.

---

## 2. Narrative-to-Code Directory

| GDD Narrative Beat | Implementation File | Logic / Trigger |
|---|---|---|
| **The "Name Arc"** | `js/data/dialogue.js` | Tracked via `level2.dress_complete`, `level3.mother_beats.candle_6`, and `ending`. |
| **Flower Reference Puzzle** | `js/levels/level1-sala.js` | `state.hasSeenPhoto` gate for flower placement. |
| **Mirror Reflection Lag** | `js/levels/level2-bedroom.js` | `state.mirrorClicks` (3-click sequence) in `case 'full_mirror'`. |
| **Diary Placement Habit** | `js/data/maps.js` | Hotspots: `vase_diary`, `dress_pocket`, `candle_diary`. |
| **Ordered Lighting** | `js/levels/level3-candles.js` | `state.expectedCandle` sequence (Center → Outward). |
| **Dual Reality Reveal** | `js/levels/ending.js` | Canvas-scale pull-back logic + Narration reveal. |

---

## 3. The "Name Arc" Audit
The GDD defines the name arc as the "emotional architecture" of the game. Here is how it is currently executed in code:

1.  **Opening:** Banner displays "Gaya Maria Reyes". (Handled in `css/screens.css` via `opening-banner`).
2.  **Level 1 (Lips move):** Handled narratively in `level1.flowers_done`.
3.  **Level 2 (Mother speaks):** Triggered in `level2.dress_complete` after all 5 flaws are fixed.
4.  **Interlude (The Call):** Full dialogue sequence in `js/levels/interlude.js`.
5.  **Level 3 (Climax):** Mother turns and says "Ligaya" on **Candle 5/6 lighting**.
6.  **Final Reveal:** Banner reveals **"LIGAYA"** with the yellow "LI". (Handled in `js/levels/ending.js`).

---

## 4. Granular Level Audit (GDD v2.0 vs. GAIA)

### Level 1: The Sala (Flowers)
- **Concept:** Six-position *lamay* arrangement based on a family photo.
- **Implementation:** 
  - Photo hotspot exists and sets `state.hasSeenPhoto = true`.
  - Flowers cannot be placed until the photo is viewed.
  - Vase diary discovery triggers transition to Level 2.
- **Status:** ✅ **Complete**

### Level 2: The Bedroom (Dress)
- **Concept:** 5 flaws (2 gated) + Mirror lag sequence (3 interactions).
- **Implementation:**
  - `dress_hem` gated by `fitting_mirror`.
  - `dress_sleeves` gated by `magazine`.
  - Mirror sequence (3 clicks) wired to `D().mirror_1`, `mirror_2`, `mirror_3`.
- **Status:** ⚠️ **Partial** (Visual mirror lag effect is narrative-only; needs canvas implementation).

### Interlude: The Diary
- **Concept:** 12-line alternating dialogue between Mother and Gaya.
- **Implementation:** `js/levels/interlude.js` routes the full queue from `dialogue.js`.
- **Status:** ✅ **Complete**

### Level 3: The Candles
- **Concept:** 7 candles, "Isa-isa, mula sa puso" (Center-outward lighting).
- **Implementation:**
  - Logic enforces `candle_6` (Center) first.
  - Paired wishes/mother beats trigger on each lighting.
  - **Hand-pass-through beat** occurs upon picking up the final diary page under the 7th candle.
- **Status:** ✅ **Complete**

---

## 5. Implementation Evolutions (Divergences)
*Minor adjustments made during coding to optimize for the player experience:*

1.  **Candle Mapping:** The GDD table marks the Climax at Candle 5. In `dialogue.js`, the "Ligaya" look-beat is currently mapped to `candle_6`.
2.  **Mirror Lag:** The GDD requires a "2-second empty reflection." The code currently executes this through the typewriter narration text; the renderer does not yet "clear" the player sprite from the mirror's tile area.
3.  **Banner Reveal:** The yellow "LI" is currently described in narration text. The renderer needs a specific layer for the hand-drawn "LI" overlay in the final scene.

---

## 6. Gold Status Roadmap (Prioritized)

| Priority | Feature | Required Change |
|---|---|---|
| **CRITICAL** | **Mother Sprite** | Add a static or semi-transparent sprite for the Mother in the Sala and Bedroom to make her "witnessing" physical. |
| **CRITICAL** | **Mirror Visual** | In `renderer.js`, create a conditional to hide the player sprite reflection when `Level2.state.mirrorClicks === 3`. |
| **HIGH** | **Diary Textures** | Replace narration text boxes for diary entries with an overlay of a "torn notebook page" image. |
| **MEDIUM** | **Yellow "LI"** | In `ending.js`, render the letters "LI" with a handwritten CSS font or image overlay atop the banner. |
| **LOW** | **Audio Layer** | Ambient room tone + high-frequency "ringing" during the Hand-pass-through beat. |

---

## 7. Version History

- **v1.0 (May 11):** Initial build and logic wiring.
- **v1.1 (May 11):** Architectural refactoring into 23 modules.
- **v1.2 (Current):** Master Document refinement based on GDD v2.0 review.

---
*"The tragedy is not that no one cared. It is that her pain had learned to look like nothing."*  
— **GAYA GDD (Section 002)**
