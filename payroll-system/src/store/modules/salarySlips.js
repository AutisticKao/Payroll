const state = {
  salarySlips: [],
};

const mutations = {
  ADD_SALARY_SLIP(state, slip) {
    state.salarySlips.push(slip);
  },
  REMOVE_SALARY_SLIP(state, slipId) {
    state.salarySlips = state.salarySlips.filter(slip => slip.id !== slipId);
  },
  SET_SALARY_SLIPS(state, slips) {
    state.salarySlips = slips;
  },
};

const actions = {
  addSalarySlip({ commit }, slip) {
    commit('ADD_SALARY_SLIP', slip);
  },
  removeSalarySlip({ commit }, slipId) {
    commit('REMOVE_SALARY_SLIP', slipId);
  },
  fetchSalarySlips({ commit }) {
    // Fetch salary slips from an API or database
    // commit('SET_SALARY_SLIPS', fetchedSlips);
  },
};

const getters = {
  allSalarySlips: (state) => state.salarySlips,
  getSalarySlipById: (state) => (id) => {
    return state.salarySlips.find(slip => slip.id === id);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};