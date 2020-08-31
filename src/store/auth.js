import { auth, db } from '@/firebase';

export default {
    namespaced: true,
    actions: {
        async register({ dispatch, commit }, { email, password, name }) {
            try {
                await auth.createUserWithEmailAndPassword(email, password);
                const uid = await dispatch('getUid');
                await db.ref(`/users/${uid}/info`).set({
                    balance: 0,
                    name
                });
            } catch(e) {
                commit('setError', e, { root: true });
                throw e;
            }
        },
        async login({ commit }, { email, password }) {
            try {
                await auth.signInWithEmailAndPassword(email, password);
            } catch(e) {
                commit('setError', e, { root: true });
                throw e;
            }
        },
        getUid() {
            const user = auth.currentUser;
            return user ? user.uid : null;
        },
        async logout({ commit }) {
            await auth.signOut();
            commit('info/clearInfo', null, { root: true });
        }
    }
};
