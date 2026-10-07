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
