export const createLeaveQuery=  `INSERT INTO leave_data (user_uuid, title, leave_type, start_date,end_date,reason,reporting_manager_uuid,applied_date)
values($1,$2,$3,$4,$5,$6,$7,$8)`
export const getAllLeaveForAUserquery=(isGreater: number | undefined):string=> {
    const comparator = isGreater===1 ? '<=' : '>=';
    const comparator1=isGreater===1 ? '>' : '<=';
    const operator=isGreater===1?'+':'-';
        return`SELECT
            l.id,
            l.user_uuid,
            l.title,
            l.leave_type,
            to_char(l.start_date,'Mon DD YYYY') as start_date,
            to_char(l.end_date,'Mon DD YYYY') as end_date,
            l.reason,
            l.status,
            CASE 
                WHEN l.status != 'pending'::status_type_enum THEN concat_ws(' ',rm.first_name,rm.last_name)
                ELSE 'Yet to be approved'
            END AS approved_by,
            u.leave_pending,
            l.end_date - l.start_date + 1 AS datedifference
            FROM leave_data l
            JOIN users u ON l.user_uuid = u.uuid_
            LEFT JOIN users rm ON u.reporting_manager_uuid = rm.uuid_
            WHERE l.user_uuid = $1
            AND l.start_date ${comparator} CURRENT_DATE ${operator} INTERVAL '1 year'
            AND l.start_date ${comparator1} CURRENT_DATE
            AND ($2::status_type_enum IS NULL OR l.status = $2::status_type_enum);`
  
}

export const changeLeaveStatusQuery=`update leave_data set status=$1 where id=$2 returning *`;
export const leaveDurationCalculationQuery=`SELECT end_date-start_date as DateDifference from leave_data where id=$1 `
export const listTeamMembersQuery=`
                select
                    l.id as "leaveId",
                    concat_ws(' ',u.first_name,u.last_name) as name,
                    concat(to_char(l.start_date,'Mon DD YYYY'),' - ',to_char(l.end_date,'Mon DD YYYY')) as "dateRange"
                    from leave_data l 
                    join users u on l.user_uuid = u.uuid_ 
                    where 
                    l.reporting_manager_uuid=$1
                    and
                    l.status='pending';`
export const getALeaveInfoOfAUserquery=`
                select 
                    l.title as "title",
                    l.leave_type as "leaveType", 
                    concat(to_char(l.start_date,'Mon DD YYYY'),'-',to_char(l.end_date,'Mon DD YYYY')) as "dateRange",
                    l.reason,
                    to_char(l.applied_date,'Mon DD YYYY') as "appliedOn",
                    u.phone_no as "contactNumber",
                    u.leave_pending as "leaveBalance" 
                    from 
                    leave_data l 
                    join 
                    users u 
                    on u.uuid_=l.user_uuid where id=$1;`
export const getApprovedLeaveQuery=`
                        select 
                            to_char(start_date,'Mon DD YYYY') as "date",
                            to_char(start_date,'Mon DD YYYY') as "startDate",
                            to_char(end_date,'Mon DD YYYY') as "endDate",
                            'leave' as type  
                            from
                            leave_data 
                            where 
                            user_uuid=$1 and
                            status="approved"
                            and start_date<=current_date ;`

