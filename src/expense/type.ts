export interface Expense{
    user_uuid:string;
    applied_date?:Date;
    expense_category?:expenseCategoryEnum;
    expense_date?:Date;
    expense_amount?:number;
    description?:string;
    status?:expenseStatusEnum;
    approved_or_rejected_date?:Date;
    proof_url?:ProofFile[]
}

export enum expenseCategoryEnum{
    GENERAL='General',
    ONSITE_VISIT='Onsite Visit',
    CELEBRATION='Celebration',
    OFFICIAL_EVENTS='Official Events',
    FOOD='Food'
}
export enum expenseStatusEnum {
    REVIEW='review',
    APPROVED='approved',
    REJECTED='rejected'
}

export interface ProofFile{
    file_name:string;
    file_url:string;
}