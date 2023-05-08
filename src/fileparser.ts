import * as fs from "fs";
import * as Papa from "papaparse";
import * as path from "path";
import { z } from "zod";

type CsvSchema = {
    [filename: string]: { [field: string]: z.ZodType }
};

type CsvRow = Record<string, string>;
type ParsedRow = Record<string, string | number | Date>;

export class FileParser {

    static csvSchema: CsvSchema = {
        "line_of_credits": {
            "id": z.coerce.number().positive(),
            "obligorId": z.coerce.number().positive(),
            "limit": z.coerce.number().nonnegative(),
            "balance": z.coerce.number().nonnegative(),
        },
        "letter_of_credits": {
            "id": z.coerce.number().positive(),
            "issuerId": z.coerce.number().positive(),
            "beneficiaryId": z.coerce.number().positive(),
            "locId": z.coerce.number().positive(),
            "balance": z.coerce.number().nonnegative(),
        },
        "import_bills": {
            "id": z.coerce.number().positive(),
            "dueDate": z.coerce.date(), // todo
            "lcId": z.coerce.number().positive(),
            "locId": z.coerce.number().positive(),
            "amount": z.coerce.number().nonnegative(),
        },
    };

    public static stripExtension(filename: string): string {
        return filename.split('.')[0];
    };

    private static mapRowDataTypes(filename: string, row: CsvRow): Record<string, any> {
        let mapped: {[k: string]: any} = { ...row };
        Object.keys(FileParser.csvSchema[FileParser.stripExtension(filename)]).forEach((k, _) => {
            const mapper = FileParser.csvSchema[FileParser.stripExtension(filename)][k];
            mapped[k] = mapper.parse(row[k]);
        });
        return mapped;
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
