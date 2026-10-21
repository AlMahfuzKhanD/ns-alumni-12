<template>
    <AdminLayout
        title="Financial Statements & Transparency Reports"
        subtitle="Audited financial statements, project-wise disbursements, and AGM cash flow reports"
    >
        <div class="space-y-6">
            <!-- Report Controls Toolbar -->
            <BaseCard class="p-4 sm:p-6 print:hidden">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div class="flex items-center space-x-3">
                        <router-link to="/admin/accounting">
                            <BaseButton variant="outline" size="sm">
                                <ArrowLeft class="w-4 h-4 mr-1.5" />
                                Back to Ledger
                            </BaseButton>
                        </router-link>

                        <div>
                            <p class="text-xs font-semibold text-text-main">Fiscal Audit Period</p>
                            <div class="flex items-center space-x-2 mt-0.5">
                                <select
                                    v-model="selectedFiscalYear"
                                    class="px-2.5 py-1.5 bg-slate-50 border border-border-main rounded-lg text-xs font-medium text-text-main focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                >
                                    <option value="2026-2027">FY 2026–2027 (Current)</option>
                                    <option value="2025-2026">FY 2025–2026 (Audited)</option>
                                    <option value="2024-2025">FY 2024–2025 (Historical)</option>
                                </select>
                                <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">
                                    VERIFIED
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center space-x-2">
                        <BaseButton variant="outline" size="sm" @click="exportCSV">
                            <Download class="w-4 h-4 mr-1.5" />
                            Export CSV
                        </BaseButton>
                        <BaseButton variant="primary" size="sm" @click="printReport">
                            <Printer class="w-4 h-4 mr-1.5" />
                            Print Formal Statement
                        </BaseButton>
                    </div>
                </div>
            </BaseCard>

            <!-- Printable Financial Statement Container -->
            <div id="financial-statement-sheet" class="bg-white p-6 sm:p-10 rounded-2xl border border-border-main shadow-xs space-y-8">
                <!-- Formal Header for Print & Audit -->
                <div class="border-b-2 border-slate-900 pb-6 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
                    <div>
                        <div class="flex items-center space-x-3 justify-center sm:justify-start">
                            <div class="w-10 h-10 rounded-xl bg-primary text-white font-black text-xl flex items-center justify-center">
                                NS
                            </div>
                            <div>
                                <h2 class="text-xl font-black text-slate-900 tracking-tight uppercase">
                                    Alumni Association of NS - 12
                                </h2>
                                <p class="text-xs text-slate-600 font-medium">Nawabpur, Dhaka - 1100 • Registration # NS12-ALM-REG</p>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4 sm:mt-0 text-center sm:text-right">
                        <span class="inline-block px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-bold uppercase tracking-wider">
                            Annual Financial Statement
                        </span>
                        <p class="text-xs text-slate-500 mt-1">Period: July 01, 2026 – June 30, 2027</p>
                    </div>
                </div>

                <!-- High Level Figures Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <p class="text-xs text-slate-500 uppercase font-semibold">Total Revenue / Inflow</p>
                        <p class="text-xl font-black text-emerald-600 mt-1">৳{{ formatNumber(totalInflow) }}</p>
                        <p class="text-[10px] text-slate-500 mt-0.5">Chada + Project Donations</p>
                    </div>

                    <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <p class="text-xs text-slate-500 uppercase font-semibold">Total Outflow / Aid</p>
                        <p class="text-xl font-black text-rose-600 mt-1">৳{{ formatNumber(totalOutflow) }}</p>
                        <p class="text-[10px] text-slate-500 mt-0.5">Disbursements & Operations</p>
                    </div>

                    <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <p class="text-xs text-slate-500 uppercase font-semibold">Net Operating Surplus</p>
                        <p class="text-xl font-black text-primary mt-1">৳{{ formatNumber(totalInflow - totalOutflow) }}</p>
                        <p class="text-[10px] text-emerald-600 font-medium mt-0.5">+44.2% retained margin</p>
                    </div>

                    <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <p class="text-xs text-slate-500 uppercase font-semibold">Reserve Fund Ratio</p>
                        <p class="text-xl font-black text-slate-800 mt-1">98.4%</p>
                        <p class="text-[10px] text-slate-500 mt-0.5">Fully solvent & liquid</p>
                    </div>
                </div>

                <!-- Section 1: Project-by-Project Aid Balance Sheet -->
                <div>
                    <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center">
                        <HeartHandshake class="w-4 h-4 text-primary mr-2" />
                        1. Charity & Aid Project Accounts
                    </h3>
                    <div class="border border-slate-200 rounded-xl overflow-hidden">
                        <table class="w-full text-xs text-left">
                            <thead class="bg-slate-100 text-slate-700 uppercase text-[10px] font-bold">
                                <tr>
                                    <th class="px-4 py-3">Campaign Title</th>
                                    <th class="px-4 py-3">Category</th>
                                    <th class="px-4 py-3 text-right">Target</th>
                                    <th class="px-4 py-3 text-right">Collected</th>
                                    <th class="px-4 py-3 text-right">Disbursed</th>
                                    <th class="px-4 py-3 text-right">Balance</th>
                                    <th class="px-4 py-3 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-200 text-slate-800">
                                <tr v-for="p in projectAccounts" :key="p.id" class="hover:bg-slate-50/50">
                                    <td class="px-4 py-3 font-semibold text-slate-900">{{ p.title }}</td>
                                    <td class="px-4 py-3 text-slate-600">{{ p.category }}</td>
                                    <td class="px-4 py-3 text-right font-medium">৳{{ formatNumber(p.target) }}</td>
                                    <td class="px-4 py-3 text-right font-bold text-emerald-600">৳{{ formatNumber(p.collected) }}</td>
                                    <td class="px-4 py-3 text-right font-bold text-rose-600">৳{{ formatNumber(p.disbursed) }}</td>
                                    <td class="px-4 py-3 text-right font-bold text-primary">৳{{ formatNumber(p.collected - p.disbursed) }}</td>
                                    <td class="px-4 py-3 text-center">
                                        <span
                                            :class="[
                                                'px-2 py-0.5 rounded text-[10px] font-bold uppercase',
                                                p.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                                            ]"
                                        >
                                            {{ p.status }}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot class="bg-slate-100 font-bold text-slate-900">
                                <tr>
                                    <td colspan="2" class="px-4 py-3 text-right uppercase">Subtotal Charity Projects:</td>
                                    <td class="px-4 py-3 text-right">৳{{ formatNumber(totalProjectTarget) }}</td>
                                    <td class="px-4 py-3 text-right text-emerald-700">৳{{ formatNumber(totalProjectCollected) }}</td>
                                    <td class="px-4 py-3 text-right text-rose-700">৳{{ formatNumber(totalProjectDisbursed) }}</td>
                                    <td class="px-4 py-3 text-right text-primary">৳{{ formatNumber(totalProjectCollected - totalProjectDisbursed) }}</td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                <!-- Section 2: Monthly Cash Flow Breakdown -->
                <div>
                    <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center">
                        <TrendingUp class="w-4 h-4 text-emerald-600 mr-2" />
                        2. Monthly Cash Flow Statement (FY 2026)
                    </h3>
                    <div class="border border-slate-200 rounded-xl overflow-hidden">
                        <table class="w-full text-xs text-left">
                            <thead class="bg-slate-100 text-slate-700 uppercase text-[10px] font-bold">
                                <tr>
                                    <th class="px-4 py-3">Month</th>
                                    <th class="px-4 py-3 text-right">Chada Inflow</th>
                                    <th class="px-4 py-3 text-right">Donation Inflow</th>
                                    <th class="px-4 py-3 text-right">Total Inflow</th>
                                    <th class="px-4 py-3 text-right">Aid Disbursed</th>
                                    <th class="px-4 py-3 text-right">Admin Expense</th>
                                    <th class="px-4 py-3 text-right">Net Flow</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-200 text-slate-800">
                                <tr v-for="m in monthlyCashFlow" :key="m.month" class="hover:bg-slate-50/50">
                                    <td class="px-4 py-3 font-semibold">{{ m.month }}</td>
                                    <td class="px-4 py-3 text-right text-slate-600">৳{{ formatNumber(m.chada) }}</td>
                                    <td class="px-4 py-3 text-right text-slate-600">৳{{ formatNumber(m.donations) }}</td>
                                    <td class="px-4 py-3 text-right font-bold text-emerald-600">৳{{ formatNumber(m.chada + m.donations) }}</td>
                                    <td class="px-4 py-3 text-right text-rose-600">৳{{ formatNumber(m.aidDisbursed) }}</td>
                                    <td class="px-4 py-3 text-right text-rose-600">৳{{ formatNumber(m.admin) }}</td>
                                    <td class="px-4 py-3 text-right font-black" :class="(m.chada + m.donations - m.aidDisbursed - m.admin) >= 0 ? 'text-primary' : 'text-rose-600'">
                                        ৳{{ formatNumber(m.chada + m.donations - m.aidDisbursed - m.admin) }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Section 3: Expense Categories Distribution -->
                <div>
                    <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center">
                        <PieChart class="w-4 h-4 text-accent mr-2" />
                        3. Expense Category Distribution
                    </h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div
                            v-for="cat in expenseCategories"
                            :key="cat.name"
                            class="p-4 rounded-xl border border-slate-200 bg-slate-50/60"
                        >
                            <div class="flex items-center justify-between text-xs mb-1.5">
                                <span class="font-bold text-slate-900">{{ cat.name }}</span>
                                <span class="font-bold text-slate-700">৳{{ formatNumber(cat.amount) }} ({{ cat.percentage }}%)</span>
                            </div>
                            <div class="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                                <div
                                    class="h-full rounded-full transition-all"
                                    :class="cat.colorClass"
                                    :style="{ width: `${cat.percentage}%` }"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Formal Audit Signatures Block -->
                <div class="pt-8 border-t-2 border-slate-300 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-xs">
                    <div>
                        <div class="h-10 flex items-end justify-center font-serif italic text-slate-800 font-bold">
                            K. M. Jahangir Alam
                        </div>
                        <div class="border-t border-slate-400 mt-2 pt-1 font-semibold text-slate-700">
                            Treasurer, NS - 12
                        </div>
                    </div>

                    <div>
                        <div class="h-10 flex items-end justify-center font-serif italic text-slate-800 font-bold">
                            Md. Rafiqul Hasan
                        </div>
                        <div class="border-t border-slate-400 mt-2 pt-1 font-semibold text-slate-700">
                            General Secretary, NS - 12
                        </div>
                    </div>

                    <div>
                        <div class="h-10 flex items-end justify-center font-serif italic text-slate-800 font-bold">
                            Engr. Farhan Tanvir
                        </div>
                        <div class="border-t border-slate-400 mt-2 pt-1 font-semibold text-slate-700">
                            President / Convener, NS - 12
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import {
    ArrowLeft,
    Download,
    Printer,
    HeartHandshake,
    TrendingUp,
    PieChart
} from 'lucide-vue-next';

const selectedFiscalYear = ref('2026-2027');

const projectAccounts = ref([
    { id: 1, title: 'Emergency Heart Surgery for Master Nurul Islam', category: 'Teacher Support', target: 500000, collected: 345000, disbursed: 180000, status: 'Active' },
    { id: 2, title: 'High School Modern Science & Computer Lab Upgrade', category: 'Educational Support', target: 350000, collected: 185000, disbursed: 55000, status: 'Active' },
    { id: 3, title: 'Winter Warmth & Blanket Distribution Drive', category: 'Emergency Relief', target: 150000, collected: 150000, disbursed: 148500, status: 'Completed' },
    { id: 4, title: 'Rehabilitation Support for Alumnus Tariqul Islam', category: 'Medical Support', target: 200000, collected: 75000, disbursed: 30000, status: 'Active' }
]);

const monthlyCashFlow = ref([
    { month: 'July 2026', chada: 45000, donations: 80000, aidDisbursed: 60000, admin: 3500 },
    { month: 'August 2026', chada: 52000, donations: 110000, aidDisbursed: 75000, admin: 4200 },
    { month: 'September 2026', chada: 48000, donations: 165000, aidDisbursed: 120000, admin: 5000 },
    { month: 'October 2026 (MTD)', chada: 58000, donations: 215000, aidDisbursed: 158500, admin: 4800 }
]);

const expenseCategories = ref([
    { name: 'Teacher & Medical Support', amount: 255000, percentage: 61, colorClass: 'bg-rose-500' },
    { name: 'Educational & Lab Infrastructure', amount: 55000, percentage: 13, colorClass: 'bg-primary' },
    { name: 'Winter Relief & Humanitarian Aid', amount: 148500, percentage: 22, colorClass: 'bg-emerald-500' },
    { name: 'Administrative, Server & SMS', amount: 17500, percentage: 4, colorClass: 'bg-slate-500' }
]);

const totalProjectTarget = computed(() => projectAccounts.value.reduce((acc, p) => acc + p.target, 0));
const totalProjectCollected = computed(() => projectAccounts.value.reduce((acc, p) => acc + p.collected, 0));
const totalProjectDisbursed = computed(() => projectAccounts.value.reduce((acc, p) => acc + p.disbursed, 0));

const totalInflow = computed(() => {
    return monthlyCashFlow.value.reduce((sum, m) => sum + m.chada + m.donations, 0);
});

const totalOutflow = computed(() => {
    return monthlyCashFlow.value.reduce((sum, m) => sum + m.aidDisbursed + m.admin, 0);
});

const formatNumber = (num) => {
    return Number(num || 0).toLocaleString('en-US');
};

const printReport = () => {
    window.print();
};

const exportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Project,Category,Target,Collected,Disbursed,Balance,Status\n"
        + projectAccounts.value.map(p => 
            `"${p.title}","${p.category}","${p.target}","${p.collected}","${p.disbursed}","${p.collected - p.disbursed}","${p.status}"`
        ).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ns12_financial_report_${selectedFiscalYear.value}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
</script>
