import { defineStore } from 'pinia';

export const useEmployeesStore = defineStore('employees', {
  state: () => ({
    employees: [],
    selectedEmployee: null,
    isLoading: false,
    error: null
  }),
  
  getters: {
    allEmployees: (state) => state.employees,
    getSelectedEmployee: (state) => state.selectedEmployee,
  },
  
  actions: {
    async fetchEmployees() {
      this.isLoading = true;
      try {
        const response = await fetch('/api/employees');
        const data = await response.json();
        this.employees = data;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
    async addEmployee(employee) {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });
      const data = await response.json();
      this.employees.push(data);
    },
    async updateEmployee(employee) {
      const response = await fetch(`/api/employees/${employee.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });
      const data = await response.json();
      const index = this.employees.findIndex((emp) => emp.id === data.id);
      if (index !== -1) {
        this.employees.splice(index, 1, data);
      }
    },
    async deleteEmployee(id) {
      await fetch(`/api/employees/${id}`, {
        method: 'DELETE',
      });
      this.employees = this.employees.filter((employee) => employee.id !== id);
    },
    selectEmployee(employee) {
      this.selectedEmployee = employee;
    },
  }
});