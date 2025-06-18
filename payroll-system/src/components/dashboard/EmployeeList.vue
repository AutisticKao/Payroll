<template>
  <div class="employee-list">
    <h2>List Karyawan</h2>
    <div v-if="isLoading" class="loading">
      Memuat data karyawan...
    </div>
    <div v-else-if="employees.length === 0" class="no-data">
      Tidak ada data karyawan yang ditemukan.
    </div>
    <table v-else>
      <thead>
        <tr>
          <th>Nama</th>
          <th>Jabatan</th>
          <th>Shift</th>
          <th>Gaji</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <td>{{ employee.name }}</td>
          <td>{{ employee.position }}</td>
          <td>{{ employee.shift }}</td>
          <td>{{ formatCurrency(employee.salary) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { formatCurrency } from '@/utils/currencyFormatter';

export default defineComponent({
  name: 'EmployeeList',
  
  props: {
    employees: {
      type: Array,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  
  methods: {
    formatCurrency
  }
});
</script>

<style scoped>
.employee-list {
  padding: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
.loading, .no-data {
  padding: 20px;
  text-align: center;
  color: #666;
  background: #f9f9f9;
  border-radius: 4px;
  margin-top: 15px;
}
</style>