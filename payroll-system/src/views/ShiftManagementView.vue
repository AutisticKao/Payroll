<template>
  <div class="shift-management">
    <h1>Manajemen Shift Karyawan</h1>
    <ShiftList />
    <ShiftAssignment />
  </div>
</template>

<script>
import ShiftList from '@/components/shifts/ShiftList.vue';
import ShiftAssignment from '@/components/shifts/ShiftAssignment.vue';

export default {
  name: 'ShiftManagementView',
  components: {
    ShiftList,
    ShiftAssignment
  }
};
</script>

<style scoped>
.shift-management {
  padding: 20px;
}
</style>