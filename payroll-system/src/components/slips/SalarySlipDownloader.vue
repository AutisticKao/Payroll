<template>
  <div class="salary-slip-downloader">
    <button 
      @click="downloadSlip" 
      :disabled="loading" 
      class="download-btn"
    >
      <span v-if="loading">Mengunduh...</span>
      <span v-else>
        <i class="download-icon">⬇️</i> Unduh Slip Gaji
      </span>
    </button>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { generateSalarySlip, downloadSalarySlip } from '@/services/pdfService.js';
import { useEmployeesStore } from '@/store/modules/employees';
import { useSalarySlipsStore } from '@/store/modules/salarySlips';

export default {
  name: 'SalarySlipDownloader',
  props: {
    slipId: {
      type: [Number, String],
      required: true
    }
  },
  setup(props) {
    const loading = ref(false);
    const error = ref(null);
    const employeesStore = useEmployeesStore();
    const salarySlipsStore = useSalarySlipsStore();

    const downloadSlip = async () => {
      loading.value = true;
      error.value = null;
      
      try {
        // 1. Dapatkan data slip gaji berdasarkan ID
        const salarySlip = salarySlipsStore.getSalarySlipById(props.slipId);
        
        if (!salarySlip) {
          throw new Error('Slip gaji tidak ditemukan');
        }
        
        // 2. Dapatkan data karyawan berdasarkan employeeId di slip
        const employee = employeesStore.employees.find(
          emp => emp.id === salarySlip.employeeId
        );
        
        if (!employee) {
          throw new Error('Data karyawan tidak ditemukan');
        }
        
        // 3. Gabungkan data slip gaji dan karyawan
        const employeeData = {
          id: employee.id,
          name: employee.name,
          position: employee.position,
          shift: employee.shift,
          basicSalary: salarySlip.components?.baseSalary || employee.salary,
          overtime: salarySlip.components?.overtime || 0,
          bonus: salarySlip.components?.bonus || 0,
          deductions: salarySlip.components?.deductions || 0,
          totalSalary: salarySlip.totalSalary || employee.salary,
          period: salarySlip.period || new Date().toISOString().slice(0, 7)
        };
        
        // 4. Generate dan download slip gaji
        await downloadSalarySlip(employeeData);
        
      } catch (error) {
        console.error('Error downloading slip:', error);
        error.value = `Gagal mengunduh slip: ${error.message}`;
      } finally {
        loading.value = false;
      }
    };

    return {
      loading,
      error,
      downloadSlip
    };
  }
};
</script>

<style scoped>
.salary-slip-downloader {
  margin: 10px 0;
}

.download-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.download-btn:hover {
  background-color: #45a049;
}

.download-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.download-icon {
  font-size: 1.2em;
}

.error-message {
  color: #d32f2f;
  margin-top: 8px;
  font-size: 0.9rem;
}
</style>