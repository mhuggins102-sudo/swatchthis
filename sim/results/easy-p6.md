### easy-p6 (n=300)

Grid 5x5, 4 colors, hand 10, k 6, luck [1,1], max Transmutes 1, locked ratio 0.3, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.0% | 100.0% | 0.0% | 0.0% | 0.0% | 0.00 | 9.9 | 1 |
| greedy | 63.7% | 36.3% | 11.3% | 25.7% | 26.7% | 1.43 | 7.4 | 2 |
| lookahead | 90.3% | 9.7% | 2.3% | 22.0% | 66.0% | 2.44 | 5.7 | 31 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 5.1 | 47 |

Greedy trap rate 36.3% · winning lines found (capped) 24.7 · shortest win 5.15 cards (constructed k 6.0, par 4.85 left)

Generation: 23.0 attempts/puzzle (rejection 95.7%: greedy_shortcut 4047, solver_shortcut 657, big_share 1891, unverified 12), 154 ms mean, 1541 ms max, 2.1 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 56.3% | 61.5% | 80.5% | 69.8% | 80.5% |
| colPaint | 51.3% | 62.3% | 77.9% | 70.6% | 77.9% |
| diagPaint | 58.7% | 55.1% | 74.4% | 60.2% | 74.4% |
| transmute | 14.0% | 83.3% | 97.6% | 92.1% | 97.6% |
| colorSwap | 37.3% | 72.3% | 79.5% | 77.1% | 79.5% |
| flood | 42.7% | 75.0% | 83.6% | 82.8% | 83.6% |
| spread | 12.0% | 58.3% | 86.1% | 65.6% | 86.1% |
| stamp | 69.3% | 62.5% | 81.7% | 70.7% | 81.7% |
| majority | 51.3% | 74.7% | 80.5% | 80.4% | 80.5% |
| slide | 58.3% | 19.4% | 6.9% | 22.1% | 6.9% |
| trade | 48.7% | 28.8% | 11.0% | 31.1% | 11.0% |
| mirror | 6.7% | 95.0% | 95.0% | 100.0% | 95.0% |
| groupPaint | 51.3% | 42.9% | 51.9% | 47.8% | 51.9% |
| corners | 44.0% | 40.2% | 52.3% | 43.1% | 52.3% |
| rowMirror | 46.7% | 2.9% | 2.1% | 3.2% | 2.1% |
| colMirror | 43.7% | 3.1% | 2.3% | 3.5% | 2.3% |
| minority | 60.3% | 47.0% | 71.8% | 51.8% | 71.8% |
| cross | 69.7% | 76.1% | 87.1% | 83.2% | 87.1% |
| purge | 8.3% | 96.0% | 100.0% | 100.0% | 100.0% |
| scatter | 19.3% | 81.0% | 0.0% | 88.7% | 0.0% |
| wildTransmute | 21.0% | 93.7% | 0.0% | 100.0% | 0.0% |
| luckyLine | 20.0% | 21.7% | 0.0% | 24.5% | 0.0% |
| tumble | 14.7% | 6.8% | 0.0% | 7.7% | 0.0% |
| quadrants | 25.0% | 8.0% | 0.0% | 9.0% | 0.0% |
