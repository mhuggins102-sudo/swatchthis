### med-B (n=400)

Grid 5x5, 5 colors, hand 10, k 8, luck [1,1], max Transmutes 1, locked ratio 0.3, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.3% | 99.8% | 0.3% | 0.0% | 0.0% | 0.00 | 9.9 | 1 |
| greedy | 36.3% | 63.7% | 4.0% | 10.8% | 21.5% | 0.90 | 7.8 | 3 |
| lookahead | 75.0% | 25.0% | 2.0% | 17.8% | 55.3% | 2.03 | 6.3 | 63 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 5.4 | 104 |

Greedy trap rate 63.7% · winning lines found (capped) 18.0 · shortest win 5.39 cards (constructed k 8.0, par 4.61 left)

Generation: 15.4 attempts/puzzle (rejection 93.5%: greedy_shortcut 4504, big_share 542, unverified 185, solver_shortcut 521, few_colors 5), 304 ms mean, 2067 ms max, 2.1 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 45.3% | 63.0% | 96.7% | 85.7% | 96.7% |
| colPaint | 50.7% | 66.0% | 90.6% | 85.9% | 90.6% |
| diagPaint | 54.3% | 52.1% | 85.7% | 71.5% | 85.7% |
| transmute | 20.3% | 67.9% | 98.8% | 100.0% | 98.8% |
| colorSwap | 69.5% | 6.8% | 7.6% | 9.3% | 7.6% |
| flood | 81.0% | 71.6% | 92.9% | 91.3% | 92.9% |
| spread | 2.3% | 88.9% | 100.0% | 100.0% | 100.0% |
| stamp | 75.8% | 66.0% | 93.7% | 87.3% | 93.7% |
| majority | 51.0% | 72.1% | 96.1% | 93.6% | 96.1% |
| slide | 72.0% | 5.9% | 6.3% | 8.0% | 6.3% |
| trade | 69.8% | 20.1% | 22.2% | 26.2% | 22.2% |
| mirror | 11.3% | 77.8% | 100.0% | 97.2% | 100.0% |
| scatter | 22.3% | 60.7% | 0.0% | 78.3% | 0.0% |
| wildTransmute | 23.8% | 84.2% | 0.0% | 96.4% | 0.0% |
| luckyLine | 25.3% | 16.8% | 0.0% | 23.6% | 0.0% |
| tumble | 28.7% | 4.3% | 0.0% | 6.6% | 0.0% |
