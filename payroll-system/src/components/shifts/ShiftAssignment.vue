<template>
  <div class="shift-assignment">
    <h2>Assign Karyawan ke Shift</h2>
    <form @submit.prevent="assignShift">
      <div>
        <label for="employee">Pilih Karyawan:</label>
        <select v-model="selectedEmployee" id="employee" required>
          <option v-for="employee in employees" :key="employee.id" :value="employee.id">
            {{ employee.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="shift">Pilih Shift:</label>
        <select v-model="selectedShift" id="shift" required>
          <option v-for="shift in shifts" :key="shift.id" :value="shift.id">
            {{ shift.name }} ({{ shift.startTime }} - {{ shift.endTime }})
          </option>
        </select>
      </div>
      <button type="submit">Tugaskan Shift</button>
    </form>
    <div v-if="assignmentSuccess" class="success-message">
      Shift berhasil ditugaskan!
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getEmployees, getShifts, assignEmployeeToShift } from '@/services/shiftService';

export default {
  name: 'ShiftAssignment',
  setup() {
    const employees = ref([]);
    const shifts = ref([]);
    const selectedEmployee = ref(null);
    const selectedShift = ref(null);
    const assignmentSuccess = ref(false);

    const fetchEmployees = async () => {
      employees.value = await getEmployees();
    };

    const fetchShifts = async () => {
      shifts.value = await getShifts();
    };

    const assignShift = async () => {
      if (selectedEmployee.value && selectedShift.value) {
        await assignEmployeeToShift(selectedEmployee.value, selectedShift.value);
        assignmentSuccess.value = true;
        // Reset selections
        selectedEmployee.value = null;
        selectedShift.value = null;
      }
    };

    onMounted(() => {
      fetchEmployees();
      fetchShifts();
    });

    return {
      employees,
      shifts,
      selectedEmployee,
      selectedShift,
      assignmentSuccess,
      assignShift,
    };
  },
};
</script>

<style scoped>
.shift-assignment {
  max-width: 400px;
  margin: auto;
}

.success-message {
  margin-top: 20px;
  color: green;
}
</style>