export const isUUIDpresentQuery=`select first_name from users where uuid_=$1`;
export const getRoleNameQuery=`SELECT role_name FROM role WHERE id= $1`;
export const getUserData=`select * from users where uuid_=$1`;
export const getRoleID=`SELECT id FROM role WHERE role_name = $1`;
export const getReportingManager=`SELECT concat_ws(' ',first_name,last_name) as names FROM users WHERE uuid_= $1`;
export const getReportingManagerByUserUUID= `select concat_ws(' ',first_name,last_name) as name from users where uuid_=(select reporting_manager_uuid from users where uuid_=$1)`
export const updateLeaveDurationQuery=`update users set leave_pending=leave_pending-1-$2 where uuid_=$1`
export const halfLeaveQuery=`update users set leave_pending=leave_pending-0.5 where uuid_=$1`
export const getLeaveStatForAUserquery=`select 
u.leave_pending::text as "leaveBalance",
COUNT(l.id) FILTER (WHERE l.status = 'approved')::text AS "leaveApproved",
COUNT(l.id) FILTER (WHERE l.status = 'pending')::text AS "leavePending",
COUNT(l.id) FILTER (WHERE l.status = 'rejected')::text AS "leaveCancelled"
FROM users u left join leave_data l on l.user_uuid=u.uuid_ where u.uuid_=$1 group by u.leave_pending;`
export const getUsersByManagerQuery = () => {
    return `
            select u.uuid_,u.first_name, u.last_name, u.user_name
            from users u
            join users manager ON u.reporting_manager_id = manager.id
            where manager.user_name = $1;`;
  }; 
  export const createUserQuery = `
  INSERT INTO users (
    employee_code,
    first_name,
    last_name,
    user_name,
    role_id,
    password,
    address,
    phone_no,
    department,
    reporting_manager_id
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  RETURNING *;`;
