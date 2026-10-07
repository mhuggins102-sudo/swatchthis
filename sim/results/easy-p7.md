### easy-p7 (n=300)

Grid 5x5, 4 colors, hand 10, k 7, luck [1,1], max Transmutes 1, locked ratio 0.3, greedy shortcut 0

| Bot | Win rate | 0★ | 1★ | 2★ | 3★ | Mean stars | Mean cards played | ms/puzzle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| random | 0.3% | 99.7% | 0.0% | 0.3% | 0.0% | 0.01 | 10.0 | 1 |
| greedy | 34.0% | 66.0% | 5.0% | 6.3% | 22.7% | 0.86 | 8.5 | 2 |
| lookahead | 70.3% | 29.7% | 1.0% | 12.7% | 56.7% | 1.96 | 7.0 | 33 |
| solver | 100.0% | 0.0% | 0.0% | 0.0% | 100.0% | 3.00 | 6.1 | 55 |

Greedy trap rate 66.0% · winning lines found (capped) 14.9 · shortest win 6.13 cards (constructed k 7.0, par 3.87 left)

Generation: 118.3 attempts/puzzle (rejection 99.2%: greedy_shortcut 22978, solver_shortcut 6270, big_share 5822, unverified 114, few_colors 1), 1118 ms mean, 7070 ms max, 2.2 locked cards/hand

| Card | Dealt in | In lookahead wins (of dealt) | In solver wins (of dealt) | Used when lookahead won | Used when solver won |
| --- | --- | --- | --- | --- | --- |
| rowPaint | 49.3% | 58.8% | 93.2% | 81.3% | 93.2% |
| colPaint | 47.0% | 58.2% | 93.6% | 82.0% | 93.6% |
| diagPaint | 58.7% | 51.1% | 90.9% | 75.0% | 90.9% |
| transmute | 6.7% | 55.0% | 95.0% | 84.6% | 95.0% |
| colorSwap | 28.0% | 66.7% | 91.7% | 90.3% | 91.7% |
| flood | 41.7% | 59.2% | 88.8% | 77.1% | 88.8% |
| spread | 3.3% | 10.0% | 80.0% | 20.0% | 80.0% |
| stamp | 64.7% | 55.2% | 95.4% | 78.1% | 95.4% |
| majority | 48.3% | 66.2% | 96.6% | 91.4% | 96.6% |
| slide | 74.0% | 20.7% | 26.6% | 30.1% | 26.6% |
| trade | 61.3% | 40.2% | 56.5% | 56.9% | 56.5% |
| mirror | 2.7% | 75.0% | 100.0% | 100.0% | 100.0% |
| groupPaint | 59.3% | 32.0% | 68.5% | 46.0% | 68.5% |
| corners | 51.7% | 44.5% | 80.6% | 60.5% | 80.6% |
| rowMirror | 57.3% | 3.5% | 3.5% | 5.3% | 3.5% |
| colMirror | 58.7% | 2.8% | 5.1% | 4.1% | 5.1% |
| minority | 58.0% | 52.3% | 92.5% | 75.2% | 92.5% |
| cross | 61.7% | 63.2% | 92.4% | 91.4% | 92.4% |
| purge | 5.7% | 76.5% | 100.0% | 100.0% | 100.0% |
| scatter | 19.3% | 81.0% | 0.0% | 94.0% | 0.0% |
| wildTransmute | 20.7% | 82.3% | 0.0% | 98.1% | 0.0% |
| luckyLine | 18.7% | 23.2% | 0.0% | 38.2% | 0.0% |
| tumble | 18.7% | 3.6% | 0.0% | 6.1% | 0.0% |
| quadrants | 22.7% | 8.8% | 0.0% | 14.3% | 0.0% |
