import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';
import PayrollManagementView from '../views/PayrollManagementView.vue';
import SalarySlipsView from '../views/SalarySlipsView.vue';
import ShiftManagementView from '../views/ShiftManagementView.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView
  },
  {
    path: '/payroll',
    name: 'PayrollManagement',
    component: PayrollManagementView
  },
  {
    path: '/salary-slips',
    name: 'SalarySlips',
    component: SalarySlipsView
  },
  {
    path: '/shifts',
    name: 'ShiftManagement',
    component: ShiftManagementView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;