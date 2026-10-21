<template>
    <AdminLayout
        title="Notice & Announcements Manager"
        subtitle="Publish association circulars, emergency calls, meeting memos, and member updates"
    >
        <div class="space-y-6">
            <!-- Top Metrics Row -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <BaseCard class="p-4 sm:p-5 border-l-4 border-l-primary flex items-center justify-between">
                    <div>
                        <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Published Notices</p>
                        <p class="text-2xl font-black text-text-main mt-1">{{ publishedCount }}</p>
                        <p class="text-[11px] text-emerald-600 mt-1 font-medium flex items-center">
                            <span class="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1.5"></span>
                            Live across website & app
                        </p>
                    </div>
                    <div class="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Bell class="w-6 h-6" />
                    </div>
                </BaseCard>

                <BaseCard class="p-4 sm:p-5 border-l-4 border-l-danger flex items-center justify-between">
                    <div>
                        <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Pinned / Urgent</p>
                        <p class="text-2xl font-black text-danger mt-1">{{ pinnedCount }}</p>
                        <p class="text-[11px] text-text-muted mt-1">Highlighted on dashboard & home</p>
                    </div>
                    <div class="w-12 h-12 rounded-xl bg-danger/10 text-danger flex items-center justify-center">
                        <AlertCircle class="w-6 h-6" />
                    </div>
                </BaseCard>

                <BaseCard class="p-4 sm:p-5 border-l-4 border-l-secondary flex items-center justify-between">
                    <div>
                        <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Members Only</p>
                        <p class="text-2xl font-black text-secondary mt-1">{{ membersOnlyCount }}</p>
                        <p class="text-[11px] text-text-muted mt-1">Restricted internal circulars</p>
                    </div>
                    <div class="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                        <Lock class="w-6 h-6" />
                    </div>
                </BaseCard>

                <BaseCard class="p-4 sm:p-5 border-l-4 border-l-accent flex items-center justify-between">
                    <div>
                        <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Job Board</p>
                        <p class="text-2xl font-black text-text-main mt-1">8 Active</p>
                        <router-link to="/admin/jobs" class="text-[11px] text-primary hover:underline mt-1 inline-flex items-center">
                            Manage Job Circulars <ArrowRight class="w-3 h-3 ml-1" />
                        </router-link>
                    </div>
                    <div class="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                        <Briefcase class="w-6 h-6" />
                    </div>
                </BaseCard>
            </div>

            <!-- Filters & Actions Header -->
            <BaseCard class="p-4 sm:p-6">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <!-- Search Input -->
                    <div class="relative flex-1 max-w-md">
                        <Search class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Search notices by title, keyword or circular #..."
                            class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-border-main rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                    </div>

                    <!-- Dropdowns & Create Button -->
                    <div class="flex flex-wrap items-center gap-3">
                        <select
                            v-model="visibilityFilter"
                            class="px-3 py-2 bg-slate-50 border border-border-main rounded-xl text-sm text-text-main focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                            <option value="all">All Visibility</option>
                            <option value="Public">Public (Anyone)</option>
                            <option value="Members Only">Members Only</option>
                            <option value="Committee Only">Committee Only</option>
                        </select>

                        <select
                            v-model="typeFilter"
                            class="px-3 py-2 bg-slate-50 border border-border-main rounded-xl text-sm text-text-main focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                            <option value="all">All Notice Types</option>
                            <option value="General Notice">General Notice</option>
                            <option value="Emergency Announcement">Emergency Announcement</option>
                            <option value="Event Notice">Event Notice</option>
                            <option value="Meeting Notice">Meeting Notice</option>
                        </select>

                        <router-link to="/admin/jobs">
                            <BaseButton variant="outline" size="sm">
                                <Briefcase class="w-4 h-4 mr-1.5" />
                                Job Circulars
                            </BaseButton>
                        </router-link>

                        <BaseButton variant="primary" size="sm" @click="openCreateModal">
                            <Plus class="w-4 h-4 mr-1.5" />
                            Create Notice
                        </BaseButton>
                    </div>
                </div>
            </BaseCard>

            <!-- Notices Table / List -->
            <BaseCard class="overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm">
                        <thead class="bg-slate-50 border-b border-border-main text-xs uppercase text-text-muted font-semibold tracking-wider">
                            <tr>
                                <th class="px-6 py-4">Notice Title & Details</th>
                                <th class="px-6 py-4">Type</th>
                                <th class="px-6 py-4">Audience</th>
                                <th class="px-6 py-4">Publish & Expiry</th>
                                <th class="px-6 py-4">Status</th>
                                <th class="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border-main">
                            <tr
                                v-for="n in filteredNotices"
                                :key="n.id"
                                class="hover:bg-slate-50/80 transition-colors"
                            >
                                <!-- Title, Reference & Pin -->
                                <td class="px-6 py-4">
                                    <div class="flex items-start space-x-2">
                                        <button
                                            @click="togglePin(n)"
                                            class="mt-0.5 shrink-0 transition-colors"
                                            :class="n.isPinned ? 'text-amber-500' : 'text-slate-300 hover:text-amber-400'"
                                            title="Toggle Pinned Status"
                                        >
                                            <Pin class="w-4 h-4 fill-current" />
                                        </button>
                                        <div>
                                            <p class="font-bold text-text-main text-xs sm:text-sm hover:text-primary transition-colors cursor-pointer" @click="previewNotice(n)">
                                                {{ n.title }}
                                            </p>
                                            <p class="text-[11px] text-text-muted mt-0.5 line-clamp-1">
                                                {{ n.summary }}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <!-- Type -->
                                <td class="px-6 py-4">
                                    <BaseBadge :variant="getTypeBadgeVariant(n.type)" size="sm">
                                        {{ n.type }}
                                    </BaseBadge>
                                </td>

                                <!-- Audience Visibility -->
                                <td class="px-6 py-4">
                                    <span
                                        :class="[
                                            'inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold',
                                            getVisibilityClass(n.visibility)
                                        ]"
                                    >
                                        <Globe v-if="n.visibility === 'Public'" class="w-3 h-3 mr-1" />
                                        <Users v-else-if="n.visibility === 'Members Only'" class="w-3 h-3 mr-1" />
                                        <ShieldCheck v-else class="w-3 h-3 mr-1" />
                                        {{ n.visibility }}
                                    </span>
                                </td>

                                <!-- Dates -->
                                <td class="px-6 py-4 text-xs">
                                    <p class="font-medium text-text-main">{{ n.publishDate }}</p>
                                    <p class="text-[11px] text-text-muted mt-0.5">
                                        Exp: {{ n.expiryDate || 'No Expiry' }}
                                    </p>
                                </td>

                                <!-- Status -->
                                <td class="px-6 py-4">
                                    <BaseBadge :variant="n.status === 'published' ? 'secondary' : 'neutral'" size="sm">
                                        <span class="capitalize">{{ n.status }}</span>
                                    </BaseBadge>
                                </td>

                                <!-- Actions -->
                                <td class="px-6 py-4 text-right">
                                    <div class="flex items-center justify-end space-x-1.5">
                                        <button
                                            @click="previewNotice(n)"
                                            class="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-100 transition-colors"
                                            title="Preview Notice"
                                        >
                                            <Eye class="w-4 h-4" />
                                        </button>

                                        <button
                                            @click="editNotice(n)"
                                            class="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-100 transition-colors"
                                            title="Edit Notice"
                                        >
                                            <Edit3 class="w-4 h-4" />
                                        </button>

                                        <button
                                            @click="deleteNotice(n)"
                                            class="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                                            title="Delete Notice"
                                        >
                                            <Trash2 class="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Empty State -->
                <div v-if="filteredNotices.length === 0" class="text-center py-12">
                    <Bell class="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <h4 class="text-base font-bold text-text-main">No notices found</h4>
                    <p class="text-xs text-text-muted mt-1">Try adjusting the filter or search query.</p>
                </div>
            </BaseCard>
        </div>

        <!-- Create / Edit Notice Modal -->
        <BaseModal
            :is-open="isModalOpen"
            :title="isEditing ? 'Edit Notice Circular' : 'Create New Notice Circular'"
            max-width="2xl"
            @close="isModalOpen = false"
        >
            <form @submit.prevent="saveNotice" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="sm:col-span-2">
                        <label class="block text-xs font-semibold text-text-main mb-1">
                            Notice Title <span class="text-danger">*</span>
                        </label>
                        <BaseInput
                            v-model="form.title"
                            placeholder="e.g. Schedule of 4th Executive Committee Meeting & AGM Date Finalization"
                            required
                        />
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-text-main mb-1">
                            Notice Type <span class="text-danger">*</span>
                        </label>
                        <BaseSelect v-model="form.type" required>
                            <option value="General Notice">General Notice</option>
                            <option value="Emergency Announcement">Emergency Announcement</option>
                            <option value="Event Notice">Event Notice</option>
                            <option value="Meeting Notice">Meeting Notice</option>
                            <option value="Financial Circular">Financial / Chada Circular</option>
                        </BaseSelect>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-text-main mb-1">
                            Target Audience Visibility <span class="text-danger">*</span>
                        </label>
                        <BaseSelect v-model="form.visibility" required>
                            <option value="Public">Public (Visible to everyone)</option>
                            <option value="Members Only">Members Only (Logged-in Alumni)</option>
                            <option value="Committee Only">Committee Only (EC Officers)</option>
                        </BaseSelect>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-text-main mb-1">
                            Publish Date <span class="text-danger">*</span>
                        </label>
                        <BaseInput
                            v-model="form.publishDate"
                            type="date"
                            required
                        />
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-text-main mb-1">
                            Expiration Date (Optional)
                        </label>
                        <BaseInput
                            v-model="form.expiryDate"
                            type="date"
                        />
                    </div>

                    <div class="sm:col-span-2">
                        <label class="block text-xs font-semibold text-text-main mb-1">
                            Short Summary / Abstract <span class="text-danger">*</span>
                        </label>
                        <BaseInput
                            v-model="form.summary"
                            placeholder="Brief 1-sentence synopsis displayed on notice feeds..."
                            required
                        />
                    </div>

                    <div class="sm:col-span-2">
                        <label class="block text-xs font-semibold text-text-main mb-1">
                            Full Notice Body Content <span class="text-danger">*</span>
                        </label>
                        <BaseTextarea
                            v-model="form.content"
                            rows="5"
                            placeholder="Type the official announcement body, agenda items, location, and instructions..."
                            required
                        />
                    </div>

                    <!-- Upload attachment placeholder -->
                    <div class="sm:col-span-2">
                        <label class="block text-xs font-semibold text-text-main mb-1">
                            Attach Signed Circular Scan / PDF Memo
                        </label>
                        <div class="border-2 border-dashed border-border-main rounded-xl p-3 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                            <UploadCloud class="w-5 h-5 text-slate-400 mx-auto mb-1" />
                            <p class="text-xs font-medium text-text-main">Click or drag official PDF circular</p>
                            <p class="text-[10px] text-text-muted">Maximum file size: 5MB</p>
                        </div>
                    </div>

                    <div class="sm:col-span-2 flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <div class="flex items-center space-x-2">
                            <input
                                v-model="form.isPinned"
                                type="checkbox"
                                id="isPinned"
                                class="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
                            />
                            <label for="isPinned" class="text-xs font-semibold text-text-main cursor-pointer">
                                Pin this announcement to top of feed & dashboard
                            </label>
                        </div>
                        <span class="text-[11px] text-slate-500">Priority Highlight</span>
                    </div>
                </div>

                <div class="flex items-center justify-end space-x-3 pt-4 border-t border-border-main">
                    <BaseButton type="button" variant="outline" @click="isModalOpen = false">
                        Cancel
                    </BaseButton>
                    <BaseButton type="submit" variant="primary">
                        {{ isEditing ? 'Update Notice' : 'Publish Circular' }}
                    </BaseButton>
                </div>
            </form>
        </BaseModal>

        <!-- Preview Notice Modal -->
        <BaseModal
            :is-open="isPreviewModalOpen"
            title="Notice Preview"
            max-width="lg"
            @close="isPreviewModalOpen = false"
        >
            <div v-if="selectedNotice" class="space-y-4">
                <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div class="flex items-center gap-2 mb-2">
                        <BaseBadge :variant="getTypeBadgeVariant(selectedNotice.type)" size="sm">
                            {{ selectedNotice.type }}
                        </BaseBadge>
                        <span
                            :class="[
                                'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold',
                                getVisibilityClass(selectedNotice.visibility)
                            ]"
                        >
                            {{ selectedNotice.visibility }}
                        </span>
                        <span v-if="selectedNotice.isPinned" class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                            PINNED
                        </span>
                    </div>

                    <h3 class="text-base font-bold text-text-main">
                        {{ selectedNotice.title }}
                    </h3>

                    <p class="text-xs text-text-muted mt-1">
                        Published on {{ selectedNotice.publishDate }} • Signed by General Secretary
                    </p>
                </div>

                <div class="prose prose-xs text-text-main bg-white p-4 rounded-xl border border-slate-100 leading-relaxed whitespace-pre-line text-xs">
                    {{ selectedNotice.content || selectedNotice.summary }}
                </div>

                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <FileText class="w-5 h-5 text-primary" />
                        <div>
                            <p class="text-xs font-semibold text-text-main">Official Signed Circular</p>
                            <p class="text-[10px] text-text-muted">NS12-CIRCULAR-2026.PDF (240 KB)</p>
                        </div>
                    </div>
                    <BaseButton variant="outline" size="sm">
                        <Download class="w-3.5 h-3.5 mr-1" />
                        Download
                    </BaseButton>
                </div>

                <div class="flex justify-end pt-2">
                    <BaseButton variant="outline" size="sm" @click="isPreviewModalOpen = false">
                        Close Preview
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
    Bell,
    AlertCircle,
    Lock,
    Briefcase,
    ArrowRight,
    Search,
    Plus,
    Pin,
    Globe,
    Users,
    ShieldCheck,
    Eye,
    Edit3,
    Trash2,
    UploadCloud,
    FileText,
    Download
} from 'lucide-vue-next';

const searchQuery = ref('');
const visibilityFilter = ref('all');
const typeFilter = ref('all');

const isModalOpen = ref(false);
const isEditing = ref(false);
const isPreviewModalOpen = ref(false);
const selectedNotice = ref(null);

const getTodayDate = () => new Date().toISOString().slice(0, 10);

const form = ref({
    id: null,
    title: '',
    type: 'General Notice',
    visibility: 'Public',
    publishDate: getTodayDate(),
    expiryDate: '',
    summary: '',
    content: '',
    isPinned: false,
    status: 'published'
});

const notices = ref([
    {
        id: 1,
        title: 'Emergency Medical Aid Fund Raising Call for Master Nurul Islam',
        type: 'Emergency Announcement',
        visibility: 'Public',
        publishDate: '2026-10-15',
        expiryDate: '2026-11-15',
        summary: 'Immediate collective support required for retired faculty Master Nurul Islam admitted at National Heart Foundation.',
        content: `Dear Fellow Alumni,\n\nWe urgently request your prayers and generous contributions for our beloved teacher Master Nurul Islam, who has been admitted to the ICU at the National Heart Foundation Dhaka for urgent coronary stent replacement surgery.\n\nThe Executive Committee has authorized a dedicated medical relief fund with a target of ৳5,00,000. All classmates and batches are requested to contribute through verified digital channels.\n\nExecutive Committee, NS - 12`,
        isPinned: true,
        status: 'published'
    },
    {
        id: 2,
        title: 'Notice for 4th Executive Committee Meeting & AGM Schedule',
        type: 'Meeting Notice',
        visibility: 'Committee Only',
        publishDate: '2026-10-18',
        expiryDate: '2026-10-28',
        summary: 'All elected executive committee members are requested to attend the upcoming agenda meeting on Zoom & Secretariat.',
        content: `The 4th bi-monthly Executive Committee meeting of the Alumni Association of NS - 12 will convene on Friday, 28th October at 8:00 PM.\n\nAgenda:\n1. Audit review of Q3 Chada collections\n2. Status of Charity Project Disbursements\n3. Annual Grand Reunion & AGM venue selection\n4. Miscellaneous matters with permission of the chair.\n\nRafiqul Hasan, General Secretary`,
        isPinned: false,
        status: 'published'
    },
    {
        id: 3,
        title: 'Annual Grand Reunion & Batch Directory Update 2027',
        type: 'Event Notice',
        visibility: 'Members Only',
        publishDate: '2026-10-10',
        expiryDate: '2026-12-31',
        summary: 'Preparations for the 2027 Grand Reunion have begun. All alumni are requested to verify their profile details.',
        content: `Greetings everyone!\n\nWe are excited to announce preliminary dates for our upcoming Grand Alumni Reunion in January 2027. To ensure everyone receives invitations and the printed commemorative souvenir book, please log in and update your workplace, blood group, and contact numbers in the member directory.\n\nReunion Sub-Committee`,
        isPinned: false,
        status: 'published'
    },
    {
        id: 4,
        title: 'Monthly Chada Contribution Revision & Online Ledger Integration',
        type: 'General Notice',
        visibility: 'Public',
        publishDate: '2026-09-01',
        expiryDate: '',
        summary: 'Association introduces automated instant SMS verification and official downloadable PDF receipts for all monthly contributions.',
        content: `Effective September 2026, members can pay their monthly ৳500 chada via bKash, Nagad or direct bank transfer, and instantly receive an official association money receipt in their member portal.\n\nTreasurer, NS - 12`,
        isPinned: false,
        status: 'published'
    }
]);

const publishedCount = computed(() => notices.value.filter(n => n.status === 'published').length);
const pinnedCount = computed(() => notices.value.filter(n => n.isPinned).length);
const membersOnlyCount = computed(() => notices.value.filter(n => n.visibility === 'Members Only').length);

const filteredNotices = computed(() => {
    return notices.value.filter(n => {
        const matchesSearch =
            n.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            n.summary.toLowerCase().includes(searchQuery.value.toLowerCase());

        const matchesVisibility = visibilityFilter.value === 'all' || n.visibility === visibilityFilter.value;
        const matchesType = typeFilter.value === 'all' || n.type === typeFilter.value;

        return matchesSearch && matchesVisibility && matchesType;
    });
});

const getTypeBadgeVariant = (type) => {
    switch (type) {
        case 'Emergency Announcement': return 'danger';
        case 'Event Notice': return 'primary';
        case 'Meeting Notice': return 'accent';
        default: return 'neutral';
    }
};

const getVisibilityClass = (vis) => {
    switch (vis) {
        case 'Public': return 'bg-emerald-100 text-emerald-800';
        case 'Members Only': return 'bg-blue-100 text-blue-800';
        case 'Committee Only': return 'bg-purple-100 text-purple-800';
        default: return 'bg-slate-100 text-slate-800';
    }
};

const togglePin = (n) => {
    n.isPinned = !n.isPinned;
};

const openCreateModal = () => {
    isEditing.value = false;
    form.value = {
        id: null,
        title: '',
        type: 'General Notice',
        visibility: 'Public',
        publishDate: getTodayDate(),
        expiryDate: '',
        summary: '',
        content: '',
        isPinned: false,
        status: 'published'
    };
    isModalOpen.value = true;
};

const editNotice = (n) => {
    isEditing.value = true;
    form.value = { ...n };
    isModalOpen.value = true;
};

const saveNotice = () => {
    if (isEditing.value) {
        const idx = notices.value.findIndex(n => n.id === form.value.id);
        if (idx !== -1) {
            notices.value[idx] = { ...form.value };
        }
    } else {
        notices.value.unshift({
            ...form.value,
            id: Date.now()
        });
    }
    isModalOpen.value = false;
};

const deleteNotice = (n) => {
    if (confirm(`Are you sure you want to delete notice "${n.title}"?`)) {
        notices.value = notices.value.filter(item => item.id !== n.id);
    }
};

const previewNotice = (n) => {
    selectedNotice.value = n;
    isPreviewModalOpen.value = true;
};
</script>
