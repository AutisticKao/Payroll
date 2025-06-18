<template>
  <div class="salary-slip">
    <h2>Slip Gaji</h2>
    <div class="employee-info">
      <p><strong>Nama:</strong> {{ employee.name }}</p>
      <p><strong>Jabatan:</strong> {{ employee.position }}</p>
      <p><strong>Shift:</strong> {{ employee.shift }}</p>
    </div>
    <div class="salary-details">
      <p><strong>Gaji Pokok:</strong> {{ formatCurrency(employee.salary.base) }}</p>
      <p><strong>Uang Makan:</strong> {{ formatCurrency(employee.salary.meal) }}</p>
      <p><strong>Lembur:</strong> {{ formatCurrency(employee.salary.overtime) }}</p>
      <p><strong>Bonus:</strong> {{ formatCurrency(employee.salary.bonus) }}</p>
      <p><strong>Potongan:</strong> {{ formatCurrency(employee.salary.deduction) }}</p>
      <h3>Total Gaji: {{ formatCurrency(totalSalary) }}</h3>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { formatCurrency } from '@/utils/currencyFormatter';

export default {
  props: {
    employee: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const totalSalary = computed(() => {
      const { base, meal, overtime, bonus, deduction } = props.employee.salary;
      return base + meal + overtime + bonus - deduction;
    });

    return {
      totalSalary,
      formatCurrency
    };
  }
};
</script>

<style scoped>
.salary-slip {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
  max-width: 400px;
  margin: auto;
}

.employee-info {
  margin-bottom: 20px;
}

.salary-details {
  font-size: 16px;
}
</style>