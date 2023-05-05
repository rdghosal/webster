enum BillType {
    AtSight,
    Usuance,
};

type Unique = {
    id: number;
};

type LineOfCredit = Unique & {   
    obligorId: number;
    limit: number;
    balance: number;
};

type LetterOfCredit = Unique & {  
    issuer: string;
    beneficiary: string;
    locId: number;
    balance: number;
};

type ImportBill = Unique & {
    amount: number;
    dueDate: Date;
    lcId: number;
    locId: number;
    type: BillType;
};

export { BillType, LineOfCredit, LetterOfCredit, ImportBill };
