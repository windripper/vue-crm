import { db } from '@/firebase';

export default {
    namespaced: true,
    state: {
        info: {}
    },
    getters: {
        getInfo(state) {
            return state.info;
        }
    },
    mutations: {
        setInfo(state, info) {
            state.info = info;
        },
        clearInfo(state) {
            state.info = {};
        }
    },
    actions: {
        async fetchInfo({ dispatch, commit }) {
            try {
                const uid = await dispatch('auth/getUser', null, { root: true });
                const info = (await db.ref(`/users/${uid}/info`).once('value')).val();
                commit('setInfo', info);
            } catch(e) {
                throw e;
            }
        },
        async fetchCurrency() {
            const key = process.env.VUE_APP_FIXER;
            const currency = 'USD,EUR,GBP';
            // eslint-disable-next-line max-len
            const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=${currency}`);
            return await res.json();
        }
    }
};
