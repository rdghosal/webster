import * as fs from "fs";
import * as Papa from "papaparse";
import * as path from "path";
import { z } from "zod";
import { importBillSchema, letterOfCreditSchema, lineOfCreditSchema } from "./models";

type CsvSchema = { [filename: string]: z.ZodObject<{[field: string]: z.ZodType}> };
type CsvRow = Record<string, string>;
type ParsedRow = Record<string, string | number | Date>;

export class FileParser {
    static csvSchema: CsvSchema = {
        line_of_credits: lineOfCreditSchema,
        letter_of_credits: letterOfCreditSchema,
        import_bills: importBillSchema,
    };

    public static stripExtension(filename: string): string {
        return filename.split('.')[0];
    };

    private static mapRowDataTypes(filename: string, row: CsvRow): Record<string, any> {
        const mapper = FileParser.csvSchema[FileParser.stripExtension(filename)]
        return mapper.parse(row);
    };

    public static async parse(filename: string): Promise<ParsedRow[]> {
        const s: string = await fs.promises.readFile(
            path.join(path.dirname(__dirname), 'static', filename),
            'utf8'
        );
        const result: Papa.ParseResult<CsvRow>  = Papa.parse(s, {
            header: true,
            // dynamicTyping: true, /* zod handles type coercions */
            skipEmptyLines: true,
        });
        return result.data.map(row => this.mapRowDataTypes(filename, row));
    };
};
