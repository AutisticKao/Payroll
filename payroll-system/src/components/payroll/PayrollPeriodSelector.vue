<template>
  <div class="payroll-period-selector">
    <label for="payroll-period">Pilih Periode Payroll:</label>
    <select v-model="selectedPeriod" @change="updatePeriod">
      <option v-for="period in payrollPeriods" :key="period.id" :value="period.id">
        {{ period.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedPeriod: null,
      payrollPeriods: [
        { id: 1, name: 'Januari 2023' },
        { id: 2, name: 'Februari 2023' },
        { id: 3, name: 'Maret 2023' },
        // Tambahkan periode lainnya sesuai kebutuhan
      ],
    };
  },
  methods: {
    updatePeriod() {
      this.$emit('period-selected', this.selectedPeriod);
    },
  },
  mounted() {
    if (this.payrollPeriods.length > 0) {
      this.selectedPeriod = this.payrollPeriods[0].id;
      this.updatePeriod();
    }
  },
};
</script>

<style scoped>
.payroll-period-selector {
  margin: 20px 0;
}
</style>