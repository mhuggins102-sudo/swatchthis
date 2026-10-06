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
