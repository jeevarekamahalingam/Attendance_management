export enum DepartmentType {
    STEAMA = "steam-a",
    LABS = "labs",
  }
  
  export enum RoleType {
    ASSISTANT_MANAGER = "Assistant Manager",
    INTERN = "Intern",
    GRADUATE_DEVELOPER = "Graduate Developer",
    QUALITY_ANALYST = "Quality Analyst",
    PRODUCT_MANAGER = "Product Manager",
    HEAD_OF_DESIGN = "Head of Design",
    DIRECTOR_OF_TECHNOLOGY = "Director of Technology",
    FULLSTACK_DEVELOPER = "Fullstack Developer",
    GRADUATE_ANALYST = "Graduate Analyst",
    HEAD_OF_DELIVERY = "Head of Delivery",
    TECHNICAL_LEAD = "Technical Lead",
    TECHNICAL_LEAD_MOBILE = "Technical Lead (Mobile)",
    OPERATIONS_MANAGER = "Operations Manager",
    DESIGNER = "Designer",
    VP = "VP",
  }
export interface User {
    uuid_:string,
    employee_code?:string;
    first_name?: string;
    last_name?: string;
    user_name?: string; 
    role_id?:number;
    address?:string;
    phone_no?:string;
    department?:string;
    reporting_manager_uuid?: number; 
  }
  
  export interface userEditData{
    uuid_:string;
    address?:string;
    phone_no?:string;
  }