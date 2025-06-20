import { defineStore } from 'pinia';

export const usePayrollStore = defineStore('payroll', {
  // State sebagai function yang return object
  state: () => ({
    employees: [],
    payrolls: [],
    currentPayroll: null,
    isLoading: false,
    error: null
  }),
  
  // Getters tetap sama strukturnya
  getters: {
    allEmployees: (state) => state.employees,
    allPayrolls: (state) => state.payrolls,
    currentPayroll: (state) => state.currentPayroll,
  },
  
  // Actions menggabungkan mutations dan actions Vuex
  actions: {
    async fetchEmployees() {
      this.isLoading = true;
      try {
        // Untuk development, gunakan data dummy
        this.employees = [
          { id: 1, name: 'Budi Santoso', position: 'Manager', shift: 'Pagi', salary: 8500000 },
          { id: 2, name: 'Siti Nurhayati', position: 'Staff', shift: 'Siang', salary: 4500000 },
          { id: 3, name: 'Rudi Hermawan', position: 'Intern', shift: 'Pagi', salary: 2500000 },
        ];
        
        // Untuk implementasi API nantinya:
        // const response = await fetch('/api/employees');
        // const data = await response.json();
        // this.employees = data;
      } catch (error) {
        this.error = error.message;
        console.error('Error fetching employees:', error);
      } finally {
        this.isLoading = false;
      }
    },
    
    async fetchPayrolls() {
      this.isLoading = true;
      try {
        // Data dummy untuk development
        this.payrolls = [
          { 
            id: 1, 
            employeeId: 1,
            employeeName: 'Budi Santoso', 
            period: '2025-06',
            baseSalary: 8500000, 
            overtime: 1000000, 
            bonus: 2000000, 
            deductions: 500000,
            totalSalary: 11000000
          },
          { 
            id: 2, 
            employeeId: 2,
            employeeName: 'Siti Nurhayati', 
            period: '2025-06',
            baseSalary: 4500000, 
            overtime: 500000, 
            bonus: 1000000, 
            deductions: 300000,
            totalSalary: 5700000
          },
        ];
        
        // Untuk implementasi API nantinya:
        // const response = await fetch('/api/payrolls');
        // const data = await response.json();
        // this.payrolls = data;
      } catch (error) {
        this.error = error.message;
        console.error('Error fetching payrolls:', error);
      } finally {
        this.isLoading = false;
      }
    },
    
    async fetchPayrollByPeriod(period) {
      this.isLoading = true;
      try {
        console.log('Fetching payroll for period:', period);
        // Implementasi sebenarnya akan mengambil data dari API berdasarkan period
        // Untuk sekarang, filter data dummy berdasarkan period
        
        await this.fetchPayrolls(); // Fetch semua data dulu
        
        // Filter berdasarkan period jika diperlukan
        if (period) {
          this.payrolls = this.payrolls.filter(p => p.period === period);
        }
      } catch (error) {
        this.error = error.message;
        console.error('Error fetching payroll by period:', error);
      } finally {
        this.isLoading = false;
      }
    },
    
    calculateTotalSalary(payrollData) {
      const totalSalary = 
        parseFloat(payrollData.baseSalary || 0) + 
        parseFloat(payrollData.overtime || 0) + 
        parseFloat(payrollData.bonus || 0) - 
        parseFloat(payrollData.deductions || 0);
        
      // Di Pinia, kita bisa langsung update state
      this.currentPayroll = { ...payrollData, totalSalary };
      
      return totalSalary;
    },
    
    async savePayroll(payroll) {
      this.isLoading = true;
      try {
        // Hitung total jika belum dihitung
        if (!payroll.totalSalary) {
          payroll.totalSalary = this.calculateTotalSalary(payroll);
        }
        
        // Untuk development, tambahkan ke array lokal
        // Generate ID untuk payroll baru
        if (!payroll.id) {
          payroll.id = Math.max(0, ...this.payrolls.map(p => p.id)) + 1;
        }
        
        // Tambahkan ke state atau update jika sudah ada
        const index = this.payrolls.findIndex(p => p.id === payroll.id);
        if (index !== -1) {
          this.payrolls[index] = payroll;
        } else {
          this.payrolls.push(payroll);
        }
        
        // Untuk implementasi API nantinya:
        // const response = await fetch('/api/payrolls', {
        //   method: payroll.id ? 'PUT' : 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(payroll)
        // });
        // const savedPayroll = await response.json();
        
        return payroll;
      } catch (error) {
        this.error = error.message;
        console.error('Error saving payroll:', error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    }
  }
});