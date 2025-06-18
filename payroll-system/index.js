// Static imports for Payroll System

// Views
export { default as DashboardView } from './src/views/DashboardView.vue';
export { default as PayrollManagementView } from './src/views/PayrollManagementView.vue';
export { default as SalarySlipsView } from './src/views/SalarySlipsView.vue';
export { default as ShiftManagementView } from './src/views/ShiftManagementView.vue';

// Components
export { default as AppHeader } from './src/components/common/AppHeader.vue';
export { default as AppSidebar } from './src/components/common/AppSidebar.vue';
export { default as AppFooter } from './src/components/common/AppFooter.vue';
export { default as EmployeeList } from './src/components/dashboard/EmployeeList.vue';
export { default as EmployeeFilter } from './src/components/dashboard/EmployeeFilter.vue';
export { default as SalaryForm } from './src/components/payroll/SalaryForm.vue';
export { default as PayrollPeriodSelector } from './src/components/payroll/PayrollPeriodSelector.vue';
export { default as SalarySlip } from './src/components/slips/SalarySlip.vue';
export { default as SalarySlipDownloader } from './src/components/slips/SalarySlipDownloader.vue';
export { default as ShiftList } from './src/components/shifts/ShiftList.vue';
export { default as ShiftAssignment } from './src/components/shifts/ShiftAssignment.vue';

// Store modules
export { default as employeesStore } from './src/store/modules/employees.js';
export { default as payrollStore } from './src/store/modules/payroll.js';
export { default as salarySlipsStore } from './src/store/modules/salarySlips.js';
export { default as shiftsStore } from './src/store/modules/shifts.js';

// Services
export { default as api } from './src/services/api.js';
export { default as employeeService } from './src/services/employeeService.js';
export { default as payrollService } from './src/services/payrollService.js';
export { default as pdfService } from './src/services/pdfService.js';
export { default as shiftService } from './src/services/shiftService.js';

// Utils
export { default as dateFormatter } from './src/utils/dateFormatter.js';
export { default as currencyFormatter } from './src/utils/currencyFormatter.js';