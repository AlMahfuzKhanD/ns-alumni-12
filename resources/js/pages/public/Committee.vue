<template>
    <PublicLayout>
        <!-- Header -->
        <section class="bg-gradient-to-b from-primary-light/40 to-surface-bg py-16 border-b border-border-main">
            <div class="max-w-7xl mx-auto px-4 text-center">
                <span class="text-xs font-bold text-primary uppercase tracking-wider bg-white border border-primary/20 px-3.5 py-1 rounded-full shadow-xs">
                    Governance & Leadership
                </span>
                <h1 class="text-3xl sm:text-5xl font-black text-text-main mt-4 tracking-tight">
                    Committee & Advisors
                </h1>
                <p class="text-sm sm:text-base text-text-muted mt-3 max-w-2xl mx-auto">
                    Voluntary stewards serving our alumni association with dedication, financial accountability, and respect.
                </p>
            </div>
        </section>

        <!-- Committee Content -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
            <!-- Advisory Panel Section -->
            <div class="space-y-6">
                <div class="border-b border-border-main pb-4 flex items-center justify-between">
                    <div>
                        <h2 class="text-xl sm:text-2xl font-black text-text-main flex items-center">
                            <span class="w-2.5 h-2.5 rounded-full bg-accent mr-2.5"></span>
                            Advisor Committee & Senior Mentors
                        </h2>
                        <p class="text-xs text-text-muted mt-1">Honorable teachers and senior advisors guiding our vision</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <BaseCard v-for="advisor in advisors" :key="advisor.name" hoverable>
                        <div class="flex items-start space-x-4">
                            <div class="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center font-bold text-lg shrink-0">
                                {{ advisor.initials }}
                            </div>
                            <div>
                                <h3 class="text-base font-bold text-text-main">{{ advisor.name }}</h3>
                                <p class="text-xs font-semibold text-accent mt-0.5">{{ advisor.role }}</p>
                                <p class="text-xs text-text-muted mt-2 leading-relaxed">{{ advisor.bio }}</p>
                            </div>
                        </div>
                    </BaseCard>
                </div>
            </div>

            <!-- Executive Committee Section -->
            <div class="space-y-6">
                <div class="border-b border-border-main pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 class="text-xl sm:text-2xl font-black text-text-main flex items-center">
                            <span class="w-2.5 h-2.5 rounded-full bg-primary mr-2.5"></span>
                            Executive Committee (2024–2026)
                        </h2>
                        <p class="text-xs text-text-muted mt-1">Elected/appointed operational leaders of Batch NS-12</p>
                    </div>

                    <div class="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl">
                        <button class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-primary shadow-xs">
                            Current Term (2024–2026)
                        </button>
                        <button class="px-3 py-1.5 rounded-lg text-xs font-semibold text-text-muted hover:text-text-main">
                            Past Term (2022–2024)
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <BaseCard v-for="exec in executiveMembers" :key="exec.name" hoverable class="text-center">
                        <div class="flex flex-col items-center">
                            <div class="w-20 h-20 rounded-2xl bg-primary-light text-primary flex items-center justify-center font-black text-xl mb-4 border border-primary/20 shadow-xs">
                                {{ exec.initials }}
                            </div>
                            <h4 class="font-bold text-text-main text-base">{{ exec.name }}</h4>
                            <span class="mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary text-white">
                                {{ exec.designation }}
                            </span>
                            <p class="text-xs text-text-muted mt-3 font-medium">{{ exec.profession }}</p>
                            <p class="text-[11px] text-text-muted/80">{{ exec.organization }}</p>
                        </div>
                    </BaseCard>
                </div>
            </div>
        </section>
    </PublicLayout>
</template>

<script setup>
import PublicLayout from '@/layouts/PublicLayout.vue';
import BaseCard from '@/components/ui/BaseCard.vue';

const advisors = [
    {
        name: 'Prof. Anisuzzaman',
        role: 'Chief Advisor (Former Head of Dept)',
        initials: 'AZ',
        bio: 'Guiding the association in ethical community leadership, educational bursaries, and teacher assistance.'
    },
    {
        name: 'Dr. Shah Alam Chowdhury',
        role: 'Senior Medical Advisor',
        initials: 'SC',
        bio: 'Reviewing and overseeing hospital case evaluations for emergency medical campaigns.'
    },
    {
        name: 'Advocate M. H. Kabir',
        role: 'Legal Advisor',
        initials: 'MK',
        bio: 'Advising on association bylaws, governance, and institutional alignment.'
    }
];

const executiveMembers = [
    { name: 'Tanvir Ahmed', designation: 'President', initials: 'TA', profession: 'Sr. Software Architect', organization: 'Tech Solutions Ltd' },
    { name: 'Dr. Rafiqul Islam', designation: 'General Secretary', initials: 'RI', profession: 'Assistant Professor', organization: 'Dhaka Medical College' },
    { name: 'Mahmudul Hasan', designation: 'Treasurer', initials: 'MH', profession: 'Financial Analyst', organization: 'Standard Chartered' },
    { name: 'Kamrul Hasan', designation: 'Vice President', initials: 'KH', profession: 'Entrepreneur', organization: 'Apex Ventures' },
    { name: 'Sajid Karim', designation: 'Joint Secretary', initials: 'SK', profession: 'Marketing Director', organization: 'Grameenphone' },
    { name: 'Nafis Imtiaz', designation: 'Organizing Secretary', initials: 'NI', profession: 'Civil Engineer', organization: 'PWD Bangladesh' },
    { name: 'Zubair Hossain', designation: 'Office Secretary', initials: 'ZH', profession: 'Operations Lead', organization: 'BRAC' },
    { name: 'Fahim Faisal', designation: 'Executive Member', initials: 'FF', profession: 'Business Development', organization: 'Unilever' }
];
</script>
