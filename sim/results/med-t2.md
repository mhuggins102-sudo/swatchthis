### med-t2 (n=400)

Grid 5x5, 5 colors, hand 10, k 7, luck [1,2], max Transmutes 2, locked ratio 0.3, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 2.3% | 97.8% | 2.0% | 0.3% | 0.0% | 0.03 | 9.8 | 1 |
| greedy | 56.8% | 43.3% | 3.0% | 32.0% | 21.8% | 1.32 | 6.7 | 3 |
| lookahead | 86.8% | 13.3% | 0.5% | 23.8% | 62.5% | 2.35 | 4.8 | 82 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 4.2 | 70 |

Greedy trap rate 43.3% · winning lines found (capped) 13.2 · shortest win 4.18 cards (constructed k 7.0, par 5.82 left)

Generation: 7.2 attempts/puzzle (rejection 86.2%: greedy_shortcut 2021, big_share 395, unverified 71, few_colors 11), 106 ms mean, 536 ms max, 2.0 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 40.5% | 56.2% | 75.3% | 65.5% | 75.3% |
| colPaint | 47.5% | 61.1% | 80.0% | 71.2% | 80.0% |
| diagPaint | 51.7% | 57.0% | 70.0% | 66.3% | 70.0% |
| transmute | 24.0% | 74.0% | 81.3% | 83.5% | 81.3% |
| colorSwap | 65.3% | 1.5% | 5.7% | 1.8% | 5.7% |
| flood | 71.8% | 56.8% | 72.8% | 64.4% | 72.8% |
| spread | 42.0% | 97.0% | 100.0% | 100.0% | 100.0% |
| stamp | 66.0% | 59.1% | 84.5% | 70.3% | 84.5% |
| majority | 43.8% | 67.4% | 85.1% | 78.1% | 85.1% |
| slide | 67.0% | 2.6% | 0.7% | 3.0% | 0.7% |
| trade | 66.5% | 9.0% | 11.3% | 10.4% | 11.3% |
| mirror | 14.5% | 84.5% | 98.3% | 92.5% | 98.3% |
| scatter | 35.8% | 38.5% | 0.0% | 40.7% | 0.0% |
| wildTransmute | 39.0% | 61.5% | 0.0% | 68.1% | 0.0% |
| luckyLine | 38.3% | 16.3% | 0.0% | 19.7% | 0.0% |
| tumble | 36.3% | 2.1% | 0.0% | 2.5% | 0.0% |
