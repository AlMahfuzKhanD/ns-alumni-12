<template>
    <div class="min-h-screen flex flex-col bg-surface-bg">
        <!-- Top Navigation Bar Preview -->
        <header class="bg-white border-b border-border-main sticky top-0 z-40">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm font-bold text-lg">
                        NS
                    </div>
                    <div>
                        <span class="font-bold text-lg text-text-main tracking-tight">Alumni Association</span>
                        <span class="ml-1.5 px-2 py-0.5 text-xs font-semibold bg-primary-light text-primary rounded-md">NS - 12</span>
                    </div>
                </div>

                <div class="flex items-center space-x-3">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary-light text-secondary">
                        <span class="w-2 h-2 mr-1.5 rounded-full bg-secondary"></span>
                        Phase 1.0 Ready
                    </span>
                </div>
            </div>
        </header>

        <!-- Hero Card Preview -->
        <main class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center text-center">
            <div class="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-primary-light text-primary text-xs font-semibold mb-6">
                <Sparkles class="w-4 h-4" />
                <span>Hybrid Laravel 12 + Vue 3 Setup Complete</span>
            </div>

            <h1 class="text-3xl sm:text-5xl font-extrabold text-text-main tracking-tight max-w-3xl leading-tight">
                Once Classmates, <span class="text-primary">Forever Connected</span>
            </h1>

            <p class="mt-4 text-base sm:text-lg text-text-muted max-w-2xl">
                Alumni Association of NS - 12 digital platform is now initialized with Vue 3, Vite, Tailwind CSS, Pinia, and Lucide Icons.
            </p>

            <!-- Palette Status Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-10 w-full max-w-4xl">
                <div class="p-5 bg-white rounded-2xl border border-border-main shadow-sm flex flex-col items-center">
                    <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white mb-3">
                        <ShieldCheck class="w-5 h-5" />
                    </div>
                    <span class="font-semibold text-text-main text-sm">Deep Blue</span>
                    <span class="text-xs text-text-muted mt-1">Trust & Unity (#1D4ED8)</span>
                </div>

                <div class="p-5 bg-white rounded-2xl border border-border-main shadow-sm flex flex-col items-center">
                    <div class="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-white mb-3">
                        <HeartHandshake class="w-5 h-5" />
                    </div>
                    <span class="font-semibold text-text-main text-sm">Emerald Green</span>
                    <span class="text-xs text-text-muted mt-1">Charity & Aid (#10B981)</span>
                </div>

                <div class="p-5 bg-white rounded-2xl border border-border-main shadow-sm flex flex-col items-center">
                    <div class="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white mb-3">
                        <Award class="w-5 h-5" />
                    </div>
                    <span class="font-semibold text-text-main text-sm">Amber Gold</span>
                    <span class="text-xs text-text-muted mt-1">Recognition (#F59E0B)</span>
                </div>

                <div class="p-5 bg-white rounded-2xl border border-border-main shadow-sm flex flex-col items-center">
                    <div class="w-10 h-10 rounded-xl bg-sidebar-bg flex items-center justify-center text-white mb-3">
                        <Users class="w-5 h-5" />
                    </div>
                    <span class="font-semibold text-text-main text-sm">Dark Slate</span>
                    <span class="text-xs text-text-muted mt-1">Admin Sidebar (#0F172A)</span>
                </div>
            </div>
        </main>

        <!-- Footer -->
        <footer class="bg-white border-t border-border-main py-6 text-center text-xs text-text-muted">
            Alumni Association of NS - 12 &copy; 2026. Built with Laravel 12 & Vue 3.
        </footer>
    </div>
</template>

<script setup>
import { Sparkles, ShieldCheck, HeartHandshake, Award, Users } from 'lucide-vue-next';
</script>
