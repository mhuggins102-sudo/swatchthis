### med-luck2 (n=400)

Grid 5x5, 5 colors, hand 10, k 7, luck [2,2], max Transmutes 1, locked ratio 0.3, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 1.8% | 98.3% | 1.5% | 0.3% | 0.0% | 0.02 | 9.8 | 1 |
| greedy | 68.0% | 32.0% | 4.3% | 39.3% | 24.5% | 1.56 | 6.4 | 3 |
| lookahead | 88.3% | 11.8% | 0.8% | 18.3% | 69.3% | 2.45 | 4.7 | 93 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 4.2 | 70 |

Greedy trap rate 32.0% · winning lines found (capped) 12.9 · shortest win 4.20 cards (constructed k 7.0, par 5.80 left)

Generation: 6.5 attempts/puzzle (rejection 84.5%: big_share 358, greedy_shortcut 1717, unverified 106, few_colors 6), 114 ms mean, 801 ms max, 1.8 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 38.0% | 59.2% | 84.9% | 67.2% | 84.9% |
| colPaint | 37.5% | 56.7% | 82.7% | 65.9% | 82.7% |
| diagPaint | 54.0% | 50.9% | 72.7% | 58.5% | 72.7% |
| transmute | 18.8% | 72.0% | 77.3% | 79.4% | 77.3% |
| colorSwap | 59.3% | 2.1% | 4.2% | 2.4% | 4.2% |
| flood | 70.5% | 62.8% | 72.7% | 70.5% | 72.7% |
| spread | 43.3% | 98.8% | 100.0% | 100.0% | 100.0% |
| stamp | 67.0% | 59.7% | 81.7% | 67.2% | 81.7% |
| majority | 45.0% | 66.1% | 85.0% | 73.9% | 85.0% |
| slide | 61.8% | 3.6% | 3.6% | 4.2% | 3.6% |
| trade | 62.7% | 6.4% | 11.6% | 7.1% | 11.6% |
| mirror | 14.8% | 64.4% | 94.9% | 80.9% | 94.9% |
| scatter | 43.8% | 34.9% | 0.0% | 38.6% | 0.0% |
| wildTransmute | 46.8% | 62.6% | 0.0% | 66.9% | 0.0% |
| luckyLine | 47.3% | 15.9% | 0.0% | 18.0% | 0.0% |
| tumble | 39.0% | 3.8% | 0.0% | 4.7% | 0.0% |
