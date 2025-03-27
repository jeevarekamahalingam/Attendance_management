
export const claimExpenseQuery=()=>{
    return`
    insert into 
        expense 
        (user_uuid,
        applied_date,
        expense_category,
        transaction_date,
        expense_amount,
        description) 
        values ($1,$2,$3,$4,$5,$6)`
}

export const getClaimRecordsQuery=()=>{
    return `select 
                id, 
                to_char(transaction_date,'Mon DD YYYY') as "date",
                expense_category as "type", 
                expense_amount as "totalExpense" 
                from 
                expense 
                where 
                user_uuid=$1 
                and 
                extract(year from transaction_date)=extract(year from CURRENT_DATE) 
                and 
                status=$2;`
}
export const getExpenseStatQuery=()=>{
    return` select
                sum(case
                        when status!='rejected' then expense_amount 
                        else 0
                    end)::text as "totalAmount",
                sum(case
                        when status='approved' then expense_amount 
                        else 0
                    end)::text as "approvedAmount",
                sum(case
                        when status='review' then expense_amount 
                        else 0
                    end)::text as "reviewAmount"
            from expense 
            where
            user_uuid=$1 
            and 
                extract(year from transaction_date)=extract(year from CURRENT_DATE) `
}