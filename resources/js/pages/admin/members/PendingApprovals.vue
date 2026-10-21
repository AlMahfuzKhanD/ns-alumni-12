<template>
    <AdminLayout
        title="Pending Membership Applications"
        subtitle="Review, verify batch identity, and activate new alumni accounts."
    >
        <div class="space-y-6">
            <!-- Navigation Back Bar -->
            <div class="flex items-center justify-between">
                <router-link
                    to="/admin/members"
                    class="inline-flex items-center text-xs font-semibold text-text-muted hover:text-primary transition-colors"
                >
                    <ArrowLeft class="w-4 h-4 mr-1.5" />
                    Back to Member Directory
                </router-link>

                <div class="flex items-center space-x-2">
                    <span class="text-xs text-text-muted">Verification Queue:</span>
                    <BaseBadge variant="warning" dot size="sm">
                        {{ applicants.length }} Pending Review
                    </BaseBadge>
                </div>
            </div>

            <!-- Empty State -->
            <div
                v-if="applicants.length === 0"
                class="p-12 text-center bg-white rounded-2xl border border-border-main space-y-3"
            >
                <div class="w-14 h-14 rounded-full bg-emerald-50 text-secondary border border-emerald-200 mx-auto flex items-center justify-center">
                    <CheckCircle2 class="w-8 h-8" />
                </div>
                <h3 class="text-base font-bold text-text-main">All Applications Reviewed!</h3>
                <p class="text-xs text-text-muted max-w-sm mx-auto">
                    There are no alumni applications awaiting verification in the queue.
                </p>
                <router-link to="/admin/members">
                    <BaseButton variant="outline" size="sm" class="mt-2">
                        View Active Directory
                    </BaseButton>
                </router-link>
            </div>

            <!-- Applicant Cards Grid -->
            <div v-else class="space-y-4">
                <div
                    v-for="applicant in applicants"
                    :key="applicant.id"
                    class="bg-white rounded-2xl border border-border-main p-6 shadow-xs hover:border-slate-300 transition-all flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
                >
                    <!-- Left: Details -->
                    <div class="flex items-start space-x-4 min-w-0">
                        <div class="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center font-black text-base shrink-0">
                            {{ applicant.name.charAt(0) }}
                        </div>
                        <div class="space-y-1 min-w-0">
                            <div class="flex flex-wrap items-center gap-2">
                                <h3 class="text-base font-bold text-text-main leading-tight">{{ applicant.name }}</h3>
                                <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-red-50 text-danger border border-red-200">
                                    Blood: {{ applicant.bloodGroup }}
                                </span>
                                <span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                                    Roll #{{ applicant.rollNumber || 'Not specified' }}
                                </span>
                            </div>

                            <p class="text-xs text-text-muted flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
                                <span>📱 <strong>{{ applicant.phone }}</strong></span>
                                <span v-if="applicant.email">✉️ {{ applicant.email }}</span>
                                <span>💼 {{ applicant.profession }} ({{ applicant.organization }})</span>
                                <span>📍 {{ applicant.address }}</span>
                            </p>

                            <p class="text-[11px] text-text-muted/80 pt-1">
                                Applied on {{ applicant.appliedAt }} &bull; Confirmed Batch NS-12 Honor Code Pledge
                            </p>
                        </div>
                    </div>

                    <!-- Right: Decision Actions -->
                    <div class="flex items-center space-x-3 shrink-0 self-end lg:self-center">
                        <BaseButton
                            variant="outline"
                            size="sm"
                            @click="handleReject(applicant)"
                        >
                            <template #icon>
                                <XCircle class="w-4 h-4 text-danger" />
                            </template>
                            Reject
                        </BaseButton>

                        <BaseButton
                            variant="success"
                            size="sm"
                            @click="handleApprove(applicant)"
                        >
                            <template #icon>
                                <CheckCircle class="w-4 h-4" />
                            </template>
                            Verify & Activate Account
                        </BaseButton>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup>
import { ref } from 'vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { ArrowLeft, CheckCircle2, CheckCircle, XCircle } from 'lucide-vue-next';

const applicants = ref([
    {
        id: 101,
        name: 'Sabbir Ahmed Chowdhury',
        phone: '01811223344',
        email: 'sabbir.ac@gmail.com',
        bloodGroup: 'O+',
        rollNumber: '132',
        profession: 'Textile Engineer',
        organization: 'Square Textiles Ltd',
        address: 'Uttara, Dhaka',
        appliedAt: '2 hours ago'
    },
    {
        id: 102,
        name: 'Dr. Nusrat Jahan',
        phone: '01799887766',
        email: 'nusrat.jahan@yahoo.com',
        bloodGroup: 'B+',
        rollNumber: '109',
        profession: 'Dental Surgeon',
        organization: 'Apollo Dental Care',
        address: 'Dhanmondi, Dhaka',
        appliedAt: '5 hours ago'
    },
    {
        id: 103,
        name: 'Ashikur Rahman',
        phone: '01655443322',
        email: '',
        bloodGroup: 'A+',
        rollNumber: '145',
        profession: 'Senior Officer',
        organization: 'Eastern Bank PLC',
        address: 'Mirpur, Dhaka',
        appliedAt: 'Yesterday'
    }
]);

const handleApprove = (applicant) => {
    const code = `NS12-00${Math.floor(10 + Math.random() * 89)}`;
    applicants.value = applicants.value.filter(a => a.id !== applicant.id);
    alert(`Account Verified! ${applicant.name} has been activated with Member Code: ${code}. An SMS welcome notification was triggered.`);
};

const handleReject = (applicant) => {
    const reason = prompt(`Enter reason for rejecting ${applicant.name}:`, 'Details could not be verified with Batch 2012 registry');
    if (reason) {
        applicants.value = applicants.value.filter(a => a.id !== applicant.id);
        alert(`Application for ${applicant.name} was rejected. Note logged: "${reason}"`);
    }
};
</script>
