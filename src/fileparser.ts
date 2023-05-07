import * as fs from "fs";
import * as Papa from "papaparse";
import * as path from "path";
import { z } from "zod";

type CsvSchema = {
    [filename: string]: { [field: string]: z.ZodType }
};

type CsvRow = Record<string, string>;

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

    private static stripExtension(filename: string): string {
        return filename.split('.')[0];
    }

    private static mapRowDataTypes(filename: string, row: CsvRow): Record<string, any> {
        let mapped: {[k: string]: any} = { ...row };
        Object.keys(this.csvSchema[this.stripExtension(filename)]).forEach((k, _) => {
            const mapper = this.csvSchema[this.stripExtension(filename)][k];
            mapped[k] = mapper.parse(row[k]);
            // mapped[k] = mapper(row[k]);
        });
        return mapped;
    };

    public static parse<T>(filename: string): void {
        const s: fs.ReadStream = fs.createReadStream(
            path.join(path.dirname(__dirname), 'static', filename)
        );
        Papa.parse(s, {
            header: true,
            complete: (results) => {
                let mappedRows: Record<string, any>[] = [];
                results.data.forEach((row, idx) => {
                    mappedRows.push(this.mapRowDataTypes(filename, row as CsvRow));
                });
                console.log(mappedRows);
            }
        });
    };
}
