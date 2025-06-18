<template>
  <div class="add-employee">
    <h2>{{ isEditing ? 'Edit Karyawan' : 'Tambah Karyawan Baru' }}</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Nama</label>
        <input 
          v-model="form.name" 
          type="text" 
          id="name" 
          required
          placeholder="Masukkan nama karyawan"
        >
      </div>
      
      <div class="form-group">
        <label for="position">Jabatan</label>
        <select 
          v-model="form.position" 
          id="position" 
          required
        >
          <option value="">-- Pilih Jabatan --</option>
          <option value="Manager">Manager</option>
          <option value="Staff">Staff</option>
          <option value="Supervisor">Supervisor</option>
          <option value="Intern">Intern</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="shift">Shift</label>
        <select 
          v-model="form.shift" 
          id="shift" 
          required
        >
          <option value="">-- Pilih Shift --</option>
          <option value="Pagi">Pagi</option>
          <option value="Siang">Siang</option>
          <option value="Malam">Malam</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="salary">Gaji Pokok (Rp)</label>
        <input 
          v-model.number="form.salary" 
          type="number" 
          id="salary" 
          required
          min="0"
          step="100000"
          placeholder="Contoh: 5000000"
        >
      </div>
      
      <div class="form-actions">
        <button type="button" @click="$emit('cancel')" class="btn-cancel">
          Batal
        </button>
        <button type="submit" :disabled="isLoading" class="btn-submit">
          {{ isLoading ? 'Menyimpan...' : 'Simpan' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useEmployeesStore } from '@/store/modules/employees';

export default defineComponent({
  name: 'AddEmployee',
  
  props: {
    employee: {
      type: Object,
      default: null
    }
  },
  
  data() {
    return {
      form: {
        name: '',
        position: '',
        shift: '',
        salary: 0
      },
      isLoading: false
    };
  },
  
  computed: {
    isEditing() {
      return Boolean(this.employee);
    }
  },
  
  created() {
    // Jika dalam mode edit, isi form dengan data karyawan
    if (this.isEditing && this.employee) {
      this.form = { ...this.employee };
    }
  },
  
  methods: {
    async submitForm() {
      if (!this.validateForm()) return;
      
      this.isLoading = true;
      const employeesStore = useEmployeesStore();
      
      try {
        if (this.isEditing) {
          // Update karyawan yang sudah ada
          await employeesStore.updateEmployee(this.form);
          this.$emit('updated', this.form);
        } else {
          // Tambah karyawan baru
          const newEmployee = await employeesStore.addEmployee(this.form);
          this.$emit('added', newEmployee);
        }
        
        // Reset form
        this.resetForm();
      } catch (error) {
        console.error('Error saving employee:', error);
        alert('Terjadi kesalahan saat menyimpan data karyawan');
      } finally {
        this.isLoading = false;
      }
    },
    
    validateForm() {
      if (!this.form.name.trim()) {
        alert('Nama karyawan harus diisi');
        return false;
      }
      
      if (!this.form.position) {
        alert('Jabatan harus dipilih');
        return false;
      }
      
      if (!this.form.shift) {
        alert('Shift harus dipilih');
        return false;
      }
      
      if (!this.form.salary || this.form.salary <= 0) {
        alert('Gaji harus diisi dengan nilai yang valid');
        return false;
      }
      
      return true;
    },
    
    resetForm() {
      this.form = {
        name: '',
        position: '',
        shift: '',
        salary: 0
      };
    }
  }
});
</script>

<style scoped>
.add-employee {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #555;
}

input, select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus, select:focus {
  border-color: #4CAF50;
  outline: none;
}

.form-actions {
  margin-top: 25px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-cancel {
  background-color: #f1f1f1;
  color: #333;
}

.btn-submit {
  background-color: #4CAF50;
  color: white;
}

.btn-cancel:hover {
  background-color: #e0e0e0;
}

.btn-submit:hover {
  background-color: #45a049;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>