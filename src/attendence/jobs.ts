import corn from 'node-cron';
import { updateCheckout } from './utils';

export const checkOutUpdateCorn=corn.schedule("0 59 23 * * *",()=>{
    updateCheckout();
})