export interface leave{
    id?:number,
    user_uuid:string,
    title?:string,
    leave_type?:leaveTypeEnum,
    start_date?:Date,
    end_date?:Date,
    reason?:string,
    status?:leaveStatusEnum,
    approved_by?:string,
    isGreater?:number
}
export enum leaveTypeEnum {
    SL = 'SL',
    AL = 'AL',
    CL = 'CL',
    CL_HALF = 'CL - 0.5',
    AL_HALF = 'AL - 0.5',
    SL_HALF = 'SL - 0.5'
  }
  
  export enum leaveStatusEnum {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected'
  }
  