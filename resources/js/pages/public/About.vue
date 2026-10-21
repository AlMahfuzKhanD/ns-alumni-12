<template>
    <PublicLayout>
        <!-- Page Header -->
        <section class="bg-gradient-to-b from-primary-light/40 to-surface-bg py-16 sm:py-20 border-b border-border-main">
            <div class="max-w-4xl mx-auto px-4 text-center">
                <span class="text-xs font-bold text-primary uppercase tracking-widest bg-white border border-primary/20 px-3.5 py-1 rounded-full shadow-xs">
                    Our Origin & Core Purpose
                </span>
                <h1 class="text-3xl sm:text-5xl font-black text-text-main mt-4 tracking-tight">
                    The Story Behind <span class="text-primary">NS - 12</span>
                </h1>
                <p class="text-base sm:text-lg text-text-muted mt-4 leading-relaxed">
                    We were classmates once. Today, we are brothers for life. An association born out of love, respect for our teachers, and an unwavering commitment to stand with each other.
                </p>
            </div>
        </section>

        <!-- Narrative Story Section -->
        <section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div class="space-y-4">
                    <span class="text-xs font-bold text-secondary uppercase tracking-wider">How It Started</span>
                    <h2 class="text-2xl sm:text-3xl font-extrabold text-text-main">
                        More Than Just A Class — A Lifelong Family
                    </h2>
                    <p class="text-sm text-text-muted leading-relaxed">
                        Years ago, we walked the same corridors, shared tiffin boxes, and studied under inspiring teachers. As life moved forward, careers, families, and geography spread us across the globe.
                    </p>
                    <p class="text-sm text-text-muted leading-relaxed">
                        Yet, whenever a classmate faced an unexpected medical emergency or a beloved teacher struggled with hospital bills, we banded together instinctively. This platform was born to replace disorganized Facebook posts and scattered mobile money transfers with a permanent, organized, and transparent digital institution.
                    </p>
                </div>

                <div class="bg-white p-6 sm:p-8 rounded-3xl border border-border-main shadow-xs space-y-5">
                    <div class="flex items-center space-x-3 text-primary">
                        <Quote class="w-8 h-8 opacity-40 shrink-0" />
                        <h4 class="font-extrabold text-lg text-text-main">Our Guiding Principle</h4>
                    </div>
                    <blockquote class="text-base font-semibold text-text-main italic border-l-4 border-primary pl-4 leading-relaxed">
                        “No friend of NS-12 shall suffer alone. And no teacher who guided our footsteps shall be forgotten in their hour of need.”
                    </blockquote>
                    <p class="text-xs text-text-muted">
                        Unanimously adopted by the founding batch committee.
                    </p>
                </div>
            </div>

            <!-- Core Pillars & Commitments -->
            <div class="space-y-8">
                <div class="text-center max-w-2xl mx-auto">
                    <h3 class="text-2xl font-extrabold text-text-main">The 4 Pillars of NS-12</h3>
                    <p class="text-sm text-text-muted mt-1">What we stand for every single day</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <BaseCard title="1. Radical Financial Transparency" subtitle="Where every Taka is accounted for">
                        <p class="text-xs text-text-muted leading-relaxed">
                            Trust is the heartbeat of our brotherhood. Every single subscription and charity donation is immediately recorded in an immutable ledger. Members can see where money came from and where it was spent down to the last paisa.
                        </p>
                    </BaseCard>

                    <BaseCard title="2. Honoring Our Teachers" subtitle="Standing with our mentors">
                        <p class="text-xs text-text-muted leading-relaxed">
                            Our teachers dedicated their lives to educating us. Whenever a retired or sick teacher requires medical attention or emergency assistance, NS-12 takes collective responsibility to provide support with utmost dignity.
                        </p>
                    </BaseCard>

                    <BaseCard title="3. Emergency Mutual Aid" subtitle="Instant response for batch families">
                        <p class="text-xs text-text-muted leading-relaxed">
                            Medical crises, sudden bereavement, or catastrophic loss can happen to anyone. Our emergency fund and blood donation network mobilize within hours to shield our classmates and their families.
                        </p>
                    </BaseCard>

                    <BaseCard title="4. Professional & Social Synergy" subtitle="Growing together in life and career">
                        <p class="text-xs text-text-muted leading-relaxed">
                            From job circulars, freelance projects, and business partnerships to annual family reunions—we leverage our collective strength so that all batchmates prosper together.
                        </p>
                    </BaseCard>
                </div>
            </div>

            <!-- Batch Motto Banner -->
            <div class="bg-gradient-to-r from-primary to-blue-800 text-white p-8 sm:p-12 rounded-3xl text-center space-y-4 shadow-sm">
                <span class="text-xs font-bold uppercase tracking-widest text-primary-light">Our Official Mottos</span>
                <h3 class="text-2xl sm:text-3xl font-black">
                    “Once Classmates, Forever Connected”
                </h3>
                <p class="text-sm text-primary-light max-w-xl mx-auto">
                    Together under the banner: <span class="text-white font-bold">Proudly NS-12, Forever United.</span>
                </p>
                <div class="pt-4 flex justify-center">
                    <router-link to="/auth/register">
                        <BaseButton variant="secondary" size="md">
                            Register Your Membership
                        </BaseButton>
                    </router-link>
                </div>
            </div>
        </section>
    </PublicLayout>
</template>

<script setup>
import PublicLayout from '@/layouts/PublicLayout.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { Quote } from 'lucide-vue-next';
</script>
