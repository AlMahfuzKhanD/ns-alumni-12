<template>
    <AdminLayout
        title="Monthly Chada (Subscription) Management"
        subtitle="Due generation, payment tracking, member contribution logs, and official receipts."
    >
        <div class="space-y-6">
            <!-- Top Metrics Row -->
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div class="p-4 bg-white rounded-2xl border border-border-main shadow-xs">
                    <span class="text-xs font-semibold text-text-muted uppercase">Active Paying Members</span>
                    <p class="text-2xl font-black text-text-main mt-1">492</p>
                    <span class="text-[11px] text-text-muted">Standard rate: ৳ 100/mo</span>
                </div>

                <div class="p-4 bg-white rounded-2xl border border-border-main shadow-xs">
                    <span class="text-xs font-semibold text-secondary uppercase">October 2026 Collected</span>
                    <p class="text-2xl font-black text-secondary mt-1">৳ 45,700</p>
                    <span class="text-[11px] text-secondary font-semibold">92.8% collection rate</span>
                </div>

                <div class="p-4 bg-white rounded-2xl border border-border-main shadow-xs">
                    <span class="text-xs font-semibold text-danger uppercase">Total Outstanding Dues</span>
                    <p class="text-2xl font-black text-danger mt-1">৳ 3,500</p>
                    <span class="text-[11px] text-danger font-semibold">35 members with dues</span>
                </div>

                <div class="p-4 bg-white rounded-2xl border border-border-main shadow-xs flex flex-col justify-between">
                    <span class="text-xs font-semibold text-primary uppercase">Quick Payment Entry</span>
                    <BaseButton variant="secondary" size="sm" @click="isCollectModalOpen = true" fullWidth>
                        + Record Payment
                    </BaseButton>
                </div>
            </div>

            <!-- Main Chada Dues Table Card -->
            <BaseCard no-padding>
                <BaseTable col-span="6">
                    <template #toolbar>
                        <div class="flex items-center space-x-2">
                            <span class="text-xs font-bold text-text-main">Billing Month:</span>
                            <select
                                v-model="selectedMonth"
                                class="h-10 px-3 text-xs font-bold bg-white text-primary rounded-xl border border-border-main focus:outline-none"
                            >
                                <option value="October 2026">October 2026 (Current)</option>
                                <option value="September 2026">September 2026</option>
                                <option value="August 2026">August 2026</option>
                            </select>
                        </div>

                        <!-- Filter Status Tabs -->
                        <div class="flex items-center space-x-2">
                            <button
                                v-for="st in ['All', 'Paid', 'Due']"
                                :key="st"
                                @click="filterStatus = st"
                                :class="[
                                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                                    filterStatus === st
                                        ? 'bg-primary text-white shadow-xs'
                                        : 'text-text-muted hover:text-text-main bg-slate-100'
                                ]"
                            >
                                {{ st }}
                            </button>
                        </div>
                    </template>

                    <template #head>
                        <th class="px-5 py-3">Member ID</th>
                        <th class="px-5 py-3">Alumnus Name</th>
                        <th class="px-5 py-3">Month</th>
                        <th class="px-5 py-3">Payable</th>
                        <th class="px-5 py-3">Paid</th>
                        <th class="px-5 py-3">Status</th>
                        <th class="px-5 py-3 text-right">Actions</th>
                    </template>

                    <template #body>
                        <tr
                            v-for="record in filteredRecords"
                            :key="record.id"
                            class="hover:bg-slate-50 transition-colors text-xs"
                        >
                            <td class="px-5 py-3.5 font-mono font-bold text-primary">{{ record.code }}</td>
                            <td class="px-5 py-3.5 font-semibold text-text-main">{{ record.name }}</td>
                            <td class="px-5 py-3.5 text-text-muted">{{ record.month }}</td>
                            <td class="px-5 py-3.5 font-semibold text-text-main">৳ {{ record.payable }}</td>
                            <td class="px-5 py-3.5 font-bold" :class="record.paid > 0 ? 'text-secondary' : 'text-danger'">
                                ৳ {{ record.paid }}
                            </td>
                            <td class="px-5 py-3.5">
                                <BaseBadge :variant="record.status === 'Paid' ? 'secondary' : 'danger'" dot size="sm">
                                    {{ record.status }}
                                </BaseBadge>
                            </td>
                            <td class="px-5 py-3.5 text-right space-x-2">
                                <button
                                    v-if="record.status === 'Paid'"
                                    type="button"
                                    @click="openReceipt(record)"
                                    class="text-xs font-semibold text-primary hover:underline"
                                >
                                    Receipt
                                </button>
                                <button
                                    v-else
                                    type="button"
                                    @click="quickCollect(record)"
                                    class="text-xs font-semibold text-secondary hover:underline"
                                >
                                    Collect
                                </button>
                            </td>
                        </tr>
                    </template>
                </BaseTable>
            </BaseCard>

            <!-- Printable Official Chada Receipt Modal -->
            <BaseModal
                v-model="isReceiptModalOpen"
                title="Official Money Receipt"
                subtitle="Issued by Alumni Association of NS - 12"
                max-width="lg"
            >
                <div v-if="activeReceipt" id="printable-receipt" class="bg-white p-6 rounded-2xl border-2 border-dashed border-border-main space-y-6 text-xs text-text-main">
                    <!-- Receipt Header -->
                    <div class="flex items-center justify-between pb-4 border-b border-border-main">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 rounded-xl bg-primary text-white font-black flex items-center justify-center text-lg shadow-xs">
                                NS
                            </div>
                            <div>
                                <h3 class="font-extrabold text-base text-text-main">Alumni Association of NS - 12</h3>
                                <p class="text-[11px] text-text-muted font-medium">Once Classmates, Forever Connected</p>
                            </div>
                        </div>

                        <div class="text-right">
                            <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-secondary border border-secondary/30">
                                PAYMENT ACKNOWLEDGED
                            </span>
                            <p class="font-mono text-xs text-text-muted mt-1">Receipt #: <strong class="text-text-main">{{ activeReceipt.receiptNo }}</strong></p>
                        </div>
                    </div>

                    <!-- Member Info Grid -->
                    <div class="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl">
                        <div>
                            <span class="text-text-muted block text-[11px]">Received From:</span>
                            <span class="font-bold text-sm text-text-main">{{ activeReceipt.name }}</span>
                            <span class="block text-text-muted font-mono text-[11px]">ID: {{ activeReceipt.code }} &bull; Batch 2012</span>
                        </div>
                        <div class="text-right">
                            <span class="text-text-muted block text-[11px]">Payment Date:</span>
                            <span class="font-semibold text-text-main">{{ activeReceipt.date }}</span>
                            <span class="block text-text-muted text-[11px]">Method: {{ activeReceipt.method }}</span>
                        </div>
                    </div>

                    <!-- Line Item -->
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="border-b border-border-main text-text-muted font-semibold">
                                <th class="py-2">Description</th>
                                <th class="py-2 text-right">Amount (BDT)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-border-main">
                                <td class="py-2.5 font-medium">Monthly Chada Subscription ({{ activeReceipt.month }})</td>
                                <td class="py-2.5 text-right font-bold text-text-main">৳ {{ activeReceipt.amount }}</td>
                            </tr>
                            <tr>
                                <td class="py-2 text-right font-bold text-text-main">Total Cleared:</td>
                                <td class="py-2 text-right font-black text-secondary text-sm">৳ {{ activeReceipt.amount }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Amount in words -->
                    <p class="text-[11px] text-text-muted italic">
                        In Words: One Hundred Taka Only.
                    </p>

                    <!-- Signature & Seal -->
                    <div class="pt-6 flex items-end justify-between text-center text-[11px]">
                        <div>
                            <span class="font-mono text-slate-400 block pb-1">NS-12 VERIFIED STAMP</span>
                            <span class="px-2 py-0.5 border border-primary text-primary font-bold rounded">OFFICIAL RECEIPT</span>
                        </div>
                        <div class="border-t border-text-main pt-1 px-4">
                            <span class="font-bold text-text-main block">Mahmudul Hasan</span>
                            <span class="text-text-muted">Treasurer, Batch NS-12</span>
                        </div>
                    </div>
                </div>

                <template #footer="{ close }">
                    <BaseButton variant="outline" size="sm" @click="close">
                        Close
                    </BaseButton>
                    <BaseButton variant="primary" size="sm" @click="handlePrint">
                        Print / Save as PDF
                    </BaseButton>
                </template>
            </BaseModal>

            <!-- Quick Collect Chada Modal -->
            <BaseModal
                v-model="isCollectModalOpen"
                title="Record Member Chada"
                subtitle="Instantly update due record and trigger receipt"
                max-width="md"
            >
                <div class="space-y-4 text-xs">
                    <BaseSelect
                        v-model="paymentForm.member"
                        label="Select Member"
                        placeholder="Choose member"
                        :options="['Tanvir Ahmed (NS12-0001)', 'Dr. Rafiqul Islam (NS12-0002)', 'Sajid Karim (NS12-0005)', 'Fahim Faisal (NS12-0008)']"
                        required
                    />

                    <div class="grid grid-cols-2 gap-3">
                        <BaseInput
                            label="Month"
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
                        label="Payment Channel"
                        placeholder="Select method"
                        :options="['bKash (Merchant)', 'Nagad', 'Cash to Treasurer', 'Direct Bank Transfer']"
                        required
                    />
                </div>

                <template #footer="{ close }">
                    <BaseButton variant="outline" size="sm" @click="close">
                        Cancel
                    </BaseButton>
                    <BaseButton variant="secondary" size="sm" @click="handleSavePayment(close)">
                        Save & Print Receipt
                    </BaseButton>
                </template>
            </BaseModal>
        </div>
    </AdminLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseTable from '@/components/ui/BaseTable.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import BaseSelect from '@/components/ui/BaseSelect.vue';
import BaseInput from '@/components/ui/BaseInput.vue';

const selectedMonth = ref('October 2026');
const filterStatus = ref('All');
const isReceiptModalOpen = ref(false);
const isCollectModalOpen = ref(false);
const activeReceipt = ref(null);

const paymentForm = ref({
    member: '',
    method: 'bKash'
});

const chadaRecords = ref([
    { id: 1, code: 'NS12-0001', name: 'Tanvir Ahmed', month: 'October 2026', payable: 100, paid: 100, status: 'Paid', receiptNo: 'NS12-CHADA-2026-1001', date: 'Oct 04, 2026', method: 'bKash' },
    { id: 2, code: 'NS12-0002', name: 'Dr. Rafiqul Islam', month: 'October 2026', payable: 100, paid: 100, status: 'Paid', receiptNo: 'NS12-CHADA-2026-1002', date: 'Oct 05, 2026', method: 'Cash' },
    { id: 3, code: 'NS12-0003', name: 'Mahmudul Hasan', month: 'October 2026', payable: 100, paid: 100, status: 'Paid', receiptNo: 'NS12-CHADA-2026-1003', date: 'Oct 02, 2026', method: 'City Bank' },
    { id: 4, code: 'NS12-0004', name: 'Kamrul Hasan', month: 'October 2026', payable: 100, paid: 100, status: 'Paid', receiptNo: 'NS12-CHADA-2026-1004', date: 'Oct 06, 2026', method: 'Nagad' },
    { id: 5, code: 'NS12-0005', name: 'Sajid Karim', month: 'October 2026', payable: 100, paid: 0, status: 'Due', receiptNo: null, date: null, method: null },
    { id: 6, code: 'NS12-0006', name: 'Nafis Imtiaz', month: 'October 2026', payable: 100, paid: 0, status: 'Due', receiptNo: null, date: null, method: null },
    { id: 7, code: 'NS12-0007', name: 'Zubair Hossain', month: 'October 2026', payable: 100, paid: 100, status: 'Paid', receiptNo: 'NS12-CHADA-2026-1007', date: 'Oct 11, 2026', method: 'bKash' },
    { id: 8, code: 'NS12-0008', name: 'Fahim Faisal', month: 'October 2026', payable: 100, paid: 0, status: 'Due', receiptNo: null, date: null, method: null },
]);

const filteredRecords = computed(() => {
    if (filterStatus.value === 'All') return chadaRecords.value;
    return chadaRecords.value.filter(r => r.status === filterStatus.value);
});

const openReceipt = (record) => {
    activeReceipt.value = {
        receiptNo: record.receiptNo || 'NS12-CHADA-2026-0924',
        name: record.name,
        code: record.code,
        month: record.month,
        amount: record.paid,
        date: record.date || 'Oct 12, 2026',
        method: record.method || 'bKash'
    };
    isReceiptModalOpen.value = true;
};

const quickCollect = (record) => {
    record.paid = 100;
    record.status = 'Paid';
    record.receiptNo = `NS12-CHADA-2026-10${Math.floor(10 + Math.random() * 89)}`;
    record.date = 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    record.method = 'bKash (Treasurer)';
    openReceipt(record);
};

const handleSavePayment = (closeModal) => {
    alert('Payment recorded! New receipt generated and member account updated.');
    closeModal();
};

const handlePrint = () => {
    window.print();
};
</script>

<style scoped>
@media print {
    body * {
        visibility: hidden;
    }
    #printable-receipt, #printable-receipt * {
        visibility: visible;
    }
    #printable-receipt {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
    }
}
</style>
