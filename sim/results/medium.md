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
