### med-gap2-luck1 (n=400)

Grid 5x5, 5 colors, hand 10, k 7, luck [1,1], max Transmutes 1, locked ratio 0.3, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.3% | 99.8% | 0.3% | 0.0% | 0.0% | 0.00 | 9.8 | 1 |
| greedy | 41.0% | 59.0% | 2.0% | 15.5% | 23.5% | 1.03 | 7.5 | 4 |
| lookahead | 75.8% | 24.3% | 1.3% | 23.0% | 51.5% | 2.02 | 6.2 | 69 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 5.4 | 108 |

Greedy trap rate 59.0% · winning lines found (capped) 17.5 · shortest win 5.38 cards (constructed k 7.0, par 4.62 left)

Generation: 22.7 attempts/puzzle (rejection 95.6%: greedy_shortcut 6835, solver_shortcut 461, big_share 1228, unverified 132, few_colors 33), 285 ms mean, 1649 ms max, 2.1 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 49.8% | 64.8% | 89.9% | 85.4% | 89.9% |
| colPaint | 54.5% | 60.1% | 88.1% | 80.9% | 88.1% |
| diagPaint | 53.3% | 58.7% | 86.9% | 79.1% | 86.9% |
| transmute | 21.8% | 71.3% | 90.8% | 92.5% | 90.8% |
| colorSwap | 61.0% | 6.1% | 10.2% | 8.1% | 10.2% |
| flood | 69.0% | 62.0% | 88.0% | 80.7% | 88.0% |
| spread | 0.8% | 100.0% | 100.0% | 100.0% | 100.0% |
| stamp | 77.3% | 63.8% | 91.9% | 85.7% | 91.9% |
| majority | 58.5% | 70.5% | 97.0% | 95.4% | 97.0% |
| slide | 68.5% | 4.7% | 4.7% | 6.7% | 4.7% |
| trade | 68.8% | 18.5% | 18.5% | 23.8% | 18.5% |
| mirror | 15.3% | 77.0% | 100.0% | 100.0% | 100.0% |
| scatter | 23.3% | 55.9% | 0.0% | 74.3% | 0.0% |
| wildTransmute | 26.8% | 80.4% | 0.0% | 94.5% | 0.0% |
| luckyLine | 24.0% | 17.7% | 0.0% | 22.7% | 0.0% |
| tumble | 26.0% | 2.9% | 0.0% | 4.5% | 0.0% |
