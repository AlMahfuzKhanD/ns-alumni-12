<template>
    <PublicLayout>
        <!-- Hero Section -->
        <section class="relative bg-gradient-to-b from-primary-light/30 via-surface-bg to-surface-bg pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                <!-- Batch Tag -->
                <div class="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white border border-primary/20 text-primary text-xs font-semibold mb-6 shadow-xs">
                    <Sparkles class="w-4 h-4 text-primary" />
                    <span>Official Community Hub of NS - 12 Alumni</span>
                </div>

                <!-- Primary Headline -->
                <h1 class="text-4xl sm:text-6xl font-black text-text-main tracking-tight max-w-4xl leading-tight">
                    Once Classmates, <br />
                    <span class="text-primary underline decoration-secondary decoration-4 underline-offset-8">
                        Forever Connected
                    </span>
                </h1>

                <!-- Subtitle / Vision -->
                <p class="mt-6 text-base sm:text-xl text-text-muted max-w-2xl leading-relaxed">
                    A brotherhood built on lifelong bonds. We stand together through every storm—supporting sick teachers, aiding friends in crisis, and ensuring 100% financial transparency in every single Taka.
                </p>

                <!-- Action Buttons -->
                <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <router-link to="/auth/register">
                        <BaseButton variant="primary" size="lg">
                            <template #icon>
                                <UserPlus class="w-5 h-5" />
                            </template>
                            Join Alumni Association
                        </BaseButton>
                    </router-link>

                    <router-link to="/projects">
                        <BaseButton variant="secondary" size="lg">
                            <template #icon>
                                <HeartHandshake class="w-5 h-5" />
                            </template>
                            Running Charity Projects
                        </BaseButton>
                    </router-link>

                    <router-link to="/about">
                        <BaseButton variant="outline" size="lg">
                            Our Story & Mission
                        </BaseButton>
                    </router-link>
                </div>

                <!-- Quick Association Metric Highlights -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 w-full max-w-4xl">
                    <div class="p-4 sm:p-5 bg-white rounded-2xl border border-border-main shadow-xs">
                        <p class="text-2xl sm:text-3xl font-black text-primary">500+</p>
                        <p class="text-xs sm:text-sm font-medium text-text-muted mt-1">Batchmates Connected</p>
                    </div>

                    <div class="p-4 sm:p-5 bg-white rounded-2xl border border-border-main shadow-xs">
                        <p class="text-2xl sm:text-3xl font-black text-secondary">৳ 12.8L+</p>
                        <p class="text-xs sm:text-sm font-medium text-text-muted mt-1">Mutual Aid Raised</p>
                    </div>

                    <div class="p-4 sm:p-5 bg-white rounded-2xl border border-border-main shadow-xs">
                        <p class="text-2xl sm:text-3xl font-black text-accent">14</p>
                        <p class="text-xs sm:text-sm font-medium text-text-muted mt-1">Charity Projects</p>
                    </div>

                    <div class="p-4 sm:p-5 bg-white rounded-2xl border border-border-main shadow-xs">
                        <p class="text-2xl sm:text-3xl font-black text-text-main">100%</p>
                        <p class="text-xs sm:text-sm font-medium text-text-muted mt-1">Transparent Ledger</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Spotlight: Active Humanitarian Campaigns -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-border-main">
            <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 gap-4">
                <div>
                    <div class="inline-flex items-center space-x-1.5 text-xs font-bold text-secondary uppercase tracking-wider mb-2">
                        <HeartHandshake class="w-4 h-4" />
                        <span>Immediate Mutual Aid</span>
                    </div>
                    <h2 class="text-2xl sm:text-3xl font-extrabold text-text-main">
                        Active Charity Projects
                    </h2>
                    <p class="text-sm text-text-muted mt-1">
                        Direct support for sick mentors, grieving families, and friends battling emergencies.
                    </p>
                </div>

                <router-link to="/projects" class="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-hover">
                    <span>View All Projects</span>
                    <ArrowRight class="w-4 h-4 ml-1.5" />
                </router-link>
            </div>

            <!-- Project Cards Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <BaseCard
                    v-for="project in featuredProjects"
                    :key="project.id"
                    hoverable
                    no-padding
                >
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-3">
                            <BaseBadge :variant="project.badgeVariant" dot size="sm">
                                {{ project.category }}
                            </BaseBadge>
                            <span class="text-xs font-mono font-medium text-text-muted">{{ project.code }}</span>
                        </div>

                        <h3 class="text-lg font-bold text-text-main line-clamp-1 hover:text-primary transition-colors">
                            <router-link :to="`/projects/${project.slug}`">
                                {{ project.title }}
                            </router-link>
                        </h3>

                        <p class="text-xs text-text-muted mt-2 line-clamp-2 leading-relaxed">
                            {{ project.shortDescription }}
                        </p>

                        <!-- Progress Section -->
                        <div class="mt-5 space-y-2">
                            <div class="flex items-center justify-between text-xs font-semibold">
                                <span class="text-secondary font-bold">৳ {{ project.collected.toLocaleString() }}</span>
                                <span class="text-text-muted">Target: ৳ {{ project.target.toLocaleString() }}</span>
                            </div>

                            <!-- Progress Bar -->
                            <div class="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                <div
                                    class="bg-secondary h-2.5 rounded-full transition-all duration-500"
                                    :style="{ width: `${Math.min(100, (project.collected / project.target) * 100)}%` }"
                                ></div>
                            </div>

                            <div class="flex items-center justify-between text-[11px] text-text-muted pt-1">
                                <span>{{ Math.round((project.collected / project.target) * 100) }}% Funded</span>
                                <span>{{ project.donorsCount }} Contributions</span>
                            </div>
                        </div>

                        <!-- Card Action -->
                        <div class="mt-5 pt-4 border-t border-border-main flex items-center justify-between">
                            <router-link :to="`/projects/${project.slug}`" class="text-xs font-semibold text-text-muted hover:text-text-main">
                                Read Story
                            </router-link>

                            <router-link :to="`/projects/${project.slug}`">
                                <BaseButton variant="secondary" size="sm">
                                    Donate Now
                                </BaseButton>
                            </router-link>
                        </div>
                    </div>
                </BaseCard>
            </div>
        </section>

        <!-- Four Core Pillars -->
        <section class="bg-slate-50 border-y border-border-main py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center max-w-2xl mx-auto mb-12">
                    <span class="text-xs font-bold text-primary uppercase tracking-wider">Why We Built This</span>
                    <h2 class="text-2xl sm:text-3xl font-extrabold text-text-main mt-1">
                        Our Community Commitments
                    </h2>
                    <p class="text-sm text-text-muted mt-2">
                        We don't just maintain a phone directory. We built an accountable digital home for our brotherhood.
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <BaseCard hoverable>
                        <div class="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                            <Users class="w-6 h-6" />
                        </div>
                        <h3 class="text-base font-bold text-text-main">Lifelong Brotherhood</h3>
                        <p class="text-xs text-text-muted mt-2 leading-relaxed">
                            Stay connected regardless of where life takes us. Professional networking, peer help, and batch reunions.
                        </p>
                    </BaseCard>

                    <BaseCard hoverable>
                        <div class="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                            <HeartHandshake class="w-6 h-6" />
                        </div>
                        <h3 class="text-base font-bold text-text-main">Emergency Medical Aid</h3>
                        <p class="text-xs text-text-muted mt-2 leading-relaxed">
                            Rapid emergency fundraising when a classmate or family member faces severe hospital expenses.
                        </p>
                    </BaseCard>

                    <BaseCard hoverable>
                        <div class="w-12 h-12 rounded-xl bg-accent/10 text-amber-700 flex items-center justify-center mb-4">
                            <GraduationCap class="w-6 h-6" />
                        </div>
                        <h3 class="text-base font-bold text-text-main">Honoring Sick Teachers</h3>
                        <p class="text-xs text-text-muted mt-2 leading-relaxed">
                            Standing beside the mentors who shaped our lives. Providing respectful medical and financial assistance.
                        </p>
                    </BaseCard>

                    <BaseCard hoverable>
                        <div class="w-12 h-12 rounded-xl bg-slate-900/10 text-slate-900 flex items-center justify-center mb-4">
                            <ShieldCheck class="w-6 h-6" />
                        </div>
                        <h3 class="text-base font-bold text-text-main">100% Open Accounting</h3>
                        <p class="text-xs text-text-muted mt-2 leading-relaxed">
                            Zero room for doubt. Every single monthly chada and project donation is permanently accounted for.
                        </p>
                    </BaseCard>
                </div>
            </div>
        </section>

        <!-- Executive Body & Mentors Spotlight -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
                <div>
                    <span class="text-xs font-bold text-primary uppercase tracking-wider">Leadership & Mentorship</span>
                    <h2 class="text-2xl sm:text-3xl font-extrabold text-text-main mt-1">
                        Executive Committee & Advisors
                    </h2>
                    <p class="text-sm text-text-muted mt-1">
                        Dedicated friends and senior advisors voluntarily stewarding our alumni association.
                    </p>
                </div>

                <router-link to="/committee" class="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-hover">
                    <span>Full Committee List</span>
                    <ArrowRight class="w-4 h-4 ml-1.5" />
                </router-link>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <BaseCard v-for="leader in leaders" :key="leader.name" hoverable class="text-center">
                    <div class="flex flex-col items-center">
                        <div class="w-20 h-20 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-xl mb-4 border-2 border-white shadow-sm">
                            {{ leader.initials }}
                        </div>
                        <h4 class="font-bold text-text-main text-base">{{ leader.name }}</h4>
                        <p class="text-xs font-semibold text-primary mt-0.5">{{ leader.designation }}</p>
                        <p class="text-[11px] text-text-muted mt-2">{{ leader.profession }}</p>
                    </div>
                </BaseCard>
            </div>
        </section>

        <!-- Recent Notices & Announcements -->
        <section class="bg-surface-bg border-t border-border-main py-14">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between mb-8">
                    <div>
                        <h2 class="text-2xl font-extrabold text-text-main">Latest Notices & Circulars</h2>
                        <p class="text-xs text-text-muted mt-1">Official circulars, upcoming reunions, and emergency notices</p>
                    </div>

                    <router-link to="/notices" class="text-sm font-semibold text-primary hover:underline">
                        View All
                    </router-link>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <BaseCard v-for="notice in latestNotices" :key="notice.id" hoverable>
                        <div class="flex items-center justify-between mb-3">
                            <BaseBadge :variant="notice.variant" size="sm">
                                {{ notice.type }}
                            </BaseBadge>
                            <span class="text-xs text-text-muted">{{ notice.date }}</span>
                        </div>

                        <h4 class="font-bold text-text-main text-base line-clamp-1 hover:text-primary transition-colors">
                            <router-link to="/notices">{{ notice.title }}</router-link>
                        </h4>

                        <p class="text-xs text-text-muted mt-2 line-clamp-3 leading-relaxed">
                            {{ notice.summary }}
                        </p>

                        <div class="mt-4 pt-3 border-t border-border-main flex items-center justify-between text-xs">
                            <span class="text-primary font-semibold">Read Announcement &rarr;</span>
                        </div>
                    </BaseCard>
                </div>
            </div>
        </section>

        <!-- Final Call to Action -->
        <section class="bg-primary text-white py-16">
            <div class="max-w-5xl mx-auto px-4 text-center space-y-6">
                <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    Are you a member of NS - 12?
                </h2>
                <p class="text-primary-light max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                    Join our verified digital portal. Keep your profile updated, contribute your monthly subscription easily, and stand with your batchmates whenever needed.
                </p>
                <div class="pt-2 flex flex-wrap justify-center gap-4">
                    <router-link to="/auth/register">
                        <BaseButton variant="secondary" size="lg">
                            Register as a Member
                        </BaseButton>
                    </router-link>
                    <router-link to="/contact">
                        <BaseButton variant="outline" size="lg" class="bg-white/10 text-white border-white/20 hover:bg-white/20">
                            Emergency Blood / Assistance
                        </BaseButton>
                    </router-link>
                </div>
            </div>
        </section>
    </PublicLayout>
</template>

<script setup>
import PublicLayout from '@/layouts/PublicLayout.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import {
    Sparkles,
    UserPlus,
    HeartHandshake,
    ArrowRight,
    Users,
    GraduationCap,
    ShieldCheck
} from 'lucide-vue-next';

const featuredProjects = [
    {
        id: 1,
        code: 'NS12-MED-01',
        title: 'Emergency Medical Treatment Support for Respected Sir M. Rahman',
        slug: 'medical-support-sir-rahman',
        category: 'Teacher Support',
        badgeVariant: 'warning',
        shortDescription: 'Our beloved mathematics teacher has undergone open heart surgery and requires urgent ICU care support.',
        collected: 185000,
        target: 250000,
        donorsCount: 42
    },
    {
        id: 2,
        code: 'NS12-AID-02',
        title: 'Family Rehabilitation Fund for Late Classmate S. Karim',
        slug: 'rehabilitation-fund-karim',
        category: 'Family Welfare',
        badgeVariant: 'secondary',
        shortDescription: 'Supporting the young children and education fund of our dear batchmate who passed away recently.',
        collected: 320000,
        target: 300000,
        donorsCount: 68
    },
    {
        id: 3,
        code: 'NS12-EMG-03',
        title: 'Emergency Flood Relief Drive 2026 for Affected Batch Families',
        slug: 'flood-relief-2026',
        category: 'Emergency Relief',
        badgeVariant: 'primary',
        shortDescription: 'Providing immediate food packages, dry rations, and clean water supplies to flood-affected alumni families.',
        collected: 92000,
        target: 150000,
        donorsCount: 29
    }
];

const leaders = [
    { name: 'Tanvir Ahmed', designation: 'President', initials: 'TA', profession: 'Sr. Software Architect' },
    { name: 'Dr. Rafiqul Islam', designation: 'General Secretary', initials: 'RI', profession: 'Assistant Professor' },
    { name: 'Mahmudul Hasan', designation: 'Treasurer', initials: 'MH', profession: 'Financial Analyst' },
    { name: 'Prof. Anisuzzaman', designation: 'Chief Advisor', initials: 'AZ', profession: 'Former Head of Dept' }
];

const latestNotices = [
    {
        id: 1,
        type: 'Reunion',
        variant: 'primary',
        title: 'Annual Grand Alumni Reunion & Family Gala 2026',
        date: 'Oct 28, 2026',
        summary: 'Registrations are now open for our annual batch reunion. Bring family for an evening of nostalgic memories and dinner.'
    },
    {
        id: 2,
        type: 'Notice',
        variant: 'warning',
        title: 'Monthly Subscription Collection Update for Q4',
        date: 'Oct 15, 2026',
        summary: 'Committee request to all active members to clear pending chada dues for smooth running of mutual charity operations.'
    },
    {
        id: 3,
        type: 'Emergency',
        variant: 'danger',
        title: 'Urgent B+ Blood Required at Square Hospital',
        date: 'Oct 20, 2026',
        summary: 'Immediate 2 bags of B Positive blood needed for a batchmate mother. Please check directory and contact coordinator.'
    }
];
</script>
