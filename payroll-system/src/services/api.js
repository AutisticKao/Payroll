import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Adjust the base URL as needed
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getEmployees = () => {
  return apiClient.get('/employees');
};

export const getEmployeeById = (id) => {
  return apiClient.get(`/employees/${id}`);
};

export const createEmployee = (employeeData) => {
  return apiClient.post('/employees', employeeData);
};

export const updateEmployee = (id, employeeData) => {
  return apiClient.put(`/employees/${id}`, employeeData);
};

export const deleteEmployee = (id) => {
  return apiClient.delete(`/employees/${id}`);
};

export const getPayrolls = () => {
  return apiClient.get('/payrolls');
};

export const createPayroll = (payrollData) => {
  return apiClient.post('/payrolls', payrollData);
};

export const getSalarySlips = () => {
  return apiClient.get('/salary-slips');
};

export const getSalarySlipById = (id) => {
  return apiClient.get(`/salary-slips/${id}`);
};

export const getShifts = () => {
  return apiClient.get('/shifts');
};

export const assignShift = (shiftData) => {
  return apiClient.post('/shifts', shiftData);
};