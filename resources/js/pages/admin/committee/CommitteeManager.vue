<template>
    <AdminLayout
        title="Committee & Leadership Manager"
        subtitle="Configure committee terms, assign leadership designations, and manage advisor panel."
    >
        <div class="space-y-8">
            <!-- Header Action & Term Selector -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div class="flex items-center space-x-3">
                    <span class="text-xs font-semibold text-text-muted">Active Term:</span>
                    <select
                        v-model="selectedTerm"
                        class="h-10 px-3 text-xs font-bold bg-white text-text-main rounded-xl border border-border-main focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                        <option value="2024-2026">Executive Committee 2024–2026 (Current Active)</option>
                        <option value="2022-2024">Executive Committee 2022–2024 (Archived)</option>
                    </select>
                </div>

                <div class="flex items-center space-x-2">
                    <BaseButton variant="outline" size="sm" @click="isNewTermModalOpen = true">
                        + Create New Term
                    </BaseButton>
                    <BaseButton variant="primary" size="sm" @click="isAssignModalOpen = true">
                        + Assign Member
                    </BaseButton>
                </div>
            </div>

            <!-- Current Committee Members Table -->
            <BaseCard title="Assigned Committee Members" subtitle="Official leaders holding constitutional portfolios">
                <BaseTable col-span="5">
                    <template #head>
                        <th class="px-5 py-3">Order #</th>
                        <th class="px-5 py-3">Portfolio / Designation</th>
                        <th class="px-5 py-3">Assigned Alumnus</th>
                        <th class="px-5 py-3">Profession & Organization</th>
                        <th class="px-5 py-3 text-right">Actions</th>
                    </template>
                    <template #body>
                        <tr
                            v-for="(member, idx) in committeeMembers"
                            :key="member.id"
                            class="hover:bg-slate-50 transition-colors text-xs"
                        >
                            <td class="px-5 py-3.5 font-mono text-text-muted">
                                {{ idx + 1 }}
                            </td>
                            <td class="px-5 py-3.5">
                                <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-primary text-white">
                                    {{ member.designation }}
                                </span>
                            </td>
                            <td class="px-5 py-3.5">
                                <div class="flex items-center space-x-2.5">
                                    <div class="w-7 h-7 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-xs">
                                        {{ member.name.charAt(0) }}
                                    </div>
                                    <div>
                                        <p class="font-bold text-text-main">{{ member.name }}</p>
                                        <p class="text-[11px] text-primary font-mono">{{ member.code }}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-5 py-3.5 text-text-muted">
                                {{ member.profession }} &bull; {{ member.organization }}
                            </td>
                            <td class="px-5 py-3.5 text-right space-x-2">
                                <button
                                    type="button"
                                    class="text-xs font-semibold text-text-muted hover:text-text-main"
                                    @click="handleEditAssignment(member)"
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    class="text-xs font-semibold text-danger hover:underline"
                                    @click="handleRemoveAssignment(member)"
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    </template>
                </BaseTable>
            </BaseCard>

            <!-- Assign Member Modal -->
            <BaseModal
                v-model="isAssignModalOpen"
                title="Assign Leadership Designation"
                subtitle="Assign a verified alumnus to an executive committee role"
                max-width="md"
            >
                <div class="space-y-4">
                    <BaseSelect
                        label="Select Alumnus"
                        placeholder="Choose member"
                        :options="['Tanvir Ahmed (NS12-0001)', 'Dr. Rafiqul Islam (NS12-0002)', 'Mahmudul Hasan (NS12-0003)', 'Kamrul Hasan (NS12-0004)']"
                        required
                    />

                    <BaseSelect
                        label="Designation / Portfolio"
                        placeholder="Choose designation"
                        :options="['President', 'Vice President', 'General Secretary', 'Joint Secretary', 'Treasurer', 'Organizing Secretary', 'Office Secretary', 'Executive Member', 'Advisor']"
                        required
                    />

                    <BaseInput
                        label="Display Priority Order (1 = Highest)"
                        placeholder="e.g. 1"
                        type="number"
                        model-value="1"
                    />
                </div>

                <template #footer="{ close }">
                    <BaseButton variant="outline" size="sm" @click="close">
                        Cancel
                    </BaseButton>
                    <BaseButton variant="primary" size="sm" @click="handleSaveAssignment(close)">
                        Confirm & Save Assignment
                    </BaseButton>
                </template>
            </BaseModal>
        </div>
    </AdminLayout>
</template>

<script setup>
import { ref } from 'vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseTable from '@/components/ui/BaseTable.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import BaseSelect from '@/components/ui/BaseSelect.vue';
import BaseInput from '@/components/ui/BaseInput.vue';

const selectedTerm = ref('2024-2026');
const isAssignModalOpen = ref(false);
const isNewTermModalOpen = ref(false);

const committeeMembers = ref([
    { id: 1, designation: 'President', name: 'Tanvir Ahmed', code: 'NS12-0001', profession: 'Sr. Software Architect', organization: 'Tech Solutions Ltd' },
    { id: 2, designation: 'General Secretary', name: 'Dr. Rafiqul Islam', code: 'NS12-0002', profession: 'Assistant Professor', organization: 'Dhaka Medical College' },
    { id: 3, designation: 'Treasurer', name: 'Mahmudul Hasan', code: 'NS12-0003', profession: 'Financial Analyst', organization: 'Standard Chartered' },
    { id: 4, designation: 'Vice President', name: 'Kamrul Hasan', code: 'NS12-0004', profession: 'Managing Director', organization: 'Apex Ventures' },
    { id: 5, designation: 'Joint Secretary', name: 'Sajid Karim', code: 'NS12-0005', profession: 'Marketing Director', organization: 'Grameenphone' },
    { id: 6, designation: 'Organizing Secretary', name: 'Nafis Imtiaz', code: 'NS12-0006', profession: 'Executive Engineer', organization: 'PWD Bangladesh' }
]);

const handleSaveAssignment = (closeModal) => {
    alert('Committee designation updated successfully!');
    closeModal();
};

const handleEditAssignment = (member) => {
    alert('Editing portfolio for ' + member.name);
};

const handleRemoveAssignment = (member) => {
    if (confirm(`Remove ${member.name} from ${member.designation}?`)) {
        committeeMembers.value = committeeMembers.value.filter(m => m.id !== member.id);
    }
};
</script>
