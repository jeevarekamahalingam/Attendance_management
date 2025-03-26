export const getCOuntOfHolidaysOfMonth= `SELECT COUNT(id) AS weekday_holidays
FROM holiday
WHERE EXTRACT(MONTH FROM holidayDate) = $1
  AND EXTRACT(DOW FROM holidayDate) NOT IN (0, 6)
`;
export const getHolidaysQuery=`
      select 
        to_char(holiday_date,'Mon DD, YYYY') as"date", 
        to_char(holiday_date,'Day') as "day", 
        title,
        case 
          when holiday_date<=CURRENT_DATE then true 
          else false
        end as "status" from holiday;`