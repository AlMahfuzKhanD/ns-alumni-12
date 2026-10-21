<template>
    <div class="min-h-screen bg-surface-bg py-8 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto space-y-10">
            <!-- Header -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-border-main gap-4">
                <div>
                    <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary-light text-primary mb-2">
                        <span>Phase 1.1 Component Gallery</span>
                    </div>
                    <h1 class="text-2xl sm:text-3xl font-extrabold text-text-main">
                        NS - 12 Design System & UI Library
                    </h1>
                    <p class="text-sm text-text-muted mt-1">
                        Reusable atomic components & layouts complying with <code class="bg-slate-100 px-1.5 py-0.5 rounded text-primary">01_branding_guideline.md</code>.
                    </p>
                </div>

                <div class="flex items-center space-x-2">
                    <router-link to="/">
                        <BaseButton variant="outline" size="sm">
                            View Home
                        </BaseButton>
                    </router-link>
                    <BaseButton variant="primary" size="sm" @click="isModalOpen = true">
                        Test Modal
                    </BaseButton>
                </div>
            </div>

            <!-- Section 1: Buttons -->
            <section class="space-y-4">
                <h2 class="text-lg font-bold text-text-main flex items-center">
                    <span class="w-2.5 h-2.5 rounded-full bg-primary mr-2"></span>
                    1. Buttons (BaseButton)
                </h2>

                <BaseCard title="Variants & States" subtitle="Supports primary, secondary, success, danger, outline, and ghost">
                    <div class="space-y-6">
                        <!-- Variant Row -->
                        <div class="flex flex-wrap items-center gap-3">
                            <BaseButton variant="primary">Primary Button</BaseButton>
                            <BaseButton variant="secondary">Secondary (Aid)</BaseButton>
                            <BaseButton variant="success">Success</BaseButton>
                            <BaseButton variant="warning">Warning / Gold</BaseButton>
                            <BaseButton variant="danger">Danger</BaseButton>
                            <BaseButton variant="outline">Outline</BaseButton>
                            <BaseButton variant="ghost">Ghost</BaseButton>
                        </div>

                        <!-- Sizes & Loading Row -->
                        <div class="flex flex-wrap items-center gap-3 pt-4 border-t border-border-main">
                            <BaseButton size="sm">Small (sm)</BaseButton>
                            <BaseButton size="md">Medium (md)</BaseButton>
                            <BaseButton size="lg">Large (lg)</BaseButton>
                            <BaseButton :loading="true">Loading...</BaseButton>
                            <BaseButton :disabled="true">Disabled</BaseButton>
                        </div>
                    </div>
                </BaseCard>
            </section>

            <!-- Section 2: Form Inputs -->
            <section class="space-y-4">
                <h2 class="text-lg font-bold text-text-main flex items-center">
                    <span class="w-2.5 h-2.5 rounded-full bg-secondary mr-2"></span>
                    2. Form Controls (BaseInput, BaseSelect, BaseTextarea)
                </h2>

                <BaseCard title="Input Fields" subtitle="Height 44-48px, rounded-xl (10px), clear focus rings">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <BaseInput
                            label="Full Name"
                            placeholder="Enter your name"
                            help-text="As per your alumni registration."
                            required
                        />

                        <BaseInput
                            label="Phone Number"
                            placeholder="017XXXXXXXX"
                            error="Phone number already registered."
                            required
                        />

                        <BaseSelect
                            label="Blood Group"
                            placeholder="Select Blood Group"
                            :options="['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']"
                            help-text="Required for emergency blood donor registry."
                        />

                        <div class="md:col-span-3">
                            <BaseTextarea
                                label="Current Address & Bio"
                                placeholder="Describe your current profession and location..."
                                rows="3"
                            />
                        </div>
                    </div>
                </BaseCard>
            </section>

            <!-- Section 3: Badges -->
            <section class="space-y-4">
                <h2 class="text-lg font-bold text-text-main flex items-center">
                    <span class="w-2.5 h-2.5 rounded-full bg-accent mr-2"></span>
                    3. Status Badges (BaseBadge)
                </h2>

                <BaseCard title="Status & Indicators" subtitle="Semantic badges for payment dues, memberships, and campaign statuses">
                    <div class="flex flex-wrap items-center gap-3">
                        <BaseBadge variant="primary" dot>Active Member</BaseBadge>
                        <BaseBadge variant="secondary" dot>Paid / Success</BaseBadge>
                        <BaseBadge variant="warning" dot>Pending Approval</BaseBadge>
                        <BaseBadge variant="danger" dot>Due / Urgent</BaseBadge>
                        <BaseBadge variant="neutral">Archived</BaseBadge>
                        <BaseBadge variant="outline">Batch 2012</BaseBadge>
                    </div>
                </BaseCard>
            </section>

            <!-- Section 4: Data Table -->
            <section class="space-y-4">
                <h2 class="text-lg font-bold text-text-main flex items-center">
                    <span class="w-2.5 h-2.5 rounded-full bg-sidebar-bg mr-2"></span>
                    4. Data Table (BaseTable)
                </h2>

                <BaseTable :loading="isTableLoading" :empty="sampleMembers.length === 0" col-span="5">
                    <template #toolbar>
                        <div class="flex items-center space-x-2">
                            <span class="font-bold text-text-main text-sm">Alumni Records Preview</span>
                            <BaseBadge variant="primary" size="sm">5 Total</BaseBadge>
                        </div>

                        <div class="flex items-center space-x-2">
                            <BaseButton
                                variant="outline"
                                size="sm"
                                @click="isTableLoading = !isTableLoading"
                            >
                                {{ isTableLoading ? 'Stop Loading' : 'Simulate Loading' }}
                            </BaseButton>
                        </div>
                    </template>

                    <template #head>
                        <th class="px-5 py-3">Member ID</th>
                        <th class="px-5 py-3">Full Name</th>
                        <th class="px-5 py-3">Profession</th>
                        <th class="px-5 py-3">Status</th>
                        <th class="px-5 py-3 text-right">Action</th>
                    </template>

                    <template #body>
                        <tr
                            v-for="member in sampleMembers"
                            :key="member.code"
                            class="hover:bg-slate-50/80 transition-colors"
                        >
                            <td class="px-5 py-3.5 font-semibold text-primary font-mono text-xs">
                                {{ member.code }}
                            </td>
                            <td class="px-5 py-3.5 font-medium text-text-main">
                                {{ member.name }}
                            </td>
                            <td class="px-5 py-3.5 text-text-muted text-xs">
                                {{ member.profession }}
                            </td>
                            <td class="px-5 py-3.5">
                                <BaseBadge :variant="member.badgeVariant" dot size="sm">
                                    {{ member.status }}
                                </BaseBadge>
                            </td>
                            <td class="px-5 py-3.5 text-right">
                                <BaseButton variant="outline" size="sm">
                                    View Profile
                                </BaseButton>
                            </td>
                        </tr>
                    </template>

                    <template #pagination>
                        <span class="text-xs text-text-muted">Showing 1 to 3 of 3 members</span>
                        <div class="flex items-center space-x-1">
                            <BaseButton variant="outline" size="sm" :disabled="true">Previous</BaseButton>
                            <BaseButton variant="outline" size="sm" :disabled="true">Next</BaseButton>
                        </div>
                    </template>
                </BaseTable>
            </section>

            <!-- Test Modal Component -->
            <BaseModal
                v-model="isModalOpen"
                title="Test Modal Dialog"
                subtitle="Accessible modal dialog with transitions and backdrop"
                max-width="md"
            >
                <div class="space-y-3 text-sm text-text-muted">
                    <p>
                        This modal matches the design guideline: 16px border radius, blurred dark backdrop, action footer slots, and full keyboard escape support.
                    </p>
                    <BaseInput label="Quick Input" placeholder="Type something..." />
                </div>

                <template #footer="{ close }">
                    <BaseButton variant="outline" size="sm" @click="close">
                        Cancel
                    </BaseButton>
                    <BaseButton variant="primary" size="sm" @click="close">
                        Confirm Action
                    </BaseButton>
                </template>
            </BaseModal>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseSelect from '@/components/ui/BaseSelect.vue';
import BaseTextarea from '@/components/ui/BaseTextarea.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import BaseTable from '@/components/ui/BaseTable.vue';

const isModalOpen = ref(false);
const isTableLoading = ref(false);

const sampleMembers = [
    { code: 'NS12-0001', name: 'Tanvir Ahmed', profession: 'Software Engineer', status: 'Active', badgeVariant: 'success' },
    { code: 'NS12-0002', name: 'Dr. Rafiqul Islam', profession: 'Medical Officer', status: 'Active', badgeVariant: 'success' },
    { code: 'NS12-0003', name: 'Mahmudul Hasan', profession: 'Banker', status: 'Pending Review', badgeVariant: 'warning' },
];
</script>
