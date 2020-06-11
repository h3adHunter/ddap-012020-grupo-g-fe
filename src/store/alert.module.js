const state = {
    type: null,
    message: null,
    show: null
};

const actions = {
    success({ commit }, message) {
        commit('success', message);
    },
    info({ commit }, message) {
        commit('info', message);
    },
    error({ commit }, message) {
        commit('error', message);
    },
    warning({ commit }, message) {
        commit('warning', message);
    },
    clear({ commit }) {
        commit('clear');
    }
};

const mutations = {
    success(state, message) {
			state.type = 'success'
			state.message = message
			state.show = true
			state.dismissSecs = 3
    },
    info(state, message) {
        state.type = 'info'
        state.message = message
        state.show = true
        state.dismissSecs = 3
    },
    error(state, message) {
			state.type = 'danger'
			state.message = message
			state.show = true
			state.dismissSecs = 5
    },
    warning(state, message) {
			state.type = 'warning'
			state.message = message
			state.show = true
			state.dismissSecs = 5
    },
    clear(state) {
        state.type = null;
        state.message = null;
				state.show = false;
				state.dismissSecs = 0
    }
};

export const alert = {
    namespaced: true,
    state,
    actions,
    mutations
};
