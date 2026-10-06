### med-lock6 (n=400)

Grid 5x5, 5 colors, hand 10, k 7, luck [1,2], max Transmutes 1, locked ratio 0.6, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.8% | 99.3% | 0.8% | 0.0% | 0.0% | 0.01 | 9.7 | 1 |
| greedy | 45.3% | 54.8% | 3.3% | 28.5% | 13.5% | 1.01 | 6.7 | 3 |
| lookahead | 86.0% | 14.0% | 1.0% | 21.0% | 64.0% | 2.35 | 4.6 | 70 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 4.1 | 64 |

Greedy trap rate 54.8% · winning lines found (capped) 11.8 · shortest win 4.10 cards (constructed k 7.0, par 5.90 left)

Generation: 4.5 attempts/puzzle (rejection 77.8%: greedy_shortcut 1051, big_share 250, few_colors 13, unverified 90), 99 ms mean, 729 ms max, 3.4 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 44.0% | 51.1% | 68.2% | 58.4% | 68.2% |
| colPaint | 49.3% | 58.9% | 70.6% | 69.0% | 70.6% |
| diagPaint | 55.0% | 36.8% | 57.3% | 43.8% | 57.3% |
| transmute | 20.5% | 64.6% | 74.4% | 79.1% | 74.4% |
| colorSwap | 58.0% | 5.2% | 6.5% | 6.1% | 6.5% |
| flood | 79.5% | 55.7% | 66.0% | 63.9% | 66.0% |
| spread | 47.3% | 95.2% | 100.0% | 100.0% | 100.0% |
| stamp | 71.0% | 57.7% | 76.1% | 67.2% | 76.1% |
| majority | 47.8% | 69.6% | 86.4% | 81.6% | 86.4% |
| slide | 60.8% | 3.7% | 2.5% | 4.3% | 2.5% |
| trade | 58.0% | 10.3% | 9.1% | 11.8% | 9.1% |
| mirror | 15.5% | 77.4% | 93.5% | 90.6% | 93.5% |
| scatter | 36.8% | 42.9% | 0.0% | 46.7% | 0.0% |
| wildTransmute | 31.0% | 54.0% | 0.0% | 59.8% | 0.0% |
| luckyLine | 36.0% | 6.9% | 0.0% | 8.8% | 0.0% |
| tumble | 35.8% | 2.1% | 0.0% | 2.5% | 0.0% |
