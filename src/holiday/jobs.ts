import cron from 'node-cron';
import {calculateWorkingDays,appendToJsonFile} from './utils';

export const scheduleToCalWorkingDays=cron.schedule('0 0 1 * *', async () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    const workingDays = await calculateWorkingDays(year, month);
    const data = {
        Year:year,
        Month:month,
        WorkingDays:workingDays
      };
      appendToJsonFile(data);
    console.log(`Working days for ${month}/${year}:`, workingDays);

  
});

