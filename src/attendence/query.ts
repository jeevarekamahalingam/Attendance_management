export const countAttendence=`SELECT COUNT(DISTINCT date_) 
FROM attendence 
WHERE user_uuid = $1;
`;
export const checkIncheckoutDataQuery='select checkin, checkout from attendence where date_=$1 and user_uuid=$2'
export const toInsertValueToAttendenceTable=`INSERT INTO attendence (user_uuid, date_, checkin)
values($1,$2,$3)`;
export const checkoutQuery='update attendence set checkout=$1 where user_uuid=$2 and date_=$3';
export const getAttendenceDetailQuery=`
        select 
            to_char(date_,'Mon DD, YYYY') as "date", 
            to_char(checkin,'HH12:MI AM') as "checkIn" ,
            to_char(checkout,'HH12:MI AM')   as "checkOut",
            'active' as type
            from attendence 
            where user_uuid=$1;`
export const updateCheckoutQuery=`update case when checkout is null then current_timestamp end from attendence where date_current_date`;