export const isUUIDpresentQuery=`select first_name from users where uuid_=$1`;
export const getUserData=`select * from users where uuid_=$1`;
export const getUsersByManagerQuery = () => {
    return `
            select u.first_name, u.last_name, u.user_name
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