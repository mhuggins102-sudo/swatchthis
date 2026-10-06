### hard (n=500)

Grid 6x6, 6 colors, hand 11, k 9, luck [1,1], max Transmutes 2, locked ratio 0.35, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| greedy | 31.0% | 69.0% | 2.6% | 10.2% | 18.2% | 0.78 | 8.9 | 8 |
| lookahead | 65.6% | 34.4% | 1.8% | 18.2% | 45.6% | 1.75 | 7.6 | 186 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 6.7 | 316 |
| solverEv | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 6.7 | 2368 |

Greedy trap rate 69.0% · luck card value for the EV solver +0.00 stars · winning lines found (capped) 37.8 · shortest win 6.65 cards (constructed k 9.0, par 4.35 left)

Generation: 13.3 attempts/puzzle (rejection 92.5%: greedy_shortcut 4110, big_share 666, unverified 467, solver_shortcut 907, few_colors 25), 1152 ms mean, 6107 ms max, 2.5 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 44.8% | 55.4% | 93.8% | 86.7% | 93.8% |
| colPaint | 51.2% | 58.6% | 93.4% | 89.8% | 93.4% |
| diagPaint | 58.8% | 56.5% | 89.5% | 84.7% | 89.5% |
| transmute | 22.6% | 65.5% | 94.7% | 97.4% | 94.7% |
| colorSwap | 66.4% | 7.2% | 11.4% | 11.3% | 11.4% |
| flood | 85.0% | 60.2% | 94.4% | 88.6% | 94.4% |
| spread | 7.2% | 80.6% | 100.0% | 100.0% | 100.0% |
| stamp | 83.8% | 59.2% | 97.4% | 89.5% | 97.4% |
| majority | 64.8% | 63.3% | 99.1% | 96.7% | 99.1% |
| slide | 65.4% | 5.5% | 5.2% | 8.3% | 5.2% |
| trade | 65.0% | 19.1% | 24.0% | 28.8% | 24.0% |
| mirror | 13.2% | 66.7% | 100.0% | 100.0% | 100.0% |
| scatter | 27.0% | 49.6% | 0.0% | 70.5% | 0.0% |
| wildTransmute | 22.8% | 64.9% | 0.0% | 91.4% | 0.0% |
| luckyLine | 24.2% | 15.7% | 0.0% | 24.1% | 0.0% |
| tumble | 26.0% | 3.1% | 0.0% | 5.5% | 0.0% |
