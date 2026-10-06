### med-D (n=400)

Grid 5x5, 5 colors, hand 10, k 8, luck [1,2], max Transmutes 0, locked ratio 0.3, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.3% | 99.8% | 0.0% | 0.3% | 0.0% | 0.01 | 9.9 | 1 |
| greedy | 48.5% | 51.5% | 1.8% | 9.0% | 37.8% | 1.33 | 7.4 | 3 |
| lookahead | 73.8% | 26.3% | 1.0% | 18.5% | 54.3% | 2.01 | 6.7 | 92 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 6.1 | 102 |

Greedy trap rate 51.5% · winning lines found (capped) 14.6 · shortest win 6.13 cards (constructed k 8.0, par 3.87 left)

Generation: 32.4 attempts/puzzle (rejection 96.9%: greedy_shortcut 8354, solver_shortcut 2235, unverified 881, big_share 1085, few_colors 6), 870 ms mean, 8458 ms max, 2.0 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 45.3% | 66.3% | 95.6% | 90.2% | 95.6% |
| colPaint | 51.0% | 60.3% | 97.1% | 84.2% | 97.1% |
| diagPaint | 55.8% | 56.1% | 95.5% | 77.2% | 95.5% |
| transmute | 0.0% | 0.0% | 0.0% | 0.0% | 0.0% |
| colorSwap | 63.7% | 11.0% | 20.0% | 14.9% | 20.0% |
| flood | 83.8% | 69.3% | 95.2% | 90.3% | 95.2% |
| spread | 1.5% | 83.3% | 100.0% | 100.0% | 100.0% |
| stamp | 81.0% | 66.0% | 98.8% | 90.3% | 98.8% |
| majority | 60.8% | 71.2% | 100.0% | 95.1% | 100.0% |
| slide | 64.0% | 8.6% | 14.1% | 12.3% | 14.1% |
| trade | 60.5% | 22.3% | 48.3% | 29.7% | 48.3% |
| mirror | 6.5% | 84.6% | 96.2% | 100.0% | 96.2% |
| scatter | 35.5% | 79.6% | 0.0% | 93.4% | 0.0% |
| wildTransmute | 36.0% | 76.4% | 0.0% | 98.2% | 0.0% |
| luckyLine | 36.3% | 15.2% | 0.0% | 21.2% | 0.0% |
| tumble | 35.5% | 2.8% | 0.0% | 4.3% | 0.0% |
