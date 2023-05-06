import { z } from "zod";

export enum BillType {
    AtSight,
    Usuance,
};

export const metaSchema = z.object({
    id: z.number().int().positive()
});

export const lineOfCreditSchema = metaSchema.extend({
    obligorId: z.number().int().positive(),
    limit: z.number().int().positive(),
    balance: z.number().int().positive(),
});


export const letterOfCreditSchema = metaSchema.extend({
    issuer: z.string(),
    beneficiary: z.string(),
    locId: z.number().int().positive(),
    balance: z.number().nonnegative(),
})


export const importBillSchema = metaSchema.extend({
    amount: z.number().nonnegative(),
    dueDate: z.string().datetime(),
    lcId: z.number().int().positive(),
    locId: z.number().int().positive(),
    type: z.nativeEnum(BillType),

});

export type Meta = z.infer<typeof metaSchema>;
export type LineOfCredit = z.infer<typeof lineOfCreditSchema>;
export type LetterOfCredit = z.infer<typeof letterOfCreditSchema>;
export type ImportBill = z.infer<typeof importBillSchema>;
