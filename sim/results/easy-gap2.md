### easy-gap2 (n=400)

Grid 5x5, 4 colors, hand 10, k 5, luck [1,1], max Transmutes 1, locked ratio 0.3, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 2.5% | 97.5% | 2.0% | 0.5% | 0.0% | 0.03 | 9.8 | 1 |
| greedy | 90.8% | 9.3% | 1.0% | 60.5% | 29.3% | 2.10 | 5.3 | 2 |
| lookahead | 98.5% | 1.5% | 0.0% | 22.3% | 76.3% | 2.73 | 4.2 | 41 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 4.0 | 54 |

Greedy trap rate 9.3% · winning lines found (capped) 25.9 · shortest win 3.96 cards (constructed k 5.0, par 6.04 left)

Generation: 9.8 attempts/puzzle (rejection 89.8%: greedy_shortcut 1939, big_share 1552, few_colors 11, unverified 8, solver_shortcut 16), 69 ms mean, 387 ms max, 1.9 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 62.3% | 61.0% | 65.1% | 61.8% | 65.1% |
| colPaint | 56.8% | 53.7% | 60.4% | 54.2% | 60.4% |
| diagPaint | 62.7% | 39.8% | 47.8% | 40.3% | 47.8% |
| transmute | 27.5% | 90.9% | 85.5% | 92.6% | 85.5% |
| colorSwap | 43.5% | 1.1% | 0.6% | 1.2% | 0.6% |
| flood | 61.8% | 69.6% | 69.2% | 70.5% | 69.2% |
| spread | 32.0% | 100.0% | 100.0% | 100.0% | 100.0% |
| stamp | 80.0% | 64.7% | 67.5% | 65.5% | 67.5% |
| majority | 71.0% | 67.3% | 70.8% | 68.5% | 70.8% |
| slide | 45.5% | 0.5% | 0.0% | 0.6% | 0.0% |
| trade | 48.5% | 3.6% | 1.5% | 3.7% | 1.5% |
| mirror | 23.5% | 73.4% | 87.2% | 75.0% | 87.2% |
| scatter | 23.8% | 38.9% | 0.0% | 38.9% | 0.0% |
| wildTransmute | 23.5% | 81.9% | 0.0% | 82.8% | 0.0% |
| luckyLine | 29.0% | 8.6% | 0.0% | 8.8% | 0.0% |
| tumble | 23.8% | 1.1% | 0.0% | 1.1% | 0.0% |
