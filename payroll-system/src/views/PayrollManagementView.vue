<template>
  <div class="payroll-management">
    <h1>Manajemen Gaji</h1>
    <PayrollPeriodSelector @updatePeriod="updatePayrollPeriod" />
    <SalaryForm @submit="submitSalaryData" />
    <div class="salary-list">
      <h2>Daftar Gaji</h2>
      <table>
        <thead>
          <tr>
            <th>Nama Karyawan</th>
            <th>Gaji Pokok</th>
            <th>Lembur</th>
            <th>Bonus</th>
            <th>Potongan</th>
            <th>Total Gaji</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="salary in salaries" :key="salary.id">
            <td>{{ salary.employeeName }}</td>
            <td>{{ formatCurrency(salary.baseSalary) }}</td>
            <td>{{ formatCurrency(salary.overtime) }}</td>
            <td>{{ formatCurrency(salary.bonus) }}</td>
            <td>{{ formatCurrency(salary.deduction) }}</td>
            <td>{{ formatCurrency(salary.total) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import PayrollPeriodSelector from '@/components/payroll/PayrollPeriodSelector.vue';
import SalaryForm from '@/components/payroll/SalaryForm.vue';
import { usePayrollStore } from '@/store/modules/payroll';
import { storeToRefs } from 'pinia';
import { formatCurrency } from '@/utils/currencyFormatter.js';

export default {
  components: {
    PayrollPeriodSelector,
    SalaryForm,
  },
  data() {
    return {
      salaries: [],
    };
  },
  computed: {
    ...mapState('payroll', ['payrollData']),
  },
  methods: {
    updatePayrollPeriod(period) {
      // Logic to update payroll period and fetch salaries
    },
    submitSalaryData(salaryData) {
      // Logic to submit salary data and update the list
    },
    formatCurrency(value) {
      return formatCurrency(value);
    },
  },
  mounted() {
    // Fetch initial salary data
  },
};
</script>

<style scoped>
.payroll-management {
  padding: 20px;
}
.salary-list {
  margin-top: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f2f2f2;
}
</style>