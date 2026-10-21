<template>
    <AdminLayout
        title="Member Profile & Ledger"
        subtitle="Detailed record, verification identity, and financial contributions."
    >
        <div class="space-y-8 max-w-5xl">
            <!-- Back navigation -->
            <div class="flex items-center justify-between">
                <router-link
                    to="/admin/members"
                    class="inline-flex items-center text-xs font-semibold text-text-muted hover:text-primary transition-colors"
                >
                    <ArrowLeft class="w-4 h-4 mr-1.5" />
                    Back to Member Directory
                </router-link>

                <div class="flex items-center space-x-2">
                    <BaseBadge variant="secondary" dot size="sm">Active Member</BaseBadge>
                    <span class="text-xs font-mono font-medium text-text-muted">{{ member.code }}</span>
                </div>
            </div>

            <!-- Profile Summary Card -->
            <div class="bg-white rounded-3xl border border-border-main p-6 sm:p-8 shadow-xs">
                <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-border-main">
                    <div class="flex items-start space-x-5">
                        <div class="w-20 h-20 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-2xl shadow-sm shrink-0">
                            {{ member.initials }}
                        </div>
                        <div class="space-y-1">
                            <div class="flex flex-wrap items-center gap-2">
                                <h2 class="text-2xl font-black text-text-main">{{ member.name }}</h2>
                                <span class="px-2 py-0.5 rounded text-xs font-bold bg-red-50 text-danger border border-red-200">
                                    Blood: {{ member.bloodGroup }}
                                </span>
                            </div>
                            <p class="text-xs sm:text-sm font-semibold text-primary">
                                {{ member.designation }} &bull; {{ member.profession }}
                            </p>
                            <p class="text-xs text-text-muted">
                                {{ member.organization }} &bull; Roll: {{ member.roll }} &bull; Batch NS-12
                            </p>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="flex items-center space-x-2 self-start sm:self-center">
                        <BaseButton variant="outline" size="sm" @click="handleEditProfile">
                            Edit Profile
                        </BaseButton>
                        <BaseButton variant="secondary" size="sm" @click="handleRecordPayment">
                            + Collect Chada
                        </BaseButton>
                    </div>
                </div>

                <!-- Contact & Bio Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 text-xs">
                    <div>
                        <span class="text-text-muted block font-medium">Mobile Phone</span>
                        <span class="text-text-main font-bold text-sm mt-0.5 block font-mono">{{ member.phone }}</span>
                    </div>

                    <div>
                        <span class="text-text-muted block font-medium">Email Address</span>
                        <span class="text-text-main font-semibold text-sm mt-0.5 block">{{ member.email }}</span>
                    </div>

                    <div>
                        <span class="text-text-muted block font-medium">Location</span>
                        <span class="text-text-main font-semibold text-sm mt-0.5 block">{{ member.address }}</span>
                    </div>
                </div>
            </div>

            <!-- Financial Contribution Overview -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <StatsCard
                    title="Total Chada Paid"
                    value="৳ 2,400"
                    subtitle="24 Months Total"
                    trend="In Good Standing"
                    trend-direction="up"
                    variant="primary"
                    :icon="CreditCard"
                />

                <StatsCard
                    title="Pending Subscription"
                    value="৳ 0"
                    subtitle="Up to Date (Oct 2026)"
                    trend="No Dues"
                    trend-direction="up"
                    variant="secondary"
                    :icon="CheckCircle2"
                />

                <StatsCard
                    title="Charity Donations"
                    value="৳ 15,000"
                    subtitle="Across 3 Aid Projects"
                    trend="Top Contributor"
                    trend-direction="up"
                    variant="accent"
                    :icon="HeartHandshake"
                />
            </div>

            <!-- 2-Col: Payment History & Committee History -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Left 2 Cols: Monthly Chada Payment Ledger -->
                <div class="lg:col-span-2 space-y-6">
                    <BaseCard title="Subscription & Donation Ledger" subtitle="Immutable payment records for this member">
                        <BaseTable col-span="5">
                            <template #head>
                                <th class="px-4 py-3">Receipt Code</th>
                                <th class="px-4 py-3">Purpose</th>
                                <th class="px-4 py-3">Method</th>
                                <th class="px-4 py-3">Date</th>
                                <th class="px-4 py-3 text-right">Amount (BDT)</th>
                            </template>
                            <template #body>
                                <tr
                                    v-for="row in paymentHistory"
                                    :key="row.ref"
                                    class="text-xs hover:bg-slate-50 transition-colors"
                                >
                                    <td class="px-4 py-3 font-mono font-bold text-primary">{{ row.ref }}</td>
                                    <td class="px-4 py-3 font-medium text-text-main">{{ row.purpose }}</td>
                                    <td class="px-4 py-3 text-text-muted">{{ row.method }}</td>
                                    <td class="px-4 py-3 text-text-muted">{{ row.date }}</td>
                                    <td class="px-4 py-3 text-right font-bold text-secondary">৳ {{ row.amount.toLocaleString() }}</td>
                                </tr>
                            </template>
                        </BaseTable>
                    </BaseCard>
                </div>

                <!-- Right 1 Col: Leadership Tenure History -->
                <div class="space-y-6">
                    <BaseCard title="Leadership & Committee" subtitle="Tenure history in association">
                        <div class="space-y-4">
                            <div class="p-4 rounded-xl border border-primary/20 bg-primary-light/30 space-y-1">
                                <div class="flex items-center justify-between text-xs">
                                    <span class="font-bold text-primary">Current Tenure</span>
                                    <BaseBadge variant="primary" size="sm">Active</BaseBadge>
                                </div>
                                <h4 class="text-sm font-bold text-text-main">President</h4>
                                <p class="text-xs text-text-muted">Executive Committee (2024–2026)</p>
                            </div>

                            <div class="p-4 rounded-xl border border-border-main bg-slate-50 space-y-1">
                                <div class="flex items-center justify-between text-xs">
                                    <span class="font-bold text-text-muted">Past Tenure</span>
                                    <BaseBadge variant="neutral" size="sm">Completed</BaseBadge>
                                </div>
                                <h4 class="text-sm font-bold text-text-main">Joint Secretary</h4>
                                <p class="text-xs text-text-muted">Executive Committee (2022–2024)</p>
                            </div>
                        </div>
                    </BaseCard>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup>
import { ref } from 'vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import StatsCard from '@/components/dashboard/StatsCard.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseTable from '@/components/ui/BaseTable.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { ArrowLeft, CreditCard, CheckCircle2, HeartHandshake } from 'lucide-vue-next';

const member = ref({
    id: 1,
    code: 'NS12-0001',
    initials: 'TA',
    name: 'Tanvir Ahmed',
    roll: '101',
    bloodGroup: 'O+',
    designation: 'President (2024–2026)',
    profession: 'Sr. Software Architect',
    organization: 'Tech Solutions Ltd',
    phone: '+880 1711-223344',
    email: 'tanvir.ahmed@example.com',
    address: 'House #12, Road #4, Dhanmondi, Dhaka'
});

const paymentHistory = [
    { ref: 'REC-2026-0812', purpose: 'Monthly Chada (August 2026)', method: 'bKash', date: 'Aug 10, 2026', amount: 100 },
    { ref: 'REC-2026-0749', purpose: 'Donation: Medical Fund for Sir Rahman', method: 'City Bank', date: 'Jul 22, 2026', amount: 10000 },
    { ref: 'REC-2026-0701', purpose: 'Monthly Chada (July 2026)', method: 'Nagad', date: 'Jul 05, 2026', amount: 100 },
    { ref: 'REC-2026-0620', purpose: 'Donation: Emergency Flood Relief', method: 'bKash', date: 'Jun 18, 2026', amount: 5000 },
    { ref: 'REC-2026-0601', purpose: 'Monthly Chada (June 2026)', method: 'Cash', date: 'Jun 02, 2026', amount: 100 }
];

const handleEditProfile = () => {
    alert('Edit profile modal for ' + member.value.name);
};

const handleRecordPayment = () => {
    alert('Collecting payment for ' + member.value.name);
};
</script>
