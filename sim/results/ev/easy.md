### easy (n=500)

Grid 5x5, 4 colors, hand 10, k 5, luck [1,1], max Transmutes 1, locked ratio 0.3, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| greedy | 92.2% | 7.8% | 0.6% | 57.8% | 33.8% | 2.18 | 5.2 | 2 |
| lookahead | 98.6% | 1.4% | 0.2% | 22.4% | 76.0% | 2.73 | 4.2 | 39 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 4.0 | 50 |
| solverEv | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 4.0 | 362 |

Greedy trap rate 7.8% · luck card value for the EV solver +0.00 stars · winning lines found (capped) 49.4 · shortest win 3.99 cards (constructed k 5.0, par 6.01 left)

Generation: 10.1 attempts/puzzle (rejection 90.1%: greedy_shortcut 2536, big_share 1966, unverified 4, solver_shortcut 27, few_colors 10), 63 ms mean, 542 ms max, 1.9 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 60.2% | 53.5% | 62.1% | 54.6% | 62.1% |
| colPaint | 63.2% | 54.1% | 62.7% | 55.0% | 62.7% |
| diagPaint | 61.6% | 48.4% | 48.7% | 48.9% | 48.7% |
| transmute | 21.0% | 90.5% | 86.7% | 91.3% | 86.7% |
| colorSwap | 40.4% | 1.0% | 1.5% | 1.0% | 1.5% |
| flood | 65.2% | 71.5% | 69.3% | 71.5% | 69.3% |
| spread | 31.0% | 100.0% | 100.0% | 100.0% | 100.0% |
| stamp | 80.6% | 63.8% | 68.2% | 64.7% | 68.2% |
| majority | 68.4% | 61.4% | 67.0% | 62.5% | 67.0% |
| slide | 49.6% | 1.2% | 0.4% | 1.2% | 0.4% |
| trade | 44.8% | 3.1% | 1.3% | 3.2% | 1.3% |
| mirror | 29.8% | 87.2% | 91.9% | 87.8% | 91.9% |
| scatter | 23.2% | 37.1% | 0.0% | 37.4% | 0.0% |
| wildTransmute | 26.0% | 76.2% | 0.0% | 78.6% | 0.0% |
| luckyLine | 24.4% | 10.7% | 0.0% | 10.7% | 0.0% |
| tumble | 26.4% | 0.0% | 0.0% | 0.0% | 0.0% |
