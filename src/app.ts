import * as fs from "fs";
import * as Papa from "papaparse";

/*
 * TODO
 * 1. load csv data into sqlite, with validation.
 * 2. read data from db.
 * 3. make big ol' object where lines of credit are the parent to L/Cs and Import Bills
 *   Assume all Import Bills are usuance.
 * 4. print L/Cs and Import Bills that are orphaned. (save to a .log?)
 * 5. spit out the json for line of credits and their children that check out
 */
const s: fs.ReadStream = fs.createReadStream(__dirname + "/test.csv");
Papa.parse(s, {
    header: true,
    complete: (results) => {
        console.log(results.data);
    }
});
