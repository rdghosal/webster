import { FileParser } from "./fileparser";
import MockDb from "./client";

const db = new MockDb();

/*
 * TODO
 * 1. load csv data into sqlite, with validation. -> DONE
 * 2. read data from db. -> DONE
 * 3. make big ol' object where lines of credit are the parent to L/Cs and Import Bills
 *   Assume all Import Bills are usuance.
 * 4. print L/Cs and Import Bills that are orphaned. (save to a .log?)
 * 5. spit out the json for line of credits and their children that check out
 */

(() =>  {
    ['line_of_credits.csv', 'letter_of_credits.csv', 'import_bills.csv']
        .forEach(async (filename) => {
            const parsed = await FileParser.parse(filename);
            const collection = FileParser.stripExtension(filename);
            db.write(collection, ...parsed);
            console.log(db)
        })
})();
