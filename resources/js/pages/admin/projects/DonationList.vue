<template>
    <AdminLayout
        title="Donation Verification & Ledger"
        subtitle="Review, audit, verify and generate official money receipts for all charity contributions"
    >
        <div class="space-y-6">
            <!-- Top Metrics Row -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <BaseCard class="p-4 sm:p-5 border-l-4 border-l-emerald-500 flex items-center justify-between">
                    <div>
                        <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Total Verified Donations</p>
                        <p class="text-2xl font-black text-emerald-600 mt-1">৳{{ formatNumber(totalVerifiedAmount) }}</p>
                        <p class="text-[11px] text-text-muted mt-1">{{ verifiedCount }} successful receipts</p>
                    </div>
                    <div class="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                        <CheckCircle2 class="w-6 h-6" />
                    </div>
                </BaseCard>

                <BaseCard class="p-4 sm:p-5 border-l-4 border-l-accent flex items-center justify-between">
                    <div>
                        <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Pending Verification</p>
                        <p class="text-2xl font-black text-accent mt-1">৳{{ formatNumber(totalPendingAmount) }}</p>
                        <p class="text-[11px] text-accent font-medium mt-1">{{ pendingCount }} payments await Trx match</p>
                    </div>
                    <div class="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                        <Clock class="w-6 h-6" />
                    </div>
                </BaseCard>

                <BaseCard class="p-4 sm:p-5 border-l-4 border-l-primary flex items-center justify-between">
                    <div>
                        <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Average Contribution</p>
                        <p class="text-2xl font-black text-text-main mt-1">৳{{ formatNumber(averageDonation) }}</p>
                        <p class="text-[11px] text-text-muted mt-1">Across {{ donations.length }} transactions</p>
                    </div>
                    <div class="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <TrendingUp class="w-6 h-6" />
                    </div>
                </BaseCard>

                <BaseCard class="p-4 sm:p-5 border-l-4 border-l-slate-400 flex items-center justify-between">
                    <div>
                        <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Active Campaigns</p>
                        <p class="text-2xl font-black text-text-main mt-1">3 Projects</p>
                        <router-link to="/admin/projects" class="text-[11px] text-primary hover:underline mt-1 inline-flex items-center">
                            Manage Campaigns <ArrowRight class="w-3 h-3 ml-1" />
                        </router-link>
                    </div>
                    <div class="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                        <HeartHandshake class="w-6 h-6" />
                    </div>
                </BaseCard>
            </div>

            <!-- Filter Controls -->
            <BaseCard class="p-4 sm:p-6">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <!-- Search Input -->
                    <div class="relative flex-1 max-w-md">
                        <Search class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Search by donor name, phone, TrxID, or receipt #..."
                            class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-border-main rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                    </div>

                    <!-- Dropdowns -->
                    <div class="flex flex-wrap items-center gap-3">
                        <select
                            v-model="statusFilter"
                            class="px-3 py-2 bg-slate-50 border border-border-main rounded-xl text-sm text-text-main focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                            <option value="all">All Statuses</option>
                            <option value="verified">Verified (Approved)</option>
                            <option value="pending">Pending Verification</option>
                            <option value="rejected">Rejected / Invalid</option>
                        </select>

                        <select
                            v-model="projectFilter"
                            class="px-3 py-2 bg-slate-50 border border-border-main rounded-xl text-sm text-text-main focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                            <option value="all">All Campaigns</option>
                            <option value="Emergency Heart Surgery">Emergency Heart Surgery</option>
                            <option value="High School Science Lab">High School Science Lab</option>
                            <option value="Winter Warmth Drive">Winter Warmth Drive</option>
                            <option value="General Alumni Fund">General Alumni Fund</option>
                        </select>

                        <select
                            v-model="channelFilter"
                            class="px-3 py-2 bg-slate-50 border border-border-main rounded-xl text-sm text-text-main focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                            <option value="all">All Payment Channels</option>
                            <option value="bKash">bKash</option>
                            <option value="Nagad">Nagad</option>
                            <option value="Bank">Bank Transfer</option>
                            <option value="Cash">Cash Handover</option>
                        </select>

                        <BaseButton variant="outline" size="sm" @click="exportCSV">
                            <Download class="w-4 h-4 mr-1.5" />
                            Export CSV
                        </BaseButton>
                    </div>
                </div>
            </BaseCard>

            <!-- Donations Table -->
            <BaseCard class="overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm">
                        <thead class="bg-slate-50 border-b border-border-main text-xs uppercase text-text-muted font-semibold tracking-wider">
                            <tr>
                                <th class="px-6 py-4">Receipt / Date</th>
                                <th class="px-6 py-4">Donor Details</th>
                                <th class="px-6 py-4">Target Campaign</th>
                                <th class="px-6 py-4">Channel & TrxID</th>
                                <th class="px-6 py-4 text-right">Amount (BDT)</th>
                                <th class="px-6 py-4">Status</th>
                                <th class="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border-main">
                            <tr
                                v-for="d in filteredDonations"
                                :key="d.id"
                                class="hover:bg-slate-50/80 transition-colors"
                            >
                                <!-- Receipt ID & Date -->
                                <td class="px-6 py-4">
                                    <p class="font-mono text-xs font-bold text-primary">{{ d.receiptNo }}</p>
                                    <p class="text-xs text-text-muted mt-0.5">{{ d.date }}</p>
                                </td>

                                <!-- Donor info -->
                                <td class="px-6 py-4">
                                    <div class="flex items-center space-x-3">
                                        <div class="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                                            {{ d.isAnonymous ? '?' : getInitials(d.donorName) }}
                                        </div>
                                        <div>
                                            <p class="font-semibold text-text-main text-xs">
                                                {{ d.isAnonymous ? 'Anonymous Alumnus' : d.donorName }}
                                                <span v-if="d.isAnonymous" class="ml-1 text-[10px] text-slate-400 italic">(Hidden publicly)</span>
                                            </p>
                                            <p class="text-[11px] text-text-muted">
                                                {{ d.phone }} <span v-if="d.batch"> • Batch '{{ d.batch }}</span>
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <!-- Campaign -->
                                <td class="px-6 py-4">
                                    <p class="font-medium text-xs text-text-main line-clamp-1">{{ d.projectTitle }}</p>
                                    <span class="text-[11px] text-text-muted capitalize">{{ d.category }}</span>
                                </td>

                                <!-- Channel & Trx -->
                                <td class="px-6 py-4">
                                    <div class="flex items-center space-x-1.5">
                                        <span
                                            :class="[
                                                'px-1.5 py-0.5 rounded text-[10px] font-bold uppercase',
                                                getChannelClass(d.channel)
                                            ]"
                                        >
                                            {{ d.channel }}
                                        </span>
                                        <span class="font-mono text-xs text-slate-700">{{ d.trxId || 'N/A' }}</span>
                                    </div>
                                </td>

                                <!-- Amount -->
                                <td class="px-6 py-4 text-right">
                                    <span class="font-black text-emerald-600 text-sm">
                                        ৳{{ formatNumber(d.amount) }}
                                    </span>
                                </td>

                                <!-- Status Badge -->
                                <td class="px-6 py-4">
                                    <BaseBadge
                                        :variant="d.status === 'verified' ? 'secondary' : d.status === 'pending' ? 'accent' : 'danger'"
                                        size="sm"
                                    >
                                        <span class="capitalize">{{ d.status }}</span>
                                    </BaseBadge>
                                </td>

                                <!-- Actions -->
                                <td class="px-6 py-4 text-right">
                                    <div class="flex items-center justify-end space-x-1.5">
                                        <button
                                            v-if="d.status === 'pending'"
                                            @click="verifyDonation(d)"
                                            class="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                                            title="Verify Payment"
                                        >
                                            <Check class="w-4 h-4" />
                                        </button>

                                        <button
                                            v-if="d.status === 'pending'"
                                            @click="rejectDonation(d)"
                                            class="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                                            title="Reject Entry"
                                        >
                                            <X class="w-4 h-4" />
                                        </button>

                                        <button
                                            @click="openReceiptModal(d)"
                                            class="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-100 transition-colors"
                                            title="View / Print Receipt"
                                        >
                                            <Printer class="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Empty State -->
                <div v-if="filteredDonations.length === 0" class="text-center py-12">
                    <Coins class="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <h4 class="text-base font-bold text-text-main">No donation records found</h4>
                    <p class="text-xs text-text-muted mt-1">Try resetting the filter criteria.</p>
                </div>
            </BaseCard>
        </div>

        <!-- Official Printable Donation Money Receipt Modal -->
        <BaseModal
            :is-open="isReceiptModalOpen"
            title="Official Charity Donation Receipt"
            max-width="lg"
            @close="isReceiptModalOpen = false"
        >
            <div v-if="selectedDonation" class="space-y-6">
                <!-- Printable Receipt Sheet Container -->
                <div id="donation-receipt-print" class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 text-slate-900 shadow-xs relative overflow-hidden">
                    <!-- Watermark background -->
                    <div class="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
                        <p class="text-7xl font-black rotate-[-25deg]">NS - 12 ALUMNI</p>
                    </div>

                    <!-- Receipt Header -->
                    <div class="text-center pb-5 border-b-2 border-slate-800">
                        <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-white font-black text-xl mb-2">
                            NS
                        </div>
                        <h2 class="text-lg font-black tracking-tight text-slate-900 uppercase">
                            Alumni Association of NS - 12
                        </h2>
                        <p class="text-xs text-slate-600 font-medium">Nawabpur, Dhaka - 1100 • Charity & Welfare Fund</p>
                        <div class="inline-block mt-2 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
                            Official Donation Money Receipt
                        </div>
                    </div>

                    <!-- Receipt Metadata Row -->
                    <div class="grid grid-cols-2 gap-4 py-4 border-b border-dashed border-slate-300 text-xs">
                        <div>
                            <span class="text-slate-500 block">Receipt Serial:</span>
                            <span class="font-mono font-bold text-slate-900 text-sm">{{ selectedDonation.receiptNo }}</span>
                        </div>
                        <div class="text-right">
                            <span class="text-slate-500 block">Date of Deposit:</span>
                            <span class="font-semibold text-slate-900">{{ selectedDonation.date }}</span>
                        </div>
                    </div>

                    <!-- Donor & Contribution Particulars -->
                    <div class="py-4 space-y-3 text-xs">
                        <div class="flex justify-between items-center py-1">
                            <span class="text-slate-500">Received With Thanks From:</span>
                            <span class="font-bold text-sm text-slate-900">{{ selectedDonation.donorName }}</span>
                        </div>
                        <div class="flex justify-between items-center py-1">
                            <span class="text-slate-500">Alumni Batch / Contact:</span>
                            <span class="font-medium text-slate-800">{{ selectedDonation.phone }} (Batch '{{ selectedDonation.batch || 'Guest' }})</span>
                        </div>
                        <div class="flex justify-between items-center py-1">
                            <span class="text-slate-500">Target Welfare Project:</span>
                            <span class="font-semibold text-primary">{{ selectedDonation.projectTitle }}</span>
                        </div>
                        <div class="flex justify-between items-center py-1">
                            <span class="text-slate-500">Payment Gateway / Method:</span>
                            <span class="font-medium text-slate-800">{{ selectedDonation.channel }} (Trx: {{ selectedDonation.trxId || 'Direct Cash' }})</span>
                        </div>
                    </div>

                    <!-- Amount Highlight Box -->
                    <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between my-2">
                        <div>
                            <p class="text-[11px] text-slate-500 font-medium uppercase">Total Amount Received</p>
                            <p class="text-xs italic text-slate-600 mt-0.5">({{ amountInWords(selectedDonation.amount) }})</p>
                        </div>
                        <div class="text-right">
                            <span class="text-2xl font-black text-emerald-600">৳{{ formatNumber(selectedDonation.amount) }}</span>
                        </div>
                    </div>

                    <!-- Signatures / Stamps -->
                    <div class="pt-8 grid grid-cols-2 gap-8 text-center text-xs">
                        <div>
                            <div class="w-24 h-12 mx-auto flex items-center justify-center border-2 border-emerald-600/40 rounded-lg text-emerald-700 text-[10px] font-bold uppercase rotate-[-5deg]">
                                Verified & Banked
                            </div>
                            <div class="border-t border-slate-400 mt-2 pt-1 font-semibold text-slate-700">
                                Official Seal / Stamp
                            </div>
                        </div>
                        <div>
                            <div class="h-12 flex items-end justify-center font-serif italic text-primary font-bold">
                                K. M. Jahangir Alam
                            </div>
                            <div class="border-t border-slate-400 mt-2 pt-1 font-semibold text-slate-700">
                                Treasurer / Authorised Signatory
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal Actions -->
                <div class="flex items-center justify-between">
                    <p class="text-xs text-text-muted">Digital receipt generated under NS-12 Finance Bye-laws.</p>
                    <div class="flex items-center space-x-2">
                        <BaseButton variant="outline" size="sm" @click="isReceiptModalOpen = false">
                            Close
                        </BaseButton>
                        <BaseButton variant="primary" size="sm" @click="printReceipt">
                            <Printer class="w-4 h-4 mr-1.5" />
                            Print Money Receipt
                        </BaseButton>
                    </div>
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
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import {
    CheckCircle2,
    Clock,
    TrendingUp,
    HeartHandshake,
    ArrowRight,
    Search,
    Download,
    Check,
    X,
    Printer,
    Coins
} from 'lucide-vue-next';

const searchQuery = ref('');
const statusFilter = ref('all');
const projectFilter = ref('all');
const channelFilter = ref('all');

const isReceiptModalOpen = ref(false);
const selectedDonation = ref(null);

const donations = ref([
    {
        id: 1,
        receiptNo: 'DON-2026-0812',
        date: '20 Oct 2026, 04:30 PM',
        donorName: 'Tanvir Hossain',
        phone: '01711-223344',
        batch: '2012',
        projectTitle: 'Emergency Heart Surgery for Master Sir',
        category: 'Teacher Support',
        channel: 'bKash',
        trxId: 'BK9A887120',
        amount: 25000,
        status: 'verified',
        isAnonymous: false
    },
    {
        id: 2,
        receiptNo: 'DON-2026-0813',
        date: '20 Oct 2026, 01:15 PM',
        donorName: 'Anonymous Alumnus',
        phone: '01819-998877',
        batch: '2012',
        projectTitle: 'Emergency Heart Surgery for Master Sir',
        category: 'Teacher Support',
        channel: 'Nagad',
        trxId: 'NG66120931',
        amount: 50000,
        status: 'pending',
        isAnonymous: true
    },
    {
        id: 3,
        receiptNo: 'DON-2026-0814',
        date: '19 Oct 2026, 11:20 AM',
        donorName: 'Dr. Shahriar Kabir',
        phone: '01912-334455',
        batch: '2012',
        projectTitle: 'High School Modern Science & Computer Lab Upgrade',
        category: 'Educational Support',
        channel: 'Bank',
        trxId: 'EBL-TRX-99014',
        amount: 100000,
        status: 'verified',
        isAnonymous: false
    },
    {
        id: 4,
        receiptNo: 'DON-2026-0815',
        date: '18 Oct 2026, 06:45 PM',
        donorName: 'Mehedi Hasan',
        phone: '01678-112233',
        batch: '2012',
        projectTitle: 'Emergency Heart Surgery for Master Sir',
        category: 'Teacher Support',
        channel: 'bKash',
        trxId: 'BK77881920',
        amount: 5000,
        status: 'verified',
        isAnonymous: false
    },
    {
        id: 5,
        receiptNo: 'DON-2026-0816',
        date: '18 Oct 2026, 03:00 PM',
        donorName: 'Fahim Ahmed',
        phone: '01715-445566',
        batch: '2012',
        projectTitle: 'General Alumni Fund',
        category: 'Welfare',
        channel: 'Cash',
        trxId: '',
        amount: 10000,
        status: 'pending',
        isAnonymous: false
    },
    {
        id: 6,
        receiptNo: 'DON-2026-0817',
        date: '17 Oct 2026, 09:10 AM',
        donorName: 'Asifur Rahman',
        phone: '01552-667788',
        batch: '2012',
        projectTitle: 'Emergency Heart Surgery for Master Sir',
        category: 'Teacher Support',
        channel: 'bKash',
        trxId: 'INVALID-TRX-00',
        amount: 2000,
        status: 'rejected',
        isAnonymous: false
    }
]);

const verifiedDonations = computed(() => donations.value.filter(d => d.status === 'verified'));
const verifiedCount = computed(() => verifiedDonations.value.length);
const totalVerifiedAmount = computed(() => verifiedDonations.value.reduce((acc, d) => acc + d.amount, 0));

const pendingDonations = computed(() => donations.value.filter(d => d.status === 'pending'));
const pendingCount = computed(() => pendingDonations.value.length);
const totalPendingAmount = computed(() => pendingDonations.value.reduce((acc, d) => acc + d.amount, 0));

const averageDonation = computed(() => {
    if (!donations.value.length) return 0;
    const total = donations.value.reduce((acc, d) => acc + d.amount, 0);
    return Math.round(total / donations.value.length);
});

const filteredDonations = computed(() => {
    return donations.value.filter(d => {
        const matchesSearch =
            d.donorName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            d.phone.includes(searchQuery.value) ||
            d.receiptNo.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            (d.trxId && d.trxId.toLowerCase().includes(searchQuery.value.toLowerCase()));

        const matchesStatus = statusFilter.value === 'all' || d.status === statusFilter.value;
        const matchesProject = projectFilter.value === 'all' || d.projectTitle.includes(projectFilter.value);
        const matchesChannel = channelFilter.value === 'all' || d.channel === channelFilter.value;

        return matchesSearch && matchesStatus && matchesProject && matchesChannel;
    });
});

const formatNumber = (num) => {
    return Number(num || 0).toLocaleString('en-US');
};

const getInitials = (name) => {
    if (!name) return 'NS';
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
};

const getChannelClass = (ch) => {
    switch (ch) {
        case 'bKash': return 'bg-pink-100 text-pink-700';
        case 'Nagad': return 'bg-orange-100 text-orange-700';
        case 'Bank': return 'bg-blue-100 text-blue-700';
        case 'Cash': return 'bg-emerald-100 text-emerald-700';
        default: return 'bg-slate-100 text-slate-700';
    }
};

const verifyDonation = (d) => {
    d.status = 'verified';
};

const rejectDonation = (d) => {
    d.status = 'rejected';
};

const openReceiptModal = (d) => {
    selectedDonation.value = d;
    isReceiptModalOpen.value = true;
};

const printReceipt = () => {
    window.print();
};

const exportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
        + "ReceiptNo,Date,Donor,Phone,Project,Channel,TrxID,Amount,Status\n"
        + filteredDonations.value.map(e => 
            `"${e.receiptNo}","${e.date}","${e.donorName}","${e.phone}","${e.projectTitle}","${e.channel}","${e.trxId}","${e.amount}","${e.status}"`
        ).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ns12_donations_audit_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const amountInWords = (amount) => {
    if (amount >= 100000) return 'One Lakh BDT Only';
    if (amount >= 50000) return 'Fifty Thousand BDT Only';
    if (amount >= 25000) return 'Twenty Five Thousand BDT Only';
    if (amount >= 10000) return 'Ten Thousand BDT Only';
    if (amount >= 5000) return 'Five Thousand BDT Only';
    return `${amount} BDT Only`;
};
</script>
