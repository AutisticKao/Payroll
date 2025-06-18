<template>
  <div class="salary-form">
    <h2>Form Input Gaji</h2>
    <form @submit.prevent="submitSalaryForm">
      <div class="form-group">
        <label for="basicSalary">Gaji Pokok (Rupiah)</label>
        <input type="number" v-model="salary.basic" id="basicSalary" required />
      </div>
      <div class="form-group">
        <label for="overtime">Lembur (Rupiah)</label>
        <input type="number" v-model="salary.overtime" id="overtime" />
      </div>
      <div class="form-group">
        <label for="bonus">Bonus (Rupiah)</label>
        <input type="number" v-model="salary.bonus" id="bonus" />
      </div>
      <div class="form-group">
        <label for="deductions">Potongan (Rupiah)</label>
        <input type="number" v-model="salary.deductions" id="deductions" />
      </div>
      <div class="form-group">
        <label for="payrollDate">Tanggal Payroll</label>
        <input type="date" v-model="payrollDate" id="payrollDate" required />
      </div>
      <button type="submit">Hitung Total Gaji</button>
    </form>
    <div v-if="totalSalary !== null" class="total-salary">
      <h3>Total Gaji: {{ totalSalary }} Rupiah</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      salary: {
        basic: 0,
        overtime: 0,
        bonus: 0,
        deductions: 0,
      },
      payrollDate: '',
      totalSalary: null,
    };
  },
  methods: {
    submitSalaryForm() {
      this.totalSalary = this.salary.basic + this.salary.overtime + this.salary.bonus - this.salary.deductions;
      // Here you can also add code to save the salary data to the database
    },
  },
};
</script>

<style scoped>
.salary-form {
  max-width: 400px;
  margin: auto;
}
.form-group {
  margin-bottom: 1rem;
}
</style>