### medium (n=500)

Grid 5x5, 5 colors, hand 10, k 8, luck [1,1], max Transmutes 1, locked ratio 0.3, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| greedy | 38.6% | 61.4% | 4.0% | 12.4% | 22.2% | 0.95 | 7.7 | 3 |
| lookahead | 76.8% | 23.2% | 1.2% | 21.2% | 54.4% | 2.07 | 6.2 | 63 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 5.5 | 98 |
| solverEv | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 5.5 | 725 |

Greedy trap rate 61.4% · luck card value for the EV solver +0.00 stars · winning lines found (capped) 38.0 · shortest win 5.46 cards (constructed k 8.0, par 4.54 left)

Generation: 14.5 attempts/puzzle (rejection 93.1%: greedy_shortcut 5311, big_share 640, solver_shortcut 562, unverified 232, few_colors 11), 258 ms mean, 1124 ms max, 2.0 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 47.4% | 63.3% | 89.9% | 84.7% | 89.9% |
| colPaint | 48.2% | 66.0% | 92.1% | 83.2% | 92.1% |
| diagPaint | 53.0% | 55.8% | 83.0% | 73.6% | 83.0% |
| transmute | 18.4% | 72.8% | 94.6% | 97.1% | 94.6% |
| colorSwap | 64.2% | 8.1% | 12.1% | 10.4% | 12.1% |
| flood | 79.8% | 69.2% | 93.0% | 89.6% | 93.0% |
| spread | 2.6% | 92.3% | 100.0% | 100.0% | 100.0% |
| stamp | 75.0% | 68.5% | 94.9% | 88.3% | 94.9% |
| majority | 58.6% | 72.4% | 97.6% | 95.1% | 97.6% |
| slide | 68.8% | 6.1% | 7.0% | 7.9% | 7.0% |
| trade | 66.2% | 24.8% | 21.5% | 31.2% | 21.5% |
| mirror | 10.4% | 73.1% | 100.0% | 100.0% | 100.0% |
| scatter | 27.2% | 62.5% | 0.0% | 74.6% | 0.0% |
| wildTransmute | 23.8% | 79.0% | 0.0% | 91.3% | 0.0% |
| luckyLine | 22.0% | 16.4% | 0.0% | 24.3% | 0.0% |
| tumble | 27.0% | 4.4% | 0.0% | 6.5% | 0.0% |
