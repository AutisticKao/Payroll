import axios from 'axios';

const API_URL = 'http://your-api-url.com/api'; // Replace with your actual API URL

export const payrollService = {
    getPayrolls() {
        return axios.get(`${API_URL}/payrolls`);
    },
    getPayrollById(id) {
        return axios.get(`${API_URL}/payrolls/${id}`);
    },
    createPayroll(payrollData) {
        return axios.post(`${API_URL}/payrolls`, payrollData);
    },
    updatePayroll(id, payrollData) {
        return axios.put(`${API_URL}/payrolls/${id}`, payrollData);
    },
    deletePayroll(id) {
        return axios.delete(`${API_URL}/payrolls/${id}`);
    },
    calculateTotalSalary(baseSalary, overtime, bonus, deductions) {
        return baseSalary + overtime + bonus - deductions;
    }
};