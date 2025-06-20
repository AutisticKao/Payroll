import { defineStore } from 'pinia';

export const useSalarySlipsStore = defineStore('salarySlips', {
  state: () => ({
    salarySlips: [],
    isLoading: false,
    error: null
  }),
  
  getters: {
    allSalarySlips: (state) => state.salarySlips,
    getSalarySlipById: (state) => (id) => {
      return state.salarySlips.find(slip => slip.id === id);
    },
  },
  
  actions: {
    addSalarySlip(slip) {
      // Di Pinia, kita langsung ubah state tanpa commit
      this.salarySlips.push(slip);
    },
    
    removeSalarySlip(slipId) {
      // Langsung ubah state
      this.salarySlips = this.salarySlips.filter(slip => slip.id !== slipId);
    },
    
    async fetchSalarySlips() {
      this.isLoading = true;
      try {
        // Untuk development, gunakan data dummy
        this.salarySlips = [
          {
            id: 1,
            employeeId: 1,
            employeeName: 'Budi Santoso',
            period: '2025-06',
            amount: 11000000
          },
          {
            id: 2, 
            employeeId: 2,
            employeeName: 'Siti Nurhayati',
            period: '2025-06',
            amount: 5700000
          }
        ];
        
        // Untuk implementasi API nanti:
        // const response = await fetch('/api/salary-slips');
        // const data = await response.json();
        // this.salarySlips = data;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    }
  }
});