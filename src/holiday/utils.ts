import { pool } from '../db';
import { getCOuntOfHolidaysOfMonth } from './query';
import fs from 'fs';
import path from 'path';
import { WorkingDaysRecord } from './type';

export async function calculateWorkingDays(year: number, month: number): Promise<number> {
  let workingDays = 0;
  const daysInMonth = new Date(year, month, 0).getDate();
  const mandatoryHolidays = await calculateHolidaysOfMonth(month);

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDay = new Date(year, month - 1, day);
    const weekday = currentDay.getDay();
    if (weekday !== 0 && weekday !== 6) {
      workingDays++;
    }
  }

  return workingDays - mandatoryHolidays;
}

export const calculateHolidaysOfMonth = async (month: number): Promise<number> => {
  const query = getCOuntOfHolidaysOfMonth;
  const result = await pool.query(query, [month]);
  const count = parseInt(result.rows[0].weekday_holidays, 10);
  return count;
};

const filePath = path.join(__dirname, '../workingDays.json');

export const appendToJsonFile = (newData: WorkingDaysRecord): void => {
  let existingData: WorkingDaysRecord[] = [];

  if (!fs.existsSync(filePath)) {
    existingData = [newData];
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf8');
    console.log('File created with first month entry.');
    return;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');

  try {
    existingData = JSON.parse(fileContent);
  } catch (error) {
    console.error('Invalid JSON format. Cannot parse file.');
    return;
  }

  const existingMonthData = existingData[0] || {};
  const newMonth = Object.keys(newData)[0];

  if (existingMonthData.hasOwnProperty(newMonth)) {
    console.log(`Entry for ${newMonth} already exists. Skipping.`);
    return;
  }

  existingMonthData[newMonth] = newData[newMonth];
  const updatedData: WorkingDaysRecord[] = [existingMonthData];

  fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), 'utf8');
  console.log(`New entry added for ${newMonth}.`);
};
