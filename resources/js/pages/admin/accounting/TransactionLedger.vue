<template>
    <AdminLayout
        title="Central Accounting Ledger"
        subtitle="Audited record of all financial inflows, project disbursements, and operational expenses"
    >
        <div class="space-y-6">
            <!-- Top Balance Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <BaseCard class="p-4 sm:p-5 border-l-4 border-l-primary flex items-center justify-between">
                    <div>
                        <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Net Treasury Balance</p>
                        <p class="text-2xl font-black text-text-main mt-1">৳{{ formatNumber(netTreasuryBalance) }}</p>
                        <p class="text-[11px] text-text-muted mt-1 font-medium flex items-center">
                            <span class="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1.5"></span>
                            Audited Liquidity Pool
                        </p>
                    </div>
                    <div class="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Wallet class="w-6 h-6" />
                    </div>
                </BaseCard>

                <BaseCard class="p-4 sm:p-5 border-l-4 border-l-emerald-500 flex items-center justify-between">
                    <div>
                        <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Total Inflow (Income)</p>
                        <p class="text-2xl font-black text-emerald-600 mt-1">৳{{ formatNumber(totalInflow) }}</p>
                        <p class="text-[11px] text-emerald-600 mt-1">Chada, Donations & Aid</p>
                    </div>
                    <div class="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                        <ArrowDownLeft class="w-6 h-6" />
                    </div>
                </BaseCard>

                <BaseCard class="p-4 sm:p-5 border-l-4 border-l-rose-500 flex items-center justify-between">
                    <div>
                        <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Total Outflow (Expenses)</p>
                        <p class="text-2xl font-black text-rose-600 mt-1">৳{{ formatNumber(totalOutflow) }}</p>
                        <p class="text-[11px] text-rose-600 mt-1">Medical Aid & Operations</p>
                    </div>
                    <div class="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
                        <ArrowUpRight class="w-6 h-6" />
                    </div>
                </BaseCard>

                <BaseCard class="p-4 sm:p-5 border-l-4 border-l-accent flex items-center justify-between">
                    <div>
                        <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Transactions Count</p>
                        <p class="text-2xl font-black text-text-main mt-1">{{ transactions.length }}</p>
                        <router-link to="/admin/accounting/reports" class="text-[11px] text-primary hover:underline mt-1 inline-flex items-center">
                            View Annual Reports <FileBarChart2 class="w-3.5 h-3.5 ml-1" />
                        </router-link>
                    </div>
                    <div class="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                        <Receipt class="w-6 h-6" />
                    </div>
                </BaseCard>
            </div>

            <!-- Filters & Actions Bar -->
            <BaseCard class="p-4 sm:p-6">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <!-- Search Input -->
                    <div class="relative flex-1 max-w-md">
                        <Search class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Search by voucher #, particulars, payee or donor..."
                            class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-border-main rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                    </div>

                    <!-- Flow Filter & Buttons -->
                    <div class="flex flex-wrap items-center gap-3">
                        <select
                            v-model="flowFilter"
                            class="px-3 py-2 bg-slate-50 border border-border-main rounded-xl text-sm text-text-main focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                            <option value="all">All Cash Flows</option>
                            <option value="income">Income (+) Only</option>
                            <option value="expense">Expenses (-) Only</option>
                        </select>

                        <select
                            v-model="categoryFilter"
                            class="px-3 py-2 bg-slate-50 border border-border-main rounded-xl text-sm text-text-main focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                            <option value="all">All Categories</option>
                            <option value="Monthly Chada">Monthly Chada</option>
                            <option value="Project Donation">Project Donation</option>
                            <option value="Medical Support">Medical Support</option>
                            <option value="Teacher Support">Teacher Support</option>
                            <option value="Educational Support">Educational Support</option>
                            <option value="Administrative Expense">Administrative Expense</option>
                            <option value="General Donation">General Donation</option>
                        </select>

                        <router-link to="/admin/accounting/reports">
                            <BaseButton variant="outline" size="sm">
                                <FileBarChart2 class="w-4 h-4 mr-1.5" />
                                Reports
                            </BaseButton>
                        </router-link>

                        <BaseButton variant="outline" size="sm" @click="exportCSV">
                            <Download class="w-4 h-4 mr-1.5" />
                            Export
                        </BaseButton>

                        <BaseButton variant="primary" size="sm" @click="isAddExpenseOpen = true">
                            <Plus class="w-4 h-4 mr-1.5" />
                            Record Expense
                        </BaseButton>
                    </div>
                </div>
            </BaseCard>

            <!-- Ledger Table -->
            <BaseCard class="overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm">
                        <thead class="bg-slate-50 border-b border-border-main text-xs uppercase text-text-muted font-semibold tracking-wider">
                            <tr>
                                <th class="px-6 py-4">Voucher / Date</th>
                                <th class="px-6 py-4">Flow Type</th>
                                <th class="px-6 py-4">Particulars & Category</th>
                                <th class="px-6 py-4">Channel / Payee</th>
                                <th class="px-6 py-4 text-right">Inflow (+)</th>
                                <th class="px-6 py-4 text-right">Outflow (-)</th>
                                <th class="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border-main">
                            <tr
                                v-for="t in filteredTransactions"
                                :key="t.id"
                                class="hover:bg-slate-50/80 transition-colors"
                            >
                                <!-- Voucher & Date -->
                                <td class="px-6 py-4">
                                    <p class="font-mono text-xs font-bold text-slate-800">{{ t.voucherNo }}</p>
                                    <p class="text-xs text-text-muted mt-0.5">{{ t.date }}</p>
                                </td>

                                <!-- Flow Type Badge -->
                                <td class="px-6 py-4">
                                    <span
                                        :class="[
                                            'inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider',
                                            t.type === 'income' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                        ]"
                                    >
                                        <ArrowDownLeft v-if="t.type === 'income'" class="w-3 h-3 mr-1" />
                                        <ArrowUpRight v-else class="w-3 h-3 mr-1" />
                                        {{ t.type }}
                                    </span>
                                </td>

                                <!-- Particulars & Category -->
                                <td class="px-6 py-4">
                                    <p class="font-semibold text-text-main text-xs">{{ t.particulars }}</p>
                                    <div class="flex items-center space-x-1.5 mt-0.5">
                                        <span class="text-[11px] text-text-muted">{{ t.category }}</span>
                                        <span v-if="t.projectTitle" class="text-[11px] text-primary font-medium">
                                            • {{ t.projectTitle }}
                                        </span>
                                    </div>
                                </td>

                                <!-- Method & Payee/Donor -->
                                <td class="px-6 py-4">
                                    <p class="text-xs font-medium text-text-main">{{ t.payeeOrDonor }}</p>
                                    <p class="text-[11px] text-text-muted">{{ t.method }}</p>
                                </td>

                                <!-- Inflow -->
                                <td class="px-6 py-4 text-right">
                                    <span v-if="t.type === 'income'" class="font-bold text-emerald-600 text-sm">
                                        +৳{{ formatNumber(t.amount) }}
                                    </span>
                                    <span v-else class="text-slate-300 font-mono text-xs">—</span>
                                </td>

                                <!-- Outflow -->
                                <td class="px-6 py-4 text-right">
                                    <span v-if="t.type === 'expense'" class="font-bold text-rose-600 text-sm">
                                        -৳{{ formatNumber(t.amount) }}
                                    </span>
                                    <span v-else class="text-slate-300 font-mono text-xs">—</span>
                                </td>

                                <!-- Action -->
                                <td class="px-6 py-4 text-right">
                                    <button
                                        @click="viewVoucherDetail(t)"
                                        class="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-100 transition-colors"
                                        title="View Voucher Details"
                                    >
                                        <FileText class="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Empty State -->
                <div v-if="filteredTransactions.length === 0" class="text-center py-12">
                    <Receipt class="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <h4 class="text-base font-bold text-text-main">No ledger entries match criteria</h4>
                    <p class="text-xs text-text-muted mt-1">Try resetting the flow or category filters.</p>
                </div>
            </BaseCard>
        </div>

        <!-- Add Expense Modal Component -->
        <AddExpenseModal
            :is-open="isAddExpenseOpen"
            @close="isAddExpenseOpen = false"
            @created="handleExpenseCreated"
        />

        <!-- Voucher Detail Modal -->
        <BaseModal
            :is-open="isVoucherModalOpen"
            title="Accounting Voucher Inspection"
            max-width="md"
            @close="isVoucherModalOpen = false"
        >
            <div v-if="selectedVoucher" class="space-y-4">
                <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                    <div class="flex justify-between py-1 border-b border-slate-200">
                        <span class="text-text-muted">Voucher Reference:</span>
                        <span class="font-mono font-bold text-primary">{{ selectedVoucher.voucherNo }}</span>
                    </div>
                    <div class="flex justify-between py-1 border-b border-slate-200">
                        <span class="text-text-muted">Transaction Type:</span>
                        <span class="font-bold uppercase" :class="selectedVoucher.type === 'income' ? 'text-emerald-600' : 'text-rose-600'">
                            {{ selectedVoucher.type }}
                        </span>
                    </div>
                    <div class="flex justify-between py-1 border-b border-slate-200">
                        <span class="text-text-muted">Date:</span>
                        <span class="font-medium text-text-main">{{ selectedVoucher.date }}</span>
                    </div>
                    <div class="flex justify-between py-1 border-b border-slate-200">
                        <span class="text-text-muted">Category:</span>
                        <span class="font-medium text-text-main">{{ selectedVoucher.category }}</span>
                    </div>
                    <div class="flex justify-between py-1 border-b border-slate-200">
                        <span class="text-text-muted">Party / Recipient:</span>
                        <span class="font-medium text-text-main">{{ selectedVoucher.payeeOrDonor }}</span>
                    </div>
                    <div class="flex justify-between py-1 border-b border-slate-200">
                        <span class="text-text-muted">Method / Trx:</span>
                        <span class="font-medium text-text-main">{{ selectedVoucher.method }}</span>
                    </div>
                    <div class="flex justify-between py-1 text-sm font-bold">
                        <span class="text-text-main">Amount:</span>
                        <span :class="selectedVoucher.type === 'income' ? 'text-emerald-600' : 'text-rose-600'">
                            ৳{{ formatNumber(selectedVoucher.amount) }}
                        </span>
                    </div>
                </div>

                <div class="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <ShieldCheck class="w-5 h-5 text-emerald-600" />
                        <div>
                            <p class="text-xs font-semibold text-text-main">Audited Voucher Document</p>
                            <p class="text-[10px] text-text-muted">Signed by Treasurer K. M. Jahangir Alam</p>
                        </div>
                    </div>
                    <BaseButton variant="outline" size="sm">
                        <Download class="w-3.5 h-3.5 mr-1" />
                        Voucher PDF
                    </BaseButton>
                </div>

                <div class="flex justify-end pt-2">
                    <BaseButton variant="outline" size="sm" @click="isVoucherModalOpen = false">
                        Close
                    </BaseButton>
                </div>
            </div>
        </BaseModal>
    </AdminLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import AddExpenseModal from './AddExpenseModal.vue';
import {
    Wallet,
    ArrowDownLeft,
    ArrowUpRight,
    Receipt,
    Search,
    Plus,
    Download,
    FileText,
    FileBarChart2,
    ShieldCheck
} from 'lucide-vue-next';

const searchQuery = ref('');
const flowFilter = ref('all');
const categoryFilter = ref('all');

const isAddExpenseOpen = ref(false);
const isVoucherModalOpen = ref(false);
const selectedVoucher = ref(null);

const transactions = ref([
    {
        id: 1,
        voucherNo: 'VCH-2026-0091',
        date: '20 Oct 2026',
        type: 'expense',
        particulars: 'ICU & Stent Procedure Advance for Master Sir',
        category: 'Medical Support',
        projectTitle: 'Emergency Heart Surgery for Master Sir',
        payeeOrDonor: 'National Heart Foundation',
        method: 'Bank Transfer (Cheque #449102)',
        amount: 120000
    },
    {
        id: 2,
        voucherNo: 'VCH-2026-0090',
        date: '20 Oct 2026',
        type: 'income',
        particulars: 'Charity Donation by Tanvir Hossain',
        category: 'Project Donation',
        projectTitle: 'Emergency Heart Surgery for Master Sir',
        payeeOrDonor: 'Tanvir Hossain (Batch 2012)',
        method: 'bKash (BK9A887120)',
        amount: 25000
    },
    {
        id: 3,
        voucherNo: 'VCH-2026-0089',
        date: '19 Oct 2026',
        type: 'income',
        particulars: 'Science Lab Equipment Grant Donation',
        category: 'Project Donation',
        projectTitle: 'High School Modern Science & Computer Lab',
        payeeOrDonor: 'Dr. Shahriar Kabir (Batch 2012)',
        method: 'Bank BEFTN (EBL-TRX-99014)',
        amount: 100000
    },
    {
        id: 4,
        voucherNo: 'VCH-2026-0088',
        date: '18 Oct 2026',
        type: 'income',
        particulars: 'October 2026 Monthly Chada Pool (Batch 2012)',
        category: 'Monthly Chada',
        projectTitle: '',
        payeeOrDonor: '32 Alumni Members',
        method: 'bKash / Nagad / Bank',
        amount: 16000
    },
    {
        id: 5,
        voucherNo: 'VCH-2026-0087',
        date: '17 Oct 2026',
        type: 'expense',
        particulars: 'Website Server Hosting & SMS Gateway Recharge',
        category: 'Administrative Expense',
        projectTitle: '',
        payeeOrDonor: 'Cloud Server Provider BD',
        method: 'Card Payment',
        amount: 4500
    },
    {
        id: 6,
        voucherNo: 'VCH-2026-0086',
        date: '16 Oct 2026',
        type: 'expense',
        particulars: 'Special Cardiac Medicines for Master Nurul Islam',
        category: 'Teacher Support',
        projectTitle: 'Emergency Heart Surgery for Master Sir',
        payeeOrDonor: 'Popular Pharmacy Dhanmondi',
        method: 'Cash Handover',
        amount: 45000
    },
    {
        id: 7,
        voucherNo: 'VCH-2026-0085',
        date: '15 Oct 2026',
        type: 'income',
        particulars: 'General Alumni Welfare Contribution',
        category: 'General Donation',
        projectTitle: '',
        payeeOrDonor: 'Fahim Ahmed',
        method: 'Cash Handover',
        amount: 10000
    }
]);

const totalInflow = computed(() => {
    return transactions.value
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
});

const totalOutflow = computed(() => {
    return transactions.value
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
});

const netTreasuryBalance = computed(() => totalInflow.value - totalOutflow.value);

const filteredTransactions = computed(() => {
    return transactions.value.filter(t => {
        const matchesSearch =
            t.voucherNo.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            t.particulars.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            t.payeeOrDonor.toLowerCase().includes(searchQuery.value.toLowerCase());

        const matchesFlow = flowFilter.value === 'all' || t.type === flowFilter.value;
        const matchesCategory = categoryFilter.value === 'all' || t.category === categoryFilter.value;

        return matchesSearch && matchesFlow && matchesCategory;
    });
});

const formatNumber = (num) => {
    return Number(num || 0).toLocaleString('en-US');
};

const handleExpenseCreated = (newExp) => {
    transactions.value.unshift({
        id: Date.now(),
        voucherNo: newExp.voucherNo,
        date: newExp.date,
        type: 'expense',
        particulars: newExp.description,
        category: newExp.category,
        projectTitle: newExp.projectId === '1' ? 'Emergency Heart Surgery for Master Sir' : (newExp.projectId === '2' ? 'High School Science & Computer Lab' : ''),
        payeeOrDonor: newExp.payee,
        method: newExp.paymentMethod,
        amount: newExp.amount
    });
};

const viewVoucherDetail = (t) => {
    selectedVoucher.value = t;
    isVoucherModalOpen.value = true;
};

const exportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
        + "VoucherNo,Date,Type,Particulars,Category,Project,PayeeOrDonor,Method,Amount\n"
        + filteredTransactions.value.map(e => 
            `"${e.voucherNo}","${e.date}","${e.type}","${e.particulars}","${e.category}","${e.projectTitle || ''}","${e.payeeOrDonor}","${e.method}","${e.amount}"`
        ).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ns12_accounting_ledger_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
</script>
