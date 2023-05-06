import * as fs from "fs";
import * as csv from "csv-parse";


/*
 * TODO
 * 1. load csv data into sqlite, with validation.
 * 2. read data from db.
 * 3. make big ol' object where lines of credit are the parent to L/Cs and Import Bills
 *   Assume all Import Bills are usuance.
 * 4. print L/Cs and Import Bills that are orphaned. (save to a .log?)
 * 5. spit out the json for line of credits and their children that check out
 */

fs.createReadStream('./test.csv')
 .pipe(csv.parse({ delimiter: ',', from_line: 2}))
 .on('data', (d) => { console.log(d) })
 .on('end', () => { console.log("done!") })
 .on('error', (e) => { console.log(e.message) });
