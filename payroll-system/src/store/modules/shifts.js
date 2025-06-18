import { createStore } from 'vuex';

const state = {
  shifts: [],
};

const getters = {
  allShifts: (state) => state.shifts,
};

const actions = {
  async fetchShifts({ commit }) {
    // Fetch shifts from API and commit to state
    const response = await fetch('/api/shifts');
    const data = await response.json();
    commit('setShifts', data);
  },
  async addShift({ commit }, shift) {
    // Add a new shift via API
    const response = await fetch('/api/shifts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shift),
    });
    const data = await response.json();
    commit('newShift', data);
  },
  async deleteShift({ commit }, id) {
    // Delete a shift via API
    await fetch(`/api/shifts/${id}`, {
      method: 'DELETE',
    });
    commit('removeShift', id);
  },
};

const mutations = {
  setShifts: (state, shifts) => (state.shifts = shifts),
  newShift: (state, shift) => state.shifts.push(shift),
  removeShift: (state, id) => {
    state.shifts = state.shifts.filter((shift) => shift.id !== id);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};