<template>
  <div>
    <h2>Download Salary Slip</h2>
    <button @click="downloadSlip">Download Slip</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import pdfService from '@/services/pdfService';

export default {
  name: 'SalarySlipDownloader',
  props: {
    employeeId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const loading = ref(false);

    const downloadSlip = async () => {
      loading.value = true;
      try {
        await pdfService.downloadSalarySlip(props.employeeId);
      } catch (error) {
        console.error('Error downloading slip:', error);
      } finally {
        loading.value = false;
      }
    };

    return {
      loading,
      downloadSlip
    };
  }
};
</script>

<style scoped>
button {
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
}
</style>