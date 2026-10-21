<template>
    <BaseCard title="Pending Membership Review Queue" subtitle="New batchmates awaiting committee verification">
        <template #header-action>
            <BaseBadge variant="warning" size="sm" dot>
                {{ pendingList.length }} Pending
            </BaseBadge>
        </template>

        <div v-if="pendingList.length === 0" class="py-8 text-center text-text-muted text-xs">
            No pending alumni applications at this time. All caught up!
        </div>

        <div v-else class="space-y-3.5">
            <div
                v-for="applicant in pendingList"
                :key="applicant.id"
                class="p-3.5 rounded-xl border border-border-main bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold text-sm shrink-0">
                        {{ applicant.name.charAt(0) }}
                    </div>
                    <div>
                        <div class="flex items-center space-x-2">
                            <h4 class="text-sm font-bold text-text-main leading-tight">{{ applicant.name }}</h4>
                            <span class="px-1.5 py-0.2 rounded text-[10px] font-bold bg-red-50 text-danger border border-red-200">
                                {{ applicant.bloodGroup }}
                            </span>
                        </div>
                        <p class="text-xs text-text-muted mt-0.5">
                            {{ applicant.phone }} &bull; {{ applicant.profession }}
                        </p>
                    </div>
                </div>

                <div class="flex items-center space-x-2 self-end sm:self-center">
                    <BaseButton
                        variant="success"
                        size="sm"
                        @click="handleApprove(applicant)"
                    >
                        Approve
                    </BaseButton>
                    <BaseButton
                        variant="outline"
                        size="sm"
                        @click="handleReject(applicant)"
                    >
                        Reject
                    </BaseButton>
                </div>
            </div>
        </div>
    </BaseCard>
</template>

<script setup>
import { ref } from 'vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const pendingList = ref([
    { id: 1, name: 'Sabbir Ahmed Chowdhury', phone: '01811223344', bloodGroup: 'O+', profession: 'Textile Engineer' },
    { id: 2, name: 'Dr. Nusrat Jahan', phone: '01799887766', bloodGroup: 'B+', profession: 'Dental Surgeon' },
    { id: 3, name: 'Ashikur Rahman', phone: '01655443322', bloodGroup: 'A+', profession: 'Bank Officer' }
]);

const handleApprove = (applicant) => {
    pendingList.value = pendingList.value.filter(a => a.id !== applicant.id);
    alert(`Success: ${applicant.name} has been approved as an Active Member with code NS12-0${Math.floor(100 + Math.random() * 900)}!`);
};

const handleReject = (applicant) => {
    pendingList.value = pendingList.value.filter(a => a.id !== applicant.id);
    alert(`Application for ${applicant.name} was rejected.`);
};
</script>
