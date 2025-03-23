import { pool } from '../db'; 
import {getCOuntOfHolidaysOfMonth} from './query';
import fs from 'fs';
import path from 'path';
import {WorkingDayEntry} from './type'

export async function calculateWorkingDays(year: number, month: number): Promise<number> {
    let workingDays = 0;
    const daysInMonth = new Date(year, month, 0).getDate(); // month is 1-based
    const mandatoryHolidays = await calculateHolidaysOfMonth(month); // ✅ await async call

    for (let day = 1; day <= daysInMonth; day++) {
        const currentDay = new Date(year, month - 1, day); // JS months are 0-based
        const weekday = currentDay.getDay(); // 0 = Sunday, 6 = Saturday
        if (weekday !== 0 && weekday !== 6) {
            workingDays++;
        }
    }

    return workingDays - mandatoryHolidays;
}

export const calculateHolidaysOfMonth = async (month: number): Promise<number> => {
    const query =getCOuntOfHolidaysOfMonth;

    const result = await pool.query(query, [month]);
    const count = parseInt(result.rows[0].weekday_holidays, 10); // safely convert to number
    return count;
};


const filePath = path.join(__dirname, '../workingDays.json');

export const appendToJsonFile = (newData: WorkingDayEntry) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([newData], null, 2), 'utf8');
    console.log('File created and first entry written.');
    return;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  let existingData = [];

  try {
    existingData = JSON.parse(fileContent);
  } catch (error) {
    console.error('Invalid JSON format. Cannot parse file.');
    return;
  }

  const isDuplicate = existingData.some(
    (entry: WorkingDayEntry) => entry.Year === newData.Year && entry.Month === newData.Month
  );

  if (isDuplicate) {
    console.log(`Entry for ${newData.Month}/${newData.Year} already exists. Skipping.`);
    return;
  }

  existingData.push(newData);
  fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf8');
  console.log(`New entry added for ${newData.Month}/${newData.Year}.`);
};