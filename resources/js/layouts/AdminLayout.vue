<template>
    <div class="min-h-screen bg-surface-bg flex flex-col lg:flex-row text-text-main selection:bg-primary-light selection:text-primary">
        <!-- Mobile Sidebar Overlay Backdrop -->
        <div
            v-if="isSidebarOpen"
            class="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
            @click="isSidebarOpen = false"
        ></div>

        <!-- Sidebar (Desktop Fixed / Mobile Drawer) -->
        <aside
            :class="[
                'fixed inset-y-0 left-0 z-50 w-64 bg-sidebar-bg text-sidebar-text flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0',
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            ]"
        >
            <!-- Sidebar Header / Logo -->
            <div class="h-18 px-6 flex items-center justify-between border-b border-slate-800">
                <router-link to="/" class="flex items-center space-x-3">
                    <div class="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-black text-lg shadow-sm">
                        NS
                    </div>
                    <div>
                        <div class="flex items-center">
                            <span class="font-bold text-white text-base">NS - 12</span>
                            <span class="ml-2 px-1.5 py-0.5 text-[10px] font-semibold bg-primary text-white rounded">
                                ADMIN
                            </span>
                        </div>
                        <p class="text-[11px] text-slate-400">Portal & Operations</p>
                    </div>
                </router-link>

                <!-- Mobile Close button -->
                <button
                    type="button"
                    @click="isSidebarOpen = false"
                    class="lg:hidden text-slate-400 hover:text-white"
                >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Navigation Links -->
            <div class="flex-1 py-4 px-3 overflow-y-auto space-y-1">
                <div class="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    Core Modules
                </div>

                <router-link
                    v-for="item in navLinks"
                    :key="item.path"
                    :to="item.path"
                    @click="isSidebarOpen = false"
                    class="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors text-slate-300 hover:bg-slate-800 hover:text-white"
                    active-class="bg-primary text-white hover:bg-primary"
                >
                    <div class="flex items-center space-x-3">
                        <component :is="item.icon" class="w-5 h-5 shrink-0" />
                        <span>{{ item.label }}</span>
                    </div>

                    <span
                        v-if="item.badge"
                        :class="[
                            'px-2 py-0.5 text-xs font-semibold rounded-full',
                            item.badgeColor || 'bg-slate-700 text-slate-200'
                        ]"
                    >
                        {{ item.badge }}
                    </span>
                </router-link>

                <!-- Switch to Public Site -->
                <div class="pt-6 px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    Quick Navigation
                </div>

                <router-link
                    to="/"
                    class="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                    <ExternalLink class="w-5 h-5" />
                    <span>View Public Website</span>
                </router-link>
            </div>

            <!-- Sidebar User Card Footer -->
            <div class="p-3 border-t border-slate-800">
                <div class="flex items-center justify-between p-2 rounded-xl bg-slate-800/60">
                    <div class="flex items-center space-x-2.5 min-w-0">
                        <div class="w-8 h-8 rounded-full bg-primary/20 text-primary border border-primary/30 flex items-center justify-center font-bold text-xs shrink-0">
                            SA
                        </div>
                        <div class="min-w-0 flex-1">
                            <p class="text-xs font-semibold text-white truncate">Super Admin</p>
                            <p class="text-[11px] text-slate-400 truncate">admin@nsalumni.org</p>
                        </div>
                    </div>
                    <router-link
                        to="/auth/login"
                        title="Logout"
                        class="p-1.5 rounded-lg text-slate-400 hover:text-danger hover:bg-slate-800 transition-colors"
                    >
                        <LogOut class="w-4 h-4" />
                    </router-link>
                </div>
            </div>
        </aside>

        <!-- Right / Main Content Column -->
        <div class="flex-1 lg:pl-64 flex flex-col min-w-0">
            <!-- Top Header -->
            <header class="h-18 bg-white border-b border-border-main sticky top-0 z-30 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <!-- Left: Hamburger & Breadcrumbs -->
                <div class="flex items-center space-x-3">
                    <button
                        type="button"
                        @click="isSidebarOpen = true"
                        class="lg:hidden p-2 rounded-xl text-text-muted hover:text-text-main hover:bg-slate-100"
                        aria-label="Open sidebar"
                    >
                        <Menu class="w-6 h-6" />
                    </button>

                    <div>
                        <h1 class="text-base sm:text-lg font-bold text-text-main">
                            {{ title }}
                        </h1>
                        <p v-if="subtitle" class="text-xs text-text-muted hidden sm:block">
                            {{ subtitle }}
                        </p>
                    </div>
                </div>

                <!-- Right: Notifications, Quick Actions & Profile -->
                <div class="flex items-center space-x-3">
                    <!-- Notification Bell -->
                    <button
                        type="button"
                        class="relative p-2 rounded-xl text-text-muted hover:text-text-main hover:bg-slate-100 transition-colors"
                        title="Notifications"
                    >
                        <Bell class="w-5 h-5" />
                        <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger ring-2 ring-white"></span>
                    </button>

                    <!-- Divider -->
                    <div class="h-5 w-px bg-border-main"></div>

                    <!-- Profile Avatar Pill -->
                    <div class="flex items-center space-x-2.5">
                        <div class="w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold text-sm">
                            NS
                        </div>
                        <div class="hidden sm:block text-left">
                            <p class="text-xs font-semibold text-text-main">Administrator</p>
                            <p class="text-[10px] text-text-muted">Committee Lead</p>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Page Body Slot -->
            <main class="flex-1 p-4 sm:p-6 lg:p-8">
                <slot />
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import {
    LayoutDashboard,
    Users,
    Award,
    CreditCard,
    HeartHandshake,
    Wallet,
    Bell,
    ExternalLink,
    LogOut,
    Menu
} from 'lucide-vue-next';

defineProps({
    title: {
        type: String,
        default: 'Admin Dashboard'
    },
    subtitle: {
        type: String,
        default: ''
    }
});

const isSidebarOpen = ref(false);

const navLinks = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Members', path: '/admin/members', icon: Users, badge: '5 Pending', badgeColor: 'bg-amber-500/20 text-amber-400' },
    { label: 'Committee', path: '/admin/committee', icon: Award },
    { label: 'Monthly Chada', path: '/admin/chada', icon: CreditCard },
    { label: 'Charity Projects', path: '/admin/projects', icon: HeartHandshake, badge: '2 Active', badgeColor: 'bg-emerald-500/20 text-emerald-400' },
    { label: 'Accounting', path: '/admin/accounting', icon: Wallet },
    { label: 'Notices & Jobs', path: '/admin/notices', icon: Bell }
];
</script>
