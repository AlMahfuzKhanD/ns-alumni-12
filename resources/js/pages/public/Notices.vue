<template>
    <PublicLayout>
        <!-- Header -->
        <section class="bg-gradient-to-b from-primary-light/40 to-surface-bg py-16 border-b border-border-main">
            <div class="max-w-7xl mx-auto px-4 text-center">
                <span class="text-xs font-bold text-primary uppercase tracking-wider bg-white border border-primary/20 px-3.5 py-1 rounded-full shadow-xs">
                    Announcements & Bulletins
                </span>
                <h1 class="text-3xl sm:text-5xl font-black text-text-main mt-4 tracking-tight">
                    Notices & Circulars
                </h1>
                <p class="text-sm sm:text-base text-text-muted mt-3 max-w-2xl mx-auto">
                    Stay up-to-date with official association meetings, batch reunions, blood donor emergency calls, and career postings.
                </p>
            </div>
        </section>

        <!-- Notices Content -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <!-- Filter Bar -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div class="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-xl">
                    <button
                        v-for="cat in ['All', 'Notice', 'Event', 'Job Circular', 'Emergency']"
                        :key="cat"
                        @click="selectedCategory = cat"
                        :class="[
                            'px-4 py-2 rounded-lg text-xs font-semibold transition-all',
                            selectedCategory === cat
                                ? 'bg-white text-primary shadow-xs'
                                : 'text-text-muted hover:text-text-main'
                        ]"
                    >
                        {{ cat }}
                    </button>
                </div>

                <div class="text-xs text-text-muted">
                    Showing {{ filteredNotices.length }} postings
                </div>
            </div>

            <!-- Notices Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <BaseCard
                    v-for="item in filteredNotices"
                    :key="item.id"
                    hoverable
                    no-padding
                >
                    <div class="p-6 flex flex-col justify-between h-full">
                        <div>
                            <div class="flex items-center justify-between mb-3">
                                <BaseBadge :variant="item.badgeVariant" size="sm" dot>
                                    {{ item.category }}
                                </BaseBadge>
                                <span class="text-xs text-text-muted flex items-center">
                                    <Calendar class="w-3.5 h-3.5 mr-1" />
                                    {{ item.date }}
                                </span>
                            </div>

                            <h3 class="text-base font-bold text-text-main line-clamp-2 hover:text-primary transition-colors cursor-pointer" @click="openNotice(item)">
                                {{ item.title }}
                            </h3>

                            <p class="text-xs text-text-muted mt-2.5 line-clamp-3 leading-relaxed">
                                {{ item.body }}
                            </p>
                        </div>

                        <div class="mt-6 pt-4 border-t border-border-main flex items-center justify-between text-xs">
                            <span class="text-text-muted">Ref: {{ item.refNo }}</span>
                            <button
                                type="button"
                                @click="openNotice(item)"
                                class="font-semibold text-primary hover:text-primary-hover"
                            >
                                View Details &rarr;
                            </button>
                        </div>
                    </div>
                </BaseCard>
            </div>
        </section>

        <!-- Notice Detail Modal -->
        <BaseModal
            v-model="isDetailModalOpen"
            :title="activeNotice?.title"
            :subtitle="`Published on ${activeNotice?.date} • Ref: ${activeNotice?.refNo}`"
            max-width="lg"
        >
            <div class="space-y-4 text-sm text-text-main" v-if="activeNotice">
                <div class="flex items-center space-x-2">
                    <BaseBadge :variant="activeNotice.badgeVariant" dot size="sm">
                        {{ activeNotice.category }}
                    </BaseBadge>
                    <span class="text-xs text-text-muted font-medium">Audience: {{ activeNotice.audience }}</span>
                </div>

                <div class="p-4 bg-slate-50 rounded-xl border border-border-main text-xs sm:text-sm text-text-muted leading-relaxed whitespace-pre-line">
                    {{ activeNotice.body }}
                </div>

                <div v-if="activeNotice.hasAttachment" class="p-3 bg-primary-light/50 border border-primary/20 rounded-xl flex items-center justify-between">
                    <div class="flex items-center space-x-2 text-xs">
                        <FileText class="w-4 h-4 text-primary" />
                        <span class="font-semibold text-text-main">Official-Circular-NS12.pdf</span>
                    </div>
                    <BaseButton variant="outline" size="sm" @click="alert('Mock download started: Official-Circular-NS12.pdf')">
                        Download PDF
                    </BaseButton>
                </div>
            </div>

            <template #footer="{ close }">
                <BaseButton variant="primary" size="sm" @click="close">
                    Close Notice
                </BaseButton>
            </template>
        </BaseModal>
    </PublicLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import PublicLayout from '@/layouts/PublicLayout.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import { Calendar, FileText } from 'lucide-vue-next';

const selectedCategory = ref('All');
const isDetailModalOpen = ref(false);
const activeNotice = ref(null);

const noticesList = [
    {
        id: 1,
        refNo: 'NS12-CIR-2026-08',
        title: 'Annual Grand Alumni Reunion & Family Gala 2026',
        category: 'Event',
        badgeVariant: 'primary',
        date: 'Oct 28, 2026',
        audience: 'All Members & Families',
        hasAttachment: true,
        body: 'The organizing committee of NS-12 is delighted to invite all batchmates with their families to the Annual Grand Alumni Reunion 2026.\n\nDate: December 18, 2026 (Friday)\nVenue: Officers Club Banquet Hall, Dhaka\nProgram includes: Welcome reception, cultural performances by batchmates, dinner banquet, and souvenir distribution.'
    },
    {
        id: 2,
        refNo: 'NS12-EMG-2026-03',
        title: 'Emergency B+ Blood Bags Required at Square Hospital ICU',
        category: 'Emergency',
        badgeVariant: 'danger',
        date: 'Oct 20, 2026',
        audience: 'Emergency Blood Donors',
        hasAttachment: false,
        body: 'URGENT: 2 units of B Positive (B+) fresh blood required for the mother of our batchmate who is currently undergoing emergency vascular surgery at Square Hospital, Panthapath.\n\nContact Association Emergency Hotline: 017XXXXXXXX immediately.'
    },
    {
        id: 3,
        refNo: 'NS12-JOB-2026-11',
        title: 'Hiring: Senior Full-Stack Engineer (Laravel & Vue)',
        category: 'Job Circular',
        badgeVariant: 'secondary',
        date: 'Oct 18, 2026',
        audience: 'Alumni Network & Referrals',
        hasAttachment: true,
        body: 'A software company led by our alumni batchmate is looking for 2 Senior Full-Stack Engineers with experience in Laravel and Vue.js.\n\nCompetitive remuneration, remote/hybrid arrangement, and annual bonuses. Please send CV or reach out via member portal.'
    },
    {
        id: 4,
        refNo: 'NS12-NOT-2026-14',
        title: 'General Meeting on Quarterly Chada Fund Distribution',
        category: 'Notice',
        badgeVariant: 'warning',
        date: 'Oct 15, 2026',
        audience: 'Active Registered Members',
        hasAttachment: false,
        body: 'A general meeting will be hosted via Google Meet this Saturday at 8:30 PM to present the quarterly financial audit report and approve medical disbursements for our ongoing charity project.'
    }
];

const filteredNotices = computed(() => {
    if (selectedCategory.value === 'All') return noticesList;
    return noticesList.filter(n => n.category.toLowerCase() === selectedCategory.value.toLowerCase());
});

const openNotice = (item) => {
    activeNotice.value = item;
    isDetailModalOpen.value = true;
};
</script>
