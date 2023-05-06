import * as fs from "fs";
import * as csv from "csv-parse";

fs.createReadStream('./test.csv')
 .pipe(csv.parse({ delimiter: ',', from_line: 2}))
 .on('data', (d) => { console.log(d) })
 .on('end', () => { console.log("done!") })
 .on('error', (e) => { console.log(e.message) });
