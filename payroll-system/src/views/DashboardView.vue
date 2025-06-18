<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>Dashboard Karyawan</h1>
      <button @click="showAddEmployee = true" class="add-btn">
        + Tambah Karyawan
      </button>
    </div>
    <EmployeeFilter @filter="applyFilter" />
    <EmployeeList 
      :employees="filteredEmployees" 
      :isLoading="employeesStore.isLoading"
      @edit="editEmployee"
      @delete="confirmDeleteEmployee"
    />
    
    <!-- Modal untuk Add/Edit Employee -->
    <div v-if="showAddEmployee" class="modal">
      <div class="modal-content">
        <span class="close" @click="cancelAddEdit">&times;</span>
        <AddEmployee 
          :employee="selectedEmployee"
          @cancel="cancelAddEdit"
          @added="employeeAdded"
          @updated="employeeUpdated"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import EmployeeList from '@/components/dashboard/EmployeeList.vue';
import EmployeeFilter from '@/components/dashboard/EmployeeFilter.vue';
import AddEmployee from '@/components/dashboard/AddEmployee.vue';
import { useEmployeesStore } from '@/store/modules/employees';

export default defineComponent({
  components: {
    EmployeeList,
    EmployeeFilter,
    AddEmployee,
  },
  data() {
    return {
      filterQuery: '',
      filterPosition: '',
      showAddEmployee: false,
      selectedEmployee: null,
    };
  },
  setup() {
    const employeesStore = useEmployeesStore();
    return { employeesStore };
  },
  computed: {
    employees() {
      return this.employeesStore.employees;
    },
    filteredEmployees() {
      return this.employees.filter(employee => {
        const matchesName = this.filterQuery === '' || 
                           employee.name.toLowerCase().includes(this.filterQuery.toLowerCase());
        
        const matchesPosition = this.filterPosition === '' || 
                               employee.position === this.filterPosition;
        
        return matchesName && matchesPosition;
      });
    },
  },
  methods: {
    applyFilter(filterData) {
      this.filterQuery = filterData.query || '';
      this.filterPosition = filterData.position || '';
    },
    editEmployee(employee) {
      this.selectedEmployee = { ...employee };
      this.showAddEmployee = true;
    },
    cancelAddEdit() {
      this.showAddEmployee = false;
      this.selectedEmployee = null;
    },
    employeeAdded(employee) {
      this.showAddEmployee = false;
      this.selectedEmployee = null;
      // Opsional: tambahkan notifikasi atau feedback
      console.log('Karyawan berhasil ditambahkan:', employee);
    },
    employeeUpdated(employee) {
      this.showAddEmployee = false;
      this.selectedEmployee = null;
      // Opsional: tambahkan notifikasi atau feedback
      console.log('Data karyawan berhasil diperbarui:', employee);
    },
    confirmDeleteEmployee(id) {
      if (confirm('Apakah Anda yakin ingin menghapus karyawan ini?')) {
        this.deleteEmployee(id);
      }
    },
    async deleteEmployee(id) {
      try {
        await this.employeesStore.deleteEmployee(id);
        // Opsional: tambahkan notifikasi atau feedback
        console.log('Karyawan berhasil dihapus');
      } catch (error) {
        console.error('Gagal menghapus karyawan:', error);
        alert('Terjadi kesalahan saat menghapus karyawan');
      }
    },
  },
  mounted() {
    this.employeesStore.fetchEmployees();
  }
});
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.add-btn {
  background-color: #4CAF50;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.add-btn:hover {
  background-color: #45a049;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 90%;
  max-width: 500px;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  color: #555;
}
</style>