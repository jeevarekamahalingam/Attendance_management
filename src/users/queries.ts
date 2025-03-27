export const isUUIDpresentQuery=`select first_name from users where uuid_=$1`;

export const getRoleNameQuery=`SELECT role_name FROM role WHERE id= $1`;

export const getUserData=`select * from users where uuid_=$1`;

// export const getRoleID=`SELECT id FROM role WHERE role_name = $1`;

export const getReportingManager=`SELECT concat_ws(' ',first_name,last_name) as names FROM users WHERE uuid_= $1`;

export const getReportingManagerByUserUUID= `select reporting_manager_uuid from users where uuid_=$1`

export const updateLeaveDurationQuery=`update users set leave_pending=leave_pending-1-$2 where uuid_=$1 returning *`

export const halfLeaveQuery=`update users set leave_pending=leave_pending-0.5 where uuid_=$1`

export const getLeaveStatForAUserquery=`select 
u.leave_pending::text as "leaveBalance",
COUNT(l.id) FILTER (WHERE l.status = 'approved')::text AS "leaveApproved",
COUNT(l.id) FILTER (WHERE l.status = 'pending')::text AS "leavePending",
COUNT(l.id) FILTER (WHERE l.status = 'rejected')::text AS "leaveCancelled"
FROM users u left join leave_data l on l.user_uuid=u.uuid_ where u.uuid_=$1 group by u.leave_pending;`

export const getUsersByManagerQuery = () => {
    return `
            select 
              uuid_ as "employeeUuid", 
              concat(first_name,' ',last_name) as name,
              user_name as email 
              from 
              users 
              where reporting_manager_uuid=$1;`;
  }; 

export const getListOfReportingManagersQuery=`select uuid_, concat(first_name,' ',last_name) as reporting_manager_name from users where role_id in (1,4,5,6,7,810,11,12);`;

export const createUserQuery = `
  INSERT INTO users (
    uuid_,
    employee_code,
    first_name,
    last_name,
    user_name,
    role_id,
    address,
    phone_no,
    department,
    reporting_manager_uuid
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  RETURNING *;`;

export const updateUsersQuery=(attributes:object,uuid_:string)=>{
  const field=Object.entries(attributes).reduce((acc,[key,value],idx)=>{
    if(idx===0)return `${key}='${value}'`
    else return `${acc} ,${key}='${value}'`
  },'');
  return `update users set ${field} where uuid_= '${uuid_}' returning *`
}