<template>
    <div class="min-h-screen flex flex-col bg-surface-bg text-text-main selection:bg-primary-light selection:text-primary">
        <!-- Top Public Header -->
        <header class="bg-white/95 backdrop-blur-md border-b border-border-main sticky top-0 z-40 transition-all">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-18">
                    <!-- Brand Logo -->
                    <router-link to="/" class="flex items-center space-x-3 group">
                        <div class="w-11 h-11 rounded-xl bg-primary flex items-center justify-center text-white font-black text-xl shadow-sm transition-transform group-hover:scale-105">
                            NS
                        </div>
                        <div class="flex flex-col">
                            <div class="flex items-center">
                                <span class="font-extrabold text-lg sm:text-xl text-text-main tracking-tight group-hover:text-primary transition-colors">
                                    Alumni Association
                                </span>
                                <span class="ml-2 px-2 py-0.5 text-xs font-bold bg-primary-light text-primary rounded-md">
                                    NS - 12
                                </span>
                            </div>
                            <span class="text-[11px] text-text-muted font-medium tracking-wide">
                                Once Classmates, Forever Connected
                            </span>
                        </div>
                    </router-link>

                    <!-- Desktop Navigation Links -->
                    <nav class="hidden lg:flex items-center space-x-1">
                        <router-link
                            v-for="item in navItems"
                            :key="item.path"
                            :to="item.path"
                            class="px-3.5 py-2 rounded-xl text-sm font-medium transition-all text-text-muted hover:text-primary hover:bg-primary-light/40"
                            active-class="text-primary font-semibold bg-primary-light/60"
                        >
                            {{ item.label }}
                        </router-link>
                    </nav>

                    <!-- Action Buttons -->
                    <div class="hidden sm:flex items-center space-x-3">
                        <router-link to="/auth/login">
                            <BaseButton variant="outline" size="sm">
                                Login
                            </BaseButton>
                        </router-link>
                        <router-link to="/auth/register">
                            <BaseButton variant="primary" size="sm">
                                Join Association
                            </BaseButton>
                        </router-link>
                    </div>

                    <!-- Mobile Menu Hamburger Button -->
                    <div class="flex items-center lg:hidden">
                        <button
                            type="button"
                            @click="isMobileMenuOpen = !isMobileMenuOpen"
                            class="p-2 rounded-xl text-text-muted hover:text-text-main hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary"
                            aria-label="Toggle Navigation"
                        >
                            <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Mobile Navigation Drawer -->
            <div
                v-if="isMobileMenuOpen"
                class="lg:hidden border-b border-border-main bg-white px-4 pt-3 pb-6 space-y-3"
            >
                <div class="flex flex-col space-y-1">
                    <router-link
                        v-for="item in navItems"
                        :key="item.path"
                        :to="item.path"
                        @click="isMobileMenuOpen = false"
                        class="px-4 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:text-primary hover:bg-primary-light/40 transition-colors"
                        active-class="text-primary font-semibold bg-primary-light/60"
                    >
                        {{ item.label }}
                    </router-link>
                </div>

                <div class="pt-3 border-t border-border-main flex flex-col space-y-2">
                    <router-link to="/auth/login" @click="isMobileMenuOpen = false">
                        <BaseButton variant="outline" fullWidth>
                            Login
                        </BaseButton>
                    </router-link>
                    <router-link to="/auth/register" @click="isMobileMenuOpen = false">
                        <BaseButton variant="primary" fullWidth>
                            Join Association
                        </BaseButton>
                    </router-link>
                </div>
            </div>
        </header>

        <!-- Main Content Area -->
        <main class="flex-1">
            <slot />
        </main>

        <!-- Public Footer -->
        <footer class="bg-white border-t border-border-main mt-auto">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <!-- Brand info -->
                    <div class="space-y-4 md:col-span-2">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-black text-lg shadow-sm">
                                NS
                            </div>
                            <div>
                                <span class="font-bold text-lg text-text-main">Alumni Association</span>
                                <span class="ml-1.5 px-2 py-0.5 text-xs font-semibold bg-primary-light text-primary rounded-md">NS - 12</span>
                            </div>
                        </div>
                        <p class="text-sm text-text-muted max-w-md leading-relaxed">
                            A non-profit digital initiative connecting NS-12 batchmates to foster lifelong friendships, provide emergency medical/financial mutual aid, and support teachers in need.
                        </p>
                        <p class="text-xs font-medium text-primary">
                            “Proudly NS-12, Forever United”
                        </p>
                    </div>

                    <!-- Quick Links -->
                    <div>
                        <h4 class="text-xs font-semibold text-text-main uppercase tracking-wider mb-3">
                            Quick Links
                        </h4>
                        <ul class="space-y-2 text-sm text-text-muted">
                            <li><router-link to="/about" class="hover:text-primary transition-colors">About Association</router-link></li>
                            <li><router-link to="/projects" class="hover:text-primary transition-colors">Charity & Projects</router-link></li>
                            <li><router-link to="/committee" class="hover:text-primary transition-colors">Committee & Advisors</router-link></li>
                            <li><router-link to="/notices" class="hover:text-primary transition-colors">Notices & Circulars</router-link></li>
                        </ul>
                    </div>

                    <!-- Contact & Emergency -->
                    <div>
                        <h4 class="text-xs font-semibold text-text-main uppercase tracking-wider mb-3">
                            Community Aid
                        </h4>
                        <ul class="space-y-2 text-sm text-text-muted">
                            <li><router-link to="/contact" class="hover:text-primary transition-colors">Emergency Assistance</router-link></li>
                            <li><router-link to="/auth/login" class="hover:text-primary transition-colors">Monthly Chada Portal</router-link></li>
                            <li><router-link to="/contact" class="hover:text-primary transition-colors">Blood Donation Directory</router-link></li>
                        </ul>
                    </div>
                </div>

                <div class="pt-8 mt-8 border-t border-border-main flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted">
                    <p>&copy; 2026 Alumni Association of NS - 12. All rights reserved.</p>
                    <p class="mt-2 sm:mt-0">Designed for community trust & transparency.</p>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const isMobileMenuOpen = ref(false);

const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Charity Projects', path: '/projects' },
    { label: 'Committee', path: '/committee' },
    { label: 'Notices', path: '/notices' },
    { label: 'Contact', path: '/contact' }
];
</script>
