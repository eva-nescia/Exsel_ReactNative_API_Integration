import { ApiResponse } from '../types/employee';

const API_URL = 'https://dummy.restapiexample.com/api/v1/employees';

export const getEmployees = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const json: ApiResponse = await response.json();
  return json.data;
};