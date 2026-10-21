<template>
    <AdminLayout
        title="Treasurer Financial Desk"
        subtitle="Cash balances, monthly subscription collection, and transparent accounting."
    >
        <div class="space-y-8">
            <!-- Role Switcher Pill Bar -->
            <div class="p-3 bg-white rounded-2xl border border-border-main flex flex-wrap items-center justify-between gap-3 shadow-xs">
                <div class="flex items-center space-x-2 text-xs">
                    <span class="font-bold text-text-main flex items-center">
                        <Wallet class="w-4 h-4 mr-1 text-secondary" />
                        Dashboard Role Switcher:
                    </span>
                    <span class="text-text-muted hidden sm:inline">(Currently viewing as Association Treasurer)</span>
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
                        class="px-3 py-1.5 rounded-xl text-xs font-bold bg-secondary text-white shadow-xs"
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

            <!-- Financial Status Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <StatsCard
                    title="Total Liquid Balance"
                    value="৳ 3,45,200"
                    subtitle="Bank + Cash Combined"
                    trend="100% Reconciled"
                    trend-direction="up"
                    variant="secondary"
                    :icon="Wallet"
                />

                <StatsCard
                    title="City Bank Account"
                    value="৳ 2,90,000"
                    subtitle="A/C #1102938472"
                    trend="Operating Account"
                    trend-direction="neutral"
                    variant="primary"
                    :icon="Building2"
                />

                <StatsCard
                    title="Cash & Mobile Wallets"
                    value="৳ 55,200"
                    subtitle="bKash / Nagad Merchant"
                    trend="Instant Pledges"
                    trend-direction="up"
                    variant="slate"
                    :icon="Smartphone"
                />

                <StatsCard
                    title="Uncollected Chada Dues"
                    value="৳ 42,000"
                    subtitle="35 Members Pending"
                    trend="Action required"
                    trend-direction="down"
                    variant="danger"
                    :icon="AlertCircle"
                />
            </div>

            <!-- Quick Action Toolbar -->
            <div class="p-5 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div>
                    <h3 class="text-base font-bold flex items-center">
                        <PlusCircle class="w-5 h-5 mr-2 text-secondary" />
                        Quick Financial Action Desk
                    </h3>
                    <p class="text-xs text-slate-300 mt-0.5">
                        Immediately issue receipts, record manual cash collections, or register emergency hospital vouchers.
                    </p>
                </div>

                <div class="flex items-center space-x-3 w-full sm:w-auto">
                    <BaseButton
                        variant="secondary"
                        size="md"
                        @click="isCollectModalOpen = true"
                    >
                        + Collect Chada Payment
                    </BaseButton>

                    <BaseButton
                        variant="outline"
                        size="md"
                        class="bg-white/10 text-white border-white/20 hover:bg-white/20"
                        @click="isExpenseModalOpen = true"
                    >
                        - Add Expense Voucher
                    </BaseButton>
                </div>
            </div>

            <!-- Recent Financial Transactions Table -->
            <BaseCard title="Latest Central Ledger Entries" subtitle="Immutable real-time audit ledger of all funds">
                <BaseTable col-span="6">
                    <template #head>
                        <th class="px-5 py-3">Txn Code</th>
                        <th class="px-5 py-3">Type</th>
                        <th class="px-5 py-3">Particulars & Memo</th>
                        <th class="px-5 py-3">Payment Channel</th>
                        <th class="px-5 py-3">Timestamp</th>
                        <th class="px-5 py-3 text-right">Amount (BDT)</th>
                    </template>
                    <template #body>
                        <tr
                            v-for="txn in recentTransactions"
                            :key="txn.code"
                            class="hover:bg-slate-50 transition-colors text-xs"
                        >
                            <td class="px-5 py-3.5 font-mono font-semibold text-primary">
                                {{ txn.code }}
                            </td>
                            <td class="px-5 py-3.5">
                                <BaseBadge :variant="txn.type === 'Income' ? 'secondary' : 'danger'" dot size="sm">
                                    {{ txn.type }}
                                </BaseBadge>
                            </td>
                            <td class="px-5 py-3.5 font-medium text-text-main">
                                {{ txn.particulars }}
                            </td>
                            <td class="px-5 py-3.5 text-text-muted">
                                {{ txn.channel }}
                            </td>
                            <td class="px-5 py-3.5 text-text-muted">
                                {{ txn.date }}
                            </td>
                            <td
                                :class="[
                                    'px-5 py-3.5 text-right font-bold',
                                    txn.type === 'Income' ? 'text-secondary' : 'text-danger'
                                ]"
                            >
                                {{ txn.type === 'Income' ? '+' : '-' }} ৳ {{ txn.amount.toLocaleString() }}
                            </td>
                        </tr>
                    </template>
                </BaseTable>
            </BaseCard>

            <!-- Quick Collect Chada Modal -->
            <BaseModal
                v-model="isCollectModalOpen"
                title="Record Monthly Chada Payment"
                subtitle="Issue official receipt and update member due balance"
                max-width="md"
            >
                <div class="space-y-4">
                    <BaseSelect
                        label="Select Member"
                        placeholder="Choose a batchmate"
                        :options="['Tanvir Ahmed (NS12-0001)', 'Dr. Rafiqul Islam (NS12-0002)', 'Sajid Karim (NS12-0005)', 'Fahim Faisal (NS12-0008)']"
                        required
                    />

                    <div class="grid grid-cols-2 gap-3">
                        <BaseInput
                            label="Month & Year"
                            placeholder="October 2026"
                            model-value="October 2026"
                            readonly
                        />
                        <BaseInput
                            label="Amount (BDT)"
                            placeholder="100"
                            model-value="100"
                            type="number"
                            required
                        />
                    </div>

                    <BaseSelect
                        label="Collection Channel"
                        placeholder="Select method"
                        :options="['bKash (Merchant)', 'Nagad', 'Cash in Hand', 'Direct Bank Transfer']"
                        required
                    />

                    <BaseInput
                        label="Transaction Ref / Memo (Optional)"
                        placeholder="e.g. TrxID 9K384L9"
                    />
                </div>

                <template #footer="{ close }">
                    <BaseButton variant="outline" size="sm" @click="close">
                        Cancel
                    </BaseButton>
                    <BaseButton variant="secondary" size="sm" @click="handleRecordPayment(close)">
                        Save & Issue Receipt
                    </BaseButton>
                </template>
            </BaseModal>

            <!-- Quick Record Expense Modal -->
            <BaseModal
                v-model="isExpenseModalOpen"
                title="Record Official Expense Voucher"
                subtitle="Must be supported by physical bill or hospital voucher"
                max-width="md"
            >
                <div class="space-y-4">
                    <BaseSelect
                        label="Expense Category"
                        placeholder="Select category"
                        :options="['Hospital / Medical Aid', 'Teacher Welfare Assistance', 'Emergency Relief Operations', 'Administrative / Secretarial', 'Annual Reunion Deposit']"
                        required
                    />

                    <BaseInput
                        label="Expense Amount (BDT)"
                        placeholder="e.g. 25000"
                        type="number"
                        required
                    />

                    <BaseInput
                        label="Voucher / Hospital Bill Ref #"
                        placeholder="e.g. VCH-HOSP-2026-904"
                        required
                    />

                    <BaseInput
                        label="Expense Purpose / Memo"
                        placeholder="e.g. Medicine purchase for Sir Rahman ICU"
                        required
                    />
                </div>

                <template #footer="{ close }">
                    <BaseButton variant="outline" size="sm" @click="close">
                        Cancel
                    </BaseButton>
                    <BaseButton variant="danger" size="sm" @click="handleRecordExpense(close)">
                        Record Expense
                    </BaseButton>
                </template>
            </BaseModal>
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
import BaseModal from '@/components/ui/BaseModal.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseSelect from '@/components/ui/BaseSelect.vue';
import {
    Wallet,
    Building2,
    Smartphone,
    AlertCircle,
    PlusCircle
} from 'lucide-vue-next';

const isCollectModalOpen = ref(false);
const isExpenseModalOpen = ref(false);

const recentTransactions = [
    { code: 'TXN-2026-1049', type: 'Income', particulars: 'Monthly Chada Collection: Tanvir Ahmed (NS12-0001)', channel: 'bKash', date: 'Today, 11:20 AM', amount: 1200 },
    { code: 'TXN-2026-1048', type: 'Expense', particulars: 'Disbursed ICU Medicine Voucher: Sir M. Rahman (NS12-MED-01)', channel: 'Bank Transfer', date: 'Yesterday, 04:15 PM', amount: 45000 },
    { code: 'TXN-2026-1047', type: 'Income', particulars: 'Charity Donation: Anonymous Batchmate for Flood Relief', channel: 'Nagad', date: 'Oct 19, 2026', amount: 20000 },
    { code: 'TXN-2026-1046', type: 'Income', particulars: 'Monthly Chada Collection: Dr. Rafiqul Islam (NS12-0002)', channel: 'Cash', date: 'Oct 19, 2026', amount: 100 },
    { code: 'TXN-2026-1045', type: 'Expense', particulars: 'Emergency Dry Rations Purchase: Flood Relief Campaign', channel: 'City Bank', date: 'Oct 17, 2026', amount: 35000 },
];

const handleRecordPayment = (closeModal) => {
    alert('Payment successfully logged! Financial ledger updated and printable receipt generated.');
    closeModal();
};

const handleRecordExpense = (closeModal) => {
    alert('Expense voucher recorded! Funds deducted from central ledger with audit timestamp.');
    closeModal();
};
</script>
