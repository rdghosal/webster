import { z } from "zod";

export enum BillType {
    AtSight,
    Usuance,
};

export const metaSchema = z.object({
    id: z.coerce.number().int().positive()
});

export const lineOfCreditSchema = metaSchema.extend({
    obligorId: z.coerce.number().int().positive(),
    limit: z.coerce.number().int().positive(),
    balance: z.coerce.number().int().positive(),
});


export const letterOfCreditSchema = metaSchema.extend({
    issuerId: z.coerce.string(),
    beneficiaryId: z.coerce.string(),
    locId: z.coerce.number().int().positive(),
    balance: z.coerce.number().nonnegative(),
})


export const importBillSchema = metaSchema.extend({
    amount: z.coerce.number().nonnegative(),
    dueDate: z.coerce.date(),
    lcId: z.coerce.number().int().positive(),
    locId: z.coerce.number().int().positive(),
    type: z.coerce.string(),
});

export type Meta = z.infer<typeof metaSchema>;
export type LineOfCredit = z.infer<typeof lineOfCreditSchema>;
export type LetterOfCredit = z.infer<typeof letterOfCreditSchema>;
export type ImportBill = z.infer<typeof importBillSchema>;
