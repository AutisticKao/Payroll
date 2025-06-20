<template>
  <div class="salary-slips-view">
    <h1>Slip Gaji Karyawan</h1>
    <div v-if="salarySlips.length === 0">
      <p>Tidak ada slip gaji yang tersedia.</p>
    </div>
    <div v-else>
      <ul>
        <li v-for="slip in salarySlips" :key="slip.id">
          <SalarySlip :slip="slip" />
          <SalarySlipDownloader :slipId="slip.id" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SalarySlip from '@/components/slips/SalarySlip.vue';
import SalarySlipDownloader from '@/components/slips/SalarySlipDownloader.vue';
import { usePayrollStore } from '@/store/modules/payroll';
import { storeToRefs } from 'pinia';

export default {
  components: {
    SalarySlip,
    SalarySlipDownloader,
  },
  computed: {
    ...mapState('salarySlips', ['salarySlips']),
  },
  created() {
    this.$store.dispatch('salarySlips/fetchSalarySlips');
  },
};
</script>

<style scoped>
.salary-slips-view {
  padding: 20px;
}
</style>