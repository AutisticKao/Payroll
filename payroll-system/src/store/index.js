import { createStore } from 'vuex';
import employees from './modules/employees';
import payroll from './modules/payroll';
import salarySlips from './modules/salarySlips';
import shifts from './modules/shifts';

const store = createStore({
  modules: {
    employees,
    payroll,
    salarySlips,
    shifts,
  },
});

export default store;