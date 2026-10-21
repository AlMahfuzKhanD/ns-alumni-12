<template>
    <AdminLayout
        title="Admin Overview Dashboard"
        subtitle="Executive management, member approvals, and operational health."
    >
        <div class="space-y-8">
            <!-- Role Switcher Quick Pill Bar (For easy testing) -->
            <div class="p-3 bg-white rounded-2xl border border-border-main flex flex-wrap items-center justify-between gap-3 shadow-xs">
                <div class="flex items-center space-x-2 text-xs">
                    <span class="font-bold text-text-main flex items-center">
                        <Users class="w-4 h-4 mr-1 text-primary" />
                        Dashboard Role Switcher:
                    </span>
                    <span class="text-text-muted hidden sm:inline">(Quickly preview different role perspectives)</span>
                </div>

                <div class="flex items-center space-x-2">
                    <router-link
                        to="/admin/dashboard"
                        class="px-3 py-1.5 rounded-xl text-xs font-bold bg-primary text-white shadow-xs"
                    >
                        Super Admin View
                    </router-link>
                    <router-link
                        to="/admin/treasurer"
                        class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-text-main transition-colors"
                    >
                        Treasurer View
                    </router-link>
                    <router-link
                        to="/member/dashboard"
                        class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-text-main transition-colors"
                    >
                        Member View
                    </router-link>
                </div>
            </div>

            <!-- Top 4 Metrics Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <StatsCard
                    title="Total Registered Alumni"
                    value="542"
                    subtitle="Verified Batchmates"
                    trend="+12 this month"
                    trend-direction="up"
                    variant="primary"
                    :icon="Users"
                />

                <StatsCard
                    title="Active Charity Campaigns"
                    value="3"
                    subtitle="৳ 12.8L Total Aid Raised"
                    trend="2 Urgent Aid"
                    trend-direction="up"
                    variant="secondary"
                    :icon="HeartHandshake"
                />

                <StatsCard
                    title="Pending Member Approvals"
                    value="3"
                    subtitle="Awaiting Verification"
                    trend="Requires action"
                    trend-direction="down"
                    variant="danger"
                    :icon="UserCheck"
                />

                <StatsCard
                    title="Monthly Chada Collection"
                    value="৳ 48,500"
                    subtitle="October 2026 (92% Cleared)"
                    trend="+15% vs Sep"
                    trend-direction="up"
                    variant="accent"
                    :icon="CreditCard"
                />
            </div>

            <!-- 2-Col Grid: Pending Approvals Queue + Cash Flow Chart -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Pending Approvals Widget -->
                <PendingApprovalsWidget />

                <!-- Cash Flow Chart Widget -->
                <IncomeExpenseChart />
            </div>

            <!-- 2-Col Grid: Running Charity Campaigns + Recent Activities -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Charity Campaigns Mini Cards -->
                <DonationProgressWidget :projects="campaigns" />

                <!-- Recent Activities Feed -->
                <RecentActivityFeed :activities="activityLogs" />
            </div>
        </div>
    </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue';
import StatsCard from '@/components/dashboard/StatsCard.vue';
import PendingApprovalsWidget from '@/components/dashboard/PendingApprovalsWidget.vue';
import IncomeExpenseChart from '@/components/dashboard/IncomeExpenseChart.vue';
import DonationProgressWidget from '@/components/dashboard/DonationProgressWidget.vue';
import RecentActivityFeed from '@/components/dashboard/RecentActivityFeed.vue';
import {
    Users,
    HeartHandshake,
    UserCheck,
    CreditCard,
    DollarSign,
    CheckCircle2,
    FileText
} from 'lucide-vue-next';

const campaigns = [
    { id: 1, code: 'NS12-MED-01', title: 'Medical Fund for Sir M. Rahman (Heart Bypass)', collected: 185000, target: 250000, donors: 42 },
    { id: 2, code: 'NS12-EMG-03', title: 'Emergency Flood Relief Drive 2026', collected: 92000, target: 150000, donors: 29 },
    { id: 3, code: 'NS12-EDU-05', title: 'Children Education Fund for Late Batchmate', collected: 65000, target: 100000, donors: 19 },
];

const activityLogs = [
    {
        title: 'Chada Payment Collected (৳ 1,200)',
        description: 'Treasurer recorded yearly subscription for Tanvir Ahmed (NS12-0001) via bKash.',
        time: '12 mins ago',
        icon: DollarSign,
        iconBg: 'bg-emerald-50 text-secondary',
        badge: 'Finance',
        badgeVariant: 'secondary'
    },
    {
        title: 'New Member Approved',
        description: 'Dr. Rafiqul Islam approved registration for Dr. Nusrat Jahan (Dental Surgeon, Batch 12).',
        time: '45 mins ago',
        icon: CheckCircle2,
        iconBg: 'bg-primary-light text-primary',
        badge: 'Member',
        badgeVariant: 'primary'
    },
    {
        title: 'Donation Pledged for Sir M. Rahman',
        description: 'Anonymous batchmate contributed ৳ 20,000 to the teacher medical fund.',
        time: '2 hours ago',
        icon: HeartHandshake,
        iconBg: 'bg-amber-50 text-amber-700',
        badge: 'Donation',
        badgeVariant: 'warning'
    },
    {
        title: 'New Official Notice Issued',
        description: 'Executive committee published Annual Grand Alumni Reunion Gala 2026 circular.',
        time: '4 hours ago',
        icon: FileText,
        iconBg: 'bg-slate-100 text-slate-700',
        badge: 'Notice',
        badgeVariant: 'neutral'
    }
];
</script>
