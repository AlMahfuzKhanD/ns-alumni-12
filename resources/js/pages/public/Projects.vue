<template>
    <PublicLayout>
        <!-- Header -->
        <section class="bg-gradient-to-b from-secondary-light/30 to-surface-bg py-16 border-b border-border-main">
            <div class="max-w-7xl mx-auto px-4 text-center">
                <span class="text-xs font-bold text-secondary uppercase tracking-wider bg-white border border-secondary/20 px-3.5 py-1 rounded-full shadow-xs">
                    Mutual Aid & Humanitarian Campaigns
                </span>
                <h1 class="text-3xl sm:text-5xl font-black text-text-main mt-4 tracking-tight">
                    Charity & Support Projects
                </h1>
                <p class="text-sm sm:text-base text-text-muted mt-3 max-w-2xl mx-auto">
                    Every project represents a life we stand with. 100% of your contributions go directly to verified medical bills, rehabilitation, or emergency relief.
                </p>
            </div>
        </section>

        <!-- Project Catalog -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <!-- Filter Bar -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <!-- Status Tabs -->
                <div class="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl">
                    <button
                        v-for="tab in ['all', 'running', 'completed']"
                        :key="tab"
                        @click="activeStatus = tab"
                        :class="[
                            'px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-all',
                            activeStatus === tab
                                ? 'bg-white text-text-main shadow-xs'
                                : 'text-text-muted hover:text-text-main'
                        ]"
                    >
                        {{ tab }} Projects
                    </button>
                </div>

                <!-- Category Dropdown / Search Filter -->
                <div class="flex items-center space-x-3">
                    <span class="text-xs font-medium text-text-muted">Showing {{ filteredProjects.length }} campaigns</span>
                </div>
            </div>

            <!-- Cards Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <BaseCard
                    v-for="project in filteredProjects"
                    :key="project.id"
                    hoverable
                    no-padding
                >
                    <div class="p-6 flex flex-col h-full justify-between">
                        <div>
                            <div class="flex items-center justify-between mb-3">
                                <BaseBadge :variant="project.status === 'running' ? 'secondary' : 'neutral'" dot size="sm">
                                    {{ project.status === 'running' ? 'Active Campaign' : 'Completed' }}
                                </BaseBadge>
                                <span class="text-xs font-mono text-text-muted">{{ project.code }}</span>
                            </div>

                            <h3 class="text-lg font-bold text-text-main hover:text-primary transition-colors">
                                <router-link :to="`/projects/${project.slug}`">
                                    {{ project.title }}
                                </router-link>
                            </h3>

                            <p class="text-xs text-text-muted mt-2 line-clamp-3 leading-relaxed">
                                {{ project.description }}
                            </p>

                            <div class="mt-4 pt-4 border-t border-border-main space-y-2">
                                <div class="flex items-center justify-between text-xs">
                                    <span class="font-bold text-secondary text-sm">৳ {{ project.collected.toLocaleString() }}</span>
                                    <span class="text-text-muted">Target: ৳ {{ project.target.toLocaleString() }}</span>
                                </div>

                                <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                    <div
                                        class="bg-secondary h-2 rounded-full transition-all"
                                        :style="{ width: `${Math.min(100, (project.collected / project.target) * 100)}%` }"
                                    ></div>
                                </div>

                                <div class="flex items-center justify-between text-[11px] text-text-muted pt-1">
                                    <span>{{ Math.round((project.collected / project.target) * 100) }}% Collected</span>
                                    <span>{{ project.donorsCount }} Donors</span>
                                </div>
                            </div>
                        </div>

                        <div class="mt-6 pt-4 border-t border-border-main flex items-center justify-between">
                            <router-link :to="`/projects/${project.slug}`" class="text-xs font-semibold text-text-muted hover:text-text-main">
                                Transparency Details &rarr;
                            </router-link>

                            <router-link :to="`/projects/${project.slug}`">
                                <BaseButton :variant="project.status === 'running' ? 'secondary' : 'outline'" size="sm">
                                    {{ project.status === 'running' ? 'Donate Now' : 'View Report' }}
                                </BaseButton>
                            </router-link>
                        </div>
                    </div>
                </BaseCard>
            </div>
        </section>
    </PublicLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import PublicLayout from '@/layouts/PublicLayout.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const activeStatus = ref('all');

const projectsList = [
    {
        id: 1,
        code: 'NS12-MED-01',
        title: 'Emergency Medical Treatment Support for Respected Sir M. Rahman',
        slug: 'medical-support-sir-rahman',
        status: 'running',
        category: 'Teacher Support',
        description: 'Our beloved mathematics teacher has undergone open heart surgery and requires urgent ICU care support at National Heart Foundation.',
        collected: 185000,
        target: 250000,
        donorsCount: 42
    },
    {
        id: 2,
        code: 'NS12-AID-02',
        title: 'Family Rehabilitation Fund for Late Classmate S. Karim',
        slug: 'rehabilitation-fund-karim',
        status: 'completed',
        category: 'Family Welfare',
        description: 'Completed fund handover for the school admission and medical deposits for the two young orphans of our late batchmate.',
        collected: 320000,
        target: 300000,
        donorsCount: 68
    },
    {
        id: 3,
        code: 'NS12-EMG-03',
        title: 'Emergency Flood Relief Drive 2026 for Affected Batch Families',
        slug: 'flood-relief-2026',
        status: 'running',
        category: 'Emergency Relief',
        description: 'Providing immediate food packages, dry rations, and clean water supplies to flood-affected alumni families in Feni & Noakhali.',
        collected: 92000,
        target: 150000,
        donorsCount: 29
    },
    {
        id: 4,
        code: 'NS12-EDU-04',
        title: 'Higher Education Scholarship Support for Batchmate Daughter',
        slug: 'higher-education-scholarship',
        status: 'completed',
        category: 'Education Support',
        description: 'Tuition support for engineering college enrollment for our peer who is presently undergoing chemotherapy.',
        collected: 120000,
        target: 120000,
        donorsCount: 31
    }
];

const filteredProjects = computed(() => {
    if (activeStatus.value === 'all') return projectsList;
    return projectsList.filter(p => p.status === activeStatus.value);
});
</script>
