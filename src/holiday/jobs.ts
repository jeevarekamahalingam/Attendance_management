import cron from 'node-cron';
import { calculateWorkingDays, appendToJsonFile } from './utils';
import { Month, WorkingDaysRecord } from './type';

export const scheduleToCalWorkingDays = cron.schedule('0 0 1 * *', async () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  const workingDays = await calculateWorkingDays(year, month);

  const monthName = Object.values(Month)[month - 1];

  const data: WorkingDaysRecord = {
    [monthName]: workingDays
  };

  appendToJsonFile(data);
  console.log(`Working days for ${monthName} ${year}: ${workingDays}`);
});
