import { profileService } from '../services/profile.service'
import router from '../routes/router';

const userProfile = null
const state = profile
	? { profile: userProfile }
	: { profile: null};

const actions = {
	get({ dispatch, commit }, id) {
		// commit('getRequest', id);

		profileService.getById(id)
			.then(
				profile => {
					commit('getSuccess', profile)
					if (!profile.address) {
						dispatch('alert/warning', 'Su perfil aún no esta completo', { root: true })
						setTimeout( function() { router.push('/profile') }.bind(this), 3000)
					}
				},
				error => {
					// commit('getFailure', { id, error: error.toString() })
					dispatch('alert/error', error, { root: true });
				}
			);
	}
};

const mutations = {
	// getRequest(state, id) { },
	// getFailure(state, { id, error }) {}
	getSuccess(state, profile) {
		state.profile = profile
	}
}

export const profile = {
    namespaced: true,
    state,
    actions,
    mutations
}