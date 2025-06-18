<template>
  <div>
    <h2>Shift List</h2>
    <table>
      <thead>
        <tr>
          <th>Employee Name</th>
          <th>Shift</th>
          <th>Working Hours</th>
          <th>Days Worked</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="shift in shifts" :key="shift.id">
          <td>{{ shift.employeeName }}</td>
          <td>{{ shift.shiftType }}</td>
          <td>{{ shift.workingHours }}</td>
          <td>{{ shift.daysWorked }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ShiftList',
  data() {
    return {
      shifts: []
    };
  },
  created() {
    this.fetchShifts();
  },
  methods: {
    async fetchShifts() {
      try {
        const response = await this.$http.get('/api/shifts');
        this.shifts = response.data;
      } catch (error) {
        console.error('Error fetching shifts:', error);
      }
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>