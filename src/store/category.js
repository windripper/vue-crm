import { db } from '@/firebase';

export default {
    namespaced: true,
    actions: {
        async fetchCategories({ dispatch, commit }) {
            try {
                const uid = await dispatch('auth/getUid', null, { root: true });
                const categories = (await db.ref(`/users/${uid}/categories`)
                    .once('value')).val() || {};

                return Object.keys(categories).map(key => ({ ...categories[key], id: key }));
            } catch(e) {
                commit('setError', e, { root: true });
                throw e;
            }
        },
        async fetchCategoryById({ dispatch, commit }, id) {
            try {
                const uid = await dispatch('auth/getUid', null, { root: true });
                const category = (await db.ref(`/users/${uid}/categories`)
                    .child(id)
                    .once('value')).val() || {};

                return { ...category, id };
            } catch(e) {
                commit('setError', e, { root: true });
                throw e;
            }
        },
        async createCategory({ dispatch, commit }, { title, limit }) {
            try {
                const uid = await dispatch('auth/getUid', null, { root: true });
                const category = await db.ref(`/users/${uid}/categories`)
                    .push({ title, limit });
                return { title, limit, id: category.key };
            } catch(e) {
                commit('setError', e, { root: true });
                throw e;
            }
        },
        async updateCategory({ dispatch, commit }, { title, limit, id }) {
            try {
                const uid = await dispatch('auth/getUid', null, { root: true });
                await db.ref(`/users/${uid}/categories`)
                    .child(id).update({ title, limit });
            } catch(e) {
                commit('setError', e, { root: true });
                throw e;
            }
        }
    }
};
