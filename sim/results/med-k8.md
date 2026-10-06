### med-k8 (n=400)

Grid 5x5, 5 colors, hand 10, k 8, luck [1,2], max Transmutes 1, locked ratio 0.3, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.8% | 99.3% | 0.3% | 0.5% | 0.0% | 0.01 | 9.8 | 1 |
| greedy | 50.5% | 49.5% | 3.0% | 28.2% | 19.3% | 1.17 | 7.1 | 3 |
| lookahead | 90.3% | 9.8% | 0.3% | 20.8% | 69.3% | 2.50 | 4.7 | 80 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 4.2 | 74 |

Greedy trap rate 49.5% · winning lines found (capped) 12.6 · shortest win 4.23 cards (constructed k 8.0, par 5.77 left)

Generation: 5.5 attempts/puzzle (rejection 81.7%: greedy_shortcut 1474, big_share 174, unverified 131, few_colors 2), 125 ms mean, 769 ms max, 1.8 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 37.5% | 70.0% | 84.0% | 78.4% | 84.0% |
| colPaint | 32.5% | 61.5% | 76.9% | 69.6% | 76.9% |
| diagPaint | 47.8% | 51.8% | 70.2% | 56.6% | 70.2% |
| transmute | 16.3% | 83.1% | 84.6% | 91.5% | 84.6% |
| colorSwap | 65.5% | 2.7% | 3.8% | 2.9% | 3.8% |
| flood | 79.3% | 64.0% | 75.7% | 70.7% | 75.7% |
| spread | 44.5% | 97.8% | 100.0% | 100.0% | 100.0% |
| stamp | 68.0% | 66.9% | 83.8% | 74.9% | 83.8% |
| majority | 40.8% | 77.3% | 93.3% | 85.7% | 93.3% |
| slide | 72.0% | 2.1% | 5.2% | 2.3% | 5.2% |
| trade | 68.8% | 14.2% | 15.3% | 15.7% | 15.3% |
| mirror | 12.8% | 78.4% | 94.1% | 93.0% | 94.1% |
| scatter | 36.3% | 37.2% | 0.0% | 39.7% | 0.0% |
| wildTransmute | 37.8% | 66.2% | 0.0% | 69.9% | 0.0% |
| luckyLine | 34.8% | 13.7% | 0.0% | 15.4% | 0.0% |
| tumble | 39.0% | 1.9% | 0.0% | 2.3% | 0.0% |
