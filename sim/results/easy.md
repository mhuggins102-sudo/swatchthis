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
