import { FileParser } from "./fileparser";

/*
 * TODO
 * 1. load csv data into sqlite, with validation.
 * 2. read data from db.
 * 3. make big ol' object where lines of credit are the parent to L/Cs and Import Bills
 *   Assume all Import Bills are usuance.
 * 4. print L/Cs and Import Bills that are orphaned. (save to a .log?)
 * 5. spit out the json for line of credits and their children that check out
 */

FileParser.parse('line_of_credits.csv');
FileParser.parse('letter_of_credits.csv');
FileParser.parse('import_bills.csv');
