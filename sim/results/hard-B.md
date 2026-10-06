### hard-B (n=400)

Grid 6x6, 6 colors, hand 11, k 9, luck [1,1], max Transmutes 2, locked ratio 0.35, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.0% | 100.0% | 0.0% | 0.0% | 0.0% | 0.00 | 10.9 | 2 |
| greedy | 30.0% | 70.0% | 1.5% | 11.3% | 17.3% | 0.76 | 8.8 | 9 |
| lookahead | 66.5% | 33.5% | 1.8% | 19.5% | 45.3% | 1.76 | 7.4 | 208 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 6.5 | 355 |

Greedy trap rate 70.0% · winning lines found (capped) 18.1 · shortest win 6.54 cards (constructed k 9.0, par 4.46 left)

Generation: 13.6 attempts/puzzle (rejection 92.7%: greedy_shortcut 3388, solver_shortcut 742, big_share 527, unverified 371, few_colors 20), 1247 ms mean, 7359 ms max, 2.5 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 49.5% | 54.5% | 90.9% | 87.1% | 90.9% |
| colPaint | 45.8% | 58.5% | 90.7% | 85.6% | 90.7% |
| diagPaint | 57.5% | 54.3% | 89.6% | 81.2% | 89.6% |
| transmute | 26.0% | 60.6% | 95.2% | 92.6% | 95.2% |
| colorSwap | 61.3% | 5.7% | 7.8% | 8.9% | 7.8% |
| flood | 89.8% | 59.1% | 93.0% | 89.1% | 93.0% |
| spread | 8.5% | 91.2% | 100.0% | 100.0% | 100.0% |
| stamp | 82.3% | 56.8% | 94.8% | 85.4% | 94.8% |
| majority | 58.5% | 60.7% | 97.4% | 93.4% | 97.4% |
| slide | 68.3% | 4.4% | 4.8% | 6.4% | 4.8% |
| trade | 69.0% | 20.3% | 26.8% | 30.3% | 26.8% |
| mirror | 12.0% | 66.7% | 100.0% | 100.0% | 100.0% |
| scatter | 28.0% | 54.5% | 0.0% | 74.4% | 0.0% |
| wildTransmute | 25.0% | 73.0% | 0.0% | 94.8% | 0.0% |
| luckyLine | 22.0% | 17.0% | 0.0% | 28.8% | 0.0% |
| tumble | 25.0% | 1.0% | 0.0% | 1.8% | 0.0% |
