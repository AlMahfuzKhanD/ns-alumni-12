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

    // Role-Based Dashboards
    {
        path: '/admin/dashboard',
        name: 'admin-dashboard',
        component: () => import('@/pages/admin/dashboard/AdminDashboard.vue'),
        meta: { title: 'Admin Overview - NS-12' }
    },
    {
        path: '/admin/treasurer',
        name: 'treasurer-dashboard',
        component: () => import('@/pages/admin/dashboard/TreasurerDashboard.vue'),
        meta: { title: 'Treasurer Financial Desk - NS-12' }
    },
    {
        path: '/member/dashboard',
        name: 'member-dashboard',
        component: () => import('@/pages/member/MemberDashboard.vue'),
        meta: { title: 'Member Dashboard - NS-12' }
    },

    // Admin Operations & Member Management
    {
        path: '/admin/members',
        name: 'admin-members',
        component: () => import('@/pages/admin/members/MemberList.vue'),
        meta: { title: 'Member Directory Management - NS-12' }
    },
    {
        path: '/admin/members/pending',
        name: 'admin-members-pending',
        component: () => import('@/pages/admin/members/PendingApprovals.vue'),
        meta: { title: 'Pending Applications Verification - NS-12' }
    },
    {
        path: '/admin/members/:id',
        name: 'admin-member-detail',
        component: () => import('@/pages/admin/members/MemberDetail.vue'),
        meta: { title: 'Member Profile & Ledger - NS-12' }
    },
    {
        path: '/admin/committee',
        name: 'admin-committee',
        component: () => import('@/pages/admin/committee/CommitteeManager.vue'),
        meta: { title: 'Committee & Leadership Manager - NS-12' }
    },
    {
        path: '/admin/chada',
        name: 'admin-chada',
        component: () => import('@/pages/admin/chada/ChadaDueList.vue'),
        meta: { title: 'Monthly Chada Dues & Receipts - NS-12' }
    },

    // Admin Charity, Accounting & Communications (Phase 1.6)
    {
        path: '/admin/projects',
        name: 'admin-projects',
        component: () => import('@/pages/admin/projects/ProjectManager.vue'),
        meta: { title: 'Charity & Aid Projects - NS-12' }
    },
    {
        path: '/admin/donations',
        name: 'admin-donations',
        component: () => import('@/pages/admin/projects/DonationList.vue'),
        meta: { title: 'Donation Verification & Ledger - NS-12' }
    },
    {
        path: '/admin/accounting',
        name: 'admin-accounting',
        component: () => import('@/pages/admin/accounting/TransactionLedger.vue'),
        meta: { title: 'Central Accounting Ledger - NS-12' }
    },
    {
        path: '/admin/accounting/reports',
        name: 'admin-accounting-reports',
        component: () => import('@/pages/admin/accounting/FinancialReportView.vue'),
        meta: { title: 'Financial Reports & Statements - NS-12' }
    },
    {
        path: '/admin/notices',
        name: 'admin-notices',
        component: () => import('@/pages/admin/notices/NoticeManager.vue'),
        meta: { title: 'Notice & Announcements Manager - NS-12' }
    },
    {
        path: '/admin/jobs',
        name: 'admin-jobs',
        component: () => import('@/pages/admin/notices/JobCircularManager.vue'),
        meta: { title: 'Job Circulars & Career Board - NS-12' }
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
