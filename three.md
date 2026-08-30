# Web By Elie — Four Three.js Videos

> Submit this entire document to Sol or Terra as the implementation brief.

## Objective

Create four polished, fully scriptable 11-second animated videos for the Web By Elie website using Three.js and TypeScript.

The four videos explain four stages of improving a small-business website:

1. Reworking the page, its structure, and its copy.
2. Making hidden SEO information understandable to search engines.
3. Making the page useful to AI answer engines such as OpenAI and Claude.
4. Finding and stopping unnecessary website-related spending.

Each video must work by itself, but the four videos must also chain together as one coherent 44-second sequence. The ending composition of each video should naturally lead into the beginning composition of the next.

This task is only about producing the videos and their source code. Do not integrate them into the live website yet. Do not alter the public website, deploy anything, or change its version.

## Required technology

- Use Three.js as the primary rendering and animation environment.
- Use TypeScript.
- Do not use Remotion.
- GSAP may be used for timelines and easing, but Three.js must render the scenes.
- Make rendering deterministic: the same time or frame must always produce the same image.
- Provide a `renderAt(timeInSeconds)` or `setFrame(frameNumber)` mechanism.
- Use a fixed random seed for particles and secondary motion.
- Use Troika Three Text or locally bundled fonts for crisp, reliable text.
- Build shared components for the website page, cards, labels, packets, bots, database, magnifying glass, cat, progress bar, and status badges.
- Keep each video in a separate scene or timeline module while reusing the shared visual system.

## Exact output specification

- Resolution: 1920 × 1080.
- Frame rate: 30 fps.
- Duration: exactly 11 seconds per video.
- Frame count: exactly 330 frames per video.
- Format: MP4, H.264, `yuv420p`.
- All important text must be readable at normal playback speed.
- Every video must be understandable with the sound muted.
- Avoid relying on voice-over, sound effects, or captions to explain an action that is not visibly happening.

Required output files:

- `01-page-reassembly.mp4`
- `02-seo-harvest.mp4`
- `03-aio-recommendations.mp4`
- `04-savings-cat.mp4`
- `all-four-preview.mp4` — the four videos concatenated in order

Also provide:

- Complete source code.
- Installation and rendering instructions.
- Package scripts for previewing and rendering.
- One representative still image from each video.
- One contact sheet covering the major beats of all four videos.
- A browser preview with play, pause, scene selection, and a timeline scrubber.

## Web By Elie direction

Web By Elie helps small businesses get more value from websites they already have. The service is practical, clear, expert, friendly, and lightly witty. It improves what exists instead of presenting technology as mysterious magic.

The four service ideas represented by these videos are:

- Website refresh: improve structure, hierarchy, copy, proof, and calls to action.
- SEO: expose and organize the facts search engines need to understand and index a business.
- AI readiness: help answer engines identify, trust, summarize, and recommend the business.
- Savings: expose duplicate, forgotten, unnecessary, or overpriced website expenses and keep that money with the business owner.

The tone should feel intelligent and playful, never childish, cynical, aggressive, or corporate-generic.

## Shared art direction

Use a clean, modern editorial studio aesthetic:

- Bright warm-neutral background.
- Fine architectural grid or subtle drafting marks.
- Dark ink outlines.
- Restrained green, blue, rust, terracotta, and gold accents.
- Rounded interface panels and cards.
- Shallow 3D perspective with soft, deliberate shadows.
- Clear typography and generous spacing.
- Smooth, precise movement with satisfying physical cause and effect.
- A few tactile details such as tabs, trays, slots, rails, labels, stamps, hinges, and pockets.

Avoid:

- Neon cyberpunk styling.
- Dark science-fiction environments.
- Generic glowing AI brains.
- Photorealism.
- Excessive particles or visual clutter.
- Trademark-dependent robot designs or exact reproductions of corporate logos.

OpenAI, Claude, and Google/Search may be identified with readable labels and restrained color cues. The characters should be original visual interpretations, not copies of branded mascots.

## Shared composition

Use a consistent information frame across all four videos:

- Web By Elie wordmark or simple mark at top left.
- Current service label at top right.
- Thin progress indicator at top center.
- Short explanatory caption at lower left.
- Outcome or status badge at lower right.

The central animation should remain the focus. UI framing must support it without competing with it.

## Motion and storytelling rules

These rules are non-negotiable:

1. Every key transformation must happen visibly on screen.
2. Do not jump directly from a problem state to a solved state.
3. Objects must visibly travel from their source to their destination.
4. Labels can reinforce an action, but cannot replace the action.
5. Hold each important result long enough to understand it.
6. Use continuity of position, scale, color, and motion to connect the four videos.
7. Make causes and effects unmistakable: scan, discover, collect, transform, store, or repair.
8. Keep camera motion controlled. Favor a mostly stable editorial camera with purposeful pushes, tilts, flips, and shallow orbiting.
9. Preserve enough negative space that copy remains readable.
10. The animation should feel handcrafted and intentional rather than like a generic template.

---

# Video 1 — Pick Apart, Scrutinize, Rewrite, Reassemble

## Purpose

Show that Web By Elie does not merely decorate a page. The existing page is carefully taken apart, its structure and copy are scrutinized, weak content is rewritten, and the improved elements are assembled into a clearer page.

## Opening state

Show a complete but mediocre small-business web page standing upright in shallow 3D. It should look plausible, not comically bad.

The page contains:

- Navigation.
- A hero headline.
- A vague supporting sentence: `We help with your website.`
- A generic image.
- Three service cards.
- A small proof or testimonial block.
- A weak call-to-action button.

The problems should be visible through weak hierarchy, generic copy, crowded spacing, an unclear CTA, and proof placed too far from the claims it supports.

## Timeline

### 0.0–1.2 seconds — Establish the original page

- Present the full page front-on.
- Give the viewer enough time to recognize its sections.
- Briefly highlight the vague copy and weak CTA without fixing anything yet.

### 1.2–3.2 seconds — Physically pick the page apart

- The navigation, headline, supporting copy, image, service cards, proof, and CTA must detach as separate physical layers.
- Each element should lift away from the page along the z-axis, then move into an organized inspection layout around the empty page frame.
- Use guide rails, alignment marks, or measurement ticks to suggest deliberate analysis.
- Do not dissolve the old page into a new page. The viewer must see the original elements being removed and preserved for inspection.

### 3.2–6.0 seconds — Scrutinize and rewrite the copy

- Bring the sentence `We help with your website.` into the main inspection position.
- A scanning line, editorial loupe, or annotation tool passes over the words.
- Apply visible annotations such as `TOO BROAD`, `UNCLEAR`, and a strike-through or revision mark.
- Show the sentence being actively reworked. Characters may slide out, words may be replaced, or the old sentence may split into editable word tiles.
- Transform it into the stronger line: `Clear facts people can find.`
- The viewer must see both the before and after states and understand that the copy itself was examined and rewritten.
- Briefly compare the revised line to the original with a clear approved state.

### 6.0–9.0 seconds — Improve the other elements

- Resize and reorder the headline and supporting copy to establish hierarchy.
- Move proof beside the claim it supports.
- Rename or clarify the service cards.
- Increase spacing and alignment consistency.
- Transform the weak CTA into a specific, high-contrast next step.
- Give each changed element a short visible inspection-and-approval beat.
- Keep transformed elements distinct from unchanged ones through a subtle color edge, checkmark, or polished material treatment.

### 9.0–11.0 seconds — Reassemble the improved page

- The changed pieces must travel back into the page frame one by one.
- They must occupy visibly improved positions, not their original positions.
- Alignment guides should snap into place as the page becomes coherent.
- The final page faces the camera and settles cleanly.
- Show the status: `CLEARER STRUCTURE ✓`.
- End with the rebuilt page centered and stable so Video 2 can begin from the same page.

## Non-negotiable visible actions

- Individual page components physically detach.
- The original vague sentence is visibly marked and scrutinized.
- The old words visibly become the new words.
- Proof, CTA, and cards visibly change position or form.
- The transformed pieces physically re-enter the page.
- The final page is recognizably built from the original page, but is clearly better structured.

---

# Video 2 — Flip the Page, Reveal SEO Data, Harvest and Store It

## Purpose

Show how SEO exposes information that is mostly invisible to ordinary visitors, organizes it, and gives it to a large search robot that harvests and stores it in a database.

## Opening state

Begin with the finished page from Video 1 in the same scale and position.

## Timeline

### 0.0–1.5 seconds — Re-establish the improved page

- Hold the front-facing page briefly.
- Introduce the service label `SEO`.
- A small technical inspection cursor or scan line approaches the page edge.

### 1.5–3.0 seconds — Flip the page and expose the hidden layer

- The page rotates around a strong vertical or horizontal hinge like a physical inspection board.
- As it flips, reveal a technical underside behind the visible design.
- The front-facing design remains recognizable on one side while structured metadata, page hierarchy, and code are revealed on the other.
- The flip itself must expose the information; do not simply fade in floating data over the page.

### 3.0–5.2 seconds — Reveal the previously hidden information

Show clearly labeled data modules emerging from the technical layer:

- Page title.
- Meta description.
- Primary service keywords.
- Business category.
- Service area or location.
- Heading structure such as H1 and H2.
- Internal links.
- Structured JSON-LD.
- A readable JSON example referencing `ProfessionalService` and `FAQPage`.

Each data module should originate from a specific place on the revealed underside. Convert the fields into tidy physical data packets, cards, or capsules. The packets remain connected to their source with a brief line or trail so the viewer understands where they came from.

### 5.2–8.2 seconds — The Google/Search robot harvests the data

- A large, friendly search robot arrives from the right.
- It should feel substantial and industrial, with an intake arm, scanner, conveyor, collection tray, or suction tool.
- Use restrained red, blue, yellow, and green details as a search-engine cue, plus a readable `SEARCH` or `GOOGLE` label if appropriate.
- The robot scans the exposed technical layer.
- Its collection mechanism must physically touch or lock onto each data packet.
- The packets must visibly leave the page, cross the space, and enter the robot's collection tray.
- Show several distinct packet types being collected, not one generic cloud of data.
- Display the process state `HARVESTING` while collection is underway.

### 8.2–10.2 seconds — Store the harvest in the database

- A large database cabinet, server cylinder, or indexed shelving system opens behind the robot.
- The robot moves its collected packets from the tray into clearly marked database slots.
- The packets must visibly cross from the robot into the database.
- Database rows should begin as `EMPTY`, then change one by one to values such as `TITLE`, `SERVICE`, `LOCATION`, `FAQ`, and `INDEXED` as packets enter.
- Use a visible route labeled `HARVEST → STORE`.
- Show the database filling rather than instantly appearing full.

### 10.2–11.0 seconds — Confirm indexing

- The last packet clicks into place.
- The database closes or locks with a satisfying mechanical motion.
- Show `STORED`, `INDEXED`, and `DATABASE UPDATED ✓`.
- Keep the Google/Search robot and database visible in the final composition so Video 3 can begin from this state.

## Non-negotiable visible actions

- The page physically flips to reveal an underside.
- Keywords, metadata, headings, links, and JSON-LD are visibly present.
- Data packets visibly originate from those fields.
- The robot visibly harvests the packets from the page.
- The packets visibly enter the robot before entering the database.
- Empty database rows visibly fill and become indexed.
- The robot must be seen putting the harvested data away in its large database.

---

# Video 3 — AI Bots Step Forward, Collect Facts, Build Recommendations

## Purpose

Show the next stage after conventional search indexing: OpenAI and Claude bots move into the foreground, politely nudge the Google/Search robot into the background, collect the page's facts themselves, and create practical bullet-point recommendations.

## Opening state

Begin with the Google/Search robot beside the filled database exactly where Video 2 ended. The improved page and its exposed structured information remain visible.

## Timeline

### 0.0–1.5 seconds — Begin with conventional search

- Re-establish the Google/Search robot and indexed database.
- Keep them prominent for a moment so the shift in attention is easy to understand.
- Introduce the service label `AI READINESS` or `AIO`.

### 1.5–3.2 seconds — OpenAI and Claude enter and nudge search backward

- An original OpenAI-inspired bot enters from one side using a teal or cool-green palette and a clear `OPENAI` label.
- An original Claude-inspired bot enters from the other side using a warm terracotta palette and a clear `CLAUDE` label.
- The bots make gentle physical contact with the Google/Search robot or its platform.
- Together they visibly nudge or slide the search robot and database backward in depth and slightly to the side.
- The search robot must remain visible, but becomes smaller, softer, or less saturated in the background.
- This should feel like a change of focus, not a hostile takeover.

### 3.2–6.2 seconds — The AI bots collect the page data themselves

- The OpenAI and Claude bots turn toward the page and exposed data layer.
- Each bot uses a distinct intake method: for example, one uses articulated reader arms and the other uses a warm scanning ribbon or collection tray.
- Show packets for keywords, business facts, services, location, proof, FAQs, and JSON-LD.
- Each packet must visibly leave the page and travel into one or both bots.
- Show the bots examining content relationships, not merely copying a single keyword.
- Use visible states `READING`, then `COLLECTING`, then `UNDERSTANDING`.
- The Google/Search robot remains in the background with its database, showing continuity with Video 2.

### 6.2–9.5 seconds — Convert collected facts into recommendations

- The bots process the collected packets through visible sorting, grouping, or synthesis motions.
- Related facts connect into clusters such as business identity, audience, services, location, proof, and next step.
- A recommendation panel unfolds between the bots.
- Bullet points must be generated one by one from the bots' processed facts. They cannot already be present before processing.
- Each bullet should visibly travel out of a bot or synthesis mechanism and snap into the panel.

Use these readable recommendations:

- `Make the business and audience explicit.`
- `Answer service and location questions directly.`
- `Put proof beside every important claim.`
- `Give people and assistants one clear next step.`

- Briefly connect each recommendation back to the page element or data cluster that caused it.
- Use the process label `RECOMMEND` while bullets are being built.

### 9.5–11.0 seconds — Present the finished recommendations

- The four bullets settle into a clean, readable panel.
- The OpenAI and Claude bots stand beside it in the foreground.
- The Google/Search robot remains visible but secondary in the background.
- Show `RECOMMENDATIONS READY ✓`.
- End with the page and recommendation ecosystem arranged so it can slide right at the beginning of Video 4.

## Non-negotiable visible actions

- Both AI bots visibly enter the scene.
- They physically nudge the Google/Search robot and database into the background.
- The search robot remains present after being displaced.
- Data packets visibly travel from the page into the AI bots.
- The bots visibly process or group the data.
- Recommendations emerge one at a time as newly created bullet points.
- The bullets are legible and are presented as the result of the collection and analysis.

---

# Video 4 — The Fat Cat Finds Leaks and Puts the Money Back

## Purpose

Show a charming, prosperous fat cat finding website-related money leaks. Dollar signs evaporate out of the page, and the cat catches them with its bare paws and physically puts them back into its own pockets, representing savings recovered for the business owner.

## Character design

The cat should be:

- Round, substantial, expressive, and charming.
- Confident and prosperous, but not sinister or villainous.
- Stylized rather than photorealistic.
- Equipped with expressive eyes, whiskers, a large belly, and two clearly constructed garment pockets.
- Wearing a waistcoat, trousers, apron, or similar clothing that makes the pocket openings unmistakable.
- Using bare paws, not gloves, claws, tongs, or a machine, to catch the dollar signs.

Both pockets must begin visibly empty. They should have real openings and enough depth that a dollar sign can visibly enter and remain inside.

## Opening state

Begin with the page and the search/AI recommendation ecosystem from Video 3. Show small recurring-expense cards attached to or orbiting the page:

- `Unused plugin — $29/mo`
- `Duplicate tool — $18/mo`
- `Silent renewal — $49/yr`
- `Old service — $12/mo`

These cards should look like quiet leaks that have gone unnoticed, not dramatic alarms.

## Timeline

### 0.0–1.5 seconds — Establish the expensive page ecosystem

- Show the page, bots, recommendation panel, and recurring-expense cards.
- Small gold dollar signs or value particles are faintly visible inside the page near the expense cards, but they have not escaped yet.
- Introduce the service label `SAVINGS`.

### 1.5–3.2 seconds — The cat enters and clears the scene

- The fat cat walks in from the left side of the frame.
- Its body has real weight: belly, shoulders, whiskers, and clothing follow through slightly as it stops.
- As the cat enters, every element except the cat and the central page slides toward the right side of the frame.
- The search robot, database, OpenAI bot, Claude bot, and recommendation panel remain visible as a compressed group on the right, then become secondary.
- The final composition clearly gives the cat the left side and the page the center/right inspection area.
- The cat's pockets are visibly empty at this point.

### 3.2–5.8 seconds — Use the magnifying glass to find the leaks

- The cat produces a large physical magnifying glass.
- It grips the handle with one paw and slowly scans the page with the lens.
- The lens must enlarge or reveal details beneath it as it moves across expense cards and page modules.
- One leak after another becomes visible under the lens.
- Show labels such as `FOUND A LEAK` and `LEAK DETECTED` only after the lens reaches the relevant location.
- The cat's eyes track the lens and react when a leak is found.

### 5.8–8.2 seconds — Dollar signs evaporate and the cat catches them

- Gold dollar signs must visibly originate inside the page near the detected expense cards.
- They rise out of the page as though money is evaporating: solid at the source, then drifting upward with fading vapor-like particles.
- Make the signs large enough to track individually.
- The cat notices each escaping sign and releases or lowers the magnifying glass.
- It raises its bare paws into the dollar signs' paths.
- Each dollar sign must visibly collide with or settle into a paw instead of disappearing before contact.
- Show at least three distinct catches, with slight variation: one direct catch, one quick reach, and one two-paw save.
- After a catch, the sign pauses visibly in the cat's paw so the viewer knows it has been secured.

### 8.2–10.2 seconds — Put the recovered money into the pockets

- The cat closes its paws around the caught dollar signs without hiding the action completely.
- One paw at a time travels from the catch position down to a clearly visible pocket opening.
- The paw opens over or just inside the pocket.
- The dollar sign visibly leaves the paw, crosses the pocket opening, and settles inside the pocket.
- Repeat the complete action for the other caught signs.
- Do not teleport the signs, dissolve them, or imply storage with a sound or label.
- The pockets, which began empty, must visibly fill. Gold edges or the tops of the stored dollar signs may remain visible above the pocket line.
- The cat gives each pocket a small securing pat after placing the money inside.
- No leak may be marked sealed until its corresponding dollar sign has actually entered a pocket.

### 10.2–11.0 seconds — Confirm the savings

- The final escaping dollar sign enters the pocket.
- The relevant expense cards close, cancel, shrink, or receive a clear resolved state.
- Change `LEAK DETECTED` to `LEAK SEALED` only now.
- Show `SAVINGS FOUND ✓`.
- Use the closing line: `Keep more of what you earn.`
- The cat stands proudly beside the page with both paws visible and the recovered dollar signs visibly secured in its pockets.

## Non-negotiable visible actions

- The cat enters from the left.
- Everything except the cat and the page slides right.
- The cat uses a large magnifying glass to inspect the page.
- The magnifying glass visibly reveals specific money leaks.
- Dollar signs visibly originate from the page and evaporate upward.
- The cat catches the dollar signs with its bare paws.
- Each caught dollar sign pauses visibly in a paw.
- The cat moves each dollar sign to an initially empty pocket.
- Each sign visibly crosses the pocket opening and remains stored inside.
- The cat catches and pockets the money; no machine, caption, or off-screen event does it for the cat.
- The leak is marked sealed only after the money has been caught and pocketed.

---

## Continuity between videos

Design the transitions so concatenating the four MP4 files produces one continuous story:

- Video 1 ends and Video 2 begins with the same improved page in the same position.
- Video 2 ends and Video 3 begins with the same search robot and database composition.
- Video 3 ends with all page, robot, database, and AI elements positioned so Video 4 can slide them right.
- Maintain consistent scale, lighting, page design, camera height, and background grid.
- The shared progress indicator advances across the four films from stage 1 of 4 to stage 4 of 4.
- Each film still needs a clear beginning and resolution when watched independently.

## Suggested implementation structure

Organize the project approximately as follows, adjusting names if needed:

```text
src/
  app/
    preview.ts
    renderer.ts
  core/
    clock.ts
    easing.ts
    seededRandom.ts
    typography.ts
  components/
    WebsitePage.ts
    CopyInspection.ts
    DataPacket.ts
    SearchRobot.ts
    Database.ts
    AIBot.ts
    RecommendationPanel.ts
    SavingsCat.ts
    MagnifyingGlass.ts
    SharedFrame.ts
  scenes/
    PageReassemblyScene.ts
    SeoHarvestScene.ts
    AioRecommendationsScene.ts
    SavingsCatScene.ts
  timelines/
    pageReassemblyTimeline.ts
    seoHarvestTimeline.ts
    aioRecommendationsTimeline.ts
    savingsCatTimeline.ts
scripts/
  render-frames.ts
  encode-video.sh
  render-all.ts
```

The names are illustrative. Favor understandable scene state and deterministic animation over framework complexity.

## Rendering approach

- Render exactly 330 PNG frames for each video with Playwright or Puppeteer driving a fixed-size WebGL canvas.
- Advance by explicit frame number rather than wall-clock time.
- Encode frames with FFmpeg at exactly 30 fps.
- Concatenate the four encoded videos without dropping or duplicating frames.
- Verify each standalone file reports 11.0 seconds and the combined preview reports 44.0 seconds.
- Verify no browser chrome, cursor, debug controls, missing-glyph boxes, or loading flashes appear in rendered frames.

## Acceptance checklist

The work is complete only when all of the following are true:

- Four separate MP4 files exist and are exactly 11 seconds each.
- The combined preview is exactly 44 seconds.
- All videos use the same visual world and can be chained seamlessly.
- Video 1 visibly picks apart a web page, scrutinizes weak copy, rewrites it, and reassembles changed elements into a new structure.
- Video 2 visibly flips the page, reveals keywords, metadata, headings, links, and JSON code, then shows a large search robot harvesting the data and placing it into a database.
- Video 3 visibly brings OpenAI and Claude bots forward, has them nudge the search robot backward, collect page data themselves, and generate the four bullet recommendations one by one.
- Video 4 visibly brings in the fat cat from the left, slides the other elements right, finds leaks through a magnifying glass, catches evaporating dollar signs with bare paws, and physically places those signs into initially empty pockets.
- Important actions remain clear with audio muted.
- Important text is readable at normal speed.
- No key action is communicated only through a caption.
- The preview can be paused and scrubbed deterministically.
- Source, rendering scripts, stills, contact sheet, and README are included.
- No live website integration or deployment has been performed.

## Final creative standard

The result should make an ordinary business owner understand, without technical explanation, that Web By Elie:

1. examines and improves what a page says and how it is assembled;
2. exposes and organizes the hidden facts search engines need;
3. helps AI systems understand those facts and turn them into useful recommendations; and
4. finds money leaking from the website, catches it, and puts it safely back where it belongs.

Prioritize visual clarity, physical cause and effect, continuity, warmth, and a memorable touch of humor.
