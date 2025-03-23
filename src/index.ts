import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from './users/routes'
import './holiday/jobs'; 
dotenv.config();
import {calculateWorkingDays,appendToJsonFile} from './holiday/utils';
const app = express();
app.use(express.json());
// app.use(cors());
app.use("/attendence/users", userRoutes);


// const callOnce=async()=>{
//   const today = new Date();
//     const year = today.getFullYear();
//     const month = today.getMonth() + 1;
// const workingDays = await calculateWorkingDays(year, month);
//     const data = {
//         Year:year,
//         Month:month,
//         WorkingDays:workingDays
//       };
//       appendToJsonFile(data);}
// callOnce();
 const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
