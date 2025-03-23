export const getCOuntOfHolidaysOfMonth= `SELECT COUNT(id) AS weekday_holidays
FROM holiday
WHERE EXTRACT(MONTH FROM holidayDate) = $1
  AND EXTRACT(DOW FROM holidayDate) NOT IN (0, 6)
`;