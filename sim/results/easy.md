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
