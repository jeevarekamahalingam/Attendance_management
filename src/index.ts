import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import './holiday/jobs'; 
import userRoutes from './users/routes'
import attendenceRoute from "./attendence/routes";
import leaveDataRoute from "./leaveData/routes";
import holidayRoute from "./holiday/routes";

// import { calculateWorkingDays,appendToJsonFile } from "./holiday/utils";
// import { WorkingDaysRecord,Month } from "./holiday/type";
dotenv.config();
// import {calculateWorkingDays,appendToJsonFile} from './holiday/utils';
const app = express();
app.use(express.json());
// app.use(cors());
app.use("/attendence/users", userRoutes);
app.use('/attendence/attendence',attendenceRoute);
app.use('/attendence/leave',leaveDataRoute);
app.use('/attendence/holiday',holidayRoute);

// const callOnce=async()=>{
//   const today = new Date();
//     const year = today.getFullYear();
//     const month = today.getMonth() + 1;
  
//     const workingDays = await calculateWorkingDays(year, month);
  
//     const monthName = Object.values(Month)[month - 1];
  
//     const data: WorkingDaysRecord = {
//       [monthName]: workingDays
//     };
  
//     appendToJsonFile(data);
//     console.log(`Working days for ${monthName} ${year}: ${workingDays}`);}
// callOnce();
 const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
