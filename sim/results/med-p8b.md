### med-p8b (n=300)

Grid 5x5, 5 colors, hand 10, k 8, luck [1,1], max Transmutes 1, locked ratio 0.3, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.0% | 100.0% | 0.0% | 0.0% | 0.0% | 0.00 | 10.0 | 1 |
| greedy | 30.7% | 69.3% | 7.7% | 3.7% | 19.3% | 0.73 | 8.8 | 2 |
| lookahead | 73.0% | 27.0% | 1.7% | 16.0% | 55.3% | 2.00 | 7.1 | 38 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 6.1 | 58 |

Greedy trap rate 69.3% · winning lines found (capped) 15.1 · shortest win 6.11 cards (constructed k 8.0, par 3.89 left)

Generation: 23.9 attempts/puzzle (rejection 95.8%: solver_shortcut 2377, greedy_shortcut 3811, big_share 528, unverified 156, few_colors 3, no_inverse 1), 513 ms mean, 2585 ms max, 1.8 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 43.7% | 57.3% | 93.9% | 83.3% | 93.9% |
| colPaint | 39.3% | 62.7% | 92.4% | 81.3% | 92.4% |
| diagPaint | 54.3% | 52.8% | 92.0% | 71.7% | 92.0% |
| transmute | 9.3% | 71.4% | 96.4% | 95.2% | 96.4% |
| colorSwap | 57.0% | 58.5% | 81.3% | 76.9% | 81.3% |
| flood | 64.3% | 62.7% | 88.1% | 84.0% | 88.1% |
| spread | 5.3% | 43.8% | 100.0% | 77.8% | 100.0% |
| stamp | 67.7% | 61.6% | 96.1% | 85.0% | 96.1% |
| majority | 46.7% | 70.0% | 95.0% | 95.1% | 95.0% |
| slide | 68.7% | 17.5% | 18.4% | 24.2% | 18.4% |
| trade | 59.3% | 36.5% | 39.9% | 48.1% | 39.9% |
| mirror | 4.3% | 76.9% | 100.0% | 100.0% | 100.0% |
| groupPaint | 59.0% | 40.1% | 72.9% | 55.9% | 72.9% |
| corners | 43.3% | 43.8% | 80.8% | 60.0% | 80.8% |
| rowMirror | 55.0% | 3.0% | 3.0% | 4.4% | 3.0% |
| colMirror | 63.3% | 1.6% | 2.1% | 2.3% | 2.1% |
| minority | 50.0% | 60.0% | 95.3% | 78.9% | 95.3% |
| cross | 58.7% | 64.2% | 96.6% | 90.4% | 96.6% |
| purge | 12.7% | 73.7% | 100.0% | 100.0% | 100.0% |
| scatter | 21.3% | 79.7% | 0.0% | 86.4% | 0.0% |
| wildTransmute | 21.3% | 79.7% | 0.0% | 98.1% | 0.0% |
| luckyLine | 20.3% | 27.9% | 0.0% | 45.9% | 0.0% |
| tumble | 17.0% | 9.8% | 0.0% | 15.6% | 0.0% |
| quadrants | 20.0% | 6.7% | 0.0% | 10.3% | 0.0% |
