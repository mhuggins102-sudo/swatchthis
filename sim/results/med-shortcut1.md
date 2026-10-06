### med-shortcut1 (n=400)

Grid 5x5, 5 colors, hand 10, k 7, luck [1,2], max Transmutes 1, locked ratio 0.3, greedy shortcut 1

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.5% | 99.5% | 0.5% | 0.0% | 0.0% | 0.01 | 9.8 | 1 |
| greedy | 66.0% | 34.0% | 3.3% | 42.8% | 20.0% | 1.49 | 6.6 | 3 |
| lookahead | 91.5% | 8.5% | 0.8% | 24.8% | 66.0% | 2.48 | 4.7 | 74 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 4.3 | 75 |

Greedy trap rate 34.0% · winning lines found (capped) 17.7 · shortest win 4.29 cards (constructed k 7.0, par 5.71 left)

Generation: 5.4 attempts/puzzle (rejection 81.4%: greedy_shortcut 1367, big_share 327, unverified 52, few_colors 6), 104 ms mean, 568 ms max, 1.8 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 45.5% | 67.0% | 75.8% | 73.5% | 75.8% |
| colPaint | 45.0% | 65.6% | 79.4% | 72.4% | 79.4% |
| diagPaint | 55.3% | 49.8% | 62.9% | 55.0% | 62.9% |
| transmute | 18.0% | 72.2% | 83.3% | 85.2% | 83.3% |
| colorSwap | 57.5% | 2.2% | 1.7% | 2.4% | 1.7% |
| flood | 77.3% | 66.0% | 74.8% | 71.1% | 74.8% |
| spread | 37.0% | 97.3% | 100.0% | 100.0% | 100.0% |
| stamp | 73.8% | 60.0% | 76.6% | 66.3% | 76.6% |
| majority | 52.0% | 70.7% | 81.3% | 75.8% | 81.3% |
| slide | 56.8% | 2.6% | 3.1% | 2.9% | 3.1% |
| trade | 62.0% | 9.3% | 6.5% | 10.0% | 6.5% |
| mirror | 14.8% | 84.7% | 98.3% | 90.9% | 98.3% |
| scatter | 30.3% | 38.0% | 0.0% | 41.1% | 0.0% |
| wildTransmute | 38.8% | 63.2% | 0.0% | 68.1% | 0.0% |
| luckyLine | 37.3% | 17.4% | 0.0% | 19.3% | 0.0% |
| tumble | 33.8% | 0.7% | 0.0% | 0.8% | 0.0% |
