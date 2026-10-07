### med-p9 (n=300)

Grid 5x5, 5 colors, hand 10, k 9, luck [1,1], max Transmutes 1, locked ratio 0.3, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.0% | 100.0% | 0.0% | 0.0% | 0.0% | 0.00 | 10.0 | 1 |
| greedy | 17.3% | 82.7% | 3.3% | 0.3% | 13.7% | 0.45 | 9.2 | 2 |
| lookahead | 60.7% | 39.3% | 1.0% | 7.7% | 52.0% | 1.72 | 7.8 | 39 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 7.3 | 60 |

Greedy trap rate 82.7% · winning lines found (capped) 7.1 · shortest win 7.26 cards (constructed k 9.0, par 2.74 left)

Generation: 149.0 attempts/puzzle (rejection 99.3%: greedy_shortcut 18746, solver_shortcut 21484, unverified 2508, big_share 1533, no_inverse 127, few_colors 7), 4830 ms mean, 42361 ms max, 1.8 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 36.3% | 48.6% | 99.1% | 84.1% | 99.1% |
| colPaint | 36.0% | 57.4% | 99.1% | 96.9% | 99.1% |
| diagPaint | 52.3% | 48.4% | 96.2% | 77.6% | 96.2% |
| transmute | 8.7% | 69.2% | 96.2% | 90.0% | 96.2% |
| colorSwap | 59.7% | 51.4% | 96.6% | 85.2% | 96.6% |
| flood | 79.3% | 52.9% | 92.9% | 87.5% | 92.9% |
| spread | 5.0% | 60.0% | 100.0% | 81.8% | 100.0% |
| stamp | 61.3% | 52.7% | 97.8% | 88.2% | 97.8% |
| majority | 37.3% | 52.7% | 100.0% | 96.7% | 100.0% |
| slide | 81.3% | 27.5% | 65.6% | 45.3% | 65.6% |
| trade | 72.7% | 41.7% | 83.5% | 62.3% | 83.5% |
| mirror | 3.0% | 55.6% | 100.0% | 100.0% | 100.0% |
| groupPaint | 69.0% | 35.3% | 92.8% | 61.9% | 92.8% |
| corners | 67.3% | 39.6% | 96.5% | 63.0% | 96.5% |
| rowMirror | 69.0% | 1.9% | 11.6% | 3.6% | 11.6% |
| colMirror | 65.0% | 3.6% | 19.0% | 6.1% | 19.0% |
| minority | 39.0% | 51.3% | 98.3% | 87.0% | 98.3% |
| cross | 51.7% | 61.3% | 99.4% | 90.5% | 99.4% |
| purge | 6.0% | 77.8% | 100.0% | 100.0% | 100.0% |
| scatter | 22.3% | 70.1% | 0.0% | 95.9% | 0.0% |
| wildTransmute | 16.7% | 82.0% | 0.0% | 100.0% | 0.0% |
| luckyLine | 18.7% | 33.9% | 0.0% | 65.5% | 0.0% |
| tumble | 19.7% | 6.8% | 0.0% | 14.3% | 0.0% |
| quadrants | 22.7% | 2.9% | 0.0% | 5.7% | 0.0% |
