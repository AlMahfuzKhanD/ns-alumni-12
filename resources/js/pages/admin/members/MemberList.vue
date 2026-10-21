<template>
    <AdminLayout
        title="Alumni Member Directory"
        subtitle="Manage registered batchmates, verification statuses, and emergency blood directory."
    >
        <div class="space-y-6">
            <!-- Header Actions Bar -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div class="flex items-center space-x-3">
                    <router-link
                        to="/admin/members"
                        class="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-primary text-white shadow-xs"
                    >
                        All Members ({{ members.length }})
                    </router-link>
                    <router-link
                        to="/admin/members/pending"
                        class="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors flex items-center space-x-1.5"
                    >
                        <span>Pending Approvals</span>
                        <span class="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500 text-white">3</span>
                    </router-link>
                </div>

                <div class="flex items-center space-x-2">
                    <BaseButton variant="outline" size="sm" @click="handleExportCSV">
                        Export CSV
                    </BaseButton>
                    <BaseButton variant="primary" size="sm" @click="isAddModalOpen = true">
                        + Add Member Manually
                    </BaseButton>
                </div>
            </div>

            <!-- Member List Table with Toolbar -->
            <BaseCard no-padding>
                <BaseTable col-span="6">
                    <template #toolbar>
                        <!-- Search Input -->
                        <div class="w-full sm:w-72">
                            <BaseInput
                                v-model="searchQuery"
                                placeholder="Search by name, code, phone..."
                            >
                                <template #prefix>
                                    <Search class="w-4 h-4 text-text-muted" />
                                </template>
                            </BaseInput>
                        </div>

                        <!-- Filter Dropdowns -->
                        <div class="flex flex-wrap items-center gap-2">
                            <select
                                v-model="selectedBloodGroup"
                                class="h-11 px-3 text-xs bg-white text-text-main rounded-xl border border-border-main focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="">All Blood Groups</option>
                                <option v-for="bg in ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']" :key="bg" :value="bg">
                                    {{ bg }}
                                </option>
                            </select>

                            <select
                                v-model="selectedStatus"
                                class="h-11 px-3 text-xs bg-white text-text-main rounded-xl border border-border-main focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="">All Statuses</option>
                                <option value="Active">Active</option>
                                <option value="Pending">Pending</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </template>

                    <template #head>
                        <th class="px-5 py-3">Member ID</th>
                        <th class="px-5 py-3">Alumnus Name</th>
                        <th class="px-5 py-3">Blood Group</th>
                        <th class="px-5 py-3">Mobile Contact</th>
                        <th class="px-5 py-3">Profession & Workplace</th>
                        <th class="px-5 py-3">Status</th>
                        <th class="px-5 py-3 text-right">Actions</th>
                    </template>

                    <template #body>
                        <tr
                            v-for="member in filteredMembers"
                            :key="member.code"
                            class="hover:bg-slate-50 transition-colors text-xs"
                        >
                            <td class="px-5 py-3.5 font-mono font-bold text-primary">
                                {{ member.code }}
                            </td>
                            <td class="px-5 py-3.5">
                                <div class="flex items-center space-x-2.5">
                                    <div class="w-7 h-7 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-xs">
                                        {{ member.name.charAt(0) }}
                                    </div>
                                    <div>
                                        <p class="font-bold text-text-main">{{ member.name }}</p>
                                        <p class="text-[11px] text-text-muted">Roll: {{ member.roll || 'N/A' }}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-5 py-3.5">
                                <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-red-50 text-danger border border-red-200">
                                    {{ member.bloodGroup }}
                                </span>
                            </td>
                            <td class="px-5 py-3.5 font-medium text-text-muted">
                                {{ member.phone }}
                            </td>
                            <td class="px-5 py-3.5">
                                <p class="font-semibold text-text-main">{{ member.profession }}</p>
                                <p class="text-[11px] text-text-muted">{{ member.organization }}</p>
                            </td>
                            <td class="px-5 py-3.5">
                                <BaseBadge :variant="member.status === 'Active' ? 'secondary' : (member.status === 'Pending' ? 'warning' : 'neutral')" dot size="sm">
                                    {{ member.status }}
                                </BaseBadge>
                            </td>
                            <td class="px-5 py-3.5 text-right space-x-2">
                                <router-link :to="`/admin/members/${member.id}`">
                                    <BaseButton variant="outline" size="sm">
                                        View
                                    </BaseButton>
                                </router-link>
                            </td>
                        </tr>

                        <tr v-if="filteredMembers.length === 0">
                            <td colspan="7" class="py-12 text-center text-text-muted">
                                No members match your search filter.
                            </td>
                        </tr>
                    </template>

                    <template #pagination>
                        <span class="text-xs text-text-muted">Showing {{ filteredMembers.length }} of {{ members.length }} members</span>
                        <div class="flex items-center space-x-1">
                            <BaseButton variant="outline" size="sm" :disabled="true">Previous</BaseButton>
                            <BaseButton variant="outline" size="sm" :disabled="true">Next</BaseButton>
                        </div>
                    </template>
                </BaseTable>
            </BaseCard>

            <!-- Add Member Manually Modal -->
            <BaseModal
                v-model="isAddModalOpen"
                title="Add New Member"
                subtitle="Manually register an alumnus into Batch NS-12 registry"
                max-width="md"
            >
                <div class="space-y-4">
                    <BaseInput
                        v-model="newMember.name"
                        label="Full Name"
                        placeholder="e.g. Shakil Ahmed"
                        required
                    />

                    <div class="grid grid-cols-2 gap-3">
                        <BaseInput
                            v-model="newMember.phone"
                            label="Phone Number"
                            placeholder="017XXXXXXXX"
                            required
                        />

                        <BaseSelect
                            v-model="newMember.bloodGroup"
                            label="Blood Group"
                            placeholder="Select"
                            :options="['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']"
                            required
                        />
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                        <BaseInput
                            v-model="newMember.profession"
                            label="Profession"
                            placeholder="e.g. Engineer"
                            required
                        />

                        <BaseInput
                            v-model="newMember.organization"
                            label="Organization"
                            placeholder="e.g. BUET"
                        />
                    </div>
                </div>

                <template #footer="{ close }">
                    <BaseButton variant="outline" size="sm" @click="close">
                        Cancel
                    </BaseButton>
                    <BaseButton variant="primary" size="sm" @click="handleAddMember(close)">
                        Save & Activate Member
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
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseSelect from '@/components/ui/BaseSelect.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import { Search } from 'lucide-vue-next';

const isAddModalOpen = ref(false);
const searchQuery = ref('');
const selectedBloodGroup = ref('');
const selectedStatus = ref('');

const newMember = ref({
    name: '',
    phone: '',
    bloodGroup: 'B+',
    profession: '',
    organization: ''
});

const members = ref([
    { id: 1, code: 'NS12-0001', name: 'Tanvir Ahmed', roll: '101', bloodGroup: 'O+', phone: '01711223344', profession: 'Sr. Software Architect', organization: 'Tech Solutions Ltd', status: 'Active' },
    { id: 2, code: 'NS12-0002', name: 'Dr. Rafiqul Islam', roll: '104', bloodGroup: 'B+', phone: '01722334455', profession: 'Assistant Professor', organization: 'Dhaka Medical College', status: 'Active' },
    { id: 3, code: 'NS12-0003', name: 'Mahmudul Hasan', roll: '108', bloodGroup: 'A+', phone: '01733445566', profession: 'Financial Analyst', organization: 'Standard Chartered Bank', status: 'Active' },
    { id: 4, code: 'NS12-0004', name: 'Kamrul Hasan', roll: '112', bloodGroup: 'AB+', phone: '01744556677', profession: 'Managing Director', organization: 'Apex Ventures', status: 'Active' },
    { id: 5, code: 'NS12-0005', name: 'Sajid Karim', roll: '115', bloodGroup: 'O-', phone: '01755667788', profession: 'Head of Marketing', organization: 'Grameenphone', status: 'Active' },
    { id: 6, code: 'NS12-0006', name: 'Nafis Imtiaz', roll: '119', bloodGroup: 'B-', phone: '01766778899', profession: 'Executive Engineer', organization: 'PWD Bangladesh', status: 'Active' },
    { id: 7, code: 'NS12-0007', name: 'Zubair Hossain', roll: '122', bloodGroup: 'A-', phone: '01777889900', profession: 'Lead Operations Specialist', organization: 'BRAC International', status: 'Active' },
    { id: 8, code: 'NS12-0008', name: 'Fahim Faisal', roll: '125', bloodGroup: 'O+', phone: '01788990011', profession: 'Commercial Manager', organization: 'Unilever Bangladesh', status: 'Active' }
]);

const filteredMembers = computed(() => {
    return members.value.filter(m => {
        const matchesSearch = !searchQuery.value ||
            m.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            m.code.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            m.phone.includes(searchQuery.value);

        const matchesBlood = !selectedBloodGroup.value || m.bloodGroup === selectedBloodGroup.value;
        const matchesStatus = !selectedStatus.value || m.status === selectedStatus.value;

        return matchesSearch && matchesBlood && matchesStatus;
    });
});

const handleAddMember = (closeModal) => {
    if (!newMember.value.name || !newMember.value.phone) {
        alert('Please provide full name and phone number');
        return;
    }

    const nextId = members.value.length + 1;
    const formattedCode = `NS12-00${nextId < 10 ? '0' + nextId : nextId}`;

    members.value.unshift({
        id: nextId,
        code: formattedCode,
        name: newMember.value.name,
        roll: 'N/A',
        bloodGroup: newMember.value.bloodGroup,
        phone: newMember.value.phone,
        profession: newMember.value.profession || 'Alumnus',
        organization: newMember.value.organization || 'Batch 12',
        status: 'Active'
    });

    alert(`Member ${newMember.value.name} successfully activated with ID ${formattedCode}!`);
    newMember.value = { name: '', phone: '', bloodGroup: 'B+', profession: '', organization: '' };
    closeModal();
};

const handleExportCSV = () => {
    alert('Exporting NS-12 Alumni Member Directory to CSV...');
};
</script>
