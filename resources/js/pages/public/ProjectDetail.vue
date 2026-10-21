<template>
    <PublicLayout>
        <!-- Top Back Nav -->
        <div class="bg-white border-b border-border-main py-4">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <router-link to="/projects" class="inline-flex items-center text-xs font-semibold text-text-muted hover:text-primary transition-colors">
                    <ArrowLeft class="w-4 h-4 mr-1.5" />
                    Back to All Projects
                </router-link>

                <div class="flex items-center space-x-2">
                    <BaseBadge variant="secondary" dot size="sm">Active Campaign</BaseBadge>
                    <span class="text-xs font-mono font-medium text-text-muted">NS12-MED-01</span>
                </div>
            </div>
        </div>

        <!-- Project Overview & Hero -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Left 2 Cols: Story, Beneficiary, Transparency -->
                <div class="lg:col-span-2 space-y-8">
                    <!-- Title & Meta -->
                    <div>
                        <div class="flex items-center space-x-2 mb-3">
                            <span class="px-2.5 py-1 text-xs font-bold rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                                Teacher Support Fund
                            </span>
                            <span class="text-xs text-text-muted">Initiated Oct 12, 2026 &bull; Verified by Committee</span>
                        </div>
                        <h1 class="text-2xl sm:text-4xl font-extrabold text-text-main leading-tight">
                            Emergency Medical Treatment Support for Respected Sir M. Rahman
                        </h1>
                    </div>

                    <!-- Story Content -->
                    <BaseCard title="The Situation & Urgency" subtitle="Verified medical report and background">
                        <div class="prose prose-sm max-w-none text-text-muted space-y-4 leading-relaxed">
                            <p>
                                Many of us remember Sir M. Rahman from our classes in 2010–2012. His patient teaching, gentle smile, and encouragement shaped countless careers among us. Last week, Sir suffered a severe cardiac event and was rushed to the National Heart Foundation ICU.
                            </p>
                            <p>
                                Following emergency diagnostic angiography, doctors performed an immediate bypass surgery. While the surgery was successful, the prolonged ICU hospitalization, ventilation charges, and specialized cardiac medications have exceeded the family's savings.
                            </p>
                            <p>
                                The executive committee of NS-12 visited Sir and his son at the hospital on Monday, verified all hospital vouchers, and initiated this dedicated fund drive with a target of <strong>৳ 2,50,000</strong> to cover the remaining hospital dues.
                            </p>
                        </div>

                        <!-- Beneficiary Dignity Box -->
                        <div class="mt-6 p-4 rounded-xl bg-slate-50 border border-border-main flex items-center space-x-4">
                            <div class="w-12 h-12 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-lg shrink-0">
                                MR
                            </div>
                            <div>
                                <h4 class="text-sm font-bold text-text-main">M. Rahman (Senior Teacher, Retired)</h4>
                                <p class="text-xs text-text-muted">Admitted at National Heart Foundation, Mirpur, Dhaka. Cabin #402.</p>
                            </div>
                        </div>
                    </BaseCard>

                    <!-- Financial Transparency Breakdown Table -->
                    <BaseCard
                        title="Transparent Expense Ledger"
                        subtitle="Detailed itemized expenses verified by association treasurer"
                    >
                        <BaseTable col-span="4">
                            <template #head>
                                <th class="px-4 py-2.5">Date</th>
                                <th class="px-4 py-2.5">Expense Description</th>
                                <th class="px-4 py-2.5">Voucher / Receipt</th>
                                <th class="px-4 py-2.5 text-right">Amount (BDT)</th>
                            </template>
                            <template #body>
                                <tr v-for="expense in expenses" :key="expense.id" class="text-xs">
                                    <td class="px-4 py-3 text-text-muted">{{ expense.date }}</td>
                                    <td class="px-4 py-3 font-medium text-text-main">{{ expense.desc }}</td>
                                    <td class="px-4 py-3 text-primary font-mono">{{ expense.voucher }}</td>
                                    <td class="px-4 py-3 text-right font-bold text-text-main">৳ {{ expense.amount.toLocaleString() }}</td>
                                </tr>
                            </template>
                        </BaseTable>

                        <div class="mt-4 p-3 rounded-xl bg-slate-50 flex items-center justify-between text-xs font-semibold">
                            <span>Total Disbursed to Date:</span>
                            <span class="text-secondary font-bold text-sm">৳ 1,45,000</span>
                        </div>
                    </BaseCard>
                </div>

                <!-- Right 1 Col: Donation Target & Action Widget -->
                <div class="space-y-6">
                    <BaseCard class="sticky top-24">
                        <div class="space-y-5">
                            <div>
                                <span class="text-xs font-bold text-text-muted uppercase">Fundraising Status</span>
                                <div class="flex items-baseline space-x-2 mt-1">
                                    <span class="text-3xl font-extrabold text-secondary">৳ 1,85,000</span>
                                    <span class="text-sm text-text-muted">raised of ৳ 2,50,000</span>
                                </div>
                            </div>

                            <!-- Progress Bar -->
                            <div class="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                                <div class="bg-secondary h-3 rounded-full transition-all" style="width: 74%"></div>
                            </div>

                            <div class="grid grid-cols-2 gap-3 text-center py-2 border-y border-border-main text-xs">
                                <div>
                                    <p class="font-bold text-text-main text-base">74%</p>
                                    <p class="text-text-muted">Goal Reached</p>
                                </div>
                                <div>
                                    <p class="font-bold text-text-main text-base">42</p>
                                    <p class="text-text-muted">Total Donors</p>
                                </div>
                            </div>

                            <!-- Big Donate Button -->
                            <BaseButton variant="secondary" size="lg" fullWidth @click="isDonateModalOpen = true">
                                <template #icon>
                                    <HeartHandshake class="w-5 h-5" />
                                </template>
                                Donate To This Project
                            </BaseButton>

                            <p class="text-[11px] text-text-muted text-center leading-tight">
                                Contributions can be given via bKash, Nagad, or direct Bank Transfer. Real-time receipts generated.
                            </p>
                        </div>

                        <!-- Recent Contributors Section -->
                        <div class="mt-6 pt-6 border-t border-border-main space-y-3">
                            <h4 class="text-xs font-bold text-text-main uppercase tracking-wider">
                                Recent Contributors
                            </h4>

                            <div class="space-y-2.5">
                                <div v-for="donor in donors" :key="donor.name" class="flex items-center justify-between text-xs">
                                    <div class="flex items-center space-x-2">
                                        <div class="w-6 h-6 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-[10px]">
                                            {{ donor.name.charAt(0) }}
                                        </div>
                                        <span class="font-medium text-text-main">{{ donor.name }}</span>
                                    </div>
                                    <span class="font-semibold text-secondary">৳ {{ donor.amount.toLocaleString() }}</span>
                                </div>
                            </div>
                        </div>
                    </BaseCard>
                </div>
            </div>
        </section>

        <!-- Interactive Donation Modal -->
        <BaseModal
            v-model="isDonateModalOpen"
            title="Donate to Teacher Support Fund"
            subtitle="NS12-MED-01: Supporting Sir M. Rahman"
            max-width="lg"
        >
            <div class="space-y-5">
                <!-- Preset Amount Selector -->
                <div>
                    <label class="block text-xs font-semibold text-text-main mb-2">Select Donation Amount (BDT)</label>
                    <div class="grid grid-cols-4 gap-2">
                        <button
                            v-for="amt in [500, 1000, 2000, 5000]"
                            :key="amt"
                            type="button"
                            @click="selectedAmount = amt"
                            :class="[
                                'py-2 rounded-xl text-xs font-bold transition-all border',
                                selectedAmount === amt
                                    ? 'bg-secondary text-white border-secondary shadow-xs'
                                    : 'bg-white text-text-main border-border-main hover:bg-slate-50'
                            ]"
                        >
                            ৳ {{ amt }}
                        </button>
                    </div>
                </div>

                <!-- Custom Amount -->
                <BaseInput
                    v-model="customAmount"
                    label="Or Enter Custom Amount"
                    placeholder="Enter amount in BDT"
                    type="number"
                />

                <!-- Donor Identity -->
                <div class="space-y-3">
                    <BaseInput
                        v-model="donorName"
                        label="Your Name (Optional if anonymous)"
                        placeholder="e.g. Tanvir (Batch 12)"
                    />

                    <div class="flex items-center space-x-2 text-xs">
                        <input
                            id="anon"
                            type="checkbox"
                            v-model="isAnonymous"
                            class="rounded text-primary focus:ring-primary h-4 w-4"
                        />
                        <label for="anon" class="text-text-muted">Display my donation as "Anonymous Batchmate" on the public wall</label>
                    </div>
                </div>

                <!-- Payment Accounts Info -->
                <div class="p-4 bg-slate-50 rounded-xl border border-border-main space-y-2 text-xs">
                    <p class="font-bold text-text-main">Official Association Accounts:</p>
                    <div class="flex items-center justify-between text-text-muted">
                        <span>bKash / Nagad (Merchant):</span>
                        <span class="font-mono font-bold text-text-main">017XXXXXXXX</span>
                    </div>
                    <div class="flex items-center justify-between text-text-muted">
                        <span>Bank (City Bank):</span>
                        <span class="font-mono font-bold text-text-main">NS-12 Alumni &bull; 1102938472</span>
                    </div>
                </div>
            </div>

            <template #footer="{ close }">
                <BaseButton variant="outline" size="sm" @click="close">
                    Cancel
                </BaseButton>
                <BaseButton variant="secondary" size="sm" @click="handleDonationSubmit(close)">
                    Confirm & Pledge ৳ {{ customAmount || selectedAmount }}
                </BaseButton>
            </template>
        </BaseModal>
    </PublicLayout>
</template>

<script setup>
import { ref } from 'vue';
import PublicLayout from '@/layouts/PublicLayout.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseTable from '@/components/ui/BaseTable.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import { ArrowLeft, HeartHandshake } from 'lucide-vue-next';

const isDonateModalOpen = ref(false);
const selectedAmount = ref(2000);
const customAmount = ref('');
const donorName = ref('');
const isAnonymous = ref(false);

const expenses = [
    { id: 1, date: 'Oct 14, 2026', desc: 'ICU Advance Payment Deposit (National Heart Foundation)', voucher: 'VCH-NHF-10492', amount: 80000 },
    { id: 2, date: 'Oct 16, 2026', desc: 'Emergency Bypass Consumables & Medication Supply', voucher: 'VCH-MED-3847', amount: 45000 },
    { id: 3, date: 'Oct 18, 2026', desc: 'Post-operative Cardiac Monitoring & Blood Bags (4 Bags)', voucher: 'VCH-BLD-0921', amount: 20000 },
];

const donors = [
    { name: 'Dr. Rafiqul Islam', amount: 15000 },
    { name: 'Mahmudul Hasan', amount: 10000 },
    { name: 'Anonymous Batchmate', amount: 20000 },
    { name: 'Tanvir Ahmed', amount: 10000 },
    { name: 'Farhan & Group', amount: 25000 },
];

const handleDonationSubmit = (closeModal) => {
    alert(`Thank you! Your pledge of BDT ${customAmount.value || selectedAmount.value} has been recorded. Complete transfer to our official bKash/Bank account.`);
    closeModal();
};
</script>
