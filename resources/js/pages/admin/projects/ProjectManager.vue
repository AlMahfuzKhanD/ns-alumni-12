<template>
    <AdminLayout
        title="Charity & Aid Projects"
        subtitle="Manage fundraising campaigns, beneficiary verification, and disbursement transparency"
    >
        <div class="space-y-6">
            <!-- Top Metrics Row -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <BaseCard class="p-4 sm:p-5 border-l-4 border-l-primary flex items-center justify-between">
                    <div>
                        <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Active Campaigns</p>
                        <p class="text-2xl font-black text-text-main mt-1">{{ activeProjectsCount }}</p>
                        <p class="text-[11px] text-emerald-600 mt-1 font-medium flex items-center">
                            <span class="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                            Live for public donations
                        </p>
                    </div>
                    <div class="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <HeartHandshake class="w-6 h-6" />
                    </div>
                </BaseCard>

                <BaseCard class="p-4 sm:p-5 border-l-4 border-l-secondary flex items-center justify-between">
                    <div>
                        <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Total Target Fund</p>
                        <p class="text-2xl font-black text-text-main mt-1">৳{{ formatNumber(totalTargetAmount) }}</p>
                        <p class="text-[11px] text-text-muted mt-1">Across {{ projects.length }} campaigns</p>
                    </div>
                    <div class="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                        <Target class="w-6 h-6" />
                    </div>
                </BaseCard>

                <BaseCard class="p-4 sm:p-5 border-l-4 border-l-emerald-500 flex items-center justify-between">
                    <div>
                        <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Total Raised</p>
                        <p class="text-2xl font-black text-emerald-600 mt-1">৳{{ formatNumber(totalRaisedAmount) }}</p>
                        <p class="text-[11px] text-emerald-600 font-medium mt-1">
                            {{ Math.round((totalRaisedAmount / totalTargetAmount) * 100) }}% overall progress
                        </p>
                    </div>
                    <div class="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                        <TrendingUp class="w-6 h-6" />
                    </div>
                </BaseCard>

                <BaseCard class="p-4 sm:p-5 border-l-4 border-l-accent flex items-center justify-between">
                    <div>
                        <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Beneficiaries Assisted</p>
                        <p class="text-2xl font-black text-text-main mt-1">14</p>
                        <p class="text-[11px] text-text-muted mt-1">Teachers, alumni & families</p>
                    </div>
                    <div class="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                        <Users class="w-6 h-6" />
                    </div>
                </BaseCard>
            </div>

            <!-- Header Action Controls & Filters -->
            <BaseCard class="p-4 sm:p-6">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <!-- Search Input -->
                    <div class="relative flex-1 max-w-md">
                        <Search class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Search campaign, beneficiary, or hospital..."
                            class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-border-main rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                    </div>

                    <!-- Filter Dropdowns & Create Button -->
                    <div class="flex flex-wrap items-center gap-3">
                        <select
                            v-model="statusFilter"
                            class="px-3 py-2 bg-slate-50 border border-border-main rounded-xl text-sm text-text-main focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                            <option value="all">All Statuses</option>
                            <option value="active">Active (Ongoing)</option>
                            <option value="completed">Completed</option>
                            <option value="paused">Paused</option>
                            <option value="draft">Draft</option>
                        </select>

                        <select
                            v-model="categoryFilter"
                            class="px-3 py-2 bg-slate-50 border border-border-main rounded-xl text-sm text-text-main focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                            <option value="all">All Categories</option>
                            <option value="Medical Support">Medical Support</option>
                            <option value="Teacher Support">Teacher Support</option>
                            <option value="Emergency Relief">Emergency Relief</option>
                            <option value="Educational Support">Educational Support</option>
                        </select>

                        <router-link to="/admin/donations">
                            <BaseButton variant="outline" size="sm">
                                <Coins class="w-4 h-4 mr-1.5" />
                                All Donations
                            </BaseButton>
                        </router-link>

                        <BaseButton variant="primary" size="sm" @click="openCreateModal">
                            <Plus class="w-4 h-4 mr-1.5" />
                            New Campaign
                        </BaseButton>
                    </div>
                </div>
            </BaseCard>

            <!-- Projects Grid / List -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BaseCard
                    v-for="proj in filteredProjects"
                    :key="proj.id"
                    class="overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-colors"
                >
                    <div>
                        <!-- Card Top Header -->
                        <div class="p-5 border-b border-border-main flex items-start justify-between gap-3 bg-slate-50/60">
                            <div class="space-y-1">
                                <div class="flex items-center gap-2 flex-wrap">
                                    <BaseBadge
                                        :variant="getCategoryBadgeVariant(proj.category)"
                                        size="sm"
                                    >
                                        {{ proj.category }}
                                    </BaseBadge>
                                    <BaseBadge
                                        :variant="getStatusBadgeVariant(proj.status)"
                                        size="sm"
                                    >
                                        <span class="capitalize">{{ proj.status }}</span>
                                    </BaseBadge>
                                    <span v-if="proj.isEmergency" class="px-2 py-0.5 rounded text-[11px] font-bold bg-danger/10 text-danger animate-pulse">
                                        URGENT
                                    </span>
                                </div>
                                <h3 class="font-bold text-base text-text-main hover:text-primary transition-colors">
                                    {{ proj.title }}
                                </h3>
                            </div>

                            <!-- Action dropdown / icon -->
                            <div class="flex items-center space-x-1 shrink-0">
                                <button
                                    @click="editProject(proj)"
                                    class="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-slate-100 transition-colors"
                                    title="Edit Campaign"
                                >
                                    <Edit3 class="w-4 h-4" />
                                </button>
                                <router-link
                                    :to="`/projects/${proj.slug}`"
                                    target="_blank"
                                    class="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-slate-100 transition-colors"
                                    title="View Public Page"
                                >
                                    <ExternalLink class="w-4 h-4" />
                                </router-link>
                            </div>
                        </div>

                        <!-- Card Body -->
                        <div class="p-5 space-y-4">
                            <!-- Beneficiary Info Box -->
                            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                                <div class="flex items-center space-x-3">
                                    <div class="w-9 h-9 rounded-lg bg-primary-light text-primary flex items-center justify-center font-bold text-xs">
                                        {{ getInitials(proj.beneficiaryName) }}
                                    </div>
                                    <div>
                                        <p class="text-xs font-semibold text-text-main flex items-center">
                                            {{ proj.beneficiaryName }}
                                            <span class="ml-1.5 px-1.5 py-0.2 rounded text-[10px] bg-slate-200 text-slate-700">
                                                {{ proj.beneficiaryType }}
                                            </span>
                                        </p>
                                        <p class="text-[11px] text-text-muted">
                                            {{ proj.hospitalOrInstitution || 'Direct Beneficiary' }}
                                        </p>
                                    </div>
                                </div>
                                
                                <button
                                    v-if="proj.medicalProofAvailable"
                                    @click="viewProof(proj)"
                                    class="text-xs text-primary font-medium hover:underline flex items-center"
                                >
                                    <FileCheck class="w-3.5 h-3.5 mr-1" />
                                    Proof (Verified)
                                </button>
                            </div>

                            <!-- Progress & Funds -->
                            <div>
                                <div class="flex items-center justify-between text-xs mb-1.5">
                                    <span class="font-bold text-text-main">
                                        ৳{{ formatNumber(proj.raisedAmount) }}
                                        <span class="text-text-muted font-normal">raised of ৳{{ formatNumber(proj.targetAmount) }}</span>
                                    </span>
                                    <span class="font-black text-primary">
                                        {{ Math.min(100, Math.round((proj.raisedAmount / proj.targetAmount) * 100)) }}%
                                    </span>
                                </div>
                                <div class="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                                    <div
                                        class="h-full bg-primary rounded-full transition-all duration-500"
                                        :style="{ width: `${Math.min(100, (proj.raisedAmount / proj.targetAmount) * 100)}%` }"
                                    ></div>
                                </div>
                            </div>

                            <!-- Stats & Dates Footer info -->
                            <div class="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-[11px] text-text-muted">
                                <div>
                                    <p class="text-slate-400">Total Donors</p>
                                    <p class="font-bold text-text-main text-xs mt-0.5">{{ proj.donorCount }} alumni</p>
                                </div>
                                <div>
                                    <p class="text-slate-400">Disbursed / Spent</p>
                                    <p class="font-bold text-rose-600 text-xs mt-0.5">৳{{ formatNumber(proj.spentAmount) }}</p>
                                </div>
                                <div>
                                    <p class="text-slate-400">Deadline</p>
                                    <p class="font-bold text-text-main text-xs mt-0.5">{{ proj.deadline || 'Ongoing' }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Card Actions Footer -->
                    <div class="px-5 py-3.5 bg-slate-50/80 border-t border-border-main flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                            <span class="text-xs text-text-muted">Net In Hand:</span>
                            <span class="text-xs font-bold text-emerald-600">
                                ৳{{ formatNumber(proj.raisedAmount - proj.spentAmount) }}
                            </span>
                        </div>

                        <div class="flex items-center space-x-2">
                            <BaseButton
                                variant="outline"
                                size="sm"
                                @click="openExpenseModal(proj)"
                            >
                                <Receipt class="w-3.5 h-3.5 mr-1" />
                                Expenses ({{ proj.expenseCount || 0 }})
                            </BaseButton>

                            <BaseButton
                                v-if="proj.status === 'active'"
                                variant="secondary"
                                size="sm"
                                @click="toggleStatus(proj, 'completed')"
                            >
                                <CheckCircle2 class="w-3.5 h-3.5 mr-1" />
                                Mark Complete
                            </BaseButton>

                            <BaseButton
                                v-else-if="proj.status === 'completed'"
                                variant="outline"
                                size="sm"
                                @click="toggleStatus(proj, 'active')"
                            >
                                Re-open
                            </BaseButton>
                        </div>
                    </div>
                </BaseCard>
            </div>

            <!-- Empty State -->
            <div v-if="filteredProjects.length === 0" class="text-center py-12 bg-white rounded-2xl border border-dashed border-border-main">
                <HeartHandshake class="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 class="text-base font-bold text-text-main">No charity campaigns found</h4>
                <p class="text-xs text-text-muted mt-1 max-w-sm mx-auto">
                    Try adjusting your search query or filter settings, or launch a new campaign.
                </p>
            </div>
        </div>

        <!-- Create / Edit Campaign Modal -->
        <BaseModal
            :is-open="isModalOpen"
            :title="isEditing ? 'Edit Charity Campaign' : 'Create New Charity Campaign'"
            max-width="2xl"
            @close="isModalOpen = false"
        >
            <form @submit.prevent="saveProject" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="sm:col-span-2">
                        <label class="block text-xs font-semibold text-text-main mb-1">
                            Campaign Title <span class="text-danger">*</span>
                        </label>
                        <BaseInput
                            v-model="form.title"
                            placeholder="e.g., Emergency Medical Aid for Master Sir"
                            required
                        />
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-text-main mb-1">
                            Campaign Category <span class="text-danger">*</span>
                        </label>
                        <BaseSelect v-model="form.category" required>
                            <option value="Medical Support">Medical Support</option>
                            <option value="Teacher Support">Teacher Support</option>
                            <option value="Emergency Relief">Emergency Relief</option>
                            <option value="Educational Support">Educational Support</option>
                            <option value="Special Fundraising">Special Fundraising</option>
                        </BaseSelect>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-text-main mb-1">
                            Target Amount (BDT) <span class="text-danger">*</span>
                        </label>
                        <BaseInput
                            v-model.number="form.targetAmount"
                            type="number"
                            min="1000"
                            step="500"
                            placeholder="500000"
                            required
                        />
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-text-main mb-1">
                            Beneficiary Name <span class="text-danger">*</span>
                        </label>
                        <BaseInput
                            v-model="form.beneficiaryName"
                            placeholder="e.g. Master Nurul Islam"
                            required
                        />
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-text-main mb-1">
                            Beneficiary Category <span class="text-danger">*</span>
                        </label>
                        <BaseSelect v-model="form.beneficiaryType" required>
                            <option value="Teacher">Teacher / Retired Faculty</option>
                            <option value="Member">NS-12 Batch Alumnus</option>
                            <option value="Alumni Family">Alumni Immediate Family</option>
                            <option value="Non-Member">Deserving Community Individual</option>
                            <option value="Institution">School / Institution</option>
                        </BaseSelect>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-text-main mb-1">
                            Hospital / Treatment Institute
                        </label>
                        <BaseInput
                            v-model="form.hospitalOrInstitution"
                            placeholder="e.g., National Heart Foundation, Dhaka"
                        />
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-text-main mb-1">
                            Campaign Deadline
                        </label>
                        <BaseInput
                            v-model="form.deadline"
                            type="date"
                        />
                    </div>

                    <div class="sm:col-span-2">
                        <label class="block text-xs font-semibold text-text-main mb-1">
                            Medical Proof / Supporting Vouchers
                        </label>
                        <div class="border-2 border-dashed border-border-main rounded-xl p-4 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                            <UploadCloud class="w-6 h-6 text-slate-400 mx-auto mb-1" />
                            <p class="text-xs font-medium text-text-main">Click or drop doctor prescription & bill estimates</p>
                            <p class="text-[11px] text-text-muted mt-0.5">Supports PDF, JPG, PNG up to 10MB (Stored in secure ledger)</p>
                        </div>
                    </div>

                    <div class="sm:col-span-2">
                        <label class="block text-xs font-semibold text-text-main mb-1">
                            Detailed Story & Medical Condition
                        </label>
                        <BaseTextarea
                            v-model="form.description"
                            rows="4"
                            placeholder="Describe the medical situation, urgency, diagnosis, and how the funds will be administered..."
                        />
                    </div>

                    <div class="sm:col-span-2 flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <div class="flex items-center space-x-2">
                            <input
                                v-model="form.isEmergency"
                                type="checkbox"
                                id="isEmergency"
                                class="w-4 h-4 text-danger rounded border-slate-300 focus:ring-danger"
                            />
                            <label for="isEmergency" class="text-xs font-semibold text-text-main cursor-pointer">
                                Mark as Urgent / Emergency Life Support Campaign
                            </label>
                        </div>
                        <span class="text-[11px] text-slate-500">Highlights on Home & Banner</span>
                    </div>
                </div>

                <div class="flex items-center justify-end space-x-3 pt-4 border-t border-border-main">
                    <BaseButton type="button" variant="outline" @click="isModalOpen = false">
                        Cancel
                    </BaseButton>
                    <BaseButton type="submit" variant="primary">
                        {{ isEditing ? 'Save Changes' : 'Publish Campaign' }}
                    </BaseButton>
                </div>
            </form>
        </BaseModal>

        <!-- Beneficiary Verification Proof Modal -->
        <BaseModal
            :is-open="isProofModalOpen"
            title="Beneficiary Verification & Medical Proof"
            max-width="lg"
            @close="isProofModalOpen = false"
        >
            <div v-if="selectedProofProject" class="space-y-4">
                <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start space-x-3">
                    <ShieldCheck class="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div class="text-xs text-emerald-900">
                        <p class="font-bold">Verified by Executive Committee</p>
                        <p class="text-emerald-700 mt-0.5">
                            Medical documents, hospital bed allocation, and treatment quotation verified by the Aid Committee on 15 Oct 2026.
                        </p>
                    </div>
                </div>

                <div class="border rounded-xl p-4 bg-slate-50 space-y-2 text-xs">
                    <div class="flex justify-between py-1 border-b border-slate-200">
                        <span class="text-text-muted">Beneficiary:</span>
                        <span class="font-bold text-text-main">{{ selectedProofProject.beneficiaryName }}</span>
                    </div>
                    <div class="flex justify-between py-1 border-b border-slate-200">
                        <span class="text-text-muted">Type:</span>
                        <span class="font-semibold text-text-main">{{ selectedProofProject.beneficiaryType }}</span>
                    </div>
                    <div class="flex justify-between py-1 border-b border-slate-200">
                        <span class="text-text-muted">Hospital / Facility:</span>
                        <span class="font-semibold text-text-main">{{ selectedProofProject.hospitalOrInstitution }}</span>
                    </div>
                    <div class="flex justify-between py-1">
                        <span class="text-text-muted">Document ID:</span>
                        <span class="font-mono text-slate-700">MED-REF-2026-8819.PDF</span>
                    </div>
                </div>

                <div class="p-4 bg-white border border-slate-200 rounded-xl text-center">
                    <FileText class="w-8 h-8 text-primary mx-auto mb-2" />
                    <p class="text-xs font-semibold text-text-main">Official Doctor Prescription & Treatment Estimate</p>
                    <p class="text-[11px] text-text-muted mt-0.5">Signed by Dr. M. Rahman (Chief Cardiologist)</p>
                    <div class="mt-3 flex justify-center space-x-2">
                        <BaseButton variant="outline" size="sm">
                            <Download class="w-3.5 h-3.5 mr-1" />
                            Download PDF Voucher
                        </BaseButton>
                    </div>
                </div>
            </div>
        </BaseModal>

        <!-- Project Expenses Breakdown Modal -->
        <BaseModal
            :is-open="isExpenseModalOpen"
            :title="`Disbursed Expenses: ${selectedExpenseProject?.title || ''}`"
            max-width="xl"
            @close="isExpenseModalOpen = false"
        >
            <div v-if="selectedExpenseProject" class="space-y-4">
                <div class="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <div>
                        <p class="text-[11px] text-text-muted">Total Collected</p>
                        <p class="text-sm font-bold text-emerald-600">৳{{ formatNumber(selectedExpenseProject.raisedAmount) }}</p>
                    </div>
                    <div>
                        <p class="text-[11px] text-text-muted">Total Disbursed</p>
                        <p class="text-sm font-bold text-rose-600">৳{{ formatNumber(selectedExpenseProject.spentAmount) }}</p>
                    </div>
                    <div>
                        <p class="text-[11px] text-text-muted">Remaining Balance</p>
                        <p class="text-sm font-bold text-primary">৳{{ formatNumber(selectedExpenseProject.raisedAmount - selectedExpenseProject.spentAmount) }}</p>
                    </div>
                </div>

                <!-- Expenses Table -->
                <div class="border border-border-main rounded-xl overflow-hidden">
                    <table class="w-full text-xs text-left">
                        <thead class="bg-slate-100 text-text-muted uppercase text-[10px] font-semibold">
                            <tr>
                                <th class="px-3 py-2.5">Date</th>
                                <th class="px-3 py-2.5">Voucher / Purpose</th>
                                <th class="px-3 py-2.5">Payee</th>
                                <th class="px-3 py-2.5 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            <tr v-for="(exp, idx) in mockProjectExpenses" :key="idx" class="hover:bg-slate-50">
                                <td class="px-3 py-2 text-text-muted">{{ exp.date }}</td>
                                <td class="px-3 py-2 font-medium text-text-main">
                                    {{ exp.purpose }}
                                    <span class="block text-[10px] text-slate-400 font-mono">Ref: {{ exp.voucherNo }}</span>
                                </td>
                                <td class="px-3 py-2 text-slate-600">{{ exp.payee }}</td>
                                <td class="px-3 py-2 text-right font-bold text-rose-600">৳{{ formatNumber(exp.amount) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="flex items-center justify-between pt-2">
                    <router-link to="/admin/accounting" class="text-xs text-primary font-medium hover:underline flex items-center">
                        Open Central Accounting Ledger
                        <ArrowRight class="w-3.5 h-3.5 ml-1" />
                    </router-link>
                    <BaseButton variant="outline" size="sm" @click="isExpenseModalOpen = false">
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
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseSelect from '@/components/ui/BaseSelect.vue';
import BaseTextarea from '@/components/ui/BaseTextarea.vue';
import {
    HeartHandshake,
    Target,
    TrendingUp,
    Users,
    Search,
    Plus,
    Coins,
    Edit3,
    ExternalLink,
    FileCheck,
    Receipt,
    CheckCircle2,
    UploadCloud,
    ShieldCheck,
    FileText,
    Download,
    ArrowRight
} from 'lucide-vue-next';

const searchQuery = ref('');
const statusFilter = ref('all');
const categoryFilter = ref('all');

// Modals state
const isModalOpen = ref(false);
const isEditing = ref(false);
const isProofModalOpen = ref(false);
const isExpenseModalOpen = ref(false);
const selectedProofProject = ref(null);
const selectedExpenseProject = ref(null);

const form = ref({
    id: null,
    title: '',
    category: 'Medical Support',
    targetAmount: 300000,
    beneficiaryName: '',
    beneficiaryType: 'Teacher',
    hospitalOrInstitution: '',
    deadline: '',
    description: '',
    isEmergency: false
});

// Mock projects list
const projects = ref([
    {
        id: 1,
        slug: 'emergency-heart-surgery-master-sir',
        title: 'Emergency Heart Surgery for Master Nurul Islam',
        category: 'Teacher Support',
        beneficiaryName: 'Master Nurul Islam',
        beneficiaryType: 'Teacher',
        hospitalOrInstitution: 'National Heart Foundation, Dhaka',
        targetAmount: 500000,
        raisedAmount: 345000,
        spentAmount: 180000,
        donorCount: 68,
        deadline: '2026-11-15',
        status: 'active',
        isEmergency: true,
        medicalProofAvailable: true,
        expenseCount: 3
    },
    {
        id: 2,
        slug: 'school-library-computer-lab',
        title: 'High School Modern Science & Computer Lab Upgrade',
        category: 'Educational Support',
        beneficiaryName: 'Nawabpur High School',
        beneficiaryType: 'Institution',
        hospitalOrInstitution: 'Main Campus Academic Building',
        targetAmount: 350000,
        raisedAmount: 185000,
        spentAmount: 55000,
        donorCount: 42,
        deadline: '2026-12-31',
        status: 'active',
        isEmergency: false,
        medicalProofAvailable: false,
        expenseCount: 1
    },
    {
        id: 3,
        slug: 'winter-warmth-drive-2025',
        title: 'Winter Warmth & Blanket Distribution Drive',
        category: 'Emergency Relief',
        beneficiaryName: 'Flood-affected Families',
        beneficiaryType: 'Community Group',
        hospitalOrInstitution: 'Northern District Enclaves',
        targetAmount: 150000,
        raisedAmount: 150000,
        spentAmount: 148500,
        donorCount: 54,
        deadline: '2026-01-20',
        status: 'completed',
        isEmergency: false,
        medicalProofAvailable: true,
        expenseCount: 4
    },
    {
        id: 4,
        slug: 'medical-support-tariqul-islam',
        title: 'Rehabilitation Support for Alumnus Tariqul Islam',
        category: 'Medical Support',
        beneficiaryName: 'Tariqul Islam (Batch 2012)',
        beneficiaryType: 'Member',
        hospitalOrInstitution: 'CRAB Orthopedic Center',
        targetAmount: 200000,
        raisedAmount: 75000,
        spentAmount: 30000,
        donorCount: 19,
        deadline: '2026-11-30',
        status: 'active',
        isEmergency: false,
        medicalProofAvailable: true,
        expenseCount: 2
    }
]);

const mockProjectExpenses = ref([
    { date: '18 Oct 2026', voucherNo: 'EXP-MED-0091', purpose: 'ICU & Stent Procedure Advance', payee: 'National Heart Hospital Cashier', amount: 120000 },
    { date: '14 Oct 2026', voucherNo: 'EXP-MED-0084', purpose: 'Critical Cardiac Medication', payee: 'Popular Pharmacy Dhanmondi', amount: 45000 },
    { date: '10 Oct 2026', voucherNo: 'EXP-MED-0077', purpose: 'Diagnostic Angiogram & Blood Test', payee: 'Labaid Diagnostics', amount: 15000 }
]);

// Computed metrics
const activeProjectsCount = computed(() => projects.value.filter(p => p.status === 'active').length);
const totalTargetAmount = computed(() => projects.value.reduce((acc, p) => acc + p.targetAmount, 0));
const totalRaisedAmount = computed(() => projects.value.reduce((acc, p) => acc + p.raisedAmount, 0));

const filteredProjects = computed(() => {
    return projects.value.filter(p => {
        const matchesSearch =
            p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            p.beneficiaryName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            (p.hospitalOrInstitution && p.hospitalOrInstitution.toLowerCase().includes(searchQuery.value.toLowerCase()));

        const matchesStatus = statusFilter.value === 'all' || p.status === statusFilter.value;
        const matchesCategory = categoryFilter.value === 'all' || p.category === categoryFilter.value;

        return matchesSearch && matchesStatus && matchesCategory;
    });
});

const formatNumber = (num) => {
    return Number(num || 0).toLocaleString('en-US');
};

const getInitials = (name) => {
    if (!name) return 'NS';
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
};

const getCategoryBadgeVariant = (cat) => {
    switch (cat) {
        case 'Teacher Support': return 'primary';
        case 'Medical Support': return 'danger';
        case 'Educational Support': return 'secondary';
        case 'Emergency Relief': return 'accent';
        default: return 'neutral';
    }
};

const getStatusBadgeVariant = (status) => {
    switch (status) {
        case 'active': return 'secondary';
        case 'completed': return 'primary';
        case 'paused': return 'accent';
        default: return 'neutral';
    }
};

const openCreateModal = () => {
    isEditing.value = false;
    form.value = {
        id: null,
        title: '',
        category: 'Medical Support',
        targetAmount: 300000,
        beneficiaryName: '',
        beneficiaryType: 'Teacher',
        hospitalOrInstitution: '',
        deadline: '',
        description: '',
        isEmergency: false
    };
    isModalOpen.value = true;
};

const editProject = (proj) => {
    isEditing.value = true;
    form.value = { ...proj };
    isModalOpen.value = true;
};

const saveProject = () => {
    if (isEditing.value) {
        const idx = projects.value.findIndex(p => p.id === form.value.id);
        if (idx !== -1) {
            projects.value[idx] = { ...projects.value[idx], ...form.value };
        }
    } else {
        const newProj = {
            ...form.value,
            id: Date.now(),
            slug: form.value.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            raisedAmount: 0,
            spentAmount: 0,
            donorCount: 0,
            status: 'active',
            medicalProofAvailable: true,
            expenseCount: 0
        };
        projects.value.unshift(newProj);
    }
    isModalOpen.value = false;
};

const toggleStatus = (proj, newStatus) => {
    proj.status = newStatus;
};

const viewProof = (proj) => {
    selectedProofProject.value = proj;
    isProofModalOpen.value = true;
};

const openExpenseModal = (proj) => {
    selectedExpenseProject.value = proj;
    isExpenseModalOpen.value = true;
};
</script>
