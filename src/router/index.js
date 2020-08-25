import Vue from 'vue';
import VueRouter from 'vue-router';
import { auth } from '@/firebase';

Vue.use(VueRouter);

const routes = [
    {
        path: '/login',
        name: 'login',
        meta: { layout: 'auth' },
        component: () => import('../views/Login')
    },
    {
        path: '/register',
        name: 'register',
        meta: { layout: 'auth' },
        component: () => import('../views/Register')
    },
    {
        path: '/',
        name: 'home',
        meta: { layout: 'main', auth: true },
        component: () => import('../views/Home')
    },
    {
        path: '/categories',
        name: 'categories',
        meta: { layout: 'main', auth: true },
        component: () => import('../views/Categories')
    },
    {
        path: '/record/:id',
        name: 'details',
        meta: { layout: 'main', auth: true },
        component: () => import('../views/RecordDetails')
    },
    {
        path: '/history',
        name: 'history',
        meta: { layout: 'main', auth: true },
        component: () => import('../views/History')
    },
    {
        path: '/planning',
        name: 'planning',
        meta: { layout: 'main', auth: true },
        component: () => import('../views/Planning')
    },
    {
        path: '/profile',
        name: 'profile',
        meta: { layout: 'main', auth: true },
        component: () => import('../views/Profile')
    },
    {
        path: '/record',
        name: 'record',
        meta: { layout: 'main', auth: true },
        component: () => import('../views/Record')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior: scrollToTop()
});

router.beforeEach((to, from, next) => {
    const currentUser = auth.currentUser;
    const requireAuth = to.matched.some(record => record.meta.auth);

    if (requireAuth && !currentUser) {
        next('/login?message=login');
    } else {
        next();
    }
});

function scrollToTop() {
    return function scrollBehavior(to, from, savedPosition) {
        if (to.name === 'details') {
            if (savedPosition) {
                return savedPosition;
            } else {
                return { x: 0, y: 0 };
            }
        }
    };
}

export default router;
