<template>
    <PublicLayout>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <!-- Role Switcher Quick Pill Bar (For testing ease) -->
            <div class="p-3 bg-white rounded-2xl border border-border-main flex flex-wrap items-center justify-between gap-3 shadow-xs">
                <div class="flex items-center space-x-2 text-xs">
                    <span class="font-bold text-text-main flex items-center">
                        <User class="w-4 h-4 mr-1 text-primary" />
                        Dashboard Role Switcher:
                    </span>
                    <span class="text-text-muted hidden sm:inline">(Currently viewing as General Alumni Member)</span>
                </div>

                <div class="flex items-center space-x-2">
                    <router-link
                        to="/admin/dashboard"
                        class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-text-main transition-colors"
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
                        class="px-3 py-1.5 rounded-xl text-xs font-bold bg-primary text-white shadow-xs"
                    >
                        Member View
                    </router-link>
                </div>
            </div>

            <!-- Member Identity Banner -->
            <div class="p-6 sm:p-8 bg-gradient-to-r from-primary to-blue-900 rounded-3xl text-white shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div class="flex items-center space-x-4">
                    <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center font-black text-2xl shrink-0">
                        TA
                    </div>
                    <div>
                        <div class="flex items-center space-x-2.5">
                            <h2 class="text-xl sm:text-2xl font-black">Tanvir Ahmed</h2>
                            <span class="px-2 py-0.5 rounded-full text-xs font-bold bg-secondary text-white">
                                Active Member
                            </span>
                        </div>
                        <p class="text-xs sm:text-sm text-primary-light mt-1">
                            Software Architect &bull; Batch NS-12 &bull; Blood Group: <span class="text-white font-bold bg-white/20 px-1.5 py-0.5 rounded">O+</span>
                        </p>
                        <p class="text-xs text-primary-light/80 font-mono mt-1">
                            Member ID: <strong class="text-white">NS12-0001</strong>
                        </p>
                    </div>
                </div>

                <div class="flex items-center space-x-3 self-start sm:self-center">
                    <router-link to="/contact">
                        <BaseButton variant="outline" size="sm" class="bg-white/10 text-white border-white/20 hover:bg-white/20">
                            Request Mutual Aid
                        </BaseButton>
                    </router-link>
                    <BaseButton variant="secondary" size="sm" @click="isPayChadaModalOpen = true">
                        Pay Chada Online
                    </BaseButton>
                </div>
            </div>

            <!-- Member Personal Contribution Metric Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <!-- Pending Chada (Urgent / Warning) -->
                <div class="bg-white rounded-2xl border border-red-200/60 p-5 shadow-xs flex flex-col justify-between">
                    <div class="flex items-start justify-between">
                        <div>
                            <span class="text-xs font-semibold text-danger uppercase tracking-wider">Pending Chada Dues</span>
                            <h3 class="text-2xl sm:text-3xl font-extrabold text-danger mt-1">৳ 200</h3>
                        </div>
                        <div class="w-10 h-10 rounded-xl bg-red-50 text-danger flex items-center justify-center">
                            <AlertCircle class="w-5 h-5" />
                        </div>
                    </div>
                    <div class="mt-4 pt-3 border-t border-border-main flex items-center justify-between text-xs">
                        <span class="text-text-muted">Sep & Oct 2026</span>
                        <button
                            type="button"
                            @click="isPayChadaModalOpen = true"
                            class="text-xs font-bold text-danger hover:underline"
                        >
                            Pay Due Now &rarr;
                        </button>
                    </div>
                </div>

                <!-- Total Paid Chada -->
                <StatsCard
                    title="Total Chada Cleared"
                    value="৳ 2,400"
                    subtitle="24 Months Verified"
                    trend="In Good Standing"
                    trend-direction="up"
                    variant="primary"
                    :icon="CreditCard"
                />

                <!-- Total Donations Pledged -->
                <StatsCard
                    title="Charity Donations"
                    value="৳ 15,000"
                    subtitle="Across 3 Campaigns"
                    trend="Top Contributor"
                    trend-direction="up"
                    variant="secondary"
                    :icon="HeartHandshake"
                />

                <!-- Emergency Blood Network -->
                <StatsCard
                    title="Emergency Blood Registry"
                    value="O+ Positive"
                    subtitle="Ready for Emergency Call"
                    trend="Active Donor"
                    trend-direction="neutral"
                    variant="slate"
                    :icon="ShieldCheck"
                />
            </div>

            <!-- 2-Col Grid: My Payment History & Running Campaigns -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Left 2 Cols: My Personal Payment Ledger -->
                <div class="lg:col-span-2 space-y-6">
                    <BaseCard title="My Personal Contribution History" subtitle="Official receipts issued for your subscriptions & charity gifts">
                        <template #header-action>
                            <BaseButton variant="outline" size="sm" @click="handleDownloadStatement">
                                Download Statement
                            </BaseButton>
                        </template>

                        <BaseTable col-span="5">
                            <template #head>
                                <th class="px-4 py-3">Receipt Ref</th>
                                <th class="px-4 py-3">Particulars</th>
                                <th class="px-4 py-3">Channel</th>
                                <th class="px-4 py-3">Date</th>
                                <th class="px-4 py-3 text-right">Amount (BDT)</th>
                            </template>
                            <template #body>
                                <tr
                                    v-for="item in myHistory"
                                    :key="item.ref"
                                    class="hover:bg-slate-50 transition-colors text-xs"
                                >
                                    <td class="px-4 py-3 font-mono font-bold text-primary">{{ item.ref }}</td>
                                    <td class="px-4 py-3 font-medium text-text-main">{{ item.purpose }}</td>
                                    <td class="px-4 py-3 text-text-muted">{{ item.channel }}</td>
                                    <td class="px-4 py-3 text-text-muted">{{ item.date }}</td>
                                    <td class="px-4 py-3 text-right font-bold text-secondary">৳ {{ item.amount.toLocaleString() }}</td>
                                </tr>
                            </template>
                        </BaseTable>
                    </BaseCard>
                </div>

                <!-- Right 1 Col: Urgent Classmate Aid Spotlight -->
                <div class="space-y-6">
                    <BaseCard title="Batch Aid Spotlight" subtitle="Your classmates are rallying for this cause">
                        <div class="space-y-4">
                            <div class="p-4 rounded-xl border border-secondary/30 bg-secondary-light/30 space-y-3">
                                <div class="flex items-center justify-between text-xs">
                                    <span class="font-bold text-secondary font-mono">NS12-MED-01</span>
                                    <BaseBadge variant="secondary" size="sm">Urgent</BaseBadge>
                                </div>

                                <h4 class="text-sm font-bold text-text-main leading-tight">
                                    Medical Treatment Fund for Sir M. Rahman
                                </h4>

                                <div class="w-full bg-white rounded-full h-2 overflow-hidden border border-secondary/20">
                                    <div class="bg-secondary h-2 rounded-full" style="width: 74%"></div>
                                </div>

                                <div class="flex items-center justify-between text-xs pt-1">
                                    <span class="font-bold text-text-main">74% of ৳ 2.5L</span>
                                    <router-link to="/projects/medical-support-sir-rahman" class="font-bold text-secondary hover:underline">
                                        Donate &rarr;
                                    </router-link>
                                </div>
                            </div>

                            <!-- Emergency Blood Call -->
                            <div class="p-4 rounded-xl border border-red-200 bg-red-50/50 space-y-2 text-xs">
                                <span class="font-bold text-danger flex items-center">
                                    <AlertCircle class="w-4 h-4 mr-1 shrink-0" />
                                    Urgent Blood Needed: B+ Positive
                                </span>
                                <p class="text-text-muted leading-relaxed">
                                    Square Hospital ICU for a batchmate mother. If you are eligible to donate, contact the coordinator.
                                </p>
                                <router-link to="/contact" class="font-bold text-danger hover:underline block pt-1">
                                    View Emergency Hotline &rarr;
                                </router-link>
                            </div>
                        </div>
                    </BaseCard>
                </div>
            </div>
        </div>

        <!-- Quick Pay Chada Modal -->
        <BaseModal
            v-model="isPayChadaModalOpen"
            title="Pay Monthly Subscription (Chada)"
            subtitle="Clear your pending dues to maintain association operations"
            max-width="md"
        >
            <div class="space-y-4 text-xs">
                <div class="p-3.5 bg-slate-50 rounded-xl border border-border-main flex items-center justify-between">
                    <div>
                        <span class="text-text-muted block">Pending Dues:</span>
                        <span class="font-bold text-text-main text-sm">Sep 2026, Oct 2026 (2 Months)</span>
                    </div>
                    <span class="text-lg font-black text-danger">৳ 200</span>
                </div>

                <BaseSelect
                    label="Select Payment Method"
                    placeholder="Choose payment channel"
                    :options="['bKash Payment', 'Nagad Payment', 'Direct Bank Transfer', 'Cash to Treasurer']"
                    required
                />

                <div class="p-3 bg-primary-light/40 rounded-xl border border-primary/20 space-y-1">
                    <p class="font-bold text-primary">bKash Merchant Account:</p>
                    <p class="font-mono text-text-main font-semibold">017XXXXXXXX (Reference: NS12-0001)</p>
                </div>

                <BaseInput
                    label="Transaction ID (TrxID) after payment"
                    placeholder="e.g. 9K382049AL"
                    required
                />
            </div>

            <template #footer="{ close }">
                <BaseButton variant="outline" size="sm" @click="close">
                    Cancel
                </BaseButton>
                <BaseButton variant="secondary" size="sm" @click="handlePaySubmit(close)">
                    Submit Payment Reference
                </BaseButton>
            </template>
        </BaseModal>
    </PublicLayout>
</template>

<script setup>
import { ref } from 'vue';
import PublicLayout from '@/layouts/PublicLayout.vue';
import StatsCard from '@/components/dashboard/StatsCard.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseTable from '@/components/ui/BaseTable.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseSelect from '@/components/ui/BaseSelect.vue';
import {
    User,
    CreditCard,
    HeartHandshake,
    ShieldCheck,
    AlertCircle
} from 'lucide-vue-next';

const isPayChadaModalOpen = ref(false);

const myHistory = [
    { ref: 'REC-2026-0812', purpose: 'Monthly Chada (August 2026)', channel: 'bKash', date: 'Aug 10, 2026', amount: 100 },
    { ref: 'REC-2026-0749', purpose: 'Donation: Medical Fund for Sir Rahman', channel: 'Bank Transfer', date: 'Jul 22, 2026', amount: 10000 },
    { ref: 'REC-2026-0701', purpose: 'Monthly Chada (July 2026)', channel: 'Nagad', date: 'Jul 05, 2026', amount: 100 },
    { ref: 'REC-2026-0620', purpose: 'Donation: Emergency Flood Relief Drive', channel: 'bKash', date: 'Jun 18, 2026', amount: 5000 },
    { ref: 'REC-2026-0601', purpose: 'Monthly Chada (June 2026)', channel: 'bKash', date: 'Jun 02, 2026', amount: 100 },
];

const handlePaySubmit = (closeModal) => {
    alert('Payment reference submitted! Treasurer will verify and your dues will be cleared.');
    closeModal();
};

const handleDownloadStatement = () => {
    alert('Mock download started: Tanvir-Ahmed-NS12-Statement.pdf');
};
</script>
