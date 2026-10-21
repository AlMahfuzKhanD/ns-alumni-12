<template>
    <PublicLayout>
        <!-- Hero Section -->
        <section class="relative overflow-hidden py-16 sm:py-24">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                <div class="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-primary-light text-primary text-xs font-semibold mb-6 shadow-xs">
                    <Sparkles class="w-4 h-4" />
                    <span>Official Digital Platform of NS - 12</span>
                </div>

                <h1 class="text-3xl sm:text-6xl font-extrabold text-text-main tracking-tight max-w-4xl leading-tight">
                    Once Classmates, <br class="hidden sm:inline" />
                    <span class="text-primary">Forever Connected</span>
                </h1>

                <p class="mt-5 text-base sm:text-xl text-text-muted max-w-2xl leading-relaxed">
                    Building lifelong bonds, supporting sick teachers and friends in times of crisis, and ensuring 100% financial transparency in community funds.
                </p>

                <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <router-link to="/auth/register">
                        <BaseButton variant="primary" size="lg">
                            Join Alumni Association
                        </BaseButton>
                    </router-link>

                    <router-link to="/ui-showcase">
                        <BaseButton variant="outline" size="lg">
                            <span class="flex items-center space-x-2">
                                <LayoutGrid class="w-4 h-4 mr-2" />
                                <span>Browse UI Component Library</span>
                            </span>
                        </BaseButton>
                    </router-link>
                </div>
            </div>
        </section>

        <!-- Brand Values / Stats Grid -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <BaseCard hoverable>
                    <div class="flex items-center space-x-4">
                        <div class="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shrink-0 shadow-sm">
                            <Users class="w-6 h-6" />
                        </div>
                        <div>
                            <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Lifelong Friends</p>
                            <h3 class="text-xl font-bold text-text-main mt-0.5">Connected</h3>
                            <p class="text-xs text-text-muted mt-1">Batch directory & networking</p>
                        </div>
                    </div>
                </BaseCard>

                <BaseCard hoverable>
                    <div class="flex items-center space-x-4">
                        <div class="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-white shrink-0 shadow-sm">
                            <HeartHandshake class="w-6 h-6" />
                        </div>
                        <div>
                            <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Charity Projects</p>
                            <h3 class="text-xl font-bold text-text-main mt-0.5">Mutual Aid</h3>
                            <p class="text-xs text-text-muted mt-1">Medical & humanitarian support</p>
                        </div>
                    </div>
                </BaseCard>

                <BaseCard hoverable>
                    <div class="flex items-center space-x-4">
                        <div class="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-white shrink-0 shadow-sm">
                            <Award class="w-6 h-6" />
                        </div>
                        <div>
                            <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Honoring Mentors</p>
                            <h3 class="text-xl font-bold text-text-main mt-0.5">Teacher Support</h3>
                            <p class="text-xs text-text-muted mt-1">Standing beside sick teachers</p>
                        </div>
                    </div>
                </BaseCard>

                <BaseCard hoverable>
                    <div class="flex items-center space-x-4">
                        <div class="w-12 h-12 rounded-xl bg-sidebar-bg flex items-center justify-center text-white shrink-0 shadow-sm">
                            <ShieldCheck class="w-6 h-6" />
                        </div>
                        <div>
                            <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Transparency</p>
                            <h3 class="text-xl font-bold text-text-main mt-0.5">100% Traceable</h3>
                            <p class="text-xs text-text-muted mt-1">Every taka accounted for</p>
                        </div>
                    </div>
                </BaseCard>
            </div>
        </section>
    </PublicLayout>
</template>

<script setup>
import PublicLayout from '@/layouts/PublicLayout.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import { Sparkles, Users, HeartHandshake, Award, ShieldCheck, LayoutGrid } from 'lucide-vue-next';
</script>
