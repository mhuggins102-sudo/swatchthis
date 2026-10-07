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
