---
name: Генокарта
description: A family-album report that sets inherited DNA risk beside the habits that move it.
colors:
  album-sage: "#e3e8e0"
  print-white: "#fbfbf8"
  print-well: "#eef1eb"
  scale-track: "#dce2d8"
  hairline: "#d3d9cf"
  control-edge: "#aeb7ab"
  row-rule: "#e6eae3"
  control-edge-hover: "#8f998c"
  graphite-ink: "#24272b"
  graphite-muted: "#4b5550"
  graphite-subtle: "#5e6762"
  ballpoint-blue: "#2b4c9b"
  on-ballpoint: "#ffffff"
  faded-green: "#3e7d63"
  faded-green-ink: "#2f6b52"
  ochre: "#b9822e"
  ochre-ink: "#865a14"
  madder: "#a8423a"
  madder-ink: "#963a32"
  dusty-rose: "#a85d6e"
  dusty-rose-ink: "#8e4a5a"
  risk-0-fill: "#93b6a6"
  risk-1-fill: "#ccdcd3"
  risk-2-fill: "#e7d7bb"
  risk-3-fill: "#e2c4bf"
  risk-4-fill: "#cb908a"
typography:
  display:
    fontFamily: "Manrope, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "clamp(2rem, 1.4rem + 2.2vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.06
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Manrope, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "clamp(1.75rem, 1.3rem + 1.6vw, 2.375rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Manrope, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  title-sm:
    fontFamily: "Manrope, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Manrope, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "Manrope, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Manrope, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
  tag:
    fontFamily: "Manrope, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.3
  data-focal:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "4rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontFeature: "tnum"
  data:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "tnum"
rounded:
  fine: "2px"
  print: "3px"
  control: "6px"
spacing:
  space-1: "4px"
  space-2: "8px"
  space-3: "12px"
  space-4: "16px"
  space-5: "24px"
  space-6: "32px"
  space-7: "48px"
  measure: "64ch"
components:
  button-primary:
    backgroundColor: "{colors.ballpoint-blue}"
    textColor: "{colors.on-ballpoint}"
    rounded: "{rounded.control}"
    padding: "9px 13px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.graphite-ink}"
    rounded: "{rounded.control}"
    padding: "9px 13px"
  button-secondary-hover:
    backgroundColor: "{colors.scale-track}"
  button-tertiary:
    backgroundColor: "transparent"
    textColor: "{colors.graphite-muted}"
    rounded: "{rounded.control}"
    padding: "9px 13px"
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.ballpoint-blue}"
    rounded: "{rounded.fine}"
    padding: "0"
    height: "24px"
  print:
    backgroundColor: "{colors.print-white}"
    textColor: "{colors.graphite-ink}"
    rounded: "{rounded.print}"
    padding: "{spacing.space-5}"
  print-well:
    backgroundColor: "{colors.print-well}"
    textColor: "{colors.graphite-ink}"
    rounded: "{rounded.print}"
    padding: "12px 16px"
  input:
    backgroundColor: "{colors.print-well}"
    textColor: "{colors.graphite-ink}"
    typography: "{typography.data}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
    height: "44px"
  choice:
    backgroundColor: "{colors.print-well}"
    textColor: "{colors.graphite-ink}"
    rounded: "{rounded.print}"
    padding: "11px 13px"
  choice-selected:
    backgroundColor: "{colors.print-white}"
    textColor: "{colors.graphite-ink}"
  strip-print:
    backgroundColor: "{colors.print-white}"
    textColor: "{colors.graphite-muted}"
    rounded: "{rounded.print}"
    padding: "12px 14px"
    height: "112px"
  strip-print-open:
    backgroundColor: "{colors.print-white}"
    textColor: "{colors.graphite-ink}"
  demo-tag:
    backgroundColor: "{colors.scale-track}"
    textColor: "{colors.graphite-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.print}"
    padding: "1px 8px"
  matrix-you-tag:
    backgroundColor: "{colors.graphite-ink}"
    textColor: "{colors.album-sage}"
    typography: "{typography.label}"
    rounded: "{rounded.fine}"
    padding: "1px 6px"
---

# Design System: Генокарта

## Overview

**Creative North Star: "The Family Album"**

Генокарта reads like a page from a Ukrainian home album. The ground is pale sage card stock; every block of content is a white print laid on it, lifted by a soft two-layer shadow instead of framed by a border. Text is graphite ink, and the one hand that writes on the page is a ballpoint pen in blue: captions, links, actions and the current selection. Data is coloured like a faded photo print, never like a warning light.

The report is a spread: one print split into what you inherited and what is yours, joined by a dashed lineage thread. Hierarchy comes from the type scale, not from boxes, so the page stays quiet even when the numbers are serious. Density is moderate: prints breathe at 24 to 32px inside and sit 16px apart, and long prose stops at 64 characters.

The system is light only. A print palette swaps the card stock for white paper and turns every lift shadow into a hairline so PDF pages keep their edges. It rejects the dark laboratory dashboard and the white hospital portal alike.

**Key Characteristics:**
- Sage card-stock ground with white prints lifted by shadow, not outlined.
- Ballpoint blue is the only accent and the only colour of interaction.
- Faded-print data colours; inherited-high risk is dusty rose, not alarm red.
- Manrope for all language, JetBrains Mono only for measured values.
- Statuses are coloured words, not badges.
- Every text pairing meets 4.5:1 on every surface it sits on.

## Colors

A soft, low-chroma album page: sage paper, white prints, graphite ink, one blue pen, and four faded photo tones for data.

### Primary
- **Ballpoint Blue** (#2b4c9b): the single accent. Captions on the spread, links, link-style actions in the report header, the solid primary button, the outline on the open strip print and the checked choice, the focus ring, and active navigation text. White on it measures 8:1. Its soft wash (8% alpha) marks the current questionnaire step, the drop-over state and the "changed" note on a factor.

### Secondary
- **Faded Green** (#3e7d63) with **Green Ink** (#2f6b52) for text: favourable lifestyle, low genetic percentile, full coverage, the privacy shield, the "report updated" note, and the what-if result line.
- **Ochre** (#b9822e) with **Ochre Ink** (#865a14) for text: intermediate category and "worth improving" factors; also the stale-report banner.
- **Madder** (#a8423a) with **Madder Ink** (#963a32) for text: unfavourable lifestyle, limited coverage and form errors. This is the colour of things the reader can change.

### Tertiary
- **Dusty Rose** (#a85d6e) with **Rose Ink** (#8e4a5a) for text: high genetic percentile only. Genes cannot be changed, so it reads as "raised", never as alarm. Fills (gauge, band) use the base tone; text always uses the ink tone.

### Neutral
- **Album Sage** (#e3e8e0): the page ground behind everything, and the sidebar, which lies directly on it.
- **Print White** (#fbfbf8): every panel, the open strip print, the active nav item, the checked choice.
- **Print Well** (#eef1eb): recesses inside a print: tiles, inputs, unchecked choices, the marker table, the dropzone.
- **Scale Track** (#dce2d8): gauge and meter tracks, hover fill for secondary buttons and choices, the neutral tag.
- **Hairline** (#d3d9cf), **Row Rule** (#e6eae3), **Control Edge** (#aeb7ab, hover #8f998c): the few lines the system keeps (see Shapes).
- **Graphite Ink** (#24272b): headings, body text, the "you are here" outline and tag in the matrix.
- **Graphite Muted** (#4b5550): explanatory prose and secondary labels.
- **Graphite Subtle** (#5e6762): hints, axis labels, receding strip numbers. It passes 4.5:1 on sage, white and well; it does not pass on Scale Track (4.43:1), so never set it there.

### Risk scale
The genes-by-lifestyle matrix uses five steps, each mixed in sRGB from a semantic colour into Print White, so they follow the palette into print: step 0 green 55%, step 1 green 25%, step 2 ochre 30%, step 3 madder 30%, step 4 madder 58%. Cell edges use the same hue at a higher share (75 / 45 / 55 / 55 / 85%). The frontmatter hex values are these mixes resolved; the `color-mix()` recipes in the stylesheet are the source.

### Named Rules
**The One Pen Rule.** Ballpoint Blue is the only colour that means "you can act here" or "this is selected". No second accent, no coloured buttons in data tones.

**The Ink-Tone Rule.** Every data colour has a base tone for fills and a darker ink tone for text. Text never uses the base tone; the ink tones are what clear 4.5:1.

**The Rose Is Not Red Rule.** High inherited risk is Dusty Rose. Madder is reserved for what the reader can change. The two are never swapped to make a result look more urgent.

## Typography

**Display Font:** Manrope (with system-ui, Segoe UI, Roboto, Arial)
**Body Font:** Manrope
**Label/Mono Font:** JetBrains Mono (with ui-monospace, Menlo, Consolas), only for measured data

**Character:** A warm, open grotesque carries every sentence and heading at weights 400 to 800; a monospaced face appears only where something was measured: percentiles, rsIDs, genotypes, counts, file names and the percentile scale. Both are bundled locally.

### Hierarchy
- **Display** (800, clamp 2rem to 3rem, 1.06): the home hero headline only, held to 17ch.
- **Headline** (800, clamp 1.75rem to 2.375rem, 1.15, -0.015em): the page title of each screen.
- **Title** (800, 1.375rem, 1.25): the heading of each half of the spread. **Title Small** (700, 1.25rem) for panel headings; h3 at 1.0625rem and h4 at 0.9375rem below that.
- **Body** (400, 1rem, 1.55): prose, capped at 64ch. **Body Small** (0.875rem) for supporting notes and hints; 0.8125rem for factor values and table notes.
- **Label** (600, 0.75rem): functional small text: matrix axes, table headers, file-fact terms, the "you are here" tag, the changed note. Nothing functional is smaller than this.
- **Tag** (0.6875rem): decorative or secondary marks only: rsIDs on the hero, the mono file name under a nav step, the narrow-screen matrix tag.
- **Data Focal** (JetBrains Mono 600, 4rem, 1, -0.03em, tabular): the single large percentile on the inherited half. Strip prints carry the same face at 2rem open and 1.25rem receding.
- **Data** (JetBrains Mono, tabular figures): the marker table at 0.8125rem; inline `.mono` text at 0.9375em of its context; gene names in mono italic.

### Named Rules
**The Measured Mono Rule.** JetBrains Mono is for values that came from a measurement or a file. Labels, headings and prose about those values stay in Manrope.

**The Two Small Sizes Rule.** Small text has exactly two roles: Label at 12px for anything a reader needs, Tag at 11px for what they can skip. No third size below body small.

**The Scale Over Boxes Rule.** A section earns emphasis by stepping up the type scale, not by gaining a frame, a fill or an icon tile.

## Layout

The shell is a two-column grid at 1080px and up: a 256px sidebar lying on the sage ground (sticky, step list on top, privacy note pinned at the bottom) and a fluid main column capped at 1240px. Below 1080px the sidebar becomes a top bar with horizontal steps; below 640px step icons drop away and each step is 44px tall so four fit in 343px without hidden scrolling.

Spacing runs on a 4px base: 4, 8, 12, 16, 24, 32, 48. Prints are 16px apart; prints pad 24px (16px under 600px); the spread and the hero pad 32px (48px for the hero from 900px). Prose stops at 64ch.

The report spread is one column with a horizontal dashed thread until 1180px, then two columns (1 : 1.1) with a vertical thread, and the inherited half sticks to the top while the habits half scrolls. In print it always returns to one column. The disease strip is a single scrolling row with proximity snap; under 560px the prints become fixed widths (132px, 176px open).

Grids use container and auto-fit queries where a panel, not the viewport, decides: the disease picker splits in two at a 500px container; choices auto-fit at 220px; coverage tiles at 124px.

## Elevation & Depth

Depth is physical: prints are lifted off the card stock by a soft two-layer shadow, a tight contact shadow plus a wide ambient one, both in graphite at low alpha. There are no borders around prints. Recesses inside a print are tonal (Print Well), never shadowed. A lifted print does not move; only its shadow and fill change.

### Shadow Vocabulary
- **Print** (`box-shadow: 0 1px 2px rgba(36, 39, 43, 0.1), 0 8px 20px rgba(36, 39, 43, 0.06)`): every panel at rest, the active nav step, a strip print on hover.
- **Print Lift** (`box-shadow: 0 2px 4px rgba(36, 39, 43, 0.12), 0 14px 30px rgba(36, 39, 43, 0.1)`): the open disease print only.
- **Paper** (print media: both shadows become `0 0 0 1px #d3d9cf`): on paper, prints keep a hairline edge so blocks do not merge.

### Named Rules
**The Lift, Not Line Rule.** A print is separated from the page by shadow alone. If a container needs a border on screen, it is a control or a recess, not a print.

**The One Lifted Print Rule.** Only one element at a time wears Print Lift: the disease the reader has open.

## Shapes

Corners are nearly square, like trimmed photo prints: 3px on prints, tiles, choices and the strip; 6px on buttons and inputs, which are the only things meant to be pressed or typed into; 2px on the finest marks (matrix cells, the matrix tag, step numbers, slider thumb). Nothing is a pill and nothing is fully round.

Lines survive only where they do a job. Controls carry a 1px Control Edge (inputs, secondary buttons, the gauge track). Row Rules divide list rows (steps, factors, table rows). Hairlines divide sections inside one print (coverage, markers, the next-steps checkup, the questionnaire footer). The dropzone and the lineage thread are dashed: the thread at 1.5px Control Edge, the dropzone at 1px.

## Components

### Buttons
Quiet and square-shouldered; the report's own actions are written in pen rather than boxed.
- **Shape:** gently squared (6px), 1px border slot always present.
- **Primary:** solid Ballpoint Blue with white text, weight 600, 14px; sizes from xs (5px 9px) to xl (11px 17px), md (9px 13px) by default.
- **Secondary:** transparent with a Control Edge border and graphite text; hover fills Scale Track and darkens the edge.
- **Tertiary:** borderless muted text; hover fills Scale Track.
- **Link:** no box, Ballpoint Blue (or muted) text, underline fades in on hover; at least 24px tall. Report header actions (save PDF, change answers, start over) are link buttons with icons, spaced 12px by 24px.
- **Focus / Disabled:** 2px Ballpoint Blue ring at 2px offset; disabled at 45% opacity. On coarse pointers every button is at least 44px tall.
- **Loading:** a spinner replaces the label; under reduced motion it keeps turning at half speed, the one animation exempt from the reduced-motion reset.

### Prints and wells
- **Print:** Print White, 3px corners, Print shadow, 24px padding (16px under 600px), no border.
- **Well:** Print Well tile, 3px, 12px by 16px, no border or shadow; used for coverage figures and other grouped facts inside a print.
- **Next steps:** a print washed with 5% Faded Green; its checkup line is set off by a hairline.

### Inputs and choices
- **Input:** Print Well with Control Edge, 6px, 44px tall, mono 16px value; focus turns the edge blue with a 2px translucent blue ring; invalid turns the edge madder.
- **Choice (radio/checkbox card):** Print Well with a hairline, 3px; hover fills Scale Track. Checked becomes a white print outlined in Ballpoint Blue (1px border plus 1px inset). Focus rings the whole card.
- **Disease choice:** checked shows only the blue title and icon, no outline, so a full selection does not turn the list into a blue field.
- **Slider:** 6px Scale Track bar, a 12 by 22px blue thumb with 2px corners, value in a blue-washed mono readout.

### Navigation
The step rail lies on the sage ground with no frame. Each step is muted text with a subtle icon and a 12px status line; hover gives a half-transparent white wash. The current step is a lifted white print with ink label and blue icon and status. On tablet it becomes a horizontal top bar without status lines; on phones icons drop and targets are 44px.

### Questionnaire steps
A segmented row of four in a Print Well tray. Done steps get a green check in a 2px-cornered number box; the current step gets a blue wash and blue-edged number; under 760px only the current step shows its name and the rest keep it for screen readers.

### Disease strip (signature)
A single row of small prints, one per disease, each with its name and its percentile in mono. Receding prints are half-transparent white (55%) on the sage, muted text, a 1.25rem graphite number. The open print grows (flex 1.7), turns solid white, takes Print Lift and a 2px Ballpoint Blue outline at 3px offset, sets its name at 16px/800 and its number at 2rem in the status ink tone. Long names break only at the soft hyphens the app inserts, with `hyphens: manual`. Width and colour transitions run 0.15 to 0.2s ease-out.

### The spread (signature)
One print in two halves: inherited (caption, title, explanation, focal percentile with its meaning in words, the gauge) and yours (caption, title with the lifestyle category as coloured text, factor list, matrix, what-if, source). The halves are joined by a 1.5px dashed lineage thread in Control Edge: vertical beside each other, horizontal when stacked and on paper. Each half opens with a short Ballpoint Blue caption (14px/700) naming the half; the title tucks 12px up beneath it.

### Percentile gauge
A 10px Scale Track bar with a Control Edge, filled at 85% in the category colour (green, ochre or rose), crossed by a graphite cursor that overshoots the track by 8px with short crossbars. Beneath it, a three-part band (20 / 60 / 20), mono tick labels at Label size, and zone names where the reader's zone turns ink.

### Factor list and statuses
Rows divided by Row Rules: a 28px icon box tinted green (met) or ochre (worth improving), name, value in muted 13px, and the status as bold coloured words aligned right (wrapping under the name below 480px). A factor changed since the report was built carries a small blue-washed "changed" note.

### Risk matrix
A 3 by 3 table with 4px gaps, cells 56px tall (48px under 420px) filled from the risk scale with same-hue edges and 2px corners. The reader's cell gets a 2px graphite outline and a graphite "you are here" tag in sage text; a what-if scenario cell gets a dashed green outline and a green tag. A five-step legend runs below.

### Notices and banners
- **Notice:** no box at all: muted text with a blue info icon, written straight on the page like a pencilled note.
- **Stale banner:** the one boxed warning: Ochre edge on a 7% ochre wash, ochre icon, ink emphasis, with its actions inside.
- **Update note:** a single line of green ink with a check icon.

### Technical details
A collapsed print whose summary row (48px) carries a rotating chevron, the title, the coverage verdict as coloured text and a muted hint. Open, it reveals coverage tiles and the marker table under a hairline.

### Marker table
A recessed Print Well block, mono 13px, Row Rules between rows, rsIDs in Ballpoint Blue, genotypes in a small white box with the effect allele in bold ink, protective contributions in green. Sort buttons are at least 24px (44px on coarse pointers).

### Neutral tag
The one remaining badge: Scale Track fill, Control Edge, muted 12px/600 text with a small square bullet. It marks example content ("example, not from your file") and nothing else.

## Do's and Don'ts

### Do:
- **Do** separate every print from the sage ground with the Print shadow, and give only the open disease print Print Lift.
- **Do** write status as bold coloured words in the ink tone (Green Ink, Ochre Ink, Madder Ink, Rose Ink), next to the thing it describes.
- **Do** use Ballpoint Blue for every link, action, caption, focus ring and selection, and never as a data colour.
- **Do** set percentiles, rsIDs, genotypes, counts and file names in JetBrains Mono with tabular figures, and everything else in Manrope.
- **Do** keep functional small text at 12px (Label) and reserve 11px (Tag) for skippable marks.
- **Do** keep targets at least 24px everywhere and 44px on coarse pointers.
- **Do** derive any new risk or data tint with `color-mix()` from the semantic colours into Print White, so print mode follows.
- **Do** check each new text pairing at 4.5:1 against the surface it actually sits on, including Scale Track.

### Don't:
- **Don't** outline a print with a border on screen; borders belong to controls, recesses and row dividers.
- **Don't** wrap statuses in coloured chips or pills; the neutral tag is only for marking example content.
- **Don't** use red or madder for high genetic risk; it is Dusty Rose.
- **Don't** introduce a dark theme or a second accent colour.
- **Don't** use JetBrains Mono for headings, labels or prose.
- **Don't** round corners past 6px or use pill shapes.
- **Don't** add a caption above headings outside the two halves of the spread; elsewhere the type scale carries the hierarchy.
