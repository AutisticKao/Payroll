import api from './api';

const employeeService = {
  getEmployees() {
    return api.get('/employees');
  },
  getEmployeeById(id) {
    return api.get(`/employees/${id}`);
  },
  createEmployee(employeeData) {
    return api.post('/employees', employeeData);
  },
  updateEmployee(id, employeeData) {
    return api.put(`/employees/${id}`, employeeData);
  },
  deleteEmployee(id) {
    return api.delete(`/employees/${id}`);
  }
};

export default employeeService;