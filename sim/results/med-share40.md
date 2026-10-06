### med-share40 (n=400)

Grid 5x5, 5 colors, hand 10, k 7, luck [1,2], max Transmutes 1, locked ratio 0.3, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.8% | 99.3% | 0.5% | 0.3% | 0.0% | 0.01 | 9.8 | 1 |
| greedy | 53.5% | 46.5% | 4.5% | 35.5% | 13.5% | 1.16 | 7.1 | 4 |
| lookahead | 89.0% | 11.0% | 1.3% | 25.3% | 62.5% | 2.39 | 4.8 | 84 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 4.3 | 75 |

Greedy trap rate 46.5% · winning lines found (capped) 12.5 · shortest win 4.26 cards (constructed k 7.0, par 5.74 left)

Generation: 9.6 attempts/puzzle (rejection 89.6%: greedy_shortcut 1961, big_share 1414, unverified 71, few_colors 11), 112 ms mean, 651 ms max, 2.0 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 43.8% | 60.0% | 80.6% | 67.7% | 80.6% |
| colPaint | 48.5% | 64.9% | 77.8% | 72.4% | 77.8% |
| diagPaint | 52.5% | 56.7% | 68.6% | 62.6% | 68.6% |
| transmute | 20.5% | 70.7% | 75.6% | 84.1% | 75.6% |
| colorSwap | 65.3% | 3.1% | 6.1% | 3.5% | 6.1% |
| flood | 70.8% | 64.0% | 73.9% | 70.7% | 73.9% |
| spread | 47.0% | 97.9% | 100.0% | 100.0% | 100.0% |
| stamp | 71.0% | 64.4% | 76.8% | 73.5% | 76.8% |
| majority | 45.0% | 71.7% | 86.1% | 81.1% | 86.1% |
| slide | 56.8% | 3.1% | 3.5% | 3.4% | 3.5% |
| trade | 67.5% | 8.9% | 6.7% | 9.8% | 6.7% |
| mirror | 19.5% | 80.8% | 96.2% | 91.3% | 96.2% |
| scatter | 35.5% | 36.6% | 0.0% | 39.1% | 0.0% |
| wildTransmute | 39.3% | 56.7% | 0.0% | 61.8% | 0.0% |
| luckyLine | 35.5% | 14.8% | 0.0% | 17.9% | 0.0% |
| tumble | 41.0% | 1.8% | 0.0% | 2.1% | 0.0% |
