# Tuning

Round 2 (after the first playtest) is at the end of this file; round 1 follows for the record.

Results of the simulation harness (`sim/run.js`) and the configurations
chosen for the three tiers. Bots measure challenge, not fun; the human
playtest checkpoints cover fun.

How to read the numbers:

- **Random** plays a random legal card on a random legal target. It is the floor.
- **Greedy** plays whatever most increases the largest color's share, judging
  luck cards by the average of four sampled rolls. It stands in for a casual
  player thinking one move ahead.
- **Lookahead** is a two-ply search with a heuristic (largest share, colors
  left, same-color adjacency). It stands in for a thoughtful player.
- **Solver** is the beam search that verifies every board, deterministic cards only.
- **Greedy trap rate** is the share of puzzles Greedy loses but the Solver
  wins, the direct measure of whether card order matters.
- **Shortest win / k** is the solver's shortest winning line against the
  constructed solution length. A big gap means the dealt hand allows much
  shorter wins than the puzzle was built around.
- **Solver gap** (`maxSolverShortcut`) is a generator knob added during tuning:
  reject a board when the solver's shortest win is more than this many cards
  under k.

Stars: a win is 1 star; 2 stars needs at least half of par (rounded up) left
over; 3 stars needs par or better, where par is the solver's best leftover
count on that board.

## Starting targets (from the plan, medium tier)

| Measure | Target |
| --- | --- |
| Random bot win rate | Under 2% |
| Greedy bot win rate | 25% to 45% |
| Lookahead bot win rate | 60% to 80% |
| Solver win rate | 100% |
| Greedy bot 3-star rate | Under 10% |
| Every card type in winning lines | At least 5% of puzzles where it is dealt |

## Sweep (400 puzzles per configuration)

| Config | What changed | Random win | Greedy win | Greedy 3★ | Lookahead win | Solver win | Trap rate | Shortest win / k | Gen ms | Attempts |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| easy | plan start: 5x5, 4 colors, hand 10, k 5, luck 1 | 1% | 92% | 33% | 99% | 100% | 8% | 3.9 / 5 | 65 | 9 |
| medium | plan start: 5x5, 5 colors, hand 10, k 7, luck 1-2 | 2% | 56% | 19% | 89% | 100% | 44% | 4.2 / 7 | 113 | 8 |
| hard | plan start: 6x6, 6 colors, hand 11, k 8, luck 2 | 0% | 56% | 14% | 88% | 100% | 44% | 4.7 / 8 | 310 | 4 |
| med-k6 | medium, k 6 | 0% | 69% | 17% | 92% | 100% | 31% | 4.2 / 6 | 83 | 9 |
| med-k8 | medium, k 8 | 1% | 50% | 19% | 90% | 100% | 50% | 4.2 / 8 | 125 | 5 |
| med-k9 | medium, k 9, luck 1 | 1% | 32% | 9% | 86% | 100% | 68% | 4.1 / 9 | 161 | 5 |
| med-hand9 | medium, hand 9 | 1% | 50% | 15% | 85% | 100% | 50% | 4.0 / 7 | 90 | 5 |
| med-hand11 | medium, hand 11 | 1% | 61% | 20% | 92% | 100% | 39% | 4.3 / 7 | 117 | 14 |
| med-t0 | medium, no Transmute | 0% | 54% | 17% | 91% | 100% | 46% | 4.2 / 7 | 109 | 8 |
| med-t2 | medium, up to 2 Transmutes | 2% | 57% | 22% | 87% | 100% | 43% | 4.2 / 7 | 106 | 7 |
| med-lock0 | medium, no locked cards | 0% | 64% | 20% | 95% | 100% | 36% | 4.2 / 7 | 162 | 22 |
| med-lock6 | medium, 60% locked | 1% | 45% | 14% | 86% | 100% | 55% | 4.1 / 7 | 99 | 5 |
| med-luck0 | medium, no luck cards | 0% | 20% | 0% | 83% | 100% | 80% | 4.3 / 7 | 145 | 18 |
| med-luck2 | medium, 2 luck cards | 2% | 68% | 24% | 88% | 100% | 32% | 4.2 / 7 | 114 | 6 |
| med-6col | medium, 6 colors | 1% | 56% | 14% | 91% | 100% | 44% | 4.2 / 7 | 115 | 7 |
| med-shortcut1 | medium, Greedy may win 1 card early | 0% | 66% | 20% | 92% | 100% | 34% | 4.3 / 7 | 104 | 5 |
| med-nosetup | medium, no Slide/Trade/Swap, Mirror rare | 1% | 74% | 24% | 94% | 100% | 26% | 4.7 / 7 | 67 | 26 |
| med-lowpaint | medium, paint and Transmute weights halved | 1% | 55% | 14% | 89% | 100% | 45% | 4.0 / 7 | 124 | 9 |
| med-share40 | medium, start share cap 40% | 1% | 54% | 14% | 89% | 100% | 46% | 4.3 / 7 | 112 | 10 |
| med-k8-hand10-luck1 | medium, k 8, luck 1 | 1% | 41% | 13% | 87% | 100% | 59% | 4.3 / 8 | 140 | 7 |
| med-tight | medium, k 8, luck 1, share 40%, no Transmute | 0% | 42% | 12% | 86% | 100% | 58% | 4.2 / 8 | 130 | 7 |
| med-gap2 | medium, solver gap ≤ 2 | 0% | 48% | 26% | 83% | 100% | 52% | 5.4 / 7 | 244 | 18 |
| med-gap1 | medium, solver gap ≤ 1 | 0% | 53% | 42% | 76% | 100% | 47% | 6.2 / 7 | 747 | 56 |
| med-gap2-luck1 | medium, gap ≤ 2, luck 1 | 0% | 41% | 24% | 76% | 100% | 59% | 5.4 / 7 | 285 | 23 |
| med-A | medium, k 8, luck 1, gap ≤ 2 | 0% | 33% | 22% | 66% | 100% | 67% | 6.2 / 8 | 786 | 39 |
| med-B | **chosen medium**: k 8, luck 1, gap ≤ 3 | 0% | 36% | 22% | 75% | 100% | 64% | 5.4 / 8 | 304 | 15 |
| med-C | medium, k 9, luck 1, gap ≤ 3 | 0% | 33% | 26% | 66% | 100% | 67% | 6.2 / 9 | 1031 | 31 |
| med-D | medium, k 8, luck 1-2, gap ≤ 2, no Transmute | 0% | 48% | 38% | 74% | 100% | 52% | 6.1 / 8 | 870 | 32 |
| med-E | medium, k 8, luck 1, gap ≤ 2, 50% locked | 0% | 27% | 18% | 60% | 100% | 73% | 6.2 / 8 | 705 | 29 |
| easy-gap2 | **chosen easy**: plan start plus gap ≤ 2 | 2% | 91% | 29% | 98% | 100% | 9% | 4.0 / 5 | 69 | 10 |
| hard-gap2 | hard, gap ≤ 2 | 0% | 52% | 31% | 75% | 100% | 48% | 6.5 / 8 | 1240 | 17 |
| hard-gap3 | hard, gap ≤ 3 | 0% | 48% | 24% | 81% | 100% | 52% | 5.8 / 8 | 634 | 9 |
| hard-A | hard, k 9, luck 2, gap ≤ 3 | 0% | 50% | 31% | 74% | 100% | 50% | 6.5 / 9 | 1264 | 10 |
| hard-B | **chosen hard**: k 9, luck 1, gap ≤ 3 | 0% | 30% | 17% | 66% | 100% | 70% | 6.5 / 9 | 1247 | 14 |

### What the sweep says

1. **The plan's starting values are too easy for a thoughtful player.** With
   the plan's medium settings Lookahead wins 89% and the solver's shortest win
   is 4.2 cards against a constructed line of 7. The constructed line is
   almost never the best line: the decoy and solution cards together allow a
   4-card win on nearly every board, so k barely binds. Changing k alone
   (6, 8, 9) leaves the shortest win at about 4.2 cards.
2. **The solver gap knob is what makes k matter.** Rejecting boards whose
   shortest win is more than 3 cards under k lifts the shortest win from 4.2
   to 5.4 cards on medium, drops Lookahead from 89% to 75% and puts Greedy at
   36%. A gap of 2 is tighter still (Lookahead 66%) but costs 2 to 3 times the
   generation time because 97% of candidates are rejected.
3. **Luck cards are the biggest single lever on Greedy.** Medium with no luck
   cards: Greedy 20%. With two: Greedy 68%. Wild Transmute is effectively a
   free Transmute and Lucky Line a free line paint, and Greedy's sampled
   expectation finds them. One luck card per hand is the chosen value on every
   tier.
4. **Transmute is the strongest card but the cap already contains it.** At the
   cap of one per hand on medium, Transmute appears in 85 to 99% of solver wins
   when dealt. Removing it (`med-t0`) or allowing two (`med-t2`) moves the bot
   win rates by only a few points because the cap keeps it rare (dealt in
   about 20% of hands).
5. **Locked cards make hands harder, as intended.** 0% locked: Greedy 64%,
   Lookahead 95%. 60% locked: Greedy 45%, Lookahead 86%. The chosen tiers keep
   30 to 35%.
6. **Greedy's 3-star rate cannot reach the under-10% target together with the
   Lookahead band.** Par is the solver's best leftover count. The gap rule
   makes par tight (close to k), so when Greedy does win it usually wins at par.
   Across the sweep, every configuration with Lookahead in 60 to 80% has a
   Greedy 3-star rate of 17 to 42%. Configurations with Greedy 3-star under
   10% (`med-k9`, `med-luck0`) have Lookahead above 80%. This target needs a
   decision: either accept about 20%, or change the star rule (for example
   3 stars only when the player beats par's half-way point by more than one
   card).

### Card findings

Share of puzzles where the card is dealt in which it appears in the solver's
winning line (deterministic cards) or in Lookahead's winning line (luck
cards), chosen medium configuration:

| Card | In solver wins | In Lookahead wins | Verdict |
| --- | --- | --- | --- |
| Row Paint, Column Paint, Diagonal Paint | 86 to 97% | 52 to 66% | Core finishers |
| Transmute | 99% | 68% | Strongest card, cap of one per hand holds |
| Flood | 93% | 72% | Core |
| Stamp | 94% | 66% | Core |
| Majority Rule | 96% | 72% | Core |
| Mirror | 100% | 78% | Strong but rarely dealt (weight 0.6) |
| Spread | 100% when dealt, but dealt in only 2% of hands | 89% | **Too strong late**: Spread on a large group paints its whole fringe, so almost every hand containing it fails the solver-gap check. Under the plan's settings (no gap rule) it was dealt in 41% of hands and used in 100% of solver wins |
| Trade | 22% | 20% | Setup card, lives |
| Color Swap | 8% | 7% | Marginal |
| Slide | 6% | 6% | Marginal, just at the floor |
| Scatter | – | 61% | Lives |
| Wild Transmute | – | 84% | Strongest luck card |
| Lucky Line | – | 17% | Lives |
| Tumble | – | 4% | **Dead weight** for every bot |

Without the gap rule the setup cards are nearly dead (Slide 2%, Trade 11%,
Color Swap 7% on the plan's medium settings). The tighter the puzzle, the more
the setup cards appear: at gap ≤ 1 Trade reaches 45% and Color Swap 31%.

No card has been cut or renamed in this build. Recommendations for the
checkpoint are in the report.

### Generation cost

The chosen configurations reject 93 to 96% of candidate boards (mostly
because Greedy finds a shortcut, then the solver-gap rule). On this machine
that is 300 ms per medium puzzle and about 1 s per hard puzzle, far over the
300 ms phone budget. The browser therefore uses the seed pack
(`data/seedpack.js`, written by the final run): each entry is the accepted
candidate's sub-seed plus the solver's par, so the device only replays the
backward construction (a few milliseconds) and never runs the solver. Full
on-device generation remains as the fallback when a tier has no pack
entries or a seed is typed in.

## Chosen tiers

| Tier | Grid | Colors | Hand | k | Luck cards | Max Transmutes | Locked ratio | Solver gap |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Easy | 5x5 | 4 | 10 | 5 | 1 | 1 | 0.30 | ≤ 2 |
| Medium | 5x5 | 5 | 10 | 8 | 1 | 1 | 0.30 | ≤ 3 |
| Hard | 6x6 | 6 | 11 | 9 | 1 | 2 | 0.35 | ≤ 3 |

Easy keeps the plan's values (Greedy 91%, Lookahead 99%): it is meant to be
won by a casual player, and the gap rule changes almost nothing there.

## Final run (2,000 puzzles per tier)

### easy (n=2000)

Grid 5x5, 4 colors, hand 10, k 5, luck [1,1], max Transmutes 1, locked ratio 0.3, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 1.7% | 98.4% | 1.3% | 0.4% | 0.0% | 0.02 | 9.8 | 1 |
| greedy | 92.0% | 8.1% | 0.9% | 58.9% | 32.1% | 2.15 | 5.2 | 2 |
| greedyDet | 86.9% | 13.1% | 1.1% | 64.2% | 21.6% | 1.94 | 5.5 | 1 |
| lookahead | 98.1% | 1.9% | 0.1% | 20.4% | 77.6% | 2.74 | 4.2 | 38 |
| lookaheadDet | 97.1% | 2.9% | 0.1% | 22.3% | 74.8% | 2.69 | 4.3 | 10 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 4.0 | 51 |

Greedy trap rate 8.1% · for Greedy +0.21 stars · for Lookahead +0.05 stars · winning lines found (capped) 26.3 · shortest win 3.99 cards (constructed k 5.0, par 6.01 left)

Generation: 9.7 attempts/puzzle (rejection 89.7%: greedy_shortcut 9952, big_share 7355, unverified 19, solver_shortcut 94, few_colors 36), 61 ms mean, 641 ms max, 1.9 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 62.5% | 58.6% | 66.4% | 60.0% | 66.4% |
| colPaint | 61.5% | 57.2% | 64.4% | 58.2% | 64.4% |
| diagPaint | 59.2% | 46.9% | 49.2% | 47.7% | 49.2% |
| transmute | 21.9% | 87.5% | 83.4% | 89.3% | 83.4% |
| colorSwap | 42.1% | 0.9% | 1.3% | 1.0% | 1.3% |
| flood | 60.5% | 69.1% | 69.3% | 69.7% | 69.3% |
| spread | 31.1% | 99.8% | 100.0% | 99.8% | 100.0% |
| stamp | 79.8% | 62.8% | 67.8% | 63.9% | 67.8% |
| majority | 68.2% | 63.8% | 68.2% | 65.0% | 68.2% |
| slide | 48.4% | 0.8% | 0.6% | 0.8% | 0.6% |
| trade | 46.6% | 2.9% | 1.7% | 3.0% | 1.7% |
| mirror | 26.8% | 82.8% | 88.4% | 83.9% | 88.4% |
| scatter | 25.1% | 41.1% | 0.0% | 41.6% | 0.0% |
| wildTransmute | 24.9% | 80.2% | 0.0% | 82.5% | 0.0% |
| luckyLine | 25.1% | 7.8% | 0.0% | 7.9% | 0.0% |
| tumble | 24.9% | 0.2% | 0.0% | 0.2% | 0.0% |

### medium (n=2000)

Grid 5x5, 5 colors, hand 10, k 8, luck [1,1], max Transmutes 1, locked ratio 0.3, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.1% | 99.9% | 0.1% | 0.1% | 0.0% | 0.00 | 9.9 | 1 |
| greedy | 37.5% | 62.5% | 2.7% | 12.4% | 22.4% | 0.95 | 7.7 | 3 |
| greedyDet | 4.2% | 95.8% | 2.5% | 1.5% | 0.1% | 0.06 | 8.0 | 2 |
| lookahead | 77.2% | 22.8% | 1.3% | 22.6% | 53.3% | 2.06 | 6.2 | 61 |
| lookaheadDet | 63.5% | 36.5% | 0.8% | 18.4% | 44.3% | 1.70 | 6.4 | 16 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 5.4 | 106 |

Greedy trap rate 62.5% · for Greedy +0.89 stars · for Lookahead +0.36 stars · winning lines found (capped) 17.0 · shortest win 5.42 cards (constructed k 8.0, par 4.58 left)

Generation: 14.9 attempts/puzzle (rejection 93.3%: greedy_shortcut 21728, big_share 2545, solver_shortcut 2448, unverified 979, few_colors 57), 290 ms mean, 2924 ms max, 2.1 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 47.6% | 64.6% | 91.0% | 84.7% | 91.0% |
| colPaint | 47.7% | 67.0% | 92.6% | 86.1% | 92.6% |
| diagPaint | 55.2% | 59.0% | 86.1% | 76.4% | 86.1% |
| transmute | 19.5% | 72.3% | 92.6% | 94.0% | 92.6% |
| colorSwap | 66.1% | 7.6% | 8.6% | 9.8% | 8.6% |
| flood | 79.5% | 70.1% | 92.1% | 89.1% | 92.1% |
| spread | 2.6% | 92.5% | 100.0% | 100.0% | 100.0% |
| stamp | 75.4% | 68.2% | 96.1% | 88.2% | 96.1% |
| majority | 56.1% | 72.2% | 97.2% | 92.9% | 97.2% |
| slide | 70.1% | 5.3% | 6.0% | 7.0% | 6.0% |
| trade | 68.4% | 22.9% | 19.4% | 29.0% | 19.4% |
| mirror | 11.1% | 74.3% | 100.0% | 98.8% | 100.0% |
| scatter | 23.6% | 66.2% | 0.0% | 77.9% | 0.0% |
| wildTransmute | 25.6% | 79.3% | 0.0% | 92.7% | 0.0% |
| luckyLine | 25.0% | 17.6% | 0.0% | 24.9% | 0.0% |
| tumble | 25.8% | 3.9% | 0.0% | 5.7% | 0.0% |

### hard (n=2000)

Grid 6x6, 6 colors, hand 11, k 9, luck [1,1], max Transmutes 2, locked ratio 0.35, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.0% | 100.0% | 0.0% | 0.0% | 0.0% | 0.00 | 10.9 | 2 |
| greedy | 30.0% | 70.0% | 2.2% | 9.8% | 18.0% | 0.76 | 8.9 | 8 |
| greedyDet | 2.4% | 97.7% | 1.3% | 1.1% | 0.0% | 0.03 | 8.9 | 6 |
| lookahead | 67.5% | 32.5% | 1.2% | 18.2% | 48.1% | 1.82 | 7.4 | 186 |
| lookaheadDet | 56.7% | 43.3% | 0.3% | 12.8% | 43.7% | 1.57 | 7.4 | 45 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 6.6 | 342 |

Greedy trap rate 70.0% · for Greedy +0.72 stars · for Lookahead +0.25 stars · winning lines found (capped) 19.3 · shortest win 6.60 cards (constructed k 9.0, par 4.40 left)

Generation: 12.9 attempts/puzzle (rejection 92.3%: greedy_shortcut 16064, big_share 2451, unverified 1746, solver_shortcut 3486, few_colors 110), 1182 ms mean, 7193 ms max, 2.5 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 46.3% | 59.5% | 94.4% | 88.9% | 94.4% |
| colPaint | 47.0% | 58.1% | 92.1% | 88.5% | 92.1% |
| diagPaint | 62.6% | 53.8% | 88.5% | 79.0% | 88.5% |
| transmute | 22.4% | 62.4% | 94.9% | 94.3% | 94.9% |
| colorSwap | 65.6% | 5.2% | 10.4% | 7.7% | 10.4% |
| flood | 87.1% | 61.5% | 94.2% | 90.1% | 94.2% |
| spread | 7.9% | 88.0% | 100.0% | 100.0% | 100.0% |
| stamp | 85.4% | 59.1% | 95.7% | 87.1% | 95.7% |
| majority | 61.4% | 65.3% | 98.8% | 95.7% | 98.8% |
| slide | 66.8% | 4.9% | 5.6% | 7.3% | 5.6% |
| trade | 67.3% | 19.4% | 25.6% | 27.9% | 25.6% |
| mirror | 11.7% | 71.4% | 100.0% | 99.4% | 100.0% |
| scatter | 25.9% | 57.0% | 0.0% | 75.7% | 0.0% |
| wildTransmute | 24.6% | 67.7% | 0.0% | 90.2% | 0.0% |
| luckyLine | 24.1% | 14.6% | 0.0% | 24.0% | 0.0% |
| tumble | 25.4% | 3.0% | 0.0% | 5.0% | 0.0% |


## Expected-value solver and winning-line counts (500 puzzles per tier)

The expected-value solver may play luck cards when the sampled expectation
beats the certain deterministic line. It never does on a verified board: par
is defined by the deterministic solver's own best line, so a 3-star certain
outcome is always available to it and a gamble cannot improve on it. The
plan's "luck card value" is therefore zero for the EV solver on every tier,
and the useful measure of luck is the gain for the weaker bots, reported in
the final tables above (Greedy +0.21 / +0.89 / +0.72 stars and Lookahead
+0.05 / +0.36 / +0.25 stars on easy / medium / hard).

| Tier | Solver shortest win | Distinct winning lines found (cap 50, full-depth search) |
| --- | --- | --- |
| Easy | 4.0 cards | 49.4 |
| Medium | 5.5 cards | 38.0 |
| Hard | 6.7 cards | 37.8 |

Every tier has many distinct winning lines; the challenge is finding one, not
the uniqueness of the solution.

## Targets versus result

| Measure | Target | Easy | Medium | Hard |
| --- | --- | --- | --- | --- |
| Random win rate | under 2% | 1.7% | 0.1% | 0.0% |
| Greedy win rate | 25% to 45% (medium) | 92% | 37.5% | 30.0% |
| Lookahead win rate | 60% to 80% (medium) | 98% | 77.2% | 67.5% |
| Solver win rate | 100% | 100% | 100% | 100% |
| Greedy 3-star rate | under 10% | 32% | 22.4% | 18.0% |
| Every card in winning lines ≥ 5% of deals | all cards | Color Swap 1%, Slide 1%, Trade 2%, Tumble 0% miss | Tumble 4% misses; Slide 6% at the floor | Tumble 3% misses |

Easy is deliberately outside the medium bands. Medium and hard meet the win
rate bands and miss the Greedy 3-star target for the reason given under
"What the sweep says", point 6.

---

# Round 2: after the first playtest

Changes before this round: 8 new cards (Group Paint, Corners, Row Mirror,
Column Mirror, Minority Rule, Cross, Purge, Quadrants), Slide moves any
number of steps, Color Swap swaps two groups instead of two colors, Spread is
limited to groups of 8 or fewer, any palette color can be chosen for a paint,
no card type repeats in a hand (one wild/locked pair allowed), and Hard deals
10 cards like the other tiers.

The new goal from the playtest: no 4-card pars; easy around 6; on medium and
hard a good player should need 7 to 8 cards with a real chance of losing. Par
is now shown as cards played (the solver's shortest win).

## Round 2 sweep (300 puzzles each)

| Config | k | Solver gap | Par (cards) | Greedy win | Lookahead win | Gen ms |
| --- | --- | --- | --- | --- | --- | --- |
| easy-p6 (**chosen easy**) | 6 | ≤ 1 | 5.2 | 64% | 90% | 154 |
| easy-p6b | 6 | ≤ 2 | 4.4 | 62% | 95% | 55 |
| easy-p7 | 7 | ≤ 1 | 6.1 | 34% | 70% | 1118 |
| med-p8 (**chosen medium**) | 8 | ≤ 1 | 7.4 | 24% | 61% | 4651 |
| med-p8b | 8 | ≤ 2 | 6.1 | 31% | 73% | 513 |
| med-p9 | 9 | ≤ 2 | 7.3 | 17% | 61% | 4830 |
| hard-p9 (gap ≤ 1) | 9 | ≤ 1 | aborted: about 11 s per puzzle | | | |

Hard was set to k 9 with gap ≤ 2 without a separate sweep; the final run
below is its measurement.

## Chosen tiers

| Tier | Grid | Colors | Hand | k | Luck | Max Transmutes | Locked ratio | Solver gap |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Easy | 5x5 | 4 | 10 | 6 | 1 | 1 | 0.30 | ≤ 1 |
| Medium | 5x5 | 5 | 10 | 8 | 1 | 1 | 0.30 | ≤ 1 |
| Hard | 6x6 | 6 | 10 | 9 | 1 | 2 | 0.35 | ≤ 2 |

## Round 2 final run (1,000 puzzles per tier)

| Tier | Par (cards) | Greedy win | Greedy 3★ | Lookahead win | Lookahead 3★ | Solver | Gen ms |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Easy | 5.1 | 61% | 26% | 89% | 65% | 100% | 166 |
| Medium | 7.4 | 20% | 12% | 60% | 53% | 100% | 4812 |
| Hard | 7.2 | 15% | 11% | 48% | 35% | 100% | 1566 |

Findings:

1. Pars now sit where asked: easy 5 to 6, medium 7 to 8, hard 7 to 9. A
   thoughtful player (Lookahead) loses 40% of medium and 52% of hard puzzles.
   Hard may be a step too far; moving its gap to ≤ 1 would push par to 8 to 9
   at about 11 s of generation per puzzle.
2. Without the luck card, Greedy wins 7% of medium and 1% of hard puzzles. On
   easy the luck card is worth +0.6 stars to Greedy.
3. New cards that work: Cross, Minority Rule, Purge, Corners and Group Paint
   all appear in 84 to 100% of solver wins when dealt. Color Swap as a
   group swap went from 8% to 92% of solver wins on hard. Slide with any
   number of steps went from 6% to 30%. Trade is at 55%.
4. Still weak: Row Mirror and Column Mirror (5 to 8% of solver wins on hard),
   Tumble (5 to 14% of Lookahead wins) and Quadrants (3 to 8%).
5. Mirror is almost never dealt on hard (1.9%): its inverse needs a symmetric
   board and the tight gap rule rejects most hands that contain it.
6. Medium generation costs 4.8 s per puzzle (99.5% of candidates rejected),
   so the seed pack is now the only practical source on a phone.

### easy (n=1000)

Grid 5x5, 4 colors, hand 10, k 6, luck [1,1], max Transmutes 1, locked ratio 0.3, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.4% | 99.6% | 0.3% | 0.1% | 0.0% | 0.01 | 10.0 | 1 |
| greedy | 61.2% | 38.8% | 11.0% | 24.2% | 26.0% | 1.37 | 7.5 | 2 |
| greedyDet | 42.7% | 57.3% | 11.6% | 30.3% | 0.8% | 0.75 | 7.9 | 1 |
| lookahead | 89.0% | 11.0% | 1.5% | 22.1% | 65.4% | 2.42 | 5.7 | 35 |
| lookaheadDet | 82.7% | 17.3% | 0.9% | 25.2% | 56.6% | 2.21 | 6.0 | 10 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 5.1 | 51 |

Greedy trap rate 38.8% · for Greedy +0.63 stars · for Lookahead +0.21 stars · winning lines found (capped) 22.1 · shortest win 5.12 cards (constructed k 6.0, par 4.88 left)

Generation: 24.4 attempts/puzzle (rejection 95.9%: greedy_shortcut 14099, big_share 6881, solver_shortcut 2377, unverified 46, few_colors 4), 166 ms mean, 1826 ms max, 2.2 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 55.2% | 62.9% | 75.9% | 69.7% | 75.9% |
| colPaint | 55.4% | 62.1% | 80.9% | 71.2% | 80.9% |
| diagPaint | 59.3% | 59.0% | 75.7% | 66.7% | 75.7% |
| transmute | 10.1% | 88.1% | 96.0% | 96.7% | 96.0% |
| colorSwap | 39.1% | 67.5% | 76.2% | 73.7% | 76.2% |
| flood | 46.2% | 75.8% | 82.7% | 83.1% | 82.7% |
| spread | 10.2% | 58.8% | 82.4% | 66.7% | 82.4% |
| stamp | 69.1% | 65.3% | 83.6% | 72.6% | 83.6% |
| majority | 50.4% | 75.4% | 89.3% | 84.4% | 89.3% |
| slide | 57.2% | 11.0% | 7.5% | 12.5% | 7.5% |
| trade | 51.2% | 26.4% | 14.8% | 29.7% | 14.8% |
| mirror | 5.8% | 86.2% | 94.8% | 92.6% | 94.8% |
| groupPaint | 55.5% | 40.2% | 50.1% | 45.0% | 50.1% |
| corners | 49.3% | 36.9% | 50.1% | 42.0% | 50.1% |
| rowMirror | 44.3% | 2.9% | 2.0% | 3.3% | 2.0% |
| colMirror | 44.7% | 2.7% | 1.6% | 3.2% | 1.6% |
| minority | 57.5% | 49.2% | 68.9% | 54.4% | 68.9% |
| cross | 61.5% | 72.7% | 88.9% | 82.0% | 88.9% |
| purge | 9.9% | 90.9% | 97.0% | 98.9% | 97.0% |
| scatter | 23.2% | 73.3% | 0.0% | 78.7% | 0.0% |
| wildTransmute | 19.5% | 96.9% | 0.0% | 100.0% | 0.0% |
| luckyLine | 17.2% | 17.4% | 0.0% | 20.7% | 0.0% |
| tumble | 19.4% | 5.7% | 0.0% | 6.7% | 0.0% |
| quadrants | 20.7% | 5.8% | 0.0% | 6.8% | 0.0% |

### medium (n=1000)

Grid 5x5, 5 colors, hand 10, k 8, luck [1,1], max Transmutes 1, locked ratio 0.3, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.0% | 100.0% | 0.0% | 0.0% | 0.0% | 0.00 | 10.0 | 1 |
| greedy | 20.2% | 79.8% | 5.6% | 2.2% | 12.4% | 0.47 | 9.1 | 2 |
| greedyDet | 7.1% | 92.9% | 1.4% | 2.2% | 3.5% | 0.16 | 8.6 | 1 |
| lookahead | 60.3% | 39.7% | 1.5% | 5.6% | 53.2% | 1.72 | 7.7 | 37 |
| lookaheadDet | 45.4% | 54.6% | 0.1% | 3.4% | 41.9% | 1.33 | 7.7 | 10 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 7.4 | 62 |

Greedy trap rate 79.8% · for Greedy +0.31 stars · for Lookahead +0.40 stars · winning lines found (capped) 7.7 · shortest win 7.40 cards (constructed k 8.0, par 2.60 left)

Generation: 216.1 attempts/puzzle (rejection 99.5%: greedy_shortcut 118065, solver_shortcut 76381, big_share 16255, unverified 4297, no_inverse 25, few_colors 116), 4812 ms mean, 27404 ms max, 2.1 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 42.2% | 51.9% | 96.9% | 85.9% | 96.9% |
| colPaint | 36.6% | 52.5% | 97.0% | 86.5% | 97.0% |
| diagPaint | 53.9% | 50.1% | 96.5% | 85.2% | 96.5% |
| transmute | 10.1% | 69.3% | 96.0% | 94.6% | 96.0% |
| colorSwap | 50.6% | 51.2% | 96.2% | 81.7% | 96.2% |
| flood | 62.1% | 49.3% | 90.2% | 80.3% | 90.2% |
| spread | 7.5% | 58.7% | 100.0% | 88.0% | 100.0% |
| stamp | 62.5% | 51.4% | 97.9% | 85.6% | 97.9% |
| majority | 36.9% | 56.9% | 100.0% | 95.0% | 100.0% |
| slide | 79.3% | 22.1% | 69.4% | 36.5% | 69.4% |
| trade | 65.3% | 42.4% | 85.9% | 67.2% | 85.9% |
| mirror | 3.5% | 74.3% | 100.0% | 100.0% | 100.0% |
| groupPaint | 72.6% | 37.7% | 89.8% | 61.6% | 89.8% |
| corners | 58.7% | 37.1% | 96.3% | 67.1% | 96.3% |
| rowMirror | 58.3% | 2.6% | 23.3% | 4.5% | 23.3% |
| colMirror | 59.2% | 2.5% | 25.7% | 4.3% | 25.7% |
| minority | 41.7% | 52.8% | 97.1% | 88.4% | 97.1% |
| cross | 53.0% | 55.5% | 97.7% | 91.0% | 97.7% |
| purge | 5.7% | 70.2% | 100.0% | 100.0% | 100.0% |
| scatter | 17.0% | 67.6% | 0.0% | 97.5% | 0.0% |
| wildTransmute | 18.2% | 79.1% | 0.0% | 98.0% | 0.0% |
| luckyLine | 20.3% | 26.1% | 0.0% | 53.5% | 0.0% |
| tumble | 22.7% | 5.7% | 0.0% | 10.9% | 0.0% |
| quadrants | 21.8% | 7.8% | 0.0% | 14.2% | 0.0% |

### hard (n=1000)

Grid 6x6, 6 colors, hand 10, k 9, luck [1,1], max Transmutes 2, locked ratio 0.35, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.0% | 100.0% | 0.0% | 0.0% | 0.0% | 0.00 | 10.0 | 2 |
| greedy | 14.8% | 85.2% | 2.6% | 1.6% | 10.6% | 0.38 | 9.3 | 5 |
| greedyDet | 1.0% | 99.0% | 0.7% | 0.2% | 0.1% | 0.01 | 8.7 | 3 |
| lookahead | 47.7% | 52.3% | 3.9% | 9.1% | 34.7% | 1.26 | 8.5 | 105 |
| lookaheadDet | 34.5% | 65.5% | 0.9% | 6.6% | 27.0% | 0.95 | 8.2 | 27 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 7.2 | 196 |

Greedy trap rate 85.2% · for Greedy +0.36 stars · for Lookahead +0.31 stars · winning lines found (capped) 9.2 · shortest win 7.16 cards (constructed k 9.0, par 2.84 left)

Generation: 11.6 attempts/puzzle (rejection 91.4%: unverified 2588, solver_shortcut 4584, big_share 1231, greedy_shortcut 2167, few_colors 18, no_inverse 2), 1566 ms mean, 9951 ms max, 1.7 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 35.9% | 47.1% | 97.8% | 93.4% | 97.8% |
| colPaint | 39.4% | 43.9% | 98.0% | 90.6% | 98.0% |
| diagPaint | 61.4% | 40.2% | 96.7% | 86.1% | 96.7% |
| transmute | 11.3% | 44.2% | 99.1% | 96.2% | 99.1% |
| colorSwap | 62.5% | 40.0% | 91.7% | 81.2% | 91.7% |
| flood | 78.3% | 42.1% | 93.0% | 88.0% | 93.0% |
| spread | 30.1% | 46.5% | 99.3% | 90.3% | 99.3% |
| stamp | 79.5% | 43.5% | 98.4% | 89.2% | 98.4% |
| majority | 54.0% | 47.6% | 99.8% | 98.1% | 99.8% |
| slide | 61.8% | 16.0% | 30.4% | 33.2% | 30.4% |
| trade | 54.2% | 24.5% | 55.2% | 49.3% | 55.2% |
| mirror | 1.9% | 47.4% | 100.0% | 100.0% | 100.0% |
| groupPaint | 59.7% | 27.5% | 83.8% | 61.4% | 83.8% |
| corners | 36.0% | 30.6% | 88.3% | 67.1% | 88.3% |
| rowMirror | 45.1% | 2.2% | 5.3% | 5.1% | 5.3% |
| colMirror | 45.6% | 1.8% | 7.9% | 4.0% | 7.9% |
| minority | 53.2% | 40.2% | 98.9% | 86.6% | 98.9% |
| cross | 72.7% | 46.2% | 98.1% | 93.3% | 98.1% |
| purge | 17.4% | 47.1% | 100.0% | 100.0% | 100.0% |
| scatter | 20.3% | 56.2% | 0.0% | 91.2% | 0.0% |
| wildTransmute | 21.0% | 59.5% | 0.0% | 99.2% | 0.0% |
| luckyLine | 22.3% | 11.7% | 0.0% | 28.6% | 0.0% |
| tumble | 18.3% | 4.9% | 0.0% | 14.1% | 0.0% |
| quadrants | 18.1% | 3.3% | 0.0% | 8.5% | 0.0% |



