export type Employee = {
    id: number;
    employee_name: string;
    employee_age: number;
    employee_salary: number;
};

type ApiResponse = {
    status: string;
    data: Employee[];
    message: string;
};