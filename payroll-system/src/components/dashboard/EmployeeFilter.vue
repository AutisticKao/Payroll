<template>
  <div class="employee-filter">
    <h2>Filter Karyawan</h2>
    <div class="filter-options">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Cari berdasarkan nama..."
        @input="filterEmployees"
      />
      <select v-model="selectedPosition" @change="filterEmployees">
        <option value="">Semua Jabatan</option>
        <option v-for="position in positions" :key="position" :value="position">
          {{ position }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      selectedPosition: '',
      positions: [], // This will be populated with available positions
    };
  },
  methods: {
    filterEmployees() {
      this.$emit('filter', {
        query: this.searchQuery,
        position: this.selectedPosition,
      });
    },
    fetchPositions() {
      // Fetch available positions from the store or API
      // This is a placeholder for the actual implementation
      this.positions = ['Manager', 'Staff', 'Intern']; // Example positions
    },
  },
  mounted() {
    this.fetchPositions();
  },
};
</script>

<style scoped>
.employee-filter {
  margin-bottom: 20px;
}
.filter-options {
  display: flex;
  gap: 10px;
}
</style>