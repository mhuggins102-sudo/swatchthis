### med-gap1 (n=400)

Grid 5x5, 5 colors, hand 10, k 7, luck [1,2], max Transmutes 1, locked ratio 0.3, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.0% | 100.0% | 0.0% | 0.0% | 0.0% | 0.00 | 9.8 | 1 |
| greedy | 52.8% | 47.3% | 1.0% | 9.8% | 42.0% | 1.47 | 7.2 | 3 |
| lookahead | 75.8% | 24.3% | 2.8% | 15.5% | 57.5% | 2.06 | 6.6 | 87 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 6.2 | 93 |

Greedy trap rate 47.3% · winning lines found (capped) 16.8 · shortest win 6.15 cards (constructed k 7.0, par 3.85 left)

Generation: 55.6 attempts/puzzle (rejection 98.2%: greedy_shortcut 15498, solver_shortcut 2529, unverified 614, big_share 3131, few_colors 78), 747 ms mean, 4672 ms max, 2.1 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 48.8% | 63.1% | 93.3% | 86.0% | 93.3% |
| colPaint | 55.3% | 58.8% | 96.4% | 77.4% | 96.4% |
| diagPaint | 58.8% | 63.4% | 95.7% | 80.1% | 95.7% |
| transmute | 17.0% | 70.6% | 92.6% | 94.1% | 92.6% |
| colorSwap | 57.8% | 11.3% | 30.7% | 15.2% | 30.7% |
| flood | 63.0% | 69.4% | 93.7% | 88.8% | 93.7% |
| spread | 1.8% | 71.4% | 100.0% | 100.0% | 100.0% |
| stamp | 82.0% | 66.2% | 97.9% | 88.2% | 97.9% |
| majority | 57.5% | 70.0% | 99.1% | 92.0% | 99.1% |
| slide | 54.0% | 9.7% | 11.6% | 13.0% | 11.6% |
| trade | 60.8% | 23.5% | 44.9% | 30.6% | 44.9% |
| mirror | 9.0% | 72.2% | 100.0% | 92.9% | 100.0% |
| scatter | 37.3% | 68.5% | 0.0% | 85.0% | 0.0% |
| wildTransmute | 36.3% | 88.3% | 0.0% | 99.2% | 0.0% |
| luckyLine | 32.5% | 20.0% | 0.0% | 30.2% | 0.0% |
| tumble | 38.0% | 2.6% | 0.0% | 3.8% | 0.0% |
