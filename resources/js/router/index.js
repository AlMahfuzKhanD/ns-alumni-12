import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/pages/public/Home.vue'),
        meta: { title: 'Alumni Association of NS - 12' }
    },
    {
        path: '/ui-showcase',
        name: 'ui-showcase',
        component: () => import('@/pages/dev/UiShowcase.vue'),
        meta: { title: 'UI Component Showcase - NS-12' }
    },
    // Fallback route
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    }
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title ? `${to.meta.title}` : 'Alumni Association of NS - 12';
    next();
});

export default router;
