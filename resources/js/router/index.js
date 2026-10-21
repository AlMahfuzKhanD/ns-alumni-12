import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    // Public Front Pages
    {
        path: '/',
        name: 'home',
        component: () => import('@/pages/public/Home.vue'),
        meta: { title: 'Alumni Association of NS - 12' }
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/pages/public/About.vue'),
        meta: { title: 'About Us & History - NS-12' }
    },
    {
        path: '/projects',
        name: 'projects',
        component: () => import('@/pages/public/Projects.vue'),
        meta: { title: 'Charity & Projects - NS-12' }
    },
    {
        path: '/projects/:slug',
        name: 'project-detail',
        component: () => import('@/pages/public/ProjectDetail.vue'),
        meta: { title: 'Project Details & Transparency - NS-12' }
    },
    {
        path: '/committee',
        name: 'committee',
        component: () => import('@/pages/public/Committee.vue'),
        meta: { title: 'Committee & Advisors - NS-12' }
    },
    {
        path: '/notices',
        name: 'notices',
        component: () => import('@/pages/public/Notices.vue'),
        meta: { title: 'Notices & Circulars - NS-12' }
    },
    {
        path: '/contact',
        name: 'contact',
        component: () => import('@/pages/public/Contact.vue'),
        meta: { title: 'Contact & Support - NS-12' }
    },

    // Authentication & Onboarding Routes
    {
        path: '/auth/login',
        name: 'login',
        component: () => import('@/pages/auth/Login.vue'),
        meta: { title: 'Sign In - NS-12 Alumni Portal' }
    },
    {
        path: '/auth/register',
        name: 'register',
        component: () => import('@/pages/auth/Register.vue'),
        meta: { title: 'Apply for Membership - NS-12' }
    },
    {
        path: '/auth/pending-approval',
        name: 'pending-approval',
        component: () => import('@/pages/auth/RegistrationPending.vue'),
        meta: { title: 'Application Received - NS-12' }
    },
    {
        path: '/auth/forgot-password',
        name: 'forgot-password',
        component: () => import('@/pages/auth/ForgotPassword.vue'),
        meta: { title: 'Forgot Password - NS-12' }
    },
    {
        path: '/auth/reset-password',
        name: 'reset-password',
        component: () => import('@/pages/auth/ResetPassword.vue'),
        meta: { title: 'Reset Password - NS-12' }
    },

    // Developer Showcase
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
